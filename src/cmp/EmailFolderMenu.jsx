import { useState, useEffect } from 'react';

import { emailService } from '../services/email.service.js'

import { EmailFolder } from "./EmailFolder";


export function EmailFolderMenu({ currFolder, isFolderMenuOpen, cbFilterEmails }) {
    const [folders, setFolders] = useState([]);
    const [labelFolders, setLabelFolders] = useState([]);

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

    function changeFolder(folderName, isLabel = false) {
        if (isLabel) {
            cbFilterEmails({ folder: "label", label: folderName })
        } else {
            cbFilterEmails({ folder: folderName, label: '' })
        }
    }


    // Warning - The label name might be equal to a folder name.
    return (
        <section className={"email-menu" + (isFolderMenuOpen ? " folder-menu-open" : "")}>
            <i className="icon-mail-compose"></i>

            <div className="email-menu-scrollable">
                <div className="email-menu-folders">
                    {
                        folders.map((folder, idx) =>
                            <EmailFolder key={idx + folder.name}
                                folderText={folder.text}
                                isCurrFolder={folder.name === currFolder ? true : false}
                                iconClassName={folder.iconClass}
                                cbChangeFolder={() => changeFolder(folder.name)} />
                        )
                    }
                </div>
                <div className="email-menu-labels">
                    <br /><h2>labels: </h2>
                    {
                        labelFolders.map((label, idx) =>
                            <EmailFolder key={idx + label}
                                folderText={label}
                                isCurrFolder={(label) === currFolder ? true : false}
                                iconClassName="icon-folder-label"
                                cbChangeFolder={() => changeFolder(label, true)} />
                        )
                    }
                </div>
            </div>

        </section>
    )
}
