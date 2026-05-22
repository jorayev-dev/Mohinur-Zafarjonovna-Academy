import React from 'react';
import { Calendar, CheckSquare, Sparkles, PhoneCall, CheckCircle2, Award, Users, MapPin, ChevronRight } from 'lucide-react';
import { Course, EnrollmentApplication } from '../types';

interface ApplyTabProps {
  courses: Course[];
  selectedCourseId: string;
  onAddApplication: (app: EnrollmentApplication) => void;
  phone: string;
  address: string;
}

export default function ApplyTab({ courses, selectedCourseId, onAddApplication, phone, address }: ApplyTabProps) {
  // Input states
  const [studentName, setStudentName] = React.useState('');
  const [phoneInput, setPhoneInput] = React.useState('');
  const [courseChoice, setCourseChoice] = React.useState(selectedCourseId || (courses[0]?.id || ''));
  const [formatChoice, setFormatChoice] = React.useState<'online' | 'offline'>('offline');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Sync with prop when selected course transitions
  React.useEffect(() => {
    if (selectedCourseId) {
      setCourseChoice(selectedCourseId);
      const selectedCourse = courses.find(c => c.id === selectedCourseId);
      if (selectedCourse) {
        setFormatChoice(selectedCourse.format);
      }
    }
  }, [selectedCourseId, courses]);

  // Handle local state form submit
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert("Iltimos, ism va familiyangizni kiriting.");
      return;
    }
    if (!phoneInput.trim() || phoneInput.length < 7) {
      alert("Iltimos, telefon raqamingizni to'g'ri kiriting.");
      return;
    }

    const matchedCourse = courses.find((c) => c.id === courseChoice);
    const courseTitle = matchedCourse ? matchedCourse.title : "Ingliz tili kursi";

    const applicationObj: EnrollmentApplication = {
      id: `app-${Date.now()}`,
      studentName,
      phone: phoneInput.startsWith('+998') ? phoneInput : `+998 ${phoneInput}`,
      courseId: courseChoice,
      courseTitle,
      format: formatChoice,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    onAddApplication(applicationObj);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setStudentName('');
    setPhoneInput('');
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 animate-fadeIn" id="apply-tab-container">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Informational banner and credibility marks */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white rounded-3xl p-8 flex flex-col justify-between" id="apply-credibility-card">
          <div className="space-y-6">
            <span className="px-2.5 py-0.5 bg-amber-500 text-slate-950 text-[10px] uppercase font-black tracking-widest rounded-lg">
              KAFOLATLANGAN REJA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight">Muvaffaqiyatli talabalar safini to'ldiring!</h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Bizga ariza topshirish orqali siz haftalik xalqaro darajali darslarimiz va support guruhlarimiz bo'sh o'rinlariga nomzod bo'lasiz. Administratorlarimiz 10 daqiqada sizga aloqa raqamingiz orqali qo'ng'iroq qilib, dars jadvallarini kelishadilar.
            </p>
            
            <div className="space-y-4 pt-4 border-t border-slate-850">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-250 leading-tight">Bepul birinchi sinov darsi</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">O'qitish metodikasi va ustozlarimiz salohiyatiga baho bering.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-250 leading-tight">IELTS darajaviy kafolat</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Darslarda barqaror qatnashib, IELTS imtihonini fathi qilamiz.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-850 space-y-3 font-medium text-xs text-slate-400" id="apply-contact-mini">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
              <span className="line-clamp-1">{address}</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-white">
              <PhoneCall className="h-4 w-4 text-emerald-500" />
              <span>{phone}</span>
            </div>
          </div>

        </div>

        {/* Right Active Registration Form panel */}
        <div className="lg:col-span-7 bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-sm flex flex-col justify-center" id="apply-form-card">
          
          {!isSubmitted ? (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegister} className="space-y-5">
              
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Bepul dars guruhlariga ro'yxatdan o'tish</h3>
                <p className="text-xs text-slate-400 font-normal">Iltimos, ma'lumotlarni o'zbek tilida aniq shaklda to'ldiring.</p>
              </div>

              {/* Full Student Name */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">O'g'il yoki Qiz bola ismi va familiyasi:</label>
                <input 
                  type="text" 
                  placeholder="Masalan: Sardor Alimov"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-medium text-slate-900"
                />
              </div>

              {/* Uzbekistan Phone with prefix */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block font-sans">Bog'lanish Telefon raqami:</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs sm:text-sm font-bold border-r border-slate-200 pr-2.5">
                    +998
                  </span>
                  <input 
                    type="tel" 
                    placeholder="90 123 45 67"
                    required
                    value={phoneInput}
                    onChange={(e) => {
                      // Filter digit clicks
                      const val = e.target.value.replace(/[^0-9\s-]/g, '');
                      setPhoneInput(val);
                    }}
                    className="w-full pl-18 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-mono font-bold text-slate-900"
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-normal mt-0.5">Format: 9-xonali telefon raqamingiz (E.g. 901234567)</p>
              </div>

              {/* Course preference chooser card */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Qaysi dars guruhda o'qimoqchisiz?</label>
                <select
                  value={courseChoice}
                  onChange={(e) => setCourseChoice(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl text-xs sm:text-sm font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title} ({course.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Format selection toggles */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Dars shaklini belgilang:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormatChoice('offline')}
                    className={`p-3 rounded-xl border font-bold text-xs sm:text-sm transition-all flex flex-col items-center gap-1 cursor-pointer
                      ${formatChoice === 'offline' 
                        ? 'border-amber-500 bg-amber-500/10 text-amber-900 font-black' 
                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }
                    `}
                  >
                    <span>🏢 Oflayn dars</span>
                    <span className="text-[10px] font-medium text-slate-400 leading-none">Novza filialida</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormatChoice('online')}
                    className={`p-3 rounded-xl border font-bold text-xs sm:text-sm transition-all flex flex-col items-center gap-1 cursor-pointer
                      ${formatChoice === 'online' 
                        ? 'border-amber-500 bg-amber-500/10 text-amber-900 font-black' 
                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }
                    `}
                  >
                    <span>🟢 Onlayn dars</span>
                    <span className="text-[10px] font-medium text-slate-400 leading-none">Zoom platformasida</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-extrabold rounded-xl sm:text-base shadow-md hover:shadow-amber-500/10 transform hover:-translate-y-0.5 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                Arizani jo'natish <ChevronRight className="h-5 w-5 stroke-[2.5]" />
              </button>

            </form>
          ) : (
            /* REGISTRATION SUCCESS BANNER SCREEN */
            <div className="space-y-6 text-center animate-fadeIn py-6">
              <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="h-9 w-9 stroke-[2.5] animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">Arizangiz muvaffaqiyatli topshirildi!</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                  Tabriklaymiz, <strong>{studentName}</strong>, sizni bepul sinov sinfiga ro'yxatga olish so'rovingiz saqlandi. Administratorlarimiz yaqin fursatda sizga bog'lanadilar.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-2 text-xs text-slate-600 max-w-md mx-auto">
                <p><strong>Ismingiz:</strong> {studentName}</p>
                <p><strong>Sizning telefoningiz:</strong> +998 {phoneInput}</p>
                <p><strong>Siz tanlagan dars guruhi:</strong> {courses.find(c => c.id === courseChoice)?.title}</p>
                <p><strong>Dars formati:</strong> {formatChoice === 'offline' ? "🏢 Oflayn (Sinfda)" : "🟢 Masofaviy Onlayn"}</p>
              </div>

              <button
                type="button"
                onClick={handleResetForm}
                className="px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Yangi ariza topshirish
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
