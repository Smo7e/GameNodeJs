import React, { useState } from "react";
import { HOST, MEDIATOR } from "./config";
import { Server, Mediator, TError } from "./modules";
import SignUp from "./component/SignUp/SignUp";
import Game from "./modules/Game/Game";
import Menu from "./component/Menu/Menu";
import Login from "./component/Login/Login";
import Heroes from "./component/Heroes/Heroes";
import Interface from "./component/Interface/Interface";
import Lobby from "./component/Lobby/Lobby";

import "./App.css";

export const ServerContext = React.createContext<Server>(null!);
export const MediatorContext = React.createContext<Mediator>(null!);

export enum EPAGES {
    SIGNUP,
    LOGIN,
    GAME,
    MENU,
    HEROES,
    LOBBY,
}

const MainApp = () => {
    const [epages, setEpages] = useState<EPAGES>(EPAGES.LOGIN);
    return (
        <>
            {epages === EPAGES.LOGIN ? (
                <Login epages={setEpages} />
            ) : epages === EPAGES.SIGNUP ? (
                <SignUp epages={setEpages} />
            ) : epages === EPAGES.MENU ? (
                <Menu epages={setEpages} />
            ) : epages === EPAGES.GAME ? (
                <>
                    <Game />
                    <Interface />
                </>
            ) : epages === EPAGES.HEROES ? (
                <Heroes epages={setEpages} />
            ) : epages === EPAGES.LOBBY ? (
                <Lobby epages={setEpages} />
            ) : (
                <></>
            )}
        </>
    );
};

const App: React.FC = () => {
    const mediator = new Mediator(MEDIATOR);
    const server = new Server(HOST, mediator);

    const { SERVER_ERROR } = mediator.getEventTypes();
    mediator.subscribe(SERVER_ERROR, (data: TError) => {
        console.log(data);
    });

    return (
        <MediatorContext.Provider value={mediator}>
            <ServerContext.Provider value={server}>
                <MainApp />
            </ServerContext.Provider>
        </MediatorContext.Provider>
    );
};

export default App;
