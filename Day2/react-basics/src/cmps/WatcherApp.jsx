import { useState, useEffect, useRef } from 'react'
import { utilService } from '/src/services/util.service.js'
import { watcherService } from '/src/services/watcher.service.js'


export function WatcherApp() {

    const [watchers, setWatchers] = useState([]);
    const [selectedWatcher, setSelectedWatcher] = useState(null);
    const [showAddWatcherPrompt, setShowAddWatcherPrompt] = useState(false);

    useEffect(() => {
        getWatchers();
    }, []);

    async function getWatchers() {
        const res = await watcherService.list();
        setWatchers(res);
    }

    function handleShowAddWatcherPrompt(ev) {
        ev.preventDefault();
        setShowAddWatcherPrompt(true);
    }

    function handleRemoveAddWatcherPrompt(ev) {
        ev.preventDefault();
        setShowAddWatcherPrompt(false);
    }

    async function handleAddWatcher(ev) {
        ev.preventDefault();
        console.log(ev);
        const fullname = ev.target.elements.fullname.value;
        const movies = ev.target.elements.movies.value.split(",");

        const newWatcher = { fullname: fullname, movies: movies };
        const newEntity = await watcherService.add(newWatcher); // We need to know the generated ID, so we wait.
        setWatchers((prevWatchers) => {
            prevWatchers = [...prevWatchers, newEntity];
            return prevWatchers;
        });
        setShowAddWatcherPrompt(false);
    }

    function handleRemoveWatcher(ev, watcherId) {
        ev.preventDefault();
        watcherService.remove(watcherId);
        setWatchers((watchers) => watchers.filter((w) => w.id != watcherId));
    }

    function handleSelectWatcher(ev, watcherId) {
        ev.preventDefault();
        setSelectedWatcher(watcherId);
    }

    function handleUnSelectWatcher(ev) {
        ev.preventDefault();
        setSelectedWatcher(null);
    }

    function handleUpdateFullNameWatcher(ev) {
        ev.preventDefault();
        const newFullname = ev.currentTarget.textContent;
        const entityIdx = watchers.findIndex(entity => entity.id === selectedWatcher);
        watcherService.update(watchers[entityIdx]);
        setWatchers((watchers) => {
            const watcherCopy = [...watchers];
            watcherCopy[entityIdx].fullname = newFullname;
            return watcherCopy;
        })
    }

    let dynModal = null;
    if (selectedWatcher) {
        const selectedEntity = watchers.find(entity => entity.id === selectedWatcher);
        dynModal = <article className="watcher-modal">
            <h1 onInput={(ev) => handleUpdateFullNameWatcher(ev)} onBlur={(ev) => handleUpdateFullNameWatcher(ev)} contentEditable suppressContentEditableWarning={true}>{selectedEntity.fullname}</h1>
            <ul>
                {selectedEntity.movies.map((movie, idx) => <li key={selectedEntity.id + idx}>{movie}</li>)}
            </ul>
            <button onClick={(ev) => handleUnSelectWatcher(ev)}>Close</button>
        </article>
    }

    return <section className="watcher-app" >
        <h1>Watcher App</h1>
        <button onClick={(ev) => handleShowAddWatcherPrompt(ev)}>Add Watcher</button><br />
        {watchers.map((watcher) =>
            <section className="watcher-block" key={watcher.id}>
                <img src="" alt="" />
                <h2>{watcher.fullname}</h2>
                <hr />
                <button onClick={(ev) => handleRemoveWatcher(ev, watcher.id)}>X</button>
                <button onClick={(ev) => handleSelectWatcher(ev, watcher.id)}>Select</button>
            </section>
        )}
        {dynModal}
        {showAddWatcherPrompt &&
            <form className="add-watcher-prompt" onSubmit={(ev) => handleAddWatcher(ev)}>
                <input type="text" name="fullname" placeholder="Enter Fullname" required/><br />
                <input type="text" name="movies" placeholder="Enter favorite movies (comma seperated)" required/><br />

                <button>Submit</button>
                <button onClick={(ev) => handleRemoveAddWatcherPrompt(ev)}>Close</button>
            </form>}
    </section>
}


// function is_valid_watcher(watcher) {
//     return typeof (watcher.id) === 'string' &&
//         typeof (watcher.fullname) === 'string' &&
//         typeof (watcher.movies) === 'object' &&
//         !watcher.movies.some(movie => typeof (movie) != 'string');
// }

