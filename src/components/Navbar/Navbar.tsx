import React from "react";
import logo from "/public/assets/tmdb-logo.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import ProfileMenu from "./ProfileMenu";

const Navbar: React.FC = () => {
  const {user } = useAuth();

  console.log("prova", logo);
  return (
    <nav className="navbar">
        <Link to="/">
        
      <img className="navbar-brand" src={logo} alt="green logo from TMDB"  />
        </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
           
          {user ? (
            <ProfileMenu/>
          ) : (
            <Link to="/login" className="nav-link">
              Inicieu la sessió
            </Link>
            )
          }
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
