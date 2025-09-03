# PopX Authentication App

A modern React-based authentication system with login, signup, and user profile management. Built with React, React Router, and Tailwind CSS.

## 🚀 Features

- **User Registration**: Complete signup flow with form validation
- **User Authentication**: Secure login system with session management
- **Protected Routes**: Route protection based on authentication status
- **User Profile**: Personalized user dashboard
- **Form Validation**: Real-time form validation with error handling
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Session Persistence**: User session maintained across browser sessions

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Storage**: Session Storage
- **Build Tool**: Vite

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd popx-auth-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Open your browser
Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📁 Project Structure

```
src/
├── context/
│   └── AuthContext.jsx     # Authentication context and state management
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Login.jsx          # User login page
│   ├── Signup.jsx         # User registration page
│   └── Profile.jsx        # User profile dashboard
├── App.jsx                # Main app component with routing
├── main.jsx              # Application entry point
└── index.css             # Global styles
```

## 🔐 Authentication Flow

The app implements a complete authentication system with user registration, login, and session management using React Context API and session storage for data persistence.

## 🚧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Happy Coding! 🚀**