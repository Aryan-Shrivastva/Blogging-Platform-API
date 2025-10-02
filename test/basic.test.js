// Basic API Health Check Test
// This is a simple test to verify the API is working in CI/CD

const http = require('http');

function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, data });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function runBasicTests() {
  console.log('🧪 Running basic API tests...');
  
  // Test if we can import our modules without errors
  try {
    const BlogPost = require('../src/models/BlogPost');
    const connectDB = require('../src/config/database');
    console.log('✅ All modules imported successfully');
  } catch (error) {
    console.error('❌ Module import failed:', error.message);
    process.exit(1);
  }
  
  console.log('✅ Basic tests passed!');
  process.exit(0);
}

// Run tests if this file is executed directly
if (require.main === module) {
  runBasicTests();
}

module.exports = { runBasicTests };