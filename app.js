// DOM Elements
const loginSection = document.getElementById('loginSection');
const portalSection = document.getElementById('portalSection');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const userEmail = document.getElementById('userEmail');
const filesList = document.getElementById('filesList');

// Check if user is already logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is logged in
        showPortal(user);
    } else {
        // User is logged out
        showLogin();
    }
});

// Login Form Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    loginError.textContent = '';
    
    try {
        // Sign in with Firebase
        await auth.signInWithEmailAndPassword(email, password);
        // Success - onAuthStateChanged will handle the redirect
    } catch (error) {
        // Show error message
        let errorMessage = 'Login failed. Please check your credentials.';
        
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No account found with this email.';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address.';
        } else if (error.code === 'auth/too-many-requests') {
            errorMessage = 'Too many failed attempts. Please try again later.';
        }
        
        loginError.textContent = errorMessage;
    }
});

// Logout Handler
logoutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
        showLogin();
    } catch (error) {
        console.error('Logout error:', error);
    }
});

// Show Login Section
function showLogin() {
    loginSection.style.display = 'block';
    portalSection.style.display = 'none';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    loginError.textContent = '';
}

// Show Portal Section
function showPortal(user) {
    loginSection.style.display = 'none';
    portalSection.style.display = 'block';
    userEmail.textContent = user.email;
    
    // Load files
    loadFiles();
}

// Load Files from Firestore
async function loadFiles() {
    try {
        filesList.innerHTML = '<p class="loading">Loading files...</p>';
        
        // Get files from Firestore
        const filesSnapshot = await db.collection('files').orderBy('uploadedAt', 'desc').get();
        
        if (filesSnapshot.empty) {
            filesList.innerHTML = '<p class="no-files">No files available yet.</p>';
            return;
        }
        
        // Clear loading message
        filesList.innerHTML = '';
        
        // Display each file
        filesSnapshot.forEach((doc) => {
            const fileData = doc.data();
            const fileItem = createFileItem(fileData);
            filesList.appendChild(fileItem);
        });
        
    } catch (error) {
        console.error('Error loading files:', error);
        filesList.innerHTML = '<p class="error-message">Error loading files. Please refresh the page.</p>';
    }
}

// Create File Item HTML Element
function createFileItem(fileData) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    // Get file extension
    const fileExtension = fileData.fileName.split('.').pop().toUpperCase();
    
    // Format file size
    const fileSize = formatFileSize(fileData.fileSize || 0);
    
    // Format upload date
    const uploadDate = fileData.uploadedAt ? 
        new Date(fileData.uploadedAt.seconds * 1000).toLocaleDateString() : 
        'Unknown';
    
    fileItem.innerHTML = `
        <div class="file-info">
            <div class="file-icon">${fileExtension}</div>
            <div class="file-details">
                <h3>${fileData.fileName}</h3>
                <p>${fileSize} • Uploaded: ${uploadDate}</p>
            </div>
        </div>
        <div class="file-actions">
            <a href="${fileData.fileURL}" target="_blank" class="btn-view">View</a>
            <a href="${fileData.fileURL}" download="${fileData.fileName}" class="btn-download">Download</a>
        </div>
    `;
    
    return fileItem;
}

// Format File Size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
