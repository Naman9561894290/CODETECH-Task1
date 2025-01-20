import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = ({ blogs = [] }) => {
    const { id } = useParams(); // Get the blog ID from the URL
    const blog = blogs.find((blog) => blog._id === id); // Find the blog by ID

    if (!blog) {
        return <p>Blog not found.</p>; // Show a message if the blog doesn't exist
    }

    return (
        <div className="container">
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
        </div>
    );
};

export default BlogDetails;
