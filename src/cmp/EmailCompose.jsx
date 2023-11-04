import { useState } from "react";

export function EmailCompose({ email, cbSendEmail, cbDeleteDraftEmail, cbCloseWindow }) {

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

    function toggleMinimize(ev) {
        ev.stopPropagation();
        setIsMinimize((prevIsMinimize) => !prevIsMinimize);
    }

    function toggleFullscreen(ev) {
        ev.stopPropagation();
        setIsMinimize(false);  // When the fullscreenButton clicked, the minimize affect is gone.
        setIsFullScreenMode((prevIsFullscreen) => !prevIsFullscreen);
    }

    function closeWindowWrapper(ev) {
        ev.stopPropagation();
        cbCloseWindow(email);
    }

    function deleteDraft(ev) {
        ev.stopPropagation();
        cbDeleteDraftEmail(email);
        cbCloseWindow(email);
    }

    function sendEmail(ev) {
        ev.stopPropagation();
        cbSendEmail(email);
        cbCloseWindow(email);
        console.log("sendEmail - ", ev);
    }

    return (

        <div className={"wrapper-email-compose" + (isFullScreenMode && !isMinimize ? " open-fullscreen" : "")} onClick={toggleMinimize}>
            <article className={`email-compose email-compose-open-${getStateString()}`} onClick={(ev) => ev.stopPropagation()}>
                <header className="email-compose-header" onClick={toggleMinimize}>
                    <span>New Message</span>
                    <i className={isMinimize ? "icon-maximize" : "icon-minimize"} onClick={toggleMinimize}></i>
                    <i className={isFullScreenMode ? "icon-close-fullscreen" : "icon-open-fullscreen"} onClick={toggleFullscreen}></i>
                    <i className="icon-close" onClick={closeWindowWrapper}></i>
                </header>
                <form className="email-compose-main">
                    <input className="email-compose-to" type="text" placeholder="To"></input>
                    <input className="email-compose-subject" type="text" placeholder="Subject"></input>
                    <textarea className="email-compose-body scrollable-square-white" onInput={(ev) => auto_grow(ev)}></textarea >
                    <footer className="email-compose-footer">
                        <div className="wrapper-send-mail">
                            <button className="send-email" onClick={sendEmail}>Send</button>
                        </div>
                        <i className="icon-delete-baseline" onClick={deleteDraft}></i>
                    </footer>
                </form>
            </article>
        </div>
    )
}
