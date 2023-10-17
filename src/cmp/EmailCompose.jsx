import { useState } from "react";

export function EmailCompose() {

    const [isFullScreenMode, setIsFullScreenMode] = useState(false);
    const [isMinimize, setIsMinimize] = useState(false);

    function getStateString() {
        if (isMinimize)
            return "minimize";
        else if (isFullScreenMode)
            return "fullscreen";
        return "small";
    }

    function auto_grow(ev) {
        if (ev.target.closest(".email-compose-open-small") &&
            ev.target.scrollHeight <= 638) {
            ev.target.style.height = (ev.target.scrollHeight) + "px";
        }
        console.log(ev.target.offsetHeight);
        console.log(ev.target.closest(".email-compose-open-small"));
    }

    return (

        <div className={"wrapper-email-compose" + (isFullScreenMode && !isMinimize ? " open-fullscreen" : "")}>
            <article className={`email-compose email-compose-open-${getStateString()}`}>
                <header className="email-compose-header">
                    <span>New Message</span>
                    <i className={isMinimize ? "icon-maximize" : "icon-minimize"}></i>
                    <i className={isFullScreenMode ? "icon-close-fullscreen" : "icon-open-fullscreen"}></i>
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
