# Backend Express.js Template
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Features

- 🔐 Built-in security features ([`AppSecurity`](app/security/AppSecurity.js))
  - CORS configuration
  - Helmet security headers
  - Rate limiting
  - MongoDB sanitization
  - XSS protection
  - HPP (HTTP Parameter Pollution) protection

- 📝 Advanced logging system ([`logger`](services/logger.js))
  - Winston logger implementation
  - Separate error and combined logs
  - Exception tracking
  - Formatted console output

- 🚀 Error Handling
  - Global error handler ([`GlobalErrorHandler`](src/middlewares/GlobalErrorHandler.js))
  - Custom error classes ([`AppError`](utils/AppError.js))
  - Controller error wrapper ([`ControllerErrorHandler`](utils/helpers/ControllerErrorHandler.js))

- 📦 Database Integration
  - MongoDB connection with mongoose
  - Connection pooling
  - Health checks
  - Graceful shutdown

- ⚙️ Environment Configuration
  - Separate development and production configs
  - Easy-to-modify environment variables

## Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone https://github.com/DanyalAnsari/Backend-Express.js-Template
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `config/development.env.example` to `config/development.env`
   - Update the variables as needed

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
├── app/                    # Application core
│   ├── app.js             # Express app setup
│   ├── middlewares/       # Application middlewares
│   └── security/          # Security configurations
├── config/                # Environment configurations
├── database/              # Database setup and configuration
├── logs/                  # Application logs
├── services/              # Shared services
├── src/                   # Source code
│   ├── controllers/       # Route controllers
│   ├── middlewares/      # Route middlewares
│   ├── models/           # Database models
│   └── routes/           # API routes
└── utils/                 # Utility functions and helpers
```

## Available Scripts

- `npm run dev` - Start the development server with nodemon
- `npm start` - Start the production server

## Environment Variables

Key environment variables needed to run the application:

```env
MONGO_DB_URI=mongodb://localhost:27017/
MONGO_DB_NAME=your_database
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
LOG_LEVEL=debug
```

## Error Handling

The application includes a robust error handling system:

- Custom error classes for different HTTP status codes
- Global error handler for consistent error responses
- Controller wrapper for structured responses

## Security Features

- Helmet for security headers
- Rate limiting for API endpoints
- CORS configuration
- MongoDB query sanitization
- XSS protection
- HTTP Parameter Pollution protection

## Logging

- Winston logger implementation
- Separate log files for errors and combined logs
- Console output in development
- Automatic log rotation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.