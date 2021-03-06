import { useState } from "react";

const Player = (gameboardSize, isComputer = false) => {
  const [availablePlays, setAvailablePlays] = useState(
    Array(gameboardSize * gameboardSize)
      .fill()
      .map((_, index) => index)
  );
  const [status, setStatus] = useState(null);

  return {
    isComputer: Boolean(isComputer),
    makePlay: () => {
      let playIndex = Math.floor(Math.random() * availablePlays.length);
      if (playIndex === availablePlays.length) {
        playIndex = playIndex - 1;
      }
      const playResult = availablePlays[playIndex];
      setAvailablePlays(
        availablePlays.filter((_, index) => playIndex !== index)
      );

      return playResult;
    },
    setStatus,
    status,
  };
};

export default Player;
