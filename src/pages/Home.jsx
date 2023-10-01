import { NavLink } from "react-router-dom"

export function Home() {
    return (
        <div className="home">
            <section className="home-main">
                <h1>Home</h1>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/mail/inbox">Mails</NavLink>
                </nav>
            </section>
        </div>
    )
}
