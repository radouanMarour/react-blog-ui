import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import "../styles/DesktopHeader.css";
import { useAuth } from "../context";

const DesktopHeader = () => {
    const { isAuthenticated, logout } = useAuth()
    return (
        <header className="desktop-header">
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="logo-image" />
                </Link>
            </div>
            <nav className="nav-links">
                <Link to="/">Home</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/blog/new">Create a Post</Link>
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
        </header>
    );
};

export default DesktopHeader;
