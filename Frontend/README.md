# CourseHub Frontend

A modern, premium React frontend for the Course Selling App with beautiful UI/UX.

## 🎨 Features

### For Students
- **Browse Courses**: Explore all available courses with beautiful card layouts
- **Purchase Courses**: Buy courses with a single click
- **My Courses**: View all purchased courses in one place
- **User Authentication**: Secure signup and signin

### For Instructors (Admin)
- **Create Courses**: Add new courses with title, description, price, and image
- **Edit Courses**: Update existing course information
- **Manage Courses**: View all created courses in a dashboard
- **Admin Authentication**: Separate admin signup and signin

## 🚀 Tech Stack

- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server
- **CSS3** - Premium custom styling with:
  - Gradients and glassmorphism
  - Smooth animations
  - Dark theme
  - Responsive design

## 📦 Installation

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## 🔧 Configuration

The frontend connects to the backend API at `http://localhost:3000/api/v1`. 

To change the API URL, edit the `API_BASE_URL` in `src/utils/api.js`.

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   └── CourseCard.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Signup.jsx
│   │   ├── Signin.jsx
│   │   ├── Courses.jsx
│   │   ├── MyCourses.jsx
│   │   ├── AdminCourses.jsx
│   │   └── CourseForm.jsx
│   ├── context/          # React Context
│   │   └── AuthContext.jsx
│   ├── utils/            # Utilities
│   │   └── api.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/
├── index.html
└── package.json
```

## 🎯 Usage

### As a Student

1. **Sign Up**: Create an account as a Student
2. **Browse**: View all available courses
3. **Purchase**: Click "Purchase Now" on any course
4. **Learn**: Access your courses from "My Courses"

### As an Instructor

1. **Sign Up**: Create an account as an Instructor
2. **Create**: Add new courses with details
3. **Manage**: View and edit your courses
4. **Update**: Modify course information anytime

## 🎨 Design Features

- **Premium Aesthetics**: Modern gradients, glassmorphism effects
- **Dark Theme**: Easy on the eyes with vibrant accents
- **Smooth Animations**: Micro-interactions and transitions
- **Responsive**: Works on all screen sizes
- **Accessible**: Semantic HTML and proper contrast ratios

## 🔐 Authentication

The app uses JWT tokens stored in localStorage for authentication:
- Tokens are automatically attached to API requests
- User state persists across page refreshes
- Protected routes redirect to signin if not authenticated
- Admin routes are restricted to instructor accounts

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Notes

- Make sure the backend server is running on port 3000
- The backend must have CORS enabled
- Images are loaded from URLs (provide valid image URLs when creating courses)

## 🐛 Known Issues

- Backend needs to return proper data structure for purchases endpoint
- Image URLs must be valid and accessible

## 🚀 Future Enhancements

- Course categories and filtering
- Search functionality
- User profiles
- Course ratings and reviews
- Payment integration
- Video content support
- Progress tracking

## 📄 License

This project is part of the Backend Course App.
