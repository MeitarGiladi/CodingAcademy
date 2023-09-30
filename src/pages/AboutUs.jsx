import { NavLink } from "react-router-dom"

export function AboutUs() {
    return (
        <section className="about-us">
            <p>About us</p>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail/inbox">Mails</NavLink>
        </section>
    )
}
