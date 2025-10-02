# Blogging Platform API

A RESTful API for a personal blogging platform built with Node.js, Express.js, and MongoDB.

> **Project Reference**: [Blogging Platform API - roadmap.sh](https://roadmap.sh/projects/blogging-platform-api)

## Features

✅ **Full CRUD Operations** for blog posts  
✅ **Search functionality** - filter posts by title, content, or category  
✅ **MongoDB with Mongoose ODM**  
✅ **Docker containerization** with multi-service orchestration  
✅ **RESTful design** with proper HTTP status codes  
✅ **CI/CD pipeline** with GitHub Actions  
✅ **Security** with Helmet.js and CORS  

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Containerization**: Docker & Docker Compose
- **Security**: Helmet.js, CORS
- **Development**: Nodemon for hot reloading
- **CI/CD**: GitHub Actions

## Quick Start with Docker (Recommended)

**Prerequisites**: Docker & Docker Compose

```bash
# Clone and start
git clone <repository-url>
cd Blogging-Platform-API
docker-compose up -d

# Verify services
docker-compose ps
```

**Services**:
- API: http://localhost:3000
- MongoDB Admin: http://localhost:8081 (admin/password123)
- Health Check: http://localhost:3000/health

## Local Development

**Prerequisites**: Node.js 18+ & MongoDB

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit MONGODB_URI in .env

# Start development server
npm run dev
```

## API Endpoints

### Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Get all posts (optional `?term=search`) |
| GET | `/posts/:id` | Get single post |
| POST | `/posts` | Create new post |
| PUT | `/posts/:id` | Update post |
| DELETE | `/posts/:id` | Delete post |
| GET | `/health` | Health check |

### Blog Post Schema
```json
{
  "title": "My Blog Post",
  "content": "Post content here...",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```

## Example Usage

### Create a post
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with Docker",
    "content": "Docker makes deployment easy...",
    "category": "DevOps",
    "tags": ["Docker", "DevOps"]
  }'
```

### Get all posts
```bash
curl http://localhost:3000/posts
```

### Search posts
```bash
curl "http://localhost:3000/posts?term=Docker"
```

## Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

## Database Schema

MongoDB document structure:
```javascript
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

## Available Scripts

- `npm start` - Production server
- `npm run dev` - Development server with auto-reload
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Start with Docker Compose
- `npm run docker:stop` - Stop Docker services

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string

## Error Handling

API uses standard HTTP status codes:
- **200** - Success
- **201** - Created
- **204** - No Content
- **400** - Bad Request (validation errors)
- **404** - Not Found
- **500** - Internal Server Error

Error response format:
```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

## Project Structure

```
Blogging-Platform-API/
├── .github/workflows/ci-cd.yml    # CI/CD pipeline
├── scripts/init-mongo.js          # MongoDB init
├── src/
│   ├── config/database.js         # DB connection
│   ├── controllers/               # Request handlers
│   ├── middleware/                # Error handling
│   ├── models/                    # Mongoose schemas
│   ├── routes/                    # API routes
│   └── server.js                  # Main app file
├── docker-compose.yml             # Multi-container setup
├── Dockerfile                     # Container definition
└── package.json                   # Dependencies
```

## CI/CD Pipeline

GitHub Actions workflow includes:
- **Testing** with MongoDB service
- **Docker image building**
- **Security scanning**
- **Automated deployment** (on main branch)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## License

ISC License