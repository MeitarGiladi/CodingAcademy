import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';

import { emailService } from "../services/email.service";

import { EmailList } from "../cmp/EmailList";


export function EmailIndex() {

    const [emails, setEmails] = useState([]);

    useEffect(() => {
        loadEmails();
    }, []);


    async function loadEmails() {
        const updatedEmails = await emailService.query();
        setEmails(updatedEmails);
    }

    async function updateEmail(email) {
        const updatedEmail = await emailService.save(email);
        setEmails((prevEmails) => {
            prevEmails.map((em) => (em.id === updatedEmail.id ? updatedEmail : em))
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
