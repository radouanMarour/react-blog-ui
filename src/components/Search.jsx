import React, { useContext, useState } from 'react'
import '../styles/Search.css'
import API from '../api'
import { Context } from '../context'

const Search = () => {
    const [query, setQuery] = useState("")
    const { setBlogs } = useContext(Context)


    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const response = await API.get(`/posts/search/?query=${query}`)
            console.group(response.data.data)
            setBlogs(response.data.data)
        } catch (error) {

        }
    }

    return (
        <form className='search' onSubmit={handleSearch}>
            <input
                type='text'
                name='search'
                placeholder='Search'
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
        </form>
    )
}

export default Search