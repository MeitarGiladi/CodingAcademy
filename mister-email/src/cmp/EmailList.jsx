import { useState, useEffect } from 'react';

import { EmailPreview } from "./EmailPreview"

export function EmailList({ emails, CbUpdateEmail }) {

    function dummy(ev) { console.log("clicked ! ", ev) };  //dummy
    const isSelected = false;  //dummy
    const isImportant = false;  //dummy

    return (
        <ul className="email-list">

            {emails.map((em, idx) => <li key={idx + em.id} className="email-li">

                <i className="preview-icon icon-drag" onClick={dummy}></i>
                <i className={"preview-icon " + (isSelected ? "icon-checked" : "icon-unchecked")} onClick={dummy}></i>
                <i className={"preview-icon " + (em.isStarred ? "icon-star" : "icon-unstarred")} onClick={dummy}></i>
                <i className={"preview-icon " + (isImportant ? "icon-important" : "icon-unimportant")} onClick={dummy}></i>

                <EmailPreview email={em} />

                <i className="preview-icon icon-archive" onClick={dummy}></i>
                <i className="preview-icon icon-delete" onClick={dummy}></i>
                <i className={"preview-icon " + (em.isRead ? "icon-mark-unread" : "icon-mark-read")} onClick={dummy}></i>
                <i className="preview-icon icon-snooze" onClick={dummy}></i>

            </li>
            )}

        </ul>
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
