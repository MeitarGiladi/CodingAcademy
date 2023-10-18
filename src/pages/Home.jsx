import { NavLink } from "react-router-dom"

export function Home() {
    return (
        <div className="one-element-page-parent">
            <section className="home one-element-page-child">

                <h1>
                    <img className="gmail-logo-w" src="./imgs/Gmail_logo_W.png" alt="W" />
                    elcome to
                    <img className="gmail-logo-text" src="./imgs/Gmail_logo_text.png" alt="Gmail" />
                </h1>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/mail/inbox">Mails</NavLink>
                </nav>
            </section>
        </div>
    )
}
