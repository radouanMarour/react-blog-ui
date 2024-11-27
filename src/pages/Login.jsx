import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, useToast } from "../context";
import '../styles/Login.css'
import API from "../api";

const Login = () => {
    const { login } = useAuth(); // To log in the user
    const [formData, setFormData] = useState({ email: "", password: "" });
    // const [error, setError] = useState("");
    const { notifySuccess, notifyError } = useToast()
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setError(""); // Clear any previous error

        try {
            const response = await API.post('/auth/login', { ...formData })
            const { token } = response.data.data
            login(token); // Log in the user
            navigate("/"); // Redirect to homepage
            notifySuccess(response.data.message)
        } catch (err) {
            // setError(err.message || "Something went wrong.");
            notifyError(err.response.data.message)
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
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
                {/* {error && <p className="error-message">{error}</p>} */}
                <button type="submit" className="login-btn">
                    Login
                </button>
            </form>
            <p className="register-link">
                Don't have an account? <Link to="/register">Register here</Link>.
            </p>
        </div>
    );
};

export default Login;
