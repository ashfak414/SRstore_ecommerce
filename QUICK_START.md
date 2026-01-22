# Quick Start Guide

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

## Firebase Configuration

**IMPORTANT:** Before running the app, you must configure Firebase:

1. Follow the instructions in `FIREBASE_SETUP.md`
2. Update `src/firebase/config.js` with your Firebase credentials

## Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`

## Features Overview

### Pages & Routes
- **Home (`/`)**: Browse all products from the API
- **Login (`/login`)**: Sign in with email/password, Google, or GitHub
- **Register (`/register`)**: Create a new account
- **Dashboard (`/dashboard`)**: Protected route showing user profile and orders
- **Product Details (`/product/:id`)**: Dynamic route showing product details
- **Order Details (`/order/:id`)**: Protected dynamic route showing order information
- **404 Page (`/*`)**: Custom not found page

### Authentication
- Email & Password authentication
- Google Sign-In
- GitHub Sign-In
- Protected routes (Dashboard, Order Details)
- Automatic redirect to login for unauthenticated users

### API Integration
- Uses FakeStore API (https://fakestoreapi.com)
- Fetches products dynamically
- Loading states
- Error handling

## Project Structure

```
react-project/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── PrivateRoute.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── OrderDetails.jsx
│   │   └── NotFound.jsx
│   ├── context/            # React Context
│   │   └── AuthContext.jsx
│   ├── firebase/           # Firebase config
│   │   └── config.js
│   ├── utils/              # Utility functions
│   │   └── api.js
│   ├── styles/             # Global styles
│   │   └── index.css
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── package.json
├── vite.config.js
└── index.html
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Add environment variables if needed

### Vercel
1. Connect your GitHub repository
2. Vercel will auto-detect Vite and deploy
3. Add environment variables in Vercel dashboard

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy --only hosting`

## Troubleshooting

### Firebase Authentication Not Working
- Make sure you've enabled the authentication methods in Firebase Console
- Verify your Firebase config in `src/firebase/config.js`
- Check browser console for errors

### API Not Loading
- Check your internet connection
- Verify the API endpoint is accessible
- Check browser console for CORS errors

### Routes Not Working
- Make sure you're using React Router correctly
- Check that all routes are defined in `App.jsx`
- Verify the base path in `vite.config.js` if deploying to a subdirectory



