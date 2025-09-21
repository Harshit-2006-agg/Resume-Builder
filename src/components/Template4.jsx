import React, { useState, useEffect } from 'react'
import { Download, Sun, Moon, Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react'
import { useLocation } from 'react-router-dom';

const Template4 = ({ resumeData: propData }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const location = useLocation();
  const resumeData = propData || location.state?.resumeData;

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  // Helper function to check if a field has content
  const hasContent = (field) => {
    if (!field) return false;
    if (typeof field === 'string') return field.trim() !== '';
    if (Array.isArray(field)) return field.length > 0 && field.some(item => 
      typeof item === 'string' ? item.trim() !== '' : Object.values(item).some(val => val && val.toString().trim() !== '')
    );
    return true;
  };

  const handleDownloadPDF = () => {
    window.print()
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-100' : 'bg-gray-100'}`}>
      {/* Control Panel */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'bg-yellow-500 text-yellow-900 hover:bg-yellow-400' 
              : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
          }`}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="p-2 bg-blue-800 text-white rounded hover:bg-blue-900"
        >
          <Download size={18} />
        </button>
      </div>

      {/* Resume Container */}
      <div id="resume-preview" className="max-w-4xl mx-auto py-4 px-4 print:py-0 print:px-0 print:max-w-none">
        <div className={`${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} print:shadow-none`}>

          {/* Header */}
          <div className="p-6 print:p-4 border-b border-gray-300">
            {hasContent(resumeData?.fullName) && (
              <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>
                {resumeData.fullName}
              </h1>
            )}
            
            {/* Contact Information */}
            <div className="text-sm space-y-1">
              {hasContent(resumeData?.phone) && (
                <div className="inline-block mr-6">
                  <Phone size={14} className="inline mr-1" />
                  <span>{resumeData.phone}</span>
                </div>
              )}
              {hasContent(resumeData?.email) && (
                <div className="inline-block mr-6">
                  <Mail size={14} className="inline mr-1" />
                  <span>{resumeData.email}</span>
                </div>
              )}
              {hasContent(resumeData?.location) && (
                <div className="inline-block mr-6">
                  <MapPin size={14} className="inline mr-1" />
                  <span>{resumeData.location}</span>
                </div>
              )}
              <br />
              {hasContent(resumeData?.linkedinUrl) && (
                <div className="inline-block mr-6">
                  <Linkedin size={14} className="inline mr-1" />
                  <span>{resumeData.linkedinUrl}</span>
                </div>
              )}
              {hasContent(resumeData?.githubUrl) && (
                <div className="inline-block mr-6">
                  <Github size={14} className="inline mr-1" />
                  <span>{resumeData.githubUrl}</span>
                </div>
              )}
              {hasContent(resumeData?.portfolioUrl) && (
                <div className="inline-block mr-6">
                  <ExternalLink size={14} className="inline mr-1" />
                  <span>{resumeData.portfolioUrl}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 print:p-4">
            {/* Professional Summary */}
            {hasContent(resumeData?.professionalSummary) && (
              <section className="mb-5">
                <h2 className={`text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-300 pb-1 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>
                  Professional Summary
                </h2>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {resumeData.professionalSummary}
                </p>
              </section>
            )}

            {/* Skills */}
            {hasContent(resumeData?.skills) && (
              <section className="mb-5">
                <h2 className={`text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-300 pb-1 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>
                  Technical Skills
                </h2>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {resumeData.skills}
                </p>
              </section>
            )}

            {/* Professional Experience */}
            {hasContent(resumeData?.experiences) && (
              <section className="mb-5">
                <h2 className={`text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-300 pb-1 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>
                  Professional Experience
                </h2>
                <div className="space-y-4">
                  {resumeData.experiences.filter(exp => 
                    hasContent(exp?.title) || hasContent(exp?.company) || hasContent(exp?.duration) || hasContent(exp?.location) || hasContent(exp?.description)
                  ).map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          {hasContent(exp?.title) && (
                            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {exp.title}
                            </h3>
                          )}
                          {hasContent(exp?.company) && (
                            <p className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>
                              {exp.company}
                            </p>
                          )}
                          {hasContent(exp?.location) && (
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {exp.location}
                            </p>
                          )}
                        </div>
                        {hasContent(exp?.duration) && (
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {exp.duration}
                          </span>
                        )}
                      </div>
                      {hasContent(exp?.description) && (
                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {(hasContent(resumeData?.degree) || hasContent(resumeData?.branch) || hasContent(resumeData?.collegeName) || hasContent(resumeData?.graduationYear) || hasContent(resumeData?.gpa) || hasContent(resumeData?.relevantCoursework)) && (
              <section className="mb-5">
                <h2 className={`text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-300 pb-1 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>
                  Education
                </h2>
                <div>
                  {(hasContent(resumeData?.degree) || hasContent(resumeData?.branch)) && (
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {[resumeData?.degree, resumeData?.branch].filter(Boolean).join(' in ')}
                    </h3>
                  )}
                  {hasContent(resumeData?.collegeName) && (
                    <p className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>
                      {resumeData.collegeName}
                    </p>
                  )}
                  <div className="flex gap-6 text-sm">
                    {hasContent(resumeData?.graduationYear) && (
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Graduated: {resumeData.graduationYear}
                      </span>
                    )}
                    {hasContent(resumeData?.gpa) && (
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        GPA: {resumeData.gpa}
                      </span>
                    )}
                  </div>
                  {hasContent(resumeData?.relevantCoursework) && (
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <strong>Relevant Coursework:</strong> {resumeData.relevantCoursework}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Projects */}
            {hasContent(resumeData?.projects) && (
              <section className="mb-5">
                <h2 className={`text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-300 pb-1 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>
                  Projects
                </h2>
                <div className="space-y-3">
                  {resumeData.projects.filter(project => 
                    hasContent(project?.title) || hasContent(project?.technologies) || hasContent(project?.description) || hasContent(project?.link)
                  ).map((project, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-1">
                        {hasContent(project?.title) && (
                          <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {project.title}
                          </h3>
                        )}
                        {hasContent(project?.link) && (
                          <span className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>
                            {project.link}
                          </span>
                        )}
                      </div>
                      {hasContent(project?.technologies) && (
                        <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>
                          <strong>Technologies:</strong> {project.technologies}
                        </p>
                      )}
                      {hasContent(project?.description) && (
                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {project.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements */}
            {hasContent(resumeData?.achievements) && (
              <section className="mb-5">
                <h2 className={`text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-300 pb-1 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>
                  Achievements
                </h2>
                <div className="space-y-2">
                  {resumeData.achievements.filter(achievement => 
                    hasContent(achievement?.title) || hasContent(achievement?.description)
                  ).map((achievement, index) => (
                    <div key={index}>
                      {hasContent(achievement?.title) && (
                        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {achievement.title}
                        </h3>
                      )}
                      {hasContent(achievement?.description) && (
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {achievement.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {hasContent(resumeData?.certifications) && (
              <section>
                <h2 className={`text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-300 pb-1 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>
                  Certifications
                </h2>
                <div className="space-y-2">
                  {resumeData.certifications.filter(cert => 
                    hasContent(cert?.name) || hasContent(cert?.issuer) || hasContent(cert?.date) || hasContent(cert?.link)
                  ).map((cert, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        {hasContent(cert?.name) && (
                          <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {cert.name}
                          </h3>
                        )}
                        {hasContent(cert?.issuer) && (
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {cert.issuer}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        {hasContent(cert?.date) && (
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {cert.date}
                          </span>
                        )}
                        {hasContent(cert?.link) && (
                          <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>
                            {cert.link}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Print Styles */}
        <style jsx>{`
  @media print {
    body * {
    visibility: hidden; /* hide everything */
  } 
    @media print {
  /* Hide everything by default */
  body * {
    visibility: hidden;
  }

  /* Show only the resume container */
  #resume-preview, #resume-preview * {
    visibility: visible;
  }

  /* Force resume container to take full page */
  #resume-preview {
    position: absolute;
    left: 0;
    top: 0;
    width: 210mm;       /* A4 width */
    min-height: 297mm;  /* A4 height */
    margin: 0 !important;
    padding: 0 !important;
    background: white !important; /* in case dark mode leaks */
  }

  /* Remove browser default margins */
  @page {
    margin: 0;
    size: A4;
  }
}

    body.light-mode {
      background: white !important;
      color: black !important;
    }

    body.dark-mode {
       background: #1F2937 !important; /* dark gray */
      color: white !important;
    }

    html, body {
      width: 100%;
      height: 100%;
    }

   
  }
`}</style>
    </div>
  )
}

export default Template4