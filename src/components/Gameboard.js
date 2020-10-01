import React, { useState } from "react";

import { createShip, hitShip, isShipHit } from "../utils/ship";

function Gameboard({ playerNumber, size }) {
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
  };

  const hasCellBeenClicked = (index) => {
    const cell = gameboard[index];
    return (
      cell === false || (cell && isShipHit(ships[cell.shipId], cell.shipIndex))
    );
  };

  const setupHandleClick = (index) => () => {
    if (hasCellBeenClicked(index) === true) {
      return;
    }

    receiveAttack(index);
  };

  return (
    <div>
      <h2>Players {playerNumber} board</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto",
          width: "250px",
          padding: "50px",
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
                key={`gameboard-${playerNumber}-cell-${index}`}
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
    </div>
  );
}

export default Gameboard;
