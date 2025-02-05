import React, { useContext, useEffect, useState } from "react";
import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import BlogGrid from "../components/BlogGrid";
import "../styles/Home.css";
import API from "../api";
import { Context, useSelect } from "../context";

const Home = () => {
    const { blogs, setBlogs } = useContext(Context)
    const { selectedCategory } = useSelect()
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await API.get('/posts')
                setBlogs(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBlogs()
    }, [])

    const filteredBlogs = !selectedCategory || selectedCategory === "All"
        ? blogs
        : blogs.filter((blog) => blog.category.name === selectedCategory);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="home">
            <Hero />
            <div className="content">
                <Sidebar />
                <main className="main-content">
                    <BlogGrid blogs={currentPosts} />
                    {totalPages > 1 && (
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                <button
                                    key={number}
                                    className={`page-btn ${currentPage === number ? 'active' : ''}`}
                                    onClick={() => handlePageChange(number)}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Home;
