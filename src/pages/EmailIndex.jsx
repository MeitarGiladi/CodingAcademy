import { Outlet, useNavigate, createSearchParams, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import { emailService } from "../services/email.service";

import { EmailNavBar } from "../cmp/EmailNavBar";
import { EmailFolderMenu } from "../cmp/EmailFolderMenu";
import { EmailSideBar } from "../cmp/EmailSideBar";
import { EmailList } from "../cmp/EmailList";


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

    function addEmail() {

    }

    function delEmail() {

    }

    async function updateFilter(filterBy) {
        setCurrFilter((prevFilter) => {
            return { ...prevFilter, ...filterBy }
        });
        updateUrlFilter(filterBy);
    }

    // navigate to the URL is not enough to render the page again because the use of 'Outlet' and 'route'.
    // We will update the filter & navigate (change url)
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

    function displayEmail(email) {
        console.log("yayy: ", email);
    }

    console.log("params:", params)
    return (
        <div className="email-index">

            <EmailNavBar cbToggleIsFolderMenuOpen={toggleIsFolderMenuOpen} />

            <div className="email-index-main">
                <EmailFolderMenu currFolder={params.folderName} currLabel={currFilter.label} isFolderMenuOpen={isFolderMenuOpen} cbFilterEmails={(newFilter) => updateFilter(newFilter)} />
                <EmailList emails={emails} cbUpdateEmail={updateEmail} cbDisplayEmail={displayEmail} />
                <EmailSideBar />
            </div>

        </div>
    )
}
