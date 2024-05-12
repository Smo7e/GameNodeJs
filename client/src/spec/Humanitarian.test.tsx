import React from "react";
import { render } from "@testing-library/react";
import Humanitarian from "../component/Heroes/component/Humanitarian"; 

describe("Humanitarian Component", () => {
  it("renders correctly", () => {
    const Heroes = jest.fn(); 
    const { asFragment } = render(<Humanitarian heroes={Heroes} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
