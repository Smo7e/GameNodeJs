import { useContext, useEffect, useRef } from "react";
import { TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import fireBall from "./image/Bullets/fireBall.png";
import { TGamer, TMobs } from "../Server/types";
import { MediatorContext, ServerContext } from "../../App";

const Bullets: React.FC = () => {
    const server = useContext(ServerContext);
    const mediator = useContext(MediatorContext);
    const bulletRef1 = useRef<any>(null);
    const bulletRef2 = useRef<any>(null);
    const bulletRef3 = useRef<any>(null);
    const bulletsRefs: any = [bulletRef1, bulletRef2, bulletRef3];
    let arrBulletTrajectory: any = [
        [999, 999, 999, 999],
        [999, 999, 999, 999],
        [999, 999, 999, 999],
    ];

    const bulletsSpeed = 0.1;

    const addBullet = (infoFriends: TGamer[], infoMobs: TMobs[]): void => {
        const newBulletTrajectory = [
            [
                infoMobs[0]?.x ?? 999,
                infoMobs[0]?.y ?? 999,
                (infoFriends[0]?.x ?? 999) + Math.random(),
                (infoFriends[0]?.y ?? 999) + Math.random(),
            ],
            [
                infoMobs[0]?.x ?? 999,
                infoMobs[0]?.y ?? 999,
                (infoFriends[1]?.x ?? 999) + Math.random(),
                (infoFriends[1]?.y ?? 999) + Math.random(),
            ],
            [
                infoMobs[0]?.x ?? 999,
                infoMobs[0]?.y ?? 999,
                (infoFriends[2]?.x ?? 999) + Math.random(),
                (infoFriends[2]?.y ?? 999) + Math.random(),
            ],
        ];
        server.updateArrBulletTrajectory(newBulletTrajectory);
    };

    useFrame(() => {
        if (!mediator.triger) return;
        const infoFriends: TGamer[] = mediator.gamers;
        const infoMobs: TMobs[] = mediator.mobs;

        if (infoMobs && infoMobs[0].hp <= 0) return;
        let count = 0;
        arrBulletTrajectory.map((bullet: any, i: number) => {
            if (!arrBulletTrajectory || bullet[3] >= 999) {
                count++;
                if (count == 3) {
                    addBullet(infoFriends, infoMobs);
                }
                return;
            }
            const bulletCoord = bulletsRefs[i].current!.position;
            const dx = bullet[2] - bullet[0];
            const dy = bullet[3] - bullet[1];
            const distances = Math.sqrt(dx * dx + dy * dy);
            const ratio = bulletsSpeed / distances;
            bullet[0] = bullet[0] + dx * ratio;
            bullet[1] = bullet[1] + dy * ratio;
            bulletCoord.set(bullet[0], bullet[1], 0);
            if (distances < 0.3) {
                infoFriends?.forEach((gamer) => {
                    const dist = Math.pow(bullet[0] - gamer.x, 2) + Math.pow(bullet[1] - gamer.y, 2);
                    if (dist < 1) {
                        server.updateHp(gamer.name);
                    }
                });
                arrBulletTrajectory[i] = [999, 999, 999, 999];
                bulletCoord.set(999, 999, 0);
            }
        });
    });

    const a = useLoader(TextureLoader, fireBall);
    const updateBulletHandler = (arr: any) => {
        arrBulletTrajectory = arr;
        console.log(arrBulletTrajectory);
    };

    useEffect(() => {
        const { UPDATE_ARR_BULLET_TRAJECTORY } = mediator.getEventTypes();
        mediator.subscribe(UPDATE_ARR_BULLET_TRAJECTORY, updateBulletHandler);
        return () => {
            mediator.unsubscribe(UPDATE_ARR_BULLET_TRAJECTORY, updateBulletHandler);
        };
    });

    return (
        <>
            <mesh ref={bulletRef1} position={[200, 200, 0]}>
                <planeGeometry args={[0.5, 0.25]} />
                <meshStandardMaterial map={a} transparent />
            </mesh>
            <mesh ref={bulletRef2} position={[200, 200, 0]}>
                <planeGeometry args={[0.5, 0.25]} />
                <meshStandardMaterial map={a} transparent />
            </mesh>
            <mesh ref={bulletRef3} position={[200, 200, 0]}>
                <planeGeometry args={[0.5, 0.25]} />
                <meshStandardMaterial map={a} transparent />
            </mesh>
        </>
    );
};
export default Bullets;
