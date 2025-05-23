import React from "react";
import logo from "/public/assets/tmdb-logo.svg";

const Navbar:React.FC = () => {
    console.log("prova", logo)
    return (
        <nav className="navbar">
            <img className="navbar-brand" src={logo} alt="green logo from TMDB"/>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#">Inicieu la sessió</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
