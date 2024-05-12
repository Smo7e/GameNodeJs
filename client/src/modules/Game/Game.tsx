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
const Game: React.FC = () => {
    const mediator = useContext(MediatorContext);
    let infoFriends: TGamer[] = mediator.gamers;
    let infoMobs: TMobs[] = mediator.mobs;
    useEffect(() => {
        const { GET_GAMERS } = mediator.getEventTypes();

        const getGamersHandler = (data: any) => {
            infoFriends = mediator.gamers;
            infoMobs = mediator.mobs;
            console.log();

            if (!mediator.triger) {
                let srAr = 0;
                infoFriends?.forEach((elem) => {
                    srAr += Math.sqrt(
                        Math.pow((infoMobs ? infoMobs[0].x : 0) - elem.x - 0, 2) +
                            Math.pow((infoMobs ? infoMobs[0].y : 0) - elem.y - 0, 2)
                    );
                });
                if (srAr / (infoFriends ? infoFriends?.length : 9999999) < 5) mediator.triger = true;
            }
        };

        mediator.subscribe(GET_GAMERS, getGamersHandler);
        return () => {
            mediator.unsubscribe(GET_GAMERS, getGamersHandler);
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
                    {infoFriends && infoFriends!.length >= 2 ? <Friends /> : <></>}
                    {mediator.gamer.post === "Admin" ? <Boss /> : <BossFriends />}
                    {mediator.gamer.post === "Admin" ? <Bullets /> : <></>}
                </Physics>
            </Canvas>
        </>
    );
};
export default Game;
