import React, { useState, useEffect } from "react";
import "../styles/ProfilePage.css";
import { useAuth, useToast } from "../context";
import API from "../api";
import avatar from '../assets/avatar.png'

const ProfilePage = () => {
    const { token } = useAuth(); // User profile data
    const { notifyError, notifySuccess } = useToast()
    const [user, setUser] = useState(null)
    const [editing, setEditing] = useState(false); // Editing mode
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        bio: "",
        profileImage: ""
    });

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await API.get("/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data.data);
                setFormData({
                    name: response.data.data.name,
                    email: response.data.data.email,
                    bio: response.data.data.bio,
                    profileImage: response.data.data.profileImage,
                });
            } catch (err) {
                notifyError(err.response.data.message)
            }
        };

        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleImageUpdate = async (e) => {
        const file = e.target.files[0]

        const formData = new FormData()
        formData.append("profileImage", file)
        try {
            const response = await API.put(
                "/auth/profile/image",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            setUser(response.data.data);
            notifySuccess(response.data.message)
        } catch (err) {
            notifyError(err.response.data.message)
        }
    };

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            const response = await API.put(
                "/auth/profile",
                { name: formData.name, email: formData.email, bio: formData.bio, profileImage: FormData.profileImage },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUser(response.data.data);
            setEditing(false);
            notifySuccess(response.data.message)
        } catch (err) {
            notifyError(err.response.data.message)
        }
    };

    if (!user) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="profile-page">
            {/* <h1>Profile</h1> */}
            <div className="profile-container">
                {editing ? (
                    <form onSubmit={handleSaveChanges} className="profile-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="save-btn">
                            Save Changes
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleEditToggle}
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div className="profile-info">
                        <form encType="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="image">
                                    <span>🖊</span>
                                    <img src={user.profileImage ? user.profileImage : avatar} alt="profile-image" />
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleImageUpdate}
                                    hidden
                                />
                            </div>
                        </form>
                        <p>
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Bio:</strong> {user.bio}
                        </p>
                        <button className="edit-btn" onClick={handleEditToggle}>
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
