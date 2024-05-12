import { render, screen } from "@testing-library/react";
import TechguyLobby from "../component/Lobby/component/TechguyLobby";
import { MediatorContext, ServerContext } from "../App";
import { Mediator, Server } from "../modules";
import { HOST, MEDIATOR } from "../config";

const mediator = new Mediator(MEDIATOR);
const server = new Server(HOST, mediator);

test("TechguyLobby snapshot with gamerNumber 0", () => {
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <TechguyLobby lobby={() => {}} gamerNumber={0}/>
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});

test("TechguyLobby snapshot with gamerNumber 1", () => {
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <TechguyLobby lobby={() => {}} gamerNumber={1}/>
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});

test("TechguyLobby snapshot with gamerNumber 2", () => {
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <TechguyLobby lobby={() => {}} gamerNumber={2}/>
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});
