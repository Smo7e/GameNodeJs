import { RigidBody } from "@react-three/rapier";
import { Vector3 } from "@react-three/fiber";
interface IWallProps {
    position: Vector3;
    args: [number, number, number];
}
const Wall: React.FC<IWallProps> = ({ position, args }) => {
    return (
        <RigidBody position={position} lockTranslations lockRotations args={args}>
            <mesh>
                <boxGeometry args={args} />
                <meshStandardMaterial color={"red"} transparent opacity={0} />
            </mesh>
        </RigidBody>
    );
};

export default Wall;
