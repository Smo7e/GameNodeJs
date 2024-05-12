import React from "react";
import { render } from "@testing-library/react";
import HumanitarianPot from "../component/Heroes/component/Humanitarian"; // Импортируйте компонент из правильного пути

describe("HumanitarianPot Component", () => {
  it("renders correctly", () => {
    const mockHeroes = jest.fn(); // Создаем мок-функцию для props.heroes
    const { asFragment } = render(<HumanitarianPot heroes={mockHeroes} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
