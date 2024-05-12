import { render, screen } from "@testing-library/react";
import SportikLobby from "../component/Lobby/component/SportikLobby";
import { MediatorContext, ServerContext } from "../App";
import { Mediator, Server } from "../modules";
import { HOST, MEDIATOR } from "../config";

const mediator = new Mediator(MEDIATOR);
const server = new Server(HOST, mediator);

test("SportikLobby snapshot with gamerNumber 0", () => {
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <SportikLobby lobby={() => {}} gamerNumber={0}/>
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});

test("SportikLobby snapshot with gamerNumber 1", () => {
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <SportikLobby lobby={() => {}} gamerNumber={1}/>
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});

test("SportikLobby snapshot with gamerNumber 2", () => {
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <SportikLobby lobby={() => {}} gamerNumber={2}/>
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});
