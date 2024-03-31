import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";

import useSprites from "../hooks/Sprites/useSprites";
import React, { memo, useContext, useEffect, useRef } from "react";
import { Mesh, MeshStandardMaterial, PlaneGeometry, Texture, Vector3 } from "three";
import usePositionMatrix from "../hooks/positionMatrix/usePositionMatrix";
import { MediatorContext, ServerContext } from "../../App";

const Boss: React.FC = memo(() => {
    const server = useContext(ServerContext);
    const mediator = useContext(MediatorContext);

    const bossRef = useRef<RapierRigidBody>(null);
    const bossPositionRef = useRef<Mesh>(null);
    const spriteRef = useRef<MeshStandardMaterial>(null);
    const [death, moveDown, moveRight, moveUp, moveLeft] = useSprites("trusov");
    var currentFrame = 0;
    var frameSpeed = 0.1;
    var frameLength = 9;
    let limitationОfSending = 0;
    let hpMobs = 100;
    server.getMobs().then((result: any): any => {
        if (result) {
            hpMobs = result[0].hp;
        }
    });

    let directionPlayer: Texture = moveDown[0];
    const position = usePositionMatrix();
    let canPosition = 1;
    let nowPosition = [0, 0];
    let newPosition = new Vector3();
    let distances = 0;
    useFrame(() => {
        if (!bossRef.current) return;
        if (!mediator.triger) return;
        if (hpMobs <= 0) {
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
        //куда смотрит препод
        {
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
        }

        distances = Math.sqrt(Math.pow(bossCoord.x - newPosition.x, 2) + Math.pow(bossCoord.y - newPosition.y, 2));
        if (distances < 0.06) {
            canPosition = 1;
        }
        bossRef.current.setLinvel(move, true);
        bossPositionRef.current?.position.set(bossCoord.x, bossCoord.y, 1);
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
                                key={`${index}-${index1}`}
                                position={[position[index][index1].x, position[index][index1].y, 0]}
                            >
                                <planeGeometry args={[1, 1]} />
                                <meshStandardMaterial color={"red"} />
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
            <RigidBody gravityScale={10} position={[8, -3, 0]} ref={bossRef} lockRotations mass={50}>
                <mesh>
                    <boxGeometry args={[0.8, 0.8, 1]} />
                    <meshStandardMaterial transparent opacity={0} />
                </mesh>
            </RigidBody>
            <mesh ref={bossPositionRef} position={[8, -3, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial ref={spriteRef} map={moveDown[0]} transparent />
            </mesh>
        </>
    );
});
export default Boss;
