import React, { useState } from "react";

import { createShip, hitShip, isShipHit, isShipSunk } from "../utils/ship";

function Gameboard({
  activeAtStart,
  gameboardRef,
  nextTurn,
  player,
  size,
  visibleAtStart,
}) {
  const defaultGameboardData = Array(size * size).fill(null);
  // Default positions for now
  const shipConfiguration = [
    [2, 2],
    [3, 11],
    [4, 20],
  ];

  const defaultShipData = shipConfiguration.map(([length]) =>
    createShip(length)
  );

  shipConfiguration.forEach(([length, startIndex], shipId) => {
    Array(length)
      .fill()
      .forEach((_, shipIndex) => {
        defaultGameboardData[startIndex + shipIndex] = { shipId, shipIndex };
      });
  });

  const [gameboard, setGameboard] = useState(defaultGameboardData);
  const [ships, setShips] = useState(defaultShipData);
  const [isActive, setIsActive] = useState(activeAtStart);
  const [isVisible, setIsVisible] = useState(visibleAtStart);
  gameboardRef.current.setIsVisible = setIsVisible;
  gameboardRef.current.setIsActive = setIsActive;

  const receiveAttack = (index) => {
    if (index < 0 || index >= gameboard.length) {
      throw new Error("Invalid gameboard index");
    }

    const cell = gameboard[index];

    if (
      cell === false ||
      (cell && isShipHit(ships[cell.shipId], cell.shipIndex))
    ) {
      throw new Error("Already attacked");
    }

    if (cell === null) {
      setGameboard([
        ...gameboard.slice(0, index),
        false,
        ...gameboard.slice(index + 1),
      ]);
    }

    if (cell) {
      const shipSunk = hitShip(
        ships[cell.shipId],
        cell.shipIndex,
        ships,
        setShips
      );

      if (shipSunk) {
        const allShipsSunk = ships.every((ship) =>
          ship === ships[cell.shipId] ? shipSunk : isShipSunk(ship)
        );
        return nextTurn(allShipsSunk);
      }
    }

    nextTurn(false);
  };
  gameboardRef.current.receiveAttack = receiveAttack;

  const hasCellBeenClicked = (index) => {
    const cell = gameboard[index];
    return (
      cell === false || (cell && isShipHit(ships[cell.shipId], cell.shipIndex))
    );
  };

  const setupHandleClick = (index) => () => {
    if (hasCellBeenClicked(index) === true || player.isComputer || !isActive) {
      return;
    }

    receiveAttack(index);
  };

  return (
    <div>
      <h2
        style={{
          margin: "50px 200px 30px 200px",
          textAlign: "center",
        }}
      >
        {player.isComputer ? "Computer" : "Player"} board
      </h2>
      {isVisible ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto auto",
            margin: "auto",
            width: "250px",
          }}
        >
          {Array(gameboard.length)
            .fill()
            .map((_, index) => {
              const backgroundColor = gameboard[index]
                ? ships[gameboard[index].shipId][gameboard[index].shipIndex]
                  ? "#E6B0AA"
                  : "#EBEDEF"
                : gameboard[index] === false
                ? "#AED6F1"
                : "#EBEDEF";
              return (
                <div
                  key={`gameboard-cell-${index}`}
                  role="button"
                  onClick={setupHandleClick(index)}
                  style={{
                    backgroundColor,
                    border: "1px solid darkGrey",
                    height: "50px",
                    width: "50px",
                  }}
                ></div>
              );
            })}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "black",
            height: "250px",
            margin: "auto",
            width: "250px",
          }}
        >
          Waiting
        </div>
      )}
      {player.status && (
        <div style={{ fontWeight: "900", margin: "20px 200px" }}>
          {player.status}
        </div>
      )}
    </div>
  );
}

export default Gameboard;
