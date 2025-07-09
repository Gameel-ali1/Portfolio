const fs = require('fs');
const path = require('path');

const envContent = `MONGODB_URI=mongodb+srv://jimmyex04:F6JCZPV0AOy2mryB@portfolio.fqo72vt.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio
PORT=5000
NODE_ENV=development
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