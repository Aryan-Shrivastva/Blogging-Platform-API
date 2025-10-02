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

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Containerization**: Docker & Docker Compose
- **Security**: Helmet.js, CORS
- **Development**: Nodemon for hot reloading
- **CI/CD**: GitHub Actions

## Installation & Setup

### Option 1: Docker Setup (Recommended)

**Prerequisites:**
- Docker
- Docker Compose

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blogging-Platform-API
   ```

2. **Start with Docker Compose**
   ```bash
   # Start all services (API + MongoDB + Mongo Express)
   docker-compose up -d
   
   # View logs
   docker-compose logs -f
   
   # Stop all services
   docker-compose down
   ```

3. **Verify the setup**
   - API: http://localhost:3000
   - MongoDB Admin (Mongo Express): http://localhost:8081
   - Health check: http://localhost:3000/health

### Option 2: Local Development Setup

**Prerequisites:**
- Node.js 18+
- MongoDB (running locally or MongoDB Atlas)

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd Blogging-Platform-API
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Copy and edit environment variables
   cp .env.example .env
   # Edit .env file with your MongoDB connection string
   ```

3. **Start MongoDB** (if running locally)
   ```bash
   # Using MongoDB service
   sudo systemctl start mongod
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:7.0
   ```

4. **Start the application**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
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

The MongoDB database uses the following document structure:

```javascript
// BlogPost Schema
{
  _id: ObjectId,
  title: String (required, max 200 chars),
  content: String (required),
  category: String (required, max 50 chars),
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- Text index on `title`, `content`, and `category` for search functionality
- Default index on `_id`

## Docker Configuration

### Services Overview

The `docker-compose.yml` defines three services:

1. **mongodb**: MongoDB 7.0 database
   - Port: 27017
   - Persistent data storage
   - Admin credentials: admin/password123

2. **api**: Node.js API application
   - Port: 3000
   - Depends on MongoDB
   - Auto-restarts on failure

3. **mongo-express**: MongoDB admin interface
   - Port: 8081
   - Admin credentials: admin/password123
   - Provides web UI for database management

### Docker Commands

```bash
# Build and start all services
docker-compose up -d

# View service logs
docker-compose logs -f [service-name]

# Stop all services
docker-compose down

# Remove all data (including database)
docker-compose down -v

# Rebuild and restart
docker-compose up -d --build

# Scale the API service
docker-compose up -d --scale api=3
```

### Environment Variables for Docker

```bash
# Production environment variables
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://admin:password123@mongodb:27017/blogging_platform?authSource=admin
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
├── .github/
│   └── workflows/
│       └── ci-cd.yml             # GitHub Actions CI/CD pipeline
├── scripts/
│   └── init-mongo.js             # MongoDB initialization script
├── src/
│   ├── config/
│   │   └── database.js           # MongoDB connection configuration
│   ├── controllers/
│   │   └── blogPostController.js # Request handlers
│   ├── middleware/
│   │   └── errorHandler.js       # Error handling middleware
│   ├── models/
│   │   └── BlogPost.js           # Mongoose schema and model
│   ├── routes/
│   │   └── posts.js              # Route definitions
│   └── server.js                 # Main application file
├── .dockerignore                 # Docker ignore rules
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── docker-compose.yml            # Multi-container Docker setup
├── Dockerfile                    # Docker image definition
├── package.json                  # Project dependencies
└── README.md                     # Project documentation
```

## Development

### Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with auto-reload
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Start all services with Docker Compose
- `npm run docker:stop` - Stop all Docker services
- `npm run docker:logs` - View Docker container logs

### Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string

### CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that:

**On Pull Requests & Pushes:**
1. **Testing**: Runs tests with MongoDB service
2. **Building**: Creates Docker image
3. **Security**: Performs security audit and vulnerability scanning

**On Main Branch Pushes:**
4. **Deployment**: Deploys to production environment
5. **Health Check**: Verifies deployment success

**Pipeline Features:**
- MongoDB test database
- Docker image caching
- Security scanning with Snyk
- Automated deployment on main branch
- Health checks post-deployment

### Infrastructure as Code

The project demonstrates IaC concepts through:
- **Dockerfile**: Defines application container
- **docker-compose.yml**: Orchestrates multi-container setup
- **GitHub Actions**: Automates CI/CD pipeline
- **Environment configs**: Manages deployment environments
