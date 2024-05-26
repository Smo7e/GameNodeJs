import React, { useState, useEffect, useContext } from "react";
import { EPAGES, MediatorContext } from "../../App";
import Music from "./Music";
import "./Parameters.css";

interface IParameters {
    epages: Function;
}

const Parameters: React.FC<IParameters> = ({ epages }) => {
    const mediator = useContext(MediatorContext);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("volume");
    return savedVolume ? Number(savedVolume) : 60;
  });

  const [musicVolume, setMusicVolume] = useState(() => {
    const savedMusicVolume = localStorage.getItem("musicVolume");
    return savedMusicVolume ? Number(savedMusicVolume) : 77;
  });

  const [fullscreen, setFullscreen] = useState(false);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    localStorage.setItem("volume", newVolume.toString());
  };

  const handleMusicVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newMusicVolume = Number(event.target.value);
    setMusicVolume(newMusicVolume);
    localStorage.setItem("musicVolume", newMusicVolume.toString());
    mediator.call("SET_MUSIC_VOLUME", { volume: newMusicVolume / 100 });
  };

  const handleFullscreenChange = () => {
    if (document.documentElement.requestFullscreen) {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setFullscreen(!fullscreen);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="container-parameters">
      <button onClick={() => epages(EPAGES.MENU)} className="arrow-parameters"></button>
      <div className="rectangle">
        <div className="inner-rectangle">
          <div className="line"></div>
          <div className="text-container">
            <div className="text">Громкость звуков</div>
            <div className="volume-line">
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
                style={{
                  background: `linear-gradient(to right, black 0%, black ${volume}%, white ${volume}%, white 100%)`
                }}
              />
            </div>
            <div className="numbersZ">{volume}</div>
            <div className="text">Громкость музыки</div>
            <div>
              <input
                type="range"
                min={0}
                max={100}
                value={musicVolume}
                onChange={handleMusicVolumeChange}
                className="lineM"
                style={{
                  background: `linear-gradient(to right, black 0%, black ${musicVolume}%, white ${musicVolume}%, white 100%)`
                }}
              />
            </div>
            <div className="numbersM">{musicVolume}</div>
            <div className="text">Полноэкранный режим</div>
            <div className="second-rectangle">
              <div
                className={`left-side ${!fullscreen ? "active" : ""}`}
                onClick={handleFullscreenChange}
              >
                Выкл
              </div>
              <div
                className={`right-side ${fullscreen ? "active" : ""}`}
                onClick={handleFullscreenChange}
              >
                Вкл
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Parameters;