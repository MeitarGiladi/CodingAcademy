import { NavLink } from "react-router-dom"
import { useState } from 'react';

import { emailService } from "../services/email.service";




export function Home() {

    const [username, setUsername] = useState("");


    return (
        <div className="one-element-page-parent">
            <section className="home one-element-page-child">
                <h1>
                    <img className="gmail-logo-w" src="./imgs/Gmail_logo_W.png" alt="W" />
                    elcome to
                    <img className="gmail-logo-text" src="./imgs/Gmail_logo_text.png" alt="Gmail" />
                </h1>
                <div className="selected-user-wrapper">
                    Email:&nbsp;&nbsp;
                    <input className="selected-user" type="text" name="loggedInUser" placeholder={"user1@gmail.com"} onChange={(ev) => setUsername(ev.target.value)} />
                    <br />&nbsp;&nbsp;
                    <button className="login-button" onClick={() => emailService.changeUser(username)}>Login</button>
                </div>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/mail/inbox">Mails</NavLink>
                </nav>
            </section>
        </div>
    )
}
