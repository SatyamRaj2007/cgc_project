# cgc_project
it's time to create something big.


# 🎓 CGC Smart Campus - AI-Powered Campus Management Platform

<div align="center">

![CGC Smart Campus](https://img.shields.io/badge/CGC-Smart%20Campus-00f5ff?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-emerald?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

**A next-generation AI-powered platform for CGC Mohali students**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**CGC Smart Campus** is a comprehensive, AI-powered web application designed specifically for students of CGC Mohali. The platform integrates cutting-edge technologies to provide a seamless campus experience, combining academic management, AI assistance, campus navigation, community features, and more.

### 🎯 Key Highlights

- **AI-Powered Learning Assistant** using Google Gemini API
- **Interactive Campus Map** with real-time navigation
- **Smart Community Hub** for lost & found, ride sharing, and marketplace
- **Intelligent Study Planner** with personalized schedules
- **Secure Issue Reporting** system with privacy protection
- **Voice-Enabled Chatbot** for hands-free interaction
- **Document Analysis** with file upload support
- **Modern Glassmorphic UI** with smooth animations

---

## ✨ Features

### 🤖 AI-Powered Features

#### 1. **AI Chatbot (Gemini Integration)**
- Academic explanations and programming help
- Campus information and guidance
- Real-time conversation with typing animations
- Quick suggestion buttons for common queries
- Conversation history tracking

#### 2. **File & Image Upload in Chatbot**
- Upload PDFs, images, documents, and screenshots
- AI summarizes lecture notes
- Explains code from screenshots
- Extracts text from images
- Answers questions based on uploaded files

#### 3. **Voice Assistant**
- Speech-to-text input using Web Speech API
- Voice query processing
- AI responses spoken aloud
- Microphone button with visual feedback

#### 4. **AI Study Planner**
- Personalized study schedules based on exam dates
- Daily task breakdown
- Topic prioritization
- Revision plan generation
- Progress tracking

#### 5. **AI Text Summarizer**
- Summarize notes, articles, and lecture content
- Generate bullet points and key takeaways
- PDF content extraction and summarization

#### 6. **AI Visual Campus Search**
- Upload photos of campus buildings
- AI identifies building name and description
- Displays location on interactive map
- Provides facility information

#### 7. **Smart Campus Alerts**
- Attendance warnings
- Exam reminders
- Event recommendations
- Personalized study suggestions

### 🗺️ Campus Navigation

#### Interactive Campus Map
- **OpenStreetMap** integration with **Leaflet.js**
- Accurate CGC Mohali campus layout
- Interactive markers for all key locations:
  - Library
  - Academic Blocks
  - Labs
  - Hostels
  - Cafeteria
  - Sports Complex
  - Event Areas

#### Real-Time Walking Navigation
- Detect user's current location
- Calculate walking routes using **OpenRouteService API**
- Display route path, distance, and estimated time
- Example: "Library is 300 meters away — 4 minute walk"

### 🏛️ Academic Management

- **Attendance Tracking** with alerts
- **Results Dashboard** with performance charts
- **GPA/CGPA Calculator**
- **Assignment Management**
- **Class Schedule** overview
- **Subject-wise Analytics** using Recharts

### 🎉 Events Management

- Event calendar with search functionality
- Event registration system
- Category-based filtering (Academic, Cultural, Sports, Technical)
- Event cards with date, location, and details
- Maximum participant tracking

### 🌐 Campus Connect (Community Hub)

#### 🔍 Lost & Found
- Report lost items with photo upload
- Report found items with location
- Camera integration for instant photos
- AI object detection from images
- Status tracking (Active/Resolved)

#### 🚗 Ride Sharing
- Share rides between campus and city
- Pickup and drop location selection
- Date, time, and available seats
- Join ride functionality
- Real-time seat availability

#### 🛒 Student Marketplace (Buy & Sell)
- Sell books, electronics, furniture, bicycles
- Upload product images
- Set price and category
- Contact seller directly
- Condition tracking (New/Used)

### 📝 Issue Reporting System

- **Secure complaint system** for college authorities
- Categories: Hostel, Academics, Infrastructure, Transport, Cafeteria
- **Privacy-first design**: Student identity hidden from other students
- Only authorized admins can see reporter details
- Status tracking: Pending → Under Review → Resolved
- Optional image upload for evidence
- Admin response system

### 🎨 Premium UI/UX

- **Modern Glassmorphism Design**
- **Color Palette**:
  - Black background
  - Neon Blue (#00f5ff) primary highlights
  - Emerald Green secondary highlights
  - White text
- **Framer Motion** animations
- Glow borders and rounded cards
- Interactive hover effects
- Smooth transitions
- Skeleton loading states
- Apple/Tesla-inspired interface

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js** | UI framework |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations and transitions |
| **Leaflet.js** | Interactive maps |
| **Recharts** | Data visualization |
| **Lucide React** | Modern icons |
| **Axios** | HTTP client |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication |
| **Bcrypt.js** | Password hashing |

### AI & APIs
| Service | Purpose |
|---------|---------|
| **Google Gemini API** | AI chatbot and analysis |
| **Web Speech API** | Voice recognition |
| **OpenStreetMap** | Campus mapping |
| **OpenRouteService API** | Navigation routing |

### File Management
| Technology | Purpose |
|------------|---------|
| **Multer** | File upload handling |
| **Cloudinary** | Cloud storage |

### Security
| Technology | Purpose |
|------------|---------|
| **Helmet** | HTTP headers security |
| **Express Rate Limit** | API rate limiting |
| **CORS** | Cross-origin resource sharing |
| **Express Validator** | Input validation |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (React.js)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Landing  │  │Dashboard │  │ AI Chat  │  │  Campus  │   │
│  │   Page   │  │ Explorer │  │   Bot    │  │   Map    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Events  │  │ Campus   │  │  Issues  │  │ Results  │   │
│  │          │  │ Connect  │  │          │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ REST API
┌─────────────────────────────────────────────────────────────┐
│                   SERVER (Node.js/Express)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │    AI    │  │  Events  │  │ Campus   │   │
│  │  Routes  │  │  Routes  │  │  Routes  │  │ Connect  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │  Issues  │  │Academics │  │  Study   │                  │
│  │  Routes  │  │  Routes  │  │ Planner  │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE (MongoDB)                      │
│  Users | Events | CampusPosts | Issues | AcademicRecords   │
│  StudyPlans | ChatFiles | Conversations                     │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│  Gemini AI | Cloudinary | OpenRouteService | OpenStreetMap │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (v5 or higher)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/cgc-smart-campus.git
cd cgc-smart-campus
```

### Step 2: Install Backend Dependencies

```bash
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

### Step 4: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/cgc-smart-campus

# JWT Secret (Generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Gemini AI API
GEMINI_API_KEY=your_gemini_api_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# OpenRouteService API
OPENROUTE_API_KEY=your_openroute_api_key

# Frontend URL
CLIENT_URL=http://localhost:3000
```

### Step 5: Start MongoDB

```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

### Step 6: Run the Application

#### Development Mode (Both servers)

```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
npm run client
```

#### Production Mode

```bash
# Build frontend
cd client
npm run build
cd ..

# Start server
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## ⚙️ Configuration

### Obtaining API Keys

#### 1. Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key to your `.env` file

#### 2. Cloudinary Configuration
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret
4. Add to `.env` file

#### 3. OpenRouteService API Key
1. Register at [OpenRouteService](https://openrouteservice.org/)
2. Go to Dashboard → Tokens
3. Create a new token
4. Copy to `.env` file

### Database Setup

The application will automatically create collections on first run. To seed initial data:

```bash
npm run seed
```

---

## 📖 Usage

### For Students

#### 1. **Registration & Login**
- Navigate to the landing page
- Click "Get Started"
- Fill in registration form with:
  - Username
  - Email
  - Password
  - Department
  - Semester
- Login with credentials

#### 2. **Using AI Chatbot**
- Click on AI Assistant icon
- Type your question or click quick suggestions
- Upload files/images for analysis
- Use microphone for voice queries

#### 3. **Campus Navigation**
- Open Campus Map
- Click on any building marker
- Click "Navigate" to get walking directions
- Follow the route on the map

#### 4. **Creating Posts in Campus Connect**

**Lost & Found:**
```
1. Go to Campus Connect → Lost & Found
2. Click "Report Lost" or "Report Found"
3. Fill in item details
4. Upload photo (optional)
5. Submit
```

**Ride Sharing:**
```
1. Go to Campus Connect → Ride Share
2. Click "Offer Ride"
3. Enter pickup/drop locations
4. Set date, time, and available seats
5. Post ride
```

**Marketplace:**
```
1. Go to Campus Connect → Marketplace
2. Click "Sell Item"
3. Add item details and price
4. Upload images
5. Publish listing
```

#### 5. **Reporting Issues**
- Navigate to Issue Reporting
- Select category
- Describe the issue
- Upload evidence (optional)
- Submit (your identity remains private)

#### 6. **Study Planning**
- Go to AI Study Planner
- Enter subjects and exam date
- Add study goals
- Generate personalized plan
- Track daily progress

### For Administrators

#### 1. **Managing Issues**
- Login with admin credentials
- View all reported issues
- See student details (private)
- Update issue status
- Add admin response

#### 2. **Event Management**
- Create new events
- Set date, location, category
- Upload event images
- Track registrations

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@cgc.edu",
  "password": "securepass123",
  "department": "Computer Science",
  "semester": 5
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@cgc.edu",
  "password": "securepass123"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": { ... }
}
```

### AI Endpoints

#### Chat with AI
```http
POST /api/ai/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Explain binary search algorithm"
}

Response:
{
  "success": true,
  "response": "Binary search is a divide-and-conquer algorithm..."
}
```

#### Upload File to Chat
```http
POST /api/ai/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <file_data>

Response:
{
  "success": true,
  "fileUrl": "https://cloudinary.com/...",
  "analysis": "AI analysis of the file..."
}
```

#### Generate Study Plan
```http
POST /api/study-planner/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "subjects": ["Data Structures", "DBMS", "OS"],
  "examDate": "2024-05-15",
  "studyGoals": "Score above 85%"
}

Response:
{
  "success": true,
  "plan": {
    "dailySchedule": [...],
    "generatedPlan": "..."
  }
}
```

### Campus Connect Endpoints

#### Create Post (Lost/Found/Ride/Sell)
```http
POST /api/campus-connect/posts
Authorization: Bearer <token>
Content-Type: multipart/form-data

type: "lost"
title: "Lost Black Backpack"
description: "Lost near library"
location: "Library Block"
image: <file>
```

#### Get All Posts
```http
GET /api/campus-connect/posts?type=lost&status=active
Authorization: Bearer <token>

Response:
{
  "success": true,
  "posts": [...]
}
```

### Issue Endpoints

#### Report Issue
```http
POST /api/issues
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Hostel WiFi Not Working",
  "description": "WiFi has been down for 2 days",
  "category": "hostel"
}
```

#### Get My Issues
```http
GET /api/issues/my-issues
Authorization: Bearer <token>

Response:
{
  "success": true,
  "issues": [...]
}
```

### Event Endpoints

#### Get All Events
```http
GET /api/events?category=technical
Authorization: Bearer <token>
```

#### Register for Event
```http
POST /api/events/:eventId/register
Authorization: Bearer <token>
```

### Academic Endpoints

#### Get Academic Records
```http
GET /api/academics/records
Authorization: Bearer <token>

Response:
{
  "success": true,
  "records": {
    "subjects": [...],
    "gpa": 8.5,
    "attendance": 78
  }
}
```

---

## 📁 Project Structure

```
cgc-smart-campus/
├── client/                      # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── AIChat.jsx
│   │   │   ├── CampusMap.jsx
│   │   │   └── ...
│   │   ├── pages/               # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Events.jsx
│   │   │   └── ...
│   │   ├── context/             # React context
│   │   │   └── AuthContext.jsx
│   │   ├── utils/               # Utility functions
│   │   │   ├── api.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
│
├── models/                      # Mongoose schemas
│   ├── User.js
│   ├── Event.js
│   ├── CampusPost.js
│   ├── Issue.js
│   ├── AcademicRecord.js
│   ├── StudyPlan.js
│   └── ChatFile.js
│
├── routes/                      # Express routes
│   ├── auth.js
│   ├── ai.js
│   ├── events.js
│   ├── campusConnect.js
│   ├── issues.js
│   ├── academics.js
│   └── studyPlanner.js
│
├── middleware/                  # Custom middleware
│   ├── auth.js
│   ├── upload.js
│   └── validation.js
│
├── config/                      # Configuration files
│   ├── db.js
│   ├── cloudinary.js
│   └── gemini.js
│
├── utils/                       # Backend utilities
│   └── helpers.js
│
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
├── server.js                    # Entry point
└── README.md
```

---

## 🔒 Security Features

- **JWT Authentication** with secure token storage
- **Password Hashing** using bcrypt (12 rounds)
- **Rate Limiting** to prevent API abuse
- **Helmet.js** for HTTP header security
- **Input Validation** using express-validator
- **CORS Configuration** for cross-origin security
- **Privacy Protection** in issue reporting system
- **Role-Based Access Control** (Student/Admin)
- **File Upload Validation** (type, size limits)

---

## 🎨 UI Components

### Color Palette
```css
--bg-primary: #0a0a0a
--neon-blue: #00f5ff
--emerald-green: #10b981
--text-primary: #ffffff
--glass-bg: rgba(255, 255, 255, 0.05)
--glass-border: rgba(255, 255, 255, 0.1)
```

### Key Design Elements
- Glassmorphism cards with backdrop blur
- Neon glow effects on hover
- Smooth Framer Motion animations
- Gradient text effects
- Rounded corners (20px)
- Shadow depth for elevation

---

## 🧪 Testing

### Run Tests
```bash
# Backend tests
npm test

# Frontend tests
cd client
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

---

## 🚢 Deployment

### Deploy to Production

#### Backend (Heroku/Railway/Render)
```bash
# Build
npm run build

# Deploy
git push heroku main
```

#### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist folder
```

### Environment Variables
Ensure all production environment variables are set:
- Use strong JWT_SECRET
- Set NODE_ENV=production
- Configure production MongoDB URI
- Add production CLIENT_URL

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use ESLint configuration
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**CGC Smart Campus Development Team**

- Project Lead: [Your Name]
- Backend Developer: [Name]
- Frontend Developer: [Name]
- UI/UX Designer: [Name]
- AI Integration: [Name]

---

## 📞 Support

For support, email support@cgc-smartcampus.edu or join our Slack channel.

---

## 🙏 Acknowledgments

- CGC Mohali for project support
- Google Gemini AI team
- OpenStreetMap contributors
- React and Node.js communities

---

## 📊 Project Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

**Current Version:** 1.0.0  
**Last Updated:** March 2026  
**Status:** Production Ready ✅

---

## 🗺️ Roadmap

### Phase 1 (Completed) ✅
- Core authentication system
- AI chatbot integration
- Campus map with navigation
- Campus Connect features
- Issue reporting system

### Phase 2 (In Progress) 🚧
- Mobile app development
- Push notifications
- Advanced analytics dashboard
- Integration with college ERP

### Phase 3 (Planned) 📋
- AR campus tour
- Blockchain-based certificates
- Advanced AI tutoring
- Multi-language support

---

<div align="center">

**Made with ❤️ for CGC Mohali Students**

[⬆ Back to Top](#-cgc-smart-campus---ai-powered-campus-management-platform)

</div>
