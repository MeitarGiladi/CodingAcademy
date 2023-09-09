import { NavLink } from "react-router-dom"

export function Home() {
    return (
        <section className="home">
            <NavLink to="/mail">Emails</NavLink>
        </section>
    )
}
