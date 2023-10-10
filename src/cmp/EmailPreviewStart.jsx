

export function EmailPreviewStart({ email, cbToggleStar, cbToggleImportant }) {

    function dummy(ev) { 
        ev.stopPropagation(); 
        console.log("clicked ! ", ev.target) 
    };  //dummy
    const isSelected = false;  //dummy

    return (
        <span className="email-preview-start">
            <i className="icon-drag"></i>
            <span className="email-preview-start-icons">
                <i className={"preview-icon " + (isSelected ? "icon-checked" : "icon-unchecked")} onClick={dummy}></i>
                <i className={"preview-icon " + (email.isStarred ? "icon-star" : "icon-unstarred")} onClick={(ev) => cbToggleStar(ev, email)}></i>
                <i className={"preview-icon " + (email.isImportant ? "icon-important" : "icon-unimportant")} onClick={(ev) => cbToggleImportant(ev, email)}></i>
            </span>
        </span>
    )
}

