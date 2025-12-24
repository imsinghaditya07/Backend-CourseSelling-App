import { useState, useEffect } from 'react';
import { courseAPI } from '../utils/api';
import CourseCard from '../components/CourseCard';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getAllCourses();
      setCourses(response.data.courses || []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setError('Failed to load courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="courses-page">
        <div className="container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-page">
        <div className="container">
          <div className="error-message card">
            <h3>⚠️ {error}</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Explore Courses</h1>
          <p>Discover your next learning adventure</p>
        </div>

        {courses.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-icon">📚</div>
            <h3>No Courses Available</h3>
            <p>Check back later for new courses!</p>
          </div>
        ) : (
          <div className="courses-grid grid grid-3">
            {courses.map((course) => (
              <CourseCard 
                key={course._id} 
                course={course}
                onPurchase={fetchCourses}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
