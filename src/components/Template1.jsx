import React, { useState, useEffect} from 'react'
import { Download, Sun, Moon, Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Calendar } from 'lucide-react'
import { useLocation } from 'react-router-dom';

const Template1 = ({ resumeData: propData }) => {
  const location = useLocation();
  const resumeData = propData || location.state?.resumeData;
  
  const [isDarkMode, setIsDarkMode] = useState(false)
  
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
    <div className={`min-h-screen transition-all duration-300`}>
      {/* Control Panel */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 print:hidden ">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-lg shadow-lg transition-all duration-200 ${
            isDarkMode 
              ? 'bg-yellow-500 text-yellow-900 hover:bg-yellow-400' 
              : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200"
        >
          <Download size={20} />
        </button>
      </div>

      {/* Resume Container */}
      <div id="resume-preview" className="w-full sm:max-w-4xl mx-auto pt-2 px-2 overflow-x-hidden">
         <div
            className={`transition-all duration-500 print:shadow-none ${
          isDarkMode ? 'bg-gray-900 text-gray-100 shadow-2xl' 
          : 'bg-white text-gray-900 shadow-xl'
          } w-full sm:max-w-4xl mx-auto`}
          >

          
          {/* Page 1 */}
          <div className="p-8 print:p-6 ">
            {/* Header */}
            <header className={`border-b-2 pb-6 mb-8 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              {hasContent(resumeData?.fullName) && (
                <h1 className={`text-4xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black-900'}`}>
                  {resumeData.fullName}
                </h1>
              )}
              
              <div className="flex flex-wrap gap-4 text-sm">
                {hasContent(resumeData?.phone) && (
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Phone size={16} />
                    <span>{resumeData.phone}</span>
                  </div>
                )}
                {hasContent(resumeData?.email) && (
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Mail size={16} />
                    <span>{resumeData.email}</span>
                  </div>
                )}
                {hasContent(resumeData?.location) && (
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <MapPin size={16} />
                    <span>{resumeData.location}</span>
                  </div>
                )}
                {hasContent(resumeData?.linkedin) && (
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    <Linkedin size={16} />
                    <span>{resumeData.linkedin}</span>
                  </div>
                )}
                {hasContent(resumeData?.github) && (
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    <Github size={16} />
                    <span>{resumeData.github}</span>
                  </div>
                )}
                {hasContent(resumeData?.portfolio) && (
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    <ExternalLink size={16} />
                    <span>resumeData.portfolio</span>
                  </div>
                )}
              </div>
            </header>

            {/* Professional Summary */}
            {hasContent(resumeData?.professionalSummary) && (
              <section className="mb-3">
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  Professional Summary
                </h2>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {resumeData.professionalSummary}
                </p>
              </section>
            )}

            {/* Education */}
            {(hasContent(resumeData?.degree) || hasContent(resumeData?.branch) || hasContent(resumeData?.collegeName) || hasContent(resumeData?.graduationYear) || hasContent(resumeData?.gpa) || hasContent(resumeData?.relevantCoursework)) && (
              <section className="mb-3">
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                  Education
                </h2>
                <div className={`border-l-4 pl-4 ${isDarkMode ? 'border-purple-400' : 'border-purple-700'}`}>
                  {(hasContent(resumeData?.degree) || hasContent(resumeData?.branch)) && (
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {[resumeData?.degree, resumeData?.branch].filter(Boolean).join(' in ')}
                    </h3>
                  )}
                  {hasContent(resumeData?.collegeName) && (
                    <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {resumeData.collegeName}
                    </p>
                  )}
                  {(hasContent(resumeData?.graduationYear) || hasContent(resumeData?.gpa)) && (
                    <div className={`flex justify-between items-center mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {hasContent(resumeData?.graduationYear) && (
                        <span>Graduated: {resumeData.graduationYear}</span>
                      )}
                      {hasContent(resumeData?.gpa) && (
                        <span>GPA: {resumeData.gpa}</span>
                      )}
                    </div>
                  )}
                  {hasContent(resumeData?.relevantCoursework) && (
                    <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <strong>Relevant Coursework:</strong> {resumeData.relevantCoursework}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Skills */}
            {hasContent(resumeData?.skills) && (
              <section  className="mb-3"> 
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                  Skills & Technologies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.split(', ').filter(skill => skill.trim() !== '').map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-200 border border-gray-600' 
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Experience */}
            {hasContent(resumeData?.experiences) && (
              <section className="mb-3">
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>
                  Experience
                </h2>
                {resumeData.experiences.filter(exp => 
                  hasContent(exp?.title) || hasContent(exp?.company) || hasContent(exp?.duration) || hasContent(exp?.location) || hasContent(exp?.description)
                ).map((exp, index) => (
                  <div key={index} className={`mb-6 border-l-4 pl-4 ${isDarkMode ? 'border-red-400' : 'border-red-700'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        {hasContent(exp?.title) && (
                          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {exp.title}
                          </h3>
                        )}
                        {hasContent(exp?.company) && (
                          <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {exp.company}
                          </p>
                        )}
                      </div>
                      <div className={`text-right text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {hasContent(exp?.duration) && (
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{exp.duration}</span>
                          </div>
                        )}
                        {hasContent(exp?.location) && (
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin size={14} />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {hasContent(exp?.description) && (
                      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Page Break
          <div className="page-break-before print:break-before-page"></div> */}

          {/* Page 2 */}
          <div className="p-8 print:p-6">
            {/* Projects */}
            {hasContent(resumeData?.projects) && (
              <section className="mb-3">
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>
                  Projects
                </h2>
                {resumeData.projects.filter(project => 
                  hasContent(project?.title) || hasContent(project?.technologies) || hasContent(project?.description) || hasContent(project?.link)
                ).map((project, index) => (
                  <div key={index} className={`mb-6 border-l-4 pl-4 ${isDarkMode ? 'border-indigo-400' : 'border-indigo-700'}`}>
                    <div className="flex justify-between items-start mb-2">
                      {hasContent(project?.title) && (
                        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {project.title}
                        </h3>
                      )}
                      {hasContent(project?.link) && (
                        <div className={`flex items-center gap-1 text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          <ExternalLink size={14} />
                          <span>View Project</span>
                        </div>
                      )}
                    </div>
                    {hasContent(project?.technologies) && (
                      <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <strong>Technologies:</strong> {project.technologies}
                      </p>
                    )}
                    {hasContent(project?.description) && (
                      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {project.description}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Achievements */}
            {hasContent(resumeData?.achievements) && (
              <section className="mb-3">
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  Achievements
                </h2>
                {resumeData.achievements.filter(achievement => 
                  hasContent(achievement?.title) || hasContent(achievement?.description)
                ).map((achievement, index) => (
                  <div key={index} className={`mb-4 border-l-4 pl-4 ${isDarkMode ? 'border-yellow-400' : 'border-yellow-700'}`}>
                    {hasContent(achievement?.title) && (
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {achievement.title}
                      </h3>
                    )}
                    {hasContent(achievement?.description) && (
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {achievement.description}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {hasContent(resumeData?.certifications) && (
              <section className="mb-3">
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-teal-400' : 'text-teal-700'}`}>
                  Certifications
                </h2>
                {resumeData.certifications.filter(cert => 
                  hasContent(cert?.name) || hasContent(cert?.issuer) || hasContent(cert?.date) || hasContent(cert?.link)
                ).map((cert, index) => (
                  <div key={index} className={`mb-4 border-l-4 pl-4 ${isDarkMode ? 'border-teal-400' : 'border-teal-700'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        {hasContent(cert?.name) && (
                          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {cert.name}
                          </h3>
                        )}
                        {hasContent(cert?.issuer) && (
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {cert.issuer}
                          </p>
                        )}
                      </div>
                      <div className={`text-right text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {hasContent(cert?.date) && (
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{cert.date}</span>
                          </div>
                        )}
                        {hasContent(cert?.link) && (
                          <div className={`flex items-center gap-1 mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            <ExternalLink size={14} />
                            <span>View</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
      background: #111827 !important; /* dark gray */
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

export default Template1