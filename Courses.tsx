import React, { useState } from 'react';
import {
  Calculator,
  MessageCircle,
  BookOpen,
  Clock,
  Users,
  Star,
  Calendar,
  CheckCircle,
  ArrowRight,
  X
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  Icon: React.ComponentType<any>;
  description: string;
  features: string[];
  teacher: string;
  schedule: string;
  bonus: string;
  duration?: string;
  gradient: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Matematika va Fizika",
    Icon: Calculator,
    description: "Konsepsiyalarni chuqur o'zlashtirish va amaliy yechimlar — OTM va musobaqalarga tayyorlov.",
    features: [
      "Amaliy muammolarni yechish metodikasi",
      "Nazariy asoslarni mustahkamlash",
      "Imtihon strategiyalari va test-bank",
      "Kichik guruh va individual yondashuv"
    ],
    teacher: "Qahramonjon Domla",
    schedule: "Seshanba, Payshanba, Shanba",
    bonus: "30 Evercoin sovg'a + 1 dars bepul",
    gradient: "from-sky-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Turk Tili",
    Icon: MessageCircle,
    description: "Umumiy va akademik til ko'nikmalarini rivojlantirish — B2/C1 tayyorlov.",
    features: [
      "Matn tahlili va yozma ifoda",
      "Tinglab tushunish mashqlari",
      "Og'zaki muloqot va talaffuz",
      "Imtihonlarga mos mashqlar"
    ],
    teacher: "Robiyaxon Akbaraliyeva",
    schedule: "Haftada 3 kun (oflayn)",
    bonus: "Birinchi dars bepul",
    duration: "4 oy",
    gradient: "from-rose-500 to-pink-500"
  },
  {
    id: 3,
    title: "Ona tili va Adabiyot",
    Icon: BookOpen,
    description: "Adabiy tahlil, esse yozish va milliy imtihonlarga tayyorgarlik.",
    features: [
      "Grammatika va uslubiy mashqlar",
      "Badiiy tekst tahlili",
      "Esse va referat yozish ko'nikmalari",
      "Imtihon formatiga mos mashqlar"
    ],
    teacher: "Robiyaxon Akbaraliyeva",
    schedule: "Boshlanish sanasi: 15-sentyabr",
    bonus: "Sertifikatlar: B+, A, A+",
    gradient: "from-emerald-500 to-green-500"
  },
  {
    id: 4,
    title: "Matematika — Prezident maktabi tayyorlov",
    Icon: Calculator,
    description: "Xususiy tayyorlov yuzasidan kuchli natijalar va milliy imtihonlarga yo'naltirilgan dastur.",
    features: [
      "10+ yillik tajriba",
      "Prezident maktabiga matematika bo'yicha kuchli tayyorlov",
      "Yuqori ko'rsatkichlik natijalar",
      "Milliy sertifikatga tayyorlov"
    ],
    teacher: "Dostonbek Domla",
    schedule: "Individual va guruh formatlari mavjud",
    bonus: "Maxsus konsalting",
    gradient: "from-indigo-500 to-violet-500"
  },
  {
    id: 5,
    title: "Ingliz tili — Grammar & CEFR",
    Icon: MessageCircle,
    description: "Grammatika va CEFR asosida chuqur yondashuv, natija kafolatlangan.",
    features: [
      "Ingliz tili grammatika — 10+ yillik tajriba",
      "CEFR C1 natija uchun yo'naltirish",
      "Kafolatlangan yuqori natija",
      "Tezkor dars o'tish texnikasi"
    ],
    teacher: "Saidakbar Domla",
    schedule: "Haftada 3-4 mashg'ulot",
    bonus: "Birinchi tekshiruv bepul",
    gradient: "from-rose-500 to-red-500"
  },
  {
    id: 6,
    title: "Ingliz tili — IELTS & CEFR",
    Icon: MessageCircle,
    description: "IELTS va CEFR bo'yicha tayyorgarlik, individual yondashuv.",
    features: [
      "IELTS: 7 natija",
      "CEFR instructor",
      "Shaxsiy yondashuv va imtihon strategiyalari"
    ],
    teacher: "Nigoraxon",
    schedule: "Onlayn va oflayn variantlar",
    bonus: "Imtihon simulyatsiyasi",
    gradient: "from-pink-500 to-fuchsia-500"
  },
  {
    id: 7,
    title: "Ingliz tili — IELTS",
    Icon: MessageCircle,
    description: "Exam-focused darslar va ko'rsatkichlarni oshirishga yo'naltirilgan trening.",
    features: [
      "IELTS umumiy ball: 7",
      "Listening 7.5 • Reading 6.5 • Speaking 7 • Writing 6.5",
      "Amaliy darslar va test strategiyalari"
    ],
    teacher: "Asadbek",
    schedule: "Intensive va normal rejimlar",
    bonus: "Individual feedback",
    gradient: "from-blue-600 to-sky-500"
  },
  {
    id: 8,
    title: "Ingliz tili — IELTS",
    Icon: MessageCircle,
    description: "Yuqori ballga yo'naltirilgan treninglar va shaxsiy monitoring.",
    features: [
      "IELTS umumiy ball: 7.5",
      "Listening 9 • Reading 7.5 • Writing 6 • Speaking 6.5",
      "Tezkor individual rivojlanish rejasi"
    ],
    teacher: "Muhammadumar",
    schedule: "Individual konsultatsiyalar mavjud",
    bonus: "Natija monitoringi",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    id: 9,
    title: "Arab tili",
    Icon: BookOpen,
    description: "Arab tili grammatikasi va sertifikatga yo'naltirilgan o'quv dasturi.",
    features: [
      "Arab tili sertifikatiga ega o'qituvchi",
      "Grammatika asoslari va amaliy mashqlar",
      "CEFR asosida darslar"
    ],
    teacher: "Mohira",
    schedule: "Guruh va individual darslar",
    bonus: "Sertifikat tayyorgarligi",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    id: 10,
    title: "Biologiya",
    Icon: BookOpen,
    description: "Biologiya va kimyo bo'yicha chuqur nazariy va amaliy tayyorgarlik.",
    features: [
      "Biologiya sertifikatiga ega o'qituvchi",
      "Amaliy laboratoriya misollari",
      "Imtihon va olimpiada tayyorgarligi"
    ],
    teacher: "Fotimaxon",
    schedule: "Hafta oxiri laboratoriya mashg'ulotlari",
    bonus: "Nazorat ishlarida ko'mak",
    gradient: "from-lime-500 to-green-500"
  },
  {
    id: 11,
    title: "Koreys tili — TOPIK",
    Icon: MessageCircle,
    description: "Koreys tili va TOPIK sertifikatiga tayyorlov, og'zaki va yozma mashqlar.",
    features: [
      "TOPIK sertifikatiga ega instruktor",
      "5+ yillik tajriba",
      "Og'zaki va yozma mashqlar bilan mustahkamlash"
    ],
    teacher: "Nurillo",
    schedule: "Onlayn kurslar va intensiv sessiyalar",
    bonus: "TOPIK test simulyatsiyasi",
    gradient: "from-sky-400 to-indigo-500"
  },
  {
    id: 12,
    title: "Rus tili",
    Icon: MessageCircle,
    description: "Rus tili grammatikasi va konversatsiya, imtihonlarga tayyorgarlik.",
    features: [
      "Grammatika va konversatsion mashqlar",
      "Individual yondashuv",
      "Imtihon tayyorlash va praktika"
    ],
    teacher: "Munavvara",
    schedule: "Guruh va individual formatlar",
    bonus: "Til o'rganish strategiyalari",
    gradient: "from-stone-500 to-neutral-500"
  }
];

const TELEGRAM_USERNAME = "EVEREST_MANAGER";

/** ochadi Telegram chatini yangi tabda va oldindan to'ldirilgan xabar bilan */
function openTelegramRegistration(courseTitle: string, teacherName: string) {
  const message = `Assalomu alaykum, men "${courseTitle}" kursiga ${teacherName} bo'yicha ro'yxatdan o'tmoqchiman. Iltimos, yordam bering.`;
  const url = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

const Courses: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const closeModal = () => setExpandedId(null);

  return (
    <section id="courses" className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Bizning kurslar va ustozlar</h2>
          <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
            Har bir kurs va ustoz zamonaviy dars metodikasi va professional yondashuv bilan ishlaydi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const Icon = course.Icon;
            return (
              <article
                key={course.id}
                onClick={() => setExpandedId(course.id)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden cursor-pointer"
                role="button"
                aria-label={`Kurs tafsilotlari: ${course.title}`}
              >
                {/* Minimal card: faqat fan nomi va o'qituvchi */}
                <div className={`p-5 ${"bg-gradient-to-r " + course.gradient}`}>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 rounded-lg p-3 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-white leading-tight">
                        {course.title}
                      </span>
                      <span className="text-sm text-white/90 mt-0.5">— {course.teacher}</span>
                    </div>
                  </div>
                </div>
                {/* Body intentionally minimal — boshqa tafsilotlar modalda ko'rsatiladi */}
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal: expanded course details */}
      {expandedId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeModal}
        >
          <div
            className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    {courses.find(c => c.id === expandedId)?.title}
                  </h3>
                  <div className="text-sm text-gray-600 mt-1">
                    {courses.find(c => c.id === expandedId)?.teacher}
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-800"
                  aria-label="yopish"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <p className="text-gray-700">
                    {courses.find(c => c.id === expandedId)?.description}
                  </p>

                  <h4 className="mt-6 text-sm font-semibold text-gray-900">Kurs xususiyatlari</h4>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    {courses.find(c => c.id === expandedId)?.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <aside className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="text-sm text-gray-600">Ustoz</div>
                  <div className="font-semibold text-gray-900 mt-1">
                    {courses.find(c => c.id === expandedId)?.teacher}
                  </div>

                  {courses.find(c => c.id === expandedId)?.schedule && (
                    <>
                      <div className="text-sm text-gray-600 mt-4">Jadval</div>
                      <div className="mt-1 text-gray-800 text-sm">
                        {courses.find(c => c.id === expandedId)?.schedule}
                      </div>
                    </>
                  )}

                  {courses.find(c => c.id === expandedId)?.duration && (
                    <>
                      <div className="text-sm text-gray-600 mt-4">Davomiyligi</div>
                      <div className="mt-1 text-gray-800 text-sm">
                        {courses.find(c => c.id === expandedId)?.duration}
                      </div>
                    </>
                  )}

                  <div className="mt-6">
                    <button
                      onClick={() => {
                        const c = courses.find(x => x.id === expandedId);
                        if (c) openTelegramRegistration(c.title, c.teacher);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:opacity-95 transition"
                    >
                      Ro'yxatdan o'tish
                    </button>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Courses;