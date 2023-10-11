
export function EmailComposeOpen() {

    return (

        <article className="email-compose-open">
            <header className="email-compose-open-header">
                <span>New Message</span>
                <i className="icon-maximize"></i>
                <i className="icon-open-fullscreen"></i>
                <i className="icon-close"></i>
            </header>
            <form className="email-compose-open-main">
                <div className="email-compose-to"></div>
                <div className="email-compose-subject"></div>
                <div className="email-compose-body"></div>
                <footer className="email-compose-footer">
                    <button className="send-email">Send</button>
                    <i className="icon-delete-baseline"></i>
                </footer>
            </form>
        </article>

    )
}
