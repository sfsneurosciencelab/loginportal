// Firebase Configuration
// REPLACE these values with your actual Firebase project configuration

const firebaseConfig = {
    apiKey: "AIzaSyBBZGr2ItLEqprfDRJIyqsqs3Rv-zBKfUo",
    authDomain: "sfs-3cf80.firebaseapp.com",
    projectId: "sfs-3cf80",
    storageBucket: "sfs-3cf80.firebasestorage.app",
    messagingSenderId: "192226022006",
    appId: "1:192226022006:web:032fd3021c7a7e9b8f0557"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// GitHub configuration
// IMPORTANT: Replace with your actual GitHub username and repository name
const GITHUB_USERNAME = "YOUR_GITHUB_USERNAME";  // e.g., "johndoe"
const GITHUB_REPO = "YOUR_REPO_NAME";            // e.g., "user-portal"
const GITHUB_BRANCH = "main";                     // Usually "main" or "master"
