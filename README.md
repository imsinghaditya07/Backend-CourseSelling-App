# 🎓 CourseHub - Full Stack Course Selling Platform

A modern, full-stack course selling application built with **React** and **Node.js/Express**. This platform allows instructors to create and manage courses while students can browse and purchase courses.

![Tech Stack](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![Tech Stack](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js)
![Tech Stack](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)

## 🌟 Features

### 👨‍🎓 For Students
- ✅ Browse all available courses
- ✅ Purchase courses with one click
- ✅ View purchased courses in a personalized dashboard
- ✅ Secure authentication with JWT

### 👨‍🏫 For Instructors (Admin)
- ✅ Create new courses with details (title, description, price, image)
- ✅ Edit and update existing courses
- ✅ Manage course catalog
- ✅ Separate admin authentication

### 🎨 UI/UX Highlights
- ✨ Premium dark theme with vibrant gradients
- 🎭 Glassmorphism effects and smooth animations
- 📱 Fully responsive design
- ⚡ Fast and intuitive user experience

## 🏗️ Project Structure

```
Backend_course_app/
├── Backend/                 # Node.js/Express API
│   ├── Routes/             # API routes
│   │   ├── admin.js        # Admin endpoints
│   │   ├── user.js         # User endpoints
│   │   └── courses.js      # Course endpoints
│   ├── middleware/         # Authentication middleware
│   ├── db.js              # MongoDB schemas
│   ├── index.js           # Server entry point
│   └── package.json
│
├── Frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (Auth)
│   │   ├── utils/         # API utilities
│   │   └── index.css      # Design system
│   └── package.json
│
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Rauneet-coder/Backend-CourseSelling-App.git
cd Backend-CourseSelling-App
```

2. **Setup Backend**
```bash
cd Backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your MongoDB URL and JWT secrets
```

3. **Setup Frontend**
```bash
cd ../Frontend
npm install
```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd Backend
npm run dev
```
Backend runs on: `http://localhost:3000`

**Terminal 2 - Start Frontend:**
```bash
cd Frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Access the Application
Open your browser and navigate to: **http://localhost:5173**

## 🔧 Environment Variables

Create a `.env` file in the `Backend` directory:

```env
MONGO_URL=your_mongodb_connection_string
JWT_USER_PASS=your_user_jwt_secret
JWT_ADMIN_PASS=your_admin_jwt_secret
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### User Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/signup` | Register new user |
| POST | `/user/signin` | User login |
| GET | `/user/purchases` | Get user's purchased courses |

### Admin Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/signup` | Register new admin |
| POST | `/admin/signin` | Admin login |
| POST | `/admin/course` | Create new course |
| PUT | `/admin/course` | Update course |
| GET | `/admin/course/bulk` | Get all admin's courses |

### Course Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses/preview` | Get all courses |
| POST | `/courses/purchase` | Purchase a course |

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Custom styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Zod** - Input validation
- **CORS** - Cross-origin resource sharing

## 🎯 Usage Guide

### As a Student

1. **Sign Up**
   - Navigate to Sign Up page
   - Select "Student" option
   - Fill in your details (email, password, name)
   - Password must be at least 6 characters with 1 uppercase letter

2. **Browse Courses**
   - View all available courses on the Courses page
   - See course details, price, and description

3. **Purchase Course**
   - Click "Purchase Now" on any course
   - Course will be added to "My Courses"

4. **Access Your Courses**
   - Navigate to "My Courses" to see all purchased courses

### As an Instructor

1. **Sign Up**
   - Navigate to Sign Up page
   - Select "Instructor" option
   - Fill in your details

2. **Create Course**
   - Go to "Create Course"
   - Add title, description, price, and image URL
   - Submit to publish

3. **Manage Courses**
   - View all your courses in "My Courses"
   - Click "Edit Course" to update details

## 🎨 Design System

The frontend uses a premium design system featuring:

- **Color Palette**: Purple-blue gradients with vibrant accents
- **Typography**: Inter font family
- **Effects**: Glassmorphism, smooth transitions, hover animations
- **Theme**: Dark mode optimized
- **Responsive**: Mobile-first approach

## 📱 Screenshots

### Home Page
Beautiful landing page with hero section and features showcase

### Course Catalog
Grid layout displaying all available courses with images and pricing

### Admin Dashboard
Course management interface for instructors

## 🔐 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Protected API routes
- ✅ Input validation with Zod
- ✅ CORS enabled for secure cross-origin requests

## 🐛 Known Issues & Roadmap

### Current Issues (Backend)
- [ ] Missing `await` in admin signin password check
- [ ] Missing try-catch in middleware (can crash server)
- [ ] Missing response in `/purchase` endpoint
- [ ] Header access should be `req.headers.token`

### Future Enhancements
- [ ] Course categories and filtering
- [ ] Search functionality
- [ ] User profiles and avatars
- [ ] Course ratings and reviews
- [ ] Payment gateway integration
- [ ] Video content support
- [ ] Progress tracking
- [ ] Certificates on completion
- [ ] Email notifications
- [ ] Course preview/demo

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Rauneet Singh**
- GitHub: [@Rauneet-coder](https://github.com/Rauneet-coder)

## 🙏 Acknowledgments

- Built as part of a backend development course
- Inspired by modern e-learning platforms
- UI/UX design influenced by contemporary web design trends

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**Happy Learning! 🚀**

Made with ❤️ by Rauneet Singh
