import { createApp } from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { config } from './config/env.js';
const startServer = async () => {
    try {
        // Connect to database
        await connectDatabase();
        // Create Express app
        const app = createApp();
        // Start server
        const server = app.listen(config.port, () => {
            console.log(`✓ Server running on port ${config.port}`);
            console.log(`✓ Environment: ${config.nodeEnv}`);
            console.log(`✓ API: http://localhost:${config.port}/api`);
        });
        // Graceful shutdown
        const gracefulShutdown = async (signal) => {
            console.log(`\n${signal} received, shutting down gracefully...`);
            server.close(async () => {
                await disconnectDatabase();
                process.exit(0);
            });
        };
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map