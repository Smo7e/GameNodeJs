import React, { useContext, useEffect, useRef, useState } from "react";
import { MediatorContext, ServerContext } from "../../App";
import Chat from "./component/Chat/Chat";
// import TaskSelection from "./component/TaskSelection/TaskSelection";
import { TGamer, TMobs, TScene } from "../../modules/Server/types";  
import "./Interface.css";

const Interface: React.FC = () => {
  const server = useContext(ServerContext);
  const mediator = useContext(MediatorContext);
  const [infoMobs, setInfoMobs] = useState<TMobs[] | null>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const { GET_SCENE } = mediator.getEventTypes();
  const [infoFriends, setInfoFriends] = useState<TGamer[] | null>(null);
  const [gamers, setGamers] = useState<any>(null);
  const [questionFlag, setQuestionFlag] = useState<boolean>(true);
  const [timer, setTimer] = useState({ seconds: 0, minutes: 0 });

  useEffect(() => {
    const getSceneHandler = (scene: TScene) => {
        if (scene.gamers != null) {
            setInfoFriends(scene.gamers);
        }
        if (scene.mobs != null) {
            setInfoMobs(scene.mobs);
        }
    };
    mediator.subscribe(GET_SCENE, getSceneHandler);
    if (!mediator.triger) {
        let srAr = 0;
        infoFriends?.forEach((elem) => {
            srAr += Math.sqrt(
                Math.pow((infoMobs ? infoMobs[0].x : 0) - elem.x - 0, 2) +
                    Math.pow((infoMobs ? infoMobs[0].y : 0) - elem.y - 0, 2)
            );
        });
        if (srAr / (infoFriends ? infoFriends?.length : 0) < 5) mediator.triger = true;
    }
    const updateTime = () => {
      setTimer(prevTimer => {
        let seconds = prevTimer.seconds + 1;
        let minutes = prevTimer.minutes;

        if (seconds === 60) {
          minutes++;
          seconds = 0;
        }

        return { seconds, minutes };
      });
    };

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
        {gamers && gamers[0].person_id === 0 ? (
          <div className="player-icon-interfaceSportik"></div>
        ) : gamers && gamers[0].person_id === 2 ? (
          <div className="player-icon-interfaceHumanitarian"></div>
        ) : gamers && gamers[0].person_id === 1 ? (
          <div className="player-icon-interfaceTheechguy"></div>
        ) : (
          <></>
        )}
        
        <div className="I">
          {gamers ? (
            gamers.map((elem: any) => (
              <div className="HP" style={{ background: `linear-gradient(to right, red ${elem.hp}%, #898888 ${elem.hp}%)` }}>
                {elem.name} : {elem.hp}/100HP
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        {/* {mediator.triger && questionFlag ? <TaskSelection setQuestionFlag={setQuestionFlag} /> : <></>} */}
            {mediator.triger ? (
                <div className="BossXP"
                >
                    {infoMobs ? <div>BossXP: {infoMobs[0].hp}</div> : <></>}
                </div>
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
            {timer.minutes < 10 ? "0" + timer.minutes : timer.minutes} : {timer.seconds < 10 ? "0" + timer.seconds : timer.seconds}
          </div>
        </div>
      </div>

      <Chat />
    </div>
  );
};

export default Interface;
