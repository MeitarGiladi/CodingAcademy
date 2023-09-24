
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";

import { EmailPreviewMain } from "./EmailPreviewMain"
import { EmailPreviewStart } from "./EmailPreviewStart"
import { EmailPreviewEnd } from "./EmailPreviewEnd"

export function EmailList() {

    const {emails, cbUpdateEmail} = useOutletContext();

    return (
        <section className="email-list">

            <header className="email-list-header">
                <i className="email-list-header-icon icon-unchecked"></i>
            </header>

            <ul className="email-list-main">

                {emails.map((em, idx) =>
                    <li key={idx + em.id} className={"email-item" + (em.isRead === 1 ? " read-email" : "")} onClick={() => console.log("yayyyy")}>
                        <EmailPreviewStart email={em} cbUpdateEmail={cbUpdateEmail} />
                        <EmailPreviewMain email={em} />
                        <EmailPreviewEnd email={em} cbUpdateEmail={cbUpdateEmail} />
                    </li>
                )}

            </ul>

            <footer className="email-list-footer">
                <p>list-footer</p>
            </footer>

        </section>

    )
}


// https://stackoverflow.com/questions/2385113/howto-div-with-onclick-inside-another-div-with-onclick-javascript
// window.event.stopPropagation();

// Why am I using <i> tag for ICONs?
// https://stackoverflow.com/questions/11135261/what-are-the-advantages-disadvantages-of-using-the-i-tag-for-icons-instead-of
