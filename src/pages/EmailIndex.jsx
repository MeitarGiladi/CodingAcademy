import { Outlet, useNavigate, createSearchParams, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";

import { EmailNavBar } from "../cmp/EmailNavBar";
import { EmailFolderMenu } from "../cmp/EmailFolderMenu";
import { EmailSideBar } from "../cmp/EmailSideBar";
import { EmailList } from "../cmp/EmailList";
import { EmailDetails } from "../cmp/EmailDetails";


export function EmailIndex() {

    const navigate = useNavigate();

    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [emails, setEmails] = useState([]);
    const [currFilter, setCurrFilter] = useState(emailService.getFilterFromParams(params.folderName, searchParams))
    const [isFolderMenuOpen, setIsFolderMenuOpen] = useState(false);

    useEffect(() => {
        loadEmails(currFilter);
    }, [currFilter]);

    async function loadEmails(filterBy) {
        const updatedEmails = await emailService.query(filterBy);
        setEmails(updatedEmails);
        setSearchParams(emailService.getRelevantSearchParam(filterBy));
    }

    async function updateEmail(email) {
        const updatedEmail = await emailService.save(email);
        setEmails((prevEmails) => {
            return prevEmails.map((em) => (em.id === updatedEmail.id ? updatedEmail : em))
        });
    }

    function displayEmail(email) {
        updateEmail({ ...email, isRead: 1 });
        navigate({
            pathname: '/mail/view/' + email.id
        });
    }

    function addEmail() {

    }

    function delEmailWrapper(email) {
        if (!email.removedAt) {
            trashedEmail(email);
        }
        else if (params.folderName === "bin") {
            deleteEmail(email);
        }
        else {
            console.log("Unexpected Error - couldn't delete email");
        }
    }

    async function trashedEmail(email) {
        const updatedEmail = { ...email, removedAt: (new Date()).getTime() };
        await emailService.save(updatedEmail);
        setEmails((prevEmails) => {
            return prevEmails.filter((em) => em.id !== email.id)
        });
    }

    async function deleteEmail(email) {
        await emailService.remove(email.id);
        setEmails((prevEmails) => {
            return prevEmails.filter((em) => em.id !== email.id)
        });
    }

    async function updateFilter(filterBy) {
        setCurrFilter((prevFilter) => {
            return { ...prevFilter, ...filterBy }
        });
        // navigate to the URL is not enough to render the page again because we use the same 'route'.
        const newSearchParams = emailService.getRelevantSearchParam(filterBy);
        navigate({
            pathname: '/mail/' + filterBy.folder,
            search: createSearchParams(newSearchParams).toString()
        });
    }

    function toggleRead(ev, email) {
        ev.stopPropagation();
        const updatedEmail = { ...email, isRead: 1 - email.isRead };
        updateEmail(updatedEmail);
    }

    function toggleStar(ev, email) {
        ev.stopPropagation();
        const updatedEmail = { ...email, isStarred: !email.isStarred };
        updateEmail(updatedEmail);
    }

    function toggleImportant(ev, email) {
        ev.stopPropagation();
        const updatedEmail = { ...email, isImportant: !email.isImportant };
        updateEmail(updatedEmail);
    }

    function toggleIsFolderMenuOpen() {
        setIsFolderMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    }

    function replyEmail(email) {
        console.log("replyEmail: ", email);
    }


    return (
        <div className="email-index">

            <EmailNavBar cbToggleIsFolderMenuOpen={toggleIsFolderMenuOpen} />

            <div className="email-index-main">
                <EmailFolderMenu currFolder={params.folderName} currLabel={currFilter.label} isFolderMenuOpen={isFolderMenuOpen} cbFilterEmails={(newFilter) => updateFilter(newFilter)} />
                <div className="email-index-main-center">
                    {params.folderName === "view" ? (
                        <EmailDetails email={emails.filter((em) => em.id === params.emailId)[0]}
                            cbToggleStar={toggleStar}
                            cbToggleImportant={toggleImportant}
                            cbReplyEmail={replyEmail} />
                    ) : (
                        <EmailList emails={emails}
                            cbToggleRead={toggleRead}
                            cbToggleStar={toggleStar}
                            cbToggleImportant={toggleImportant}
                            cpDeleteEmail={delEmailWrapper}
                            cbDisplayEmail={displayEmail} />
                    )}
                </div>
                <EmailSideBar />
            </div>

        </div>
    )
}
