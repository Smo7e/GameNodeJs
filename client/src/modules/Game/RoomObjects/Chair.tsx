import React from "react";
import { RigidBody } from "@react-three/rapier";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, Vector3 } from "three";
import chair1 from "../image/Objects/Chairs/chair1.png";
import chair2 from "../image/Objects/Chairs/chair2.png";
import chair3 from "../image/Objects/Chairs/chair3.png";
import chair4 from "../image/Objects/Chairs/chair4.png";
import chair5 from "../image/Objects/Chairs/chair5.png";

const chairTextures: Record<string, string> = {
    chair1,
    chair2,
    chair3,
    chair4,
    chair5,
};

interface IChairProps {
    position: [number, number, number];
    type: string;
}

const Chair: React.FC<IChairProps> = ({ position, type }) => {
    const chairTexture = chairTextures[type] || chair1;

    return (
        <>
            <mesh position={new Vector3(position[0], position[1] - 0.15, position[2])}>
                <planeGeometry args={[0.6, 1.2]} />
                <meshStandardMaterial map={useLoader(TextureLoader, chairTexture)} transparent />
            </mesh>
            <RigidBody position={position} lockTranslations lockRotations>
                <mesh>
                    <boxGeometry args={[0.1, 0.2, 0.5]} />
                    <meshStandardMaterial color="red" transparent opacity={0} />
                </mesh>
            </RigidBody>
        </>
    );
};

export default Chair;
