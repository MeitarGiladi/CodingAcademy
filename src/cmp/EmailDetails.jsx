
export function EmailDetails({ email, cbToggleStar, cbToggleImportant, cbReplyEmail }) {

    function dummy(ev) { 
        ev.stopPropagation(); 
        console.log("clicked ! ", ev.target) 
    };  //dummy
    
    return (

        <div className="email-details">
            <header className="email-details-header">
                <i className="icon-delete"></i>
                <i className="icon-delete"></i>
            </header>

            <div className="email-details-scrollable scrollable-big">
                <div className="email-details-main">
                    <div className="email-details-subject">
                        {email.subject}
                        <i className={"email-detail-icon " + (email.isImportant ? "icon-important" : "icon-unimportant-black")} onClick={(ev) => cbToggleImportant(ev, email)}></i>
                    </div>
                    <div className="email-details-from">
                        <i className="icon-profile-mask"></i>
                        {email.from}
                        <i className={"email-detail-icon " + (email.isStarred ? "icon-star" : "icon-unstarred-black")} onClick={(ev) => cbToggleStar(ev, email)}></i>
                        <i className="email-detail-icon icon-email-reply" onClick={(ev) => dummy(ev)}></i>
                    </div>
                    <p className="email-details-body">{email.body}</p>
                    <footer className="email-details-footer">
                        <div className="footer-reply">
                            <i className="email-detail-icon icon-email-reply" onClick={(ev) => dummy(ev)}></i>
                            Reply
                        </div>
                        <div className="footer-forward">
                            <i className="email-detail-icon icon-email-forward" onClick={(ev) => dummy(ev)}></i>
                            Forward
                        </div>
                    </footer>
                </div>
            </div>
        </div>

    )
}
