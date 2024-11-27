import React from "react";
import "../styles/Hero.css";
import { useAuth } from "../context";
import { Link } from "react-router-dom";

const Hero = () => {
    const { isAuthenticated } = useAuth()

    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Welcome to Our Blog</h1>
                <p>Explore insights, stories, and articles on various topics.</p>
                {!isAuthenticated &&
                    (<button className="hero-button">
                        <Link to="/register">Get Started</Link>
                    </button>)
                }
            </div>
        </section>
    );
};

export default Hero;
