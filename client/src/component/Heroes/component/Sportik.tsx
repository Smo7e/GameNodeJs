import React from "react";
import { HEROES } from "../Heroes";

interface ISportikProps {
    heroes: Function;
}

const SportikPot: React.FC<ISportikProps> = ({ heroes }) => {
    return (
        <div id="test-sportik-container">
            <button
                onClick={() => heroes(HEROES.HUMANITARIAN)}
                className="arrow-2-heroes"
                id="test-sportik-to-humanitarian"
            ></button>

            <div className="image-Sportik-heroes" id="test-sportik-image"></div>

            <div className="panel-heroes" id="test-sportik-panel">
                <div className="text-heroes" id="test-text-sportik">
                    “Спортик” - имеет повышенное здоровье в 150 единиц, увеличенный вдвое урон по
                    паре “Физра” и любое улучшение от предметов увеличивается в 1.25 раза.
                </div>
            </div>
        </div>
    );
};

export default SportikPot;
