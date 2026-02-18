import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminAPI } from '../utils/api';
import { Type, FileText, DollarSign, Image as ImageIcon, Save, X, AlertCircle } from 'lucide-react';
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
              <p>Fill in the details below to {isEdit ? 'update your' : 'launch a new'} course</p>
            </div>

            <form onSubmit={handleSubmit} className="course-form">
              <div className="form-group">
                <label className="form-label">Course Title</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="title"
                    className="form-input"
                    placeholder="e.g., Complete Web Development Bootcamp"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  <Type size={18} className="input-icon" style={{ left: '12px', position: 'absolute' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <div className="input-wrapper" style={{ alignItems: 'flex-start' }}>
                  <textarea
                    name="description"
                    className="form-input form-textarea"
                    placeholder="Describe what students will learn in this course..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                    style={{ paddingTop: '2.5rem' }}
                  />
                  <FileText size={18} className="input-icon" style={{ left: '12px', top: '16px', position: 'absolute' }} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Price ($)</label>
                  <div className="input-wrapper">
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
                    <DollarSign size={18} className="input-icon" style={{ left: '12px', position: 'absolute' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <div className="input-wrapper">
                    <input
                      type="url"
                      name="imageURL"
                      className="form-input"
                      placeholder="https://example.com/image.jpg"
                      value={formData.imageURL}
                      onChange={handleChange}
                    />
                    <ImageIcon size={18} className="input-icon" style={{ left: '12px', position: 'absolute' }} />
                  </div>
                </div>
              </div>

              {formData.imageURL && (
                <div className="image-preview-container">
                  <span className="image-preview-label">Preview</span>
                  <div className="image-preview">
                    <img 
                      src={formData.imageURL} 
                      alt="Course preview"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="form-error">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-cancel"
                  onClick={() => navigate('/admin/courses')}
                >
                  <X size={18} style={{ marginRight: '8px' }} /> Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  <Save size={18} style={{ marginRight: '8px' }} />
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
