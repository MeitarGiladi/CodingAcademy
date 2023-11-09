import { emailService } from "./email.service"

export const utilService = {
    padTwo,
    createNewEmail,
    getTimeOfEmailShort,
    getTimeOfEmailDetailed,
    getTimeOfEmailRelative
}


const SEC_IN_HOUR = 60 * 60
const SEC_IN_DAY = 24 * SEC_IN_HOUR
const SEC_IN_YEAR = 365 * SEC_IN_DAY


function padTwo(num) { // TODO - Might have a problem here
    return String(num).padStart(2, '0')
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
        from: emailService.getCurruser(),
        to: ''  // needed
    }

    if (emailProps) {
        for (const prop in newEmail) {
            // We change only the valid props. 
            if (prop in emailProps) {
                newEmail[prop] = emailProps[prop]
            }
        }
    }

    return emailService.save(newEmail)
}


function getTimeOfEmailShort(sentAt) {

    const timeDiff = (Date.now() - sentAt) / 1000

    let calcTime
    if (timeDiff < 0)
        calcTime = "N/A"
    else {
        const emDate = new Date(sentAt)
        const emDateMinutes = padTwo(emDate.getMinutes())
        const emDateHours = padTwo(emDate.getHours())
        const emDateDay = padTwo(emDate.getDate())
        const emDateMonth = padTwo(emDate.getMonth() + 1)
        const emDateMonthStr = emDate.toLocaleString('en-IL', { month: 'short' })
        const emDateYear = emDate.getFullYear()

        if (timeDiff < SEC_IN_DAY) {
            calcTime = `${emDateHours}:${emDateMinutes}`
        } else if (timeDiff < SEC_IN_YEAR) {
            calcTime = `${emDateDay} ${emDateMonthStr}`
        } else {
            calcTime = `${emDateDay}/${emDateMonth}/${emDateYear}`
        }
    }

    return calcTime
}

function getTimeOfEmailDetailed(sentAt) {

    const timeDiff = (Date.now() - sentAt) / 1000

    let calcTime
    if (timeDiff < 0)
        calcTime = "N/A"
    else {
        const emDate = new Date(sentAt)
        const emDateMinutes = padTwo(emDate.getMinutes())
        const emDateHours = padTwo(emDate.getHours())
        const emDateDayNum = padTwo(emDate.getDate())
        const emDateDayStr = emDate.toLocaleString('en-IL', { weekday: 'short' })
        const emDateMonthStr = emDate.toLocaleString('en-IL', { month: 'short' })
        const emDateYear = emDate.getFullYear()
        const relativeTime = getTimeOfEmailRelative(sentAt)

        if (timeDiff < SEC_IN_HOUR * 15) {
            calcTime = `${emDateHours}:${emDateMinutes} (${relativeTime})`
        } else if (timeDiff < SEC_IN_DAY * 14) {
            calcTime = `${emDateDayStr}, ${emDateDayNum} ${emDateMonthStr}, ${emDateHours}:${emDateMinutes} (${relativeTime})`
        } else if (emDateYear === (new Date().getFullYear())) {
            calcTime = `${emDateDayStr}, ${emDateDayNum} ${emDateMonthStr}, ${emDateHours}:${emDateMinutes}`
        } else {
            calcTime = `${emDateDayStr}, ${emDateDayNum} ${emDateMonthStr} ${emDateYear}, ${emDateHours}:${emDateMinutes}`
        }
    }

    return calcTime
}

function getTimeOfEmailRelative(sentAt) {

    const timeDiff = (Date.now() - sentAt) / 1000

    let calcTime
    if (timeDiff < 0) {
        calcTime = "N/A"
    } else if (timeDiff < 1.5) {
        calcTime = "1 second ago"
    } else if (timeDiff < 60) {
        calcTime = `${Math.round(timeDiff)} seconds ago`
    } else if (timeDiff < 90) {
        calcTime = "1 minute ago"
    } else if (timeDiff < SEC_IN_HOUR) {
        calcTime = `${Math.round(timeDiff / 60)} minutes ago`
    } else if (timeDiff < SEC_IN_HOUR * 1.5) {
        calcTime = "1 hour ago"
    } else if (timeDiff < SEC_IN_DAY) {
        calcTime = `${Math.round(timeDiff / SEC_IN_HOUR)} hours ago`
    } else if (timeDiff < SEC_IN_DAY * 1.5) {
        calcTime = "1 day ago"
    } else {
        calcTime = `${Math.round(timeDiff / SEC_IN_DAY)} days ago`
    }

    return calcTime
}