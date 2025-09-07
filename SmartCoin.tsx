import React, { useState } from 'react';
import { Coins, Trophy, Gift, Star, ArrowRight } from 'lucide-react';

const SmartCoin: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Coin yigʻish",
      description: "Uy vazifasi, faol qatnashish va intizom uchun raqamli mukofotlar.",
      icon: <Coins className="h-5 w-5" />
    },
    {
      title: "Shaxsiy kabinet",
      description: "Balans, tranzaksiyalar tarixi va progress monitoringi.",
      icon: <Star className="h-5 w-5" />
    },
    {
      title: "Raqobat va leaderboard",
      description: "Sinfdoshlar bilan reyting va oylik musobaqalar.",
      icon: <Trophy className="h-5 w-5" />
    },
    {
      title: "Sovgʻalar va auksion",
      description: "Coinlar yordamida sovg`alar olish va auksionlarda qatnashish.",
      icon: <Gift className="h-5 w-5" />
    }
  ];

  const benefits = [
    "Doimiy rag'bat va ishtiyoq",
    "Talabalar faolligini oshirish",
    "Oʻqituvchilar uchun samarali boshqaruv",
    "Natijalarni aniq o'lchash va taqdirlash"
  ];

  return (
    <section
      id="smart-coin"
      className="relative overflow-hidden py-16 md:py-24 text-gray-900 bg-gradient-to-b from-amber-300 via-amber-100 to-sky-100"
      aria-label="Smart Coin section"
    >
      {/* stronger decorative background layers */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(circle at 10% 15%, rgba(255,197,65,0.18), transparent 12%),' +
            'radial-gradient(circle at 85% 85%, rgba(96,165,250,0.12), transparent 14%),' +
            'linear-gradient(180deg, rgba(255,249,230,0.9) 0%, rgba(240,249,255,0.95) 60%, rgba(240,249,255,0.98) 100%)'
        }}
      />

      <svg
        className="absolute right-0 top-0 -translate-y-20 pointer-events-none"
        width="520"
        height="520"
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.35 }}
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#FFD54F" stopOpacity="0.95" />
            <stop offset="1" stopColor="#FFB86B" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <g transform="translate(20,20)">
          <circle cx="100" cy="100" r="56" fill="url(#g1)" />
          <circle cx="180" cy="180" r="40" fill="#C4B5FD" />
          <circle cx="260" cy="80" r="30" fill="#93C5FD" />
          <g transform="translate(80,260) rotate(12)">
            <ellipse cx="0" cy="0" rx="90" ry="28" fill="#FFD54F" opacity="0.28" />
          </g>
        </g>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-sm font-medium text-gray-900">
              <Coins className="h-4 w-4 text-yellow-700" /> Yangilik
            </span>

            <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-black">
              Smart Coin — motivatsion mukofot tizimi
            </h2>
            <p className="mt-3 text-gray-700">
              Raqamli mukofot tizimi orqali ta'lim jarayonini qiziqarli, adolatli va natijaviy qilish.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: features */}
          <div className="space-y-4">
            {features.map((f, i) => (
              <button
                key={i}
                onClick={() => setActiveFeature(i)}
                className={`group flex gap-4 items-start p-4 sm:p-5 rounded-2xl transition-shadow duration-200 w-full text-left ${
                  activeFeature === i ? 'bg-white shadow-2xl border border-amber-200' : 'bg-white/80 hover:shadow-lg border border-gray-100'
                }`}
              >
                <div
                  className={`flex items-center justify-center h-12 w-12 rounded-xl shrink-0 ${
                    activeFeature === i ? 'bg-amber-400 text-gray-900' : 'bg-white text-amber-600 border'
                  }`}
                >
                  {React.cloneElement(f.icon as React.ReactElement, { className: 'h-5 w-5' })}
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-semibold text-black">{f.title}</h3>
                  <p className="mt-1 text-sm text-gray-700">{f.description}</p>
                </div>

                <div className="self-center">
                  <ArrowRight className={`h-4 w-4 text-gray-600 transition-transform ${activeFeature === i ? 'translate-x-0' : 'group-hover:translate-x-1'}`} />
                </div>
              </button>
            ))}

            <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-white border border-amber-100 shadow-sm">
              <h4 className="text-sm font-semibold text-black mb-3">Afzalliklar</h4>
              <ul className="grid gap-2 text-sm text-gray-700">
                {benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: visual + info panel */}
          <div className="relative">
            <div className="rounded-3xl p-6 sm:p-8 bg-white border border-amber-100 shadow-xl overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-amber-400 w-28 h-28 flex items-center justify-center shadow-lg">
                      <Coins className="h-10 w-10 text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-80 rounded-2xl bg-gray-50 p-4 text-gray-900 shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium">Funktsiya</div>
                    <div className="text-xs text-gray-600">Detal</div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-lg text-black">
                      {features[activeFeature].title}
                    </h5>
                    <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                      {features[activeFeature].description}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      <span>Real-time balans yangilanadi</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      <span>Sovg'alar va auksionlar bilan integratsiya</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      <span>O'qituvchi monitoringi va statistikasi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* stronger decorative blobs */}
            <div className="pointer-events-none absolute -left-8 -bottom-8 w-44 h-44 rounded-full bg-amber-400 opacity-40 blur-3xl"></div>
            <div className="pointer-events-none absolute -right-10 -top-10 w-64 h-64 rounded-full bg-sky-400 opacity-30 blur-4xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartCoin;