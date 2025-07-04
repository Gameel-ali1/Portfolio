import React, { useState } from "react";
import About from "./components/About";
import CertificatesAndCourses from "./components/CertificatesAndCourses";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope, FaBookOpen, FaRegMoon, FaRegSun } from "react-icons/fa6";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.body.className = theme === "light" ? "dark" : "light";
  };

  return (
    <div className={`app-container ${theme}`}> 
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
            <div className="inner-notch">
              <FaBookOpen className="icon" />
              <a href="#blog"><span className="bar-link-text">Blog</span></a>
            </div>
            <div className="inner-notch">
              <FaEnvelope className="icon" />
              <a href="mailto:Gamel_ali@outlook.com" aria-label="Email"><span className="bar-link-text">Contact</span></a>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <section id="about"><About /></section>
        <section id="certificates"><CertificatesAndCourses /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
        <section id="blog"><Blog /></section>
      </main>
    </div>
  );
}

export default App;
