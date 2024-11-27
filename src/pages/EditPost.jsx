import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth, useToast } from '../context/';
import API from '../api';
import '../styles/EditPost.css';

const EditPost = () => {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const { notifySuccess, notifyError } = useToast()

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        image: null,
    });
    const [categories, setCategories] = useState([]);

    // Fetch categories and post details on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await API.get('/categories');
                setCategories(response.data.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        const fetchPostDetails = async () => {
            try {
                const response = await API.get(`/posts/${id}`, {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                });
                setFormData({
                    title: response.data.data.title,
                    content: response.data.data.content,
                    category: response.data.data.category._id,
                    image: null, // Reset image unless changed
                });
            } catch (err) {
                notifyError(err.response.data.message)
            }
        };

        fetchCategories();
        fetchPostDetails();
    }, [id]);

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
        postData.append('title', formData.title);
        postData.append('content', formData.content);
        postData.append('category', formData.category);
        if (formData.image) postData.append('image', formData.image);

        try {
            const response = await API.put(`/posts/${id}`, postData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            notifySuccess(response.data.message)
            setTimeout(() => navigate(`/posts/${id}`), 2000); // Redirect to post details page
        } catch (err) {
            console.error('Error updating post:', err);
            notifyError(err.response.data.message)
        }
    };

    return (
        <div className="edit-post-page">
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
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
                <button type="submit" className="edit-post-btn">
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default EditPost;
