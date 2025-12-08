import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaLinkedin,
  FaGithub,
  FaCalendar,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaFilePdf,
} from "react-icons/fa";
import { MdLanguage, MdVerified } from "react-icons/md";

const DigitalResumeContent = ({ userData }) => {
  // State for expandable sections__
  const [expandedAbout, setExpandedAbout] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState({});

  // Mock data - Replace with actual props__
  const resumeData = userData || {
    // Personal Info
    name: "Alex Johnson",
    title: "Senior Frontend Developer",
    image:
      "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1759741106/Job%20Hunting/udfo2zthr1rydxzvekfb.jpg",
    about:
      "Passionate frontend developer with 5+ years of experience building responsive web applications. Specialized in React, TypeScript, and modern JavaScript. Strong advocate for clean code, UX best practices, and collaborative development. Always eager to learn new technologies and tackle challenging problems.",

    // Contact Info
    location: "San Francisco, CA, USA",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",

    // Social Links
    social: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      portfolio: "https://alexjohnson.dev",
    },

    // Languages
    languages: ["English (Fluent)", "Spanish (Intermediate)", "French (Basic)"],

    // Experience
    experience: [
      {
        company: "Ollyo",
        position: "Front End Developer",
        isCurrent: true,
        startDate: "2021",
        endDate: "Present",
        location: "Bangladesh, Dhaka, Mirpur 12",
        description:
          "Leading frontend development for multiple client projects. Implementing responsive designs, optimizing performance, and mentoring junior developers.",
      },
      {
        company: "Suck",
        position: "Jr. Front End Developer",
        isCurrent: false,
        startDate: "2019",
        endDate: "2020",
        location: "Bangladesh, Dhaka, Bonani",
        description:
          "Developed and maintained client websites using React and Node.js. Collaborated with design team to implement pixel-perfect UI components.",
      },
    ],

    // Education
    education: [
      {
        institution: "PDB Secondary High School",
        degree: "Science",
        startYear: "2012",
        endYear: "2021",
      },
    ],

    // Skills
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "MongoDB",
      "Git",
    ],

    // Projects
    projects: [
      {
        name: "Study Group Platform",
        description:
          "A collaborative learning platform for students to create and join study groups. Features real-time chat, resource sharing, and scheduling.",
        techStack: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io"],
        fullDescription:
          "Uniquely simplify emerging sources for long-term high-impact applications. Conveniently harness multimedia based technologies after maintainable communities. Continually evisculate global products through frictionless solutions. Appropriately negotiate.",
      },
    ],

    // Certifications
    certifications: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        year: "2022",
      },
    ],

    // Custom Resume Link
    customResumeLink: "https://drive.google.com/file/d/example/view",
  };

  // Helper functions__
  const hasData = (data) => data && data.length > 0;
  const toggleProject = (index) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="digital-resume p-2 max-w-4xl mx-auto">
      {/* Header Section with Bigger Image */}
      <div className="resume-header text-center mb-8 pb-8 border-b border-gray-200">
        <div className="flex flex-col items-center">

          <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6">
            <img
              src={resumeData.image}
              alt={resumeData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {resumeData.name}
          </h1>
          <p className="text-xl text-[#3c8f63] font-semibold mt-2">
            {resumeData.title}
          </p>

          {/* Contact Info Row */}
          <div className="flex flex-wrap justify-center gap-8 mt-4">

            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-[#3c8f63]" />
              <span>{resumeData.location}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <FaEnvelope className="text-[#3c8f63]" />
              <span>{resumeData.email}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <FaPhone className="text-[#3c8f63]" />
              <span>{resumeData.phone}</span>
            </div>

          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-4">
            {resumeData.social.linkedin && (
              <a
                href={resumeData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <FaLinkedin className="text-blue-600" />
                <span>LinkedIn</span>
              </a>
            )}
            {resumeData.social.github && (
              <a
                href={resumeData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
            )}
            {resumeData.social.portfolio && (
              <a
                href={resumeData.social.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <FaGlobe className="text-[#3c8f63]" />
                <span>Portfolio</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Single Column Content */}
      <div className="space-y-8">
        {/* About Section */}
        <section className="bg-gray-100 rounded-xl p-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MdVerified className="text-[#3c8f63]" />
              Professional Summary
            </h2>
            {resumeData.about && resumeData.about.length > 200 && (
              <button
                onClick={() => setExpandedAbout(!expandedAbout)}
                className="text-sm text-[#3c8f63] hover:text-[#2a6b4a] flex items-center gap-1"
              >
                {expandedAbout ? "Show Less" : "Show More"}
                {expandedAbout ? (
                  <FaChevronUp className="text-xs" />
                ) : (
                  <FaChevronDown className="text-xs" />
                )}
              </button>
            )}
          </div>
          {resumeData.about ? (
            <p className="text-gray-700 leading-relaxed">
              {expandedAbout || resumeData.about.length <= 200
                ? resumeData.about
                : `${resumeData.about.substring(0, 200)}...`}
            </p>
          ) : (
            <p className="text-gray-500 italic">
              No summary provided by the candidate.
            </p>
          )}
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
            <FaBriefcase className="text-[#3c8f63]" />
            Work Experience
          </h2>

          {hasData(resumeData.experience) ? (
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="border-l-4 border-[#3c8f63] pl-5 py-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${
                        exp.isCurrent
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {exp.isCurrent ? "Current" : "Previous"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <FaCalendar className="text-xs" />
                      {exp.startDate} - {exp.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-xs" />
                      {exp.location}
                    </span>
                  </div>

                  <p className="text-gray-600 mt-4">{exp.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
              <FaBriefcase className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                No work experience information provided.
              </p>
            </div>
          )}
        </section>

        {/* Skills & Languages Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills */}
          <section className="bg-gray-100 rounded-xl p-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <FaCode className="text-[#3c8f63]" />
              Skills
            </h2>
            {hasData(resumeData.skills) ? (
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No skills information provided.
              </p>
            )}
          </section>

          {/* Languages & Education */}
          <div className="space-y-6">
            {/* Languages */}
            <section className="bg-gray-100 rounded-xl p-3">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                <MdLanguage className="text-[#3c8f63]" />
                Languages
              </h2>
              {hasData(resumeData.languages) ? (
                <div className="space-y-2">
                  {resumeData.languages.map((lang, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700">
                        {lang.split("(")[0].trim()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {lang.match(/\(([^)]+)\)/)?.[1] || ""}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No languages information provided.
                </p>
              )}
            </section>

            {/* Education */}
            <section className="bg-gray-100 rounded-xl p-3">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                <FaGraduationCap className="text-[#3c8f63]" />
                Education
              </h2>
              {hasData(resumeData.education) ? (
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900">
                        {edu.institution}
                      </h3>
                      <p className="text-gray-700">{edu.degree}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <FaCalendar className="text-xs" />
                        <span>
                          {edu.startYear} - {edu.endYear}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No education information provided.
                </p>
              )}
            </section>
          </div>
        </div>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
            <FaCode className="text-[#3c8f63]" />
            Projects
          </h2>

          {hasData(resumeData.projects) ? (
            <div className="space-y-6">
              {resumeData.projects.map((project, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-3 hover:border-[#3c8f63] transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    <button
                      onClick={() => toggleProject(index)}
                      className="text-sm text-[#3c8f63] hover:text-[#2a6b4a] flex items-center gap-1"
                    >
                      {expandedProjects[index] ? "Show Less" : "Show Details"}
                      {expandedProjects[index] ? (
                        <FaChevronUp className="text-xs" />
                      ) : (
                        <FaChevronDown className="text-xs" />
                      )}
                    </button>
                  </div>

                  <p className="text-gray-700 mb-4">{project.description}</p>

                  {expandedProjects[index] && project.fullDescription && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-600">{project.fullDescription}</p>
                    </div>
                  )}

                  {hasData(project.techStack) && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-[#3c8f63] bg-opacity-10 text-[#3c8f63] rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="mt-4 text-[#3c8f63] cursor-pointer"><u>Live Link</u> {"-->"}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
              <FaCode className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No projects information provided.</p>
            </div>
          )}
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
            <MdVerified className="text-[#3c8f63]" />
            Certifications
          </h2>

          {hasData(resumeData.certifications) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-[#3c8f63] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MdVerified className="text-[#3c8f63] text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Issued {cert.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center py-4">
              No certifications provided.
            </p>
          )}
        </section>

        {/* Custom Resume Link Section */}
        <section className="mt-10 pt-8 border-t border-gray-300">
          <div className="bg-gradient-to-r from-[#3c8f63] to-[#2a6b4a] rounded-2xl p-6 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">
                  View Full Custom Resume
                </h3>
                <p className="text-white text-opacity-90">
                  The candidate has uploaded a custom-designed resume with
                  additional details and formatting.
                </p>
              </div>

              {resumeData.customResumeLink ? (
                <a
                  href={resumeData.customResumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#3c8f63] hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <FaFilePdf />
                  View Custom Resume
                  <FaExternalLinkAlt className="text-sm" />
                </a>
              ) : (
                <div className="text-center py-3">
                  <p className="text-white text-opacity-80 italic">
                    No custom resume uploaded
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DigitalResumeContent;
