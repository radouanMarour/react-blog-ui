import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "../context/";

import "../styles/BlogDetails.css";
import API from "../api";
import CommentSection from "../components/CommentSection";

const BlogDetails = () => {
    const { id } = useParams(); // Get blog ID from URL parameters
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const { notifyError } = useToast()


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const response = await API.get(`/posts/${id}`);
                setBlog(response.data.data);
                // console.log(response.data)
            } catch (err) {
                notifyError(err.response.data.message)
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (!blog) {
        return <p className="not-found">Blog not found!</p>;
    }

    return (
        <div className="blog-details">
            <div className="blog-header">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="blog-cover-image"
                />
                <h1 className="blog-title">{blog.title}</h1>
            </div>
            <div className="blog-meta">
                <span className="blog-author">By {blog?.author.name}</span>
                <span className="blog-date">{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="blog-content">
                <p>{blog.content}</p>
            </div>
            <CommentSection postId={blog?._id} />
            <div>
                <Link to="/" className="back-link">← Back to Home</Link>
                <Link to={`/posts/edit/${blog._id}`} className="edit-btn">Edit Post</Link>
            </div>
        </div>
    );
};

export default BlogDetails;
