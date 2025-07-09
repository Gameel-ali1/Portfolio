import React from "react";
import "./CertificatesAndCourses.css";

const certificates = [
  {
    name: "CCNA",
    full: "Cisco Certified Network Associate",
    desc: "Mastered networking fundamentals and Cisco technologies."
  },
  {
    name: "RHCSA",
    full: "Red Hat Certified System Administrator",
    desc: "Proven skills in Linux system administration and automation."
  },
  {
    name: "MCSA",
    full: "Microsoft Certified Solutions Associate",
    desc: "Solid foundation in Microsoft technologies and server management."
  },
  {
    name: "LFCS",
    full: "Linux Foundation Certified System Administrator",
    desc: "Demonstrated expertise in Linux systems and open-source tools."
  },
  {
    name: "eJPT",
    full: "eLearnSecurity Junior Penetration Tester",
    desc: "Hands-on penetration testing and ethical hacking skills."
  },
  {
    name: "CBBH",
    full: "Certified Bug Bounty Hunter",
    desc: "Experience in real-world bug bounty programs and vulnerability discovery."
  },
  {
    name: "CPTS",
    full: "Certified Penetration Testing Specialist",
    desc: "Advanced penetration testing methodologies and reporting."
  },
  {
    name: "OSCP",
    full: "Offensive Security Certified Professional",
    desc: "Industry-leading certification in practical offensive security."
  }
];

function CertificatesAndCourses() {
  return (
    <div className="certificates-container">
      <div className="section-title">CERTIFICATES & COURSES</div>
      <p>
        My journey in IT and cybersecurity is marked by a passion for continuous learning and hands-on achievement. Here are some of the certifications and courses that have shaped my expertise:
      </p>
      <div className="cert-grid">
        {certificates.map(cert => (
          <div className="cert-card vertical-card" key={cert.name}>
            <span className="vertical-name">{cert.name.split('').join('\n')}</span>
            <span className="vertical-separator"></span>
            <div className="vertical-content">
              <div className="cert-title">{cert.full}</div>
              <div className="cert-desc">{cert.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CertificatesAndCourses; 