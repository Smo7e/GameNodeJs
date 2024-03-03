import React from "react";
import { HEROES } from "../Heroes";

interface IHumanitarianProps {
    heroes: Function;
}

const HumanitarianPot: React.FC<IHumanitarianProps> = ({ heroes }) => {
  return (
      <div>
        <button onClick={() => heroes(HEROES.TECHGUY)} className="arrow-2-heroes"></button>
        <button onClick={() => heroes(HEROES.SPORTIK)} className="arrow-3-heroes"></button>
        
        <div className="image-humanitarian-heroes"></div>

        <div className="panel-heroes">
          <div className="text-heroes">
            “Гуманитарий” - имеет обычное здоровье в 100 единиц, увеличенный вдвое
            урон по парам “Русский язык”, “Английский язык”. Предметы типа “Книга
            улучшают характеристики в 1.5 раза сильнее.
          </div>
        </div>
      </div>
        );
};

export default HumanitarianPot;
