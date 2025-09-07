import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MessageSquare, Send, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';

const PortfolioContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactInfo = [
    {
      title: 'Email',
      details: 'muhammadumar@example.com',
      icon: <Mail className="h-5 w-5 text-white" />,
      color: 'from-blue-500 to-indigo-600',
      href: 'mailto:muhammadumar@example.com'
    },
    {
      title: 'Phone',
      details: '+998 94 158 07 11',
      icon: <Phone className="h-5 w-5 text-white" />,
      color: 'from-green-500 to-teal-500',
      href: 'tel:+998941580711'
    },
    {
      title: 'Location',
      details: 'Uzbekistan',
      icon: <MapPin className="h-5 w-5 text-white" />,
      color: 'from-purple-500 to-pink-500',
      href: null
    },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/abdumom1novvv',
      icon: <Github className="h-6 w-6" />,
      color: 'hover:bg-gray-800'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/muhammad-umar',
      icon: <Linkedin className="h-6 w-6" />,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Telegram',
      url: 'https://t.me/abdumom1novvv',
      icon: <ExternalLink className="h-6 w-6" />,
      color: 'hover:bg-blue-500'
    }
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    // Open email client
    window.location.href = `mailto:muhammadumar@example.com?subject=${subject}&body=${body}`;
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    alert('Email client opened! Your message has been prepared.');
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 px-4 lg:px-0">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className={`p-2 md:p-3 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center`}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                      {info.title}
                    </h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-600 text-sm md:text-base hover:text-blue-600 underline"
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-gray-600 text-sm md:text-base">
                        {info.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
              <h4 className="font-semibold text-gray-900 mb-4 text-sm md:text-base">
                Follow Me
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-100 ${social.color} rounded-lg transition-all duration-300 transform hover:scale-110`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 px-4 lg:px-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                Send Me a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 md:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm md:text-base"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioContact;