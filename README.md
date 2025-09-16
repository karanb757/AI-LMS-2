# 🧠  AI-LMS - Intelligent Learning Management System

A cutting-edge AI-powered Learning Management System built with Next.js that revolutionizes education by generating personalized study materials, flashcards, and quizzes. Transform any topic into comprehensive learning experiences with advanced AI technology.

### ✨ Features

### 🤖 AI-Powered Content Generation

```bash
Smart Course Creation: AI generates complete course outlines from any topic
Personalized Study Materials: Tailored content based on difficulty level and learning goals
Dynamic Content Adaptation: AI adjusts complexity based on user progress
Multi-Format Learning: Notes, flashcards, quizzes, and Q&A sessions
```

### 📚 Comprehensive Study Tools

```bash
Interactive Flashcards: AI-generated flashcards with front/back content
Adaptive Quizzes: Smart quizzes that adjust to your learning pace
Detailed Notes: Chapter-wise comprehensive study materials
Progress Tracking: Monitor your learning journey and achievements
```

### 🎯 Personalized Learning Experience

```bash
Difficulty Levels: Easy, Moderate, and Hard content generation
Learning Purpose: Tailored for exams, job interviews, practice, coding prep
Custom Topics: Support for any subject or specialized field
Adaptive Learning: AI learns from your interactions and preferences
```

### 🌟 Modern Platform Features

```bash
Dark/Light Theme: Seamless theme switching with persistence
Responsive Design: Optimized for all devices and screen sizes
Real-time Updates: Instant content generation and progress tracking
Intuitive Dashboard: Clean, modern interface for easy navigation
```

# 🛠️ Tech Stack

### Frontend

```bash
Next.js 15 - React framework with App Router
React 18 - Modern UI library
Tailwind CSS - Utility-first CSS framework
shadcn/ui - High-quality component library
Lucide React - Beautiful icon system
```

### AI & Content Generation

```bash
Google Gemini API - Advanced AI model for content generation
Custom AI Prompts - Specialized prompts for educational content
JSON Response Processing - Structured AI output handling
```

### Backend & Database

```bash
Neon PostgreSQL - Serverless PostgreSQL database
Drizzle ORM - Type-safe database operations
Inngest - Background job processing for AI generation
```

### Authentication & User Management

```bash
Clerk - Complete authentication and user management
Protected Routes - Secure access to course materials
User Progress Tracking - Individual learning analytics
```

### Additional Services

```bash
EmailJS - Contact form email delivery
Stripe Integration - Payment processing for premium features
UUID Generation - Unique course and content identification
```

# 🚀 Getting Started

### Prerequisites

```bash
Node.js 18+
npm or yarn
Neon Database account
Clerk account
Google Cloud Console account (for Gemini API)
Inngest account
```bash

### Installation
Clone the repository

```bash
bashgit clone https://github.com/yourusername/AI-LMS.git
cd AI-LMS
```

Install dependencies

```bash
bashnpm install
# or
yarn install
```

Environment Setup
Create a .env.local file in the root directory:

env# Clerk Authentication

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database Configuration
NEXT_PUBLIC_DATABASE_CONNECTION_STRING=your_neon_database_url

# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Inngest Configuration
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Stripe (Optional for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# EmailJS (For contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

Database Setup
Run the database migration:

bashnpm run migrate
Database schema includes:

```bash
users: User profiles and membership status
studyMaterial: Course information and metadata
chapterNotes: AI-generated chapter content
studyTypeContent: Flashcards, quizzes, and Q&A content
```

Run the development server

```bash
bashnpm run dev
Open http://localhost:3000 to access the application.
📁 Project Structure
AI-LMS/
├── app/
│   ├── (auth)/                   # Authentication pages
│   ├── api/                      # API routes
│   │   ├── courses/              # Course management
│   │   ├── create-user/          # User creation
│   │   └── study-type/           # Content type handling
│   ├── components/               # Reusable UI components
│   ├── contact/                  # Contact page
│   ├── create/                   # Course creation flow
│   ├── dashboard/                # User dashboard
│   ├── help/                     # FAQ and help pages
│   ├── _context/                 # React context providers
│   ├── globals.css              # Global styles
│   ├── layout.js               # Root layout
│   └── page.js                 # Landing page
├── configs/
│   ├── AiModel.js              # AI model configurations
│   ├── db.js                   # Database connection
│   └── schema.js               # Database schema
├── inngest/
│   ├── client.js               # Inngest client setup
│   └── functions.js            # Background job functions
├── components/ui/              # shadcn/ui components
└── lib/                        # Utility functions
```

### 🔧 Key Features Implementation
AI Content Generation Pipeline

```bash
Course Creation: User selects topic, difficulty, and purpose
AI Processing: Gemini API generates structured course outline
Background Jobs: Inngest processes chapter content generation
Content Storage: Generated content stored in database
Real-time Updates: Users see generation progress and completion
```

Learning Flow

```bash
Course Selection: Browse or create new courses
Content Access: View notes, flashcards, and quizzes
Progress Tracking: Monitor learning achievements
Adaptive Learning: AI adjusts content based on performance
```

Authentication & Security

```bash
Secure user authentication with Clerk
Protected routes for course content
User-specific data isolation
Secure API endpoints
```

🎨 AI Model Integration
Content Generation Types

```bash
Course Outlines: Structured learning paths with chapters
Study Notes: Detailed HTML-formatted educational content
Flashcards: Interactive Q&A cards for memorization
Quizzes: Multiple-choice questions with explanations
```

AI Prompt Engineering

```bash
Specialized prompts for different content types
Difficulty-aware content generation
Educational best practices integration
JSON-structured response handling
```

🚢 Deployment
Vercel Deployment (Recommended)

```
Connect GitHub repository to Vercel
Configure environment variables
Set up Inngest webhook endpoints
Deploy with automatic CI/CD
```

Database Migration

```bash
bashnpx drizzle-kit push:pg
📱 Responsive Design
Optimized for all devices:
```

```bash
Mobile: Touch-friendly interface, swipe gestures
Tablet: Adaptive layouts, improved spacing
Desktop: Full-featured experience, keyboard shortcuts
```

🔒 Security & Privacy

```bash
Data Encryption: All user data encrypted in transit and at rest
Privacy First: Minimal data collection, user consent
Secure APIs: Rate limiting, authentication required
GDPR Compliant: User data management and deletion rights
```

🤝 Contributing

```bash
Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
```

🙏 Acknowledgments

```bash
Next.js for the powerful React framework
Google Gemini for advanced AI capabilities
Clerk for seamless authentication
Neon for serverless PostgreSQL
Inngest for reliable background jobs
shadcn/ui for beautiful components
```

Made with ❤️ by Karan757 - Transforming education through AI
