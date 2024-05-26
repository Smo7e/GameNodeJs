import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";

import useSprites, { ETEACHERS } from "../hooks/Sprites/useSprites";
import React, { memo, useContext, useRef } from "react";
import { MeshStandardMaterial, Texture, Vector3 } from "three";
import usePositionMatrix from "../hooks/positionMatrix/usePositionMatrix";
import { ServerContext, StoreContext } from "../../App";
import { VARIABLE } from "../Store/Store";
import Bullets from "./Bullets";

interface IBossProps {
    mobName: string;
}
const Boss: React.FC<IBossProps> = memo(({ mobName }) => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);

    const bossRef = useRef<RapierRigidBody>(null);
    const spriteRef = useRef<MeshStandardMaterial>(null);
    const [death, moveDown, moveRight, moveUp, moveLeft] = useSprites(mobName);
    var currentFrame = 0;
    var frameSpeed = 0.1;
    var frameLength = 9;
    let limitationОfSending = 0;

    let directionPlayer: Texture = moveDown[0];
    const position = usePositionMatrix(mobName);

    let canPosition = 1;
    let nowPosition = [0, 0];
    let newPosition = new Vector3();
    let distances = 0;

    let trigger: VARIABLE;
    switch (mobName) {
        case "trusov":
            trigger = VARIABLE.TRIGGERTRUSOV;
            break;
        case "rusanova":
            trigger = VARIABLE.TRIGGERRUSANOVA;
            break;
        case "golovizin":
            trigger = VARIABLE.TRIGGERGOLOVIZIN;
            break;
        default:
            trigger = VARIABLE.TRIGGERTRUSOV;
            break;
    }

    const startPosition: Vector3 = new Vector3(
        store.get(VARIABLE.MOBS)[mobName].x,
        store.get(VARIABLE.MOBS)[mobName].y,
        0
    );
    useFrame(() => {
        if (!bossRef.current || !store.get(trigger)) return;
        store.update(VARIABLE.CURRENTMOB, store.get(VARIABLE.MOBS)[mobName]);
        if (!store.get(VARIABLE.CURRENTMOB)) return;
        if (store.get(VARIABLE.MOBS)[mobName].hp <= 0) {
            store.update(trigger, false);
            if (spriteRef.current) {
                if (spriteRef.current.map) {
                    spriteRef.current.map.dispose();
                    spriteRef.current.map = death[0];
                }
            }
            return;
        }
        let x;
        let y;
        if (canPosition) {
            if (rndNumber(0, 1)) {
                x = rndNumber(0, position.length - 1);
                y = nowPosition[1];
            } else {
                x = nowPosition[0];
                y = rndNumber(0, position[nowPosition[0]].length - 1);
            }
            canPosition = 0;
            nowPosition = [x, y];
            newPosition = new Vector3(position[x][y].x, position[x][y].y, 0);
        }
        const move = new Vector3();
        const bossSpeed = 4;
        const bossCoord = bossRef.current!.translation();
        const eps = 0.04;
        let direction = moveDown;

        if (bossCoord.x <= newPosition.x) {
            move.x += bossSpeed;
        } else {
            move.x -= bossSpeed;
        }

        if (bossCoord.y <= newPosition.y) {
            move.y += bossSpeed;
        } else {
            move.y -= bossSpeed;
        }

        if (bossCoord.x + eps >= newPosition.x && bossCoord.x - eps <= newPosition.x) {
            move.x = 0;
        }
        if (bossCoord.y + eps >= newPosition.y && bossCoord.y - eps <= newPosition.y) {
            move.y = 0;
        }

        distances = Math.sqrt(Math.pow(bossCoord.x - newPosition.x, 2) + Math.pow(bossCoord.y - newPosition.y, 2));
        if (distances < 0.06) {
            canPosition = 1;
        }
        bossRef.current.setLinvel(move, true);
        //куда смотрит препод

        if (Math.abs(newPosition.y - bossCoord.y) > Math.abs(newPosition.x - bossCoord.x)) {
            if (newPosition.y > bossCoord.y) {
                direction = moveUp;
            } else {
                direction = moveDown;
            }
        } else {
            if (newPosition.x > bossCoord.x) {
                direction = moveRight;
            } else {
                direction = moveLeft;
            }
        }
        if (limitationОfSending % 50 === 0) {
            server.moveMobs(bossCoord.x, bossCoord.y);
        }

        currentFrame = (currentFrame + frameSpeed) % frameLength;
        directionPlayer = direction[Math.floor(currentFrame)];
        if (spriteRef.current) {
            if (spriteRef.current.map) {
                spriteRef.current.map.dispose();
                spriteRef.current.map = directionPlayer;
            }
        }
        limitationОfSending += 1;
    });
    function rndNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function CheckPositionMatrix() {
        return (
            <>
                {position.map((elem, index) => {
                    return elem.map((elem1, index1) =>
                        elem1 || elem ? (
                            <mesh
                                key={`${index}-${index1}-${mobName}`}
                                position={[position[index][index1].x, position[index][index1].y, 1]}
                            >
                                <planeGeometry args={[1, 1]} />
                                <meshStandardMaterial color={"blue"} />
                            </mesh>
                        ) : (
                            <></>
                        )
                    );
                })}
            </>
        );
    }
    return (
        <>
            {/* <CheckPositionMatrix /> */}
            <Bullets mobName={mobName} trigger={trigger} />
            <RigidBody gravityScale={10} position={startPosition} ref={bossRef} lockRotations mass={50}>
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial ref={spriteRef} map={moveDown[0]} transparent />
                </mesh>
            </RigidBody>
        </>
    );
});
export default Boss;
