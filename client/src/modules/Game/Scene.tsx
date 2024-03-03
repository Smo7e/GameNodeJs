import React, { memo } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { RigidBody } from "@react-three/rapier";
import Wall from "./RoomObjects/Wall";
import floor1 from "./image/floor1.png";
import Office421 from "./Rooms/Office421";
import Office317 from "./Rooms/Offise317";
import Office424 from "./Rooms/Office224";

const Scene: React.FC = memo(() => {
    const fon = useLoader(TextureLoader, floor1);
    return (
        <>
            <RigidBody>
                <mesh position={[0, 0, -1]}>
                    <planeGeometry args={[50, 50]} />
                    <meshStandardMaterial map={fon} transparent />
                </mesh>
            </RigidBody>

            <Office421 />
            <Office317 />
            <Office424 />

            {/* Правая стена коридор */}
            <Wall position={[4, 14.4, 0]} args={[0.5, 17, 1]} />
            <Wall position={[4, 0.8, 0]} args={[0.5, 6.2, 1]} />
            <Wall position={[4, -13.7, 0]} args={[0.5, 19, 1]} />

            {/* Левая стена коридор */}
            <Wall position={[-4, 2.2, 0]} args={[0.5, 42, 1]} />
            <Wall position={[-4, -21.8, 0]} args={[0.5, 2.5, 1]} />

            {/* Верхняя и нижняя стена коридор */}
            <Wall position={[0.3, 23, 0]} args={[7, 0.5, 1]} />
            <Wall position={[0.2, -23.6, 0]} args={[7, 0.5, 1]} />
        </>
    );
});

export default Scene;
