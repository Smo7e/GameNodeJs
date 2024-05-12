import React from "react";
import { render } from "@testing-library/react";
import Techguy from "../component/Heroes/component/Techguy"; 

describe("Techguy Component", () => {
  it("renders correctly", () => {
    const Heroes = jest.fn(); 
    const { asFragment } = render(<Techguy heroes={Heroes} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
