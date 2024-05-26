import React, { memo, useContext, useEffect, useRef, useState } from "react"; 
import { MediatorContext } from "../../App"; 
import mp3 from './mp3.mp3'; 
 
const Music: React.FC = memo(() => { 
    const mediator = useContext(MediatorContext); 
    const audioRef = useRef<HTMLAudioElement | null>(null); 
    const [audio, setAudio] = useState(new Audio(mp3)); 
    audio.loop = true; 
 
    const handlePlay = () => { 
        setAudio(new Audio(mp3)); 
    }; 
    const handleStop = () => { 
        audio.pause(); 
    }; 
 
    const handleVolumeChange = (data: { volume: number }) => { 
        audio.volume = data.volume; 
    }; 
    useEffect(() => { 
        const { PLAY_MUSIC, STOP_MUSIC, SET_MUSIC_VOLUME } = mediator.getEventTypes(); 
 
        audioRef.current = audio; 

        audio.play(); 
 
        mediator.subscribe(PLAY_MUSIC, handlePlay); 
        mediator.subscribe(STOP_MUSIC, handleStop); 
        mediator.subscribe(SET_MUSIC_VOLUME, handleVolumeChange); 
 
        return () => { 
            mediator.unsubscribe(PLAY_MUSIC, handlePlay); 
            mediator.unsubscribe(STOP_MUSIC, handleStop); 
            audio.pause(); 
        }; 
    }); 
 
    return null; 
}); 
export default Music;
