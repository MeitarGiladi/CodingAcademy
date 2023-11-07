import { dbUtilService } from './db-util.service.js'


export const storageService = {
    query,  // list emails or labels
    get,    // get email
    post,   // add email or label (maybe send email to other user)
    put,    // update email
    remove, // delete email
}

// Note - Each user can access only his data.

const STORAGE_KEY_LOGGED_USER = dbUtilService.STORAGE_KEY_LOGGED_USER
const STORAGE_KEY_FOLDERS = dbUtilService.STORAGE_KEY_FOLDERS
const STORAGE_KEY_USERS = dbUtilService.STORAGE_KEY_USERS
const STORAGE_SUB_KEY_EMAILS = dbUtilService.STORAGE_SUB_KEY_EMAILS
const STORAGE_SUB_KEY_LABELS = dbUtilService.STORAGE_SUB_KEY_LABELS


// list emails or labels for currUser
function query(entityType, delay = 200) {
    const currUser = dbUtilService.loadFromStorage(STORAGE_KEY_LOGGED_USER);
    const entities = dbUtilService.loadFromStorage(STORAGE_KEY_USERS)[currUser][entityType] || [];
    return new Promise(resolve => setTimeout(() => resolve(entities), delay));
}

// Only for emails
function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity.id === entityId);
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`);
        return entity;
    })
}

// For emails & labels (and send email)
function post(entityType, newEntity) {
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

// Update email
function put(entityType, updatedEntity) {
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
function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === entityId);
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`);
        entities.splice(idx, 1);
        _saveUserData(entityType, entities);
    })
}

/////// Private functions ///////
async function _saveUserData(entityType, entities) {
    const currUser = dbUtilService.loadFromStorage(STORAGE_KEY_LOGGED_USER);
    const usersData = dbUtilService.loadFromStorage(STORAGE_KEY_USERS);
    usersData[currUser][entityType] = entities;
    dbUtilService.saveToStorage(STORAGE_KEY_USERS, usersData);
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
    const loggedInUser = dbUtilService.loadFromStorage(STORAGE_KEY_LOGGED_USER);
    if (!loggedInUser) return false;
    return email.from == loggedInUser || email.to == loggedInUser;
}

