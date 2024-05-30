import React from "react";
import { render, screen } from "@testing-library/react";
import Parameters from "../component/Parameters/Parameters";


test("Parameters snapshot", () => {
    const { asFragment } = render(
                <Parameters epages={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
});
