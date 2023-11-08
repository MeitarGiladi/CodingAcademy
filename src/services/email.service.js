import { storageService } from './async-storage.service.js'
import { dbInitStorageService } from './db-init-storage.service.js'
import {
    STORAGE_KEY_LOGGED_USER,
    STORAGE_KEY_FOLDERS,
    STORAGE_KEY_USERS,
    STORAGE_SUB_KEY_EMAILS,
    STORAGE_SUB_KEY_LABELS,
    POST_TYPE_USER_DATA,
    POST_TYPE_SEND_EMAIL,
    POST_TYPE_CHANGE_USER,
    saveToStorage,
    loadFromStorage
} from './db-util.service.js'


export const emailService = {
    query,
    save,
    remove,
    sendEmail,
    getById,
    getFolders,
    getLabelFolders,
    getCurruser,
    getFilterFromParams,
    getRelevantSearchParam,
    changeUser
}



const OVERWRITE_DATABASE = false;
dbInitStorageService.createDatabase(OVERWRITE_DATABASE);


async function query(filterBy = { txt: "", isRead: "", folder: "", label: "" }) {

    let emails = await storageService.query(STORAGE_SUB_KEY_EMAILS)
    if (!emails) return emails;

    if (filterBy) {
        const { txt, isRead, folder, label } = filterBy
        const currUserEmail = getCurruser(); // Should I validate again that the currUser isn't null or empty?
        
        if (txt) emails = emails.filter(em => (em.subject + em.body + em.from + em.to).toLowerCase().includes(txt.toLowerCase()));
        if (isRead) emails = emails.filter(em => em.isRead === isRead);

        if (folder === 'view') {
            // For viewing email from URL we need an option to get all emails from all folders, including bin & drafts.
            // TODO - How can we make sure 1 user cannot see drafts of another user?
            return emails;
        }
        
        if (folder === 'bin') {
            emails = emails.filter(em => em.removedAt);
            return emails;
        }
        emails = emails.filter(em => !em.removedAt);  // We want to see deleted emails only at the 'Bin'.

        if (folder === 'drafts') {
            emails = emails.filter(em => em.isDraft);
            return emails;
        }
        emails = emails.filter(em => !em.isDraft);  // We want to see draft emails only at the 'Draft'.

        switch (folder) {
            case 'inbox':
                emails = emails.filter(em => em.to === currUserEmail);
                break;
            case 'sent':
                emails = emails.filter(em => em.from == currUserEmail);
                break;
            case 'starred':
                emails = emails.filter(em => em.isStarred);
                break;
            case 'important':
                emails = emails.filter(em => em.isImportant);
                break;
            case 'all-mail':
                break;
            case 'label':
                emails = emails.filter(em => em.labels.indexOf(label) > -1);
                break;
            default:
                console.log("invalid folder in filter");
                emails = [];
        }
    }
    return emails
}

function getById(emailId) {
    return storageService.get(emailId)
}

function remove(id) {
    return storageService.remove(STORAGE_SUB_KEY_EMAILS, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_SUB_KEY_EMAILS, emailToSave)
    } else {
        return storageService.post(POST_TYPE_USER_DATA, emailToSave, STORAGE_SUB_KEY_EMAILS)
    }
}

function sendEmail(recipient, email) {
    // TODO
    console.log("send: ", recipient, email);
}

function getFolders() {
    return loadFromStorage(STORAGE_KEY_FOLDERS);
}

function getCurruser() {
    return loadFromStorage(STORAGE_KEY_LOGGED_USER);
}

function getLabelFolders() {
    return storageService.query(STORAGE_SUB_KEY_LABELS);
}

function getFilterFromParams(currFolder, searchParams) {
    const defaultFilter = {
        txt: "",
        isRead: "",
        label: ""
    };
    const filterBy = { ...defaultFilter, folder: currFolder };
    for (const field in defaultFilter) {
        const value = searchParams.get(field);
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

function changeUser(username) {
    storageService.post(POST_TYPE_CHANGE_USER, username);
    console.log("logged in - ", username);  // TODO popup
}





