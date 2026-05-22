import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  User, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  BarChart2, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  ArrowRight, 
  LogOut, 
  Plus, 
  Heart, 
  UserCheck, 
  Sparkles, 
  AlertCircle
} from 'lucide-react';
import { StudentProgress, Course } from '../types';

interface StudentDashboardTabProps {
  students: StudentProgress[];
  courses: Course[];
  onUpdateStudents: (updatedStudents: StudentProgress[]) => void;
}

export default function StudentDashboardTab({ students, courses, onUpdateStudents }: StudentDashboardTabProps) {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [loggedInStudent, setLoggedInStudent] = React.useState<StudentProgress | null>(null);
  const [errorMsg, setErrorMsg] = React.useState('');
  
  // New Mock registration states
  const [showMockReg, setShowMockReg] = React.useState(false);
  const [mockRegType, setMockRegType] = React.useState('cefr-mock');
  const [mockRegDate, setMockRegDate] = React.useState('2026-06-05');
  const [mockRegTime, setMockRegTime] = React.useState('09:30');
  const [successRegMsg, setSuccessRegMsg] = React.useState('');

  // Auto-fill phone handler from demo list
  const handleQuickLogin = (phone: string) => {
    setPhoneNumber(phone);
    const found = students.find(s => s.phone.replace(/\s+/g, '') === phone.replace(/\s+/g, ''));
    if (found) {
      setLoggedInStudent(found);
      setErrorMsg('');
    } else {
      setErrorMsg("Xatolik: Talaba topilmadi!");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setErrorMsg('Iltimos, telefon raqamingizni kiriting!');
      return;
    }

    // Match digits and characters
    const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
    const found = students.find(s => {
      const cleanSPhone = s.phone.replace(/[^0-9+]/g, '');
      return cleanSPhone.includes(cleanPhone) || cleanPhone.includes(cleanSPhone);
    });

    if (found) {
      setLoggedInStudent(found);
      setErrorMsg('');
    } else {
      setErrorMsg("Kiritilgan telefon raqami bilan ro'yxatdan o'tgan faol talaba topilmadi. Quick Demo raqamlardan foydalanib ko'ring.");
    }
  };

  const handleLogout = () => {
    setLoggedInStudent(null);
    setPhoneNumber('');
    setShowMockReg(false);
    setSuccessRegMsg('');
  };

  // Mock test dynamic register
  const handleRegisterMock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedInStudent) return;

    const mockTitle = mockRegType === 'cefr-mock' 
      ? "CEFR DTM Haqiqiy Format Mock Test" 
      : "IELTS Full Exam Simulation Mock";

    // Add new mock to the list
    const newMock = {
      id: `mock-${Date.now()}`,
      title: mockTitle,
      date: mockRegDate,
      time: mockRegTime,
      status: 'registered' as const
    };

    const updatedUpcoming = [...loggedInStudent.upcomingMocks, newMock];
    const updatedStudent: StudentProgress = {
      ...loggedInStudent,
      upcomingMocks: updatedUpcoming
    };

    setLoggedInStudent(updatedStudent);

    // Update parent database
    const updatedStudentsList = students.map(s => s.id === loggedInStudent.id ? updatedStudent : s);
    onUpdateStudents(updatedStudentsList);

    setSuccessRegMsg(`Muvaffaqiyatli ro'yxatdan o'tdingiz: ${mockTitle} (${mockRegDate} kuni soat ${mockRegTime})`);
    setTimeout(() => {
      setSuccessRegMsg('');
      setShowMockReg(false);
    }, 4000);
  };

  return (
    <div className="space-y-8" id="student-portal-wrapper">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 rounded-3xl shadow-xl text-white" id="student-hero">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl transform translate-x-12 -translate-y-12"></div>
        <div className="relative max-w-3xl space-y-4">
          <span className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-full">
            🎓 Talabalar va O'quvchilar Kabineti
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Natijalar va O'zlashtirishni <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Real Vaqtda</span> Kuzating!
          </h1>
          <p className="text-slate-300 font-medium text-xs sm:text-sm max-w-2xl">
            Sizning CEFR hamda IELTS ballaringiz, o'quv darslarining o'rinlari, qatnashuv foizi va kelgusi mock imtihonlariga yozilish endi yagona raqamli platformada birlashtirildi.
          </p>
        </div>
      </div>

      {!loggedInStudent ? (
        /* LOGIN MODE SCREEN */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="login-form-view">
          
          <div className="lg:col-span-6 bg-white border border-slate-100 p-6 sm:p-10 rounded-3xl shadow-sm space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <User className="h-6 w-6 text-amber-500" />
                Shaxsiy Kabinetga Kirish
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-normal mt-1">
                Akademiya talabalari o'zlarining telefon raqamlari orqali kirishlari mumkin.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Telefon Raqamingiz:</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-bold">
                    📞
                  </span>
                  <input
                    type="tel"
                    placeholder="Masalan: +998 99 888 77 66"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl focus:outline-none text-slate-800 text-sm font-semibold tracking-wide transition-all"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 text-amber-400 hover:text-white font-extrabold rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Kabinetga Kirish</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-[10px] uppercase tracking-wider font-extrabold">Yoki Tezkor Demo Kirish</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            {/* Quick Demo logins to try */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="quick-demo-logins">
              <button
                onClick={() => handleQuickLogin('+998 99 888 77 66')}
                type="button"
                className="p-3.5 bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 rounded-2xl text-left cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-xs">Asilbek Nabiyev</span>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">CEFR B2</span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">+998 99 888 77 66</p>
                <div className="text-[10px] text-amber-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Kirish <ArrowRight className="h-3 w-3" />
                </div>
              </button>

              <button
                onClick={() => handleQuickLogin('+998 93 456 78 90')}
                type="button"
                className="p-3.5 bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 rounded-2xl text-left cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-xs">Malika Rustamova</span>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-500/10 px-1.5 py-0.5 rounded">IELTS Standard</span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">+998 93 456 78 90</p>
                <div className="text-[10px] text-amber-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Kirish <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            </div>
          </div>

          {/* Info Card Panel */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-gradient-to-tr from-indigo-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-sm space-y-4">
              <h3 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-400" />
                Talabalarimiz uchun qulayliklar:
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 font-medium">
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>O'zlashtirish foizlari:</strong> Har bir dars qatnashuvi hamda uy vazifasi reytinglari avtomatlashtirilgan diagrammada ko'rinadi.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Mock Testlarga ro'yxat:</strong> Yangi mock test sanalarini kuzatish va navbatdagisiga onlayn ko'rinishda joy band qilish.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Pastki ballar tahlili:</strong> Avvalgi topshirilgan natijalar bo'limlar bo'yicha tahlili (Listening, Reading, Writing, Speaking).</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Ustoz xulosalari:</strong> Kurs o'tuvchi muallimlar jamoasi tomonidan yozilgan shaxsiy tafsif va tavsiyalar.</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 flex gap-4 items-start text-xs sm:text-sm text-slate-700">
              <span className="p-2.5 bg-amber-500/10 rounded-2xl text-xl shrink-0">💡</span>
              <div className="space-y-1">
                <strong className="text-slate-900 font-extrabold">Eslatma o'quvchilar uchun!</strong>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Agar raqamingiz tizimga kiritilmagan bo'lsa yoki muammo yuzaga kelsa, ma'muriyat administratorlarimiz darchasiga ulanib telefon raqamingizni aktiv qildiring.
                </p>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* LOGGED IN STUDENT DASHBOARD VIEW */
        <div className="space-y-8 animate-fadeIn" id="dashboard-tab-content">
          
          {/* Welcome User Banner */}
          <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-md">
                {loggedInStudent.studentName.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900">{loggedInStudent.studentName}</h2>
                  <span className="px-2.5 py-1 bg-emerald-550 border border-emerald-500/10 text-emerald-600 bg-emerald-500/5 text-[10px] font-black rounded-lg uppercase">
                    Faol Talaba
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  Kurs: <strong className="text-slate-800">{loggedInStudent.courseTitle}</strong> • Ustoz: <strong className="text-slate-800">{loggedInStudent.teacherName}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              type="button"
              className="py-2.5 px-5 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 hover:text-rose-600 text-slate-600 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto"
            >
              <LogOut className="h-4 w-4" />
              <span>Chiqish</span>
            </button>
          </div>

          {/* KPI Dashboard statistics metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="dashboard-metrics-grid">
            
            {/* Metric 1: Course progression progress bar */}
            <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-2.5 bg-amber-500/10 text-amber-600 rounded-2xl text-xs font-bold font-mono">
                  <BookOpen className="h-5 w-5" />
                </span>
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">O'quv Progressi</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <strong className="text-xl sm:text-2xl font-black text-slate-900">
                    {Math.round((loggedInStudent.lessonsCompleted / loggedInStudent.totalLessons) * 100)}%
                  </strong>
                  <span className="text-xs text-slate-500 font-medium">
                    {loggedInStudent.lessonsCompleted}/{loggedInStudent.totalLessons} darslik
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${(loggedInStudent.lessonsCompleted / loggedInStudent.totalLessons) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Metric 2: Attendance rate */}
            <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-2xl text-xs font-bold font-mono">
                  <CheckCircle className="h-5 w-5" />
                </span>
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Dars Qatnashuvi</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <strong className="text-xl sm:text-2xl font-black text-slate-900">
                    {loggedInStudent.attendance}%
                  </strong>
                  <span className="text-xs text-slate-500 font-medium">
                    {loggedInStudent.attendance >= 90 ? 'A’lo qatnashuv' : 'Yaxshi qatnashuv'}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${loggedInStudent.attendance}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Metric 3: Homework rating */}
            <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-2.5 bg-blue-500/10 text-blue-600 rounded-2xl text-xs font-bold font-mono">
                  <TrendingUp className="h-5 w-5" />
                </span>
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Uy Vazifalari</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <strong className="text-xl sm:text-2xl font-black text-slate-900">
                    {loggedInStudent.homeworks}%
                  </strong>
                  <span className="text-xs text-slate-500 font-medium">
                    O'rtacha ball bahosi
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${loggedInStudent.homeworks}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Metric 4: Vocabulary Score */}
            <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-2.5 bg-purple-500/10 text-purple-600 rounded-2xl text-xs font-bold font-mono">
                  <FileText className="h-5 w-5" />
                </span>
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Vocabulary master</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <strong className="text-xl sm:text-2xl font-black text-slate-900">
                    {loggedInStudent.vocabulary}%
                  </strong>
                  <span className="text-xs text-slate-500 font-medium">
                    Haftalik lug'at testlari
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-500 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${loggedInStudent.vocabulary}%` }}
                  ></div>
                </div>
              </div>
            </div>

          </div>

          {/* TWO COLUMN CONTENT: TIMELINE/FEEDBACK AND MOCK TESTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Part A: Class Progression Timeline & Feedback */}
            <div className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-6">
              
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-amber-500" />
                  Kurs Mavzulari va O'qituvchi Munosabati
                </h3>
                <p className="text-xs text-slate-400 font-normal mt-0.5">Sinflardagi oxirgi dars muloqotlari va yondashuvlar.</p>
              </div>

              <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs sm:text-sm">
                <div className="space-y-1">
                  <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wide block">Joriy o'rganilayotgan mavzu:</span>
                  <div className="p-3 bg-white border border-slate-100 rounded-xl font-bold text-slate-800 flex gap-2 items-center">
                    <span className="text-base">📌</span>
                    <span>{loggedInStudent.currentTopic}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wide block flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> Ustozdan Shaxsiy Maslahat:
                  </span>
                  <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl text-slate-700 italic font-medium leading-relaxed">
                    "{loggedInStudent.teacherNotes}"
                  </div>
                </div>
              </div>

              {/* Course milestones tracker */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-slate-400">Akademiya Muhim Bosqichlari:</h4>
                <div className="space-y-2.5">
                  <div className="flex gap-3 text-xs">
                    <span className="text-emerald-500 font-extrabold mt-0.5 sm:mt-1">✓</span>
                    <div>
                      <strong className="text-slate-800">1-bosqich: Dastlabki Diagnostic Assessment</strong>
                      <p className="text-slate-500 mt-0.5 font-normal">Tugallangan. Boshlang'ich natija: {loggedInStudent.mockHistory[0]?.overall || 'B1/'}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="text-emerald-500 font-extrabold mt-0.5 sm:mt-1">✓</span>
                    <div>
                      <strong className="text-slate-800">2-bosqich: Intensive Vocabulary & Homework Build-up</strong>
                      <p className="text-slate-500 mt-0.5 font-normal">Faol davom etmoqda. Sizning vazifalaringiz o'rtacha bali {loggedInStudent.homeworks}%, juda yaxshi ko'rsatkich.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="text-amber-500 font-bold mt-0.5 sm:mt-1">➔</span>
                    <div>
                      <strong className="text-slate-800">3-bosqich: Mid-course Mock va Kamchiliklarni tuzatish</strong>
                      <p className="text-slate-500 mt-0.5 font-normal">Rejalashtirilmoqda. Kelgusi mock imtihonlari ro'yxatida ko'rishingiz mumkin.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Part B: Upcoming Mock Tests */}
            <div className="lg:col-span-5 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-6">
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-500" />
                    Mock Imtihonlar
                  </h3>
                  <p className="text-xs text-slate-400 font-normal mt-0.5">Siz ro'yxatdan o'tgan navbatdagi dars imtihonlari.</p>
                </div>
                
                {!showMockReg && (
                  <button
                    onClick={() => setShowMockReg(true)}
                    type="button"
                    className="p-1 px-3.5 bg-amber-500 text-slate-950 font-extrabold hover:bg-slate-900 hover:text-amber-400 text-xs rounded-xl shadow transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Yozilish</span>
                  </button>
                )}
              </div>

              {/* Dynamic registration success notice banner */}
              {successRegMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-medium animate-fadeIn">
                  🎉 {successRegMsg}
                </div>
              )}

              {/* Registration Form container */}
              {showMockReg && (
                <form onSubmit={handleRegisterMock} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3.5 animate-fadeIn text-xs">
                  <div className="flex justify-between items-center">
                    <strong className="text-slate-900 font-extrabold text-xs">Yangi Mock Testga Joy Band Qilish:</strong>
                    <button 
                      onClick={() => setShowMockReg(false)} 
                      type="button" 
                      className="text-slate-400 hover:text-slate-600 font-bold"
                    >
                      Bekor qilish
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Imtihon turi formatini tanlang:</label>
                    <select
                      value={mockRegType}
                      onChange={(e) => setMockRegType(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none"
                    >
                      <option value="cefr-mock">CEFR DTM Haqiqiy Format Mock Test (50 000 so'm)</option>
                      <option value="ielts-mock">IELTS Full Exam Simulation Mock (60 000 so'm)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-slate-400">Sana:</label>
                      <input 
                        type="date"
                        value={mockRegDate}
                        onChange={(e) => setMockRegDate(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-slate-400">Vaqt:</label>
                      <select
                        value={mockRegTime}
                        onChange={(e) => setMockRegTime(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none"
                      >
                        <option value="09:30">09:30 darsgacha</option>
                        <option value="14:00">14:00 tushdan keyin</option>
                        <option value="18:00">18:00 kechki</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 text-amber-400 hover:text-white font-extrabold rounded-xl transition-all cursor-pointer shadow"
                  >
                    Tasdiqlash & Ro'yxatga kirish
                  </button>
                </form>
              )}

              {/* Main Upcoming Mock List */}
              <div className="space-y-3.5" id="upcoming-mock-list">
                {loggedInStudent.upcomingMocks.length === 0 ? (
                  <p className="text-slate-400 text-xs italic text-center py-4 bg-slate-50 rounded-2xl">Rejalashtirilgan yangi mock imtihoni hozircha yo'q.</p>
                ) : (
                  loggedInStudent.upcomingMocks.map((mock) => (
                    <div key={mock.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <strong className="text-slate-900 font-extrabold text-sm block leading-snug">{mock.title}</strong>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-amber-500" />
                            {mock.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-amber-500" />
                            {mock.time}
                          </span>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 bg-yellow-500/10 text-yellow-600 border border-yellow-200/20 text-[10px] font-black rounded-lg uppercase whitespace-nowrap shrink-0">
                        {mock.status === 'registered' ? "Ro'yxatda" : "Kutilmoqda"}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Fast test instruction advice */}
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs text-slate-500 font-normal">
                <span className="font-extrabold text-slate-800 uppercase text-[9px] tracking-wide block">Mock Test Qoidalari:</span>
                <p className="leading-relaxed">
                  • Iltimos imtihon boshlanishidan 15 daqiqa oldin shaxsingizni tasdiqlovchi hujjat yoki o'quvchi kartasi bilan yetib keling. Kechikkan talabalar eshitish (Listening) bo'limiga kiritilmaydi.
                </p>
              </div>

            </div>

          </div>

          {/* HISTORIC MOCK GRADES MATRIX */}
          <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6" id="mock-grades-history">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-amber-500" />
                Topshirilgan Sinov Imtihonlari Tarixi va Baholari
              </h3>
              <p className="text-xs text-slate-400 font-normal mt-0.5">Sizning fanga kirishganingizdan buyon qayd etgan rasmiy natijalaringiz.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="historic-charts-panels">
              {loggedInStudent.mockHistory.map((history, i) => (
                <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-250 border-slate-200/65">
                    <div>
                      <strong className="text-slate-900 font-extrabold text-sm sm:text-base block">{history.title}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">{history.date} kuni o'tkazilgan</span>
                    </div>
                    <div className="px-3.5 py-1 bg-gradient-to-tr from-amber-500 to-yellow-600 text-slate-950 text-xs font-black rounded-lg">
                      Overall: {history.overall}
                    </div>
                  </div>

                  {/* Skills breakdown scorecard elements */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    
                    <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1 text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Reading</span>
                      <strong className="text-sm font-black text-slate-800">{history.reading}</strong>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1 text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Listening</span>
                      <strong className="text-sm font-black text-slate-800">{history.listening}</strong>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1 text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Writing</span>
                      <strong className="text-sm font-black text-slate-800">{history.writing}</strong>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1 text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Speaking</span>
                      <strong className="text-sm font-black text-slate-800">{history.speaking}</strong>
                    </div>

                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Xalqaro imtihon me'yorlari asosida to'liq tekshirilgan.</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
