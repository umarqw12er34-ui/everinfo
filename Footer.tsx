import React from 'react';
import { BookOpen, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    courses: [
      { name: "🧮 Matematika va Fizika", href: "#courses" },
      { name: "🇹🇷 Turk Tili", href: "#courses" },
      { name: "📚 Ona Tili va Adabiyot", href: "#courses" },
      { name: "🪙 Smart Coin", href: "#smart-coin" }
    ],
    resources: [
      { name: "🌐 Smart Coin Web", href: "https://everestsmartcoin.netlify.app/", icon: <ExternalLink className="h-4 w-4" /> },
      { name: "📱 Smart Coin App", href: "https://t.me/Everest_SC/594", icon: <ExternalLink className="h-4 w-4" /> },
      { name: "🏆 Turk Tili Natijalari", href: "https://t.me/natija_turk_tili", icon: <ExternalLink className="h-4 w-4" /> },
      { name: "📢 Everest SC Kanal", href: "https://t.me/Everest_SC", icon: <ExternalLink className="h-4 w-4" /> }
    ]
  };

  return (
    <footer className="relative text-white overflow-hidden bg-[#0066FF]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 gradient-anim" />
        <div className="absolute inset-0 shine-overlay pointer-events-none" />
      </div>

      <style>{`
        .gradient-anim{
          position:absolute; inset:0;
          /* brighter vivid blue */
          background: linear-gradient(180deg, #0078FF 0%, #0048c8 100%);
        }
        .shine-overlay{
          position:absolute; inset:0;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0) 100%);
          transform: translateX(-100%);
          animation: shine 6s linear infinite;
          mix-blend-mode: overlay;
          opacity: 0.45;
        }
        @keyframes shine{
          0%{transform:translateX(-100%)}
          100%{transform:translateX(100%)}
        }

        /* glowing creator text */
        .creator-glow {
          text-shadow:
            0 0 8px rgba(255,255,255,0.9),
            0 0 20px rgba(0,150,255,0.6),
            0 0 40px rgba(0,120,255,0.35);
          animation: neonPulse 2.5s ease-in-out infinite;
        }
        @keyframes neonPulse {
          0%, 100% { text-shadow: 0 0 6px rgba(255,255,255,0.9), 0 0 18px rgba(0,150,255,0.6), 0 0 36px rgba(0,120,255,0.25); opacity:1; transform: translateY(0); }
          50% { text-shadow: 0 0 12px rgba(255,255,255,0.95), 0 0 28px rgba(0,150,255,0.75), 0 0 56px rgba(0,120,255,0.35); opacity:0.98; transform: translateY(-2px); }
        }

        .telegram-btn {
          background: linear-gradient(90deg,#2AABEE,#1E8ED6);
          padding: 10px 14px;
          border-radius: 9999px;
          display:flex;
          align-items:center;
          gap:10px;
          box-shadow: 0 6px 18px rgba(42,171,238,0.25), inset 0 1px 0 rgba(255,255,255,0.06);
          transition: transform .15s ease, box-shadow .15s ease;
        }
        .telegram-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(42,171,238,0.32); }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Brand with logo next to EVEREST */}
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <img src="/photo.jpg" alt="EVEREST logo" className="h-14 w-14 object-cover rounded-md shadow-sm flex-shrink-0" />
              <div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-8 w-8 text-white/90" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">EVEREST</span>
                </div>
                <p className="text-white/95 mt-2 text-sm md:text-base leading-relaxed">
                  🚀 Bilim cho'qqisiga ko'tariling! Professional ustozlar, zamonaviy metodlar va 🪙 Smart Coin tizimi.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-white/90 text-sm md:text-base">
              <MapPin className="h-5 w-5 text-white/90 mt-1 flex-shrink-0" />
              <span>🏢 Buloqboshi tumani markazi, Yoshlar bog'i ro'parasida</span>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-6 text-white">📚 Kurslarimiz</h3>
            <ul className="space-y-3">
              {links.courses.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/95 hover:text-white transition-colors duration-300 flex items-center space-x-2 group text-sm md:text-base"
                  >
                    <div className="w-1 h-1 bg-white rounded-full group-hover:w-2 transition-all duration-300" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-6 text-white">🔗 Foydali Havolalar</h3>
            <ul className="space-y-3">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/95 hover:text-white transition-colors duration-300 flex items-center space-x-2 group text-sm md:text-base"
                  >
                    <div className="text-white/90 group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </div>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section with creator and telegram button */}
        <div className="border-t border-white/10 mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-white/90 text-sm md:text-base text-center lg:text-left">
              © {currentYear} EVEREST O'quv Markazi. Barcha huquqlar himoyalangan.
            </div>

            <div className="flex flex-col items-center">
              <div className="text-xs text-white/80 mb-1">Sayt yaratuvchisi</div>
              <div className="text-2xl md:text-4xl font-extrabold uppercase creator-glow text-center">MUHAMMAD UMAR</div>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="https://t.me/abdumom1novvv"
                target="_blank"
                rel="noopener noreferrer"
                className="telegram-btn"
                aria-label="Telegram - MUHAMMAD UMAR"
              >
                {/* simple modern Telegram SVG */}
                <svg width="20" height="20" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M120 0C53.7 0 0 53.7 0 120s53.7 120 120 120 120-53.7 120-120S186.3 0 120 0z" fill="#2AABEE"/>
                  <path d="M179.8 67.9L160.1 179.4c-1.9 8.6-7 10.8-14.2 6.7l-39.2-28.8-18.9 18.1c-2.1 2.1-3.9 3.9-7.9 3.9l2.8-39.6 71.9-64.9c3.1-2.8-.7-4.4-4.8-1.6L66.8 122.6 34.6 112.8c-9.4-3.1-9.6-9.4 2-13.9L174.6 64c7.8-2.2 14.2 1.7 5.2 3.9z" fill="#fff"/>
                </svg>
                <span className="text-white font-semibold text-sm md:text-base">Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;