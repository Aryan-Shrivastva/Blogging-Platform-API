const BlogPost = require('../models/BlogPost');
const mongoose = require('mongoose');

class BlogPostController {
  // POST /posts - Create a new blog post
  static async createPost(req, res) {
    try {
      const blogPost = new BlogPost(req.body);
      const savedPost = await blogPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        res.status(400).json({
          error: 'Bad Request',
          message: `Validation failed: ${messages.join(', ')}`
        });
      } else {
        console.error('Error creating post:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Failed to create blog post'
        });
      }
    }
  }

  // GET /posts/:id - Get a single blog post
  static async getPost(req, res) {
    try {
      const { id } = req.params;
      
      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Invalid post ID format'
        });
      }

      const post = await BlogPost.findById(id);
      
      if (!post) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Blog post not found'
        });
      }
      
      res.json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch blog post'
      });
    }
  }

  // GET /posts - Get all blog posts with optional search
  static async getAllPosts(req, res) {
    try {
      const { term } = req.query;
      let query = {};
      
      // If search term is provided, use MongoDB text search
      if (term) {
        query = {
          $or: [
            { title: { $regex: term, $options: 'i' } },
            { content: { $regex: term, $options: 'i' } },
            { category: { $regex: term, $options: 'i' } }
          ]
        };
      }
      
      const posts = await BlogPost.find(query)
        .sort({ createdAt: -1 })
        .lean(); // Use lean() for better performance when only reading
      
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch blog posts'
      });
    }
  }

  // PUT /posts/:id - Update an existing blog post
  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      
      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Invalid post ID format'
        });
      }

      const updatedPost = await BlogPost.findByIdAndUpdate(
        id,
        req.body,
        { 
          new: true, // Return the updated document
          runValidators: true // Run schema validators
        }
      );
      
      if (!updatedPost) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Blog post not found'
        });
      }
      
      res.json(updatedPost);
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        res.status(400).json({
          error: 'Bad Request',
          message: `Validation failed: ${messages.join(', ')}`
        });
      } else {
        console.error('Error updating post:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Failed to update blog post'
        });
      }
    }
  }

  // DELETE /posts/:id - Delete a blog post
  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      
      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Invalid post ID format'
        });
      }

      const deletedPost = await BlogPost.findByIdAndDelete(id);
      
      if (!deletedPost) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Blog post not found'
        });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to delete blog post'
      });
    }
  }
}

module.exports = BlogPostController;