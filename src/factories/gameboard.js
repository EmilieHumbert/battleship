import Ship from "./ship";

// TODO: Allow size to be passed
const Gameboard = () => {
  const size = 5;
  const data = Array(size * size).fill(null);

  // Default positions for now
  [
    [2, 2],
    [3, 11],
    [4, 20],
  ].forEach(([length, startIndex]) => {
    const ship = Ship(length);

    Array(length)
      .fill()
      .forEach((_, index) => {
        data[startIndex + index] = { ship, index };
      });
  });

  return {
    receiveAttack: (index) => {
      if (index < 0 || index >= data.length) {
        throw new Error("Invalid index");
      }

      const cell = data[index];

      if (
        cell === false ||
        (cell && cell.ship.isHit(cell.index))
      ) {
        throw new Error("Already attacked");
      }

      if (cell === null) {
        data[index] = false;
      }

      if (cell) {
        cell.ship.hit(cell.index);
      }
    },
  };
};

export default Gameboard;
