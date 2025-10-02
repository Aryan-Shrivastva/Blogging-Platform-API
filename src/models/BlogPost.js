const mongoose = require('mongoose');

// Define the BlogPost schema
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters']
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function(tags) {
        return Array.isArray(tags);
      },
      message: 'Tags must be an array'
    }
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  // Transform output to match API format
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Add text index for search functionality
blogPostSchema.index({ 
  title: 'text', 
  content: 'text', 
  category: 'text' 
});

// Create and export the model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;