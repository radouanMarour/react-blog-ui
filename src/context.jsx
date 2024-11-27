import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'

// Create the context
export const Context = createContext();

// Create the Provider component
export const Provider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === "true"
    );
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated)
        localStorage.setItem('token', token)
    }, [isAuthenticated, token])

    return (
        <Context.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                token,
                setToken,
                selectedCategory,
                setSelectedCategory,
                blogs,
                setBlogs
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useAuth = () => {
    const {
        isAuthenticated, setIsAuthenticated,
        token, setToken
    } = useContext(Context);

    const login = (token) => {
        setIsAuthenticated(true);
        setToken(token)
    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken("")
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('token')
    };

    return {
        isAuthenticated,
        token,
        login,
        logout,

    };
};

export const useSelect = () => {
    const {
        selectedCategory, setSelectedCategory
    } = useContext(Context);

    const selectCategory = (category) => {
        console.log(category)
        setSelectedCategory(category)
    }

    return {
        selectedCategory, selectCategory
    }
}

export const useToast = () => {
    const notifySuccess = (message) => toast.success(message)
    const notifyError = (message) => toast.error(message)

    return { notifySuccess, notifyError }
}

