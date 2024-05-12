import React from "react";
import { render } from "@testing-library/react";
import HumanitarianPot from "../component/Heroes/component/Humanitarian"; 

describe("HumanitarianPot Component", () => {
  it("renders correctly", () => {
    const mockHeroes = jest.fn(); 
    const { asFragment } = render(<HumanitarianPot heroes={mockHeroes} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
