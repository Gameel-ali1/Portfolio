import React, { useState, useEffect } from "react";
import "./About.css";
import profilePic from "../assets/profile.jpg"; // Replace with your image

const typeWriterText = "Hi, I am Jimmy a Penetration Tester Who loves Hacking\nNetworks and Web Applications";

function About() {
  const [displayedText, setDisplayedText] = useState("");

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
          setDisplayedText(typeWriterText.slice(0, i - 1));
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
    <>
      <div className="about-section-title">ABOUT</div>
      <div className="about-container">
        <div className="about-image-wrapper" style={{ marginLeft: '-10px' }}>
          <img
            src={profilePic}
            alt="Jimmy profile"
            className="about-image"
          />
        </div>
        <div className="about-text">
          <div className="typewriter-box">
            <h2 className="typewriter">{displayedText}</h2>
          </div>
          <p>
            Computer and Control Systems Engineer, Penetration Tester, and little bit of Web Developer. I am passionate about cybersecurity and penetration testing. Here you can find my certificates, projects, and more about my journey.
          </p>
        </div>
      </div>
    </>
  );
}

export default About; 