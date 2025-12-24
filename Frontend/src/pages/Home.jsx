import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              Learn Without Limits
            </h1>
            <p className="hero-subtitle">
              Discover thousands of courses from expert instructors. 
              Start learning today and unlock your potential.
            </p>
            
            <div className="hero-actions">
              {!isAuthenticated ? (
                <>
                  <Link to="/signup" className="btn btn-primary btn-lg">
                    Get Started Free
                  </Link>
                  <Link to="/courses" className="btn btn-outline btn-lg">
                    Browse Courses
                  </Link>
                </>
              ) : isAdmin ? (
                <>
                  <Link to="/admin/create" className="btn btn-primary btn-lg">
                    Create New Course
                  </Link>
                  <Link to="/admin/courses" className="btn btn-outline btn-lg">
                    Manage Courses
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/courses" className="btn btn-primary btn-lg">
                    Browse Courses
                  </Link>
                  <Link to="/my-courses" className="btn btn-outline btn-lg">
                    My Learning
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="features-section py-4">
        <div className="container">
          <h2 className="text-center mb-4">Why Choose CourseHub?</h2>
          
          <div className="grid grid-3">
            <div className="feature-card card fade-in">
              <div className="feature-icon">🎓</div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals with years of experience</p>
            </div>
            
            <div className="feature-card card fade-in">
              <div className="feature-icon">⚡</div>
              <h3>Learn at Your Pace</h3>
              <p>Access courses anytime, anywhere, on any device</p>
            </div>
            
            <div className="feature-card card fade-in">
              <div className="feature-icon">🏆</div>
              <h3>Quality Content</h3>
              <p>High-quality courses designed to help you succeed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section py-4">
        <div className="container">
          <div className="cta-card card text-center">
            <h2 className="mb-2">Ready to Start Learning?</h2>
            <p className="mb-3">Join thousands of learners already mastering new skills</p>
            {!isAuthenticated && (
              <Link to="/signup" className="btn btn-primary btn-lg">
                Sign Up Now
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
