import React, { useContext, useEffect, useRef, useState } from "react";
import { EPAGES, MediatorContext, ServerContext } from "../../App";
import logo from "./image/logo.png";
import "./Menu.css";
import { TFriend } from "../../modules/Server/types";
interface IMenuProps {
    epages: Function;
}
const Menu: React.FC<IMenuProps> = ({ epages }) => {
    const server = useContext(ServerContext);
    const mediator = useContext(MediatorContext);

    const idRef = useRef<HTMLInputElement>(null);
    const [friends, setFriends] = useState<TFriend[]>([{ id: 0, name: "У Вас нету друзей,пхахахахахха!" }]);
    const [invites, setInvites] = useState<any>([]);

    const clickHandler = () => {
        const id = idRef.current!.value;
        server.addFriend(id);
    };

    useEffect(() => {
        const getInvitesHandler = (invites: any) => {
            setInvites(invites);
        };
        const getFriendsHandler = (friends: any) => {
            setFriends(friends);
        };
        const { GET_INVITES } = mediator.getEventTypes();
        mediator.subscribe(GET_INVITES, getInvitesHandler);

        const { GET_FRIENDS } = mediator.getEventTypes();
        mediator.subscribe(GET_FRIENDS, getFriendsHandler);

        return () => {
            mediator.unsubscribe(GET_FRIENDS, getFriendsHandler);
            mediator.unsubscribe(GET_INVITES, getInvitesHandler);
        };
    });
    const lobbyHandler = async () => {
        await server.deleteGamers();
        await server.addGamers();
        epages(EPAGES.LOBBY);
    };

    // mp

    const logoutHandler = async () => {
        await server.logout();
        epages(EPAGES.LOGIN);
    };
    return (
        <div className="mainMenu" id="test-mainMemu">
            <div style={{ height: 200, width: 200, position: "absolute", bottom: 200, right: 200 }}>
                {invites[0] != true ? (
                    invites.map((invite: any, index: number) => (
                        <div style={{ display: "flex" }}>
                            <div className="your-friend" key={index}>
                                Пользователь с id:{invite.id_who} приглашает вас.
                            </div>
                            <button
                                onClick={() => {
                                    server.addGamers();
                                    epages(EPAGES.LOBBY);
                                }}
                            >
                                Принять
                            </button>
                            <button onClick={() => console.log(0)}>Отказать</button>
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
            <img className="photo-button" src={logo} id="test-logo" />

            <div className="buttons-container">
                <div onClick={lobbyHandler} className="button1" id="test-play">
                    Играть
                </div>
                <div onClick={() => epages(EPAGES.HEROES)} className="button2" id="test-heroes">
                    Герои
                </div>
                <div className="button3" id="test-settings">
                    Параметры
                </div>
            </div>

            <div className="profile-panel" id="test-profile">
                <div className="user-profile" id="test-user"></div>
                <hr className="hr-user-profile1" id="test-hr1" />

                <div className="text-button" id="test-friends">
                    Друзья
                </div>
                <div className="your-friend-menu" id="test-friend-menu">
                    {friends.map((friend, index) => (
                        <div className="your-friend" key={index}>
                            {`${friend.id}: ${friend.name}`}
                        </div>
                    ))}
                </div>
                <hr className="hr-user-profile2" id="test-hr2" />

                <div id="test-new-profile">
                    <input ref={idRef} type="text" placeholder="Введите ID друга" />
                    <button className="add-friend-button" onClick={clickHandler}>
                        Добавить друга
                    </button>
                </div>
            </div>
            <button className="button-account" id="test-change-account" onClick={logoutHandler}>
                Сменить аккаунт
            </button>
        </div>
    );
};

export default Menu;
