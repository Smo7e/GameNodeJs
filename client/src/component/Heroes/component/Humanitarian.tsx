import React from "react";
import { HEROES } from "../Heroes";

interface IHumanitarianProps {
    heroes: Function;
}

const HumanitarianPot: React.FC<IHumanitarianProps> = ({ heroes }) => {
    return (
        <div id="test-humanitarian-container">
            <button
                onClick={() => heroes(HEROES.TECHGUY)}
                className="arrow-2-heroes"
                id="test-humanitarian-to-techguy"
            ></button>
            <button
                onClick={() => heroes(HEROES.SPORTIK)}
                className="arrow-3-heroes"
                id="test-humanitarian-to-sportik"
            ></button>

            <div className="image-humanitarian-heroes" id="test-humanitarian-image"></div>

            <div className="panel-heroes" id="test-humanitarian-panel">
                <div className="text-heroes" id="test-text-humanitarian">
                    “Гуманитарий” - имеет обычное здоровье в 100 единиц, увеличенный вдвое урон по
                    парам “Русский язык”, “Английский язык”. Предметы типа “Книга улучшают
                    характеристики в 1.5 раза сильнее.
                </div>
            </div>
        </div>
    );
};

export default HumanitarianPot;
