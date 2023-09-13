
export function EmailPreviewMain({ email }) {

    return (
        <section className="email-preview-main">
            <span className="preview-from">{email.from}</span>
            <span className="preview-subject-n-body">
                <span className="preview-subject">{email.subject}</span>
                <span className="preview-body">{email.body}</span>
            </span>
        </section>
    )
}

