import React, { useState, useEffect } from 'react'
import { Download, Sun, Moon, Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Calendar, Building, User, GraduationCap, Code, Award, FileText } from 'lucide-react'
import { useLocation } from 'react-router-dom';

const Template3 = ({ resumeData: propData }) => {
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
  
  
  const hasContent = (field) => {
    if (!field) return false;
    if (typeof field === 'string') return field.trim() !== '';
    if (Array.isArray(field)) return field.length > 0 && field.some(item => 
      typeof item === 'string' ? item.trim() !== '' : Object.values(item).some(val => val && val.toString().trim() !== '')
    );
    return true;
  };

  const handleDownloadPDF = () => window.print()
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  const headingColor = isDarkMode ? 'text-white' : 'text-black'
  const subHeadingColor = isDarkMode ? 'text-gray-300' : 'text-gray-800'
  const iconBgColor = (light, dark) => isDarkMode ? dark : light
  const iconColor = (light, dark) => isDarkMode ? dark : light

  return (
    <div className={`min-h-screen transition-all duration-300 `}>
      {/* Control Panel */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 print:hidden">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-lg shadow-lg transition-all duration-200 ${
            isDarkMode ? 'bg-yellow-500 text-yellow-900 hover:bg-yellow-400' : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
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
      <div id="resume-preview" className="max-w-4xl mx-auto py-8 px-4 print:py-0 print:px-0 print:max-w-none">
        <div className={`transition-all duration-500 print:shadow-none ${isDarkMode ? 'bg-gray-800 text-gray-100 shadow-2xl' : 'bg-white text-gray-900 shadow-lg'} rounded-lg print:rounded-none overflow-hidden`}>

          {/* Header */}
          <header className={`px-8 py-8 print:px-6 print:py-6 ${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900 border-b border-gray-700 text-white' : 'bg-black border-b border-gray-200 text-white'}`}>
            {hasContent(resumeData?.fullName) && (
              <h1 className={`text-4xl font-bold mb-3 tracking-tight text-white`}>
                {resumeData.fullName}
              </h1>
            )}
            
            {/* Contact Info */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-sm opacity-90 ${isDarkMode ? 'text-black-300' : 'text-white'}`}>
              <div className="space-y-1">
                {hasContent(resumeData?.phone) && <div className="flex items-center gap-2"><Phone size={16} /> <span>{resumeData.phone}</span></div>}
                {hasContent(resumeData?.email) && <div className="flex items-center gap-2"><Mail size={16} /> <span>{resumeData.email}</span></div>}
                {hasContent(resumeData?.location) && <div className="flex items-center gap-2"><MapPin size={16} /> <span>{resumeData.location}</span></div>}
              </div>
              <div className="space-y-1">
                {hasContent(resumeData?.linkedinUrl) && <div className="flex items-center gap-2"><Linkedin size={16} /> <span>{resumeData.linkedinUrl}</span></div>}
                {hasContent(resumeData?.githubUrl) && <div className="flex items-center gap-2"><Github size={16} /> <span>{resumeData.githubUrl}</span></div>}
                {hasContent(resumeData?.portfolioUrl) && <div className="flex items-center gap-2"><ExternalLink size={16} /> <span>{resumeData.portfolioUrl}</span></div>}
              </div>
            </div>
          </header>

          <div className="px-8 py-4 print:px-6 print:py-6">
            {/* Professional Summary */}
            {hasContent(resumeData?.professionalSummary) && (
              <section className="mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${iconBgColor('bg-blue-100','bg-blue-800')}`}><User className={`${iconColor('text-black','text-blue-300')}`} size={18} /></div>
                  <h2 className={`text-2xl font-bold ${headingColor}`}>Professional Summary</h2>
                </div>
                <p className={`leading-relaxed text-lg ${subHeadingColor}`}>{resumeData.professionalSummary}</p>
              </section>
            )}

            {/* Skills */}
            {hasContent(resumeData?.skills) && (
              <section className="mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${iconBgColor('bg-green-100','bg-green-800')}`}><Code className={`${iconColor('text-black','text-green-300')}`} size={18} /></div>
                  <h2 className={`text-2xl font-bold ${headingColor}`}>Technical Skills</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.split(', ').filter(skill => skill.trim() !== '').map((skill, index) => (
                    <span key={index} className={`px-4 py-2 rounded-full text-sm font-medium ${isDarkMode ? 'bg-gray-700 text-gray-200 border border-gray-600' : 'bg-gray-100 text-gray-800 border border-gray-300'}`}>{skill.trim()}</span>
                  ))}
                </div>
              </section>
            )}

            {/* Experience */}
            {hasContent(resumeData?.experiences) && (
              <section className="mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${iconBgColor('bg-purple-100','bg-purple-800')}`}><Building className={`${iconColor('text-black','text-purple-300')}`} size={18} /></div>
                  <h2 className={`text-2xl font-bold ${headingColor}`}>Professional Experience</h2>
                </div>
                <div className="space-y-2">
                  {resumeData.experiences.map((exp, index) => (
                    <div key={index} className={`border-l-4 pl-6 pb-6 ${isDarkMode ? 'border-purple-600' : 'border-gray-800'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          {hasContent(exp?.title) && <h3 className={`text-xl font-semibold ${headingColor}`}>{exp.title}</h3>}
                          {hasContent(exp?.company) && <p className={`text-lg font-medium ${subHeadingColor}`}>{exp.company}</p>}
                          {hasContent(exp?.location) && <p className={`text-sm ${subHeadingColor}`}>{exp.location}</p>}
                        </div>
                        {hasContent(exp?.duration) && (
                          <div className={`flex items-center gap-2 text-sm ${subHeadingColor}`}><Calendar size={14} /><span>{exp.duration}</span></div>
                        )}
                      </div>
                      {hasContent(exp?.description) && <p className={`leading-relaxed ${subHeadingColor}`}>{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {(hasContent(resumeData?.degree) || hasContent(resumeData?.branch) || hasContent(resumeData?.collegeName)) && (
              <section className="mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${iconBgColor('bg-orange-100','bg-orange-800')}`}><GraduationCap className={`${iconColor('text-black','text-orange-300')}`} size={18} /></div>
                  <h2 className={`text-2xl font-bold ${headingColor}`}>Education</h2>
                </div>
                <div className={`border-l-4 pl-6 ${isDarkMode ? 'border-orange-600' : 'border-gray-800'}`}>
                  <h3 className={`text-xl font-semibold mb-2 ${headingColor}`}>{[resumeData.degree, resumeData.branch].filter(Boolean).join(' in ')}</h3>
                  {hasContent(resumeData.collegeName) && <p className={`text-lg font-medium mb-2 ${subHeadingColor}`}>{resumeData.collegeName}</p>}
                  <div className={`flex gap-3 mb-2 text-sm ${subHeadingColor}`}>
                    {hasContent(resumeData.graduationYear) && <div className="flex items-center gap-2"><Calendar size={14} /><span>Graduated: {resumeData.graduationYear}</span></div>}
                    {hasContent(resumeData.gpa) && <span>GPA: {resumeData.gpa}</span>}
                  </div>
                  {hasContent(resumeData.relevantCoursework) && <p className={`${subHeadingColor}`}>Relevant Coursework: {resumeData.relevantCoursework}</p>}
                </div>
              </section>
            )}

            {/* Projects */}
            {hasContent(resumeData?.projects) && (
              <section className="mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${iconBgColor('bg-teal-100','bg-teal-800')}`}><FileText className={`${iconColor('text-black','text-teal-300')}`} size={18} /></div>
                  <h2 className={`text-2xl font-bold ${headingColor}`}>Projects</h2>
                </div>
                <div className="space-y-3">
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="pl-2">
                      {hasContent(project?.title) && <h3 className={`text-xl font-semibold ${headingColor}`}>{project.title}</h3>}
                      {hasContent(project?.description) && <p className={`mb-1 ${subHeadingColor}`}>{project.description}</p>}
                      {hasContent(project?.technologies) && <p className={`mb-1 ${subHeadingColor}`}>Technologies: {project.technologies}</p>}
                      {hasContent(project?.link) && <a className={`text-blue-600 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements */}
            {hasContent(resumeData?.achievements) && (
              <section className="mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${iconBgColor('bg-pink-100','bg-pink-800')}`}><Award className={`${iconColor('text-black','text-pink-300')}`} size={18} /></div>
                  <h2 className={`text-2xl font-bold ${headingColor}`}>Achievements</h2>
                </div>
                <ul className="pl-6 list-disc space-y-2">
                  {resumeData.achievements.map((ach, index) => (
                    <li key={index}>
                      {hasContent(ach?.title) && <h3 className={`font-semibold ${headingColor}`}>{ach.title}</h3>}
                      {hasContent(ach?.description) && <p className={`${subHeadingColor}`}>{ach.description}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Certifications */}
            {hasContent(resumeData?.certifications) && (
              <section className="mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${iconBgColor('bg-indigo-100','bg-indigo-800')}`}><FileText className={`${iconColor('text-black','text-indigo-300')}`} size={18} /></div>
                  <h2 className={`text-2xl font-bold ${headingColor}`}>Certifications</h2>
                </div>
                <ul className="pl-6 list-disc space-y-2">
                  {resumeData.certifications.map((cert, index) => (
                    <li key={index}>
                      {hasContent(cert?.name) && <h3 className={`font-semibold ${headingColor}`}>{cert.name}</h3>}
                      {hasContent(cert?.issuer) && <p className={`${subHeadingColor}`}>Issuer: {cert.issuer}</p>}
                      {hasContent(cert?.date) && <p className={`${subHeadingColor}`}>Date: {cert.date}</p>}
                      {hasContent(cert?.link) && <a className={`text-blue-600 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} href={cert.link} target="_blank" rel="noopener noreferrer">{cert.link}</a>}
                    </li>
                  ))}
                </ul>
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

export default Template3
