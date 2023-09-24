import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    getFolders,
    getLabelFolders,
    getCurruser,
    getFilterFromParams,
    getRelevantSearchParam
}

const STORAGE_KEY = 'emails'
const STORAGE_KEY_USER = 'loggedInUser' // Added a validation in async-storage so each user can see only his emails.
const STORAGE_KEY_FOLDERS = 'folders'
const STORAGE_KEY_LABEL_FOLDERS = 'labelFolders'


const CREATE_AGAIN = true;
_createEmails()
_createUserFolders()
_createUserLabelFolders()
_createLoggedInUser()


async function query(filterBy = { txt: "", isRead: "", folder: "", label: "" }) {

    let emails = await storageService.query(STORAGE_KEY)
    if (!emails) return emails;

    if (filterBy) {
        const { txt, isRead, folder, label } = filterBy
        if (txt) emails = emails.filter(em => (em.subject + em.body + em.from + em.to).toLowerCase().includes(txt.toLowerCase()));
        if (isRead) emails = emails.filter(em => em.isRead === isRead);
        const currUserEmail = getCurruser().email; // Should I validate again that the currUser isn't null or empty?
        if (folder) {
            if (folder === 'bin') {
                emails = emails.filter(em => em.removedAt);
                return emails;
            }
            emails = emails.filter(em => !em.removedAt);  // We want to see deleted emails onyl at the Bin.

            if (folder === 'drafts') {
                emails = emails.filter(em => em.isDraft);
                return emails;
            }
            emails = emails.filter(em => !em.isDraft);  // Important, so user cannot see drafts of other user (written for the first user).

            switch (folder) {
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
                case 'all-mail':
                    // emails = emails.filter(em => true);
                    break;
                case 'label':
                    console.log("new emails: ", label, emails)
                    emails = emails.filter(em => em.labels.indexOf(label) > -1);
                    break;
                default:
                    console.log("invalid folder in filter");
            }
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

function getFilterFromParams(currFolder, searchParams) {
    const defaultFilter = {
        txt: "",
        isRead: "",
        label: ""
    };
    const filterBy = {...defaultFilter, folder: (currFolder ? currFolder : "inbox")};
    for (const field in defaultFilter) {
        let value = searchParams.get(field);
        if (value) filterBy[field] = value;
    }

    return filterBy;
}

function getRelevantSearchParam(filterBy) {
    const newSearchParam = {};
    if (filterBy.txt) newSearchParam.txt = filterBy.txt;
    if (filterBy.isRead) newSearchParam.isRead = filterBy.isRead;
    if (filterBy.folder === "label") newSearchParam.label = filterBy.label;  // If "folder == label" we want the 'label' param.
    return newSearchParam;
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length || CREATE_AGAIN) { // add 'true' if you want to overwrite
        emails = [
            {
                id: 'e1',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: 1,
                isStarred: false,
                isImportant: false,
                isDraft: false,
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
                isRead: 0,
                isStarred: true,
                isImportant: false,
                isDraft: false,
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
                isRead: 1,
                isStarred: false,
                isImportant: true,
                isDraft: false,
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
                isRead: 0,
                isStarred: true,
                isImportant: false,
                isDraft: false,
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
                isRead: 0,
                isStarred: true,
                isImportant: false,
                isDraft: false,
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
                isRead: 1,
                isStarred: false,
                isImportant: true,
                isDraft: false,
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
                isRead: 0,
                isStarred: true,
                isImportant: true,
                isDraft: false,
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
            { name: "inbox", text: "Inbox", iconClass: "icon-folder-inbox" },
            { name: "starred", text: "Starred", iconClass: "icon-folder-starred" },
            { name: "important", text: "Important", iconClass: "icon-folder-important" },
            { name: "sent", text: "Sent", iconClass: "icon-folder-sent" },
            { name: "drafts", text: "Drafts", iconClass: "icon-folder-drafts" },
            { name: "all-mail", text: "All Mail", iconClass: "icon-folder-allmail" },
            { name: "bin", text: "Bin", iconClass: "icon-folder-bin" }
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
            "bills",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
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




