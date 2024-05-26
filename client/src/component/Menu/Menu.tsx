import React, { useContext, useEffect, useRef, useState } from "react";
import { EPAGES, MediatorContext, ServerContext } from "../../App";
import logo from "./image/logo.png";
import "./Menu.css";
import { TFriend, TGamer, TInvites } from "../../modules/Server/types";
interface IMenuProps {
    epages: Function;
}
const Menu: React.FC<IMenuProps> = ({ epages }) => {
    const server = useContext(ServerContext);
    const mediator = useContext(MediatorContext);

    const idRef = useRef<HTMLInputElement>(null);
    const [friends, setFriends] = useState<TFriend[]>([{ id: 0, name: "У Вас нету друзей,пхахахахахха!" }]);
    const [invites, setInvites] = useState<TInvites | null>(null);
    const [showIdInput, setShowIdInput] = useState(false);

    const clickHandler = () => {
        const id = idRef.current!.value;
        server.addFriend(id);
    };
    const toggleIdInput = () => {
        setShowIdInput(!showIdInput);
    };

    useEffect(() => {
        const { GET_INVITES } = mediator.getEventTypes();
        const { GET_FRIENDS } = mediator.getEventTypes();
        const { LOGOUT } = mediator.getEventTypes();

        const getInvitesHandler = (invites: TInvites) => {
            setInvites(invites);
        };
        const getFriendsHandler = (friends: TFriend[]) => {
            setFriends(friends);
        };
        const logoutHandler = () => {
            epages(EPAGES.LOGIN);
        };
        mediator.subscribe(GET_FRIENDS, getFriendsHandler);
        mediator.subscribe(GET_INVITES, getInvitesHandler);
        mediator.subscribe(LOGOUT, logoutHandler);

        return () => {
            mediator.unsubscribe(GET_FRIENDS, getFriendsHandler);
            mediator.unsubscribe(GET_INVITES, getInvitesHandler);
            mediator.unsubscribe(LOGOUT, logoutHandler);
        };
    });
    const lobbyHandler = async () => {
        await server.createLobby();
        epages(EPAGES.LOBBY);
    };

    // mp

    return (
        <div className="mainMenu" id="test-mainMemu">
            <div style={{ height: 200, width: 200, position: "absolute", bottom: 200, right: 200 }}></div>
            <img className="photo-button" src={logo} id="test-logo" />

            <div className="buttons-container">
                <div onClick={lobbyHandler} className="button1" id="test-play">
                    Играть
                </div>
                <div onClick={() => epages(EPAGES.HEROES)} className="button2" id="test-heroes">
                    Герои
                </div>
                <div onClick={() => epages(EPAGES.PARAMETERS)} className="button3" id="test-settings">
                    Параметры
                </div>
            </div>

            <div className="profile-panel" id="test-profile">
                <div className="user-profile" id="test-user"></div>
                <hr className="hr-user-profile1" id="test-hr1" />

                <div className="text-button" id="test-friends">
                    Друзья
                    {showIdInput && (
                        <div id="test-new-profile">
                            <input className="add-friend" ref={idRef} type="text" placeholder="Введите ID друга" />
                            <button className="add-friend-button" onClick={clickHandler}>
                                Добавить друга
                            </button>
                        </div>
                    )}
                </div>

                <div className="text-Invitation" id="test-friends">
                    Приглашение
                    <hr className="hr-line-Invitation" id="test-friends" />
                </div>

                <div onClick={toggleIdInput} className="new-profile-button"></div>
                <div
                    style={{
                        left: 5,
                        height: 240,
                        width: 222,
                        position: "absolute",
                        bottom: 60,
                        right: 200,
                        overflowY: "hidden",
                    }}
                >
                    {invites && invites.friendsId ? (
                        invites.friendsId.map((invite: number, index: number) => (
                            <div style={{ display: "flex" }} key={index}>
                                <div className="your-friend" key={index}>
                                    Пользователь с id:{invite} приглашает вас.
                                </div>
                                <button
                                    className="toaccept"
                                    onClick={() => {
                                        server.addGamers(invites!.lobbyName);
                                        epages(EPAGES.LOBBY);
                                    }}
                                ></button>
                                <button className="deny" onClick={() => console.log(0)}></button> ////////
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>

                <div className="your-friend-menu" id="test-friend-menu">
                    {friends.map((friend, index) => (
                        <div className="your-friend" key={index}>
                            {`${friend.id}: ${friend.name}`}
                        </div>
                    ))}
                </div>
                <hr className="hr-user-profile2" id="test-hr2" />
            </div>
            <button className="button-account" id="test-change-account" onClick={() => server.logout()}>
                Сменить аккаунт
            </button>
        </div>
    );
};

export default Menu;
