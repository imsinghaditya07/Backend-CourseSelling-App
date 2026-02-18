import { useState, useEffect } from 'react';
import { userAPI } from '../utils/api';
import CourseCard from '../components/CourseCard';
import { Filter, ChevronDown, BookOpen, Search } from 'lucide-react';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await userAPI.getAllCourses();
      setCourses(response.data.courses || []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setError('Failed to load courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Web Development", "Data Science", "Marketing", "Business", "Design", "Personal Growth"
  ];

  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  return (
    <div className="courses-page">
      <div className="container">
        
        {/* Mobile Filter Toggle */}
        <div className="mobile-filters-toggle lg:hidden">
          <button 
            className="btn btn-secondary w-full"
            onClick={() => setShowFilters(!showFilters)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Filter size={18} /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="courses-layout">
          {/* Sidebar Filters */}
          <aside className={`course-filters ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <h3 className="filter-title flex items-center gap-2" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              <Filter size={20} /> Filters
            </h3>

            <div className="filter-section">
              <h4 className="filter-title">Categories</h4>
              <div className="filter-group">
                {categories.map((cat, i) => (
                  <label key={i} className="checkbox-label">
                    <input type="checkbox" defaultChecked={i === 0}/> 
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Difficulty Level</h4>
              <div className="filter-group">
                {levels.map((lvl, i) => (
                  <label key={i} className="checkbox-label">
                    <input type="checkbox" defaultChecked={i === 0} />
                    <span>{lvl}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Price Range</h4>
              <div className="price-slider">
                <div className="price-slider-bar"></div>
                <div className="price-slider-thumb"></div>
              </div>
              <div className="flex justify-between text-secondary font-medium mt-2" style={{ fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>$0</span>
                <span>$100+</span>
              </div>
              <div className="filter-group mt-4" style={{ marginTop: '1rem' }}>
                 <label className="checkbox-label">
                    <input type="radio" name="price" />
                    <span>Free</span>
                 </label>
                 <label className="checkbox-label">
                    <input type="radio" name="price" defaultChecked />
                    <span>Paid</span>
                 </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="courses-main">
            <div className="courses-main-header">
              <div className="courses-title">
                <h1>Course Catalog</h1>
                <p>Explore {courses.length} courses from world-class experts.</p>
              </div>
              
              <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="text-secondary" style={{ fontSize: '0.9rem', fontWeight: 500 }}>Sort by:</span>
                <select 
                  className="sort-dropdown"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex-center p-12" style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                <div className="spinner"></div>
              </div>
            ) : error ? (
              <div className="error-message p-4 rounded-md border" style={{ background: '#FEF2F2', borderColor: '#FECACA', color: '#DC2626' }}>
                {error}
              </div>
            ) : courses.length === 0 ? (
               <div className="empty-state text-center py-12 bg-white rounded-lg border border-gray-100" style={{ padding: '3rem', textAlign: 'center', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                 <div className="mx-auto mb-4 text-gray-400" style={{ display: 'inline-flex', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '50%' }}>
                   <BookOpen size={32} />
                 </div>
                 <h3 className="text-lg font-bold">No courses found</h3>
                 <p className="text-secondary mt-2">Try adjusting your filters or search query.</p>
               </div>
            ) : (
              <>
                <div className="courses-grid">
                  {courses.map(course => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="pagination">
                   <button className="page-btn"><ChevronDown size={16} style={{ transform: 'rotate(90deg)' }} /></button>
                   <button className="page-btn active">1</button>
                   <button className="page-btn">2</button>
                   <button className="page-btn">3</button>
                   <span className="flex items-end px-2 text-secondary" style={{ display: 'flex', alignItems: 'flex-end', padding: '0 0.5rem' }}>...</span>
                   <button className="page-btn">12</button>
                   <button className="page-btn"><ChevronDown size={16} style={{ transform: 'rotate(-90deg)' }} /></button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Courses;
