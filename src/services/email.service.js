import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    getFolders,
    getLabelFolders,
    getCurruser
}

const STORAGE_KEY = 'emails'
const STORAGE_KEY_USER = 'loggedInUser' // Added a validation in async-storage so each user can see only his emails.
const STORAGE_KEY_FOLDERS = 'folders'
const STORAGE_KEY_LABEL_FOLDERS = 'label_folders'


const CREATE_AGAIN = true;
_createEmails()
_createUserFolders()
_createUserLabelFolders()
_createLoggedInUser()


async function query(filterBy = { txt: "", isRead: null, status: null, label: "" }) {

    let emails = await storageService.query(STORAGE_KEY)
    if (!emails) return emails;

    if (filterBy) {
        const { txt, isRead, status, label } = filterBy
        if (txt) emails = emails.filter(em => (em.subject + em.body + em.from + em.to).toLowerCase().includes(txt.toLowerCase()));
        if (isRead !== null) emails = emails.filter(em => em.isRead === isRead);
        const currUserEmail = getCurruser().email; // Should I validate again that the currUser isn't null or empty?
        if (status) switch (status) {
            case 'inbox':
                emails = emails.filter(em => em.to === currUserEmail);
                break;
            case 'sent':
                emails = emails.filter(em => em.from == currUserEmail);
                break;
            case 'star':
                emails = emails.filter(em => em.isStarred);
                break;
            case 'important':
                emails = emails.filter(em => em.isImportant);
                break;
            case 'trash':
                emails = emails.filter(em => em.removedAt);
                break;
            case 'label':
                console.log("new emails: ", label, emails)
                emails = emails.filter(em => em.labels.indexOf(label) > -1);
                break;
            default:
                console.log("invalid status in filter");
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

function getFolders() {
    return utilService.loadFromStorage(STORAGE_KEY_FOLDERS);
}

function getLabelFolders() {
    return utilService.loadFromStorage(STORAGE_KEY_LABEL_FOLDERS);
}

function getCurruser() {
    return utilService.loadFromStorage(STORAGE_KEY_USER);
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length || CREATE_AGAIN) { // add 'true' if you want to overwrite
        emails = [
            {
                id: 'e1',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                isStarred: false,
                isImportant: false,
                sentAt: 1551133930594,
                removedAt: null, //for later use
                labels: ["games"],
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e2',
                subject: 'Miss you too!',
                body: 'yayy',
                isRead: false,
                isStarred: true,
                isImportant: false,
                sentAt: 1551133931700,
                removedAt: null, //for later use
                labels: [],
                from: 'user@appsus.com',
                to: 'momo@momo.com'
            },
            {
                id: 'e3',
                subject: 'heyhey!',
                body: 'stop8756666668764824555555555555555552346347456700000098790000000000',
                isRead: true,
                isStarred: false,
                isImportant: true,
                sentAt: 1551133940594,
                removedAt: null, //for later use
                labels: ["checkins", "games"],
                from: 'bla@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e4',
                subject: 'kkk!',
                body: 'wassaps',
                isRead: false,
                isStarred: true,
                isImportant: false,
                sentAt: 1551133939594,
                removedAt: null, //for later use
                labels: [],
                from: 'bla@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e5',
                subject: 'iiiiii!',
                body: 'stop',
                isRead: false,
                isStarred: true,
                isImportant: false,
                sentAt: 1551133940594,
                removedAt: null, //for later use
                labels: [],
                from: 'bla@momo.com',
                to: 'hey@appsus.com'
            },
            {
                id: 'e6',
                subject: 'zzzzz!',
                body: 'wassaps67555555555555555555555555555555555555558',
                isRead: true,
                isStarred: false,
                isImportant: true,
                sentAt: 1551133939594,
                removedAt: null, //for later use
                labels: [],
                from: 'bla@momo.com',
                to: 'way@appsus.com'
            },
            {
                id: 'e7',
                subject: 'jjjjj!',
                body: 'wassapsfgdsssssssssssssssssssssssssssssssssssssssssssssssfgfgfsgfsg',
                isRead: false,
                isStarred: true,
                isImportant: true,
                sentAt: 1551133939594,
                removedAt: null, //for later use
                labels: [],
                from: 'bla@momo.com',
                to: 'user@appsus.com'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function _createUserFolders() {
    let userFolders = utilService.loadFromStorage(STORAGE_KEY_FOLDERS)
    if (!userFolders || CREATE_AGAIN) {
        const folders = [
            { name: "inbox", filter: { status: "inbox" }, iconClass: "" },
            { name: "sent", filter: { status: "sent" }, iconClass: "" },
            { name: "star", filter: { status: "star" }, iconClass: "" },
            { name: "important", filter: { status: "important" }, iconClass: "" },
            { name: "trash", filter: { status: "trash" }, iconClass: "" }
        ];
        utilService.saveToStorage(STORAGE_KEY_FOLDERS, folders)
    }
}

function _createUserLabelFolders() {
    let userLabelFolders = utilService.loadFromStorage(STORAGE_KEY_LABEL_FOLDERS)
    if (!userLabelFolders || CREATE_AGAIN) {
        const labelFolders = [
            "amsterdam",
            "checkins",
            "games",
            "bills"
        ];
        utilService.saveToStorage(STORAGE_KEY_LABEL_FOLDERS, labelFolders)
    }
}

function _createLoggedInUser() {
    let loggedUser = utilService.loadFromStorage(STORAGE_KEY_USER)
    if (!loggedUser || CREATE_AGAIN) {
        const loggedInUser = {
            email: 'user@appsus.com',
            fullname: 'Mahatma Appsus'
        };
        utilService.saveToStorage(STORAGE_KEY_USER, loggedInUser)
    }
}




