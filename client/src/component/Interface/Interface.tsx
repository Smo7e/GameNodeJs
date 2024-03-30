import React, { useContext, useEffect, useRef, useState } from "react";
import { MediatorContext, ServerContext } from "../../App";
import Chat from "./component/Chat/Chat";
import "./Interface.css";

const Interface: React.FC = () => {
  const server = useContext(ServerContext);
  const mediator = useContext(MediatorContext);

  const timeRef = useRef<HTMLDivElement>(null);
  const [gamers, setGamers] = useState<any>(null);
  let seconds = 0;
  let minutes = 0;
  function updateTime() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    timeRef.current!.innerHTML = `${minutes < 10 ? "0" + minutes : minutes} : ${
        seconds < 10 ? "0" + seconds : seconds
    }`;
}

  useEffect(() => {
    let timeInterval = setInterval(updateTime, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await server.getGamers();
      mediator.gamers = result;
      if (mediator.gamer !== gamers) {
        setGamers(result);
      }
    }, 800);

    return () => {
      clearInterval(interval);
    };
  }, [mediator.gamer, gamers, server]);

  return (
    <div className="Interface-container">
      <div className="back-arrow-interface"></div>
      <div className="settings-arrow-interface"></div>

      <div className="player-info">
        {gamers && gamers[0].person_id - 0 === 0 ? (
          <div className="player-icon-interfaceSportik"></div>
        ) : gamers && gamers[0].person_id - 0 === 2 ? (
          <div className="player-icon-interfaceHumanitarian"></div>
        ) : gamers && gamers[0].person_id - 0 === 1 ? (
          <div className="player-icon-interfaceTheechguy"></div>
        ) : (
          <></>
        )}
        <div className="player-level-interface">1</div>
      </div>

      <div className="map-info">
        <div className="miniMap-interface">Мини карта</div>

        <div className="game-info-interface">
          <div className="coin-interface">0</div>
          <div className="coin-icon-interface"></div>
          <div ref={timeRef} className="time">
            00 : 00
          </div>
        </div>
      </div>

      <Chat />
    </div>
  );
};

export default Interface;