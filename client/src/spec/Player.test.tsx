import React from "react";
import { render } from "@testing-library/react";
import Player from "../modules/Game/Player";
import { MediatorContext, ServerContext } from "../App"; 
import { Mediator, Server } from "../modules";
import { HOST, MEDIATOR } from "../config";

const mediator = new Mediator(MEDIATOR);
const server = new Server(HOST, mediator);
const mockMediator = {
  gamer: { person_id: 1 },
  gamers: [{ name: "TestUser", hp: 100 }],
  user: { name: "TestUser" },
};

const mockServer = {
  move: jest.fn(),
};

jest.mock("@react-three/fiber", () => ({
  useFrame: jest.fn(),
}));

describe("Player Component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MediatorContext.Provider value={mediator}>
        <ServerContext.Provider value={server}>
          <Player />
        </ServerContext.Provider>
      </MediatorContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
