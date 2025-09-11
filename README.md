# ClassClear 📚

**ClassClear** is an intelligent syllabus management platform that revolutionizes how students organize and track their academic coursework. By leveraging AI-powered document processing, ClassClear automatically extracts and organizes important information from course syllabi, making academic planning effortless and efficient.

## 🎯 What is ClassClear?

ClassClear is a comprehensive web application designed to solve the common problem students face when managing multiple course syllabi. Instead of manually tracking deadlines, grading policies, and course information across different documents, ClassClear uses advanced AI technology to automatically process and organize this information into a centralized, user-friendly dashboard.

### Key Features

- **🤖 AI-Powered Syllabus Processing**: Upload PDF syllabi or paste text content, and our AI automatically extracts course information, deadlines, grading policies, and attendance requirements
- **📅 Smart Deadline Management**: Automatically extracted deadlines are organized by category (Homework, Exams, Projects) with sorting and filtering capabilities
- **📚 Course Organization**: Centralized view of all courses with detailed information including instructor details, university affiliation, and course policies
- **🔐 Secure Authentication**: Multiple sign-in options including email/password, Google OAuth, and Discord OAuth
- **📱 Responsive Design**: Fully responsive interface that works seamlessly on desktop and mobile devices
- **🎨 Modern UI/UX**: Built with modern design principles using Tailwind CSS and Radix UI components
- **⚡ Real-time Updates**: Live data synchronization across all components

## 🏗️ How It Was Built

### Frontend Architecture

**Technology Stack:**
- **React 18** - Modern React with hooks and functional components
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Radix UI** - Accessible, unstyled UI components
- **React Router** - Client-side routing for single-page application navigation
- **React Hook Form + Zod** - Form validation and management
- **GSAP** - Professional-grade animations and transitions
- **Lucide React** - Beautiful, customizable icons

**Key Components:**
- **Landing Page**: Animated hero section with GSAP-powered text animations
- **Dashboard**: Grid-based layout with course management and deadline tracking
- **Course Management**: File upload with PDF processing and text input options
- **Deadline Manager**: Sortable data table with real-time updates
- **Authentication**: Secure login/signup with OAuth integration

### Backend Architecture

**Technology Stack:**
- **Node.js + Express** - RESTful API server
- **PostgreSQL** - Robust relational database for data persistence
- **JWT Authentication** - Secure token-based authentication with refresh tokens
- **Passport.js** - Flexible authentication middleware with multiple strategies
- **OpenAI GPT-4o-mini** - AI-powered document processing and information extraction
- **bcrypt** - Secure password hashing
- **CORS** - Cross-origin resource sharing configuration

**API Endpoints:**
- `/login`, `/signup` - User authentication
- `/auth/google`, `/auth/discord` - OAuth authentication flows
- `/courses` - Course management (add, retrieve, delete)
- `/deadlines` - Deadline management (add, retrieve, delete)
- `/universitynames` - University name autocomplete

### Database Schema

The application uses three main tables:

1. **users** - Stores user authentication information
2. **syllabus_metadata** - Stores course information and policies
3. **deadlines** - Stores extracted deadlines with categories and due dates

### AI Integration

ClassClear leverages OpenAI's GPT-4o-mini model to intelligently process syllabus documents:

1. **Document Processing**: Supports both PDF uploads and text input
2. **Information Extraction**: Automatically identifies and extracts:
   - Course names and instructor information
   - Assignment deadlines by category (Homework, Exams, Projects)
   - Grading policies and weightings
   - Attendance requirements
   - Office hours and additional course information
3. **Structured Output**: Returns organized JSON data for seamless database integration

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js** (v16 or higher) and npm installed
- **PostgreSQL** database server
- **OpenAI API Key** for AI document processing
- **Google OAuth Credentials** (optional, for Google sign-in)
- **Discord OAuth Credentials** (optional, for Discord sign-in)

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
PG_USER=your_postgres_username
PG_HOST=localhost
PG_DATABASE=classclear_db
PG_PASSWORD=your_postgres_password
PG_PORT=5432

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
SESSION_SECRET=your_session_secret

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# OAuth Configuration (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
GOOGLE_FILLER_PASSWORD=your_google_filler_password
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_SECRET=your_discord_client_secret
DISCORD_FILLER_PASSWORD=your_discord_filler_password
```

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ClassClear.git
   cd ClassClear
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Database**
   ```bash
   # Create PostgreSQL database and run the schema from src/utils/queries.sql
   psql -U your_username -d classclear_db -f src/utils/queries.sql
   ```

4. **Start the Development Server**
   ```bash
   # Terminal 1: Start the backend server
   npm run server
   
   # Terminal 2: Start the frontend development server
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 📱 Usage

1. **Sign Up**: Create an account using email/password or OAuth providers
2. **Add Courses**: Upload syllabus PDFs or paste text content
3. **View Dashboard**: See all courses and extracted deadlines in an organized layout
4. **Manage Deadlines**: Add, edit, or delete deadlines manually
5. **Track Progress**: Monitor upcoming assignments and course requirements

## 🛠️ Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run server` - Start the Express backend server
- `npm run lint` - Run ESLint for code quality checks

## 🏛️ Project Structure

```
ClassClear/
├── public/                 # Static assets
├── server/                 # Backend Express server
│   └── server.js          # Main server file with all API routes
├── src/                   # Frontend React application
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components (Radix UI)
│   │   ├── LandingComp/  # Landing page components
│   │   ├── SideBarComp/  # Navigation components
│   │   ├── CoursesComp/  # Course management components
│   │   └── DashBoardComp/ # Dashboard components
│   ├── pages/            # Main application pages
│   ├── utils/            # Utilities and context providers
│   └── lib/              # Helper functions and configurations
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- Calendar integration for deadline visualization
- Mobile app development
- Team collaboration features
- Advanced analytics and progress tracking
- Integration with popular LMS platforms
- Notification system for upcoming deadlines

---

**ClassClear** - Making academic organization effortless through intelligent automation.
