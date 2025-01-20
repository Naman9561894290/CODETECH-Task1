import React from 'react';
import './BlogList.css';

const BlogList = ({ blogs = [], onDelete }) => {
    return (
        <div className="container">
            <h1>Blog Posts</h1>
            {blogs.length > 0 ? (
                <ul>
                    {blogs.map((blog) => (
                        <li key={blog._id}>
                            <span>{blog.title}</span>
                            <button onClick={() => onDelete(blog._id)}>Delete</button>
                            <a href={`/blog/${blog._id}`}>View</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No blogs available.</p>
            )}
            <a href="/create" className="create-link">
                Create New Blog
            </a>
        </div>
    );
};

export default BlogList;
