// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

// Switch to the blogging_platform database
db = db.getSiblingDB('blogging_platform');

// Create a user for the application
db.createUser({
  user: 'blogapp',
  pwd: 'blogapp123',
  roles: [
    {
      role: 'readWrite',
      db: 'blogging_platform'
    }
  ]
});

// Create an index on the title field for better search performance
db.posts.createIndex({ "title": "text", "content": "text", "category": "text" });

// Insert some sample data (optional)
db.posts.insertMany([
  {
    title: "Welcome to the Blogging Platform",
    content: "This is the first blog post in our new MongoDB-powered platform. We've successfully migrated from SQLite to MongoDB with Docker support!",
    category: "Announcement",
    tags: ["MongoDB", "Docker", "Migration"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Getting Started with Docker",
    content: "Docker containerization makes deployment and scaling much easier. Learn how to containerize your applications effectively.",
    category: "Tutorial",
    tags: ["Docker", "DevOps", "Containerization"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Database initialization completed successfully!');