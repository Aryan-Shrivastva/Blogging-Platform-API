const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

const dbPath = path.join(__dirname, '..', '..', process.env.DB_NAME || 'blogging_platform.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create blog_posts table
const createPostsTable = `
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT NOT NULL, -- JSON string
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

// Create the table
db.exec(createPostsTable);

// Create a trigger to update the updated_at timestamp
const updateTrigger = `
  CREATE TRIGGER IF NOT EXISTS update_blog_posts_updated_at
    AFTER UPDATE ON blog_posts
    BEGIN
      UPDATE blog_posts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END
`;

db.exec(updateTrigger);

console.log('Database initialized successfully');

module.exports = db;