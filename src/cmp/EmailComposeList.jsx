
import { EmailCompose } from "./EmailCompose";

export function EmailComposeList({ composedEmails, cbSendEmail, cbDeleteDraftEmail, cbCloseWindow }) {

    return (

        <div className="email-compose-list">
            {composedEmails.map((em) =>
                <EmailCompose
                    key={em.id}
                    email={em}
                    cbSendEmail={cbSendEmail}
                    cbDeleteDraftEmail={cbDeleteDraftEmail}
                    cbCloseWindow={cbCloseWindow} />
            )}
        </div>

    )
}
