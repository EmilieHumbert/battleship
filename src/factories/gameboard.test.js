import Gameboard from "./gameboard";

describe("factories/gameboard", () => {
  describe("hit", () => {
    test("should fail when position is greater than available positions", () => {
      const gameboard = Gameboard();

      expect(() => {
        gameboard.receiveAttack(30);
      }).toThrow('Invalid index');
    });

    test("should fail when position is less than 0", () => {
      const gameboard = Gameboard();

      expect(() => {
        gameboard.receiveAttack(-1);
      }).toThrow('Invalid index');
    });

    test("should fail with previously attacked empty position", () => {
      const gameboard = Gameboard();

      gameboard.receiveAttack(18);

      expect(() => {
        gameboard.receiveAttack(18);
      }).toThrow('Already attacked');
    });

    test("should fail with previously attacked ship position", () => {
      const gameboard = Gameboard();

      gameboard.receiveAttack(20);

      expect(() => {
        gameboard.receiveAttack(20);
      }).toThrow('Already attacked');
    });

    test("should succeed with valid position", () => {
      const gameboard = Gameboard();

      expect(() => {
        gameboard.receiveAttack(20);
      }).not.toThrow();
    });
  });

  describe("allShipsSunk", () => {
    test("should return false if no ship has been hit", () => {
      const gameboard = Gameboard();

      expect(gameboard.allShipsSunk()).toBe(false);
    });

    test("should return false if some ships have been hit", () => {
      const gameboard = Gameboard();

      gameboard.receiveAttack(2);

      expect(gameboard.allShipsSunk()).toBe(false);
    });

    test("should return false if some ships have sunk", () => {
      const gameboard = Gameboard();

      gameboard.receiveAttack(2);
      gameboard.receiveAttack(3);

      expect(gameboard.allShipsSunk()).toBe(false);
    });

    test("should return true if all ships have sunk", () => {
      const gameboard = Gameboard();

      gameboard.receiveAttack(2);
      gameboard.receiveAttack(3);

      gameboard.receiveAttack(11);
      gameboard.receiveAttack(12);
      gameboard.receiveAttack(13);

      gameboard.receiveAttack(20);
      gameboard.receiveAttack(21);
      gameboard.receiveAttack(22);
      gameboard.receiveAttack(23);

      expect(gameboard.allShipsSunk()).toBe(true);
    });
  });
});
