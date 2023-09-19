
export function EmailSideBar() {

    return (
        <section className="email-side-bar">
            <div>
                <i className="icon-google-calender" onClick={() => window.open("https://calendar.google.com/")}></i>
                <i className="icon-google-keep" onClick={() => window.open("https://keep.google.com/")}></i>
                <i className="icon-google-tasks" onClick={() => window.open("https://calendar.google.com/calendar/u/0/r?opentasks=1")}></i>
                <i className="icon-google-contacts" onClick={() => window.open("https://contacts.google.com/")}></i>
                <span className="horizontal-line"></span>
                <i className="icon-add-white" onClick={() => window.open("https://workspace.google.com/u/0/marketplace/appfinder")}></i>
            </div>

            <svg className="svg-image svg-icon-smaller-than" viewBox="0 0 24 24">
                <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path>
            </svg>
        </section>
    )
}
