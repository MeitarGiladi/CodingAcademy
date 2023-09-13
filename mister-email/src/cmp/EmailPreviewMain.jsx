import React from 'react'

export function EmailPreviewMain({ email }) {

    return (
        <React.Fragment>
            <span className="email-preview-from">{email.from}</span>
            <span className="email-preview-main">
                <span className="preview-subject">{email.subject}</span>
                <span>&nbsp;-&nbsp;</span>
                <span className="preview-body">{email.body}</span>
            </span>
        </React.Fragment>

    )
}

