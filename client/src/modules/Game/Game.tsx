import React, { useCallback, useContext, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ServerContext, MediatorContext } from "../../App";
import { TGamer, TMobs, TScene } from "../Server/types";
import Player from "./Player";
import Scene from "./Scene";
import { Physics } from "@react-three/rapier";
import Friends from "./Friends";
import Boss from "./Boss";
import Bullets from "./Bullets";
import BossFriends from "./BossFriends";
import TaskSelection from "../../component/Interface/component/TaskSelection/TaskSelection";
const Game: React.FC = () => {
    const server = useContext(ServerContext);
    const mediator = useContext(MediatorContext);
    const { GET_SCENE } = mediator.getEventTypes();
    const [infoFriends, setInfoFriends] = useState<TGamer[] | null>(null);
    const [infoMobs, setInfoMobs] = useState<TMobs[] | null>(null);
    const [questionFlag, setQuestionFlag] = useState<boolean>(true);

    useEffect(() => {
        server.startGameInterval();
        const getSceneHandler = (scene: TScene) => {
            if (scene.gamers != null) {
                mediator.gamers = scene.gamers;
                setInfoFriends(scene.gamers);
            }
            if (scene.mobs != null) {
                setInfoMobs(scene.mobs);
            }
        };
        mediator.subscribe(GET_SCENE, getSceneHandler);
        if (!mediator.triger) {
            let srAr = 0;
            infoFriends?.forEach((elem) => {
                srAr += Math.sqrt(
                    Math.pow((infoMobs ? infoMobs[0].x : 0) - elem.x - 0, 2) +
                        Math.pow((infoMobs ? infoMobs[0].y : 0) - elem.y - 0, 2)
                );
            });
            if (srAr / (infoFriends ? infoFriends?.length : 0) < 5) mediator.triger = true;
        }
        return () => {
            mediator.unsubscribe(GET_SCENE, getSceneHandler);
            server.stopGameInterval();
        };
    });
    if (!questionFlag && mediator.triger) {
        if (mediator.tim < 13) {
            mediator.tim += 1;
        } else {
            setQuestionFlag(true);
            mediator.tim = 0;
        }
    }
    return (
        <>
            <Canvas
                camera={{
                    position: [0, 0, 14],
                    zoom: 65,
                    near: 0.1,
                    far: 1000,
                }}
                orthographic
            >
                <ambientLight intensity={2} position={[0, 0, 5]} />
                <Physics gravity={[0, 0, -10]}>
                    <Scene />
                    <Player />
                    {infoFriends && infoFriends!.length >= 2 ? (
                        <Friends infoFriends={infoFriends.filter((n) => n.name !== mediator.user.name)} />
                    ) : (
                        <></>
                    )}
                    {infoFriends && infoFriends[0].name === mediator.user.name ? (
                        <Boss />
                    ) : (
                        <BossFriends infoMobs={infoMobs} />
                    )}

                    <Bullets infoFriends={infoFriends} infoMobs={infoMobs} />
                </Physics>
            </Canvas>
            {mediator.triger && questionFlag ? <TaskSelection setQuestionFlag={setQuestionFlag} /> : <></>}
        </>
    );
};
export default Game;
