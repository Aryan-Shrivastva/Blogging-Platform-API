const BlogPost = require('../models/BlogPost');

class BlogPostController {
  // POST /posts - Create a new blog post
  static async createPost(req, res) {
    try {
      const post = BlogPost.create(req.body);
      res.status(201).json(post);
    } catch (error) {
      if (error.message.includes('Validation failed')) {
        res.status(400).json({
          error: 'Bad Request',
          message: error.message
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
      const postId = parseInt(id, 10);
      
      if (isNaN(postId)) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Invalid post ID'
        });
      }

      const post = BlogPost.findById(postId);
      
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
      const posts = BlogPost.findAll(term);
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
      const postId = parseInt(id, 10);
      
      if (isNaN(postId)) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Invalid post ID'
        });
      }

      const updatedPost = BlogPost.update(postId, req.body);
      
      if (!updatedPost) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Blog post not found'
        });
      }
      
      res.json(updatedPost);
    } catch (error) {
      if (error.message.includes('Validation failed')) {
        res.status(400).json({
          error: 'Bad Request',
          message: error.message
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
      const postId = parseInt(id, 10);
      
      if (isNaN(postId)) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Invalid post ID'
        });
      }

      const deleted = BlogPost.delete(postId);
      
      if (!deleted) {
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