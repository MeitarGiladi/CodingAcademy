import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { utilService } from '/src/services/util.service.js'


export function MouseMonitor() {

    const [isOn, setIsOn] = useState(true);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (isOn) document.addEventListener('mousemove', updatePos);
        return () => document.removeEventListener('mousemove', updatePos);  
        // updatePos reference will be different after each render. To remove the right one, we will remove it in the 'return'.
    }, [isOn]);

    function updatePos(ev) {
        setPos((pos) => {
            return {x: ev.clientX, y: ev.clientY}
        });
    }

    function handleToggleMouseMonitor(ev) {
        ev.preventDefault();
        setIsOn((isOn) => !isOn);
    }

    let dynBlock;
    if (isOn) {
        dynBlock = <React.Fragment>
            <p>x: {pos.x}, y: {pos.y}</p>
            <button onClick={(ev) => handleToggleMouseMonitor(ev)}>Pause</button>
            </React.Fragment>
    } else {
        dynBlock = <React.Fragment>
            <button onClick={(ev) => handleToggleMouseMonitor(ev)}>Resume</button>
            </React.Fragment>
    }

    return <section className="mouse-monitor" >
        <h1>Mouse Position</h1>
        {dynBlock}
    </section>
}





