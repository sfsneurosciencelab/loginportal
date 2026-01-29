// Firebase Configuration
// REPLACE these values with your actual Firebase project configuration

const firebaseConfig = {
    apiKey: "AIzaSyCti09GXDZ93-o5Rw1dq_Ez2osfeoeMBtc",
    authDomain: "sfs-portal-1dcf8.firebaseapp.com",
    projectId: "sfs-portal-1dcf8",
    storageBucket: "sfs-portal-1dcf8.firebasestorage.app",
    messagingSenderId: "957170204012",
    appId: "1:957170204012:web:06b62261ead361b6594749"
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
