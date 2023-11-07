import { utilService } from "../services/util.service"
import { emailService } from "../services/email.service"


export function EmailDetails({ email, cbToggleStar, cbToggleImportant, cbComposeEmail, cbGoBack }) {

    function dummy() {
        console.log("dummy")
    }
    
    function replayEmail(ev, isForward = false) {
        ev.stopPropagation();
        const newEmail = {
            from: emailService.getCurruser(),
            subject: "RE:" + email.subject,
            body: "\n\n------------------------------------------------------------\n" +
                email.from + "\n" +
                utilService.getTimeOfEmailDetailed(email.sentAt) + "\n\n" +
                email.body
        };
        if (!isForward) newEmail.to = email.from;
        cbComposeEmail(newEmail);
    }


    if (!email) {
        return (
            <p style={{ position: "relative", top: "30px", left: "20px" }}>Loading email...</p>
        )
    }

    return (

        <div className="email-details">
            <header className="email-details-header">
                <div className="icon-wrapper">
                    <i className="icon-go-back" onClick={(ev) => cbGoBack()}></i>
                </div>
                <div className="icon-wrapper">
                    <i className="icon-delete" onClick={(ev) => cbGoBack(email, "delete")}></i>
                </div>
                <div className="icon-wrapper">
                    <i className="icon-mark-unread" onClick={(ev) => cbGoBack(email, "unread")}></i>
                </div>
                <div className="icon-wrapper">
                    <i className="icon-labels" onClick={dummy}></i>
                </div>
            </header>

            <div className="email-details-scrollable scrollable-square-black">
                <div className="email-details-main">
                    <div className="email-details-subject">
                        {email.subject}
                        <i className={"email-detail-icon " + (email.isImportant ? "icon-important" : "icon-unimportant-black")} onClick={(ev) => cbToggleImportant(ev, email)}></i>
                    </div>
                    <div className="email-details-from">
                        <i className="icon-profile-mask"></i>
                        <span className="from-label">{email.from}</span>
                        <span className="email-from-time">{utilService.getTimeOfEmailDetailed(email.sentAt)}</span>
                        <i className={"email-detail-icon " + (email.isStarred ? "icon-star" : "icon-unstarred-black")} onClick={(ev) => cbToggleStar(ev, email)}></i>
                        <i className="email-detail-icon icon-email-reply" onClick={(ev) => replayEmail(ev)}></i>
                    </div>
                    <p className="email-details-body">{email.body}</p>
                    <footer className="email-details-footer">
                        <button className="footer-reply" onClick={(ev) => replayEmail(ev)}>
                            <i className="icon-email-reply"></i>
                            Reply
                        </button>
                        <button className="footer-forward" onClick={(ev) => replayEmail(ev, true)}>
                            <i className="icon-email-forward"></i>
                            Forward
                        </button>
                    </footer>
                </div>
            </div>
        </div>

    )
}
