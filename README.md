<div align="center">

# 🚀 My Portfolio

A modern, full‑stack personal portfolio website with a bilingual (English / فارسی) public site and a complete admin dashboard for managing projects, messages, and your profile.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20FA-2D9CDB)
![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)

</div>

---

## ✨ Features

### 🌍 Public Website
- **Home** – hero section with a modern, animated landing page
- **About Me** – personal intro and background
- **Projects** – browse portfolio projects with images and details
- **Project Detail** – dedicated page for each project
- **Contact** – contact form (name, email, phone, message) that saves messages directly to the database
- **Bilingual** – full English & فارسی (Persian) support with automatic language detection (i18next)

### 🔐 Admin Panel
- **Authentication** – register / login with JWT and bcrypt-hashed passwords, role-based access (admin only)
- **Manage Projects** – full CRUD for projects with image upload to **Cloudinary**
- **Messages** – inbox to read messages received through the contact form
- **Profile** – view and update your own profile

---

## 🧰 Tech Stack

### Client (`/client`)
| Technology | Purpose |
|---|---|
| [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/) | UI framework & build tool |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling |
| [shadcn/ui](https://ui.shadcn.com/) + Radix UI | Accessible UI components |
| [framer-motion](https://www.framer.com/motion/) | Animations |
| [react-router-dom](https://reactrouter.com/) | Routing |
| [i18next](https://www.i18next.com/) | Internationalization (EN / FA) |
| [zod](https://zod.dev/) | Form / schema validation |
| [axios](https://axios-http.com/) | HTTP client |
| [react-phone-number-input](https://www.npmjs.com/package/react-phone-number-input) | Phone number input |
| [lucide-react](https://lucide.dev/) / [react-icons](https://react-icons.github.io/react-icons/) | Icons |
| [pnpm](https://pnpm.io/) | Package manager |

### Server (`/server`)
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/) | REST API |
| [MongoDB](https://www.mongodb.com/) + [Mongoose 9](https://mongoosejs.com/) | Database & ODM |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) + [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Auth (JWT + password hashing) |
| [Cloudinary](https://cloudinary.com/) + [multer](https://www.npmjs.com/package/multer) + [streamifier](https://www.npmjs.com/package/streamifier) | Image upload & storage |
| [Resend](https://resend.com/) | Email service |
| [cors](https://www.npmjs.com/package/cors) + [cookie-parser](https://www.npmjs.com/package/cookie-parser) + [dotenv](https://www.npmjs.com/package/dotenv) | Middleware & config |
| [nodemon](https://nodemon.io/) | Dev auto-reload |

---

## 📁 Project Structure

```
my-portfolio/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   ├── i18n/
│   │   │   └── locales/     # en.json, fa.json
│   │   ├── lib/             # API / helper modules
│   │   ├── pages/           # Home, Projects, Contact, Login, Dashboard, ...
│   │   ├── schemas/         # Zod validation schemas
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                  # Express backend
│   ├── config/              # db.js, cloudinary.js
│   ├── controller/          # Business logic
│   ├── middleware/          # auth.js, uploadMiddleware.js
│   ├── models/              # User, Project, Message
│   ├── routes/              # users.route.js, projects.route.js
│   ├── utils/
│   ├── server.js            # App entry point
│   └── package.json
└── LICENSE                  # Apache 2.0
```



## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-idea`)
3. Commit your changes (`git commit -m 'Add amazing idea'`)
4. Push to the branch (`git push origin feature/amazing-idea`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE).

---

<div align="center">

Made with ❤️ by [RezaParadox](https://github.com/RezaParadox)

</div>
