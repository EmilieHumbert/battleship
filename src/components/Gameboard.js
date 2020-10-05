import React, { useState } from "react";

import { createShip, hitShip, isShipHit } from "../utils/ship";

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
      hitShip(ships[cell.shipId], cell.shipIndex, ships, setShips);
    }

    nextTurn();
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
          paddingLeft: "50px",
        }}
      >
        {player.isComputer ? "Computer" : "Player"} board
      </h2>
      {isVisible ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto auto",
            width: "250px",
            paddingLeft: "50px",
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
                    width: "50px",
                    height: "50px",
                  }}
                >
                  .
                </div>
              );
            })}
        </div>
      ) : (
        <div
          style={{
            width: "250px",
            height: "250px",
            marginLeft: "50px",
            backgroundColor: "black",
          }}
        >
          Waiting
        </div>
      )}
    </div>
  );
}

export default Gameboard;
