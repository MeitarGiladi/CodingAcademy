import { placeService } from './services/place.service.js'
import { utilService } from './services/util.service.js'

window.onInit = onInit;
window.onMapReady = onMapReady;
window.onAddPlace = onAddPlace;
window.onRemovePlace = onRemovePlace;
window.onDownloadCSV = onDownloadCSV;
window.onPanToPlace = onPanToPlace;
window.getCurrentLocation = getCurrentLocation;


// Q1: What is the solution for global map/markers?
// Q2: Is it ok to not rnder the places again after each change?
// Q3: What is best - Adding parsed elements using 'innerHTML' or creating those elements 1 by 1 (like in _runMapScript)?

var gMap;
var gMarkers = [];


function onInit() {
    _runMapScript();
}


function onMapReady() {
    _initMap();
    _renderPlacesAndMarkers();
    _addMarkerListener();
    _addCurrLocationButton();
}


async function onAddPlace(id, lat, lng, name, zoom) {
    let placeToAdd = { "id": id, "lat": lat, "lng": lng, "name": name, "zoom": zoom };
    if (!utilService.isValidPlaceToAdd(placeToAdd) || document.querySelector(`.places-list .${id}`)) return;

    let place = await placeService.addPlace(placeToAdd);
    _addPlaceToDOM(place);  // Can re-render instead
    _addMarkerToMap(place);
}


async function onRemovePlace(el) {
    let placeId = el.dataset.id;
    if (!utilService.isValidId(placeId) || !document.querySelector(`.places-list .${placeId}`)) {
        return;
    }

    let place = await placeService.removePlace(placeId);
    _removePlaceFromDOM(placeId);  // Can re-render instead
    _removeMarkerFromMap(place.lat, place.lng);
}


async function onDownloadCSV(event) {
    event.preventDefault();
    let places = await placeService.getPlaces();
    _downloadPlacesAsCSV(places);
}


function onPanToPlace(el) {
    let lat = parseFloat(el.dataset.lat);
    let lng = parseFloat(el.dataset.lng);
    let zoom = parseFloat(el.dataset.zoom);
    gMap.setCenter({ lat, lng });
    gMap.setZoom(zoom);
}


function _downloadPlacesAsCSV(places) {
    let data = "";
    for (let p of places) {
        data += `${p.id},${p.lat},${p.lng},${p.name},${p.zoom}\n`;
    }

    let csv_file = new Blob([data], { type: 'text/csv' });
    let tmp_link = URL.createObjectURL(csv_file);

    let dlink = document.createElement('a');
    dlink.download = "places.csv";
    dlink.href = tmp_link;
    dlink.click();

    URL.revokeObjectURL(tmp_link); // Delete the tmp_link
    dlink.remove();
}


async function _runMapScript() {
    let el = document.createElement('script');
    let apiKey = await placeService.getMapApiKey();
    el.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=onMapReady`;
    console.log(el.src);
    el.defer = true;
    document.body.appendChild(el);
}


function _initMap(lat = 29.5577, lng = 34.9519, zoom = 7) {
    let elMap = document.querySelector('.map');

    let options = {
        center: { lat, lng },
        zoom: zoom
    }

    let map = new google.maps.Map(elMap, options);

    gMap = map;  // Can save it globaly here with Var too
}


async function _renderPlacesAndMarkers() {
    let places = await placeService.getPlaces();
    _clearPlaces();
    _clearMarkers();
    for (let place of places) {
        _addPlaceToDOM(place);
        _addMarkerToMap(place);
    }
}


function _clearPlaces() {
    document.querySelector(".places-list").innerHTML = "";
}


function _clearMarkers() {
    gMarkers.forEach(marker => marker.setMap(null));
    gMarkers = [];
}


function _addPlaceToDOM(place) {
    if (!utilService.isValidPlaceToAdd(place) || document.querySelector(`.places-list .${place.id}`)) {
        console.log("not a valid place to add: ", place);
        return;
    }
    let newPlaceTag = `<li class="${place.id}">`;
    newPlaceTag += place.name;
    newPlaceTag += '<span>';
    newPlaceTag += `<button data-id="${place.id}" onclick="onRemovePlace(this)">X</button>`;
    newPlaceTag += `<button data-id="${place.id}" data-lat="${place.lat}" data-lng="${place.lng}" data-name="${place.name}" data-zoom="${place.zoom}"`
    newPlaceTag += ` onclick="onPanToPlace(this)">GO</button>`;
    newPlaceTag += '</span>';
    newPlaceTag += '</li>';
    document.querySelector(".places-list").innerHTML += newPlaceTag;
}


function _removePlaceFromDOM(placeId) {
    let placeEl = document.querySelector(`.places-list .${placeId}`);
    if (placeEl) placeEl.remove();
}


function _addMarkerToMap(place) {
    gMarkers.push(new google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: gMap,
        title: place.name
    }))
}


function _removeMarkerFromMap(lat, lng) {
    let markerIndex = gMarkers.findIndex((mar) => mar.getPosition().lat() === lat && mar.getPosition().lng() === lng);
    gMarkers[markerIndex].setMap(null);
    gMarkers.splice(markerIndex, 1);
}


function _addMarkerListener() {
    gMap.addListener('click', (ev) => {
        let name = prompt('Place name?', 'Place 1');
        let lat = ev.latLng.lat();
        let lng = ev.latLng.lng();
        let id = _getId(lat, lng);
        onAddPlace(id, lat, lng, name, gMap.getZoom());
    })
}


function _getId(lat, lng) {
    return "p" + utilService.calcHash(String(lat) + String(lng));
}


function _addCurrLocationButton() {
    let el = document.createElement('button');
    el.setAttribute( "onClick", "getCurrentLocation()" );
    // el.onClick = "getCurrentLocation()";
    el.className = "curr-location";
    el.innerHTML = "&#10023;"
    document.querySelector(".map").appendChild(el);
}


function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser')
        return
    }

    navigator.geolocation.getCurrentPosition(_showLocation, _handleLocationError)
}


function _showLocation(position) {
    let lat = parseFloat(position.coords.latitude);
    let lng = parseFloat(position.coords.longitude);
    gMap.setCenter({ lat, lng });
    gMap.setZoom(15);
}


function _handleLocationError(err) {
    var errMsg = ''
    switch (err.code) {
        case 1:
            errMsg = 'The user didn\'t allow this page to retrieve a location.'
            break
        case 2:
            errMsg = 'Unable to determine your location: ' + err.message
            break
        case 3:
            errMsg = 'Timed out before retrieving the location.'
            break
    }
    utilService.flashMsg('user-msg', errMsg);
}





