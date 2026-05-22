import React from 'react';
import { Award, Zap, Users, Sparkles, Star, ChevronRight, CheckCircle2, MessageSquare, GraduationCap, Calendar, Clock, BookOpen, Calculator, Volume2 } from 'lucide-react';
import { Course, Teacher, Result, CenterConfig } from '../types';

interface HomeTabProps {
  config: CenterConfig;
  courses: Course[];
  teachers: Teacher[];
  results: Result[];
  setActiveTab: (tab: string) => void;
  setSelectedCourseId: (id: string) => void;
}

export default function HomeTab({ config, courses, teachers, results, setActiveTab, setSelectedCourseId }: HomeTabProps) {
  // Stats
  const stats = [
    { label: "Muvaffaqiyatli Bitiruvchilar", value: `${config.studentCount}+`, subtitle: "Xalqaro maqsadlar egasi", icon: Users },
    { label: "IELTS 7.0+ Ko'rsatkichlar", value: `${config.successCount}+`, subtitle: "Haqiqiy rasm va sertifikatlar", icon: Award },
    { label: "O'rtacha Akademik Ball", value: config.averageScore, subtitle: "Barcha guruhlar bo'yicha", icon: Star },
    { label: "Yillik Tajriba", value: "8+", subtitle: "Mukammal mualliflik dasturi", icon: GraduationCap }
  ];

  // Selected result for featured card
  const topResult = results[0];

  // IELTS conversion calculator state
  const [ieltsValue, setIeltsValue] = React.useState<string>('7.0');
  const [cefrValue, setCefrValue] = React.useState<string>('C1 (Advanced)');
  const [descValue, setDescValue] = React.useState<string>("Xalqaro muloqot va oliy o'quv yurtlari granti uchun yetarli darajada.");

  const handleIeltsChange = (val: string) => {
    setIeltsValue(val);
    const score = parseFloat(val);
    if (score >= 8.5) {
      setCefrValue('C2 (Proficiency / Mukammal)');
      setDescValue("Ingliz tili ona tili darajasida so'zlashuvchi hamda ilmiy maqolalar yurituvchi darajaga teng.");
    } else if (score >= 7.0) {
      setCefrValue("C1 (Advanced / Ilg'or)");
      setDescValue("Professional ish faoliyati, xalqaro universitetlarda to'liq ingliz tilida o'qish va yashash darajasi.");
    } else if (score >= 5.5) {
      setCefrValue("B2 (Upper-Intermediate / O'rta-ilg'or)");
      setDescValue("Keng doiradagi muloqot tizimi, standart ish intervyularidan muvaffaqiyatli o'tish imkoniyati.");
    } else if (score >= 4.5) {
      setCefrValue("B1 (Intermediate / O'rtacha)");
      setDescValue("Asosiy so'zlashuv qobiliyati shakllangan, tushunarli matn va nutqlar bilan muloqot qilish.");
    } else {
      setCefrValue("A2 (Elementary / Boshlang'ich)");
      setDescValue("Aniq qisqa jumlalar, asosiy shaxsiy ma'lumotlarni so'zlab berish ko'nikmasi.");
    }
  };

  return (
    <div className="space-y-20 pb-16 animate-fadeIn" id="home-tab-container">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-20 pb-24" id="hero-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/35 rounded-full text-amber-400 text-xs sm:text-sm font-semibold tracking-wide">
                <Sparkles className="h-4 w-4 animate-spin text-amber-500" />
                <span>FAQQAT INGLIZ TILI AKADEMIYASI</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Kelajagingizni <br />
                <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                  {config.centerName}
                </span> Bilan Birga Quring!
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {config.motto} Biz sizga ingliz tili darajangizni oshirish, IELTS balingizni eng yuqori natijalarga chiqarish uchun mualliflik metodologiyasi va bepul qo'shimcha darslarni taqdim etamiz.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button
                  onClick={() => setActiveTab('apply')}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-650 hover:to-yellow-750 text-slate-950 font-extrabold rounded-xl shadow-lg hover:shadow-amber-500/20 transform hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  Bepul darsga yozilish <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 font-bold rounded-xl transition-all cursor-pointer"
                >
                  Kurslarimiz bilan tanishish
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-6 border-t border-slate-850 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>Noldan boshlash imkoniyati</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>Support Teacher tizimi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>Haftalik Mock imtihonlar</span>
                </div>
              </div>

            </div>

            {/* Hero Right Widget - Featured Student Result Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                
                {/* Background decorative glow */}
                <div className="absolute inset-x-0 -top-4 -bottom-4 bg-gradient-to-tr from-amber-500/20 to-teal-500/20 blur-3xl rounded-3xl"></div>
                
                {/* Score Card container */}
                <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-850 pb-5">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-amber-500" />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">TOP NATIJA</span>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/25">
                      Westminster Grant
                    </span>
                  </div>

                  {/* Student profile info */}
                  {topResult && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-full bg-gradient-to-tr ${topResult.avatarStyle} flex items-center justify-center font-bold text-white text-lg`}>
                          {topResult.studentName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{topResult.studentName}</h4>
                          <p className="text-xs text-slate-400">{topResult.originRegion} filiali</p>
                        </div>
                      </div>

                      {/* Display Score Badge */}
                      <div className="p-4 bg-slate-950/85 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase font-black block">IMTIHON BALLI</span>
                          <span className="text-3xl font-black text-amber-500 tracking-tight">{topResult.score}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 uppercase font-black block">IMTIHON TURI</span>
                          <span className="text-xs font-bold text-slate-300 block">{topResult.type} Sertifikati</span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-400 italic leading-relaxed">
                        "{topResult.details}"
                      </p>

                      <div className="text-xs text-slate-500 flex items-center justify-between border-t border-slate-850 pt-4">
                        <span>O'rganish davomiyligi: 6 oy</span>
                        <span>Yil: {topResult.year}</span>
                      </div>
                    </div>
                  )}

                  {/* Call to action card */}
                  <button 
                    onClick={() => setActiveTab('results')}
                    className="w-full text-center py-3 bg-slate-950 hover:bg-slate-800 text-white hover:text-amber-400 text-xs font-bold rounded-xl transition-all border border-slate-800 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Barcha 1000+ natijalarni ko'rish <ChevronRight className="h-3 w-3" />
                  </button>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="stats-section">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-4" id={`stat-card-${i}`}>
                <div className="p-3 bg-gradient-to-tr from-slate-900 to-slate-800 rounded-xl text-amber-500">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase font-black text-slate-400 block">{stat.label}</span>
                  <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{stat.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Specialization Alert / Why Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="why-us-section">
        <div className="bg-slate-900 rounded-3xl text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.06),transparent_55%)]"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3 py-1 bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-bold rounded-lg uppercase tracking-widest">
                BIZNING SHUHRATIMIZ
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Nega bizda faqat <span className="text-amber-500">Ingliz tili</span> o'qitiladi?
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Ko'plab o'quv markazlari hamma fanlarni aralashtirib o'qitishadi. Natijada sifat va har bir fanga ajratiladigan e'tibor kamayadi. Biz esa <strong>faqat ingliz tiliga ixtisoslashdik</strong>! Bizning barcha resursimiz, ustozlar malakasi va metodikalarimiz bir maqsadga - o'quvchilarimizga ingliz tilini dunyodagi eng yuqori darajada tushuntirish va o'rgatishga qaratilgan.
              </p>
              
              <div className="space-y-3">
                {[
                  "100% barcha ustozlarimiz IELTS 8.0 / 8.5 / 9.0 balli mutaxassislar",
                  "Support Teacher tizimi bepul har kuni darsdan tashqari qo'shimcha yordam beradi",
                  "IELTS va CEFR imtihoni topshiruvchilar uchun haftalik bepul Mock test va uning tahlili"
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-400" />
                    <span className="text-sm font-semibold text-slate-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4">
                <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-400 self-start">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Kundalik support tizimi</h4>
                  <p className="text-xs text-slate-400 mt-1">Siz dars tugagandan keyin ham o'quv markazda qolib, mutaxassis ustozlar nazoratida uyga vazifalarni bajarasiz.</p>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4">
                <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-400 self-start">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Haqiqiy IDP materiallar</h4>
                  <p className="text-xs text-slate-400 mt-1">Hech qanday eski va samarasiz kitoblar emas. Biz faqat so'nggi yilning eng dolzarb IELTS imtihon savollarini o'tamiz.</p>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4">
                <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-400 self-start">
                  <Volume2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base font-sans">Speaking Club va debatlar</h4>
                  <p className="text-xs text-slate-400 mt-1">Har yakshanba xorijiy mehmonlar (Native Speakers) hamda yuqori balli o'quvchilar bilan ingliz tilida jonli muloqot mashb'uloti.</p>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4">
                <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-400 self-start">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Biznes va IELTS hamkorligi</h4>
                  <p className="text-xs text-slate-400 mt-1">Xalqaro darajadagi grant darslari va talabalarni chet eldagi grand stipendiyalarga bevosita professional yo'naltirish.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. IELTS score-to-CEFR interactive tool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2" id="calculator-section">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-slate-700 text-xs font-bold uppercase tracking-wider">
                <Calculator className="h-4 w-4 text-amber-500" />
                <span>Akademik Vosita</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                IELTS-to-CEFR kalkulyatori
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Bitiruvchi o'quvchilarimiz va repetitorlar xorijda hamda O'zbekistonda Milliy sertifikatingizni xalqaro ekvivalent bilan solishtirishga qiynaladilar. Quyidagi kalkulyatorda maqsadli IELTS balingizni kiriting va u qaysi xalqaro tillar standartiga (CEFR) to'g'ri kelishini bilib oling!
              </p>
              
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs font-bold text-slate-500 block">Kurs To'lovi</span>
                  <span className="text-slate-900 font-extrabold text-sm">380 000 so'mdan boshlab</span>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs font-bold text-slate-500 block">Dars turlari</span>
                  <span className="text-slate-900 font-extrabold text-sm">Onlayn va Oflayn</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-50 border border-slate-100 p-6 sm:p-8 rounded-2xl">
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-3">
                    Target imtihon ko'rsatkichini tanlang (IELTS):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleIeltsChange(val)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer
                          ${ieltsValue === val 
                            ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-500/20' 
                            : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                          }
                        `}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  <div className="p-4 bg-white rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">CEFR Tillar Tizimi</span>
                    <h4 className="text-lg font-black text-slate-900">{cefrValue}</h4>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 font-sans">Siz erishadigan imtiyoz</span>
                    <p className="text-xs font-medium text-slate-600 line-clamp-2">{descValue}</p>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-start gap-3">
                  <Zap className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-900 font-medium leading-relaxed">
                    <strong>Tavsiya:</strong> Erishmoqchi bo'lgan balingizga qarab kurslarimizni tanlang. IELTS 7.0+ uchun <strong>"IELTS Standard"</strong> yoki <strong>"IELTS Rockets Online"</strong> darslarimiz aynan siz uchun sozlangan.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Teacher Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="teachers-section">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
            BIZNING USTOZLAR
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tajribali va yuqori darajali CEFR & IELTS o'qituvchilari
          </h2>
          <p className="text-slate-500 text-sm">
            {config.centerName} darslari faqat milliy CEFR hamda xalqaro IELTS sertifikatlari tasdiqlangan katta tajribali ustozlar tomonidan masofaviy va an'anaviy rejimda o'tiladi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher) => (
            <div 
              key={teacher.id} 
              id={`teacher-card-${teacher.id}`}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Teacher Avatar Box */}
                <div className="relative h-48 w-full flex items-center justify-center overflow-hidden">
                  <div className={`absolute inset-0 ${teacher.image} opacity-90 transition-transform duration-300 group-hover:scale-105`}></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-white text-5xl font-black drop-shadow-md">{teacher.name.charAt(0)}</span>
                    <span className="mt-2 text-white bg-slate-950/70 border border-white/20 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      {teacher.experience} tajriba
                    </span>
                  </div>
                  {/* IELTS score tag */}
                  <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 px-3 py-1 rounded-xl text-xs font-black shadow-md flex items-center gap-1">
                    <span className="text-[9px] uppercase font-bold tracking-tight">IELTS</span>
                    <span>{teacher.ieltsScore}</span>
                  </div>
                </div>

                {/* Teacher Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-500 transition-all">{teacher.name}</h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">{teacher.role}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {teacher.bio}
                  </p>
                </div>
              </div>

              {/* Achievements Box */}
              <div className="px-6 pb-6 pt-2 bg-slate-50/50 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alohida yutuqlari:</span>
                <ul className="space-y-1">
                  {teacher.achievements.map((ach, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5 leading-normal">
                      <span className="text-emerald-500 mt-0.5 font-bold shrink-0">✓</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Contact Banner & Course teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="cta-teaser">
        <div className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_60%)]"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            <div className="space-y-5 lg:max-w-xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Eng ommabop darsga qo'shilmoqchimisiz?
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Bitiruvchi va amaldagi o'quvchilarimiz orasida eng ko'p tanlanadigan 5 ta standart kursimiz hozirda yangi qabul ochgan. Oflayn darslarimiz zamonaviy bepul konditsioner va proyektorlar bilan jihozlangan Novza filialimizda bo'lib o'tadi.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-xs font-bold text-slate-300">
                <span className="px-2.5 py-1 bg-slate-800 rounded-lg">#IELTS 7.5</span>
                <span className="px-2.5 py-1 bg-slate-800 rounded-lg">#General English</span>
                <span className="px-2.5 py-1 bg-slate-800 rounded-lg">#Speaking Club</span>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-6 sm:p-8 rounded-2xl w-full max-w-sm space-y-5">
              <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase block text-center">BIZNING TAVSIYA ETILGAN DARS</span>
              {courses[0] && (
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-white leading-tight">{courses[0].title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{courses[0].description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-850 text-xs">
                    <div>
                      <span className="text-slate-500 block">Kurs To'lovi:</span>
                      <span className="text-amber-400 font-bold">{courses[0].price.toLocaleString('uz-UZ')} UZS</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Davomiyligi:</span>
                      <span className="text-white font-bold">{courses[0].duration}</span>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  if (courses[0]) {
                    setSelectedCourseId(courses[0].id);
                  }
                  setActiveTab('apply');
                }}
                className="w-full text-center py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-xl text-xs sm:text-sm transform hover:scale-[1.02] transition-all cursor-pointer"
              >
                Ushbu kursga yozilish
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
