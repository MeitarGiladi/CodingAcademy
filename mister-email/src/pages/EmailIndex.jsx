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
            return prevEmails.map((em) => (em.id === updatedEmail.id ? updatedEmail : em))
        });
    }

    function addEmail() {

    }

    function delEmail() {

    }


    return (
        <section className="email-index">

            <section className="email-index-main">

                <header className="email-list-header">
                    <i className="email-list-header-icon icon-unchecked"></i>
                </header>

                <EmailList emails={emails} CbUpdateEmail={updateEmail} />

                <footer className="email-list-footer">
                    <p>list-footer</p>
                </footer>

            </section>

        </section>
    )
}
