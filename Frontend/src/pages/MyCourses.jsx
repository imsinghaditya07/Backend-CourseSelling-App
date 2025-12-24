import { useState, useEffect } from 'react';
import { userAPI } from '../utils/api';
import CourseCard from '../components/CourseCard';
import './Courses.css';

const MyCourses = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await userAPI.getPurchases();
      setPurchases(response.data.purchases || []);
    } catch (err) {
      console.error('Failed to fetch purchases:', err);
      setError('Failed to load your courses. Please try again later.');
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
          <h1>My Courses</h1>
          <p>Continue your learning journey</p>
        </div>

        {purchases.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-icon">🎓</div>
            <h3>No Courses Yet</h3>
            <p>Start learning by purchasing your first course!</p>
            <a href="/courses" className="btn btn-primary mt-3">
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="courses-grid grid grid-3">
            {purchases.map((purchase) => (
              <CourseCard 
                key={purchase._id} 
                course={purchase.courseId}
                isPurchased={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
