import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    getCurruser
}

const STORAGE_KEY = 'emails'
const STORAGE_KEY_USER = 'loggedInUser' // Added a validation in async-storage so each user can see only his emails.


_createEmails()
_createLoggedInUser()


async function query(filterBy = { txt: "", isRead: null, status: null }) {

    let emails = await storageService.query(STORAGE_KEY)
    if (!emails) return emails;

    if (filterBy) {
        const { status, txt, isRead } = filterBy
        if (txt) emails = emails.filter(em => (em.subject + em.body + em.from + em.to).toLowerCase().includes(txt.toLowerCase()));
        if (isRead !== null) emails = emails.filter(em => em.isRead === isRead);
        const currUserEmail = getCurruser().email; // Should I validate again that the currUser isn't null or empty?
        if (status) switch (status) {
            case 'inbox':
                emails = emails.filter(em => em.to === currUserEmail);
                break;
            case 'sent':
                emails = emails.filter(em => em.from === currUserEmail);
                break;
            case 'star':
                emails = emails.filter(em => em.isStarred);
                break;
            case 'trash':
                emails = emails.filter(em => em.removedAt);
                break;
            default:
                console.log("error - invalid query")
        }
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

// function createEmail(model = '', type = '', batteryStatus = 100) {
//     return {
//         model,
//         batteryStatus,
//         type
//     }
// }

function getCurruser() {
    return utilService.loadFromStorage(STORAGE_KEY_USER);
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length || true) {  // remove the 'true' if you want to not overwrite the emails
        emails = [
            {
                id: 'e1',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null, //for later use
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e2',
                subject: 'Miss you too!',
                body: 'yayy',
                isRead: false,
                isStarred: false,
                sentAt: 1551133931700,
                removedAt: null, //for later use
                from: 'user@appsus.com',
                to: 'momo@momo.com'
            },
            {
                id: 'e3',
                subject: 'heyhey!',
                body: 'stop8756666668764824555555555555555552346347456700000098790000000000',
                isRead: true,
                isStarred: false,
                sentAt: 1551133940594,
                removedAt: null, //for later use
                from: 'bla@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e4',
                subject: 'kkk!',
                body: 'wassaps',
                isRead: false,
                isStarred: false,
                sentAt: 1551133939594,
                removedAt: null, //for later use
                from: 'bla@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e5',
                subject: 'iiiiii!',
                body: 'stop',
                isRead: false,
                isStarred: false,
                sentAt: 1551133940594,
                removedAt: null, //for later use
                from: 'bla@momo.com',
                to: 'hey@appsus.com'
            },
            {
                id: 'e6',
                subject: 'zzzzz!',
                body: 'wassaps67555555555555555555555555555555555555558',
                isRead: true,
                isStarred: false,
                sentAt: 1551133939594,
                removedAt: null, //for later use
                from: 'bla@momo.com',
                to: 'way@appsus.com'
            },
            {
                id: 'e7',
                subject: 'jjjjj!',
                body: 'wassapsfgdsssssssssssssssssssssssssssssssssssssssssssssssfgfgfsgfsg',
                isRead: false,
                isStarred: false,
                sentAt: 1551133939594,
                removedAt: null, //for later use
                from: 'bla@momo.com',
                to: 'user@appsus.com'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function _createLoggedInUser() {
    let loggedUser = utilService.loadFromStorage(STORAGE_KEY_USER)
    if (!loggedUser) {
        const loggedinUser = {
            email: 'user@appsus.com',
            fullname: 'Mahatma Appsus'
        };
        utilService.saveToStorage(STORAGE_KEY_USER, loggedinUser)
    }
}




