import React, { useContext, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { MediatorContext, StoreContext } from "../../App";
import { TGamer, TMob } from "../Server/types";
import Player from "./Player";
import Scene from "./Scene";
import { Physics } from "@react-three/rapier";
import Friends from "./Friends";
import Boss from "./Boss";
import Bullets from "./Bullets";
import BossFriends from "./BossFriends";
import { VARIABLE } from "../Store/Store";
const Game: React.FC = () => {
    const mediator = useContext(MediatorContext);
    const store = useContext(StoreContext);
    let gamers: TGamer[] = store.get(VARIABLE.GAMERS);
    let mobs: TMob[] = store.get(VARIABLE.MOBS);
    const trigger: boolean = store.get(VARIABLE.TRIGGER);

    useEffect(() => {
        const { GET_GAMERS } = mediator.getEventTypes();
        const { GET_MOBS } = mediator.getEventTypes();
        const getMobsHandler = (data: TMob[]) => {
            mobs = data;
            updateGame();
        };
        const getGamersHandler = (data: TGamer[]) => {
            gamers = data;
            updateGame();
        };

        const updateGame = () => {
            if (!trigger) {
                let srAr = 0;
                gamers?.forEach((elem) => {
                    srAr += Math.sqrt(
                        Math.pow((mobs ? mobs[0].x : 0) - elem.x - 0, 2) +
                            Math.pow((mobs ? mobs[0].y : 0) - elem.y - 0, 2)
                    );
                });
                if (srAr / (gamers ? gamers?.length : 9999999) < 5) store.update(VARIABLE.TRIGGER, true);
            }
        };

        mediator.subscribe(GET_GAMERS, getGamersHandler);
        mediator.subscribe(GET_MOBS, getMobsHandler);

        return () => {
            mediator.unsubscribe(GET_GAMERS, getGamersHandler);
            mediator.unsubscribe(GET_MOBS, getMobsHandler);
        };
    });

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
                    {gamers && gamers!.length >= 2 ? <Friends /> : <></>}

                    {store.get(VARIABLE.GAMER).post === "Admin" ? (
                        <>
                            <Boss />
                            <Bullets />
                        </>
                    ) : (
                        <BossFriends />
                    )}
                </Physics>
            </Canvas>
        </>
    );
};
export default Game;
