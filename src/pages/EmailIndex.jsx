import { Outlet, useNavigate, createSearchParams, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";

import { EmailNavBar } from "../cmp/EmailNavBar";
import { EmailFolderMenu } from "../cmp/EmailFolderMenu";
import { EmailSideBar } from "../cmp/EmailSideBar";
import { EmailList } from "../cmp/EmailList";
import { EmailDetails } from "../cmp/EmailDetails";
import { EmailComposeList } from "../cmp/EmailComposeList";


export function EmailIndex() {

    const navigate = useNavigate();

    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [emails, setEmails] = useState([]);
    const [currFilter, setCurrFilter] = useState(emailService.getFilterFromParams(params.folderName, searchParams))
    const [isFolderMenuOpen, setIsFolderMenuOpen] = useState(false);
    const [composedEmails, setComposedEmails] = useState([]);  // If we change folder, the composedEmails should remain the same.

    const lastEmailFolder = useRef("inbox");

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

    // Changing folder or label
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

    // Clicking on email
    // If the email is draft, we need to open it as composed email
    function displayEmail(email) {
        updateEmail({ ...email, isRead: 1 });

        if (email.isDraft) {
            openComposedEmail(email);
            return;
        }

        lastEmailFolder.current = params.folderName;

        navigate({
            pathname: '/mail/view/' + email.id
        });
    }

    // Sending a new composed email
    function sendEmail(email) {
        console.log("sendEmail: ", email);
    }

    // Clicking on 'del' button - Should we delete or send to Bin?
    function delEmailWrapper(email) {
        if (email.isDraft) {
            deleteEmail(email);
        }
        else if (!email.removedAt) {
            trashedEmail(email);
        }
        else if (params.folderName === "bin") {
            deleteEmail(email);
        }
        else {
            console.log("Unexpected Error - couldn't delete email");
        }
    }

    // Moving the email to Bin
    async function trashedEmail(email) {
        const updatedEmail = { ...email, removedAt: (new Date()).getTime() };
        await emailService.save(updatedEmail);
        setEmails((prevEmails) => {
            return prevEmails.filter((em) => em.id !== email.id)
        });
    }

    // Deleting the email
    async function deleteEmail(email) {
        await emailService.remove(email.id);
        setEmails((prevEmails) => {
            return prevEmails.filter((em) => em.id !== email.id)
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

    function toggleFolderMenuOpen() {
        setIsFolderMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    }

    function replyEmail(email) {
        console.log("replyEmail: ", email);
    }

    async function openComposedEmail(email) {
        let composedEmail;
        if (email && email.isDraft) {
            composedEmail = email;
        } else {
            composedEmail = await utilService.createBlankEmail();
        }
        setComposedEmails((prevComposedEmails) => {
            return [...prevComposedEmails, composedEmail]
        });
    }

    function closeComposedEmail(email) {
        setComposedEmails((prevComposedEmails) => {
            return prevComposedEmails.filter((em) => em.id !== email.id)
        });
    }


    return (
        <div className="email-index">

            <EmailNavBar cbToggleFolderMenuOpen={toggleFolderMenuOpen} />

            <div className="email-index-main">

                <EmailFolderMenu
                    currFolder={params.folderName}
                    currLabel={currFilter.label}
                    isFolderMenuOpen={isFolderMenuOpen}
                    cbFilterEmails={(newFilter) => updateFilter(newFilter)}
                    cbOpenComposedEmail={openComposedEmail} />

                <div className="email-index-main-center">
                    {params.folderName === "view" ? (
                        <EmailDetails
                            email={emails.filter((em) => em.id === params.emailId)[0]}
                            cbToggleStar={toggleStar}
                            cbToggleImportant={toggleImportant}
                            cbReplyEmail={replyEmail} />
                    ) : (
                        <EmailList
                            emails={emails}
                            cbToggleRead={toggleRead}
                            cbToggleStar={toggleStar}
                            cbToggleImportant={toggleImportant}
                            cpDeleteEmail={delEmailWrapper}
                            cbDisplayEmail={displayEmail} />
                    )}
                </div>

                <EmailSideBar />

            </div>

            <EmailComposeList
                composedEmails={composedEmails}
                cbSendEmail={sendEmail}
                cbDeleteDraftEmail={delEmailWrapper}
                cbCloseWindow={closeComposedEmail} />

        </div>
    )
}
