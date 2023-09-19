import { useState, useEffect } from 'react';

import { EmailPreviewMain } from "./EmailPreviewMain"
import { EmailPreviewStart } from "./EmailPreviewStart"
import { EmailPreviewEnd } from "./EmailPreviewEnd"

export function EmailList({ emails, CbUpdateEmail }) {

    return (
        <section className="email-list">

            <header className="email-list-header">
                <i className="email-list-header-icon icon-unchecked"></i>
            </header>

            <ul className="email-list-main">

                {emails.map((em, idx) =>
                    <li key={idx + em.id} className={"email-item" + (em.isRead ? " read-email" : "")}>
                        <EmailPreviewStart email={em} CbUpdateEmail={CbUpdateEmail} />
                        <EmailPreviewMain email={em} />
                        <EmailPreviewEnd email={em} CbUpdateEmail={CbUpdateEmail} />
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

// opacity - 0.32 / 1 (gray when not hovering)

// 6 dots - https://www.gstatic.com/images/icons/material/system_gm/1x/drag_indicator_white_20dp.png

// checked box - https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/check_box_white_20dp.png
// unchecked box - https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/check_box_outline_blank_white_20dp.png

// star - https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_white_20dp.png
// star clicked - 	https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_fill_googyellow500_20dp.png

// important - https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/label_important_white_20dp.png
// important filled - https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/label_important_fill_googyellow500_20dp.png

// archive - https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/archive_white_20dp.png
// trash - https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/delete_white_20dp.png
// mark as read - https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/drafts_white_20dp.png
// mark as unread - https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/mail_white_20dp.png
// snooze - https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/schedule_white_20dp.png
