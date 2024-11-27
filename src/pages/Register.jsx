import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from '../api';
import { useAuth } from "../context";
import '../styles/Register.css'

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any existing error messages

        try {
            const response = await API.post('/auth/register', { ...formData })

            if (response.statusText === "OK") {
                navigate("/login"); // Redirect to the homepage
            } else {
                throw new Error("Registration failed.");
            }
        } catch (err) {
            setError(err.message || "Something went wrong.");
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="register-btn">
                    Register
                </button>
            </form>
            <p className="login-link">
                Already have an account? <Link to="/login">Login here</Link>.
            </p>
        </div>
    );
};

export default Register;
