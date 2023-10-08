import React from 'react'

export function EmailPreviewMain({ email }) {

    return (
        <React.Fragment>
            <span className="email-preview-from">
                {email.removedAt && <i className="icon-delete"></i>}
                {email.from}
            </span>
            <span className="email-preview-main">
                <span className="preview-subject">{email.subject}</span>
                <span className="preview-hyphen">&nbsp;-&nbsp;</span>
                <span className="preview-body">{email.body}</span>
            </span>
        </React.Fragment>

    )
}

