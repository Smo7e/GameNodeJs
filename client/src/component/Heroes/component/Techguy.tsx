import React from "react";
import { HEROES } from "../Heroes";

interface ITechguyProps {
    heroes: Function;
}

const TechguyPot: React.FC<ITechguyProps> = ({ heroes }) => {
    return (
        <div id="test-techguy-container">
            <button
                onClick={() => heroes(HEROES.HUMANITARIAN)}
                className="arrow-3-heroes"
                id="test-techguy-to-humanitarian"
            ></button>

            <div className="image-techguy-heroes" id="test-techguy-image"></div>

            <div className="panel-heroes" id="test-techguy-panel">
                <div className="text-heroes" id="test-text-techguy">
                    “Технарь”- имеет обычное здоровье в 100 единиц, увеличенный вдвое урон по парам
                    “Математика” и “Программирование”. Предметы типа “Гаджет” улучшают
                    характеристики в 1.5 раза сильнее.
                </div>
            </div>
        </div>
    );
};

export default TechguyPot;
