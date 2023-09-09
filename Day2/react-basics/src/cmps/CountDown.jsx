import { useState, useEffect, useRef } from 'react'
import { utilService } from '/src/services/util.service.js'


export function CountDown({ startFrom, onDone, toTime }) {

    if (toTime) startFrom = Math.round((toTime - Date.now()) / 1000);

    const [timer, setTimer] = useState(startFrom);
    const intervalIdRef = useRef();

    useEffect(() => {
        intervalIdRef.current = setInterval(() => setTimer((timer) => timer - 1), 1000);
        return () => clearInterval(intervalIdRef.current);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            clearInterval(intervalIdRef.current);
            onDone();
        }
    }, [timer]);

    let dynSecondsClass = (timer <= 6) ? "seconds-almost" : "seconds-normal";

    return <section className="count-down" >
        <time>
            <span className="hours">{utilService.zeroPad(Math.floor(timer / 3600), 2)}:</span>
            <span className="minutes">{utilService.zeroPad(Math.floor((timer % 3600) / 60), 2)}:</span>
            <span className={dynSecondsClass}>{utilService.zeroPad(timer % 60, 2)}</span>
        </time>
        <audio className="alarm-sound" src="alarmSound.mp3" hidden></audio>
    </section>
}


export function playAlarm() {
    const audio = document.querySelector(".count-down .alarm-sound");
    audio.play();
}




