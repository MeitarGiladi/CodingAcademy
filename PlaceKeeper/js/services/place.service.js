import { storageService } from './localStorage.service.js'

export const placeService = {
    getPlaces,
    removePlace,
    addPlace,
    getPlaceById,
    getMapApiKey,
}


function getPlaces() {
    return storageService.query("places");
}


function removePlace(placeId) {
    return storageService.remove("places", placeId);
}


function addPlace(place) {
    return storageService.post("places", place);
}


function getPlaceById(placeId) {
    return storageService.get("places", placeId);
}


function getMapApiKey() {
    return storageService.query("googleMapApiKey");
}


