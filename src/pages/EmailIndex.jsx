import { Link, Outlet, useNavigate, createSearchParams, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import { emailService } from "../services/email.service";

import { EmailNavBar } from "../cmp/EmailNavBar";
import { EmailFolderMenu } from "../cmp/EmailFolderMenu";
import { EmailSideBar } from "../cmp/EmailSideBar";


export function EmailIndex() {

    const navigate = useNavigate();

    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [emails, setEmails] = useState([]);
    const [currFilter, setCurrFilter] = useState(emailService.getFilterFromParams(params.folderName, searchParams))  // need to fix 'getFilterFromParams'
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

    function addEmail() {
        
    }

    function delEmail() {

    }

    async function updateFilter(filterBy) {
        setCurrFilter((prevFilter) => {
            return { ...prevFilter, ...filterBy }
        });
        updateUrlFilter(filterBy);  // Is updating the URL should rerender the EmailIndex element? Why not? Isn't it easier to maintain everything with searchParams only?
    }

    function updateUrlFilter(filterBy) {
        const newFolderPath = '/mail/' + filterBy.folder;
        const newSearchParams = emailService.getRelevantSearchParam(filterBy);
        navigate({
            pathname: newFolderPath,
            search: createSearchParams(newSearchParams).toString()
        });
    }

    function toggleIsFolderMenuOpen() {
        setIsFolderMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    }


    return (
        <div className="email-index">

            <EmailNavBar cbToggleIsFolderMenuOpen={toggleIsFolderMenuOpen} />

            <div className="email-index-main">
                <EmailFolderMenu currFolder={params.folder} isFolderMenuOpen={isFolderMenuOpen} cbFilterEmails={(newFilter) => updateFilter(newFilter)} />
                <Outlet context={{ emails: emails, cbUpdateEmail: updateEmail }} />
                {/* <EmailList emails={emails} cbUpdateEmail={updateEmail} /> */}
                <EmailSideBar />
            </div>

        </div>
    )
}
