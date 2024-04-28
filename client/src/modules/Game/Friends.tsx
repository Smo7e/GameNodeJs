import { useFrame } from "@react-three/fiber";
import { TGamer } from "../Server/types";
import { createRef, memo, useContext, useEffect, useState } from "react";
import useSprites from "../hooks/Sprites/useSprites";
import { Vector3 } from "three";
import { MediatorContext } from "../../App";

const Friends: React.FC = memo(() => {
    const mediator = useContext(MediatorContext);
    const [friendsRefs, setFriendsRefs] = useState<any>([]);
    const [infoFriends, setInfoFriends] = useState<TGamer[]>([]);
    const [death, moveDown, moveRight, moveUp, moveLeft] = useSprites(
        `${infoFriends && infoFriends[0] ? infoFriends[0].person_id : 0}`
    );
    const [death1, moveDown1, moveRight1, moveUp1, moveLeft1] = useSprites(
        `${infoFriends && infoFriends[1] ? infoFriends[1].person_id : 0}`
    );
    const [directionFriends, setDirectionFriends] = useState(moveDown[0]);
    const [directionFriends2, setDirectionFriends2] = useState(moveDown[1]);
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        const { GET_GAMERS } = mediator.getEventTypes();

        const getGamersHandler = (data: any) => {
            setInfoFriends(data.filter((n: any) => n.name !== mediator.user.name));
        };

        mediator.subscribe(GET_GAMERS, getGamersHandler);

        setFriendsRefs((friendsRefs: any) =>
            Array(infoFriends ? infoFriends.length : 0)
                .fill(0)
                .map((_, i) => friendsRefs[i] || createRef())
        );
        return () => {
            mediator.unsubscribe(GET_GAMERS, getGamersHandler);
        };
    });
    useFrame(() => {
        friendsRefs.map((elem: any, i: number) => {
            if (!friendsRefs[i] || !infoFriends) return;

            const move = new Vector3();
            const friendSpeed = 0.035;
            const eps = 0.03;
            const frameSpeed = 0.1;
            const frameLength = 9;

            const friendsCoord = friendsRefs[i].current!.position;
            if (friendsCoord.x <= infoFriends[i].x) {
                move.x += friendSpeed;
            } else {
                move.x -= friendSpeed;
            }

            if (friendsCoord.y <= infoFriends[i].y) {
                move.y += friendSpeed;
            } else {
                move.y -= friendSpeed;
            }

            if (friendsCoord.x + eps >= infoFriends[i].x && friendsCoord.x - eps <= infoFriends[i].x) {
                move.x = 0;
            }
            if (friendsCoord.y + eps >= infoFriends[i].y && friendsCoord.y - eps <= infoFriends[i].y) {
                move.y = 0;
            }
            friendsCoord.set(friendsCoord.x + move.x, friendsCoord.y + move.y, 0);
            if (i === 0) {
                if (infoFriends[0].hp - 0 > 0) {
                    let direction = moveDown;
                    if (move.x != 0 || move.y != 0) {
                        if (Math.abs(infoFriends[i].y - friendsCoord.y) > Math.abs(infoFriends[i].x - friendsCoord.x)) {
                            if (infoFriends[i].y > friendsCoord.y) {
                                direction = moveUp;
                            } else {
                                direction = moveDown;
                            }
                        } else {
                            if (infoFriends[i].x > friendsCoord.x) {
                                direction = moveRight;
                            } else {
                                direction = moveLeft;
                            }
                        }
                        setCurrentFrame((currentFrame + frameSpeed) % frameLength);
                        setDirectionFriends(direction[Math.floor(currentFrame)]);
                    }
                } else {
                    setDirectionFriends(death[0]);
                }
            }
            if (i === 1) {
                if (infoFriends[1].hp - 0 > 0) {
                    let direction = moveDown1;
                    if (move.x != 0 || move.y != 0) {
                        if (Math.abs(infoFriends[i].y - friendsCoord.y) > Math.abs(infoFriends[i].x - friendsCoord.x)) {
                            if (infoFriends[i].y > friendsCoord.y) {
                                direction = moveUp1;
                            } else {
                                direction = moveDown1;
                            }
                        } else {
                            if (infoFriends[i].x > friendsCoord.x) {
                                direction = moveRight1;
                            } else {
                                direction = moveLeft1;
                            }
                        }
                        setCurrentFrame((currentFrame + frameSpeed) % frameLength);
                        setDirectionFriends2(direction[Math.floor(currentFrame)]);
                    }
                } else {
                    setDirectionFriends2(death1[0]);
                }
            }
        });
    });

    return (
        <>
            {Array(infoFriends ? infoFriends.length : 0)
                .fill(0)
                .map((el, i) => (
                    <mesh ref={friendsRefs[i]} key={i}>
                        <planeGeometry args={[1, 1]} />
                        <meshStandardMaterial map={i === 0 ? directionFriends : directionFriends2} transparent />
                    </mesh>
                ))}
        </>
    );
});

export default Friends;
