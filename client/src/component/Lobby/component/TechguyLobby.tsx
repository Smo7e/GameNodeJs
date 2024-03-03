import React, { useContext } from "react";

import { ELOBBY } from "../Lobby";
import "../Lobby.css";
import { ServerContext } from "../../../App";

interface ITechguyLobbyProps {
    lobby: Function;
    gamerNumber: number;
}

const TechguyLobby: React.FC<ITechguyLobbyProps> = ({ lobby, gamerNumber }) => {
    const server = useContext(ServerContext);

    const leftArrowHandler = async () => {
        await server.updatePersonId(2);
        lobby(ELOBBY.HUMANITARIAN);
    };
    const rightArrowHandler = async () => {
        await server.updatePersonId(0);
        lobby(ELOBBY.SPORTIK);
    };
    return (
        <>
            {gamerNumber === 0 ? (
                <div>
                    <button onClick={rightArrowHandler} className="arrow-2"></button>
                    <button onClick={leftArrowHandler} className="arrow-3"></button>

                    <div className="image-techguy">
                        <button className="button">&lt;Технарь&gt;</button>
                    </div>
                </div>
            ) : gamerNumber === 1 ? (
                <div>
                    <button onClick={rightArrowHandler} className="arrow-2Friend1"></button>
                    <button onClick={leftArrowHandler} className="arrow-3Friend1"></button>

                    <div className="image-techguy1">
                        <button className="button">&lt;Технарь&gt;</button>
                    </div>
                </div>
            ) : gamerNumber === 2 ? (
                <div>
                    <button onClick={rightArrowHandler} className="arrow-2Friend2"></button>
                    <button onClick={leftArrowHandler} className="arrow-3Friend2"></button>

                    <div className="image-techguy2">
                        <button className="button">&lt;Технарь&gt;</button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default TechguyLobby;
