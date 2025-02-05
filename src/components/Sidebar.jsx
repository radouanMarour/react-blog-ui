import React, { useEffect, useState } from "react";
import "../styles/Sidebar.css";
import { useSelect } from "../context";
import API from "../api";
import Search from "./Search";

const Sidebar = () => {
    const [categories, setCategories] = useState([])
    const { selectCategory, selectedCategory } = useSelect()


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await API.get('/categories')
                setCategories(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategories()
    }, [])


    return (
        <aside className="sidebar">
            <Search />
            <ul>
                <li
                    onClick={() => selectCategory("All")}
                    className={selectedCategory === "All" && "active"}
                >
                    All
                </li>
                {categories.map((category) => (
                    <li
                        key={category._id}
                        onClick={() => selectCategory(category.name)}
                        className={selectedCategory === category.name && "active"}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
