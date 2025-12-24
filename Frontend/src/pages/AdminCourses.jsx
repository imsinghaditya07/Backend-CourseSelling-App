import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../utils/api';
import CourseCard from '../components/CourseCard';
import './Courses.css';

const AdminCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await adminAPI.getCourses();
      setCourses(response.data.courseId || []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setError('Failed to load your courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    navigate('/admin/edit', { state: { course } });
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
          <h1>My Courses</h1>
          <p>Manage your course catalog</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/admin/create')}
          >
            + Create New Course
          </button>
        </div>

        {courses.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-icon">📝</div>
            <h3>No Courses Created</h3>
            <p>Start by creating your first course!</p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => navigate('/admin/create')}
            >
              Create Course
            </button>
          </div>
        ) : (
          <div className="courses-grid grid grid-3">
            {courses.map((course) => (
              <CourseCard 
                key={course._id} 
                course={course}
                isAdmin={true}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;
