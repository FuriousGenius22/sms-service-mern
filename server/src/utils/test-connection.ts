import { connectDatabase } from '../config/database.js';

/**
 * Test MongoDB connection independently
 * Run with: npx tsx src/utils/test-connection.ts
 */
const testConnection = async () => {
  console.log('Testing MongoDB connection...\n');
  
  try {
    await connectDatabase();
    console.log('\n✅ Connection test successful!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection test failed!');
    process.exit(1);
  }
};

testConnection();
