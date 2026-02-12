import mongoose from 'mongoose';
import { config } from './env.js';
export const connectDatabase = async () => {
    const maxRetries = 3;
    let retryCount = 0;
    const attemptConnection = async () => {
        try {
            // MongoDB connection options for better reliability
            const options = {
                serverSelectionTimeoutMS: 10000, // Timeout after 10s
                socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
                family: 4, // Use IPv4, skip trying IPv6 (helps with DNS issues)
                retryWrites: true,
                w: 'majority',
                maxPoolSize: 10, // Maintain up to 10 socket connections
                minPoolSize: 2, // Maintain at least 2 socket connections
            };
            await mongoose.connect(config.mongoUri, options);
            console.log('✓ MongoDB connected successfully');
            // Handle connection events
            mongoose.connection.on('error', (err) => {
                console.error('✗ MongoDB connection error:', err);
            });
            mongoose.connection.on('disconnected', () => {
                console.warn('⚠ MongoDB disconnected');
            });
            mongoose.connection.on('reconnected', () => {
                console.log('✓ MongoDB reconnected');
            });
        }
        catch (error) {
            retryCount++;
            // Provide helpful error message
            if (error instanceof Error) {
                const isDnsError = error.message.includes('ESERVFAIL') ||
                    error.message.includes('querySrv') ||
                    error.message.includes('ENOTFOUND');
                if (isDnsError) {
                    console.error(`✗ MongoDB DNS resolution failed (attempt ${retryCount}/${maxRetries})`);
                    console.error('Connection string:', config.mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
                    if (retryCount < maxRetries) {
                        console.log(`⏳ Retrying connection in 3 seconds...`);
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        return attemptConnection();
                    }
                    else {
                        console.error('\n💡 DNS resolution failed after multiple attempts. Possible solutions:');
                        console.error('   1. Check your internet connection');
                        console.error('   2. Verify MongoDB Atlas cluster is accessible');
                        console.error('   3. Check if your IP is whitelisted in MongoDB Atlas Network Access');
                        console.error('   4. Verify the connection string format is correct');
                        console.error('   5. Try using the standard connection string format instead of mongodb+srv://');
                        console.error('   6. Check DNS settings or try using a different DNS server (e.g., 8.8.8.8)');
                    }
                }
                else {
                    console.error(`✗ MongoDB connection error (attempt ${retryCount}/${maxRetries}):`, error.message);
                    if (retryCount < maxRetries) {
                        console.log(`⏳ Retrying connection in 3 seconds...`);
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        return attemptConnection();
                    }
                }
            }
            throw error;
        }
    };
    try {
        await attemptConnection();
    }
    catch (error) {
        console.error('✗ Failed to connect to MongoDB after all retry attempts');
        process.exit(1);
    }
};
export const disconnectDatabase = async () => {
    try {
        await mongoose.disconnect();
        console.log('✓ MongoDB disconnected');
    }
    catch (error) {
        console.error('✗ MongoDB disconnection error:', error);
    }
};
//# sourceMappingURL=database.js.map