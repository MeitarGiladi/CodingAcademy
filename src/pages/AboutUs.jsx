import { NavLink } from "react-router-dom"

export function AboutUs() {
    return (
        <div className="one-element-page-parent">
            <section className="about-us one-element-page-child">
                <h1>About Us</h1>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/mail/inbox">Mails</NavLink>
                </nav>
            </section>
        </div>
    )
}
