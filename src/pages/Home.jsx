import { NavLink } from "react-router-dom"

export function Home() {
    return (
        <section className="home">
            <p>Home</p>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail/inbox">Mails</NavLink>
        </section>
    )
}
