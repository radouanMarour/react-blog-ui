import React, { useState, useEffect } from "react";
import API from "../api";
import { useAuth, useToast } from "../context/";
import "../styles/CreatePost.css";

const CreatePost = () => {
    const { token } = useAuth();
    const { notifySuccess, notifyError } = useToast()
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        image: null,
    });
    const [categories, setCategories] = useState([]);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await API.get("/categories");
                setCategories(response.data.data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = new FormData();
        postData.append("title", formData.title);
        postData.append("content", formData.content);
        postData.append("category", formData.category);
        postData.append("image", formData.image);

        try {
            const response = await API.post("/posts", postData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            notifySuccess(response.data.message)
        } catch (err) {
            console.error("Error creating post:", err);
            notifyError(err.response.data.message)
        }
    };

    return (
        <div className="create-post-page">
            <h1>Create New Post</h1>
            <form onSubmit={handleSubmit} className="create-post-form">
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group submit-button">
                    <button type="submit" className="create-post-btn">
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
