import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { courseAPI } from '../utils/api';
import './CourseCard.css';

const CourseCard = ({ course, onPurchase, isPurchased = false, isAdmin = false, onEdit }) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to purchase courses');
      return;
    }

    setLoading(true);
    try {
      await courseAPI.purchaseCourse(course._id);
      alert('Course purchased successfully!');
      if (onPurchase) onPurchase();
    } catch (error) {
      console.error('Purchase failed:', error);
      alert(error.response?.data?.message || 'Failed to purchase course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card course-card">
      <div className="course-image">
        <img 
          src={course.imageUrl || course.imageURL || 'https://via.placeholder.com/400x250?text=Course'} 
          alt={course.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x250?text=Course+Image';
          }}
        />
      </div>
      
      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>
        
        <div className="course-footer">
          <div className="course-price">
            <span className="price-label">Price:</span>
            <span className="price-value">${course.price}</span>
          </div>
          
          <div className="course-actions">
            {isAdmin ? (
              <button 
                className="btn btn-secondary"
                onClick={() => onEdit && onEdit(course)}
              >
                Edit Course
              </button>
            ) : isPurchased ? (
              <button className="btn btn-success" disabled>
                ✓ Purchased
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={handlePurchase}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Purchase Now'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
