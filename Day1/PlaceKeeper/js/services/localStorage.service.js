export const storageService = {
    post,   // Create a place
    get,    // Read a place
    put,    // Update a place
    remove, // Delete a place
    query,  // List
}


// localStorage.currUser = "might";
// var currUser = localStorage.getItem("currUser");

// localStorage.userData = JSON.stringify({"email" : "heyDUMMY@gmail.com", "bgColor": "#D5FDD4", "txtColor": "#000000"});

localStorage.places = JSON.stringify([
    {"id" : 'a1p2', "lat": 32.1416, "lng": 34.831213, "name": 'Pukis house', 'zoom': 10},
    {"id" : 'appp3', "lat": 36, "lng": 37.833, "name": 'whyyy Pukis?', 'zoom': 7}
]);

// You need to save the googleMapApiKey in localStorage

localStorage.googleMapApiKey = "AIzaSyDFo8RF1rZpOZFi_A-b1xt32JA1ozino6I";
// localStorage.googleMapApiKey = "dummy";


function query(entityType, delay = 500) {
    if (entityType === "googleMapApiKey") return new Promise(resolve => resolve(localStorage.getItem(entityType)));
    var entities = JSON.parse(localStorage.getItem(entityType)) || {};
    return new Promise(resolve => setTimeout(() => resolve(entities), delay));
}


async function get(entityType, entityId = null) {
    let entities = await query(entityType);
    const entity = entities.find(entity => entity.id === entityId);
    if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`);
    return entity;
}


async function post(entityType, newEntity) {
    newEntity = JSON.parse(JSON.stringify(newEntity));
    if (entityType === "userData") {
        return new Promise(resolve => {
            _save("userData", newEntity);
            resolve(newEntity);
        })
    } else {
        let entities = await query(entityType);
        entities.push(newEntity);
        _save(entityType, entities);
        return newEntity;
    }
}


async function put(entityType, updatedEntity) {
    updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
    let entities = await query(entityType);
    const idx = entities.findIndex(entity => entity.id === updatedEntity.id);
    if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${entityId} in: ${entityType}`);
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
}


async function remove(entityType, entityId) {
    let entities = await query(entityType);
    const idx = entities.findIndex(entity => entity.id === entityId);
    if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`);
    let res = entities.splice(idx, 1);
    _save(entityType, entities);
    return res[0];
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}
