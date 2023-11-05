import { emailService } from "./email.service";

export const utilService = {
    padTwo,
    saveToStorage,
    loadFromStorage,
    createNewEmail,
    getTimeOfEmailShort,
    getTimeOfEmailDetailed,
    getTimeOfEmailRelative
}


const SEC_IN_HOUR = 60 * 60;
const SEC_IN_DAY = 24 * SEC_IN_HOUR;
const SEC_IN_YEAR = 365 * SEC_IN_DAY;
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];


function padTwo(num) { // TODO - Might have a problem here
    return String(num).padStart(2, '0');
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function createNewEmail(emailProps) {
    const newEmail = {
        subject: '',  // needed
        body: '',
        isRead: 0,
        isStarred: false,
        isImportant: false,
        isDraft: true,  // change when send
        sentAt: (new Date()).getTime(),  // change when send
        removedAt: null,
        labels: [],
        from: emailService.getCurruser().email,
        to: ''  // needed
    };

    if (emailProps) {
        for (const prop in newEmail) {
            // We change only the valid props. 
            if (prop in emailProps) {
                newEmail[prop] = emailProps[prop];
            }
        }
    }

    return emailService.save(newEmail);
}


function getTimeOfEmailShort(sentAt) {

    const timeDiff = Date.now() - sentAt;

    let calcTime;
    if (timeDiff < 0)
        calcTime = "N/A";
    else {
        const emDate = new Date(sentAt);
        const emDateMinutes = padTwo(emDate.getMinutes());
        const emDateHours = padTwo(emDate.getHours());
        const emDateDay = padTwo(emDate.getDay());  // TODO - Might have a problem here
        const emDateMonth = padTwo(emDate.getMonth());
        const emDateYear = emDate.getYear();

        if (timeDiff < SEC_IN_DAY) {
            calcTime = `${emDateHours}:${emDateMinutes}`;
        } else if (timeDiff < SEC_IN_YEAR) {
            calcTime = `${emDateDay} ${MONTH_NAMES[emDate.getMonth()]}`;
        } else {
            calcTime = `${emDateDay}/${emDateMonth}/${emDateYear}`;
        }
    }

    return calcTime;
}

function getTimeOfEmailDetailed(sentAt) {

    const timeDiff = Date.now() - sentAt;

    let calcTime;
    if (timeDiff < 0)
        calcTime = "N/A";
    else {
        const emDate = new Date(sentAt);
        const emDateMinutes = padTwo(emDate.getMinutes());
        const emDateHours = padTwo(emDate.getHours());
        const emDateDayNum = padTwo(emDate.getDay());
        const emDateDayStr = emDate.toLocaleString('en-IL', { weekday: 'short' });
        const emDateMonthStr = emDate.toLocaleString('en-IL', { month: 'short' });
        const emDateYear = emDate.getYear();
        const relativeTime = getTimeOfEmailRelative(sentAt);

        if (timeDiff < SEC_IN_HOUR * 15) {
            calcTime = `${emDateHours}:${emDateMinutes} (${relativeTime})`;
        } else if (timeDiff < SEC_IN_DAY * 14) {
            calcTime = `${emDateDayStr}, ${emDateDayNum} ${emDateMonthStr}, ${emDateHours}:${emDateMinutes} (${relativeTime})`;
        } else if (emDateYear === (new Date().getFullYear())) {
            calcTime = `${emDateDayStr}, ${emDateDayNum} ${emDateMonthStr}, ${emDateHours}:${emDateMinutes}`;
        } else {
            calcTime = `${emDateDayStr}, ${emDateDayNum} ${emDateMonthStr} ${emDateYear}, ${emDateHours}:${emDateMinutes}`;
        }
    }

    return calcTime;
}

function getTimeOfEmailRelative(sentAt) {

    const timeDiff = Date.now() - sentAt;

    let calcTime;
    if (timeDiff < 0) {
        calcTime = "N/A";
    } else if (timeDiff < 1.5) {
        calcTime = "1 second ago";
    } else if (timeDiff < 60) {
        calcTime = `${Math.round(timeDiff)} seconds ago`;
    } else if (timeDiff < 90) {
        calcTime = "1 minute ago";
    } else if (timeDiff < SEC_IN_HOUR) {
        calcTime = `${Math.round(timeDiff / 60)} minutes ago`;
    } else if (timeDiff < SEC_IN_HOUR * 1.5) {
        calcTime = "1 hour ago";
    } else if (timeDiff < SEC_IN_DAY) {
        calcTime = `${Math.round(timeDiff / SEC_IN_HOUR)} hours ago`;
    } else if (timeDiff < SEC_IN_DAY * 1.5) {
        calcTime = "1 day ago";
    } else {
        calcTime = `${Math.round(timeDiff / SEC_IN_DAY)} days ago`;
    }

    return calcTime;
}