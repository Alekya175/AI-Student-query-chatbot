# ✦ Aditya University AI Chatbot & Student Support System

A scalable AI-powered Campus Assistant and Student Grievance Support System for **Aditya University** built with **Node.js**, **Express**, **MongoDB Atlas**, **Mongoose**, **LRU Cache**, and **Multilingual Neural Translation**.

---

## 🌟 Key Features

1. **Multilingual Neural Translation**:
   - Translates responses dynamically into native scripts (**Telugu**, **Hindi**, **Tamil**, **Kannada**, **Malayalam**, **French**, **German**, **Spanish**).
2. **Student Academic Portal Integration**:
   - Fetches verified **Attendance**, **Internal Marks & CGPA**, **Fee Dues**, and **Class Timetables** directly from MongoDB.
3. **Automated Grievance & Ticket Routing**:
   - Classifies student issues (*Faculty/Attendance*, *Hostel/Transport*, *Personal*, *Requests*) and routes them to the **Admin Dashboard**.
4. **Sub-3ms Ultra-Fast Performance**:
   - In-memory **LRU Cache** pre-warmed for instant FAQs with async non-blocking MongoDB event queues.
5. **Voice Assistant**:
   - Real-time **Speech-to-Text (STT)** microphone input & **Text-to-Speech (TTS)** voice reading.
6. **Dynamic Topic Quick Cards**:
   - 4 customized quick action cards per topic (*General, Notices, Admissions, Hostel, Timetable, Placements, Faculty, Research, Scholarships, Fees, Contact*).

---

## 🛠️ Project Structure

```text
aditya-chatbot/
├── server.js                  # Main Express Server
├── vercel.json                # Vercel Deployment Configuration
├── package.json               # Dependencies & Scripts
├── .gitignore                 # Git Ignored Files
├── config/
│   └── db.js                  # MongoDB Connection & Seeding
├── models/
│   ├── User.js                # User Auth Schema
│   ├── Student.js             # Student Academic Schema
│   ├── KnowledgeBase.js       # University KB Content Schema
│   ├── ChatHistory.js         # Chat History Schema
│   └── Ticket.js              # Admin Grievance Ticket Schema
├── controllers/
│   ├── chatController.js      # Chat API & MongoDB Controller
│   └── adminController.js     # Admin Metrics & Tickets Controller
├── routes/
│   └── apiRoutes.js           # REST API Routes
├── services/
│   ├── nlpEngine.js           # Intent Classifier & Neural Translation
│   └── cacheService.js        # Sub-3ms LRU Cache
└── public/
    ├── index.html             # Student Chatbot UI
    ├── admin.html             # Scalable Admin Dashboard UI
    ├── bot_avatar.png         # 3D Robot Mascot Avatar
    └── js/
        └── admin.js           # Admin Client Script
```

---

## 🚀 Quick Start (Local Setup)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Server**:
   ```bash
   npm start
   ```

3. **Access Applications**:
   - **Student Chatbot**: [http://localhost:3000](http://localhost:3000)
   - **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
