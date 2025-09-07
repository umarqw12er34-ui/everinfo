import React from "react";
import { TrendingUp, Award, Users, MessageSquare } from "lucide-react";

type Stat = { number: string; label: string; icon: React.ReactNode; color: string };
type Testimonial = { name: string; course: string; result: string; message: string; rating: number };

const TELEGRAM_URL = "https://t.me/EVEREST_MANAGER";
const PHONE_NUMBER = "+998941580711";

const stats: Stat[] = [
  { number: "1000+", label: "Muvaffaqiyatli o'quvchilar", icon: <Users className="h-6 w-6" />, color: "from-blue-500 to-cyan-400" },
  { number: "90%", label: "OTMlarga kirish foizi", icon: <TrendingUp className="h-6 w-6" />, color: "from-green-400 to-emerald-500" },
  { number: "10+", label: "Yil tajriba", icon: <Award className="h-6 w-6" />, color: "from-yellow-400 to-orange-400" },
  { number: "92%", label: "Sertifikat olganlar", icon: <Award className="h-6 w-6" />, color: "from-purple-500 to-pink-500" },
];

const testimonials: Testimonial[] = [
  {
    name: "Aziz Karimov",
    course: "Matematika va Fizika",
    result: "TATU ga o'qishga kirdi",
    message: "EVEREST markazi tufayli imtihonlarga to'liq tayyorlandim — darslar juda fokuslangan va amaliy.",
    rating: 5
  },
  {
    name: "Malika Tosheva",
    course: "Turk tili",
    result: "B2 sertifikat oldi",
    message: "O'qituvchi sabr bilan har bir mavzuni tushuntirdi, imtihonga yaxshi tayyorlandim.",
    rating: 5
  },
  {
    name: "Javohir Abdullayev",
    course: "Ona tili",
    result: "A+ sertifikat oldi",
    message: "Essay yozish va tahlil bo'yicha ko'nikmalarim ancha yaxshilandi — natija ajoyib.",
    rating: 5
  }
];

const Results: React.FC = () => {
  const openTelegram = () => {
    window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");
  };

  const callPhone = () => {
    // On mobile this opens the dialer with number prefilled
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  return (
    <section id="results" className="py-20 bg-gradient-to-b from-indigo-900 via-indigo-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">📊 Bizning Natijalarimiz</h2>
          <p className="mt-3 text-lg text-indigo-200 max-w-3xl mx-auto">
            O'quvchilarimiz erishgan natijalar — sifat va natija biz uchun ustuvor.
          </p>
        </div>

        {/* Stats: modern glass cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl bg-white/6 backdrop-blur-sm border border-white/10 p-6 flex flex-col items-start gap-4 hover:scale-[1.02] transition"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br ${s.color} text-white shadow-md`}>
                {s.icon}
              </div>
              <div className="mt-2">
                <div className="text-2xl md:text-3xl font-bold leading-tight">{s.number}</div>
                <div className="text-sm text-indigo-200/90 mt-1">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">💬 O'quvchilar fikrlari</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <article
                key={idx}
                className="bg-white/6 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition"
                aria-label={`Testimonial ${t.name}`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-600/80 flex items-center justify-center text-white font-semibold">
                      {t.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                      <p className="text-xs text-indigo-200">{t.course}</p>
                    </div>
                  </div>

                  <div className="mb-4 text-indigo-100/95 italic text-sm leading-relaxed">
                    <MessageSquare className="inline-block mr-2 -mt-1 h-5 w-5 text-indigo-300/90" />
                    {t.message}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                    ))}
                  </div>
                  <div className="text-xs bg-gradient-to-r from-emerald-400 to-green-500 text-white px-3 py-1 rounded-full font-semibold">
                    {t.result}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="mx-auto max-w-3xl bg-gradient-to-r from-white/6 to-white/4 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">🚀 Siz ham muvaffaqiyat qatoriga qo'shiling!</h3>
            <p className="text-indigo-200 mb-6">Bugun bepul darsga yoziling va bilim olish yo'lingizni boshlang.</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={openTelegram}
                aria-label="Bepul darsga yozilish — Telegram orqali"
                className="inline-flex items-center gap-3 bg-amber-400 text-slate-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-[1.03] transition"
              >
                🆓 Bepul darsga yozilish
              </button>
              <button
                onClick={callPhone}
                aria-label="Aloqa — telefon raqamni terish"
                className="inline-flex items-center gap-3 border border-white/10 px-5 py-3 rounded-lg text-white hover:bg-white/5 transition"
              >
                📞 Aloqa
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;