import React from "react";
import { render } from "@testing-library/react";
import SportikPot from "../component/Heroes/component/Sportik"; // Импортируйте компонент из правильного пути

describe("SportikPot Component", () => {
  it("renders correctly", () => {
    const mockHeroes = jest.fn(); // Создаем мок-функцию для props.heroes
    const { asFragment } = render(<SportikPot heroes={mockHeroes} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
