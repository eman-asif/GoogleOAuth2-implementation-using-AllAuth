// main.js
import './style.css';

document.addEventListener("DOMContentLoaded", () => {
    const googleLoginBtn = document.getElementById("google-signin-button");

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener("click", () => {
            // Redirect to django-allauth's Google login endpoint
            window.location.href = "http://localhost:8000/accounts/google/login/";
        });
    }
});
