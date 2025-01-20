import React, { useState } from 'react';
import './BlogForm.css';
import { useNavigate } from 'react-router-dom';

const BlogForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        navigate('/');
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleChange}
                ></textarea>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default BlogForm;
