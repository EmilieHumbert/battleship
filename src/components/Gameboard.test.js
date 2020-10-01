import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Gameboard from "./Gameboard";

describe("components/gameboard", () => {
  describe("layout", () => {
    test("should contain player number in a heading", () => {
      const { getByRole } = render(<Gameboard playerNumber={1} size={5} />);

      expect(getByRole("heading").textContent).toMatch("1");
    });

    test("should contain a grid with size squared number of cells", () => {
      const { getAllByRole } = render(<Gameboard playerNumber={1} size={5} />);

      expect(getAllByRole("button").length).toBe(25);
    });

    test("should change cell to red if clicking on a ship", () => {
      const { getAllByRole } = render(<Gameboard playerNumber={1} size={5} />);

      const cells = getAllByRole("button");
      fireEvent.click(cells[11]);

      expect(cells.length).toBe(25);
      expect(cells[11].style.backgroundColor).toBe("rgb(230, 176, 170)");
    });

    test("should change cell to blue if clicking on water", () => {
      const { getAllByRole } = render(<Gameboard playerNumber={1} size={5} />);

      const cells = getAllByRole("button");
      fireEvent.click(cells[10]);

      expect(cells.length).toBe(25);
      expect(cells[10].style.backgroundColor).toBe("rgb(174, 214, 241)");
    });
  });
});
