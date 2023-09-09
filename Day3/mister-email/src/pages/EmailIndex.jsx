import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';

import { emailService } from "../services/email.service";

import { EmailList } from "../cmp/EmailList";


export function EmailIndex() {

    const [emails, setEmails] = useState([]);

    useEffect(() => {
        loadEmails();
    }, []);

    useEffect(() => {
        sortEmails();
    }, [emails]);


    async function loadEmails() {
        const updatedEmails = await emailService.query();
        setEmails(updatedEmails);
    }

    function sortEmails() {
        // Sort according to some fields.
    }

    function updateEmail(emailId, updatedFields) {
        const emailIdx = emails.findIndex(em => em.id === emailId);
        emailService.save(emails[emailIdx]);
        setEmails((prevEmails) => {
            const newEmails = [...prevEmails];  // The indexes remain the same so we can still use 'emailIdx'
            newEmails[emailIdx] = { ...newEmails[emailIdx], ...updatedFields };
            return newEmails;
        });
    }

    function addEmail() {

    }

    function delEmail() {

    }



    return (
        <section className="email-index">

            <EmailList emails={emails} CbUpdateEmail={updateEmail} />

        </section>
    )
}
