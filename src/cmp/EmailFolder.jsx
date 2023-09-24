
export function EmailFolder({ folderText, isCurrFolder, iconClassName, cbChangeFolder }) {

    return (

        <section className={"email-folder" + (isCurrFolder ? " current-folder" : "")} onClick={cbChangeFolder}>
            <i className={iconClassName + (isCurrFolder ? "-filled" : "")}></i>
            <p className="email-folder-name">{folderText} {isCurrFolder && "TRUE"}</p>
        </section>

    )
}

