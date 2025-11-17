# MERN Stack Application - Deployment & DevOps Essentials

## 🚀 Project Overview

A full-stack MERN (MongoDB, Express.js, React, Node.js) application with complete CI/CD pipeline, production deployment, and monitoring setup.

### 📍 Live URLs
- **Frontend**: [https://your-app.vercel.app](https://your-app.vercel.app)
- **Backend API**: [https://your-api.onrender.com](https://your-api.onrender.com)
- **API Documentation**: [https://your-api.onrender.com/api/health](https://your-api.onrender.com/api/health)

## 📁 Project Structure

```
mern-deployment/
├── backend/                 # Express.js API Server
│   ├── config/             # Database and app configuration
│   ├── middleware/         # Custom middleware (auth, error handling)
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── tests/              # Backend test suites
│   ├── logs/               # Application logs
│   ├── .env.example        # Environment variables template
│   ├── server.js           # Main server file
│   └── package.json
├── frontend/               # React.js Application
│   ├── public/             # Static assets
│   ├── src/                # React components and logic
│   ├── .env.example        # Frontend environment template
│   └── package.json
├── .github/workflows/      # CI/CD Pipeline configurations
│   └── ci-cd.yml           # GitHub Actions workflow
├── scripts/                # Deployment and utility scripts
└── README.md
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Winston** - Logging
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

### DevOps & Deployment
- **GitHub Actions** - CI/CD pipelines
- **Render** - Backend hosting
- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Cloud database
- **Jest** - Testing framework
- **Supertest** - API testing

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd mern-deployment
```

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```
Backend will run on `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm start
```
Frontend will run on `http://localhost:3000`

## ⚙️ Environment Configuration

### Backend Environment (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mernapp
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:3000
```

### Frontend Environment (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
REACT_APP_VERSION=1.0.0
REACT_APP_NAME=MERN Stack App
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Frontend Tests
```bash
cd frontend
npm test              # Run all tests
npm test -- --coverage # Run tests with coverage
```

### Test Coverage
- Backend: 70%+ coverage threshold
- Frontend: 70%+ coverage threshold
- Automated testing on every push via GitHub Actions

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
The project includes automated CI/CD pipeline that runs on every push:

**Stages:**
1. **Backend Tests** - Unit and integration tests
2. **Frontend Tests** - React component tests and build
3. **Backend Deployment** - Auto-deploy to Render on main branch
4. **Frontend Deployment** - Auto-deploy to Vercel on main branch

### Pipeline Triggers
- **Push to main** → Run tests + Deploy to production
- **Push to develop** → Run tests only
- **Pull Request** → Run tests only

## 🚀 Deployment

### Backend Deployment (Render)
1. **Platform**: Render.com
2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. **Environment**: Node.js 18+
5. **Auto-deploy**: On Git push to main

### Frontend Deployment (Vercel)
1. **Platform**: Vercel
2. **Framework**: Create React App
3. **Build Command**: `npm run build`
4. **Output Directory**: `build`
5. **Auto-deploy**: On Git push to main

### Database (MongoDB Atlas)
1. **Provider**: MongoDB Atlas
2. **Tier**: Free (M0)
3. **Backups**: Automated
4. **Monitoring**: Built-in Atlas metrics

## 📊 API Documentation

### Health Check Endpoints
- `GET /api/health` - Basic health status
- `GET /api/health/detailed` - Detailed system information

### Sample API Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Example API Response
```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "production"
}
```

## 🛡️ Security Features

### Backend Security
- **Helmet.js** - Security headers
- **CORS** - Configured origins
- **Rate Limiting** - 100 requests/15 minutes per IP
- **JWT Authentication** - Stateless auth tokens
- **Input Validation** - Request data sanitization
- **Environment Variables** - Secure configuration

### Frontend Security
- **HTTPS Enforcement** - Production only
- **Content Security Policy** - XSS protection
- **Environment Variables** - Client-side configuration

## 📈 Monitoring & Logging

### Application Monitoring
- **Health Checks** - `/api/health` endpoints
- **Error Tracking** - Winston logging
- **Performance Monitoring** - Response time tracking
- **Uptime Monitoring** - External monitoring service

### Logging Strategy
- **Development**: Console logging
- **Production**: File-based logging with rotation
- **Error Tracking**: Structured error logs
- **Audit Logs**: Security-related events

## 🔧 Maintenance

### Regular Tasks
- **Database Backups** - Automated via MongoDB Atlas
- **Dependency Updates** - Weekly security updates
- **Log Rotation** - Daily log file management
- **Performance Review** - Monthly performance analysis

### Update Procedures
1. **Development** → Test new features
2. **Staging** → Verify in production-like environment
3. **Production** → Deploy to live environment
4. **Rollback** - Automated rollback on failure

## 🐛 Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Check MongoDB connection
mongosh

# Check environment variables
echo $MONGODB_URI

# Check port availability
sudo lsof -i :5000
```

#### Frontend Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check environment variables
cat .env
```

#### Database Connection Issues
```bash
# Test MongoDB connection
mongosh "mongodb://localhost:27017/mernapp"

# Check MongoDB service
sudo systemctl status mongodb
```

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
REACT_APP_ENABLE_DEBUG=true
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- **Backend**: ESLint with Airbnb style guide
- **Frontend**: ESLint with Create React App defaults
- **Tests**: Jest with Supertest for APIs
- **Commits**: Conventional commit messages

## 📝 Scripts

### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run lint       # Run ESLint
npm run lint:fix   # Fix linting issues
```

### Frontend Scripts
```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run tests
npm run eject      # Eject from Create React App
```

## 🌐 Production URLs

- **Frontend Application**: [https://your-app.vercel.app](https://your-app.vercel.app)
- **Backend API**: [https://your-api.onrender.com](https://your-api.onrender.com)
- **API Health Check**: [https://your-api.onrender.com/api/health](https://your-api.onrender.com/api/health)
- **GitHub Repository**: [Your Repository URL]
- **CI/CD Pipeline**: [GitHub Actions Tab]

## 📞 Support

### Getting Help
1. **Check Logs** - Application and server logs
2. **Verify Environment** - Environment variables
3. **Test Endpoints** - API health checks
4. **Review Documentation** - This README and code comments

### Resources
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://reactjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- PLP Academy for the learning opportunity
- MongoDB Atlas for database hosting
- Render for backend hosting
- Vercel for frontend hosting
- GitHub for CI/CD pipelines

---


