import { useState } from "react";

export function EmailCompose() {

    const [composeWindowState, setComposeWindowState] = useState("small");
    // const [composeWindowState, setComposeWindowState] = useState("minimize");
    // const [composeWindowState, setComposeWindowState] = useState("fullscreen");

    function auto_grow(ev) {
        if (ev.target.closest(".email-compose-open-small") &&
            ev.target.scrollHeight <= 638) {
            ev.target.style.height = (ev.target.scrollHeight) + "px";
        }
        console.log(ev.target.offsetHeight);
        console.log(ev.target.closest(".email-compose-open-small"));
    }

    return (

        <div className={"wrapper-email-compose" + (composeWindowState === "fullscreen" ? " open-fullscreen" : "")}>
            <article className={`email-compose email-compose-open-${composeWindowState}`}>
                <header className="email-compose-header">
                    <span>New Message</span>
                    <i className={composeWindowState === "minimize" ? "icon-maximize" : "icon-minimize"}></i>
                    <i className={composeWindowState !== "fullscreen" ? "icon-open-fullscreen" : "icon-close-fullscreen"}></i>
                    <i className="icon-close"></i>
                </header>
                <form className="email-compose-main">
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
        </div>
    )
}
