import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';

import { emailService } from "../services/email.service";

import { EmailNavBar } from "../cmp/EmailNavBar";
import { EmailFolderMenu } from "../cmp/EmailFolderMenu";
import { EmailList } from "../cmp/EmailList";
import { EmailSideBar } from "../cmp/EmailSideBar";


export function EmailIndex() {

    const [currFilter, setCurrFilter] = useState({ txt: "", isRead: null, status: "inbox", label: "" })
    const [emails, setEmails] = useState([]);
    const [isFolderMenuOpen, setIsFolderMenuOpen] = useState(false);

    useEffect(() => {
        loadEmails(currFilter);
    }, [currFilter]);


    async function loadEmails(filterBy) {
        const updatedEmails = await emailService.query(filterBy);
        setEmails(updatedEmails);
    }

    async function updateEmail(email) {
        const updatedEmail = await emailService.save(email);
        setEmails((prevEmails) => {
            return prevEmails.map((em) => (em.id === updatedEmail.id ? updatedEmail : em))
        });
    }

    function addEmail() {

    }

    function delEmail() {

    }

    async function updateFilter(filterBy) {
        setCurrFilter((prevFilter) => {
            return { ...prevFilter, ...filterBy }
        });
    }

    function toggleIsFolderMenuOpen() {
        setIsFolderMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    }


    return (
        <div className="email-index">

            <EmailNavBar cbToggleIsFolderMenuOpen={toggleIsFolderMenuOpen} />

            <div className="email-index-main">
                <EmailFolderMenu isFolderMenuOpen={isFolderMenuOpen} cbFilterEmails={(newFilter) => updateFilter(newFilter)} />
                <EmailList emails={emails} cbUpdateEmail={updateEmail} />
                <EmailSideBar />
            </div>

        </div>
    )
}
