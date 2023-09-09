import { storageService } from './localStorage.service.js'

export const utilService = {
    flashMsg,
    isValidId,
    isValidPlaceToAdd,
    calcHash,
}


function flashMsg(className, msg) {
    const el = document.querySelector(`.${className}`);
    el.innerText = msg;
    el.hidden = false;
    setTimeout(() => {
        el.hidden = true;
    }, 3000);
}


function isValidId(placeId) {
    return (/^[a-zA-Z].*/).test(placeId);
}


function isValidPlaceToAdd(place) {
    return ("id" in place && isValidId(place.id) &&
        "lat" in place && Number.isFinite(place.lat) &&
        "lng" in place && Number.isFinite(place.lng) &&
        "name" in place &&
        "zoom" in place)
}


function calcHash(data) {
    var hash = 0;
    for (var i = 0; i < data.length; i++) {
        var char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

