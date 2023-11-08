export const STORAGE_KEY_LOGGED_USER = 'loggedInUser' // Added a validation in async-storage so each user can see only his emails.
export const STORAGE_KEY_FOLDERS = 'folders'
export const STORAGE_KEY_USERS = 'users'
export const STORAGE_SUB_KEY_EMAILS = 'emails'
export const STORAGE_SUB_KEY_LABELS = 'labels'

export const POST_TYPE_USER_DATA = "post_type_user_data"
export const POST_TYPE_SEND_EMAIL = "post_type_send_email"
export const POST_TYPE_CHANGE_USER = "post_type_change_user"


export function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

export function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}
