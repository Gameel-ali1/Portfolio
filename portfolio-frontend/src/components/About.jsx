import React, { useState, useEffect } from "react";
import "./About.css";
import profilePic from "../assets/profile.jpg";

const typeWriterText = "Hi, I am Jimmy a Penetration Tester Who loves Hacking Networks and Web Applications";

function About() {
  const [displayedText, setDisplayedText] = useState("\u00A0"); // Start with a non-breaking space

  useEffect(() => {
    let i = 0;
    let forward = true;
    let interval;

    function startTyping() {
      interval = setInterval(() => {
        if (forward) {
          setDisplayedText(typeWriterText.slice(0, i + 1));
          i++;
          if (i === typeWriterText.length) {
            clearInterval(interval);
            setTimeout(() => {
              forward = false;
              startTyping();
            }, 1000);
          }
        } else {
          const newText = typeWriterText.slice(0, i - 1);
          setDisplayedText(newText || "\u00A0"); // Use non-breaking space if empty
          i--;
          if (i === 0) {
            forward = true;
          }
        }
      }, 50);
    }

    startTyping();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-wrapper">
      <div className="section-title">ABOUT</div>
      <div className="about-typewriter-row">
        <div className="typewriter-box">
          <h2 className="typewriter">{displayedText}</h2>
        </div>
      </div>
      <div className="about-content-section">
        <p className="about-text">
          Computer and Control Systems Engineer, Penetration Tester, and little bit of Web Developer. I am passionate about cybersecurity and penetration testing. Here you can find my certificates, projects, and more about my journey.
        </p>
        <div className="about-image-wrapper">
          <img
            src={profilePic}
            alt="Jimmy profile"
            className="about-image"
          />
        </div>
      </div>
    </div>
  );
}

export default About; 