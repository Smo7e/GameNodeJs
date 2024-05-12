import { render, screen } from "@testing-library/react";
import Addafriend2Lobby from "../component/Lobby/panel/Addafriend2";
import { MediatorContext, ServerContext } from "../App";
import { Mediator, Server } from "../modules";
import { HOST, MEDIATOR } from "../config";

const mediator = new Mediator(MEDIATOR);
const server = new Server(HOST, mediator);

test("Addafriend2Lobby snapshot", () => {
    const friends = [{name: "Friend 2"}];
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <Addafriend2Lobby friends={friends} userId={2}/>
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});
