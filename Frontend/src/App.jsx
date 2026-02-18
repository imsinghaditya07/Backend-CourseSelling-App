import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import AdminCourses from './pages/AdminCourses';
import CourseForm from './pages/CourseForm';
import CourseDetail from './pages/CourseDetail';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/courses" replace />;
  }

  return children;
};

function AppContent() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          
          {/* User Protected Routes */}
          <Route 
            path="/my-courses" 
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Protected Routes */}
          <Route 
            path="/admin/courses" 
            element={
              <ProtectedRoute adminOnly>
                <AdminCourses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/create" 
            element={
              <ProtectedRoute adminOnly>
                <CourseForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/edit" 
            element={
              <ProtectedRoute adminOnly>
                <CourseForm />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
