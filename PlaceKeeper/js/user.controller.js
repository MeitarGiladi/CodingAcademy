import { userService } from './services/user.service.js'
import { utilService } from './services/util.service.js'

window.onSaveUser = onSaveUser; // For user-prefs.html


async function onSaveUser(ev) {
    ev.preventDefault();

    let userData = _getUserValues();
    console.log("UserData to save: ", userData);

    try {
        let res = await userService.save(userData);
        utilService.flashMsg("user-msg", "Saved");
    } catch {
        utilService.flashMsg("user-msg", "Failed - Try again in a few minutes")
    }
}


function _getUserValues() {
    let userData = new Object();
    userData.email = document.querySelector(".user-data .email").value;
    userData.bgColor = document.querySelector(".user-data .bgColor").value;
    userData.txtColor = document.querySelector(".user-data .txtColor").value;

    let age = document.querySelector(".user-data .age").value;
    if (age) userData.age = age;
    let birthDate = document.querySelector(".user-data .birthDate").value;
    if (birthDate) userData.birthDate = birthDate;
    let birthTime = document.querySelector(".user-data .birthTime").value;
    if (birthTime) userData.birthTime = birthTime;

    return userData;
}

