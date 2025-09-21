import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, Zap, Star, Crown, Eye, ArrowRight, Palette, Heart, Trophy } from 'lucide-react';
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";

const TemplatePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resumeData } = location.state || {};
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const templates = [
    { 
      id: 1, 
      name: "Professional Elite", 
      subtitle: "Clean & Corporate",
      component: <Template1 resumeData={resumeData} />,
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      hoverGradient: "from-blue-500 via-indigo-500 to-purple-500",
      icon: <Crown className="w-5 h-5" />,
      popular: true,
      badge: "Most Popular"
    },
    { 
      id: 2, 
      name: "Modern Fusion", 
      subtitle: "Sleek & Contemporary",
      component: <Template2 resumeData={resumeData} />,
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      hoverGradient: "from-emerald-500 via-teal-500 to-cyan-500",
      icon: <Zap className="w-5 h-5" />,
      trending: true,
      badge: "Trending"
    },
    { 
      id: 3, 
      name: "Creative Spark", 
      subtitle: "Bold & Vibrant",
      component: <Template3 resumeData={resumeData} />,
      gradient: "from-orange-600 via-red-600 to-pink-600",
      hoverGradient: "from-orange-500 via-red-500 to-pink-500",
      icon: <Sparkles className="w-5 h-5" />,
      creative: true,
      badge: "Creative"
    },
    { 
      id: 4, 
      name: "Elegant Luxe", 
      subtitle: "Premium & Sophisticated",
      component: <Template4 resumeData={resumeData} />,
      gradient: "from-purple-600 via-violet-600 to-fuchsia-600",
      hoverGradient: "from-purple-500 via-violet-500 to-fuchsia-500",
      icon: <Star className="w-5 h-5" />,
      premium: true,
      badge: "Premium"
    },
  ];

  const handleSelect = (id) => {
    setSelectedTemplate(id);
    // Add loading animation before navigation
    setTimeout(() => {
      navigate(`/template${id}`, { state: { resumeData } });
    }, 800);
  };

  const getBadgeStyle = (template) => {
    if (template.popular) return "bg-gradient-to-r from-yellow-500 to-orange-500 shadow-yellow-500/25";
    if (template.trending) return "bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-500/25";
    if (template.creative) return "bg-gradient-to-r from-pink-500 to-rose-500 shadow-pink-500/25";
    if (template.premium) return "bg-gradient-to-r from-purple-500 to-violet-500 shadow-purple-500/25";
    return "bg-gradient-to-r from-blue-500 to-indigo-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200/30 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-200/30 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center py-16 px-4">
        <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Palette className="w-4 h-4" />
            <span>Choose Your Perfect Template</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-7xl font-black bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
            Resume Templates
          </h1>
          
          {/* Subtitle */}
          <p className="text-md md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-2">
            Transform your career story with our <span className="font-bold text-blue-600">stunning collection</span> of professional resume templates. 
            <br />
            <span className="text-purple-600 font-semibold">Each design is crafted to make you stand out.</span>
          </p>

        </div>
      </div>

      {/* Templates Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className={`group cursor-pointer transform transition-all duration-700 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              } ${hoveredTemplate === template.id ? 'scale-105 z-20' : 'hover:scale-105'} ${
                selectedTemplate === template.id ? 'scale-110 z-30' : ''
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => handleSelect(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className={`relative bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-500 border-2 ${
                hoveredTemplate === template.id ? 'shadow-2xl border-blue-200' : 'border-gray-100'
              } ${selectedTemplate === template.id ? 'shadow-3xl border-purple-300 ring-4 ring-purple-100' : ''}`}>
                
                {/* Badge */}
                <div className={`absolute top-1 left-2 z-20 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg transition-all duration-300 ${getBadgeStyle(template)} ${
                  hoveredTemplate === template.id ? 'scale-110 rotate-3' : ''
                }`}>
                  <div className="flex items-center gap-1.5">
                    {template.popular && <Trophy className="w-3 h-3" />}
                    {template.trending && <Zap className="w-3 h-3" />}
                    {template.creative && <Heart className="w-3 h-3" />}
                    {template.premium && <Crown className="w-3 h-3" />}
                    {template.badge}
                  </div>
                </div>

                {/* Template Preview */}
                <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                  {/* Preview Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 transition-all duration-500 flex items-center justify-center ${
                    hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className={`transform transition-all duration-500 ${
                      hoveredTemplate === template.id ? 'translate-y-0 scale-100' : 'translate-y-8 scale-90'
                    }`}>
                      <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center">
                        <Eye className="w-12 h-12 text-white mx-auto mb-4" />
                        <p className="text-white font-bold text-lg mb-2">Preview Template</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actual Template Preview */}
                  <div className="absolute w-3xl transform scale-75 origin-top-left transition-transform duration-500 group-hover:scale-80">
                    {template.component}
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6 bg-white">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${template.gradient} text-white shadow-lg transition-all duration-300 ${
                      hoveredTemplate === template.id ? 'rotate-12 scale-110' : ''
                    }`}>
                      {template.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold text-gray-800 transition-all duration-300 ${
                        hoveredTemplate === template.id ? 'text-transparent bg-gradient-to-r bg-clip-text ' + template.hoverGradient : ''
                      }`}>
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">
                        {template.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Select Button */}
                  <button className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                    selectedTemplate === template.id 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/30' 
                      : `bg-gradient-to-r ${template.gradient} hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-1`
                  }`}>
                    {selectedTemplate === template.id ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        </div>
                        Loading Template...
                      </>
                    ) : (
                      <>
                        <span>Select Template</span>
                        <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                          hoveredTemplate === template.id ? 'translate-x-2' : ''
                        }`} />
                      </>
                    )}
                  </button>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${template.gradient} opacity-0 transition-opacity duration-500 pointer-events-none rounded-3xl ${
                  hoveredTemplate === template.id ? 'opacity-10' : ''
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 text-center pb-16 px-4">
        <div className="inline-flex items-center gap-2 text-gray-600 text-sm font-medium bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200">
          <Sparkles className="w-4 h-4" />
          <span>"Your resume is your first impression—make it count."</span>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;