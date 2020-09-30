import Player from "./player";

describe("factories/player", () => {
  describe("isComputer", () => {
    test("should return false when boolean isn't specified", () => {
      const player = Player();

      expect(player.isComputer).toBe(false);
    });

    test("should return true when boolean is true", () => {
      const player = Player(true);

      expect(player.isComputer).toBe(true);
    });
  });

  describe("makePlay", () => {
    test("should pick a random index in the gameboard range", () => {
      const player = Player(true);

      const index = player.makePlay();

      expect(index).toBeGreaterThan(-1);
      expect(index).toBeLessThan(25);
    });

    test("should never pick the same index twice", () => {
      const player = Player(true);
      const plays = [];

      Array(25).fill().forEach(() => {
        plays.push(player.makePlay());
      })

      expect(plays.sort((a, b) => a - b)).toEqual(
        Array(25)
          .fill()
          .map((_, index) => index)
      );
    });
  });
});
