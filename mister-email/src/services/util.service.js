
export const utilService = {
    padTwo,
    saveToStorage,
    loadFromStorage
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function padTwo(num) {
    return String(num).padStart(2, '0');
}