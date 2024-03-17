import "./Interface.css";
import { useRef, useState, useEffect } from "react";
import Chat from "./component/Chat/Chat";
import ParametersGame from "./component/ParametersGame/ParametersGame";

const Interface: React.FC = () => {
  const timeRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const parametersGameRef = useRef<HTMLDivElement>(null);

  const [showParametersGame, setShowParametersGame] = useState(false);

  function updateTime() {
    setTime((prevTime) => {
      let newSeconds = prevTime.seconds + 1;
      let newMinutes = prevTime.minutes;
      if (newSeconds === 60) {
        newMinutes++;
        newSeconds = 0;
      }
      return { minutes: newMinutes, seconds: newSeconds };
    });
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (parametersGameRef.current && !parametersGameRef.current.contains(event.target as Node)) {
        setShowParametersGame(false);
      }
    };

    let interval = setInterval(updateTime, 1000);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(interval);
    };
  }, []);

  const handleSettingsClick = () => {
    setShowParametersGame(true);
  };

  const handleParametersGameClick = () => {
    setShowParametersGame(false);
  };

  return (
    <div className="Inteface-container">
      <div className="back-arrow-interface"></div>
      <div onClick={handleSettingsClick} className="settings-arrow-interface"></div>
      {showParametersGame && (
        <div onClick={handleParametersGameClick}>
          <ParametersGame />
        </div>
      )}
      <div className="player-info">
        <div className="player-icon-interface"></div>
        <div className="player-level-interface">1</div>
        <div className="player-hp-interface">50 / 100</div>
      </div>
      <div className="map-info">
        <div className="miniMap-interface">Мини карта</div>

        <div className="game-info-interface">
          <div className="coin-interface">0</div>
          <div className="coin-icon-interface"></div>
          <div ref={timeRef} className="time">
            {time.minutes < 10 ? "0" + time.minutes : time.minutes}:{time.seconds < 10 ? "0" + time.seconds : time.seconds}
          </div>
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default Interface;
