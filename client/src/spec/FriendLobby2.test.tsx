import { render, screen } from "@testing-library/react";
import FriendLobby2 from "../component/Lobby/component/FriendLobby2";
import { MediatorContext, ServerContext } from "../App";
import { Mediator, Server, Store } from "../modules";
import { HOST, MEDIATOR } from "../config";

const store = new Store();
const mediator = new Mediator(MEDIATOR);
const server = new Server(HOST, mediator, store);

// test("FriendLobby2 snapshot gamerNumber 0", () => {
    
//     const { asFragment } = render(
//         <MediatorContext.Provider value={mediator}>
//             <ServerContext.Provider value={server}>
//                 <FriendLobby2 setPanel={() => {}} gamers={[]}  />
//             </ServerContext.Provider>
//         </MediatorContext.Provider>
//     );
//     expect(asFragment()).toMatchSnapshot();
// });

describe('FriendLobby2 component', () => {
    test('renders correctly with Admin post and gamers length <= 2', () => {
        const { asFragment } = render(
                    <MediatorContext.Provider value={mediator}>
                        <ServerContext.Provider value={server}>
                            <FriendLobby2 setPanel={() => {}} gamers={[]}  />
                        </ServerContext.Provider>
                    </MediatorContext.Provider>
                );
                expect(asFragment()).toMatchSnapshot();
    });
    test("FriendLobby2 snapshot gamerNumber 0", () => {
        const gamers = [{ person_id: 0 }, { person_id: 1 }, { person_id: 2 }];
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <FriendLobby2 setPanel={() => {}} gamers={[]}  />
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});
test("FriendLobby2 snapshot gamerNumber 1", () => {
    const gamers = [{ person_id: 0 }, { person_id: 1 }];
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <FriendLobby2 setPanel={() => {}} gamers={[]}  />
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});

test("FriendLobby2 snapshot gamerNumber 2", () => {
    const gamers = [{ person_id: 0 }, { person_id: 1 }, { person_id: 3 }];
    const { asFragment } = render(
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <FriendLobby2 setPanel={() => {}} gamers={[]}  />
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});

});