import React, { useState, useEffect } from "react";
import { FaCalendar, FaUser, FaHeart, FaComment, FaEye, FaPlus, FaFilter, FaArrowRight } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./Blogs.css";

function Blogs({ searchTerm = "", setSearchTerm = () => {} }) {
  const [writeups, setWriteups] = useState([]);
  const [filteredWriteups, setFilteredWriteups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  
  const [newWriteup, setNewWriteup] = useState({
    title: "",
    content: "",
    author: "Gameel Ali",
    tags: []
  });

  // Fetch writeups from backend
  useEffect(() => {
    fetchWriteups();
  }, []);

  // Filter and sort writeups
  useEffect(() => {
    let filtered = [...writeups];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(writeup =>
        writeup.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        writeup.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        writeup.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter(writeup =>
        writeup.tags.includes(selectedTag)
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "mostLiked":
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case "mostViewed":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        break;
    }

    setFilteredWriteups(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [writeups, searchTerm, selectedTag, sortBy]);

  const fetchWriteups = async () => {
    try {
      setLoading(true);
      console.log('Fetching writeups from backend...');
      const response = await fetch('http://localhost:5000/api/writeups');
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to fetch writeups');
      }
      const data = await response.json();
      console.log('Fetched writeups:', data);
      setWriteups(data);
    } catch (err) {
      console.error('Error fetching writeups:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWriteup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/writeups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWriteup),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create writeup');
      }
      
      // Reset form and fetch updated data
      setNewWriteup({ title: "", content: "", author: "Gameel Ali", tags: [] });
      setShowCreateForm(false);
      fetchWriteups();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLike = async (writeupId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/writeups/${writeupId}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        fetchWriteups(); // Refresh data
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get unique tags from all writeups
  const getAllTags = () => {
    const tags = writeups.flatMap(writeup => writeup.tags || []);
    return [...new Set(tags)];
  };

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredWriteups.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredWriteups.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="blogs-container">
        <div className="blogs-header">
          <h1>Blog & Writeups</h1>
          <p>Explore thoughts, experiences, and insights</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading writeups...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blogs-container">
        <div className="blogs-header">
          <h1>Blog & Writeups</h1>
          <p>Explore thoughts, experiences, and insights</p>
        </div>
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={fetchWriteups} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  console.log('Blogs component rendering, loading:', loading, 'error:', error, 'writeups:', writeups.length);
  
  return (
    <div className="blogs-container">
      <div className="blogs-header">
        <h1>Blog & Writeups</h1>
        <p>Explore thoughts, experiences, and insights</p>
        <button 
          className="create-btn"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          <FaPlus /> {showCreateForm ? 'Cancel' : 'Create New Post'}
        </button>
      </div>

      {/* Create New Writeup Form */}
      {showCreateForm && (
        <div className="create-form">
          <h3>Create New Writeup</h3>
          <form onSubmit={handleCreateWriteup}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={newWriteup.title}
                onChange={(e) => setNewWriteup({...newWriteup, title: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                value={newWriteup.content}
                onChange={(e) => setNewWriteup({...newWriteup, content: e.target.value})}
                required
                rows="6"
              />
            </div>
            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                value={newWriteup.tags.join(', ')}
                onChange={(e) => setNewWriteup({...newWriteup, tags: e.target.value.split(',').map(tag => tag.trim())})}
                placeholder="technology, programming, web development"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">Create Post</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-controls">
          <div className="filter-group">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="mostLiked">Most Liked</option>
              <option value="mostViewed">Most Viewed</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Filter by tag:</label>
            <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
              <option value="">All Tags</option>
              {getAllTags().map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <p>Showing {filteredWriteups.length} of {writeups.length} posts</p>
      </div>

      {/* Writeups Grid */}
      <div className="writeups-grid">
        {currentPosts.length === 0 ? (
          <div className="empty-state">
            <h3>No posts found</h3>
            <p>Try adjusting your search or filters</p>
            <button 
              className="create-btn"
              onClick={() => setShowCreateForm(true)}
            >
              <FaPlus /> Create Your First Post
            </button>
          </div>
        ) : (
          currentPosts.map((writeup) => (
            <div key={writeup._id} className="writeup-card">
              <div className="writeup-header">
                <h3>{writeup.title}</h3>
                <div className="writeup-meta">
                  <span className="meta-item">
                    <FaUser /> {writeup.author}
                  </span>
                  <span className="meta-item">
                    <FaCalendar /> {formatDate(writeup.createdAt)}
                  </span>
                </div>
              </div>
              
              <div className="writeup-content">
                <p>{writeup.content.length > 150 
                  ? `${writeup.content.substring(0, 150)}...` 
                  : writeup.content}
                </p>
              </div>

              {writeup.tags && writeup.tags.length > 0 && (
                <div className="writeup-tags">
                  {writeup.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              )}

              <div className="writeup-footer">
                <div className="writeup-stats">
                  <span className="stat-item">
                    <FaHeart /> {writeup.likes || 0}
                  </span>
                  <span className="stat-item">
                    <FaComment /> {writeup.comments ? writeup.comments.length : 0}
                  </span>
                  <span className="stat-item">
                    <FaEye /> {writeup.views || 0}
                  </span>
                </div>
                <button 
                  className="like-btn"
                  onClick={() => handleLike(writeup._id)}
                >
                  <FaHeart /> Like
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
          
          <button 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Blogs; 