// Entry point for apex-core Server
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './db';
import app from './app';

const PORT = process.env.PORT || 4000;

// Validate required environment variables
const requiredEnvVars = [
  'JWT_SECRET',
  'DATABASE_URL',
  
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

// Async startup to connect DB before listening
async function startServer() {
  try {
    // Connect to database first
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
