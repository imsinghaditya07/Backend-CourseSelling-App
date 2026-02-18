import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { courseAPI } from '../utils/api';
import { ShoppingCart, Play, CheckCircle, Clock, Star, Edit } from 'lucide-react';
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
    <div className="course-card glass-card">
      <div className="course-image">
        <span className="course-badge">Premium</span>
        <img 
          src={course.imageUrl || course.imageURL || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
          alt={course.title}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
      </div>
      
      <div className="course-content">
        <h3 className="course-title" title={course.title}>{course.title}</h3>
        
        <div className="course-meta">
          <div className="meta-item">
            <Clock size={14} className="text-secondary" />
            <span>12h 30m</span>
          </div>
          <div className="meta-item">
            <Star size={14} className="text-warning" fill="currentColor" />
            <span>4.8 (120)</span>
          </div>
        </div>

        <p className="course-description">{course.description}</p>
        
        <div className="course-footer">
          <div className="price-container">
            <span className="price-label">Investment</span>
            <span className="price">${course.price}</span>
          </div>
          
          <div className="course-actions">
            {isAdmin ? (
              <button 
                className="btn btn-outline"
                onClick={() => onEdit && onEdit(course)}
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                <Edit size={16} /> Edit
              </button>
            ) : isPurchased ? (
              <button className="btn btn-success" disabled style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <CheckCircle size={16} /> Owned
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={handlePurchase}
                disabled={loading}
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                {loading ? '...' : <>Buy Now <ShoppingCart size={16} /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
