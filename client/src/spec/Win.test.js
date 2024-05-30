import { render, screen } from "@testing-library/react";
import Win from "../component/Interface/component/WinOrLose/Win";
import { MediatorContext, ServerContext } from "../App";
import { Mediator, Server, Store } from "../modules";
import { HOST, MEDIATOR } from "../config";

const store = new Store();
const mediator = new Mediator(MEDIATOR);
const server = new Server(HOST, mediator, store);
test("Win snapshot", () => {
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <Win />
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
});
