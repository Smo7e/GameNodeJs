import { useContext, useEffect, useState, useRef, memo } from "react";
import { ServerContext, StoreContext } from "../../../../App";

import "./CheatMenu.css";
import { VARIABLE } from "../../../../modules/Store/Store";
import { TGamer } from "../../../../modules/Server/types";
const CheatMenu: React.FC = memo(() => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);

    const gamers: TGamer[] = store.get(VARIABLE.GAMERS);
    let gamerName: string | null = gamers[0].name;

    const selectGamer = (e: any) => {
        gamerName = e.target.value;
    };
    const updateHpHandler = () => {
        if (gamerName) {
            server.updateHp(gamerName);
        }
    };
    return (
        <div className="Cheat-container">
            <div>Cheat Menu (kringe)</div>
            <select name="Gamers" id="Gamers" onChange={(e: React.FormEvent<HTMLSelectElement>) => selectGamer(e)}>
                {gamers.map((gamer: TGamer) => (
                    <option value={gamer.name} key={gamer.name}>
                        {gamer.name}
                    </option>
                ))}
            </select>
            <button onClick={updateHpHandler}>Нанести урон персонажу</button>
            <button onClick={() => server.updateHpMobs()}>Нанести урон мобу</button>
            <button onClick={() => server.immortality()}>Включить бесмертие</button>
        </div>
    );
});
export default CheatMenu;
