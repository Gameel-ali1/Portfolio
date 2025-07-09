import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from "./components/About";
import CertificatesAndCourses from "./components/CertificatesAndCourses";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope, FaBookOpen, FaRegMoon, FaRegSun, FaMagnifyingGlass } from "react-icons/fa6";
import BackgroundGrid from "./BackgroundGrid";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.body.className = theme === "light" ? "dark" : "light";
  };

  // Navigation component for main portfolio
  const Navigation = () => (
    <nav className="notch-navbar">
      <div className="notch-left">
        <a href="https://github.com/Gameel-ali1" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub className="icon" />
        </a>
        <a href="https://www.linkedin.com/in/gameel-ali-089446281/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin className="icon" />
        </a>
        <a href="https://x.com/Gameel_ad" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
          <FaXTwitter className="icon" />
        </a>
      </div>
      <div className="notch-center">
        {/* Center can be left empty or add logo/text if needed */}
      </div>
      <div className="notch-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <FaRegMoon className="icon" /> : <FaRegSun className="icon" />}
        </button>
        <div className="notch-links">
          <Link to="/blogs" className="inner-notch">
            <FaBookOpen className="icon" />
            <span className="bar-link-text">Blog</span>
          </Link>
          <a href="mailto:Gamel_ali@outlook.com" aria-label="Email" className="inner-notch">
            <FaEnvelope className="icon" />
            <span className="bar-link-text">Contact</span>
          </a>
        </div>
      </div>
    </nav>
  );

  // Navigation component for blogs page
  const BlogsNavigation = () => (
    <nav className="notch-navbar blogs-navbar">
      <div className="notch-left">
        <Link to="/" className="home-link">
          <span className="home-text">Jimmex</span>
        </Link>
      </div>
      <div className="notch-center">
        <div className="search-box">
                          <FaMagnifyingGlass className="search-icon" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="notch-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <FaRegMoon className="icon" /> : <FaRegSun className="icon" />}
        </button>
        <div className="notch-links">
          <a href="mailto:Gamel_ali@outlook.com" aria-label="Email" className="inner-notch">
            <FaEnvelope className="icon" />
            <span className="bar-link-text">Contact</span>
          </a>
        </div>
      </div>
    </nav>
  );

  // Home page component
  const HomePage = () => (
    <>
      <BackgroundGrid />
      <Navigation />
      <main>
        <section id="about"><About /></section>
        <section id="certificates"><CertificatesAndCourses /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
        <section id="blog"><Blog /></section>
      </main>
      <Footer />
    </>
  );

  // Blogs page component
  const BlogsPage = () => (
    <>
      <BackgroundGrid />
      <BlogsNavigation />
      <main>
        <Blogs searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </main>
      <Footer />
    </>
  );

  return (
    <Router>
      <div className={`app-container ${theme}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
