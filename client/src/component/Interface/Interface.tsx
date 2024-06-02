import React, { useContext, useEffect, useRef, useState } from "react";

import { MediatorContext, StoreContext } from "../../App";
import { TGamer, TMob, TMobs } from "../../modules/Server/types";
import { act } from "react-dom/test-utils";

import Chat from "./component/Chat/Chat";
import ParametersGame from "./component/ParametersGame/ParametersGame";
import TaskSelection from "./component/TaskSelection/TaskSelection";

import "./Interface.css";
import { VARIABLE } from "../../modules/Store/Store";
import CheatMenu from "./component/CheatMenu/CheatMenu";
import WinOrLose from "./component/WinOrLose/WinOrLose";
import Music from "../Parameters/Music";

const Interface: React.FC = () => {
    const mediator = useContext(MediatorContext);
    const store = useContext(StoreContext);

    const [mobs, setMobs] = useState<TMobs | null>(null);
    const timeRef = useRef<HTMLDivElement>(null);
    const [gamers, setGamers] = useState<TGamer[] | null>(null);
    const [timer, setTimer] = useState({ seconds: 0, minutes: 0 });
    const parametersGameRef = useRef<HTMLDivElement>(null);
    const [showParametersGame, setShowParametersGame] = useState(false);
    const cheatMenu = true;
    const handleSettingsClick = () => {
        setShowParametersGame(true);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (parametersGameRef.current && !parametersGameRef.current.contains(event.target as Node)) {
            setShowParametersGame(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        const updateTime = () => {
            setTimer((prevTimer) => {
                let seconds = prevTimer.seconds + 1;
                let minutes = prevTimer.minutes;

                if (seconds === 60) {
                    minutes++;
                    seconds = 0;
                }

                return { seconds, minutes };
            });
        };
        let timeInterval = setInterval(updateTime, 1000);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            clearInterval(timeInterval);
        };
    }, []);

    useEffect(() => {
        const { GET_GAMERS } = mediator.getEventTypes();
        const { GET_MOBS } = mediator.getEventTypes();

        const getGamersHandler = (data: TGamer[]) => {
            setGamers(data);
        };
        const getMobsHandler = (data: TMobs) => {
            setMobs(data);
        };

        mediator.subscribe(GET_GAMERS, getGamersHandler);
        mediator.subscribe(GET_MOBS, getMobsHandler);

        return () => {
            mediator.unsubscribe(GET_GAMERS, getGamersHandler);
            mediator.unsubscribe(GET_MOBS, getMobsHandler);
        };
    });

    // вызов окошка задания

    return (
        <div className="Interface-container">
            {/* <Music /> */}
            <div className="back-arrow-interface"></div>
            <div onClick={handleSettingsClick} className="settings-arrow-interface"></div>
            {showParametersGame && (
                <div ref={parametersGameRef}>
                    <ParametersGame />
                </div>
            )}

            <div className="player-info">
                {gamers && gamers[0].person_id === 0 ? (
                    <div className="player-icon-interfaceSportik"></div>
                ) : gamers && gamers[0].person_id === 2 ? (
                    <div className="player-icon-interfaceHumanitarian"></div>
                ) : gamers && gamers[0].person_id === 1 ? (
                    <div className="player-icon-interfaceTheechguy"></div>
                ) : (
                    <></>
                )}

                <div className="I">
                    {gamers ? (
                        gamers.map((elem: TGamer, index: number) => (
                            <div
                                key={index}
                                className="HP"
                                style={{
                                    background: `linear-gradient(to right, red ${elem.hp}%, #898888 ${elem.hp}%)`,
                                }}
                            >
                                {elem.name} : {elem.hp}/100HP
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>

                <div className="player-level-interface">1</div>
            </div>

            <div className="map-info">
                <div className="miniMap-interface">Мини карта</div>

                <div className="game-info-interface">
                    <div className="coin-interface">0</div>
                    <div className="coin-icon-interface"></div>
                    <div ref={timeRef} className="time">
                        {timer.minutes < 10 ? "0" + timer.minutes : timer.minutes} :{" "}
                        {timer.seconds < 10 ? "0" + timer.seconds : timer.seconds}
                    </div>
                </div>
            </div>
            <></>
            {store.get(VARIABLE.TRIGGERTRUSOV) ? (
                <>
                    <div className="BossXP">{mobs ? <div>TrusovHP: {mobs["trusov"].hp}</div> : <></>}</div>
                    <TaskSelection mobName={"trusov"} />
                </>
            ) : (
                <></>
            )}
            {store.get(VARIABLE.TRIGGERRUSANOVA) ? (
                <>
                    <div className="BossXP">{mobs ? <div>RusanovaHP: {mobs["rusanova"].hp}</div> : <></>}</div>
                    <TaskSelection mobName={"rusanova"} />
                </>
            ) : (
                <></>
            )}
            {store.get(VARIABLE.TRIGGERGOLOVIZIN) ? (
                <>
                    <div className="BossXP">{mobs ? <div>GolovizinHP: {mobs["golovizin"].hp}</div> : <></>}</div>
                    <TaskSelection mobName={"golovizin"} />
                </>
            ) : (
                <></>
            )}

            <Chat />
            <WinOrLose />

            {cheatMenu ? <CheatMenu /> : <></>}
        </div>
    );
};

export default Interface;
