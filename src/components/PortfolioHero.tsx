import React from 'react';
import { Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react';

const PortfolioHero: React.FC = () => {
  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 text-center relative z-10">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <img
                src="/photo.jpg"
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Muhammad Umar</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-blue-200 mb-6 font-light">
            Full Stack Developer & UI/UX Designer
          </p>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            I create beautiful, functional, and user-friendly web applications using modern technologies. 
            Passionate about clean code, great design, and solving complex problems.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={scrollToPortfolio}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View My Work
          </button>
          
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </button>
          
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </div>

        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/abdumom1novvv"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6 text-white" />
          </a>
          
          <a
            href="https://linkedin.com/in/muhammad-umar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6 text-white" />
          </a>
          
          <a
            href="https://t.me/abdumom1novvv"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
            aria-label="Telegram"
          >
            <ExternalLink className="h-6 w-6 text-white" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;