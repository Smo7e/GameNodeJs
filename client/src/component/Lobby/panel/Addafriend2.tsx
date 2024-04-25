import React, { useContext } from "react";
import "../Lobby.css";
import { ServerContext } from "../../../App";
interface Addafriend2LobbyProps {
    friends: any;
    userId: number;
}
const Addafriend2Lobby: React.FC<Addafriend2LobbyProps> = ({ friends, userId }) => {
    const server = useContext(ServerContext);
    return (
        <div className="addafriend2" key={Math.random()}>
            {friends.map((friend: any, index: number) => (
                <div key={index} style={{ display: "flex" }}>
                    <div className="plays">{friend.name}</div>
                    <button className="plus" onClick={() => server.addInvitation(userId, friend.id)}></button>
                </div>
            ))}
        </div>
    );
};

export default Addafriend2Lobby;
