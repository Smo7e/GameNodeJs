import React from "react";
import { render } from "@testing-library/react";
import TechguyPot from "../component/Heroes/component/Techguy"; 

describe("TechguyPot Component", () => {
  it("renders correctly", () => {
    const mockHeroes = jest.fn(); 
    const { asFragment } = render(<TechguyPot heroes={mockHeroes} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
