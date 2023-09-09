import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'


localStorage["watchers"] = JSON.stringify([{ id: 'w101', fullname: 'puki', movies: ['Rambo'] },
{ id: 'w234', fullname: 'Muki', movies: ['Tartan'] },
{ id: 'w555', fullname: 'Luki', movies: ['Kong', 'bong'] }
])

export const watcherService = {
    add,
    remove,
    update,
    list
}


function add(watcher) {
    return storageService.post('watchers', watcher);
}


function remove(watcherId) {
    return storageService.remove('watchers', watcherId);
}


function update(watcher) {
    return storageService.put('watchers', watcher);
}


function list() {
    return storageService.query('watchers');
}


