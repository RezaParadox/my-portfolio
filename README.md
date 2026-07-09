# Portfolio - Full Stack Website

A modern portfolio website built with React, Node.js, Express, and MongoDB.

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + Mongoose
- **Database**: MongoDB

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### 1. Install Dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 2. Configure Environment

```bash
# In server/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_key
```

### 3. Seed Database

```bash
cd server
npm run seed
```

This creates:
- Admin user: `admin` / `admin123`
- Default about info

### 4. Start Development

```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

### 5. Access

- **Frontend**: http://localhost:5173
- **Admin**: http://localhost:5173/login
- **API**: http://localhost:5000/api

## Features

### Public Pages
- Home (hero with animations)
- About (bio, skills, experience)
- Projects (card grid)
- Contact (form)

### Admin Dashboard
- Login (JWT auth)
- Manage Projects (CRUD)
- Manage About Info
- View Messages

## Default Credentials

- Username: `admin`
- Password: `admin123`
