import React from "react";
import { render } from "@testing-library/react";
import Sportik from "../component/Heroes/component/Sportik"; 

describe("Sportik Component", () => {
  it("renders correctly", () => {
    const Heroes = jest.fn(); 
    const { asFragment } = render(<Sportik heroes={Heroes} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
