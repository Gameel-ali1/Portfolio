import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Contact.css";

function Contact() {
  const contactWidgets = [
    {
      id: "linkedin",
      name: "LinkedIn",
      value: "your-linkedin-profile",
      link: "https://linkedin.com/in/your-profile",
      description: "Professional Network",
      status: "online",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
    },
    {
      id: "email",
      name: "Email",
      value: "your.email@example.com",
      link: "mailto:your.email@example.com",
      description: "Direct Message",
      status: "online",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      value: "+1234567890",
      link: "https://wa.me/1234567890",
      description: "Instant Chat",
      status: "online",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    },
    {
      id: "x",
      name: "X",
      value: "@yourusername",
      link: "https://twitter.com/yourusername",
      description: "Social Feed",
      status: "online",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
    }
  ];

  return (
    <div className="contact-section">
      <h2 className="contact-section-title">Contact</h2>
      <p className="contact-description">
        Click any widget to connect instantly.
      </p>
      <div className="widget-grid">
        <AnimatePresence>
          {contactWidgets.map((widget) => (
            <motion.a
              key={widget.id}
              className="contact-widget"
              href={widget.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <div className="widget-header">
                <div className="widget-icon">
                  <img src={widget.logo} alt={widget.name} className={`widget-logo ${widget.id}`} />
                </div>
                <div className="widget-info">
                  <h3 className="widget-name">{widget.name}</h3>
                  <p className="widget-description">{widget.description}</p>
                </div>
                <div className={`status-indicator ${widget.status}`}></div>
              </div>
              <div className="widget-pattern"></div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Contact; 