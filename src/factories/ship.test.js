import Ship from "./ship";

describe("factories/ship", () => {
  describe("hit", () => {
    test("should fail when position is greater than available positions", () => {
      const ship = Ship(3);

      expect(() => {
        ship.hit(3);
      }).toThrow();
    });

    test("should fail when position is less than 0", () => {
      const ship = Ship(3);

      expect(() => {
        ship.hit(-1);
      }).toThrow();
    });

    test("should succeed with valid position", () => {
      const ship = Ship(3);

      expect(() => {
        ship.hit(2);
      }).not.toThrow();
    });
  });

  describe("isSunk", () => {
    test("should return false if none of the positions have been hit", () => {
      const ship = Ship(3);

      expect(ship.isSunk()).toBe(false);
    });

    test("should return false if only some of the positions have been hit", () => {
      const ship = Ship(3);

      ship.hit(1);

      expect(ship.isSunk()).toBe(false);
    });

    test("should return true if all positions have been hit", () => {
      const ship = Ship(2);

      ship.hit(0);
      ship.hit(1);

      expect(ship.isSunk()).toBe(true);
    });
  });
});
