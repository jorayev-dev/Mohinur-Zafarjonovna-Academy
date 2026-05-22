import React from 'react';
import { Search, Filter, BookOpen, Clock, Calendar, CheckSquare, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { Course } from '../types';

interface CoursesTabProps {
  courses: Course[];
  setActiveTab: (tab: string) => void;
  setSelectedCourseId: (id: string) => void;
}

export default function CoursesTab({ courses, setActiveTab, setSelectedCourseId }: CoursesTabProps) {
  // Filters state
  const [search, setSearch] = React.useState('');
  const [selectedFormat, setSelectedFormat] = React.useState<'all' | 'online' | 'offline'>('all');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const categoriesList = ['all', 'CEFR', 'IELTS', 'General English', 'Kids', 'Academic'];

  // Filter logic
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                          course.description.toLowerCase().includes(search.toLowerCase()) ||
                          course.teacherName.toLowerCase().includes(search.toLowerCase());
    
    const matchesFormat = selectedFormat === 'all' || course.format === selectedFormat;
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;

    return matchesSearch && matchesFormat && matchesCategory;
  });

  const handleEnrollClick = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveTab('apply');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedFormat('all');
    setSelectedCategory('all');
  };

  return (
    <div className="space-y-12 pb-16 animate-fadeIn" id="courses-tab-container">
      
      {/* 1. Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4" id="courses-header">
        <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
          DARS DASTURLARI
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ingliz tili darslarimiz va guruhlarimiz
        </h1>
        <p className="text-slate-500 text-sm">
          Sizga qulay formatni belgilang (Online darslar masofaviy, Offline darslar zamonaviy Novza filialimizda bo'lib o'tadi). O'zingiz qiziqqan Ingliz tili kursiga yoziling!
        </p>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4" id="filter-panel">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
            <input 
              type="text" 
              placeholder="Kurs nomi, tavsif yoki ustoz ismini kiriting..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500 rounded-xl text-sm focus:outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Format Radio Selection */}
          <div className="md:col-span-3 flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 gap-1">
            <button
              onClick={() => setSelectedFormat('all')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer
                ${selectedFormat === 'all' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-950'
                }
              `}
            >
              Barchasi
            </button>
            <button
              onClick={() => setSelectedFormat('offline')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer
                ${selectedFormat === 'offline' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-950'
                }
              `}
            >
              Offline
            </button>
            <button
              onClick={() => setSelectedFormat('online')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer
                ${selectedFormat === 'online' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-950'
                }
              `}
            >
              Online
            </button>
          </div>

          {/* Category Dropdown Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">Barcha darajalar</option>
              {categoriesList.filter(c => c !== 'all').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Filter Indicator & Reset */}
        {(search || selectedFormat !== 'all' || selectedCategory !== 'all') && (
          <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-500">
            <div className="flex items-center gap-1.5 font-medium">
              <Filter className="h-3.5 w-3.5 text-amber-500" />
              <span>
                Filtrlangan natijalar: <strong className="text-slate-900 font-bold">{filteredCourses.length} ta</strong> kurs topildi
              </span>
            </div>
            <button 
              onClick={handleResetFilters}
              className="text-amber-600 font-bold hover:text-amber-700 transition-all flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </div>

      {/* 3. Course Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="courses-grid">
          {filteredCourses.map((course) => {
            const isOnline = course.format === 'online';
            return (
              <div 
                key={course.id} 
                id={`course-id-${course.id}`}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  
                  {/* Card Header Media */}
                  <div className="p-6 pb-2 border-b border-slate-50 relative">
                    <div className="flex items-center justify-between mb-4">
                      {/* Course format badge */}
                      <span className={`px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg border
                        ${isOnline 
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                          : 'bg-purple-500/10 text-purple-600 border-purple-500/20'
                        }
                      `}>
                        {course.format === 'online' ? '🟢 Online dars' : '🏢 Oflayn dars'}
                      </span>
                      {/* Level tag */}
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-500 leading-tight">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-slate-500">
                      <span className="text-slate-400">Ustoz:</span>
                      <strong className="text-slate-700 font-bold">{course.teacherName}</strong>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                      {course.description}
                    </p>

                    {/* Metadata attributes */}
                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-50 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-amber-500" />
                        <span>{course.duration} davom etadi</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-amber-500" />
                        <span>Haftada {course.lessonsPerWeek} kun dars</span>
                      </div>
                    </div>

                    {/* Skills Checklist heading */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">KURSDAN NIMALARNI O'RGANASIZ?</span>
                      <ul className="space-y-1.5">
                        {course.skillsLearned.map((skill, index) => (
                          <li key={index} className="text-xs text-slate-600 flex items-start gap-1.5 leading-normal">
                            <CheckSquare className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                </div>

                {/* Card Footer / Pricing & CTA */}
                <div className="p-6 pt-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">KURS NARXI</span>
                    <span className="text-base sm:text-lg font-black text-slate-900">
                      {course.price.toLocaleString('uz-UZ')} UZS 
                      <span className="text-[10px] text-slate-400 font-medium"> / oy</span>
                    </span>
                  </div>
                  <button
                    onClick={() => handleEnrollClick(course.id)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-650 text-slate-950 font-bold rounded-xl text-xs shadow-xs transition-all cursor-pointer"
                  >
                    Yozilish
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-slate-100 rounded-2xl max-w-md mx-auto space-y-4" id="no-results-box">
          <AlertCircle className="h-10 w-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Bunday dars o'quv dasturi topilmadi</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Qidiruv so'zini boshqacha kiritishga, yoki yuqoridagi format va daraja filtrlarni o'zgartirishga harakat qilib ko'ring.
          </p>
          <button 
            onClick={handleResetFilters}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            Filtrlarni tozalash
          </button>
        </div>
      )}

      {/* 4. Support Warning FAQ Alert box */}
      <section className="bg-amber-500/10 border border-amber-500/25 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" id="placement-teaser">
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
            Qaysi darajadagi guruh mos kelishini bilmayapsizmi?
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
            Bizning sun'iy intellektli maslahatchimiz sizdan 5 ta lingvistik va qoidaviy savollarni berish orqali darajangiz ifodasini aniqlab, darhol to'g'ri dars rejasini tavsiya qilib beradi!
          </p>
        </div>
        <button
          onClick={() => {
            setActiveTab('ai-chat');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-white font-bold rounded-xl text-xs transition-all shrink-0 cursor-pointer"
        >
          Daraja testini boshlash
        </button>
      </section>

    </div>
  );
}
