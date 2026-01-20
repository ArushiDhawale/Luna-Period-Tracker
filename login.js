import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// 1. Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHUhvl7Jvsg3J3kVHDLcTty0kejLFA624",
    authDomain: "hustlers-5e1cb.firebaseapp.com",
    projectId: "hustlers-5e1cb",
    storageBucket: "hustlers-5e1cb.firebasestorage.app",
    messagingSenderId: "617293373283",
    appId: "1:617293373283:web:5c514bf1e2c1eb96d9fd56",
    measurementId: "G-RYDTL77XBC"
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 3. Login Logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPass').value;
        const errorMsg = document.getElementById('loginError');
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            // Optional: Store simple user data for UI (auth state handles security)
            localStorage.setItem('luna_user_name', userCredential.user.displayName || "User");
            localStorage.setItem('luna_is_logged_in', 'true');
            window.location.href = "index.html";
        } catch (err) {
            console.error("Login failed", err);
            if(errorMsg) {
                errorMsg.innerText = "Invalid email or password.";
                errorMsg.classList.remove('hidden');
            } else {
                alert("Invalid credentials.");
            }
        }
    });
}

// 4. Signup Logic
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signupEmail').value;
        const pass = document.getElementById('signupPass').value;
        const name = document.getElementById('signupName').value;
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            await updateProfile(userCredential.user, { displayName: name });
            
            localStorage.setItem('luna_user_name', name);
            localStorage.setItem('luna_is_logged_in', 'true');
            window.location.href = "index.html";
        } catch (err) {
            console.error("Signup failed", err);
            alert(err.message);
        }
    });
}
