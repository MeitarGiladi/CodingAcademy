

const STORAGE_KEY_LOGGED_USER = 'loggedInUser' // Added a validation in async-storage so each user can see only his emails.
const STORAGE_KEY_FOLDERS = 'folders'
const STORAGE_KEY_USERS = 'users'
const STORAGE_SUB_KEY_EMAILS = 'emails'
const STORAGE_SUB_KEY_LABELS = 'labels'


function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}


export const dbUtilService = {
    STORAGE_KEY_LOGGED_USER,
    STORAGE_KEY_FOLDERS,
    STORAGE_KEY_USERS,
    STORAGE_SUB_KEY_EMAILS,
    STORAGE_SUB_KEY_LABELS,
    saveToStorage,
    loadFromStorage
}