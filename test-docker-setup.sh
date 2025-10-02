# Quick Docker Setup Test Commands

# Wait for containers to be ready (run after docker-compose up -d)
echo "Waiting for containers to start..."
sleep 30

# Test API health
echo "Testing API health..."
curl -X GET http://localhost:3000/health

# Test MongoDB Admin interface (optional)
echo "MongoDB Admin available at: http://localhost:8081"

# Test creating a blog post
echo "Creating a test blog post..."
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Docker Migration Success!",
    "content": "Successfully migrated from SQLite to MongoDB with Docker containerization.",
    "category": "DevOps",
    "tags": ["Docker", "MongoDB", "Migration", "DevOps"]
  }'

# Test getting all posts
echo -e "\n\nGetting all posts..."
curl -X GET http://localhost:3000/posts

# Test search functionality
echo -e "\n\nSearching for 'Docker' posts..."
curl -X GET "http://localhost:3000/posts?term=Docker"

echo -e "\n\n✅ Docker setup test completed!"