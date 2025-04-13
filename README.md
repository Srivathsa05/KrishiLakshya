# 🌾 KrishiLakshya - Real-Time Financial Tracker for Farmers

**KrishiLakshya** is a Progressive Web App (PWA) designed to empower farmers by providing them with a **real-time system** to track input costs, income, and profitability. Built with accessibility and usability in mind, it helps farmers plan better, reduce financial losses, and make data-driven agricultural decisions.

![Made with React](https://img.shields.io/badge/Made%20with-React-blue?style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Styled%20with-TailwindCSS-38b2ac?style=flat-square)
![Hackathon Ready](https://img.shields.io/badge/Hackathon%20Project-🚀-yellowgreen)

---

## 📱 Live Demo
👉 [Coming Soon] — Deployed on Vercel / Render

---

## ✨ Features

### ✅ MVP (Functional Now)
- **Login System** – Secure login via Firebase (Email/Phone OTP)
- **Add Crop** – Register seasonal produce with crop name, area, and start date
- **Input Cost Logger** – Log expenses (seed, fertilizer, labor) + OCR-based bill scanning
- **Income Tracker** – Track sales, quantity, price, and buyer details
- **Profit Dashboard** – Auto-calculated profit (Income - Expenses) with charts
- **Weather & Mandi Prices** – Static version with location-based placeholders

### 🔄 Upcoming Features (Post-Hackathon)
- Inventory Tracker  
- Loan/Subsidy Manager  
- Voice Assistant (Hindi + English)  
- Learning Hub with agri tips  
- Chatbot for FAQs  
- Community Forum  
- Gamification (badges + usage rewards)  
- Offline Support (IndexedDB)  
- PDF Report Export (per crop season)

---

## 🧑‍💻 Tech Stack

| Frontend   | Backend        | Auth          | Database | APIs / Libraries                    |
|------------|----------------|---------------|----------|-------------------------------------|
| React.js   | Node.js + Express | Firebase Auth | MongoDB  | OpenWeatherMap, Agmarknet, OCR (Google Vision / Tesseract.js), Recharts, Web Speech API |

---

## 🗂️ Folder Structure

krishilakshya/ ├── public/ ├── src/ │ ├── assets/ │ ├── components/ │ ├── pages/ │ ├── services/ # API calls & firebase config │ ├── hooks/ │ ├── context/ # Global state │ └── App.jsx ├── backend/ # Node.js server ├── .env # API Keys placeholder └── README.md


---

## 🔐 API Keys Required (Add to `.env`)

``env

REACT_APP_GOOGLE_VISION_KEY=your_google_cloud_vision_api_key
REACT_APP_AGMARKNET_API_KEY=your_agmarknet_or_enam_api_key
REACT_APP_WEATHER_API_KEY=your_openweathermap_key

REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id


## 🧪 Setup Instructions
Clone the repository

bash
Copy
Edit
git clone https://github.com/yourusername/krishilakshya.git
cd krishilakshya
Install dependencies

bash
Copy
Edit
npm install
Set up Firebase & .env

Create a Firebase project

Enable Phone/Email Auth

Add config keys to .env

Run the app

bash
Copy
Edit
npm start
📈 Screenshots
📸 Coming Soon: Dashboard, Input Logger, Income Charts, Weather UI, etc.

## 🤝 Contributors
Shreyas S — Front End Developer

Samarth P V — Front End Developer

Niranjan C N — UI/UX + Testing

## 🏁 Conclusion
KrishiLakshya is more than just a financial tool — it’s a mission to empower grassroots farmers with smart, accessible technology. From tracking inputs to maximizing profits, it helps farmers plan, act, and grow with confidence.

## 📜 License
MIT License © 2025 – HackVyuha

---



