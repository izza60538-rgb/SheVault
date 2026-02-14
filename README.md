# 💜 SheVault — Postpartum Depression Tracker

A gentle, private wellness companion designed to help new mothers track their postpartum mental health journey. Built with care using React and Vite.

---

## ✨ Features

- **🔐 Secure Login** — Simple, private username-based authentication with local data storage
- **📋 Daily Check-In** — Log your mood, pain levels, and personal notes each day
- **📊 Analytics Dashboard** — Visualize mood trends with interactive charts (daily, weekly, monthly views)
- **🏠 Info Dashboard** — Quick overview of postpartum wellness resources and guidance
- **👤 Profile Management** — View and manage your personal details and account settings
- **🎨 Soft Floral UI** — A calming lavender-themed interface with smooth animations

---

## 🛠️ Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| **Framework**| React 19                                        |
| **Bundler**  | Vite 7                                          |
| **Styling**  | Tailwind CSS 3                                  |
| **Charts**   | Recharts                                        |
| **Animations**| Framer Motion                                  |
| **Icons**    | Lucide React                                    |
| **Storage**  | Browser LocalStorage                            |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd "She Vault/ppd-tracker"

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
She Vault/
└── ppd-tracker/
    ├── public/                  # Static assets
    ├── src/
    │   ├── assets/              # Images & media
    │   ├── components/
    │   │   ├── AnalyticsDashboard.jsx   # Charts & analytics views
    │   │   ├── AnalysisView.jsx         # Mood analysis summary
    │   │   ├── DailyCheckIn.jsx         # Daily mood & pain logger
    │   │   ├── InfoDashboard.jsx        # Wellness info & resources
    │   │   ├── Login.jsx                # Authentication screen
    │   │   └── Profile.jsx              # User profile & settings
    │   ├── utils/
    │   │   ├── analyzer.js              # Data analysis helpers
    │   │   └── storage.js               # LocalStorage utilities
    │   ├── App.jsx                      # Main app with routing & layout
    │   ├── App.css                      # App-level styles
    │   ├── index.css                    # Global styles & Tailwind setup
    │   └── main.jsx                     # Entry point
    ├── tailwind.config.js       # Tailwind configuration
    ├── vite.config.js           # Vite configuration
    └── package.json
```

---

## 🎨 Design Philosophy

SheVault is designed with empathy at its core. The soft **lavender gradient** palette, gentle animations, and encouraging language create a **safe, supportive space** for mothers navigating the postpartum period. All data stays on the user's device — **no server, no tracking, complete privacy**.

---

## 📜 License

This project is private and intended for personal use.

---

<p align="center">
  <em>SheVault • Safe & Secure 💜</em>
</p>
