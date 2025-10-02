# Blogging Platform API

A RESTful API for a personal blogging platform built with Node.js, Express.js, and SQLite.

> **Project Reference**: [Blogging Platform API - roadmap.sh](https://roadmap.sh/projects/blogging-platform-api)

## Features

✅ **Full CRUD Operations** for blog posts
✅ **Search functionality** - filter posts by title, content, or category
✅ **Input validation** with detailed error messages
✅ **SQLite database** with automatic schema creation
✅ **RESTful design** following best practices
✅ **Error handling** with appropriate HTTP status codes
✅ **Security** with Helmet.js and CORS

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite with better-sqlite3
- **Security**: Helmet.js, CORS
- **Development**: Nodemon for hot reloading

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blogging-Platform-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env file if needed (PORT, NODE_ENV, DB_NAME)
   ```

4. **Start the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Verify installation**
   ```bash
   curl http://localhost:3000/health
   ```

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Blog Post Schema
```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"],
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

### 1. Create Blog Post
**POST** `/posts`

**Request Body:**
```json
{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"],
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Bad Request",
  "message": "Validation failed: Title is required and must be a non-empty string"
}
```

### 2. Get All Blog Posts
**GET** `/posts`

**Optional Query Parameters:**
- `term` - Search term to filter posts by title, content, or category

**Examples:**
```bash
# Get all posts
curl http://localhost:3000/posts

# Search posts
curl "http://localhost:3000/posts?term=technology"
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"],
    "createdAt": "2021-09-01T12:00:00Z",
    "updatedAt": "2021-09-01T12:00:00Z"
  }
]
```

### 3. Get Single Blog Post
**GET** `/posts/:id`

**Example:**
```bash
curl http://localhost:3000/posts/1
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"],
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Not Found",
  "message": "Blog post not found"
}
```

### 4. Update Blog Post
**PUT** `/posts/:id`

**Request Body:**
```json
{
  "title": "My Updated Blog Post",
  "content": "This is the updated content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "My Updated Blog Post",
  "content": "This is the updated content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"],
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:30:00Z"
}
```

### 5. Delete Blog Post
**DELETE** `/posts/:id`

**Example:**
```bash
curl -X DELETE http://localhost:3000/posts/1
```

**Response (204 No Content):**
```
(Empty response body)
```

**Error Response (404 Not Found):**
```json
{
  "error": "Not Found",
  "message": "Blog post not found"
}
```

## Additional Endpoints

### Health Check
**GET** `/health`

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2021-09-01T12:00:00Z",
  "uptime": 123.456
}
```

### API Information
**GET** `/`

**Response:**
```json
{
  "message": "Welcome to the Blogging Platform API",
  "version": "1.0.0",
  "endpoints": {
    "GET /health": "Health check",
    "GET /posts": "Get all blog posts (with optional ?term=search)",
    "GET /posts/:id": "Get a specific blog post",
    "POST /posts": "Create a new blog post",
    "PUT /posts/:id": "Update a blog post",
    "DELETE /posts/:id": "Delete a blog post"
  }
}
```

## Error Handling

The API uses standard HTTP status codes:

- **200** - Success
- **201** - Created successfully
- **204** - Success with no content
- **400** - Bad Request (validation errors)
- **404** - Not Found
- **500** - Internal Server Error

All error responses follow this format:
```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

## Database Schema

The SQLite database automatically creates the following table:

```sql
CREATE TABLE blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT NOT NULL, -- JSON string
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Validation Rules

- **title**: Required, non-empty string
- **content**: Required, non-empty string
- **category**: Required, non-empty string
- **tags**: Required, must be an array

## Testing Examples

### Create a post
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with Node.js",
    "content": "Node.js is a powerful runtime for building server-side applications...",
    "category": "Tutorial",
    "tags": ["Node.js", "JavaScript", "Backend"]
  }'
```

### Get all posts
```bash
curl http://localhost:3000/posts
```

### Search posts
```bash
curl "http://localhost:3000/posts?term=Node.js"
```

### Update a post
```bash
curl -X PUT http://localhost:3000/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Advanced Node.js Concepts",
    "content": "Updated content here...",
    "category": "Advanced Tutorial",
    "tags": ["Node.js", "JavaScript", "Advanced"]
  }'
```

### Delete a post
```bash
curl -X DELETE http://localhost:3000/posts/1
```

## Project Structure

```
Blogging-Platform-API/
├── src/
│   ├── config/
│   │   └── database.js       # Database configuration
│   ├── controllers/
│   │   └── blogPostController.js  # Request handlers
│   ├── middleware/
│   │   └── errorHandler.js   # Error handling middleware
│   ├── models/
│   │   └── BlogPost.js       # Data model and validation
│   ├── routes/
│   │   └── posts.js          # Route definitions
│   └── server.js             # Main application file
├── .env                      # Environment variables
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## Development

### Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with auto-reload

### Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DB_NAME` - SQLite database filename (default: blogging_platform.db)
