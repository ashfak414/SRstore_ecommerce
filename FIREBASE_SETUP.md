# Firebase Setup Instructions

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## Step 2: Enable Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click **Get Started**
3. Enable the following sign-in methods:
   - **Email/Password**: Click on it and enable it, then click Save
   - **Google**: Click on it, enable it, add your project support email, and click Save
   - **GitHub**: Click on it, enable it, you'll need to:
     - Create a GitHub OAuth App at https://github.com/settings/developers
     - Add the Client ID and Client Secret to Firebase
     - Add authorized redirect URIs

## Step 3: Get Your Firebase Config

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select **Project settings**
3. Scroll down to "Your apps" section
4. Click the web icon `</>` to add a web app
5. Register your app (you can skip hosting for now)
6. Copy the `firebaseConfig` object

## Step 4: Update Your Config File

Open `src/firebase/config.js` and replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",           // Your API Key
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 5: Configure GitHub OAuth (Optional but Required for GitHub Login)

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Your app name
   - **Homepage URL**: http://localhost:3000 (for development)
   - **Authorization callback URL**: 
     - For development: `http://localhost:3000`
     - For production: Your deployed URL
4. Copy the **Client ID** and **Client Secret**
5. In Firebase Console → Authentication → Sign-in method → GitHub:
   - Paste the Client ID and Client Secret
   - Add authorized redirect URIs from Firebase (shown in the GitHub provider settings)

## Testing

After configuration, you should be able to:
- Register with email/password
- Login with email/password
- Login with Google
- Login with GitHub



