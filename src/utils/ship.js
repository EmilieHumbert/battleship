export const createShip = (length) => {
  if (!Number.isFinite(length) || length < 1) {
    throw new Error("Invalid ship length");
  }

  return Array(length).fill(false);
};

export const hitShip = (ship, shipIndex, ships, setShips) => {
  if (shipIndex < 0 || shipIndex >= ship.length) {
    throw new Error("Invalid ship index");
  }

  setShips(
    ships.map((loopShip) =>
      loopShip === ship
        ? ship.map((value, index) => (index === shipIndex ? true : value))
        : loopShip
    )
  );
};

export const isShipHit = (ship, shipIndex) => {
  if (shipIndex < 0 || shipIndex >= ship.length) {
    throw new Error("Invalid ship index");
  }

  return ship[shipIndex];
};

export const isShipSunk = (ship) => ship.every((value) => value === true);
