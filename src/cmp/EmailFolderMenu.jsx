import { useState, useEffect } from 'react';

import { emailService } from '../services/email.service.js'

import { EmailFolder } from "./EmailFolder";


export function EmailFolderMenu({ cbFilterEmails }) {
    const [folders, setFolders] = useState([]);
    const [labelFolders, setLabelFolders] = useState([]);
    const [currFolder, setCurrFolder] = useState("inbox");

    useEffect(() => {
        getFolders()
        getLabelFolders();
    }, [])

    async function getFolders() {
        const updatedFolders = await emailService.getFolders();
        setFolders(updatedFolders);
    }

    async function getLabelFolders() {
        const updatedLabels = await emailService.getLabelFolders();
        setLabelFolders(updatedLabels);
    }


    function changeFolder(folderName, folderFilter) {
        setCurrFolder(() => folderName);
        cbFilterEmails(folderFilter);
    }

    // Warning - The label name might be equal to a folder name.
    return (
        <section className="email-menu">
            <i className="icon-mail-compose"></i>

            {
                folders.map((folder, idx) =>
                    <EmailFolder key={idx + folder.name}
                        folderName={folder.name}
                        isCurrFolder={folder.name === currFolder ? true : false}
                        iconClassName={folder.iconClass}
                        cbChangeFolder={() => changeFolder(folder.name, folder.filter)} />
                )
            }

            <br /><h2>labels: </h2>
            {
                labelFolders.map((label, idx) =>
                    <EmailFolder key={idx + label}
                        folderName={label}
                        isCurrFolder={(label) === currFolder ? true : false}
                        iconClassName="icon-label-folder"
                        cbChangeFolder={() => changeFolder(label, { status: "label", label: label })} />
                )
            }
        </section>
    )
}
