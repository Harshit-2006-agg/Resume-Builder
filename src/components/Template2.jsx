import React, { useEffect, useState } from 'react'
import { Download, Sun, Moon, Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Award, Briefcase, GraduationCap, Code, Target } from 'lucide-react'
import { useLocation } from 'react-router-dom';

const Template2 = ({ resumeData: propData }) => {
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
    <div className=" bg-gray-100 py-8">
      {/* Control Panel */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 print:hidden">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
            isDarkMode 
              ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300' 
              : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
        >
          <Download size={20} />
        </button>
      </div>

      {/* Resume Container */}
      <div className="max-w-4xl mx-auto px-4 print:px-0 print:max-w-none " id='resume-preview'>
        <div
            className={`transition-all duration-500 print:shadow-none ${
          isDarkMode ? 'bg-gray-900 text-gray-100 shadow-2xl' 
          : 'bg-white text-gray-900 shadow-xl'
          } w-full sm:max-w-4xl mx-auto`}
          >
          
          <div className="p-8">
            {/* Header Section */}
            <div className={`relative mb-12 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900' 
                : 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600'
            } rounded-2xl p-8 text-white overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white transform -translate-x-8 translate-y-8"></div>
              </div>
              
              <div className="relative z-10">
                {hasContent(resumeData?.fullName) && (
                  <h1 className="text-5xl font-bold mb-2 tracking-tight">{resumeData.fullName}</h1>
                )}
                {hasContent(resumeData?.jobTitle) && (
                  <p className="text-xl opacity-90 mb-6">{resumeData.jobTitle}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    {hasContent(resumeData?.phone) && (
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="opacity-80" />
                        <span>{resumeData.phone}</span>
                      </div>
                    )}
                    {hasContent(resumeData?.email) && (
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="opacity-80" />
                        <span>{resumeData.email}</span>
                      </div>
                    )}
                    {hasContent(resumeData?.location) && (
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="opacity-80" />
                        <span>{resumeData.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {hasContent(resumeData?.linkedin) && (
                      <div className="flex items-center gap-3">
                        <Linkedin size={16} className="opacity-80" />
                        <span>LinkedIn Profile</span>
                      </div>
                    )}
                    {hasContent(resumeData?.github) && (
                      <div className="flex items-center gap-3">
                        <Github size={16} className="opacity-80" />
                        <span>GitHub Profile</span>
                      </div>
                    )}
                    {hasContent(resumeData?.portfolio) && (
                      <div className="flex items-center gap-3">
                        <ExternalLink size={16} className="opacity-80" />
                        <span>Portfolio Website</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            {hasContent(resumeData?.professionalSummary) && (
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg ${
                    isDarkMode ? 'bg-blue-800' : 'bg-blue-100'
                  }`}>
                    <Target className={`${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} size={20} />
                  </div>
                  <h2 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-600'
                  }`}>Professional Summary</h2>
                </div>
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {resumeData.professionalSummary}
                </p>
              </section>
            )}

            {/* Skills */}
            {hasContent(resumeData?.skills) && (
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg ${
                    isDarkMode ? 'bg-emerald-800' : 'bg-emerald-100'
                  }`}>
                    <Code className={`${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`} size={20} />
                  </div>
                  <h2 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                  }`}>Skills & Technologies</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {resumeData.skills.split(', ').filter(skill => skill.trim() !== '').map((skill, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-xl text-center font-medium transition-all hover:scale-105 ${
                        isDarkMode 
                          ? 'bg-gray-800 text-gray-200 border border-gray-700 hover:border-gray-600' 
                          : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      {skill.trim()}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Experience */}
            {hasContent(resumeData?.experiences) && (
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg ${
                    isDarkMode ? 'bg-purple-800' : 'bg-purple-100'
                  }`}>
                    <Briefcase className={`${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`} size={20} />
                  </div>
                  <h2 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-purple-300' : 'text-purple-600'
                  }`}>Professional Experience</h2>
                </div>
                
                <div className="space-y-8">
                  {resumeData.experiences.filter(exp => 
                    hasContent(exp?.title) || hasContent(exp?.company) || hasContent(exp?.duration) || hasContent(exp?.location) || hasContent(exp?.description)
                  ).map((exp, index) => (
                    <div key={index} className={`relative pl-8 border-l-2 ${
                      isDarkMode ? 'border-purple-600' : 'border-purple-300'
                    }`}>
                      <div className={`absolute -left-2 top-2 w-4 h-4 rounded-full ${
                        isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
                      }`}></div>
                      
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          {hasContent(exp?.title) && (
                            <h3 className={`text-xl font-bold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{exp.title}</h3>
                          )}
                          {hasContent(exp?.company) && (
                            <p className={`text-lg font-semibold ${
                              isDarkMode ? 'text-purple-300' : 'text-purple-600'
                            }`}>{exp.company}</p>
                          )}
                          {hasContent(exp?.location) && (
                            <p className={`${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>{exp.location}</p>
                          )}
                        </div>
                        {hasContent(exp?.duration) && (
                          <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                            isDarkMode 
                              ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                              : 'bg-gray-100 text-gray-700 border border-gray-300'
                          }`}>
                            {exp.duration}
                          </span>
                        )}
                      </div>
                      
                      {hasContent(exp?.description) && (
                        <p className={`leading-relaxed ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Check if content overflows to next page */}
            <div>
              {/* Education */}
              {(hasContent(resumeData?.degree) || hasContent(resumeData?.branch) || hasContent(resumeData?.collegeName) || hasContent(resumeData?.graduationYear) || hasContent(resumeData?.gpa) || hasContent(resumeData?.relevantCoursework)) && (
                <section className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg ${
                      isDarkMode ? 'bg-orange-800' : 'bg-orange-100'
                    }`}>
                      <GraduationCap className={`${isDarkMode ? 'text-orange-300' : 'text-orange-600'}`} size={20} />
                    </div>
                    <h2 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-orange-300' : 'text-orange-600'
                    }`}>Education</h2>
                  </div>
                  
                  <div className={`p-6 rounded-xl ${
                    isDarkMode 
                      ? 'bg-gray-800 border border-gray-700' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    {(hasContent(resumeData?.degree) || hasContent(resumeData?.branch)) && (
                      <h3 className={`text-xl font-bold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {[resumeData?.degree, resumeData?.branch].filter(Boolean).join(' in ')}
                      </h3>
                    )}
                    {hasContent(resumeData?.collegeName) && (
                      <p className={`text-lg font-semibold mb-2 ${
                        isDarkMode ? 'text-orange-300' : 'text-orange-600'
                      }`}>
                        {resumeData.collegeName}
                      </p>
                    )}
                    {(hasContent(resumeData?.graduationYear) || hasContent(resumeData?.gpa)) && (
                      <div className={`flex justify-between mb-3 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {hasContent(resumeData?.graduationYear) && (
                          <span>Graduated: {resumeData.graduationYear}</span>
                        )}
                        {hasContent(resumeData?.gpa) && (
                          <span>GPA: {resumeData.gpa}</span>
                        )}
                      </div>
                    )}
                    {hasContent(resumeData?.relevantCoursework) && (
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <strong>Relevant Coursework:</strong> {resumeData.relevantCoursework}
                      </p>
                    )}
                  </div>
                </section>
              )}

              {/* Projects */}
              {hasContent(resumeData?.projects) && (
                <section className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg ${
                      isDarkMode ? 'bg-indigo-800' : 'bg-indigo-100'
                    }`}>
                      <Code className={`${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`} size={20} />
                    </div>
                    <h2 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-indigo-300' : 'text-indigo-600'
                    }`}>Featured Projects</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resumeData.projects.filter(project => 
                      hasContent(project?.title) || hasContent(project?.technologies) || hasContent(project?.description) || hasContent(project?.link)
                    ).map((project, index) => (
                      <div key={index} className={`p-6 rounded-xl transition-all hover:scale-105 ${
                        isDarkMode 
                          ? 'bg-gray-800 border border-gray-700 hover:border-indigo-600' 
                          : 'bg-white border border-gray-200 hover:border-indigo-400 hover:shadow-lg'
                      }`}>
                        <div className="flex justify-between items-start mb-3">
                          {hasContent(project?.title) && (
                            <h3 className={`font-bold text-lg ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{project.title}</h3>
                          )}
                          {hasContent(project?.link) && (
                            <ExternalLink className={`${
                              isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                            }`} size={16} />
                          )}
                        </div>
                        
                        {hasContent(project?.technologies) && (
                          <p className={`text-xs font-medium mb-3 ${
                            isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                          }`}>
                            {project.technologies}
                          </p>
                        )}
                        
                        {hasContent(project?.description) && (
                          <p className={`text-sm leading-relaxed ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
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
                <section className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg ${
                      isDarkMode ? 'bg-yellow-800' : 'bg-yellow-100'
                    }`}>
                      <Award className={`${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'}`} size={20} />
                    </div>
                    <h2 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-yellow-300' : 'text-yellow-600'
                    }`}>Key Achievements</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resumeData.achievements.filter(achievement => 
                      hasContent(achievement?.title) || hasContent(achievement?.description)
                    ).map((achievement, index) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-yellow-500' 
                          : 'bg-yellow-50 border-yellow-400'
                      }`}>
                        {hasContent(achievement?.title) && (
                          <h3 className={`font-bold mb-2 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {achievement.title}
                          </h3>
                        )}
                        {hasContent(achievement?.description) && (
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
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
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg ${
                      isDarkMode ? 'bg-teal-800' : 'bg-teal-100'
                    }`}>
                      <Award className={`${isDarkMode ? 'text-teal-300' : 'text-teal-600'}`} size={20} />
                    </div>
                    <h2 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-teal-300' : 'text-teal-600'
                    }`}>Certifications</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {resumeData.certifications.filter(cert => 
                      hasContent(cert?.name) || hasContent(cert?.issuer) || hasContent(cert?.date) || hasContent(cert?.link)
                    ).map((cert, index) => (
                      <div key={index} className={`p-4 rounded-lg flex justify-between items-center ${
                        isDarkMode 
                          ? 'bg-gray-800 border border-gray-700' 
                          : 'bg-white border border-gray-200 shadow-sm'
                      }`}>
                        <div>
                          {hasContent(cert?.name) && (
                            <h3 className={`font-semibold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {cert.name}
                            </h3>
                          )}
                          {hasContent(cert?.issuer) && (
                            <p className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {cert.issuer}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          {hasContent(cert?.date) && (
                            <p className={`text-sm font-medium ${
                              isDarkMode ? 'text-teal-300' : 'text-teal-600'
                            }`}>
                              {cert.date}
                            </p>
                          )}
                          {hasContent(cert?.link) && (
                            <ExternalLink className={`inline ${
                              isDarkMode ? 'text-teal-400' : 'text-teal-600'
                            }`} size={14} />
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
      </div>

      {/* Print Styles */}
            <style jsx>{`
  @media print {
    body * {
    visibility: hidden; /* hide everything */
  } @media print {
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

export default Template2