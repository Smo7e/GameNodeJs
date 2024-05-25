import { render, screen } from "@testing-library/react";
import Addafriend1Lobby from "../component/Lobby/panel/Addafriend1";
import { MediatorContext, ServerContext } from "../App";
import { Mediator, Server, Store } from "../modules";
import { HOST, MEDIATOR } from "../config";

const store = new Store();
const mediator = new Mediator(MEDIATOR);
const server = new Server(HOST, mediator, store);

test("Addafriend1Lobby snapshot", () => {
    const friends = [{ name: "Friend 1" }];
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <Addafriend1Lobby friends={friends} userId={1} />
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});
