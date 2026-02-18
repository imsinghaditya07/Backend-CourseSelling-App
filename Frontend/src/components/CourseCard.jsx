import { useNavigate } from 'react-router-dom';
import { Star, User, Flag, Clock } from 'lucide-react';
import './CourseCard.css';

const CourseCard = ({ course, isPurchased, isAdmin, onEdit }) => {
  const navigate = useNavigate();

  const handlePurchase = () => {
    navigate(`/course/${course._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(course);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Generate random stats for demo purposes since backend might not have them
  const rating = (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1);
  const reviews = Math.floor(Math.random() * 3000) + 100;
  const originalPrice = (course.price * 1.5).toFixed(2);

  return (
    <div className="course-card" onClick={handlePurchase}>
      <div className="card-image-container">
        {reviews > 1000 && <span className="card-badge">Best Seller</span>}
        <img 
          src={course.imageLink || course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
          alt={course.title} 
          className="card-image"
        />
      </div>

      <div className="card-content">
        <div className="card-meta">
          <span className="card-category">Development</span>
          <div className="card-rating">
            <span style={{color: '#F59E0B', fontWeight: 'bold'}}>{rating}</span>
            <div className="stars flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill={i < Math.floor(rating) ? "#F59E0B" : "none"} color="#F59E0B" />
              ))}
            </div>
            <span>({reviews.toLocaleString()})</span>
          </div>
        </div>

        <h3 className="card-title">{course.title}</h3>

        <div className="card-instructor">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
             <User size={16} className="text-gray-500" />
          </div>
          <span className="instructor-name">Instructor Name</span>
        </div>

        <div className="card-footer">
          {isAdmin ? (
             <div className="flex gap-2 w-full">
               <button 
                className="btn-card-secondary flex-1"
                onClick={handleEdit}
              >
                Edit
              </button>
             </div>
          ) : (
            <>
              <div className="card-price">
                 {!isPurchased && <span className="current-price">{formatPrice(course.price)}</span>}
                 {!isPurchased && <span className="original-price text-sm text-gray-400 line-through">${originalPrice}</span>}
              </div>
              <button 
                className="btn-enroll"
                onClick={(e) => {
                  e.stopPropagation();
                  isPurchased ? navigate(`/course/${course._id}/learn`) : handlePurchase();
                }}
              >
                {isPurchased ? 'Start Learning' : 'Enroll Now'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
