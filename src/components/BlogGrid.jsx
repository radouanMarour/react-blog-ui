import React from "react";
import "../styles/BlogGrid.css";
import { Link } from "react-router-dom";

const BlogGrid = ({ blogs }) => {
    return (
        <section className="blog-grid">
            {blogs.map((blog) => (
                <div key={blog._id} className="blog-card">
                    <img src={blog.image} alt={blog.title} className="blog-image" />
                    <h3>{blog.title}</h3>
                    <p>{blog.content.substring(0, 100)}...</p>
                    <button><Link to={`/posts/${blog._id}`}>Read More</Link></button>
                </div>
            ))}
        </section>
    );
};

export default BlogGrid;
