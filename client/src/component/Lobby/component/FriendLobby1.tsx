import { useContext, useState } from "react";
import { ELOBBY, EPANEL } from "../Lobby";
import { MediatorContext } from "../../../App";
import SportikLobby from "./SportikLobby";
import HumanitarianLobby from "./HumanitarianLobby";
import TechguyLobby from "./TechguyLobby";
interface IFriendLobby1Props {
    setPanel: Function;
    gamers: any;
}
const FriendLobby1: React.FC<IFriendLobby1Props> = ({ setPanel, gamers }) => {
    const mediator = useContext(MediatorContext);
    const [lobbyFriend1, setLobbyFriend1] = useState<ELOBBY>(ELOBBY.SPORTIK);
    if (!gamers) return <></>;

    return (
        <>
            {gamers.length === 1 ? (
                <div id="test-image-rack1" className="image-rack1">
                    <div onClick={() => setPanel(EPANEL.ADDAFRIEND1)} id="test-friend" className="friend"></div>
                </div>
            ) : gamers.length > 1 && mediator.gamer.post != "Friend-1" ? (
                <>
                    {gamers && gamers[1].person_id - 0 === 0 ? (
                        <div className="image-Sportik1">
                            <button className="button">&lt;Спортик&gt;</button>
                        </div>
                    ) : gamers && gamers[1].person_id - 0 === 1 ? (
                        <div className="image-techguy1">
                            <button className="button">&lt;Технарь&gt;</button>
                        </div>
                    ) : gamers && gamers[1].person_id - 0 === 2 ? (
                        <div className="image-humanitarian1">
                            <button className="button">&lt;Гуманитарий&gt;</button>
                        </div>
                    ) : (
                        <></>
                    )}
                </>
            ) : lobbyFriend1 === ELOBBY.SPORTIK ? (
                <SportikLobby lobby={setLobbyFriend1} gamerNumber={1} />
            ) : lobbyFriend1 === ELOBBY.HUMANITARIAN ? (
                <HumanitarianLobby lobby={setLobbyFriend1} gamerNumber={1} />
            ) : lobbyFriend1 === ELOBBY.TECHGUY ? (
                <TechguyLobby lobby={setLobbyFriend1} gamerNumber={1} />
            ) : (
                <div id="test-image-rack1" className="image-rack1"></div>
            )}
        </>
    );
};
export default FriendLobby1;
