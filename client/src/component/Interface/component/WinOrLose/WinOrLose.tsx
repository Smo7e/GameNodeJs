import { memo, useContext, useEffect, useState } from "react";
import Lose from "./Lose";
import Win from "./Win";
import { StoreContext } from "../../../../App";
import { VARIABLE } from "../../../../modules/Store/Store";
import { TGamer, TMob } from "../../../../modules/Server/types";

enum ERESULT {
    WIN,
    LOSE,
}
const WinOrLose: React.FC = memo(() => {
    const [finish, setFinish] = useState<boolean>(false);
    const [result, setResult] = useState<ERESULT | null>(null);

    const [oneFinish, setOneFinish] = useState<boolean>(false);

    const store = useContext(StoreContext);
    useEffect(() => {
        const timerId = setInterval(() => {
            if (finish) return;
            let count = 0;
            const gamers = store.get(VARIABLE.GAMERS);
            const mobs = store.get(VARIABLE.MOBS);
            gamers.forEach((gamer: TGamer) => {
                if (gamer.hp <= 0) {
                    count += 1;
                }
            });
            if (count === gamers.length) {
                setFinish(true);
                setResult(ERESULT.LOSE);
            }
            count = 0;
            mobs.forEach((mob: TMob) => {
                if (mob.hp <= 0) {
                    count += 1;
                }
            });
            if (count === mobs.length) {
                setFinish(true);
                setResult(ERESULT.WIN);
            }
        }, 5000);

        return () => {
            clearInterval(timerId);
        };
    });
    return <>{finish ? result === ERESULT.WIN ? <Win /> : <Lose /> : <></>};</>;
});
export default WinOrLose;
