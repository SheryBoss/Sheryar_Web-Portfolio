# Developer's Universe — Interactive 3D Web Portfolio

> **NED University of Engineering & Technology (NEDUET)**  
> **Course:** Web Project (Semester 7 — BSCS Gaming & Animation)  
> **Project Title:** Design and Development of an Interactive 3D Web Portfolio (*Developer's Universe*)  
> **Student Name:** Sheryar Amir  
> **Roll Number:** GA-23009   
> **Instructor:** Miss Saadia  
> **Academic Session:** 2023 – 2027  

---

## 🌟 Executive Summary

**Developer's Universe** is a state-of-the-art interactive 3D portfolio and digital universe built for **Sheryar Amir**, a Computer Science undergraduate specializing in **Gaming & Animation** at NED University of Engineering & Technology. 

The application integrates cutting-edge web graphics with full-stack artificial intelligence:
- **Real-time 3D Viewport:** Three.js and React Three Fiber rendering a dark sci-fi cosmos with glowing platforms and custom 3D avatar interaction.
- **Motion Reel:** Embedded 40-second promotional trailer showcasing After Effects compositing and 3D game engines in a custom HUD player.
- **Grounded AI Companion (A.R.I.A.):** Autonomous Retrieval & Intelligence Assistant powered by Google Gemini API, ChromaDB vector indexing, and zero-hallucination guardrails grounded exclusively in verified CV and project documents.
- **Instant Communication Channels:** Direct WhatsApp integration and secure dual-path email transmission to `sheryaramir576@gmail.com`.
- **Dynamic Theme Switcher:** Dual dark cosmic universe and clean light theme with state persistence.

---

## 🏛️ Six Mandatory Assignment Modules Breakdown

| Module | Requirement | Implementation Details | Status |
|:---:|---|---|:---:|
| **1** | **Responsive 3D Portfolio Layout** | Single-page portfolio with 8 navigation sections (Home, About Me, Skills, Projects, Education & Experience, Promotional Video, AI Assistant, Contact). Smooth scroll camera glide and full mobile/tablet responsiveness. | **COMPLETED (100%)** |
| **2** | **Blender 3D Avatar Integration** | Custom 3D character avatar (`avatar.glb`) integrated on a glowing cosmic pedestal with real-time cursor tracking, idle breathing, click-to-wave animation, audio chime, and dialogue bubble. | **COMPLETED (100%)** |
| **3** | **Promotional Motion Reel** | 40-second After Effects motion graphics promotional trailer (`promo-reel.mp4`) hosted in an interactive sci-fi HUD player with custom play/pause, timecode, scrubbing, volume, and fullscreen. | **COMPLETED (100%)** |
| **4** | **Grounded RAG AI Chatbot (A.R.I.A.)** | Autonomous Retrieval & Intelligence Assistant with dedicated in-page terminal and floating HUD widget. Semantic vector search over CV/knowledge base documents, multi-token fuzzy matching, and strict citations. | **COMPLETED (100%)** |
| **5** | **Secure Contact Pipeline** | Direct WhatsApp link (`+923351810651`), direct mailto dispatch to `sheryaramir576@gmail.com`, and backend Node.js Nodemailer API with input validation, rate limiting, and honeypot bot trap. | **COMPLETED (100%)** |
| **6** | **Deployment, Documentation & Verification** | Complete documentation, installation guide, project report PDF, modular clean code structure, environment templates, and automated verification tests. | **COMPLETED (100%)** |

---

## 🛠️ Technology Stack & Architecture

### Frontend Architecture
- **Framework:** React 18 with Vite build tool
- **3D Graphics & Canvas:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Styling & Theming:** Tailwind CSS with custom gaming color palette, Lucide icons, dark/light theme toggle
- **Motion & Transitions:** Framer Motion, CSS volumetric glow filters
- **Asset Pipeline:** WebGL glTF/GLB binary loaders, FastStart MP4 video streaming

### Backend Architecture
- **Server:** Node.js v18+ / v20+ / v22+ with Express.js REST API
- **AI & RAG Engine:** Google Gemini API (`@google/generative-ai`), ChromaDB client & local vector store cache
- **Document Store:** Semantic chunking of `knowledge_base.md`, `sheryar_cv.md`, `projects_knowledge.md`
- **Email Dispatch:** Nodemailer SMTP pipeline with dual-mode simulation logging and direct mail client launcher
- **Security:** Helmet, CORS origin restriction, Express rate-limit, Honeypot spam trap

---

## 📂 Repository Directory Structure

```text
GA09_WP_FinalProj/
├── frontend/                     # React + Vite Frontend Application
│   ├── public/
│   │   ├── models/               # 3D Avatar GLB Assets (avatar.glb)
│   │   ├── videos/               # Promotional Motion Reel (promo-reel.mp4)
│   │   └── images/projects/      # Project Screenshot Assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/               # Three.js 3D Viewport, Avatar & Lighting
│   │   │   └── ui/               # Modular UI Section Components
│   │   ├── data/                 # Knowledge Base & Portfolio Data
│   │   ├── App.jsx               # Main React Application Container
│   │   └── index.css             # Tailwind Styles & Theme Overrides
│   ├── package.json              # Frontend Dependencies
│   └── vite.config.js            # Vite Bundler Configuration
│
├── backend/                      # Node.js + Express API Backend
│   ├── data/
│   │   ├── docs/                 # RAG Markdown Knowledge Documents
│   │   │   ├── knowledge_base.md # Sheryar Amir Verified Knowledge Base
│   │   │   ├── sheryar_cv.md     # Official CV Document
│   │   │   └── ...
│   │   └── vector_cache/         # 46 Vectorized Document Chunks
│   ├── src/
│   │   ├── routes/               # API Endpoints (/api/chat, /api/contact)
│   │   ├── services/             # Gemini RAG, Vector Store, Email Services
│   │   ├── scripts/              # Ingestion Pipeline (ingestDocuments.js)
│   │   └── server.js             # Express API Server Entrypoint
│   ├── .env                      # Active Environment Configuration
│   ├── .env.example              # Environment Configuration Template
│   └── package.json              # Backend Dependencies
│
├── docs/                         # Official University Documentation
│   ├── Project_Report_GA023009.pdf  # Comprehensive Final Project Report
│   └── ...
│
├── knowledge_base.md             # Master Knowledge Base & Sheryar Data
└── README.md                     # Installation & System Guide (This File)
```

---

## 🚀 Installation & Setup Guide

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js:** v18.0.0 or higher (v20+ recommended). Check with:
  ```bash
  node -v
  ```
- **npm:** v9.0.0 or higher. Check with:
  ```bash
  npm -v
  ```

---

### 2. Environment Configuration

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Copy the `.env.example` file to create your `.env` configuration:
   ```bash
   cp .env.example .env
   ```
3. Configure the variables inside `backend/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   CONTACT_RECEIVER_EMAIL=sheryaramir576@gmail.com
   CLIENT_ORIGIN=http://localhost:5173

   # Optional: Google Gemini API Key for Live Generative Embeddings
   # If omitted, the system safely falls back to local grounded knowledge
   GEMINI_API_KEY=your_gemini_api_key_here

   # Optional: Nodemailer Live SMTP Credentials
   # If omitted, contact transmissions are logged to backend/data/contact_transmissions_test.log
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_specific_password
   ```

---

### 3. Installing Dependencies

#### Install Frontend Dependencies:
```bash
cd frontend
npm install
cd ..
```

#### Install Backend Dependencies:
```bash
cd backend
npm install
cd ..
```

---

### 4. Priming the Knowledge Base & Vector Index

Re-run the automated document vectorizer to index all documents into the local vector store:
```bash
node backend/src/scripts/ingestDocuments.js
```
*Expected Output:* `Ingestion Complete: 46 vectorized chunks saved to local cache.`

---

### 5. Running the Application

You need two terminal windows to run both the frontend and backend servers:

#### Terminal 1 — Start the Backend Server:
```bash
node backend/src/server.js
```
*The API server will listen on `http://localhost:5000`.*

#### Terminal 2 — Start the Frontend Dev Server:
```bash
npm --prefix frontend run dev
```
*The frontend application will be live at `http://localhost:5173`.*

---

## 🧪 Testing & Verification Checklist

1. **3D Avatar & Interactive Stage (Module 1 & 2):**
   - Open `http://localhost:5173/`.
   - Hover mouse across the screen: verify 3D avatar tracks cursor.
   - Click directly on the 3D avatar: verify wave animation, cyber audio chime, and greeting speech bubble.
   - Scroll down the page: observe smooth 3D camera glide.

2. **Dark / Light Theme Toggle:**
   - Click the ☀️ / 🌙 button in the top navigation bar.
   - Verify smooth transitions between the dark sci-fi cosmos and light theme.

3. **Grounded AI Chatbot (A.R.I.A. — Module 4):**
   - Scroll to `#ai-assistant` or click the floating HUD button in the bottom right corner.
   - Ask test questions:
     - *"What are Sheryar's blender projects?"* -> Returns Blender Monster, Chick, Donut, Human character.
     - *"What games has he developed?"* -> Returns ShipBrawl (UE5), Dungeon Escape (Unity), Defenders (Unity), Harassing Master Shifu (VR).
     - *"What are his hobbies and sports?"* -> Returns reading, learning Blender, swimming, table tennis, cricket, chess.
     - *"Why did he get admitted to NED?"* -> Returns his thirst for knowledge in game dev and 3D design.
     - *"What is ARIA?"* -> Returns Autonomous Retrieval & Intelligence Assistant.

4. **Contact Form & Direct Transmission (Module 5):**
   - Fill out the form in the `#contact` section and click **TRANSMIT VIA EMAIL**.
   - Verify the transmission is confirmed, logged to `backend/data/contact_transmissions_test.log`, and triggers your email client pre-addressed to `sheryaramir576@gmail.com`.
   - Click the **CHAT ON WHATSAPP** button to test direct WhatsApp connectivity (`+923351810651`).

---

## 👨‍💻 Author & Academic Credentials

* **Student:** Sheryar Amir  
* **Seat / Roll No:** GA023009 (GA_09)  
* **Degree:** Bachelor of Science in Computer Science (BSCS)  
* **Specialization:** Gaming & Animation  
* **Institution:** NED University of Engineering & Technology, Karachi  
* **CGPA:** 3.5 / 4.00  
* **Intermediate:** DJ Sindh Govt Science College (84.0%)  
* **Primary Skills:** Unreal Engine 5, Unity 3D, Blender 3D, Three.js, React, Node.js  
* **WhatsApp:** [+92 335 1810651](https://wa.me/923351810651)  
* **Email:** [sheryaramir576@gmail.com](mailto:sheryaramir576@gmail.com)  
* **GitHub:** [https://github.com/SheryBoss](https://github.com/SheryBoss)  
* **Course Instructor:** Miss Saadia  
