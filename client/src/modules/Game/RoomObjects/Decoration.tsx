import React from "react";
import { RigidBody } from "@react-three/rapier";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, Vector3 } from "three";
import wardrobe1 from "../image/Objects/Decorations/wardrobe1.png";
import wardrobe2 from "../image/Objects/Decorations/wardrobe2.png";
import trashcan from "../image/Objects/Decorations/trashcan.png";

const decorationTextures: Record<string, string> = {
    wardrobe1,
    wardrobe2,
    trashcan,
};

const decorationConfig: Record<
    string,
    { planeGeometryArgs: [number, number]; boxGeometryArgs: [number, number, number] }
> = {
    wardrobe1: { planeGeometryArgs: [1.7, 2.5], boxGeometryArgs: [1.6, 1.5, 1] },
    wardrobe2: { planeGeometryArgs: [1.7, 2.5], boxGeometryArgs: [1, 2, 1] },
    trashcan: { planeGeometryArgs: [0.5, 0.7], boxGeometryArgs: [0.1, 0.4, 1] },
};

interface IDecorationProps {
    position: [number, number, number];
    type: string;
}

const Decoration: React.FC<IDecorationProps> = ({ position, type }) => {
    const { planeGeometryArgs, boxGeometryArgs } = decorationConfig[type] || decorationConfig.trashcan;
    const decorationTexture = decorationTextures[type] || trashcan;

    return (
        <>
            <mesh position={new Vector3(position[0], position[1] - 0.25, position[2])}>
                <planeGeometry args={planeGeometryArgs} />
                <meshStandardMaterial map={useLoader(TextureLoader, decorationTexture)} transparent />
            </mesh>
            <RigidBody position={position} lockTranslations lockRotations>
                <mesh>
                    <boxGeometry args={boxGeometryArgs} />
                    <meshStandardMaterial color="red" transparent opacity={0} />
                </mesh>
            </RigidBody>
        </>
    );
};

export default Decoration;
