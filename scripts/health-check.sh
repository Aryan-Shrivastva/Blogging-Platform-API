#!/bin/bash

# Health check script for Docker containers
echo "🔍 Checking container health..."

# Check if containers are running
echo "📋 Container status:"
docker-compose ps

# Test API health endpoint
echo "🏥 Testing API health..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health)
if [ "$response" = "200" ]; then
    echo "✅ API health check passed"
else
    echo "❌ API health check failed (HTTP $response)"
    exit 1
fi

# Test MongoDB connection via API
echo "🍃 Testing MongoDB connection..."
response=$(curl -s http://localhost:3000/posts)
if echo "$response" | grep -q "\[\]"; then
    echo "✅ MongoDB connection working"
else
    echo "❌ MongoDB connection test failed"
    exit 1
fi

echo "🎉 All health checks passed!"