import React from 'react';
import { User, Github, Linkedin, ExternalLink, Heart } from 'lucide-react';

const PortfolioFooter = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/abdumom1novvv',
      icon: <Github className="h-5 w-5" />
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/muhammad-umar',
      icon: <Linkedin className="h-5 w-5" />
    },
    {
      name: 'Telegram',
      url: 'https://t.me/abdumom1novvv',
      icon: <ExternalLink className="h-5 w-5" />
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <User className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Muhammad Umar</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Full Stack Developer passionate about creating beautiful, functional, 
              and user-friendly web applications using modern technologies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-2 text-gray-400">
              <p>
                <a 
                  href="mailto:muhammadumar@example.com"
                  className="hover:text-white transition-colors duration-300"
                >
                  muhammadumar@example.com
                </a>
              </p>
              <p>
                <a 
                  href="tel:+998941580711"
                  className="hover:text-white transition-colors duration-300"
                >
                  +998 94 158 07 11
                </a>
              </p>
              <p>Uzbekistan</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Muhammad Umar. All rights reserved.
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 mx-1" />
            <span>using React & Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;