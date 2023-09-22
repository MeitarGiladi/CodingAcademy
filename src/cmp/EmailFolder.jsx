
export function EmailFolder({ folderName, isCurrFolder, iconClassName, cbChangeFolder }) {

    return (

        <section className={"email-folder" + (isCurrFolder ? " current-folder" : "")} onClick={cbChangeFolder}>
            <i className={iconClassName + (isCurrFolder ? "-filled" : "")}></i>
            <p>{folderName} {isCurrFolder && "TRUE"}</p>
        </section>

    )
}

