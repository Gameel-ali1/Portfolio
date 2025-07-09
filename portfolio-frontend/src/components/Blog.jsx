import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";
import config from "../config";
import "./Blog.css";

function Blog() {
  const [writeups, setWriteups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch writeups from backend
  useEffect(() => {
    fetchWriteups();
  }, []);

  const fetchWriteups = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.API_URL}/api/writeups`);
      if (!response.ok) {
        throw new Error('Failed to fetch writeups');
      }
      const data = await response.json();
      setWriteups(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get random posts for display (up to 6)
  const getRandomPosts = () => {
    if (writeups.length === 0) return [];
    
    // Shuffle the array and take up to 6 posts
    const shuffled = [...writeups].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  };

  const randomPosts = getRandomPosts();

  // Generate random colors for blog cards
  const getRandomColor = () => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (loading) {
    return (
      <div className="blog-container">
        <div className="blog-header">
          <h2>Latest Blog Posts</h2>
          <p>Discover my thoughts and experiences</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-container">
        <div className="blog-header">
          <h2>Latest Blog Posts</h2>
          <p>Discover my thoughts and experiences</p>
        </div>
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={fetchWriteups} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h2>Latest Blog Posts</h2>
        <p>Discover my thoughts and experiences</p>
      </div>

      {/* Blog Cards Container */}
      <div className="blog-cards-container">
        {randomPosts.length === 0 ? (
          <div className="empty-state">
            <h3>No posts yet</h3>
            <p>I'm working on some great content. Check back soon!</p>
          </div>
        ) : (
          <div className="blog-cards-grid">
            {randomPosts.map((writeup, index) => (
              <Link key={writeup._id} to="/blogs" className="blog-card" style={{ background: getRandomColor() }}>
                <div className="blog-card-content">
                  <h3>{writeup.title}</h3>
                  <p>{writeup.content.length > 80 
                    ? `${writeup.content.substring(0, 80)}...` 
                    : writeup.content}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* View All Posts Button */}
      <div className="view-all-section">
        <Link to="/blogs" className="view-all-btn">
          <FaBookOpen /> View All Posts
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default Blog; 