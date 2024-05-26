import { RefObject, memo, useContext, useEffect, useRef } from "react";
import { Mesh, TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import fireBall from "./image/Bullets/fireBall.png";
import { TArrBullet, TGamer, TMob, TMobs } from "../Server/types";
import { MediatorContext, ServerContext, StoreContext } from "../../App";
import { VARIABLE } from "../Store/Store";

interface IBulletProps {
    mobName: string;
    trigger: VARIABLE;
}
const Bullets: React.FC<IBulletProps> = memo(({ mobName, trigger }) => {
    const server = useContext(ServerContext);
    const mediator = useContext(MediatorContext);
    const store = useContext(StoreContext);

    const bulletRef1 = useRef<Mesh>(null);
    const bulletRef2 = useRef<Mesh>(null);
    const bulletRef3 = useRef<Mesh>(null);
    const bulletsRefs: RefObject<Mesh>[] = [bulletRef1, bulletRef2, bulletRef3];
    let arrBulletTrajectory: TArrBullet = [
        [999, 999, 999, 999],
        [999, 999, 999, 999],
        [999, 999, 999, 999],
    ];
    const bulletsSpeed = 0.1;
    const mobsNameCurrent = mobName === "trusov" || mobName === "rusanova" ? mobName : "trusov";
    const addBullet = (gamers: TGamer[], mobs: TMobs): void => {
        if (!gamers || !mobs) return;
        const newBulletTrajectory = [
            [
                mobs[mobsNameCurrent]?.x ?? 999,
                mobs[mobsNameCurrent]?.y ?? 999,
                (gamers[0]?.x ?? 999) + Math.random(),
                (gamers[0]?.y ?? 999) + Math.random(),
            ],
            [
                mobs[mobsNameCurrent]?.x ?? 999,
                mobs[mobsNameCurrent]?.y ?? 999,
                (gamers[1]?.x ?? 999) + Math.random(),
                (gamers[1]?.y ?? 999) + Math.random(),
            ],
            [
                mobs[mobsNameCurrent]?.x ?? 999,
                mobs[mobsNameCurrent]?.y ?? 999,
                (gamers[2]?.x ?? 999) + Math.random(),
                (gamers[2]?.y ?? 999) + Math.random(),
            ],
        ];
        server.updateArrBulletTrajectory(newBulletTrajectory);
    };

    useFrame(() => {
        if (!store.get(trigger)) return;
        if (store.get(VARIABLE.MOBS)[mobName].hp <= 0) {
            bulletsRefs.forEach((elem) => {
                elem.current!.visible = false;
            });
        }
        const gamers: TGamer[] = store.get(VARIABLE.GAMERS);
        const mobs: TMobs = store.get(VARIABLE.MOBS);

        if (mobs && mobs[mobsNameCurrent].hp <= 0) return;
        let count = 0;
        arrBulletTrajectory.map((bullet: number[], i: number) => {
            if (!arrBulletTrajectory || bullet[3] >= 999) {
                count++;
                if (count === 3) {
                    addBullet(gamers, mobs);
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
                gamers?.forEach((gamer) => {
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
    const updateBulletHandler = (arr: TArrBullet) => {
        arrBulletTrajectory = arr;
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
});
export default Bullets;
