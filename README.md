# Resume Builder

A comprehensive full-stack web application designed to help users create, customize, and manage professional resumes through an intuitive and user-friendly interface. Built with modern web technologies and following industry best practices for scalability, security, and maintainability.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Frontend Components](#frontend-components)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Overview

Resume Builder is a modern web application that simplifies the resume creation process. It provides users with a powerful yet easy-to-use platform to build professional resumes with real-time preview, multiple templates, and export functionality. The application follows a clean client-server architecture with RESTful API design patterns.

### Key Highlights

- **Real-time Updates**: See changes instantly as you edit
- **Multiple Templates**: Choose from various professional templates
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Secure & Scalable**: Built with security best practices and scalable architecture
- **Export Options**: Download resumes in PDF, DOCX, and JSON formats
- **Data Persistence**: Secure storage and retrieval of user data

## Features

### Core Functionality

- **Resume Creation & Editing**
  - Intuitive form-based interface
  - Real-time preview pane
  - Auto-save functionality
  - Undo/redo capabilities

- **Template Management**
  - Multiple professional templates
  - Customizable color schemes
  - Font and layout options
  - Template preview before selection

- **Section Management**
  - Personal Information
  - Professional Summary
  - Work Experience
  - Education
  - Skills (with proficiency levels)
  - Projects
  - Certifications
  - Custom sections

- **Export & Download**
  - PDF export with high-quality rendering
  - DOCX format for further editing
  - JSON export for data portability
  - Print-optimized layouts

- **User Management**
  - Create and manage multiple resumes
  - Save drafts
  - Version history
  - Resume analytics (views, downloads)

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library for building interactive interfaces |
| **TypeScript** | Type-safe JavaScript for better code quality |
| **Redux Toolkit** | State management for complex app state |
| **React Router** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Tailwind CSS** | Utility-first CSS framework |
| **Formik & Yup** | Form handling and validation |
| **React-PDF** | PDF generation and rendering |
| **React-Quill** | Rich text editor for descriptions |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **TypeScript** | Type-safe server-side code |
| **MongoDB** | NoSQL database for data storage |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication and authorization |
| **Bcrypt** | Password hashing |
| **Express Validator** | Request validation middleware |
| **Multer** | File upload handling |
| **Winston** | Logging |
| **Helmet** | Security headers |

### DevOps & Tools

- **Git** - Version control
- **ESLint & Prettier** - Code quality and formatting
- **Jest & React Testing Library** - Testing
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Postman** - API testing

## Architecture

The application follows a modern three-tier architecture:

```
┌─────────────────┐
│   Client Layer  │  (React, TypeScript, Redux)
│   Port: 3000    │
└────────┬────────┘
         │ HTTPS/REST
┌────────▼────────┐
│  Server Layer   │  (Node.js, Express, TypeScript)
│   Port: 5000    │
└────────┬────────┘
         │ Mongoose ODM
┌────────▼────────┐
│ Database Layer  │  (MongoDB)
│   Port: 27017   │
└─────────────────┘
```

### Design Patterns Used

- **MVC Pattern**: Separation of concerns in backend
- **Repository Pattern**: Data access abstraction
- **Service Layer**: Business logic separation
- **Middleware Pattern**: Request processing pipeline
- **Component-Based**: Modular frontend architecture
- **State Management**: Centralized state with Redux

## Project Structure

```
resume-builder/
│
├── client/                          # Frontend React application
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── common/             # Shared components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── Loader.tsx
│   │   │   ├── layout/             # Layout components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   └── resume/             # Resume-specific components
│   │   │       ├── ResumeEditor.tsx
│   │   │       ├── ResumePreview.tsx
│   │   │       ├── TemplateSelector.tsx
│   │   │       └── SectionManager.tsx
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Editor.tsx
│   │   │   ├── Templates.tsx
│   │   │   └── NotFound.tsx
│   │   │
│   │   ├── redux/                   # State management
│   │   │   ├── store.ts
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── resumeSlice.ts
│   │   │   │   └── uiSlice.ts
│   │   │   └── middleware/
│   │   │
│   │   ├── services/                # API service layer
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   └── resumeService.ts
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useResume.ts
│   │   │   └── useDebounce.ts
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   └── constants.ts
│   │   │
│   │   ├── types/                   # TypeScript types
│   │   │   ├── resume.types.ts
│   │   │   ├── user.types.ts
│   │   │   └── api.types.ts
│   │   │
│   │   ├── styles/                  # Global styles
│   │   │   ├── globals.css
│   │   │   └── tailwind.css
│   │   │
│   │   ├── App.tsx                  # Root component
│   │   ├── index.tsx                # Entry point
│   │   └── routes.tsx               # Route configuration
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── server/                          # Backend Node.js application
│   ├── src/
│   │   ├── config/                  # Configuration files
│   │   │   ├── database.ts
│   │   │   ├── env.ts
│   │   │   └── logger.ts
│   │   │
│   │   ├── controllers/             # Request handlers
│   │   │   ├── authController.ts
│   │   │   ├── resumeController.ts
│   │   │   └── userController.ts
│   │   │
│   │   ├── models/                  # Database models
│   │   │   ├── User.ts
│   │   │   ├── Resume.ts
│   │   │   └── Template.ts
│   │   │
│   │   ├── routes/                  # API routes
│   │   │   ├── index.ts
│   │   │   ├── authRoutes.ts
│   │   │   ├── resumeRoutes.ts
│   │   │   └── userRoutes.ts
│   │   │
│   │   ├── services/                # Business logic
│   │   │   ├── authService.ts
│   │   │   ├── resumeService.ts
│   │   │   ├── emailService.ts
│   │   │   └── pdfService.ts
│   │   │
│   │   ├── middleware/              # Custom middleware
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   ├── validator.ts
│   │   │   └── rateLimit.ts
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── jwt.ts
│   │   │   ├── bcrypt.ts
│   │   │   └── helpers.ts
│   │   │
│   │   ├── types/                   # TypeScript types
│   │   │   ├── express.d.ts
│   │   │   └── models.types.ts
│   │   │
│   │   ├── validators/              # Request validators
│   │   │   ├── authValidator.ts
│   │   │   └── resumeValidator.ts
│   │   │
│   │   ├── app.ts                   # Express app setup
│   │   └── server.ts                # Server entry point
│   │
│   ├── tests/                       # Test files
│   │   ├── unit/
│   │   └── integration/
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── .github/                         # GitHub configuration
│   └── workflows/
│       └── ci-cd.yml
│
├── .gitignore                       # Git ignore rules
├── .env.example                     # Environment variables template
├── docker-compose.yml               # Docker composition
├── Dockerfile                       # Docker configuration
├── README.md                        # Project documentation
└── LICENSE                          # License file
```

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.x or higher) - [Download](https://nodejs.org/)
- **npm** (v8.x or higher) or **yarn** (v1.22.x or higher)
- **MongoDB** (v5.x or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/tarunkalva14/resume-builder.git
cd resume-builder
```

#### 2. Setup Environment Variables

Create `.env` files for both client and server:

**Server (.env in /server directory):**
```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/resume-builder
MONGODB_TEST_URI=mongodb://localhost:27017/resume-builder-test

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRE=30d

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@resumebuilder.com
FROM_NAME=Resume Builder

# AWS S3 (Optional - for file storage)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=resume-builder-uploads

# Client URL
CLIENT_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

**Client (.env in /client directory):**
```bash
cp client/.env.example client/.env
```

Edit `client/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_ENV=development
```

#### 3. Install Dependencies

**Install server dependencies:**
```bash
cd server
npm install
```

**Install client dependencies:**
```bash
cd ../client
npm install
```

#### 4. Setup Database

Make sure MongoDB is running on your system:

```bash
# On macOS (using Homebrew)
brew services start mongodb-community

# On Linux (using systemd)
sudo systemctl start mongod

# On Windows
# Start MongoDB service from Services or run mongod.exe
```

#### 5. Run the Application

**Start the backend server:**
```bash
cd server
npm run dev
```
The server will start on `http://localhost:5000`

**Start the frontend (in a new terminal):**
```bash
cd client
npm start
```
The client will start on `http://localhost:3000`

#### 6. Verify Installation

Open your browser and navigate to:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api/v1/health`

## Environment Variables

### Server Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | Yes | `development` |
| `PORT` | Server port number | Yes | `5000` |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT signing | Yes | - |
| `JWT_EXPIRE` | JWT expiration time | No | `7d` |
| `CLIENT_URL` | Frontend application URL | Yes | `http://localhost:3000` |
| `SMTP_HOST` | Email server host | No | - |
| `SMTP_PORT` | Email server port | No | `587` |
| `AWS_ACCESS_KEY_ID` | AWS access key for S3 | No | - |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key for S3 | No | - |

### Client Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_API_URL` | Backend API base URL | Yes | `http://localhost:5000/api/v1` |
| `REACT_APP_ENV` | Environment mode | Yes | `development` |

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### Resume Endpoints

#### Create Resume
```http
POST /resumes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Software Engineer Resume",
  "template": "modern",
  "personalInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1-234-567-8900",
    "location": "San Francisco, CA",
    "linkedin": "linkedin.com/in/johndoe",
    "github": "github.com/johndoe"
  },
  "summary": "Experienced software engineer...",
  "experience": [
    {
      "company": "Tech Corp",
      "position": "Senior Software Engineer",
      "location": "San Francisco, CA",
      "startDate": "2020-01",
      "endDate": null,
      "current": true,
      "description": "Led development of..."
    }
  ],
  "education": [
    {
      "institution": "University of California",
      "degree": "Master of Science",
      "field": "Computer Science",
      "startDate": "2018-09",
      "endDate": "2020-05",
      "gpa": "3.8"
    }
  ],
  "skills": [
    {
      "name": "JavaScript",
      "level": "Expert"
    },
    {
      "name": "React",
      "level": "Advanced"
    }
  ]
}

Response: 201 Created
{
  "success": true,
  "data": {
    "resume": {
      "id": "507f1f77bcf86cd799439012",
      "title": "Software Engineer Resume",
      "createdAt": "2024-01-28T10:30:00Z",
      ...
    }
  }
}
```

#### Get All Resumes
```http
GET /resumes
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "count": 3,
  "data": {
    "resumes": [
      {
        "id": "507f1f77bcf86cd799439012",
        "title": "Software Engineer Resume",
        "template": "modern",
        "updatedAt": "2024-01-28T10:30:00Z"
      },
      ...
    ]
  }
}
```

#### Get Single Resume
```http
GET /resumes/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "resume": {
      "id": "507f1f77bcf86cd799439012",
      "title": "Software Engineer Resume",
      "personalInfo": {...},
      "experience": [...],
      ...
    }
  }
}
```

#### Update Resume
```http
PUT /resumes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Resume Title",
  "summary": "Updated summary..."
}

Response: 200 OK
{
  "success": true,
  "data": {
    "resume": {
      "id": "507f1f77bcf86cd799439012",
      ...updated fields
    }
  }
}
```

#### Delete Resume
```http
DELETE /resumes/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Resume deleted successfully"
}
```

#### Export Resume as PDF
```http
GET /resumes/:id/export/pdf
Authorization: Bearer <token>

Response: 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="resume.pdf"
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here",
  "statusCode": 400
}
```

Common status codes:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  role: String (default: 'user'),
  isEmailVerified: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Resume Model

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  title: String (required),
  template: String (default: 'modern'),
  
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    website: String,
    profileImage: String
  },
  
  summary: String,
  
  experience: [{
    company: String,
    position: String,
    location: String,
    startDate: Date,
    endDate: Date,
    current: Boolean,
    description: String,
    achievements: [String]
  }],
  
  education: [{
    institution: String,
    degree: String,
    field: String,
    location: String,
    startDate: Date,
    endDate: Date,
    gpa: String,
    achievements: [String]
  }],
  
  skills: [{
    name: String,
    level: String, // Beginner, Intermediate, Advanced, Expert
    category: String
  }],
  
  projects: [{
    name: String,
    description: String,
    technologies: [String],
    link: String,
    github: String,
    startDate: Date,
    endDate: Date
  }],
  
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    expiryDate: Date,
    credentialId: String,
    link: String
  }],
  
  languages: [{
    name: String,
    proficiency: String // Native, Fluent, Intermediate, Basic
  }],
  
  customSections: [{
    title: String,
    content: String
  }],
  
  settings: {
    colorScheme: String,
    fontSize: Number,
    fontFamily: String,
    spacing: String
  },
  
  isPublic: Boolean (default: false),
  views: Number (default: 0),
  downloads: Number (default: 0),
  
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Components

### Key Components Overview

#### ResumeEditor
Main editor component that manages the resume editing interface.

```typescript
interface ResumeEditorProps {
  resumeId?: string;
  onSave?: (resume: Resume) => void;
  onCancel?: () => void;
}
```

#### ResumePreview
Real-time preview component that displays the formatted resume.

```typescript
interface ResumePreviewProps {
  resume: Resume;
  template: TemplateType;
  scale?: number;
}
```

#### TemplateSelector
Component for selecting and previewing resume templates.

```typescript
interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
}
```

## Deployment

### Docker Deployment

#### Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Individual Docker Commands

```bash
# Build server image
docker build -t resume-builder-server ./server

# Build client image
docker build -t resume-builder-client ./client

# Run server container
docker run -d -p 5000:5000 --env-file ./server/.env resume-builder-server

# Run client container
docker run -d -p 3000:3000 resume-builder-client
```

### Cloud Deployment

#### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create resume-builder-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret

# Deploy
git push heroku main
```

#### AWS (EC2 + MongoDB Atlas)

1. Launch EC2 instance
2. Install Node.js and Git
3. Clone repository
4. Set up environment variables
5. Install PM2: `npm install -g pm2`
6. Start application: `pm2 start server/src/server.ts --name resume-builder`
7. Configure Nginx as reverse proxy

#### Vercel (Frontend) + Render (Backend)

**Frontend (Vercel):**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd client
vercel
```

**Backend (Render):**
1. Connect GitHub repository
2. Set up environment variables
3. Deploy from Render dashboard

## Testing

### Running Tests

**Backend Tests:**
```bash
cd server

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- authController.test.ts
```

**Frontend Tests:**
```bash
cd client

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Test Structure

```
server/tests/
├── unit/
│   ├── controllers/
│   ├── services/
│   └── utils/
└── integration/
    ├── auth.test.ts
    └── resume.test.ts

client/src/
└── __tests__/
    ├── components/
    ├── pages/
    └── utils/
```

## Contributing

Contributions are welcome! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

### Code Review Process

1. All submissions require review
2. CI/CD checks must pass
3. At least one approval required
4. Maintainers will merge approved PRs

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Tarun Kalva

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## Author

**Tarun Kalva**

- Master of Science in Computer Science
- Full Stack Developer specializing in MERN stack
- GitHub: [@tarunkalva14](https://github.com/tarunkalva14)
- LinkedIn: [Add Your LinkedIn URL]
- Email: [Your Email]

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by modern resume building platforms
- Built with best practices from industry leaders
- Special thanks to the open-source community

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/tarunkalva14/resume-builder/issues) page
2. Create a new issue with detailed description
3. Join our community discussions

## Roadmap

### Version 1.0 (Current)
- ✅ Basic resume creation and editing
- ✅ Multiple templates
- ✅ PDF export
- ✅ User authentication

### Version 1.1 (Planned)
- ⏳ AI-powered content suggestions
- ⏳ Resume analytics dashboard
- ⏳ Collaborative editing
- ⏳ LinkedIn import

### Version 2.0 (Future)
- 📋 Cover letter builder
- 📋 Interview preparation tools
- 📋 Job application tracking
- 📋 ATS optimization checker

---

**Built with ❤️ by Tarun Kalva**

*Last Updated: January 28, 2026*
