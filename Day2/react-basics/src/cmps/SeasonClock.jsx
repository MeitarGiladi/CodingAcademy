import { useState, useEffect, useRef } from 'react'
import { utilService } from '/src/services/util.service.js'


export function SeasonClock() {
    const [isDark, setIsDark] = useState(false);
    const [date, setDate] = useState(new Date());
    const intervalIdRef = useRef();

    function toggleIsDark() {
        setIsDark(!isDark);
    }

    useEffect(() => {
        intervalIdRef.current = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(intervalIdRef.current);
    }, []);

    const dynClass = isDark ? "dark" : "light";

    return <section className={"season-clock " + dynClass} onClick={toggleIsDark}>
        <h1>{utilService.getMonthName(date)}</h1>
        <img src={`/src/assets/seasons/${getCurrSeason(date.getMonth())}.png`} alt="season img" />
        <p>{padClock(date.getHours())}:{padClock(date.getMinutes())}:{padClock(date.getSeconds())}</p>
        <p>{utilService.getDayName(date)}</p>
    </section>
}


function padClock(num) {
    return utilService.zeroPad(num, 2);
}


function getCurrSeason(monthNumber) {
    monthNumber++;
    if ([12, 1, 2].includes(monthNumber)) {
        return "Winter";
    } else if ([3, 4, 5].includes(monthNumber)) {
        return "Spring";
    } else if ([6, 7, 8].includes(monthNumber)) {
        return "Summer";
    } else if ([9, 10, 11].includes(monthNumber)) {
        return "Autumn";
    } else {
        console.log("Error month value");
    }
}



