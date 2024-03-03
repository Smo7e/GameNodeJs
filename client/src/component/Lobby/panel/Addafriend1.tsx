import React from "react";
import "../Lobby.css";
interface Addafriend1LobbyProps {
    friends: any;
    userId: number;
}
const Addafriend1Lobby: React.FC<Addafriend1LobbyProps> = ({ friends, userId }) => {
    return (
        <>
            <div className="addafriend" key={userId}>
                {friends.map((friend: any) => (
                    <div style={{ display: "flex" }}>
                        <div className="plays">{friend.name}</div>
                        <button className="plus"></button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Addafriend1Lobby;
