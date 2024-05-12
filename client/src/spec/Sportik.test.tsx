import React from "react";
import { render } from "@testing-library/react";
import SportikPot from "../component/Heroes/component/Sportik"; 

describe("SportikPot Component", () => {
  it("renders correctly", () => {
    const mockHeroes = jest.fn(); 
    const { asFragment } = render(<SportikPot heroes={mockHeroes} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
