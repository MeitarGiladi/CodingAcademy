
import { EmailCompose } from "./EmailCompose";

export function EmailComposeList(composedEmails, cbSendEmail, cbDeleteDraftEmail) {

    return (
        
        <div className="email-compose-list">
            {/* <EmailComposeMinimize /> */}
            <EmailCompose />
        </div>

    )
}
