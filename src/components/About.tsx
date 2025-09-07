import React from 'react';
import { Code, Database, Globe, Smartphone, Server, Palette } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    {
      category: "Frontend",
      icon: <Globe className="h-6 w-6" />,
      technologies: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "HTML5/CSS3"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Backend",
      icon: <Server className="h-6 w-6" />,
      technologies: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
      color: "from-green-500 to-emerald-500"
    },
    {
      category: "Database",
      icon: <Database className="h-6 w-6" />,
      technologies: ["Supabase", "PostgreSQL", "MongoDB", "Redis", "Firebase", "Prisma"],
      color: "from-purple-500 to-violet-500"
    },
    {
      category: "Mobile",
      icon: <Smartphone className="h-6 w-6" />,
      technologies: ["React Native", "Flutter", "iOS", "Android", "Expo", "PWA"],
      color: "from-pink-500 to-rose-500"
    },
    {
      category: "Tools & Others",
      icon: <Code className="h-6 w-6" />,
      technologies: ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"],
      color: "from-orange-500 to-amber-500"
    },
    {
      category: "Design",
      icon: <Palette className="h-6 w-6" />,
      technologies: ["UI/UX Design", "Figma", "Adobe XD", "Photoshop", "Responsive Design", "Prototyping"],
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              I'm a passionate full-stack developer with expertise in modern web technologies. 
              I love creating beautiful, functional, and user-friendly applications that solve real-world problems.
            </p>
            <p className="text-lg text-gray-600">
              With experience in both frontend and backend development, I enjoy working on projects 
              that challenge me to learn new technologies and improve my skills continuously.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} text-white`}>
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{skill.category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Let's Work Together</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. 
              Whether you need a website, mobile app, or full-stack solution, I'd love to help bring your ideas to life.
            </p>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;