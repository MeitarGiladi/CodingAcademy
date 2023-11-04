import { NavLink } from "react-router-dom"

export function AboutUs() {
    return (
        <div className="one-element-page-parent">
            <section className="about-us one-element-page-child">
                <p>
                    Hey there !<br />
                    This project is part of a CodingAcademy's professional course.<br />
                    Front-end essentials & React have been used to create this Gmail-Copy.<br />
                </p>
                <p>
                    Meitar Giladi<br />
                    linkedin.com/in/meitargiladi/<br />
                    github.com/meitargila
                </p>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/mail/inbox">Mails</NavLink>
                </nav>
            </section>
        </div>
    )
}
