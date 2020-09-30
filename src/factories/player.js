const Player = (isComputer = false) => {
  const gameboardSize = 25;
  const availablePlays = Array(gameboardSize)
    .fill()
    .map((_, index) => index);

  return {
    isComputer: Boolean(isComputer),
    makePlay: () => {
      let playIndex = Math.floor(Math.random() * availablePlays.length);
      if (playIndex === availablePlays.length) {
        playIndex = playIndex - 1;
      }
      const playResult = availablePlays.splice(playIndex, 1);
      return playResult[0];
    },
  };
};

export default Player;
