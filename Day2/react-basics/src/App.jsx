import { useState } from 'react'
import img from './assets/react.svg'
import { AnimalList, animalInfos } from './cmps/AnimalList'
import { SeasonClock } from './cmps/SeasonClock'
import { CountDown, playAlarm } from './cmps/CountDown'
import { WatcherApp } from './cmps/WatcherApp'
import { MouseMonitor } from './cmps/MouseMonitor'


export function App() {

    const [showAnimals, setShowAnimals] = useState(false);
    const [showClock, setShowClock] = useState(false);
    const [showCountDown, setShowCountDown] = useState(false);
    const [showWatcherApp, setShowWatcherApp] = useState(true);
    const [showMousePos, setShowMousePos] = useState(false);

    function handleToggleAnimals(ev) {
        ev.preventDefault();
        setShowAnimals((showAnimals) => !showAnimals);
    }

    function handleToggleClock(ev) {
        ev.preventDefault();
        setShowClock((showClock) => !showClock);
    }

    function handleToggleCountDown(ev) {
        ev.preventDefault();
        setShowCountDown((showCountDown) => !showCountDown);
    }

    function handleToggleWatcherApp(ev) {
        ev.preventDefault();
        setShowWatcherApp((showWatcherApp) => !showWatcherApp);
    }
    function handleToggleMousePos(ev) {
        ev.preventDefault();
        setShowMousePos((showMousePos) => !showMousePos);
    }

    return (
        <section className='main-app'>
            <header className='container'>
                <h1>React App</h1>
                <nav>
                    <button onClick={(ev) => handleToggleAnimals(ev)}>Animals</button>
                    <button onClick={(ev) => handleToggleClock(ev)}>Clock</button>
                    <button onClick={(ev) => handleToggleCountDown(ev)}>CountDown</button>
                    <button onClick={(ev) => handleToggleWatcherApp(ev)}>WatcherApp</button>
                    <button onClick={(ev) => handleToggleMousePos(ev)}>MousePos</button>
                </nav>
            </header>

            <main className='container'>

                {showAnimals && <section>
                    <AnimalList animalinfos={animalInfos} />
                </section>}

                {showClock && <section>
                    <SeasonClock />
                </section>}

                {showCountDown && <section>
                    <CountDown startFrom={10} onDone={() => console.log('Done CountDown!')} />
                    <CountDown toTime={Date.now() + 10 * 1000} onDone={() => console.log('Done CountDown2!')} />
                    <CountDown toTime={Date.now() + 3 * 1000} onDone={playAlarm} />
                </section>}

                {showWatcherApp && <section>
                    <WatcherApp />
                </section>}

                {showMousePos && <section>
                    <MouseMonitor />
                </section>}

            </main>

        </section>
    )
}

