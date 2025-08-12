import { useState } from "react";
import { FileViewer } from "../modals";
import "./tabs.css";

import Resume from "../../assets/cj-s-ortiz.pdf";
interface EducationInterface {
  name: string;
  level: string;
  address: string;
  details: string;
}

interface TechStacksInterface {
  name: string;
  level: number;
}

// Skills 1-5 (5 with highest proficiency)
const techStackArr: TechStacksInterface[] = [
  {
    name: "Python",
    level: 3.5,
  },
  {
    name: "Java",
    level: 4.8,
  },
  {
    name: "ReactJs",
    level: 4.5,
  },
  {
    name: "Kafka / Kafkajs",
    level: 4.5,
  },
  {
    name: "Web-Socket",
    level: 4.4,
  },
  {
    name: "SpringBoot",
    level: 4.8,
  },
  {
    name: "CI/CD",
    level: 4.1,
  },
  {
    name: "TypeScript",
    level: 4.3,
  },
  {
    name: "React Native",
    level: 4.0,
  },
  {
    name: "MySQL",
    level: 4.7,
  },
  {
    name: "Owasp Security Guidelines",
    level: 4.4,
  },
  {
    name: "NodeJs",
    level: 4.4,
  },
];

const educArr: EducationInterface[] = [
  {
    name: "Bohol Island State University (BISU) - Main Campus",
    address: "Tagbilaran City, Bohol",
    level: "Secondary Education",
    details: " ",
  },
  {
    name: "Bohol Island State University (BISU) - Main Campus",
    address: "Tagbilaran City, Bohol",
    level: "Tertiary Education Education",
    details: "Bachelor in Science on Computer Engineering (BsCpE)",
  },
];

import {
  FaCode,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaUserTie,
} from "react-icons/fa";

export const ResumeTab = () => {
  const [openPdf, setOpenPdf] = useState<boolean>(false);

  return (
    <div style={{ padding: ".01rem 4%" }}>
      <h2 className="about-title">Resume</h2>

      <div style={{ maxHeight: 480, overflow: "auto", marginTop: "35px" }}>
        {/* Work Experience */}
        <div style={{ width: "90%" }}>
          <h4 className="good-title-class">WORK EXPERIENCE</h4>
          <div className="education-card">
            <div className="education-icon">
              <FaUserTie size={28} />
            </div>
            <div className="education-info">
              <h5>Software Developer / Engineer </h5>
              <span className="edu-level">Alliance Software Inc.</span>
              <div className="edu-address">
                <FaMapMarkerAlt size={14} style={{ marginRight: "5px" }} />
                Sumilon Road, Cebu City, 6000 Cebu
              </div>
              <p className="edu-details-work">
                Click to view project roles and contributions
              </p>
            </div>
          </div>
        </div>

        {/* Education */}
        <div style={{ width: "90%", marginTop: "20px" }}>
          <h4 className="good-title-class">EDUCATION</h4>
          <div className="education-container">
            {educArr.map((edu, index) => (
              <div key={index} className="education-card">
                <div className="education-icon">
                  <FaGraduationCap size={28} />
                </div>
                <div className="education-info">
                  <h5>{edu.name}</h5>
                  <span className="edu-level">{edu.level}</span>
                  <div className="edu-address">
                    <FaMapMarkerAlt size={14} style={{ marginRight: "5px" }} />
                    {edu.address}
                  </div>
                  {edu.details && <p className="edu-details">{edu.details}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div
          style={{
            height: "30vh",
            marginTop: 50,
            width: "90%",
          }}
        >
          <h4 className="good-title-class">TECH STACK</h4>
          <div className="techstack-container">
            {techStackArr.map((stack, index) => {
              const percentage = (stack.level / 5) * 100;
              return (
                <div className="techstack-item" key={index}>
                  <div className="techstack-header">
                    <FaCode size={16} style={{ marginRight: "8px" }} />
                    <span style={{ color: "#ffffff" }}>{stack.name}</span>
                    <span className="techstack-level">
                      {stack.level.toFixed(1)}/5
                    </span>
                  </div>
                  <div className="techstack-bar">
                    <div
                      className="techstack-progress"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="footer-resume-class" onClick={() => setOpenPdf(true)}>
        View PDF file
      </div>
      <FileViewer
        filePath={Resume}
        open={openPdf}
        onClose={() => setOpenPdf(false)}
      />
    </div>
  );
};
