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
});
