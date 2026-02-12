# SMS Service Backend

TypeScript Express server with MongoDB authentication.

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.ts  # MongoDB connection
│   │   └── env.ts       # Environment variables
│   ├── controllers/     # Request handlers
│   │   └── auth.controller.ts
│   ├── middleware/      # Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── errorHandler.middleware.ts
│   │   └── validator.middleware.ts
│   ├── models/          # Mongoose models
│   │   └── User.model.ts
│   ├── routes/          # API routes
│   │   ├── index.ts
│   │   └── auth.routes.ts
│   ├── services/        # Business logic
│   │   └── auth.service.ts
│   ├── types/           # TypeScript types
│   │   ├── index.ts
│   │   └── express.d.ts
│   ├── validators/      # Request validation
│   │   └── auth.validator.ts
│   ├── app.ts          # Express app setup
│   └── index.ts        # Server entry point
├── .env                # Environment variables
├── package.json
└── tsconfig.json
```

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Configure environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sms-service
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

3. Make sure MongoDB is running locally:
```bash
# Check if MongoDB is running
mongosh

# If not running, start it (depends on your installation)
# macOS (Homebrew): brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: net start MongoDB
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm start
```

Server runs on http://localhost:5000

## API Endpoints

### Health
- `GET /api/health` - Health check

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

## Architecture

### Layered Architecture
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic and data manipulation
- **Models**: Database schemas and data validation
- **Middleware**: Request processing (auth, validation, errors)
- **Routes**: API endpoint definitions
- **Validators**: Input validation rules

### Features
- TypeScript for type safety
- Modular and scalable structure
- Centralized error handling
- JWT authentication
- Request validation
- Password hashing with bcrypt
- MongoDB with Mongoose ODM
- Environment-based configuration

## Adding New Features

1. **New Model**: Create in `src/models/`
2. **New Service**: Create in `src/services/`
3. **New Controller**: Create in `src/controllers/`
4. **New Routes**: Create in `src/routes/` and import in `src/routes/index.ts`
5. **New Middleware**: Create in `src/middleware/`
6. **New Types**: Add to `src/types/index.ts`
