import { render, screen } from "@testing-library/react";
import Lobby from "../component/Lobby/Lobby";
import { MediatorContext, ServerContext } from "../App";
import { Mediator, Server } from "../modules";
import { HOST, MEDIATOR } from "../config";

const mediator = new Mediator(MEDIATOR);
const server = new Server(HOST, mediator);

test("Lobby snapshot", () => {
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <Lobby epages={() => {}} />
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});
