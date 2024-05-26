import React, { useContext, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { MediatorContext, StoreContext } from "../../App";
import { TGamer, TMob, TMobs } from "../Server/types";
import Player from "./Player";
import Scene from "./Scene";
import { Physics } from "@react-three/rapier";
import Friends from "./Friends";
import Boss from "./Boss";
import BossFriends from "./BossFriends";
import { VARIABLE } from "../Store/Store";
const Game: React.FC = () => {
    const mediator = useContext(MediatorContext);
    const store = useContext(StoreContext);
    let gamers: TGamer[] = store.get(VARIABLE.GAMERS);
    let mobs: TMobs = store.get(VARIABLE.MOBS);
    const triggerTrusov: boolean = store.get(VARIABLE.TRIGGERTRUSOV);
    const triggerRusanova: boolean = store.get(VARIABLE.TRIGGERRUSANOVA);

    useEffect(() => {
        const { GET_GAMERS } = mediator.getEventTypes();
        const { GET_MOBS } = mediator.getEventTypes();
        const getMobsHandler = (data: TMobs) => {
            mobs = data;
            updateGame();
        };
        const getGamersHandler = (data: TGamer[]): void => {
            gamers = data;
            updateGame();
        };

        const updateGame = () => {
            if (!triggerTrusov && mobs["trusov"].hp > 0) {
                let srAr = 0;
                gamers?.forEach((elem) => {
                    srAr += Math.sqrt(
                        Math.pow((mobs ? mobs["trusov"].x : 0) - elem.x - 0, 2) +
                            Math.pow((mobs ? mobs["trusov"].y : 0) - elem.y - 0, 2)
                    );
                });
                if (srAr / (gamers ? gamers?.length : 9999999) < 5) store.update(VARIABLE.TRIGGERTRUSOV, true);
            }
            if (!triggerRusanova && mobs["rusanova"].hp > 0) {
                let srAr = 0;
                gamers?.forEach((elem) => {
                    srAr += Math.sqrt(
                        Math.pow((mobs ? mobs["rusanova"].x : 0) - elem.x - 0, 2) +
                            Math.pow((mobs ? mobs["rusanova"].y : 0) - elem.y - 0, 2)
                    );
                });
                if (srAr / (gamers ? gamers?.length : 9999999) < 5) store.update(VARIABLE.TRIGGERRUSANOVA, true);
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
                            <Boss mobName={mobs["trusov"].mobName} />
                            <Boss mobName={mobs["rusanova"].mobName} />
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
