import React, { useRef, useState } from "react";

import Gameboard from "./Gameboard";
import Player from "../factories/player";

const Game = () => {
  const gameboardSize = 5;
  const [turn, setTurn] = useState(0);
  const players = [Player(gameboardSize, false), Player(gameboardSize, true)];
  const gameboardRefs = [useRef({}), useRef({})];

  const nextTurn = (previousPlayerIsWinner) => {
    const previousPlayer = turn;
    const nextPlayer = turn === 0 ? 1 : 0;
    gameboardRefs[previousPlayer].current.setIsActive(false);

    if (previousPlayerIsWinner) {
      gameboardRefs[nextPlayer].current.setIsVisible(true);
      players[previousPlayer].setStatus("Winner!");
      players[nextPlayer].setStatus("Loser!");
      return;
    }

    setTimeout(() => {
      setTurn(nextPlayer);
      gameboardRefs[nextPlayer].current.setIsActive(true);
      gameboardRefs[previousPlayer].current.setIsVisible(false);
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
