import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';

export const createApp = (): Application => {
  const app = express();

  // Middleware — allow credentials so browser_id cookie is sent
  app.use(cors({ origin: true, credentials: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api', routes);

  // Root endpoint
  app.get('/', (_req, res) => {
    res.json({
      message: 'SMS Service API',
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth',
      },
    });
  });

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
};
