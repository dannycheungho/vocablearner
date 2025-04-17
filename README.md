# VocabLearner - Vocabulary Learning App

![VocabLearner Screenshot](https://github.com/dannycheungho/vocablearner/blob/master/vocab-app/blob/main.png?raw=true)

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

📚 **Daily Vocabulary Tracking**
- Add new vocabulary words with English/Chinese pairs
- Organize words by date
- Toggle between "Study Mode" (hide translations) and "Show Meanings"

🗓 **Calendar Integration**
- Browse vocabulary by date
- Intuitive date selection sidebar

🔐 **Secure Authentication**
- Google Sign-In integration
- Protected routes
- Automatic token refresh

⚡ **Realtime Updates**
- Instant sync across devices
- Offline support with Firestore persistence

## Technologies

### Frontend
- React.js
- Firebase Authentication
- Firestore Database
- Axios for API calls
- CSS Modules for styling
- React Router for navigation

### Backend
- Node.js
- Express.js
- Firebase Admin SDK
- Firestore Database
- CORS middleware

## Setup

### Prerequisites
- Node.js (v16+)
- Firebase project
- Google Cloud credentials

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vocablearner.git
   cd vocablearner
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Frontend
   cd client
   npm install
   
   # Backend
   cd ../server
   npm install
   ```

3. Set up environment variables (see [Configuration](#configuration))

## Configuration

### Frontend (`.env.local`)
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1234567890
REACT_APP_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
REACT_APP_FIREBASE_MEASUREMENT_ID=G-ABCDEF1234
REACT_APP_API_URL=http://localhost:5000
```

### Backend (`.env`)
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyourkey\n-----END PRIVATE KEY-----"
FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com
PORT=5000
```

## Usage

### Development
1. Start backend server:
   ```bash
   cd server
   npm start
   ```

2. Start frontend development server:
   ```bash
   cd client
   npm start
   ```

3. Open `http://localhost:3000` in your browser

### Production Build
```bash
cd client
npm run build
```

## Deployment

### Option 1: Firebase Hosting
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Deploy:
   ```bash
   firebase login
   firebase init
   firebase deploy
   ```

### Option 2: Vercel/Netlify
- Connect your Git repository
- Set environment variables
- Deploy!

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Created by [Danny Cheung]** - Feel free to contact me at [cheungkahoforwork@example.com]
