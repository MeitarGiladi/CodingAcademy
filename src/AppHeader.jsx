import { NavLink } from "react-router-dom"


export function AppHeader() {

    return (
            <section className='app-header'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mails</NavLink>
            </section>
    )
}


