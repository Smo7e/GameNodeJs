import React, { useContext, useEffect, useRef, useState } from "react";
import { MediatorContext, ServerContext } from "../../App";
import Chat from "./component/Chat/Chat";
// import TaskSelection from "./component/TaskSelection/TaskSelection";
import { TGamer, TMobs, TScene } from "../../modules/Server/types";
import "./Interface.css";
import TaskSelection from "./component/TaskSelection/TaskSelection";

const Interface: React.FC = () => {
    const server = useContext(ServerContext);
    const mediator = useContext(MediatorContext);
    const [infoMobs, setInfoMobs] = useState<TMobs[] | null>(null);
    const timeRef = useRef<HTMLDivElement>(null);
    const { GET_SCENE } = mediator.getEventTypes();
    const [infoFriends, setInfoFriends] = useState<TGamer[] | null>(null);
    const [gamers, setGamers] = useState<any>(null);
    const [questionFlag, setQuestionFlag] = useState<boolean>(true);
    const [timer, setTimer] = useState({ seconds: 0, minutes: 0 });

    useEffect(() => {
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
            clearInterval(timeInterval);
        };
    }, []);

    useEffect(() => {
        const { GET_GAMERS } = mediator.getEventTypes();
        const { GET_MOBS } = mediator.getEventTypes();

        const getGamersHandler = (data: any) => {
            setGamers(data);
        };
        const getMobsHandler = (data: any) => {
            setInfoMobs(data);
        };

        mediator.subscribe(GET_GAMERS, getGamersHandler);
        mediator.subscribe(GET_MOBS, getMobsHandler);

        return () => {
            mediator.unsubscribe(GET_GAMERS, getGamersHandler);
            mediator.unsubscribe(GET_MOBS, getMobsHandler);
        };
    });

    // вызов окошка задания
    if (!questionFlag && mediator.triger) {
        if (mediator.tim < 13) {
            mediator.tim += 1;
        } else {
            setQuestionFlag(true);
            mediator.tim = 0;
        }
    }

    return (
        <div className="Interface-container">
            <div className="back-arrow-interface"></div>
            <div className="settings-arrow-interface"></div>

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
                        gamers.map((elem: any, index: number) => (
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
            {mediator.triger && questionFlag ? <TaskSelection setQuestionFlag={setQuestionFlag} /> : <></>}
            {mediator.triger ? (
                <div className="BossXP">{infoMobs ? <div>BossXP: {infoMobs[0].hp}</div> : <></>}</div>
            ) : (
                <></>
            )}

            <Chat />
        </div>
    );
};

export default Interface;
