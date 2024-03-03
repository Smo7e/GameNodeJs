import React from "react";
import { RigidBody } from "@react-three/rapier";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, Vector3 } from "three";
import table1 from "../image/Objects/Tables/table1.png";
import table2 from "../image/Objects/Tables/table2.png";
import table3 from "../image/Objects/Tables/table3.png";
import table4 from "../image/Objects/Tables/table4.png";
import table5 from "../image/Objects/Tables/table5.png";
import table6 from "../image/Objects/Tables/table6.png";

const tableTextures: Record<string, string> = {
    table1,
    table2,
    table3,
    table4,
    table5,
    table6,
};

interface ITableProps {
    position: [number, number, number];
    type: string;
}

const Table: React.FC<ITableProps> = ({ position, type }) => {
    const tableConfig: Record<
        string,
        {
            planeGeometryArgs: [number, number];
            boxGeometryArgs: [number, number, number];
            boxPositionArgs: [number, number, number];
        }
    > = {
        table1: {
            planeGeometryArgs: [1.3, 3],
            boxGeometryArgs: [0.6, 2.3, 0.5],
            boxPositionArgs: [position[0], position[1] - 0.35, position[2]],
        },
        table2: {
            planeGeometryArgs: [2.3, 1.3],
            boxGeometryArgs: [2, 0.7, 1],
            boxPositionArgs: [position[0], position[1] - 0.35, position[2]],
        },
        table3: {
            planeGeometryArgs: [2.3, 1.3],
            boxGeometryArgs: [1.7, 0.6, 0.5],
            boxPositionArgs: [position[0], position[1] - 0.33, position[2]],
        },
        table4: {
            planeGeometryArgs: [2.3, 1.3],
            boxGeometryArgs: [2, 0.7, 0.5],
            boxPositionArgs: [position[0], position[1] - 0.25, position[2]],
        },
        table5: {
            planeGeometryArgs: [2.3, 1.3],
            boxGeometryArgs: [1.7, 0.7, 0.5],
            boxPositionArgs: [position[0], position[1] - 0.3, position[2]],
        },
        table6: {
            planeGeometryArgs: [1.3, 3],
            boxGeometryArgs: [0.6, 2.3, 0.5],
            boxPositionArgs: [position[0], position[1] - 0.35, position[2]],
        },
    };
    const { planeGeometryArgs, boxGeometryArgs, boxPositionArgs } =
        tableConfig[type] || tableConfig.table1;
    const tableTexture = tableTextures[type] || table1;

    return (
        <>
            <mesh position={boxPositionArgs}>
                <planeGeometry args={planeGeometryArgs} />
                <meshStandardMaterial map={useLoader(TextureLoader, tableTexture)} transparent />
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

export default Table;
