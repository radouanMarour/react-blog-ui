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

    const filteredBlogs = selectedCategory
        ? blogs.filter((blog) => blog.category.name === selectedCategory)
        : blogs;

    return (
        <div className="home">
            <Hero />
            <div className="content">
                <Sidebar />
                <main className="main-content">
                    <BlogGrid blogs={filteredBlogs} />
                </main>
            </div>
        </div>
    );
};

export default Home;
