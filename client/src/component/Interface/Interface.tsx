import "./Interface.css";
import { useRef, useState } from "react";
import { useEffect } from "react";
import Chat from "./component/Chat/Chat";
const Interface: React.FC = () => {
    const timeRef = useRef<HTMLDivElement>(null);
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
        let interval = setInterval(updateTime, 1000);
        return () => {
            clearInterval(interval);
        };
    });

    return (
        <div className="Inteface-container">
            <div className="back-arrow-interface"></div>
            <div className="settings-arrow-interface"></div>

            <div className="player-info">
                <div className="player-icon-interfaceSportik"></div>
                <div className="player-icon-interfaceHumanitarian"></div>
                <div className="player-icon-interfaceTheechguy"></div>

                <div className="player-level-interface">1</div>
                {/* <div className="player-hp-interface">50 / 100</div> */}
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
