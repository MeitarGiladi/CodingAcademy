

export function EmailPreviewStart({ email, cbUpdateEmail}) {

    function dummy(ev) { 
        ev.stopPropagation(); 
        console.log("clicked ! ", ev.target) 
    };  //dummy
    const isSelected = false;  //dummy

    function toggleStar(ev, email) {
        ev.stopPropagation(); 
        const updatedEmail = { ...email, isStarred: !email.isStarred };
        cbUpdateEmail(updatedEmail);
    }

    function toggleImportant(ev, email) {
        ev.stopPropagation(); 
        const updatedEmail = { ...email, isImportant: !email.isImportant };
        cbUpdateEmail(updatedEmail);
    }

    return (
        <span className="email-preview-start">
            <i className="icon-drag"></i>
            <span className="email-preview-start-icons">
                <i className={"preview-icon " + (isSelected ? "icon-checked" : "icon-unchecked")} onClick={dummy}></i>
                <i className={"preview-icon " + (email.isStarred ? "icon-star" : "icon-unstarred")} onClick={(ev) => toggleStar(ev, email)}></i>
                <i className={"preview-icon " + (email.isImportant ? "icon-important" : "icon-unimportant")} onClick={(ev) => toggleImportant(ev, email)}></i>
            </span>
        </span>
    )
}

