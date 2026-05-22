import React from 'react';
import { Search, Trophy, School, MapPin, Award, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { Result } from '../types';

interface ResultsTabProps {
  results: Result[];
}

export default function ResultsTab({ results }: ResultsTabProps) {
  const [search, setSearch] = React.useState('');
  const [selectedFilter, setSelectedFilter] = React.useState<'all' | 'ielts8' | 'ielts7' | 'cefr' | 'grant'>('all');

  // Stats block counters
  const totalStudentsTrained = 1485;
  const ieltsHighScoresCount = 436; // IELTS 7.0+
  const perfectSevens = 124; // IELTS 7.5
  const perfectEights = 54; // IELTS 8.0+

  // Filter criteria logic
  const filteredResults = results.filter((res) => {
    // Search filter
    const matchesSearch = 
      res.studentName.toLowerCase().includes(search.toLowerCase()) ||
      res.originRegion.toLowerCase().includes(search.toLowerCase()) ||
      res.score.toLowerCase().includes(search.toLowerCase()) ||
      res.details.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    // Tab category filter
    if (selectedFilter === 'all') return true;
    
    if (selectedFilter === 'ielts8') {
      return res.type === 'IELTS' && (res.score.includes('8.0') || res.score.includes('8.5') || res.score.includes('9.0'));
    }
    
    if (selectedFilter === 'ielts7') {
      return res.type === 'IELTS' && (res.score.includes('7.0') || res.score.includes('7.5'));
    }
    
    if (selectedFilter === 'cefr') {
      return res.type === 'CEFR';
    }

    if (selectedFilter === 'grant') {
      // University matching/grants
      return res.details.toLowerCase().includes('grant') || res.details.toLowerCase().includes('scholar') || res.type === 'University Match';
    }

    return true;
  });

  const handleResetFilters = () => {
    setSearch('');
    setSelectedFilter('all');
  };

  return (
    <div className="space-y-12 pb-16 animate-fadeIn" id="results-tab-container">
      
      {/* 1. Header & Quick Ticker stats */}
      <div className="text-center max-w-2xl mx-auto space-y-4" id="results-header">
        <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
          BITIRUVCHILARIMIZ SHAVKATI
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Haqiqiy IELTS & CEFR muvaffaqiyatlari
        </h1>
        <p className="text-slate-500 text-sm">
          Biz barcha o'quvchilarimiz rasm va rasmiy natijalari bilan faxrlanamiz. Quyida filtr va qidiruv tizimi orali Yuksalish Academyning zafar quchgan talabalari natijalarini ko'rishingiz mumkin!
        </p>
      </div>

      {/* 2. Micro Tickers inside page */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto" id="results-counters-block">
        <div className="bg-slate-900 text-white rounded-xl p-4 text-center border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">JAMI BITIRUVCHILAR</span>
          <h3 className="text-xl sm:text-2xl font-black text-amber-400 mt-1">{totalStudentsTrained}+</h3>
          <span className="text-[10px] text-slate-400 mt-0.5 block">2018-yildan beri</span>
        </div>
        <div className="bg-slate-900 text-white rounded-xl p-4 text-center border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">IELTS 7.0+ ERISHDILAR</span>
          <h3 className="text-xl sm:text-2xl font-black text-amber-400 mt-1">{ieltsHighScoresCount} ta</h3>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Talabalarimizning 31%i</span>
        </div>
        <div className="bg-slate-900 text-white rounded-xl p-4 text-center border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">IELTS 7.5 BALL</span>
          <h3 className="text-xl sm:text-2xl font-black text-amber-400 mt-1">{perfectSevens} ta</h3>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Katta ko'rsatkich</span>
        </div>
        <div className="bg-slate-900 text-white rounded-xl p-4 text-center border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">IELTS 8.0+ BALL</span>
          <h3 className="text-xl sm:text-2xl font-black text-amber-400 mt-1">{perfectEights} ta</h3>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Eliit natijadorlarimiz</span>
        </div>
      </div>

      {/* 3. Search & Interactive Tabs */}
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4 max-w-5xl mx-auto" id="results-search-filters">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Internal search input */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
            <input
              type="text"
              placeholder="Ism yoki viloyat bo'yicha..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl text-xs sm:text-sm focus:outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Quick tab controls */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0" id="filter-tabs">
            {[
              { id: 'all', label: 'Barcha natijalar' },
              { id: 'ielts8', label: 'IELTS 8.0 - 8.5' },
              { id: 'ielts7', label: 'IELTS 7.0 - 7.5' },
              { id: 'cefr', label: 'CEFR C1' },
              { id: 'grant', label: 'Grant Sohiblari' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer
                  ${selectedFilter === tab.id 
                    ? 'bg-amber-500 text-slate-950 shadow-xs' 
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-100'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Filters stats log */}
        {(search || selectedFilter !== 'all') && (
          <div className="flex items-center justify-between text-xs text-slate-550 pt-2 border-t border-slate-100">
            <span>
              Filtrga to'g'ri kelgan natijalar soni: <strong className="text-slate-900 font-bold">{filteredResults.length} nafar o'quvchi</strong>
            </span>
            <button
              onClick={handleResetFilters}
              className="text-amber-600 font-bold hover:text-amber-700 transition-all flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" /> Tozalash
            </button>
          </div>
        )}
      </div>

      {/* 4. Results Card GRID */}
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" id="results-cards-grid">
          {filteredResults.map((result) => {
            const isPerfect = result.score.includes('8.0') || result.score.includes('8.5') || result.score.includes('9.0');
            return (
              <div 
                key={result.id}
                id={`result-id-${result.id}`}
                className={`bg-white border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between 
                  ${isPerfect ? 'border-amber-300 ring-1 ring-amber-400/10' : 'border-slate-100'}
                `}
              >
                
                {/* Header Information */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-10 w-10 rounded-full bg-gradient-to-tr ${result.avatarStyle} flex items-center justify-center font-bold text-white text-base`}>
                        {result.studentName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">{result.studentName}</h4>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-amber-500 shrink-0" />
                          {result.originRegion} filiali
                        </span>
                      </div>
                    </div>

                    {isPerfect && (
                      <span className="p-1 bg-amber-500 rounded-lg text-slate-950 font-bold animate-bounce" title="Mukammalllik ko'rsatkichi">
                        <Trophy className="h-4 w-4" />
                      </span>
                    )}
                  </div>

                  {/* Rating box */}
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 trailing-wide block">SERTIFIKAT BALLI</span>
                      <strong className={`text-xl font-extrabold tracking-tight ${isPerfect ? 'text-amber-500' : 'text-slate-800'}`}>
                        {result.score}
                      </strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase font-bold text-slate-400 trailing-wide block">IMTIHON_TURI</span>
                      <span className="text-xs font-bold text-slate-700 bg-slate-200/60 px-2 py-0.5 rounded-md">
                        {result.type}
                      </span>
                    </div>
                  </div>

                  {/* Detailed sub-scores or logs */}
                  <div className="text-xs bg-slate-950 text-slate-350 p-3 rounded-lg font-mono flex flex-col gap-1 border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-bold block pb-1 border-b border-slate-800">Batafsil sub-ko'rsatkichlari:</span>
                    <p className="mt-1 font-medium">{result.subjectDetails}</p>
                  </div>

                  {/* Student result details / comment */}
                  <p className="text-xs sm:text-sm text-slate-505 leading-relaxed text-slate-600">
                    {result.details}
                  </p>

                </div>

                {/* Footer status bar */}
                <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    Yuksalish tasdiqlagan natija
                  </span>
                  <span>{result.year}-yil</span>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-slate-100 rounded-2xl max-w-md mx-auto space-y-4" id="no-results-alert">
          <AlertCircle className="h-10 w-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Natija topilmadi</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Kiritilgan ism yoki filtr parametrlariga to'g'ri keluvchi talaba haqida ma'lumot topilmadi. Qidiruv so'zini qisqartirib kiriting.
          </p>
          <button 
            onClick={handleResetFilters}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            Barchasini ko'rsatish
          </button>
        </div>
      )}

      {/* 5. Elite Honors details */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 max-w-5xl mx-auto relative overflow-hidden" id="results-honors-quote">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.05),transparent_50%)]"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="p-4 bg-gradient-to-tr from-amber-500 to-yellow-600 rounded-2xl text-slate-950 shadow-lg scale-110">
            <Trophy className="h-8 w-8 stroke-[2.5]" />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">Olimpiada & Xalqaro Grant Mutaxassislari</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
              Yuksalish Academy shunchaki ingliz tilida so'zlashuvchi guruh emas. Bizda dars beruvchi ustozlar har yili ko'plab o'zbekistonlik talabalarni AQSH, Buyuk Britaniya, Germaniya va Singapur bepul dars grantlariga, shuningdek Toshkent Westminster (WIUT), Jahon Tillari va TDIU davlat universitetlariga bepul grant asosida kirishiga bevosita ko'maklashadilar. Biz natijaga kafolat beramiz!
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
