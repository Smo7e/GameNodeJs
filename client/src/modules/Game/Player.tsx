import { useFrame } from "@react-three/fiber";
import React, { useContext, useState, memo } from "react";
import { useRef } from "react";

import useSprites from "../hooks/Sprites/useSprites";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";

import { Vector3 } from "three";
import { MediatorContext, ServerContext } from "../../App";
import useControls from "../hooks/controls/useControls";
interface PlayerProps {
    infoFriends: any;
}
const Player: React.FC<PlayerProps> = memo((infoFriends) => {
    const server = useContext(ServerContext);
    const mediator = useContext(MediatorContext);
    const personRef = useRef<RapierRigidBody>(null);
    const [death, moveDown, moveRight, moveUp, moveLeft] = useSprites(mediator.gamer.person_id);
    const [limitationОfSending, setLimitationОfSending] = useState(0);

    const controls = useControls();
    const [cameraPosition, setCameraPosition] = useState(new Vector3(0, 0, 14));
    const [currentFrame, setCurrentFrame] = useState(0);
    const [directionPlayer, setDirectionPlayer] = useState(moveDown[0]);
    const playerSpeed = 5;
    const frameSpeed = 0.1;
    const frameLegth = moveDown.length;

    useFrame((state) => {
        if (!personRef.current || !infoFriends || !infoFriends.infoFriends) return;
        if (infoFriends.infoFriends[0].hp <= 0) {
            setDirectionPlayer(death[0]);
            return;
        }
        const { w, a, s, d } = controls;
        if (w || a || s || d) {
            const move = new Vector3();
            let direction = moveUp;
            if (w) {
                move.y += playerSpeed;
                direction = moveUp;
            }
            if (s) {
                move.y -= playerSpeed;
                direction = moveDown;
            }
            if (a) {
                move.x -= playerSpeed;
                direction = moveLeft;
            }
            if (d) {
                move.x += playerSpeed;
                direction = moveRight;
            }
            setCurrentFrame((currentFrame + frameSpeed) % frameLegth);

            setDirectionPlayer(direction[Math.floor(currentFrame)]);

            personRef.current?.setLinvel(move, true);
            const cameraMove = new Vector3(personRef.current!.translation().x, personRef.current!.translation().y, 14);
            const newPosition = cameraPosition.lerp(cameraMove, 0.1);
            setCameraPosition(newPosition);
            state.camera.position.copy(newPosition);
            if (limitationОfSending % 50 === 0) {
                server.move("walk", personRef.current!.translation().x, personRef.current!.translation().y, "alive");
            }
            setLimitationОfSending(limitationОfSending + 1);
        }
    });

    return (
        <>
            <RigidBody gravityScale={10} position={[0, 0, 0]} ref={personRef} lockRotations mass={50}>
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial map={directionPlayer} transparent />
                </mesh>
            </RigidBody>
        </>
    );
});
export default Player;
