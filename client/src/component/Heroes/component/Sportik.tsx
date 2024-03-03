import React from "react";
import { HEROES } from "../Heroes";

interface ISportikProps {
    heroes: Function;
}

const SportikPot: React.FC<ISportikProps> = ({ heroes }) => {
    return (
        <div>
          <button onClick={() => heroes(HEROES.HUMANITARIAN)} className="arrow-2-heroes"></button>
          
          <div className="image-Sportik-heroes"></div>
          
          <div className="panel-heroes">
            <div className="text-heroes">
              “Спортик” - имеет повышенное здоровье в 150 единиц, увеличенный вдвое
              урон по паре “Физра” и любое улучшение от предметов увеличивается в 1.25 раза.
            </div>
          </div>
        </div>
        );
};

export default SportikPot;