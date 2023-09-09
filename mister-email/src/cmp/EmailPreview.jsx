


export function EmailPreview({ id, subject, body, isRead, isStarred, sentAt, from, to, cbUpdateEmail }) {

    return (
        <section className="email-preview">
            <button></button>
            <p>{from} \n {to} {subject} {body}</p>
        </section>
    )
}
