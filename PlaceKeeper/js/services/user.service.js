import { storageService } from './localStorage.service.js'

export const userService = {
    save,
    load,
}

function save(userData) {
    // save user data
    return storageService.post("userData", userData);
}

function load() {
    // load user data for home page
    return storageService.query("userData");
}

