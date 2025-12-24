import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminAPI } from '../utils/api';
import './CourseForm.css';

const CourseForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editCourse = location.state?.course;
  const isEdit = !!editCourse;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageURL: '',
  });

  useEffect(() => {
    if (editCourse) {
      setFormData({
        title: editCourse.title || '',
        description: editCourse.description || '',
        price: editCourse.price || '',
        imageURL: editCourse.imageUrl || editCourse.imageURL || '',
      });
    }
  }, [editCourse]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (isEdit) {
        data.courseId = editCourse._id;
        await adminAPI.updateCourse(data);
        alert('Course updated successfully!');
      } else {
        await adminAPI.createCourse(data);
        alert('Course created successfully!');
      }
      
      navigate('/admin/courses');
    } catch (err) {
      console.error('Course form error:', err);
      setError(err.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} course. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-form-page">
      <div className="container">
        <div className="form-container fade-in">
          <div className="form-card card">
            <div className="form-header">
              <h2>{isEdit ? 'Edit Course' : 'Create New Course'}</h2>
              <p>Fill in the details to {isEdit ? 'update' : 'create'} your course</p>
            </div>

            <form onSubmit={handleSubmit} className="course-form">
              <div className="form-group">
                <label className="form-label">Course Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="e.g., Complete Web Development Bootcamp"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-input form-textarea"
                  placeholder="Describe what students will learn in this course..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    className="form-input"
                    placeholder="49.99"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    name="imageURL"
                    className="form-input"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageURL}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {formData.imageURL && (
                <div className="image-preview">
                  <label className="form-label">Preview</label>
                  <img 
                    src={formData.imageURL} 
                    alt="Course preview"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {error && <div className="form-error">{error}</div>}

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => navigate('/admin/courses')}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : isEdit ? 'Update Course' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
