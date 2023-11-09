import { useState, useEffect, useRef } from "react"

export function EmailCompose({ email, cbSendEmail, cbSaveDraft, cbDeleteDraftEmail, cbCloseWindow }) {

    const [isFullScreenMode, setIsFullScreenMode] = useState(false)
    const [isMinimize, setIsMinimize] = useState(false)

    const [updatedValues, setUpdatedValues] = useState({})

    const intervalIdRef = useRef()

    // useEffect(() => {
    //     intervalIdRef.current = setInterval(() => {
    //         saveUpdatedDraft()
    //     }, 5000)
    //     return () => {
    //         clearInterval(intervalIdRef.current)
    //     }
    // }, [])

    // function saveUpdatedDraft() {
    //     // It doesn't contain the updated value
    //     // Why doesn't it work the same way as here- 
    //     // https://www.w3schools.com/react/react_forms.asp
    //     const updatedDraftEmail = { ...email, ...updatedValues }
    //     console.log("Saved draft - ", updatedDraftEmail, updatedValues)
    //     cbSaveDraft(updatedDraftEmail)
    // }

    useEffect(() => {
        intervalIdRef.current = setTimeout(() => {
            const updatedDraftEmail = { ...email, ...updatedValues }
            console.log("Saved draft - ", updatedDraftEmail, updatedValues)
            cbSaveDraft(updatedDraftEmail)
        }, 5000)
        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [updatedValues])


    function handleChange(ev) {
        const name = ev.target.name
        const value = ev.target.value
        setUpdatedValues((values) => ({ ...values, [name]: value }))
    }

    function getStateString() {
        if (isMinimize)
            return "minimize"
        else if (isFullScreenMode)
            return "fullscreen"
        return "small"
    }

    function auto_grow(ev) {
        if (ev.target.closest(".email-compose-open-small") &&
            ev.target.scrollHeight <= 638) {
            ev.target.style.height = (ev.target.scrollHeight) + "px"
        }
        // console.log(ev.target.offsetHeight)
        // console.log(ev.target.closest(".email-compose-open-small"))
    }

    function toggleMinimize(ev) {
        ev.stopPropagation()
        setIsMinimize((prevIsMinimize) => !prevIsMinimize)
    }

    function toggleFullscreen(ev) {
        ev.stopPropagation()
        setIsMinimize(false)  // When the fullscreenButton clicked, the minimize affect is gone.
        setIsFullScreenMode((prevIsFullscreen) => !prevIsFullscreen)
    }

    function closeWindowWrapper(ev) {
        ev.stopPropagation()
        cbCloseWindow(email)
    }

    function deleteDraft(ev) {
        ev.stopPropagation()
        cbDeleteDraftEmail(email)
        cbCloseWindow(email)
    }

    function sendEmail(ev) {
        ev.stopPropagation()
        const updatedDraftEmail = { ...email, ...updatedValues }
        if (!cbSendEmail(updatedDraftEmail)) {
            console.log("Subject and recipient required.")  // TODO - popup message
            return
        }
        cbCloseWindow(updatedDraftEmail)
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
                    <input className="email-compose-to" type="text" name="to" placeholder="To" defaultValue={email.to} onChange={handleChange}></input>
                    <input className="email-compose-subject" type="text" name="subject" placeholder="Subject" defaultValue={email.subject} onChange={handleChange}></input>
                    <textarea className="email-compose-body scrollable-square-white" name="body" defaultValue={email.body} onChange={handleChange} onInput={(ev) => auto_grow(ev)}></textarea >
                    <footer className="email-compose-footer">
                        <div className="wrapper-send-mail">
                            <button className="send-email" type="button" onClick={sendEmail}>Send</button>
                        </div>
                        <i className="icon-delete-baseline" onClick={deleteDraft}></i>
                    </footer>
                </form>
            </article>
        </div>
    )
}
