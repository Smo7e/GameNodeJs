import { render, screen } from "@testing-library/react";
import Lose from "..//component/Interface/component/WinOrLose/Lose";
import { MediatorContext, ServerContext } from "../App";
import { Mediator, Server, Store } from "../modules";
import { HOST, MEDIATOR } from "../config";

const store = new Store();
const mediator = new Mediator(MEDIATOR);
const server = new Server(HOST, mediator, store);
test("Lose snapshot", () => {
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <Lose />
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
});
