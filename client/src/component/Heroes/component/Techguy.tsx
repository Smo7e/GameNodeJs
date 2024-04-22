import React from "react";
import { HEROES } from "../Heroes";

interface ITechguyProps {
    heroes: Function;
}

const TechguyPot: React.FC<ITechguyProps> = ({ heroes }) => {
    return (
        <div>
           <button onClick={() => heroes(HEROES.HUMANITARIAN)} className="arrow-3-heroes"></button>

              <div className="image-techguy-heroes"></div>
              
              <div className="panel-heroes">
                   <div className="text-heroes">
                    “Технарь”- имеет обычное здоровье в 100 единиц, увеличенный вдвое урон
                    по парам “Математика” и “Программирование”. Предметы типа “Гаджет”
                    улучшают характеристики в 1.5 раза сильнее.
                   </div>
              </div>
        </div> 
        );
};

export default TechguyPot;