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
import MathCalc from "../Math/MathCalc";
import { ETEACHERS } from "../hooks/Sprites/useSprites";
const Game: React.FC = () => {
    const mediator = useContext(MediatorContext);
    const store = useContext(StoreContext);
    const mathCalc = new MathCalc();
    let gamers: TGamer[] = store.get(VARIABLE.GAMERS);
    let mobs: TMobs = store.get(VARIABLE.MOBS);

    const triggerTrusov = VARIABLE.TRIGGERTRUSOV;
    const triggerRusanova = VARIABLE.TRIGGERRUSANOVA;
    const triggerGolovizin = VARIABLE.TRIGGERGOLOVIZIN;

    const calcDistance = (mobName: ETEACHERS) => {
        let trigger;
        let name;
        switch (mobName) {
            case ETEACHERS.TRUSOV:
                trigger = triggerTrusov;
                name = ETEACHERS.TRUSOV;
                break;
            case ETEACHERS.RUSANOVA:
                trigger = triggerRusanova;
                name = ETEACHERS.RUSANOVA;
                break;
            case ETEACHERS.GOLOVIZIN:
                trigger = triggerGolovizin;
                name = ETEACHERS.GOLOVIZIN;
                break;
            default:
                trigger = triggerTrusov;
                name = ETEACHERS.TRUSOV;
                break;
        }
        const mob = mobs[name];
        if (!store.get(trigger) && mob && mob.hp > 0) {
            let srAr = 0;
            gamers?.forEach((elem) => {
                srAr += mathCalc.calcDistance(elem.x, elem.y, mob.x, mob.y);
            });
            if (srAr / (gamers ? gamers?.length : 9999999) < 5) store.update(trigger, true);
        }
    };
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
            calcDistance(ETEACHERS.TRUSOV);
            calcDistance(ETEACHERS.RUSANOVA);
            calcDistance(ETEACHERS.GOLOVIZIN);
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
                            <Boss mobName={mobs["golovizin"].mobName} />
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
