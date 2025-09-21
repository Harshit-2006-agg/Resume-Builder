import React, { useState } from 'react'
import { Plus, Trash2, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Award, FileText, Sparkles, Zap } from 'lucide-react'
import { useNavigate } from "react-router-dom";

const ResumeBuilderForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    location: '',
    professionalSummary: '',
    collegeName: '',
    degree: '',
    branch: '',
    graduationYear: '',
    gpa: '',
    relevantCoursework: '',
    skills: '',
    projects: [{ title: '', description: '', technologies: '', link: '' }],
    experiences: [{ title: '', company: '', duration: '', location: '', description: '' }],
    achievements: [{ title: '', description: '' }],
    certifications: [{ name: '', issuer: '', date: '', link: '' }]
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleArrayInputChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const addArrayItem = (section, template) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }))
  }

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}
    
    switch(step) {
      case 0: // Contact Information
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
        break
        
      case 1: // Professional Summary
        if (!formData.professionalSummary.trim()) newErrors.professionalSummary = 'Professional summary is required'
        break
        
      case 2: // Education
        if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required'
        if (!formData.degree.trim()) newErrors.degree = 'Degree is required'
        if (!formData.branch.trim()) newErrors.branch = 'Branch/Major is required'
        if (!formData.graduationYear.trim()) newErrors.graduationYear = 'Graduation year is required'
        break
        
      case 3: // Skills
        if (!formData.skills.trim()) newErrors.skills = 'Skills are required'
        break
        
      case 4: // Projects
        formData.projects.forEach((project, index) => {
          if (!project.title.trim()) newErrors[`project_${index}_title`] = 'Project title is required'
          if (!project.description.trim()) newErrors[`project_${index}_description`] = 'Project description is required'
        })
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(Math.max(0, currentStep - 1))
    setErrors({}) // Clear errors when going back
  }

  const handleStepClick = (stepIndex) => {
    // Allow clicking on previous steps or current step
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex)
      setErrors({}) // Clear errors when jumping to a step
    } else {
      // For future steps, validate current step first
      if (validateStep(currentStep)) {
        setCurrentStep(stepIndex)
      }
    }
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate all steps before submitting
    let allValid = true
    for (let i = 0; i <= 4; i++) { // Validate steps 0-4 (required steps)
      if (!validateStep(i)) {
        allValid = false
        break
      }
    }
    
    if (allValid) {
      console.log('Resume Data:', formData)
      navigate("/resumePreview", { 
        state: { resumeData: formData }
      })
    } else {
      // Find first invalid step and navigate to it
      for (let i = 0; i <= 4; i++) {
        if (!validateStep(i)) {
          setCurrentStep(i)
          break
        }
      }
    }
  }

  const steps = [
    { id: 'contact', name: 'Contact', icon: User, color: 'from-blue-500 to-cyan-500' },
    { id: 'summary', name: 'Summary', icon: FileText, color: 'from-green-500 to-emerald-500' },
    { id: 'education', name: 'Education', icon: GraduationCap, color: 'from-purple-500 to-violet-500' },
    { id: 'skills', name: 'Skills', icon: Code, color: 'from-orange-500 to-red-500' },
    { id: 'projects', name: 'Projects', icon: Briefcase, color: 'from-indigo-500 to-blue-500' },
    { id: 'experience', name: 'Experience', icon: Briefcase, color: 'from-red-500 to-pink-500' },
    { id: 'achievements', name: 'Achievements', icon: Award, color: 'from-yellow-500 to-orange-500' },
    { id: 'certifications', name: 'Certifications', icon: Award, color: 'from-teal-500 to-cyan-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-60 right-10 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-40 w-96 h-96 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          <h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 mb-4 tracking-tight">
            Build Your Resume
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Create a professional resume that stands out with our intelligent form builder
          </p>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Sparkles className="text-yellow-500" size={16} />
              <span className="text-sm font-semibold text-gray-700">AI Optimized</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Zap className="text-purple-500" size={16} />
              <span className="text-sm font-semibold text-gray-700">ATS Friendly</span>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${step.color} text-white shadow-lg transform scale-105`
                      : isCompleted
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : index < currentStep
                      ? 'bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-white shadow-sm cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={index > currentStep + 1}
                >
                  <Icon size={18} className={`${isActive ? 'animate-pulse' : ''}`} />
                  <span className="font-semibold text-sm">{step.name}</span>
                  {isCompleted && <span className="text-green-500">✓</span>}
                </button>
              )
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          {currentStep === 0 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
                    <User className="text-white" size={28} />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold text-gray-800">Contact Information</h2>
                    <p className="text-gray-600">Tell us how to reach you</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-4 rounded-2xl border-2 ${errors.fullName ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500`}
                      placeholder="Enter your full name"
                      required
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-4 rounded-2xl border-2 ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500`}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-4 rounded-2xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500`}
                      placeholder="your.email@example.com"
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">LinkedIn URL</label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">GitHub URL</label>
                    <input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Portfolio URL</label>
                    <input
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Professional Summary */}
          {currentStep === 1 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl shadow-lg">
                    <FileText className="text-white" size={28} />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold text-gray-800">Professional Summary</h2>
                    <p className="text-gray-600">Your elevator pitch in 2-3 lines</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Summary (2-3 lines) *</label>
                  <textarea
                    name="professionalSummary"
                    value={formData.professionalSummary}
                    onChange={handleInputChange}
                    rows="5"
                    className={`w-full px-6 py-4 rounded-2xl border-2 ${errors.professionalSummary ? 'border-red-500' : 'border-gray-200'} focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 resize-none bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500`}
                    placeholder="Write a compelling summary about yourself, your skills, and what makes you unique..."
                    required
                  />
                  {errors.professionalSummary && <p className="text-red-500 text-sm mt-1">{errors.professionalSummary}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Education */}
          {currentStep === 2 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5"></div>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-3 rounded-2xl shadow-lg">
                    <GraduationCap className="text-white" size={28} />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold text-gray-800">Education</h2>
                    <p className="text-gray-600">Your academic background</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">College/University Name *</label>
                    <input
                      type="text"
                      name="collegeName"
                      value={formData.collegeName}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                      placeholder="University of Example"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Degree *</label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                      placeholder="Bachelor of Science"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Branch/Major *</label>
                    <input
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                      placeholder="Computer Science"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Graduation Year *</label>
                    <input
                      type="text"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                      placeholder="2024"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">GPA/Percentage</label>
                    <input
                      type="text"
                      name="gpa"
                      value={formData.gpa}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                      placeholder="3.8/4.0 or 85%"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Relevant Coursework</label>
                    <textarea
                      name="relevantCoursework"
                      value={formData.relevantCoursework}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 resize-none bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                      placeholder="Data Structures, Algorithms, Web Development, Database Systems..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skills */}
          {currentStep === 3 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5"></div>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-2xl shadow-lg">
                    <Code className="text-white" size={28} />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold text-gray-800">Skills & Technologies</h2>
                    <p className="text-gray-600">What technologies do you work with?</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Skills *</label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    rows="5"
                    className={`w-full px-6 py-4 rounded-2xl border-2 ${errors.skills ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 resize-none bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500`}
                    placeholder="JavaScript, React, Node.js, Python, SQL, Git, AWS, Docker, MongoDB, etc..."
                    required
                  />
                  {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
                  <p className="text-sm text-gray-500 mt-2">💡 Tip: List your skills separated by commas for better formatting</p>
                </div>
              </div>
            </div>
          )}

          {/* Projects */}
          {currentStep === 4 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 rounded-2xl shadow-lg">
                      <Briefcase className="text-white" size={28} />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
                      <p className="text-gray-600">Show off your best work</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('projects', { title: '', description: '', technologies: '', link: '' })}
                    className="group flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-2xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
                
                {formData.projects.map((project, index) => (
                  <div key={index} className="bg-gradient-to-br from-white/50 to-gray-50/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-3xl p-6 mb-6 relative group hover:border-indigo-300 transition-all duration-300">
                    {formData.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('projects', index)}
                        className="absolute top-6 right-6 text-red-400 hover:text-red-600 transition-colors bg-white/80 p-2 rounded-xl opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Project Title *</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => handleArrayInputChange('projects', index, 'title', e.target.value)}
                          className={`w-full px-6 py-4 rounded-2xl border-2 ${errors[`project_${index}_title`] ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500`}
                          placeholder="E-commerce Website"
                          required
                        />
                        {errors[`project_${index}_title`] && <p className="text-red-500 text-sm mt-1">{errors[`project_${index}_title`]}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Technologies Used</label>
                        <input
                          type="text"
                          value={project.technologies}
                          onChange={(e) => handleArrayInputChange('projects', index, 'technologies', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-3">Description *</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => handleArrayInputChange('projects', index, 'description', e.target.value)}
                          rows="4"
                          className={`w-full px-6 py-4 rounded-2xl border-2 ${errors[`project_${index}_description`] ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 resize-none bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500`}
                          placeholder="Describe what the project does, your role, and key achievements..."
                          required
                        />
                        {errors[`project_${index}_description`] && <p className="text-red-500 text-sm mt-1">{errors[`project_${index}_description`]}</p>}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-3">Project Link</label>
                        <input
                          type="url"
                          value={project.link}
                          onChange={(e) => handleArrayInputChange('projects', index, 'link', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                          placeholder="https://github.com/username/project or live demo"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {currentStep === 5 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-2xl shadow-lg">
                      <Briefcase className="text-white" size={28} />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-3xl font-bold text-gray-800">Experience</h2>
                      <p className="text-gray-600">Your professional journey</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('experiences', { title: '', company: '', duration: '', location: '', description: '' })}
                    className="group flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
                
                {formData.experiences.map((experience, index) => (
                  <div key={index} className="bg-gradient-to-br from-white/50 to-gray-50/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-3xl p-6 mb-6 relative group hover:border-red-300 transition-all duration-300">
                    {formData.experiences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('experiences', index)}
                        className="absolute top-6 right-6 text-red-400 hover:text-red-600 transition-colors bg-white/80 p-2 rounded-xl opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Job Title</label>
                        <input
                          type="text"
                          value={experience.title}
                          onChange={(e) => handleArrayInputChange('experiences', index, 'title', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                          placeholder="Software Developer Intern"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Company</label>
                        <input
                          type="text"
                          value={experience.company}
                          onChange={(e) => handleArrayInputChange('experiences', index, 'company', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                          placeholder="Tech Company Inc."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Duration</label>
                        <input
                          type="text"
                          value={experience.duration}
                          onChange={(e) => handleArrayInputChange('experiences', index, 'duration', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                          placeholder="June 2023 - August 2023"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Location</label>
                        <input
                          type="text"
                          value={experience.location}
                          onChange={(e) => handleArrayInputChange('experiences', index, 'location', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                          placeholder="New York, NY"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-3">Description</label>
                        <textarea
                          value={experience.description}
                          onChange={(e) => handleArrayInputChange('experiences', index, 'description', e.target.value)}
                          rows="4"
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 resize-none bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                          placeholder="Describe your responsibilities, achievements, and technologies used..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {currentStep === 6 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-2xl shadow-lg">
                      <Award className="text-white" size={28} />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-3xl font-bold text-gray-800">Achievements</h2>
                      <p className="text-gray-600">Your proudest moments</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('achievements', { title: '', description: '' })}
                    className="group flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
                
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-br from-white/50 to-gray-50/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-3xl p-6 mb-6 relative group hover:border-yellow-300 transition-all duration-300">
                    {formData.achievements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('achievements', index)}
                        className="absolute top-6 right-6 text-red-400 hover:text-red-600 transition-colors bg-white/80 p-2 rounded-xl opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Achievement Title</label>
                        <input
                          type="text"
                          value={achievement.title}
                          onChange={(e) => handleArrayInputChange('achievements', index, 'title', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                          placeholder="Dean's List, Hackathon Winner, etc."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Description</label>
                        <textarea
                          value={achievement.description}
                          onChange={(e) => handleArrayInputChange('achievements', index, 'description', e.target.value)}
                          rows="3"
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all duration-300 resize-none bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                          placeholder="Brief description of the achievement..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {currentStep === 7 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
                      <Award className="text-white" size={28} />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-3xl font-bold text-gray-800">Certifications</h2>
                      <p className="text-gray-600">Professional credentials</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '', link: '' })}
                    className="group flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
                
                {formData.certifications.map((certification, index) => (
                  <div key={index} className="bg-gradient-to-br from-white/50 to-gray-50/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-3xl p-6 mb-6 relative group hover:border-teal-300 transition-all duration-300">
                    {formData.certifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('certifications', index)}
                        className="absolute top-6 right-6 text-red-400 hover:text-red-600 transition-colors bg-white/80 p-2 rounded-xl opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Certification Name</label>
                        <input
                          type="text"
                          value={certification.name}
                          onChange={(e) => handleArrayInputChange('certifications', index, 'name', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                          placeholder="AWS Cloud Practitioner"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Issuing Organization</label>
                        <input
                          type="text"
                          value={certification.issuer}
                          onChange={(e) => handleArrayInputChange('certifications', index, 'issuer', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                          placeholder="Amazon Web Services"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Date Obtained</label>
                        <input
                          type="text"
                          value={certification.date}
                          onChange={(e) => handleArrayInputChange('certifications', index, 'date', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                          placeholder="March 2024"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Certificate Link</label>
                        <input
                          type="url"
                          value={certification.link}
                          onChange={(e) => handleArrayInputChange('certifications', index, 'link', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium placeholder-gray-500"
                          placeholder="https://certificate-link.com"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation and Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                currentStep === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              ← Previous Step
            </button>

            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 scale-125' 
                      : index < currentStep 
                      ? 'bg-green-400' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white font-bold rounded-2xl shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-lg"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="submit"
                className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-black rounded-3xl shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 text-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <Sparkles className="animate-spin" size={24} />
                  Generate My Resume!
                  <Zap className="animate-pulse" size={24} />
                </span>
              </button>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default ResumeBuilderForm
