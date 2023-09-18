import { useState, useEffect } from 'react';

import { emailService } from '../services/email.service.js'

import { EmailFolder } from "./EmailFolder";


export function EmailFolderMenu({ folders, cbFilterEmails }) {
    const [allFolders, setAllFolders] = useState([]);
    const [currFolder, setCurrFolder] = useState("inbox");

    useEffect(() => {
        getFolders();
    }, [])

    async function getFolders() {
        const folders = await emailService.getFolders();
        setAllFolders(folders);
    }


    function changeFolder(folderName, folderFilter) {
        setCurrFolder(() => folderName);
        cbFilterEmails(folderFilter);
    }

    return (
        <section className="email-menu">
            <i className="icon-mail-compose"></i>
            {
                allFolders.map((folder, idx) =>
                    <EmailFolder key={idx + folder.name}
                        folderName={folder.name}
                        isCurrFolder={folder.name === currFolder ? true : false}
                        cbChangeFolder={() => changeFolder(folder.name, folder.filter)} />
                )
            }
        </section>
    )
}
