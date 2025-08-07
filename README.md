
---

## 📘 Project: Google OAuth2 Login with Django and React

This is a full-stack implementation of **Google OAuth2 Login** using:

* **Backend**: Django + Django Allauth + dj-rest-auth + SimpleJWT
* **Frontend**: React (Vite) + Google Identity Services (GIS)

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│   └── Django backend with auth, JWT, allauth integration
│
├── frontend/
│   └── React (Vite) frontend with Google One Tap login or button login
```

---

## 🚀 Features

* Google Sign-In using **Google Identity Services**
* Django **Allauth** for Social Login
* JWT tokens (access + refresh) returned on login
* React frontend integration
* Environment-ready for production expansion

---

## ⚙️ Backend Setup (Django)

### 1. Clone & Set Up Environment

```bash
git clone <your-repo-url>
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Required Dependencies

Your `requirements.txt` should include:

```
Django>=4.0
dj-rest-auth
djangorestframework
django-allauth
django-cors-headers
djangorestframework-simplejwt
```

### 3. Update `settings.py`

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    ...
]

SITE_ID = 1

REST_USE_JWT = True
ACCOUNT_EMAIL_VERIFICATION = "none"
ACCOUNT_AUTHENTICATION_METHOD = "username"
ACCOUNT_EMAIL_REQUIRED = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Frontend URL
]
```

### 4. Configure URLs (`urls.py`)

```python
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/social/', include('allauth.socialaccount.urls')),
]
```

---

## 🔐 Google Developer Console Setup

1. Go to [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
2. Create an **OAuth 2.0 Client ID**
3. Choose **Web Application**
4. Add:

   * **Authorized JavaScript origins**:

     ```
     http://localhost:5173
     ```
   * **Authorized redirect URIs**:

     ```
     http://localhost:8000/accounts/google/login/callback/
     ```

---

## 🌐 Frontend Setup (React with Vite)

### 1. Initialize Vite Project

```bash
npm create vite@latest frontend -- --template vanilla
cd frontend
npm install
```

### 2. Install Google Identity SDK

No need to install via npm. Load it via script tag dynamically in `main.js`.

### 3. `main.js` Example

```js
import './style.css';

(function () {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
})();

window.onload = () => {
  google.accounts.id.initialize({
    client_id: 'YOUR_GOOGLE_CLIENT_ID',
    callback: handleCredentialResponse,
  });

  google.accounts.id.renderButton(
    document.getElementById("google-signin-button"),
    { theme: "outline", size: "large" }
  );
};

function handleCredentialResponse(response) {
  const id_token = response.credential;
  console.log("ID Token:", id_token);

  fetch("http://localhost:8000/auth/social/google/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access_token: id_token }),
  })
    .then(res => res.json())
    .then(data => {
      console.log("Backend Response:", data);
      alert(`Welcome ${data.user.email}`);
    })
    .catch(err => console.error(err));
}
```

### 4. Start Frontend

```bash
npm run dev
```

---

## 🧪 Testing the Flow

1. Start the Django backend:

   ```bash
   python manage.py runserver
   ```

2. Start the React frontend:

   ```bash
   npm run dev
   ```

3. Open browser at `http://localhost:5173`

4. Click **Sign in with Google**

5. You should see:

   * **ID Token** logged in console
   * **Backend JWT Response**
   * **Welcome Alert**

---

## 🧾 Example Backend Response

```json
{
  "user": {
    "id": 1,
    "email": "example@gmail.com"
  },
  "access": "eyJhbGciOiJIUzI1NiIs...",
  "refresh": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## 🛠 Notes

* Make sure your Google Client ID matches exactly
* Django site must have `SITE_ID = 1` in the DB (use `django.contrib.sites`)
* You can customize login views later for UI or permission control

---

## 📄 License

MIT License. Use freely for commercial or academic use.

