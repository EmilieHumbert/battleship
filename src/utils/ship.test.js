import { createShip, hitShip, isShipHit, isShipSunk } from "./ship";

describe("utils/ship", () => {
  describe("createShip", () => {
    test("should fail when length is less than 1", () => {
      expect(() => {
        createShip(-1);
      }).toThrow("Invalid ship length");
      expect(() => {
        createShip(0);
      }).toThrow("Invalid ship length");
    });

    test("should fail when length is not a number", () => {
      expect(() => {
        createShip(true);
      }).toThrow("Invalid ship length");
      expect(() => {
        createShip("hello");
      }).toThrow("Invalid ship length");
      expect(() => {
        createShip({ hello: "world" });
      }).toThrow("Invalid ship length");
    });

    test("should return an array of false values which matches the length specified", () => {
      const ship1 = createShip(1);
      const ship2 = createShip(2);
      const ship3 = createShip(3);

      expect(ship1).toEqual([false]);
      expect(ship2).toEqual([false, false]);
      expect(ship3).toEqual([false, false, false]);
    });
  });

  describe("hitShip", () => {
    test("should fail when position is greater than available positions", () => {
      const ship = createShip(3);
      const ships = [ship];
      const setShips = jest.fn();

      expect(() => {
        hitShip(ship, 3, ships, setShips);
      }).toThrow("Invalid ship index");
    });

    test("should fail when position is less than 0", () => {
      const ship = createShip(3);
      const ships = [ship];
      const setShips = jest.fn();

      expect(() => {
        hitShip(ship, -1, ships, setShips);
      }).toThrow("Invalid ship index");
    });

    test("should succeed with valid position", () => {
      const ship = createShip(3);
      const ships = [ship];
      const setShips = jest.fn();

      hitShip(ship, 2, ships, setShips);

      expect(setShips).toBeCalledWith([[false, false, true]]);
    });
  });

  describe("isShipHit", () => {
    test("should fail when position is greater than available positions", () => {
      const ship = createShip(3);

      expect(() => {
        isShipHit(ship, 3);
      }).toThrow("Invalid ship index");
    });

    test("should fail when position is less than 0", () => {
      const ship = createShip(3);

      expect(() => {
        isShipHit(ship, -1);
      }).toThrow("Invalid ship index");
    });

    test("should return false if no position has been hit", () => {
      const ship = createShip(3);

      expect(isShipHit(ship, 0)).toBe(false);
    });

    test("should return false if another position has been hit", () => {
      const ship = [false, true, false];

      expect(isShipHit(ship, 0)).toBe(false);
    });

    test("should return true if the position has been hit", () => {
      const ship = [false, true, false];

      expect(isShipHit(ship, 1)).toBe(true);
    });
  });

  describe("isShipSunk", () => {
    test("should return false if none of the positions have been hit", () => {
      const ship = createShip(3);

      expect(isShipSunk(ship)).toBe(false);
    });

    test("should return false if only some of the positions have been hit", () => {
      const ship = [false, true, false];

      expect(isShipSunk(ship)).toBe(false);
    });

    test("should return true if all positions have been hit", () => {
      const ship = [true, true, true];

      expect(isShipSunk(ship)).toBe(true);
    });
  });
});
