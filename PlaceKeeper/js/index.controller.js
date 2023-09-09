import { userService } from './services/user.service.js'

window.onHomeInit = onHomeInit; // For index.html


async function onHomeInit() {
    let userData = await userService.load();
        _renderUserData(userData);
}


function _renderUserData(userData) {
    console.log("user: ", userData);

    document.querySelector('body').style.backgroundColor = userData.bgColor;
    console.log("bgColor - ", userData.bgColor);
    document.querySelector('body').style.color = userData.txtColor;
    console.log("txtColor - ", userData.txtColor);

    let welcomeMsg = `<p>email - ${userData.email}</p>`;
    if (userData.age) welcomeMsg += `<p>age - ${userData.age}</p>`;
    if (userData.birthDate) welcomeMsg += `<p>birthDate - ${userData.birthDate}</p>`;
    if (userData.birthTime) welcomeMsg += `<p>birthTime - ${userData.birthTime}</p>`;
    console.log("welcome - ", welcomeMsg)

    document.querySelector(".curr-user-data").innerHTML = welcomeMsg;
    document.querySelector(".my-data").hidden = false;
}