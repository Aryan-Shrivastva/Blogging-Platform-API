const express = require('express');
const BlogPostController = require('../controllers/blogPostController');

const router = express.Router();

// POST /posts - Create a new blog post
router.post('/', BlogPostController.createPost);

// GET /posts - Get all blog posts (with optional search)
router.get('/', BlogPostController.getAllPosts);

// GET /posts/:id - Get a single blog post
router.get('/:id', BlogPostController.getPost);

// PUT /posts/:id - Update an existing blog post
router.put('/:id', BlogPostController.updatePost);

// DELETE /posts/:id - Delete a blog post
router.delete('/:id', BlogPostController.deletePost);

module.exports = router;