

export function EmailPreviewStart({ email, CbUpdateEmail}) {

    function dummy(ev) { console.log("clicked ! ", ev) };  //dummy
    const isSelected = false;  //dummy

    function toggleStar(email) {
        const updatedEmail = { ...email, isStarred: !email.isStarred };
        CbUpdateEmail(updatedEmail);
    }

    function toggleImportant(email) {
        const updatedEmail = { ...email, isImportant: !email.isImportant };
        CbUpdateEmail(updatedEmail);
    }

    return (
        <span className="email-preview-start">
            <i className="icon-drag"></i>
            <span className="email-preview-start-icons">
                <i className={"preview-icon " + (isSelected ? "icon-checked" : "icon-unchecked")} onClick={dummy}></i>
                <i className={"preview-icon " + (email.isStarred ? "icon-star" : "icon-unstarred")} onClick={() => toggleStar(email)}></i>
                <i className={"preview-icon " + (email.isImportant ? "icon-important" : "icon-unimportant")} onClick={() => toggleImportant(email)}></i>
            </span>
        </span>
    )
}

