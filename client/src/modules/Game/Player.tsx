import { useFrame } from "@react-three/fiber";
import React, { useContext, memo, useEffect } from "react";
import { useRef } from "react";

import useSprites from "../hooks/Sprites/useSprites";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";

import { MeshStandardMaterial, Texture, Vector3 } from "three";
import { ServerContext, StoreContext } from "../../App";
import { TGamer } from "../Server/types";
import { VARIABLE } from "../Store/Store";
//import useControls from "../hooks/controls/useControls";

const Player: React.FC = memo(() => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);

    const personRef = useRef<RapierRigidBody>(null);
    const spriteRef = useRef<MeshStandardMaterial>(null);

    const [death, moveDown, moveRight, moveUp, moveLeft] = useSprites(`${store.get(VARIABLE.GAMER).person_id}`);
    let limitationОfSending = 0;

    let cameraPosition = new Vector3(0, 0, 14);
    let currentFrame = 0;
    let directionPlayer = moveDown[0];
    const playerSpeed = 5;
    const frameSpeed = 0.1;
    const frameLegth = moveDown.length;
    let controls = {
        w: false,
        s: false,
        a: false,
        d: false,
    };

    const keydownHangler = (e: KeyboardEvent) => {
        const key = e.code[e.code.length - 1].toLowerCase();
        controls = {
            ...controls,
            [key]: true,
        };
    };
    const keyUpHangler = (e: KeyboardEvent) => {
        const key = e.code[e.code.length - 1].toLowerCase();
        controls = {
            ...controls,
            [key]: false,
        };
    };
    const updateFrame = (direction: Texture[] | null = moveDown, hp = 1) => {
        if (!direction) {
            directionPlayer = death[0];
            if (spriteRef.current && spriteRef.current.map) {
                spriteRef.current.map = directionPlayer;
                spriteRef.current.needsUpdate = true;
            }
            return;
        }
        if (hp !== 0) {
            currentFrame = (currentFrame + frameSpeed) % frameLegth;
            directionPlayer = direction[Math.floor(currentFrame)];
        }

        if (spriteRef.current && spriteRef.current.map) {
            //spriteRef.current.map.dispose();
            spriteRef.current.map = directionPlayer;
            spriteRef.current.needsUpdate = true;
        }
    };
    useFrame((state) => {
        const gamers: TGamer[] = store
            .get(VARIABLE.GAMERS)
            ?.filter((n: TGamer) => n.name === store.get(VARIABLE.USER).name);
        if (!personRef.current || !gamers) return;

        if (gamers[0].hp <= 0) {
            updateFrame(null, 0);
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
            updateFrame(direction);

            //
            personRef.current?.setLinvel(move, true);
            //console.log(personRef.current.translation().x, personRef.current.translation().y);
            const cameraMove = new Vector3(personRef.current!.translation().x, personRef.current!.translation().y, 14);
            const newPosition = cameraPosition.lerp(cameraMove, 0.1);
            cameraPosition = newPosition;
            state.camera.position.copy(newPosition);
            if (limitationОfSending % 50 === 0) {
                server.move(personRef.current!.translation().x, personRef.current!.translation().y);
            }
            limitationОfSending = limitationОfSending + 1;
        }
    });

    useEffect(() => {
        window.addEventListener("keydown", keydownHangler);
        window.addEventListener("keyup", keyUpHangler);
        return () => {
            window.removeEventListener("keydown", keydownHangler);
            window.removeEventListener("keyup", keyUpHangler);
        };
    });

    return (
        <>
            <RigidBody gravityScale={10} position={[0, 0, 0]} ref={personRef} lockRotations mass={50}>
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial ref={spriteRef} map={directionPlayer} transparent />
                </mesh>
            </RigidBody>
        </>
    );
});
export default Player;
