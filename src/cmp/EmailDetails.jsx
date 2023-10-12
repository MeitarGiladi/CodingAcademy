import { utilService } from "../services/util.service"


export function EmailDetails({ email, cbToggleStar, cbToggleImportant, cbReplyEmail }) {

    function dummy(ev) { 
        ev.stopPropagation(); 
        console.log("clicked ! ", ev.target) 
    };  //dummy

    if (!email) {
        return (
            <p style={{position: "relative", top: "30px", left: "20px"}}>Loading email...</p>
        )
    }
    
    return (

        <div className="email-details">
            <header className="email-details-header">
                <i className="icon-delete"></i>
                <i className="icon-delete"></i>
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
                        <i className="email-detail-icon icon-email-reply" onClick={(ev) => dummy(ev)}></i>
                    </div>
                    <p className="email-details-body">{email.body}</p>
                    <footer className="email-details-footer">
                        <button className="footer-reply">
                            <i className="icon-email-reply" onClick={(ev) => dummy(ev)}></i>
                            Reply
                        </button>
                        <button className="footer-forward">
                            <i className="icon-email-forward" onClick={(ev) => dummy(ev)}></i>
                            Forward
                        </button>
                    </footer>
                </div>
            </div>
        </div>

    )
}
