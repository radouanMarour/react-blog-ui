import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import "../styles/MobileHeader.css";
import { useAuth } from "../context";

const MobileHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth()

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="mobile-header">
            <div className="mobile-header-top">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="logo-image" />
                    </Link>
                </div>
                <button className="menu-toggle" onClick={toggleMenu}>
                    ☰
                </button>
            </div>

            {menuOpen && (
                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/blog/new">New Blog</Link>
                            <Link to="/profile">Profile</Link>
                            <button onClick={logout} className="logout-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
};

export default MobileHeader;
