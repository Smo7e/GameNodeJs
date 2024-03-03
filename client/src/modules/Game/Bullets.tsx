import { createRef, memo, useCallback, useContext, useEffect, useState } from "react";
import { Mesh, TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import fireBall from "./image/Bullets/fireBall.png";
import { TGamer, TMobs } from "../Server/types";
import { MediatorContext, ServerContext } from "../../App";

interface IPropsBullets {
    infoFriends: TGamer[] | null;
    infoMobs: TMobs[] | null;
}
const Bullets: React.FC<IPropsBullets> = memo(({ infoFriends, infoMobs }) => {
    const server = useContext(ServerContext);
    const mediator = useContext(MediatorContext);

    const [bulletsRefs, setbulletsRefs] = useState<any>([]);
    const [arrBullet, setArrBullet] = useState<any>([]);

    const bulletsSpeed = 0.1;
    useFrame(() => {
        if (!mediator.triger) return;
        if (infoMobs && infoMobs[0].hp <= 0) return;

        if (arrBullet.filter((n: any) => n).length === 0) {
            setArrBullet(arrBullet.filter((n: any) => n));
        }
        /// нериальное говно
        if (bulletsRefs.filter((n: any) => n).length === 0) {
            setbulletsRefs((bulletsRefs: any) =>
                Array(arrBullet.length)
                    .fill(0)
                    .map((_, i) => bulletsRefs[i] || createRef())
            );
        }

        if (arrBullet.length === 0) {
            setArrBullet([
                infoFriends && infoFriends[0]
                    ? [
                          infoMobs ? infoMobs[0].x - 0 : 200,
                          infoMobs ? infoMobs[0].y - 0 : 200,
                          infoFriends ? infoFriends[0].x - 0 : 200,
                          infoFriends ? infoFriends[0].y - 0 : 200,
                      ]
                    : null,

                infoFriends && infoFriends[1]
                    ? [
                          infoMobs ? infoMobs[0].x - 0 : 200,
                          infoMobs ? infoMobs[0].y - 0 : 200,
                          infoFriends ? infoFriends[1].x - 0 : 200,
                          infoFriends ? infoFriends[1].y - 0 : 200,
                      ]
                    : null,

                infoFriends && infoFriends[2]
                    ? [
                          infoMobs ? infoMobs[0].x - 0 : 200,
                          infoMobs ? infoMobs[0].y - 0 : 200,
                          infoFriends ? infoFriends[2].x - 0 : 200,
                          infoFriends ? infoFriends[2].y - 0 : 200,
                      ]
                    : null,
            ]);
        }

        arrBullet.map((elem: number, i: number) => {
            if (!bulletsRefs[i] || !arrBullet[i]) return;
            const bulletCoord = bulletsRefs[i].current!.position;
            const dx = arrBullet[i][2] - arrBullet[i][0];
            const dy = arrBullet[i][3] - arrBullet[i][1];
            const distances = Math.sqrt(dx * dx + dy * dy);
            const ratio = bulletsSpeed / distances;
            arrBullet[i][0] = arrBullet[i][0] + dx * ratio;
            arrBullet[i][1] = arrBullet[i][1] + dy * ratio;
            bulletCoord.set(arrBullet[i][0], arrBullet[i][1], 0);
            if (distances < 0.3) {
                infoFriends?.forEach((gamer) => {
                    const dist = Math.pow(arrBullet[i][0] - gamer.x, 2) + Math.pow(arrBullet[i][1] - gamer.y, 2);
                    if (dist < 1) {
                        server.updateHp(gamer.name, gamer.hp - 5);
                    }
                });
                delete arrBullet[i];
                setbulletsRefs((bulletsRefs: any) =>
                    Array(arrBullet.length)
                        .fill(0)
                        .map((_, i) => bulletsRefs[i] || createRef())
                );
            }
        });
    });
    useEffect(() => {
        setbulletsRefs((bulletsRefs: any) =>
            Array(arrBullet.length)
                .fill(0)
                .map((_, i) => bulletsRefs[i] || createRef())
        );
    }, []);
    const a = useLoader(TextureLoader, fireBall);
    return (
        <>
            {Array(arrBullet.length)
                .fill(0)
                .map((el, i) => (
                    <mesh ref={bulletsRefs[i]} key={i} position={[200, 200, 0]}>
                        <planeGeometry args={[0.5, 0.25]} />
                        <meshStandardMaterial map={a} transparent />
                    </mesh>
                ))}
        </>
    );
});
export default Bullets;
