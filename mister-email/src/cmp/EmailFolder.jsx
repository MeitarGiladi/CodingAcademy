
export function EmailFolder({ folderName, isCurrFolder, cbChangeFolder }) {

    return (

        <section className="email-folder" onClick={cbChangeFolder}>
            <p>{folderName} {isCurrFolder}</p>
        </section>

    )
}
