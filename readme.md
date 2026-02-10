# AI Guruji - AI-Powered Career Guidance Platform

A modern, intelligent career counseling platform designed to help students discover their ideal career path through personalized assessments and AI-driven insights.

**Status:** Completely rebuilt with clean white theme, local SQLite database, and improved UX.

## Features

- **Clean White Theme**: Modern, minimalist design for easy navigation
- **Local SQLite Database**: All data stored locally without external dependencies
- **Assessment System**: Multiple career assessment tests (Interest, Aptitude, Non-Conventional)
- **AI Career Recommendations**: Personalized career suggestions based on assessment results
- **User Authentication**: Secure email/password authentication
- **Dashboard**: Track your progress and view personalized recommendations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Framer Motion for animations
- Chart.js for data visualization
- Lucide React for icons

### Backend
- Express.js server
- SQLite3 database
- bcryptjs for password hashing
- CORS for cross-origin requests

### State Management
- Zustand for client-side state
- React Router for navigation

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ai-guruji
```

2. Install dependencies
```bash
npm install
```

### Development

Start both the backend server and frontend dev server:

```bash
npm run dev
```

This command runs:
- Backend server on `http://localhost:5000`
- Frontend dev server on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Server Only

To run just the backend server:
```bash
npm run server
```

## Project Structure

```
ai-guruji/
├── src/
│   ├── pages/          # Page components (Home, Login, Dashboard, etc.)
│   ├── components/     # Reusable UI components
│   ├── store/         # Zustand state management
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── config/        # Configuration files
│   └── data/          # Data files (questions, etc.)
├── server.js          # Express backend server
├── .env               # Environment variables
├── tailwind.config.js # Tailwind CSS configuration
└── package.json       # Dependencies and scripts
```

## Environment Variables

Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:5000
```

## Database

The application uses SQLite3 for local data storage. The database file is automatically created at:
```
data/guruji.db
```

Database includes tables for:
- Users
- Assessment Results
- Career Recommendations
- Sessions

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout user

### Assessments
- `POST /api/assessments/save` - Save assessment results
- `GET /api/assessments/:userId` - Get user assessments

### Recommendations
- `POST /api/recommendations/save` - Save recommendations
- `GET /api/recommendations/:userId` - Get user recommendations

### User Profile
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update user profile

## Scripts

- `npm run dev` - Start development (frontend + backend)
- `npm run server` - Start backend server only
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please open an issue on the GitHub repository.

