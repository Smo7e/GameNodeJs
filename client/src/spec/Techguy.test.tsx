import React from "react";
import { render } from "@testing-library/react";
import TechguyPot from "../component/Heroes/component/Techguy"; // Импортируйте компонент из правильного пути

describe("TechguyPot Component", () => {
  it("renders correctly", () => {
    const mockHeroes = jest.fn(); // Создаем мок-функцию для props.heroes
    const { asFragment } = render(<TechguyPot heroes={mockHeroes} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
