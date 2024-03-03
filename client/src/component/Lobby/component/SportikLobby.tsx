import React, { useContext } from "react";
import { ELOBBY } from "../Lobby";
import "../Lobby.css";
import { ServerContext } from "../../../App";

interface ISportikLobbyProps {
    lobby: Function;
    gamerNumber: number;
}

const SportikLobby: React.FC<ISportikLobbyProps> = ({ lobby, gamerNumber }) => {
    const server = useContext(ServerContext);
    const leftArrowHandler = async () => {
        await server.updatePersonId(1);
        lobby(ELOBBY.TECHGUY);
    };
    const rightArrowHandler = async () => {
        await server.updatePersonId(2);
        lobby(ELOBBY.HUMANITARIAN);
    };

    return (
        <>
            {gamerNumber === 0 ? (
                <>
                    <button onClick={rightArrowHandler} className="arrow-2"></button>
                    <button onClick={leftArrowHandler} className="arrow-3"></button>

                    <div className="image-Sportik">
                        <button className="button">&lt;Спортик&gt;</button>
                    </div>
                </>
            ) : gamerNumber === 1 ? (
                <>
                    <button onClick={rightArrowHandler} className="arrow-2Friend1"></button>
                    <button onClick={leftArrowHandler} className="arrow-3Friend1"></button>

                    <div className="image-Sportik1">
                        <button className="button">&lt;Спортик&gt;</button>
                    </div>
                </>
            ) : gamerNumber === 2 ? (
                <>
                    <button onClick={rightArrowHandler} className="arrow-2Friend2"></button>
                    <button onClick={leftArrowHandler} className="arrow-3Friend2"></button>

                    <div className="image-Sportik2">
                        <button className="button">&lt;Спортик&gt;</button>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default SportikLobby;
