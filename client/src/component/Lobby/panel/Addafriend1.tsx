import React from "react";
import "../Lobby.css";
import { TGamer } from "../../../modules/Server/types";
interface Addafriend1LobbyProps {
    friends: TGamer[];
    userId: number;
}
const Addafriend1Lobby: React.FC<Addafriend1LobbyProps> = ({ friends, userId }) => {
    return (
        <>
            <div className="addafriend" key={userId}>
                {friends.map((friend: TGamer, index: number) => (
                    <div key={index} style={{ display: "flex" }}>
                        <div className="plays">{friend.name}</div>
                        <button className="plus"></button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Addafriend1Lobby;
