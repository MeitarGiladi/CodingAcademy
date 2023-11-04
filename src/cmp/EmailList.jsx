
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";

import { EmailPreviewMain } from "./EmailPreviewMain"
import { EmailPreviewStart } from "./EmailPreviewStart"
import { EmailPreviewEnd } from "./EmailPreviewEnd"

export function EmailList({ emails, cbToggleRead, cbToggleStar, cbToggleImportant, cpDeleteEmail, cbDisplayEmail }) {

    const readEmailsCount = Object.keys(emails.filter((em) => em.isRead === 1)).length;
    const emailsCount = Object.keys(emails).length;

    return (

        <div className="email-list">
            <header className="email-list-header">
                <i className="email-list-header-icon icon-unchecked"></i>
            </header>

            <div className="email-list-scrollable scrollable-square-black">
                <ul className="email-list-main">

                    {emails.map((em) =>
                        <li key={em.id} className={"email-item" + (em.isRead === 1 ? " read-email" : "")} onClick={() => cbDisplayEmail(em)}>
                            <EmailPreviewStart email={em} cbToggleStar={cbToggleStar} cbToggleImportant={cbToggleImportant} />
                            <EmailPreviewMain email={em} />
                            <EmailPreviewEnd email={em} cbToggleRead={cbToggleRead} cpDeleteEmail={cpDeleteEmail} />
                        </li>
                    )}

                </ul>

                <footer className="email-list-footer">
                    <div>
                        <div className="email-read-bar">
                            <div className="email-read-bar-fill" style={{width : String(readEmailsCount / emailsCount * 100) + '%'}}></div>
                        </div>
                        <p>{readEmailsCount} read out of {emailsCount}</p>
                    </div>
                    <nav className="email-list-footer-nav">
                        <a onClick={() => window.open("https://www.google.com/intl/en-GB/policies/terms/")}>Terms</a>
                        <span> · </span>
                        <a onClick={() => window.open("https://www.google.com/intl/en-GB/policies/privacy/")}>Privacy</a>
                        <span> · </span>
                        <a onClick={() => window.open("https://www.google.com/gmail/about/policy/")}>Programme Policies</a>
                    </nav>
                    <div>
                        <span>Last account activity: </span>
                        <span>2 minutes ago</span>
                    </div>
                </footer>
            </div>
        </div>

    )
}


// https://stackoverflow.com/questions/2385113/howto-div-with-onclick-inside-another-div-with-onclick-javascript
// window.event.stopPropagation();

// Why am I using <i> tag for ICONs?
// https://stackoverflow.com/questions/11135261/what-are-the-advantages-disadvantages-of-using-the-i-tag-for-icons-instead-of
