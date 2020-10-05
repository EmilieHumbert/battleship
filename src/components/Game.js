import React, { useRef, useState } from "react";

import Gameboard from "./Gameboard";
import Player from "../factories/player";

const Game = () => {
  const gameboardSize = 5;
  const [turn, setTurn] = useState(0);
  const players = [Player(gameboardSize, false), Player(gameboardSize, true)];
  const gameboardRefs = [useRef({}), useRef({})];

  const nextTurn = () => {
    const currentPlayer = turn;
    gameboardRefs[currentPlayer].current.setIsActive(false);

    const nextPlayer = turn === 0 ? 1 : 0;

    setTimeout(() => {
      setTurn(nextPlayer);
      gameboardRefs[nextPlayer].current.setIsActive(true);
      gameboardRefs[currentPlayer].current.setIsVisible(false);
      gameboardRefs[nextPlayer].current.setIsVisible(true);

      if (players[nextPlayer].isComputer) {
        setTimeout(() => {
          const index = players[nextPlayer].makePlay();
          gameboardRefs[nextPlayer].current.receiveAttack(index);
        }, 1000);
      }
    }, 1000);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
      {players.map((player, index) => (
        <Gameboard
          key={index}
          player={player}
          size={gameboardSize}
          nextTurn={nextTurn}
          gameboardRef={gameboardRefs[index]}
          activeAtStart={index === 0}
          visibleAtStart={index === 0}
        />
      ))}
    </div>
  );
};

export default Game;
