import { useContext, useState } from "react";
import { ELOBBY, EPANEL } from "../Lobby";
import { StoreContext } from "../../../App";
import SportikLobby from "./SportikLobby";
import HumanitarianLobby from "./HumanitarianLobby";
import TechguyLobby from "./TechguyLobby";
import { VARIABLE } from "../../../modules/Store/Store";
interface IFriendLobby2Props {
    setPanel: Function;
    gamers: any;
}
const FriendLobby2: React.FC<IFriendLobby2Props> = ({ setPanel, gamers }) => {
    const store = useContext(StoreContext);

    const [lobbyFriend2, setLobbyFriend2] = useState<ELOBBY>(ELOBBY.SPORTIK);

    if (!gamers) return <></>;

    return (
        <>
            {gamers.length <= 2 && store.get(VARIABLE.GAMER).post === "Admin" ? (
                <div id="test-image-rack2" className="image-rack2">
                    <div onClick={() => setPanel(EPANEL.ADDAFRIEND2)} id="test-friend" className="friend"></div>
                </div>
            ) : gamers.length > 2 && gamers && store.get(VARIABLE.GAMER).post != "Friend-2" ? (
                <>
                    {gamers && gamers[2].person_id - 0 === 0 ? (
                        <div className="image-Sportik2">
                            <button className="button">&lt;Спортик&gt;</button>
                        </div>
                    ) : gamers && gamers[2].person_id - 0 === 1 ? (
                        <div className="image-techguy2">
                            <button className="button">&lt;Технарь&gt;</button>
                        </div>
                    ) : gamers && gamers[2].person_id - 0 === 2 ? (
                        <div className="image-humanitarian2">
                            <button className="button">&lt;Гуманитарий&gt;</button>
                        </div>
                    ) : (
                        <></>
                    )}
                </>
            ) : gamers.length == 2 ? (
                <div id="test-image-rack2" className="image-rack2"></div>
            ) : lobbyFriend2 === ELOBBY.SPORTIK ? (
                <SportikLobby lobby={setLobbyFriend2} gamerNumber={2} />
            ) : lobbyFriend2 === ELOBBY.HUMANITARIAN ? (
                <HumanitarianLobby lobby={setLobbyFriend2} gamerNumber={2} />
            ) : lobbyFriend2 === ELOBBY.TECHGUY ? (
                <TechguyLobby lobby={setLobbyFriend2} gamerNumber={2} />
            ) : (
                <></>
            )}
        </>
    );
};
export default FriendLobby2;
