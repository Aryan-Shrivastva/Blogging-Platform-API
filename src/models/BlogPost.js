const db = require('../config/database');

class BlogPost {
  // Validation helper
  static validate(data) {
    const errors = [];
    
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
      errors.push('Title is required and must be a non-empty string');
    }
    
    if (!data.content || typeof data.content !== 'string' || data.content.trim().length === 0) {
      errors.push('Content is required and must be a non-empty string');
    }
    
    if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
      errors.push('Category is required and must be a non-empty string');
    }
    
    if (!data.tags || !Array.isArray(data.tags)) {
      errors.push('Tags must be an array');
    }
    
    return errors;
  }

  // Create a new blog post
  static create(data) {
    const errors = this.validate(data);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    const stmt = db.prepare(`
      INSERT INTO blog_posts (title, content, category, tags)
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      data.title.trim(),
      data.content.trim(),
      data.category.trim(),
      JSON.stringify(data.tags)
    );
    
    return this.findById(result.lastInsertRowid);
  }

  // Find blog post by ID
  static findById(id) {
    const stmt = db.prepare('SELECT * FROM blog_posts WHERE id = ?');
    const post = stmt.get(id);
    
    if (post) {
      return this.formatPost(post);
    }
    
    return null;
  }

  // Find all blog posts with optional search
  static findAll(searchTerm = null) {
    let query = 'SELECT * FROM blog_posts';
    let params = [];
    
    if (searchTerm) {
      query += ' WHERE title LIKE ? OR content LIKE ? OR category LIKE ?';
      const searchPattern = `%${searchTerm}%`;
      params = [searchPattern, searchPattern, searchPattern];
    }
    
    query += ' ORDER BY created_at DESC';
    
    const stmt = db.prepare(query);
    const posts = stmt.all(...params);
    
    return posts.map(post => this.formatPost(post));
  }

  // Update blog post
  static update(id, data) {
    const errors = this.validate(data);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    const stmt = db.prepare(`
      UPDATE blog_posts 
      SET title = ?, content = ?, category = ?, tags = ?
      WHERE id = ?
    `);
    
    const result = stmt.run(
      data.title.trim(),
      data.content.trim(),
      data.category.trim(),
      JSON.stringify(data.tags),
      id
    );
    
    if (result.changes === 0) {
      return null; // Post not found
    }
    
    return this.findById(id);
  }

  // Delete blog post
  static delete(id) {
    const stmt = db.prepare('DELETE FROM blog_posts WHERE id = ?');
    const result = stmt.run(id);
    
    return result.changes > 0;
  }

  // Format post for response (convert dates and parse tags)
  static formatPost(post) {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      tags: JSON.parse(post.tags),
      createdAt: new Date(post.created_at).toISOString(),
      updatedAt: new Date(post.updated_at).toISOString()
    };
  }
}

module.exports = BlogPost;