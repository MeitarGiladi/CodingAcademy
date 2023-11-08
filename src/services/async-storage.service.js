import {
    STORAGE_KEY_LOGGED_USER,
    STORAGE_KEY_FOLDERS,
    STORAGE_KEY_USERS,
    STORAGE_SUB_KEY_EMAILS,
    STORAGE_SUB_KEY_LABELS,
    POST_TYPE_USER_DATA,
    POST_TYPE_SEND_EMAIL,
    POST_TYPE_CHANGE_USER,
    saveToStorage,
    loadFromStorage
} from './db-util.service.js'


export const storageService = {
    query,  // list emails or labels
    get,    // get email
    post,   // add email or label (maybe send email to other user)
    put,    // update email
    remove, // delete email
}

// Note - Each user can access only his data.



// list emails or labels for currUser
async function query(entityType, delay = 200) {
    const currUser = loadFromStorage(STORAGE_KEY_LOGGED_USER);
    const entities = loadFromStorage(STORAGE_KEY_USERS)[currUser][entityType] || [];
    return new Promise(resolve => setTimeout(() => resolve(entities), delay));
}

// Only for emails
async function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity.id === entityId);
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`);
        return entity;
    })
}

// For emails & labels (and send email)
async function post(postType, newEntity="", entityType="") {
    switch (postType) {
        case POST_TYPE_USER_DATA:
            return _post_user_data(entityType, newEntity);
        case POST_TYPE_SEND_EMAIL:
            return _post_send_email(newEntity);
        case POST_TYPE_CHANGE_USER:
            return _post_change_user(newEntity);   
        default:
            console.log("Not a valid POST api");
    }
}

// Update email
async function put(entityType, updatedEntity) {
    if (!_validateEmailPermissions(updatedEntity)) throw new Error(`Not a valid email`);
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === updatedEntity.id);
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity.id} in: ${entityType}`);
        entities.splice(idx, 1, updatedEntity);
        _saveUserData(entityType, entities);
        return updatedEntity;
    })
}

// Delete email
async function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === entityId);
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`);
        entities.splice(idx, 1);
        _saveUserData(entityType, entities);
    })
}

/////// Private functions ///////
async function _post_user_data(entityType, newEntity) {
    if (!_validateEmailPermissions(newEntity)) throw new Error(`Not a valid email`);
    if (entityType == STORAGE_SUB_KEY_EMAILS) {
        newEntity = { ...newEntity };
        newEntity.id = _makeId();
    }
    return query(entityType).then(entities => {
        entities.push(newEntity);
        _saveUserData(entityType, entities);
        return newEntity;
    })
}

async function _post_send_email(newEntity) {
    // TODO
}

async function _post_change_user(loggedInUser) {
    saveToStorage(STORAGE_KEY_LOGGED_USER, loggedInUser);
    // TODO - If this is a new account, we need to add empty data to the 'users' list.
}

async function _saveUserData(entityType, entities) {
    const currUser = loadFromStorage(STORAGE_KEY_LOGGED_USER);
    const usersData = loadFromStorage(STORAGE_KEY_USERS);
    usersData[currUser][entityType] = entities;
    saveToStorage(STORAGE_KEY_USERS, usersData);
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _validateEmailPermissions(email) {
    const loggedInUser = loadFromStorage(STORAGE_KEY_LOGGED_USER);
    if (!loggedInUser) return false;
    return email.from == loggedInUser || email.to == loggedInUser;
}
