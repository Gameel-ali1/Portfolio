const fs = require('fs');
const path = require('path');

const envContent = `# MongoDB Connection String - Replace with your actual MongoDB URI
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Server Port (optional, defaults to 5000)
PORT=5000

# Environment
NODE_ENV=development

# Add your actual MongoDB URI and other environment variables here
# Make sure to replace the placeholder values with your actual credentials
`;

const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('📁 Location:', envPath);
  console.log('🔗 MongoDB URI has been added to the .env file');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
} 