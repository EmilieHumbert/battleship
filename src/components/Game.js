import React, { useRef, useState } from "react";

import Gameboard from "./Gameboard";
import Player from "../factories/player";

const Game = () => {
  const gameboardSize = 5;
  const [turn, setTurn] = useState(0);
  const players = [Player(gameboardSize, false), Player(gameboardSize, true)];
  const playerRefs = [useRef({}), useRef({})];

  const nextTurn = () => {
    const nextPlayer = turn === 0 ? 1 : 0;

    setTimeout(() => {
      setTurn(nextPlayer);

      if (players[nextPlayer].isComputer) {
        setTimeout(() => {
          const index = players[nextPlayer].makePlay();
          playerRefs[nextPlayer].current.receiveAttack(index);
        }, 1000);
      }
    }, 1000);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
      {players.map((_, index) => (
        <Gameboard
          key={index}
          playerNumber={index}
          size={gameboardSize}
          hidden={turn !== index}
          nextTurn={nextTurn}
          playerRef={playerRefs[index]}
        />
      ))}
    </div>
  );
};

export default Game;
