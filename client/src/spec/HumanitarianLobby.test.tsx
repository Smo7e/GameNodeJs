import { render, screen } from "@testing-library/react";
import HumanitarianLobby from "../component/Lobby/component/HumanitarianLobby";
import { MediatorContext, ServerContext } from "../App";
import { Mediator, Server, Store } from "../modules";
import { HOST, MEDIATOR } from "../config";

const store = new Store();

const mediator = new Mediator(MEDIATOR);
const server = new Server(HOST, mediator, store);

test("HumanitarianLobby snapshot with gamerNumber 0", () => {
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <HumanitarianLobby lobby={() => {}} gamerNumber={0} />
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});

test("HumanitarianLobby snapshot with gamerNumber 1", () => {
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <HumanitarianLobby lobby={() => {}} gamerNumber={1} />
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});

test("HumanitarianLobby snapshot with gamerNumber 2", () => {
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <HumanitarianLobby lobby={() => {}} gamerNumber={2} />
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});
