import React, { useState, useEffect, useRef, useContext } from "react";
import { EPAGES, MediatorContext, ServerContext, StoreContext } from "../../App";
import SportikLobby from "./component/SportikLobby";
import HumanitarianLobby from "./component/HumanitarianLobby";
import TechguyLobby from "./component/TechguyLobby";
import ShopLobby from "./component/Shop";

import Addafriend1 from "./panel/Addafriend1";
import Addafriend2 from "./panel/Addafriend2";

import "./Lobby.css";
import FriendLobby1 from "./component/FriendLobby1";
import FriendLobby2 from "./component/FriendLobby2";
import { VARIABLE } from "../../modules/Store/Store";

interface ILobbyProps {
    epages: Function;
}

export enum ELOBBY {
    SPORTIK,
    HUMANITARIAN,
    TECHGUY,
}

export enum EPANEL {
    ADDAFRIEND1,
    ADDAFRIEND2,
}

const Lobby: React.FC<ILobbyProps> = ({ epages }) => {
    const mediator = useContext(MediatorContext);
    const store = useContext(StoreContext);

    const [lobby, setLobby] = useState<ELOBBY>(ELOBBY.SPORTIK);
    const [panel, setPanel] = useState<EPANEL>();
    const [gamers, setGamers] = useState<any>([]);
    const panelRef = useRef<HTMLDivElement>(null);

    const gameHadler = async () => {
        epages(EPAGES.GAME);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setPanel(undefined);
            }
        };
        const { GET_GAMERS } = mediator.getEventTypes();

        const getGamersHandler = (data: any) => {
            setGamers(data);
        };
        mediator.subscribe(GET_GAMERS, getGamersHandler);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            mediator.unsubscribe(GET_GAMERS, getGamersHandler);
        };
    }, []);
    if (!gamers || !gamers[0] || !gamers[0].name) return <></>;
    ///ПЕРЕДЕЛАТЬ НЕРИАЛЬНЫХ КРИНЖ
    return (
        <div id="test-container-Lobby" className="container-Lobby">
            <button onClick={() => epages(EPAGES.MENU)} id="test-arrow-1" className="arrow-1"></button>
            <ShopLobby />
            <FriendLobby1 gamers={gamers} setPanel={setPanel} />
            <FriendLobby2 gamers={gamers} setPanel={setPanel} />
            {lobby === ELOBBY.SPORTIK && store.get(VARIABLE.GAMER).post === "Admin" ? (
                <SportikLobby lobby={setLobby} gamerNumber={0} />
            ) : lobby === ELOBBY.HUMANITARIAN && store.get(VARIABLE.GAMER).post === "Admin" ? (
                <HumanitarianLobby lobby={setLobby} gamerNumber={0} />
            ) : lobby === ELOBBY.TECHGUY && store.get(VARIABLE.GAMER).post === "Admin" ? (
                <TechguyLobby lobby={setLobby} gamerNumber={0} />
            ) : (
                <>
                    {gamers && gamers[0] && `${gamers[0].person_id}` && gamers[0].person_id - 0 === 0 ? (
                        <div className="image-Sportik">
                            <button className="button">&lt;Спортик&gt;</button>
                        </div>
                    ) : gamers && gamers[0] && `${gamers[0].person_id}` && gamers[0].person_id - 0 === 1 ? (
                        <div className="image-techguy">
                            <button className="button">&lt;Технарь&gt;</button>
                        </div>
                    ) : gamers && gamers[0] && `${gamers[0].person_id}` && gamers[0].person_id - 0 === 2 ? (
                        <div className="image-humanitarian">
                            <button className="button">&lt;Гуманитарий&gt;</button>
                        </div>
                    ) : (
                        <>чо то не то</>
                    )}
                </>
            )}
            {panel === EPANEL.ADDAFRIEND1 ? (
                <div ref={panelRef} id="test-Addafriend1">
                    <Addafriend1 friends={store.get(VARIABLE.FRIENDS)} userId={store.get(VARIABLE.USER).id} />
                </div>
            ) : panel === EPANEL.ADDAFRIEND2 ? (
                <div ref={panelRef} id="test-Addafriend2">
                    <Addafriend2 friends={store.get(VARIABLE.USER).id} userId={store.get(VARIABLE.USER).id} />
                </div>
            ) : (
                <></>
            )}
            <button onClick={gameHadler} id="test-play" className="play">
                ИГРАТЬ
            </button>
        </div>
    );
};

export default Lobby;
