import React from "react";
import { NavLink } from "react-router-dom";
import homeImage from "../assets/resume-removebg-preview.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8 lg:space-y-10 text-center lg:text-left">
          <div className="space-y-6 lg:space-y-8">
            {/* Main Heading with Enhanced Typography */}
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-800 leading-none tracking-tight">
                Build Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 drop-shadow-sm">
                  Perfect Resume
                </span>
              </h1>
              {/* Decorative underline */}
              <div className="absolute -bottom-2 left-0 lg:left-0 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto lg:mx-0"></div>
            </div>

            {/* Enhanced Quote with Better Styling */}
            <div className="relative">
              <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-600 italic font-medium leading-relaxed relative">
                <div className="absolute -left-2 -top-2 text-4xl text-purple-300 font-serif">"</div>
                <div className="pl-6 pr-6 py-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
                  Your resume is your story. Make it compelling, make it count, and make it yours.
                </div>
                <div className="absolute -right-2 -bottom-2 text-4xl text-purple-300 font-serif">"</div>
              </blockquote>
            </div>

            {/* Enhanced Description */}
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl font-medium">
              Create a professional resume that stands out from the crowd. Our intuitive builder 
              helps you craft the perfect resume to land your dream job with AI-powered insights.
            </p>
          </div>

          {/* Enhanced CTA Section */}
          <div className="space-y-8">
            <NavLink to="/form" className="group inline-block">
              <button className="relative bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 text-white font-bold py-4 px-10 lg:py-5 lg:px-12 rounded-2xl shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-lg lg:text-xl overflow-hidden group">
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <span className="text-2xl">🚀</span>
                  Build Resume Now
                </span>
              </button>
            </NavLink>

            {/* Enhanced Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm">
              <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/30">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-700">100% Free</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/30">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-700">Pro Templates</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/30">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-700">Instant Download</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Right Content (Image) */}
        <div className="flex-1 flex justify-center w-full max-w-lg lg:max-w-none relative">
          {/* Floating elements around image */}
          <div className="absolute -inset-4 animate-ping">
            <div className="w-4 h-4 bg-purple-400 rounded-full absolute top-0 left-1/4 opacity-60"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full absolute bottom-0 right-1/4 opacity-60"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full absolute top-1/2 left-0 opacity-60"></div>
          </div>
          
          {/* Main image container with enhanced styling */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl scale-110 group-hover:scale-125 transition-transform duration-500"></div>
            
            <img 
              src={homeImage}
              alt="Resume Preview"
              className="relative w-full h-auto rounded-3xl shadow-2xl border-4 border-white/50 backdrop-blur-sm group-hover:scale-105 transition-all duration-500 hover:shadow-purple-500/25"
            />
            
            {/* Enhanced floating badges */}
            <div className="absolute -top-6 -right-6 lg:-top-8 lg:-right-8">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-4 py-2 lg:px-5 lg:py-3 rounded-2xl text-sm lg:text-base font-bold shadow-xl border-2 border-white/50 animate-bounce">
                <span className="mr-2 text-lg">✨</span>AI Powered
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 lg:-bottom-8 lg:-left-8">
              <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-green-900 px-4 py-2 lg:px-5 lg:py-3 rounded-2xl text-sm lg:text-base font-bold shadow-xl border-2 border-white/50 animate-bounce animation-delay-1000">
                <span className="mr-2 text-lg">📄</span>ATS Friendly
              </div>
            </div>

            {/* New floating badge */}
            <div className="absolute top-1/2 -left-8 lg:-left-12 transform -translate-y-1/2">
              <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-pink-900 px-3 py-2 lg:px-4 lg:py-3 rounded-2xl text-xs lg:text-sm font-bold shadow-xl border-2 border-white/50 animate-pulse">
                <span className="mr-1 text-sm">⚡</span>Fast
              </div>
            </div>
          </div>

          {/* Decorative geometric shapes */}
          <div className="absolute top-10 right-0 w-20 h-20 border-4 border-purple-300/30 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-10 left-0 w-16 h-16 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-lg rotate-45 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;