import React from 'react';

const Hero: React.FC = () => {
  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(7, 89, 133, 0.35), rgba(124, 58, 237, 0.20)), url('/photo.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-16 rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img
            src="/photo.jpg"
            alt="EVEREST logo"
            className="h-14 w-14 rounded-full object-cover ring-2 ring-white/30"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">
            EVEREST <span className="text-sm block font-medium text-black/70">O'quv Markazi</span>
          </h1>
        </div>

        <p className="text-center mt-4 text-black/80 text-base sm:text-lg">
          Bilim Cho'qqisiga Ko'tariling — biz bilan har bir qadam aniq va ishonchli.
        </p>

        <div className="mt-6 space-y-3 text-center">
          <p className="text-sm sm:text-base text-black/70">
            EVEREST — professional o'qituvchilar, interaktiv metodika va Smart Coin motivatsiyasi bilan
            o'quvchilarga amaliy va nazariy bilimlarni beradi. Kurslar: Matematika, Fizika, Turk tili,
            Ona tili va imtihon tayyorgarligi.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={scrollToCourses}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full font-medium shadow-md transition"
            >
              Kurslarga o'tish
            </button>
            <button
              onClick={scrollToContact}
              className="px-6 py-3 bg-white/90 hover:bg-white text-gray-900 rounded-full font-medium transition"
            >
              Aloqa
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;