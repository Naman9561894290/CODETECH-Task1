import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import BlogDetails from './components/BlogDetails';

function App() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Fetch blogs from the backend API
        fetch('http://localhost:5000/api/blogs')
            .then((response) => response.json())
            .then((data) => setBlogs(data))
            .catch((error) => console.error('Error fetching blogs:', error));
    }, []);

    // Handle blog creation
    const handleCreateBlog = async (newBlog) => {
        try {
            const response = await fetch('http://localhost:5000/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBlog),
            });
            const createdBlog = await response.json();
            setBlogs([...blogs, createdBlog]); // Add the new blog to the state
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    // Handle blog deletion
    const handleDeleteBlog = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/blogs/${id}`, {
                method: 'DELETE',
            });
            setBlogs(blogs.filter((blog) => blog._id !== id)); // Make sure `_id` matches the field
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<BlogList blogs={blogs} onDelete={handleDeleteBlog} />}
                />
                <Route
                    path="/create"
                    element={<BlogForm onSubmit={handleCreateBlog} />}
                />
                <Route
                    path="/blog/:id"
                    element={<BlogDetails blogs={blogs} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
