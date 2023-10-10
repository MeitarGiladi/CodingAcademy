import { EmailPreviewEndTime } from "./EmailPreviewEndTime"

export function EmailPreviewEnd({ email, cbToggleRead, cpDeleteEmail }) {

    function dummy(ev) { 
        ev.stopPropagation(); 
        console.log("clicked ! ", ev.target) 
    };  //dummy

    function deleteEmail(ev, email) {
        ev.stopPropagation();
        cpDeleteEmail(email);
    }


    return (
        <span className="email-preview-end">
            <EmailPreviewEndTime sentAt={email.sentAt} />
            <span className="email-preview-end-icons">
                {/* <i className="preview-icon icon-archive" onClick={dummy}></i> */}
                <i className="preview-icon icon-delete" onClick={(ev) => deleteEmail(ev, email)}></i>
                <i className={"preview-icon " + (email.isRead === 1 ? "icon-mark-unread" : "icon-mark-read")} onClick={(ev) => cbToggleRead(ev, email)}></i>
                {/* <i className="preview-icon icon-snooze" onClick={dummy}></i> */}
            </span>
        </span>
    )
}

