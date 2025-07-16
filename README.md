# 🌟 Project Overview

**Gemini Chat Clone** is a modern, responsive, and theme-toggleable chat application inspired by Google’s Gemini UI. It offers a smooth real-time chatting experience (mocked without backend), complete with chatroom management, OTP-based authentication (via local verification), dark/light mode support, and toast-based user feedback.

## ✨ Features

- 🪄 New chatroom creation and deletion with instant UI feedback
- 📱 OTP-based login (no backend – simulates OTP for demo purposes)
- 🌙 Dark/Light theme toggle support
- 🤖 AI-like response simulation using setTimeout for realism
- 🚀 Local data persistence using Zustand with `persist` middleware
- 🔔 Toast notifications for actions like OTP sent, message sent, chatroom deleted, etc.
- 🌐 Country list loaded locally from `countries.json` (no external API)

> 🔗 **Live Demo:** [https://gemini-chat-clone.vercel.app](https://gemini-chat-clone.vercel.app/)


# ✅ Setup & Run Instructions

Follow these steps to run the project locally:

## 1. Clone the repository
git clone https://github.com/your-username/gemini-chat-clone.git
cd gemini-chat-clone

## 2. Install dependencies
npm install

## 3. Start the development server
npm run dev

Open http://localhost:5173 in your browser to see the app in action.

# Folder / Component Structure

src/
├── App/                   # Zustand stores (auth, chat, theme)
│   ├── ChatStore.js
│   ├── loginAuth.js
│   └── themeStore.js
│
├── Components/            # All reusable React components
│   ├── ChatPage.jsx
│   ├── Dashboard.jsx
│   ├── Layout.jsx
│   ├── Login.jsx
│   ├── Sidebar.jsx
│   └── ThemeToggle.jsx
│
├── Hooks/                 # Custom React hooks 
│   └── useOlderMessages.js
├── utils/                 # Utility functions
│   └── aiResponse.js
│
├── data/                  # Local JSON data
│   └── countries.json
│
└── main.jsx               # App entry point

 # How Features Are Implemented

1. Throttling / Debouncing
In Sidebar.jsx, search input is debounced using setTimeout to delay filter updates for smoother UX.

2. Infinite Scroll (Simulated)
Older messages are fetched on "Load older messages" click, simulating lazy loading using setTimeout.

3. Form Validation
Phone number input and country selection in Login.jsx are validated using zod + react-hook-form.

Invalid inputs trigger inline errors and prevent form submission.

4. Local Persistence
Zustand’s persist middleware saves login session and chatrooms in localStorage, so data stays after refresh.

5. Dark/Light Theme Toggle
Theme state is managed globally using Zustand (themeStore.js) and toggled via the ThemeToggle component.

6. Toast Notifications
react-hot-toast is used to notify users on events like:

a. OTP sent / incorrect OTP

b. Chatroom creation / deletion

c. Welcome toast after login

d. Message sent

#SCREENSHOTS 

Login page : /Screenshot/loginPage.png 

OTP : /Screenshot/loginOTP.png

Dashboard : /Screenshot/DashBoard.png

Chat : /Screenshot/Chat.png

Chat Light Mode : /Screenshot/ChatWhite.png

Chat Mobile : /Screenshot/ChatMobile.png
