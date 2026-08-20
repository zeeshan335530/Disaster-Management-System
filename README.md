# 🌍 Disaster Management System

A full-stack web application designed to provide a structured platform for managing and coordinating disaster-related information and activities.

## 📌 Overview

The **Disaster Management System** is a full-stack project with separate frontend and backend applications. It provides a foundation for managing disaster-related data through a modern web interface and a dedicated backend.

The project is organized into two main parts:

* **Frontend:** User interface and client-side functionality
* **Backend:** Server-side functionality and API handling

## ✨ Key Features

* Modern and responsive web interface
* Dedicated frontend and backend architecture
* Disaster-related data management
* API-based communication between frontend and backend
* Organized project structure for easier maintenance
* Environment-based configuration for sensitive settings
* Scalable structure for adding additional disaster-management features

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* HTML5
* CSS3

### Backend

* Node.js
* REST API architecture
* JavaScript

### Development Tools

* Git
* GitHub
* npm

## 📁 Project Structure

```text
Disaster-Management-System/
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   └── ...
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/zeeshan335530/Disaster-Management-System.git
```

Move into the project directory:

```bash
cd Disaster-Management-System
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create your local environment file:

```text
.env
```

Add the required environment variables according to your backend configuration.

Start the backend using the command defined in the backend `package.json`.

### 3. Setup the Frontend

Open another terminal and run:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The terminal will display the local URL where the frontend is running.

## 🔐 Environment Variables

Sensitive configuration should be stored in a local `.env` file and should **not** be committed to GitHub.

Example:

```env
# Add your project-specific environment variables here
```

Never publish passwords, API keys, database credentials, JWT secrets, or other sensitive information.

## 🚀 Future Improvements

Possible improvements include:

* Real-time disaster alerts
* Emergency contact management
* Location-based disaster information
* Disaster reporting and tracking
* Resource and relief management
* Admin dashboard
* User authentication and authorization
* Interactive maps and location services
* Notifications and alert systems

## 🎯 Project Purpose

This project demonstrates the development of a full-stack web application using a separate frontend and backend architecture. It also provides practical experience with modern web development, API integration, project organization, Git, and GitHub.

## 👨‍💻 Author

**Zeeshan Ansari**

GitHub:
https://github.com/zeeshan335530

## 📄 License

This project is intended for educational and portfolio purposes.
