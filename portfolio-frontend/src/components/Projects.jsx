import React, { useState } from "react";
import "./Projects.css";

function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Study Buddy",
      subtitle: "Student Collaboration Platform",
      description: "A comprehensive web application designed to help students connect and study together. Features real-time collaboration tools, study group management, and resource sharing capabilities.",
      technologies: ["HTML", "CSS", "JavaScript", "Django", "REST Framework", "Azure"],
      features: [
        "Real-time study group creation and management",
        "Resource sharing and collaborative note-taking",
        "User authentication and profile management",
        "Cloud deployment with Azure",
        "RESTful API architecture"
      ],
      icon: "📚",
      color: "var(--color-accent)",
      github: "#",
      live: "#"
    },
    {
      id: 2,
      title: "PortSwigger Scripts",
      subtitle: "Security Testing Automation",
      description: "A comprehensive repository of Python scripts designed to automate various PortSwigger Web Security Academy labs. Each script targets specific vulnerabilities and security challenges.",
      technologies: ["Python", "Requests", "BeautifulSoup", "Selenium", "Cryptography"],
      features: [
        "Automated vulnerability exploitation scripts",
        "Web scraping and form manipulation",
        "Session handling and authentication bypass",
        "Custom payload generation",
        "Modular and reusable code structure"
      ],
      icon: "🔒",
      color: "var(--color-highlight)",
      github: "#",
      live: "#"
    }
  ];

  return (
    <div className="projects-container">
      <div className="section-title">PROJECTS</div>
      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-card ${activeProject === project.id ? 'active' : ''}`}
            onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
            style={{ '--project-color': project.color }}
          >
            <div className="project-header">
              <div className="project-icon">{project.icon}</div>
              <div className="project-title-group">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
              </div>
              <div className="project-toggle">
                <span className="toggle-icon">+</span>
              </div>
            </div>
            
            <div className="project-content">
              <p className="project-description">{project.description}</p>
              
              <div className="project-technologies">
                <h4>Technologies Used</h4>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="project-features">
                <h4>Key Features</h4>
                <ul className="features-list">
                  {project.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-bullet">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="project-links">
                <a href={project.github} className="project-link github-link">
                  <span className="link-icon">📁</span>
                  View Code
                </a>
                <a href={project.live} className="project-link live-link">
                  <span className="link-icon">🌐</span>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects; 