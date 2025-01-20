const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await BlogPost.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
});

// Create a new blog post
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const newBlog = new BlogPost({ title, content });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create blog post' });
    }
});

// Get a single blog post
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await BlogPost.findById(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog post' });
    }
});

// Update a blog post
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedBlog = await BlogPost.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update blog post' });
    }
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await BlogPost.findByIdAndDelete(id);
        res.json({ message: 'Blog post deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
});

module.exports = router;
