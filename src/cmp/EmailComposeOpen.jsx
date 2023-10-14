
export function EmailComposeOpen() {

    function auto_grow(ev) {
        // ev.target.style.height = 'auto';
        if (ev.target.scrollHeight <= 638) {
            ev.target.style.height = (ev.target.scrollHeight) + "px";
            // ev.target.style.height = "1000px";
        }
        console.log(ev.target.offsetHeight);
    }

    return (

        <article className="email-compose-open email-compose-open-small">
            {/* <article className="email-compose-open email-compose-open-fullscreen"> */}
            <header className="email-compose-open-header">
                <span>New Message</span>
                <i className="icon-maximize"></i>
                <i className="icon-open-fullscreen"></i>
                <i className="icon-close"></i>
            </header>
            <form className="email-compose-open-main">
                <input className="email-compose-to" type="text" placeholder="To"></input>
                <input className="email-compose-subject" type="text" placeholder="Subject"></input>
                <textarea className="email-compose-body scrollable-square-white" onInput={(ev) => auto_grow(ev)}></textarea >
                <footer className="email-compose-footer">
                    <div className="wrapper-send-mail">
                        <button className="send-email">Send</button>
                    </div>
                    <i className="icon-delete-baseline"></i>
                </footer>
            </form>
        </article>

    )
}
