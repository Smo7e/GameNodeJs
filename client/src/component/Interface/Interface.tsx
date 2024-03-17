import "./Interface.css";
import { useRef, useState  } from "react";
import { useEffect } from "react";
import Chat from "./component/Chat/Chat";
import ParametersGame from "./component/ParametersGame/ParametersGame"; 

const Interface: React.FC = () => {
    const timeRef = useRef<HTMLDivElement>(null);
    const parametersGameRef = useRef<HTMLDivElement>(null); 
    let seconds = 0;
    let minutes = 0;

    const [showParametersGame, setShowParametersGame] = useState(false); 
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
        const handleClickOutside = (event: MouseEvent) => { 
            if ( 
              parametersGameRef.current && 
              !parametersGameRef.current.contains(event.target as Node) 
            ) { 
              setShowParametersGame(false); 
            } 
          }; 
        let interval = setInterval(updateTime, 1000);
        document.addEventListener("mousedown", handleClickOutside); 
        return () => {
            document.removeEventListener("mousedown", handleClickOutside); 
            clearInterval(interval);
        };
    });
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
            <div   onClick={handleParametersGameClick}> 
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
                        00 : 00
                    </div>
                </div>
            </div>
            <Chat />
        </div>
    );
};
export default Interface;