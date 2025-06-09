import React from "react";
import logo from "/public/assets/tmdb-logo.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import ProfileMenu from "./ProfileMenu";

type NavbarProps = {
  isScaryMode: boolean;
  onToggleScaryMode: () => void;
};


const Navbar: React.FC<NavbarProps> = ({ isScaryMode, onToggleScaryMode }) => {
  const { user } = useAuth();

  return (
 <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="TMDB Logo" />
      </Link>

      <div className="navbar-controls">
        {user && (
          <button 
            className={`scary-mode-button ${isScaryMode ? 'active' : ''}`}
            onClick={onToggleScaryMode}
          >
            {isScaryMode ? "😱 Normal Mode" : "🎃 Scary Mode"}
          </button>
        )}
        
        {user ? (
          <ProfileMenu />
        ) : (
          <Link to="/login" className="nav-link">
            Iniciar sessió
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
