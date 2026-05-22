import React from 'react';
import { Lock, HelpCircle, ShieldCheck, Database, FileSpreadsheet, Trash2, Edit2, Plus, Settings, Check, Users, Award, BookOpen, Save, Layers, PlayCircle, Eye, GraduationCap, Star, Sparkles, Trophy, Crown, Globe, Upload, RefreshCw } from 'lucide-react';
import { Course, Teacher, Result, EnrollmentApplication, CenterConfig, DatabaseSchema, QuizQuestion } from '../types';

interface AdminPanelTabProps {
  courses: Course[];
  results: Result[];
  applications: EnrollmentApplication[];
  config: CenterConfig;
  teachers: Teacher[];
  quizQuestions: QuizQuestion[];
  onUpdateDatabase: (updatedDb: DatabaseSchema) => void;
}

export default function AdminPanelTab({ courses, results, applications, config, teachers, quizQuestions, onUpdateDatabase }: AdminPanelTabProps) {
  // Authentication states
  const [pinInput, setPinInput] = React.useState('');
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [authError, setAuthError] = React.useState('');

  // Tab internal states
  const [adminSubTab, setAdminSubTab] = React.useState<'leads' | 'courses' | 'results' | 'teachers' | 'configs' | 'quiz'>('leads');

  // Input states for Quiz Questions Management
  const [editingQuestionId, setEditingQuestionId] = React.useState<string | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = React.useState(false);
  const [newQuestionForm, setNewQuestionForm] = React.useState<{
    q: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }>({
    q: '',
    options: ['', '', '', ''],
    correctIndex: 0,
    explanation: ''
  });

  // Input states for Add Course
  const [newCourse, setNewCourse] = React.useState<Partial<Course>>({
    title: '',
    description: '',
    price: 550000,
    duration: '3 oy',
    category: 'CEFR',
    format: 'offline',
    lessonsPerWeek: 3,
    teacherName: 'Sardor Alimov',
    level: 'Intermediate +',
    skillsLearned: ['Speaking mock tests', 'Vocabulary lists']
  });

  // Input states for Add Student Score Result
  const [newResult, setNewResult] = React.useState<Partial<Result>>({
    studentName: '',
    score: 'IELTS 7.5',
    type: 'IELTS',
    subjectDetails: 'Listening 8.0, Reading 7.5, Writing 6.5, Speaking 7.0',
    originRegion: 'Toshkent',
    details: 'Westminster talabasi bo\'ldi.',
    year: '2026',
    avatarStyle: 'from-blue-650 to-indigo-650'
  });

  // Input states for Settings configuration
  const [editedConfig, setEditedConfig] = React.useState<CenterConfig>({ ...config });

  // Update Settings from original config whenever config changes
  React.useEffect(() => {
    setEditedConfig({ ...config });
  }, [config]);

  // Handle Passcode check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'mz2109') {
      setIsAuthorized(true);
      setAuthError('');
    } else {
      setAuthError("Noto'g'ri PIN kod kiritildi! Qayta urinib ko'ring ");
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setPinInput('');
  };

  // Change enrollment application status
  const handleUpdateApplicationStatus = (appId: string, status: 'new' | 'contacted' | 'approved' | 'rejected') => {
    const updatedApps = applications.map((app) => {
      if (app.id === appId) {
        return { ...app, status };
      }
      return app;
    });

    onUpdateDatabase({
      courses,
      teachers, // kept safe internally
      results,
      applications: updatedApps,
      config,
      quizQuestions
    });
  };

  // Change enrollment notes
  const handleUpdateApplicationNote = (appId: string, note: string) => {
    const updatedApps = applications.map((app) => {
      if (app.id === appId) {
        return { ...app, note };
      }
      return app;
    });

    onUpdateDatabase({
      courses,
      teachers,
      results,
      applications: updatedApps,
      config,
      quizQuestions
    });
  };

  // Delete enrollment application
  const handleDeleteApplication = (appId: string) => {
    if (window.confirm("Rostdan ham ushbu arizani o'chirmoqchimisiz?")) {
      const updatedApps = applications.filter(app => app.id !== appId);
      onUpdateDatabase({
        courses,
        teachers,
        results,
        applications: updatedApps,
        config,
        quizQuestions
      });
    }
  };

  // Create new course
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.description) {
      alert("Iltimos, dars nomi va tavsifini to'liq to'ldiring.");
      return;
    }

    const courseObj: Course = {
      id: `course-${Date.now()}`,
      title: newCourse.title || '',
      description: newCourse.description || '',
      price: Number(newCourse.price) || 0,
      duration: newCourse.duration || '3 oy',
      category: (newCourse.category as any) || 'IELTS',
      format: (newCourse.format as any) || 'offline',
      lessonsPerWeek: Number(newCourse.lessonsPerWeek) || 3,
      teacherName: newCourse.teacherName || 'Sardor Alimov',
      level: newCourse.level || 'Intermediate',
      skillsLearned: newCourse.skillsLearned || ['Speaking skills']
    };

    const updatedCourses = [...courses, courseObj];
    onUpdateDatabase({
      courses: updatedCourses,
      teachers,
      results,
      applications,
      config,
      quizQuestions
    });

    // Reset Form
    setNewCourse({
      title: '',
      description: '',
      price: 550000,
      duration: '3 oy',
      category: 'CEFR',
      format: 'offline',
      lessonsPerWeek: 3,
      teacherName: 'Sardor Alimov',
      level: 'Intermediate +',
      skillsLearned: ['Mock tests included', 'Speaking practices']
    });

    alert("Yangi o'quv kursi muvaffaqiyatli darslar safiga qo'shildi!");
  };

  // Delete o'quv kursi
  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm("Rostdan ham ushbu o'quv kursini butunlay tizimdan o'chirmoqchimisiz?")) {
      const updatedCourses = courses.filter(c => c.id !== courseId);
      onUpdateDatabase({
        courses: updatedCourses,
        teachers,
        results,
        applications,
        config,
        quizQuestions
      });
    }
  };

  // Create student score result
  const handleAddResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResult.studentName || !newResult.score) {
      alert("Iltimos, talaba ismi va erishgan ballini to'liq kiriting.");
      return;
    }

    const resObj: Result = {
      id: `res-${Date.now()}`,
      studentName: newResult.studentName || '',
      score: newResult.score || 'IELTS 7.5',
      type: (newResult.type as any) || 'IELTS',
      subjectDetails: newResult.subjectDetails || '',
      originRegion: newResult.originRegion || 'Toshkent',
      details: newResult.details || '',
      year: newResult.year || '2026',
      avatarStyle: newResult.avatarStyle || 'from-sky-500 to-indigo-500'
    };

    const updatedResults = [resObj, ...results];
    onUpdateDatabase({
      courses,
      teachers,
      results: updatedResults,
      applications,
      config,
      quizQuestions
    });

    // Reset Form
    setNewResult({
      studentName: '',
      score: 'IELTS 7.5',
      type: 'IELTS',
      subjectDetails: 'Listening 8.0, Reading 7.5, Writing 6.5, Speaking 7.0',
      originRegion: 'Toshkent',
      details: 'Sertifikat sohibi',
      year: '2026',
      avatarStyle: 'from-blue-500 to-indigo-600'
    });

    alert("Yangi talaba imtihon ko'rsatkichi muvaffaqiyatli saqlandi!");
  };

  // Delete student representation result
  const handleDeleteResult = (resId: string) => {
    if (window.confirm("Rostdan ham ushbu talaba natijasini o'chirib tashlamoqchimisiz?")) {
      const updatedResults = results.filter(r => r.id !== resId);
      onUpdateDatabase({
        courses,
        teachers,
        results: updatedResults,
        applications,
        config,
        quizQuestions
      });
    }
  };

  // Teacher state & CRUD handlers
  const [newTeacher, setNewTeacher] = React.useState<Partial<Teacher & { achievementsText: string }>>({
    name: '',
    role: 'CEFR Senior Coach',
    ieltsScore: '8.5',
    experience: '5 yil',
    bio: '',
    image: 'bg-gradient-to-tr from-sky-500 to-indigo-600',
    achievementsText: 'CEFR C1 egasi, 120+ dars bitiruvchilari'
  });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.bio) {
      alert("Iltimos, ustoz ismi va biografiyasini to'liq to'ldiring.");
      return;
    }

    const achievements = newTeacher.achievementsText 
      ? newTeacher.achievementsText.split(',').map(item => item.trim()).filter(Boolean)
      : ['Katta tajribali pedagog'];

    const teacherObj: Teacher = {
      id: `teacher-${Date.now()}`,
      name: newTeacher.name || '',
      role: newTeacher.role || 'Senior English Instructor',
      ieltsScore: newTeacher.ieltsScore || '8.0',
      experience: newTeacher.experience || '4 yil',
      bio: newTeacher.bio || '',
      image: newTeacher.image || 'bg-gradient-to-tr from-sky-500 to-indigo-650',
      achievements
    };

    const updatedTeachers = [...teachers, teacherObj];
    onUpdateDatabase({
      courses,
      teachers: updatedTeachers,
      results,
      applications,
      config,
      quizQuestions
    });

    // Reset Form
    setNewTeacher({
      name: '',
      role: 'CEFR Senior Coach',
      ieltsScore: '8.5',
      experience: '5 yil',
      bio: '',
      image: 'bg-gradient-to-tr from-sky-500 to-indigo-600',
      achievementsText: 'CEFR C1 egasi, 120+ dars bitiruvchilari'
    });

    alert("Yangi ustoz muvaffaqiyatli ro'yxatga qo'shildi!");
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (window.confirm("Rostdan ham ushbu ustozni o'chirmoqchimisiz?")) {
      const updatedTeachers = teachers.filter(t => t.id !== teacherId);
      onUpdateDatabase({
        courses,
        teachers: updatedTeachers,
        results,
        applications,
        config,
        quizQuestions
      });
    }
  };

  // Update center configurations
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateDatabase({
      courses,
      teachers,
      results,
      applications,
      config: editedConfig,
      quizQuestions
    });
    alert("Mohinur Zafarjonovna Academy sozlamalari va kontaktlari muvaffaqiyatli saqlandi!");
  };

  // Quiz Questions management handlers
  const handleAddQuizQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionForm.q || newQuestionForm.options.some(opt => !opt.trim())) {
      alert("Iltimos, diqqat qiling: Savol va barcha 4 ta javob variantini to'ldirish majburiy.");
      return;
    }

    const newQuestion: QuizQuestion = {
      id: editingQuestionId || `quiz-${Date.now()}`,
      q: newQuestionForm.q || '',
      options: newQuestionForm.options || [],
      correctIndex: Number(newQuestionForm.correctIndex) || 0,
      explanation: newQuestionForm.explanation || ''
    };

    let updatedQuestions: QuizQuestion[] = [];
    if (editingQuestionId) {
      // Editing Mode
      updatedQuestions = quizQuestions.map(q => q.id === editingQuestionId ? newQuestion : q);
      alert("Savol muvaffaqiyatli tahrirlandi!");
    } else {
      // Add Mode
      updatedQuestions = [...quizQuestions, newQuestion];
      alert("Yangi test savoli muvaffaqiyatli saqlandi!");
    }

    onUpdateDatabase({
      courses,
      teachers,
      results,
      applications,
      config,
      quizQuestions: updatedQuestions
    });

    // Reset Form
    setNewQuestionForm({
      q: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: ''
    });
    setEditingQuestionId(null);
    setIsAddingQuestion(false);
  };

  const handleEditQuizQuestionClick = (q: QuizQuestion) => {
    setEditingQuestionId(q.id);
    setNewQuestionForm({
      q: q.q,
      options: [...q.options],
      correctIndex: q.correctIndex,
      explanation: q.explanation || ''
    });
    setIsAddingQuestion(true);
  };

  const handleDeleteQuizQuestion = (qId: string) => {
    if (window.confirm("Haqiqatdan ham ushbu test savolini o'chirmoqchimisiz?")) {
      const updatedQuestions = quizQuestions.filter(q => q.id !== qId);
      onUpdateDatabase({
        courses,
        teachers,
        results,
        applications,
        config,
        quizQuestions: updatedQuestions
      });
      alert("Savol o'chirildi.");
    }
  };

  const handleCancelQuizEdit = () => {
    setNewQuestionForm({
      q: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: ''
    });
    setEditingQuestionId(null);
    setIsAddingQuestion(false);
  };

  return (
    <div className="space-y-6 pb-20 animate-fadeIn" id="admin-panel-container">
      
      {/* LOCKED SCREEN */}
      {!isAuthorized ? (
        <div className="max-w-md mx-auto bg-white border border-slate-100 p-8 rounded-3xl shadow-lg mt-10 text-center space-y-6">
          <div className="h-14 w-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mx-auto">
            <Lock className="h-6 w-6 stroke-[2]" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900 leading-tight">Admin Boshqaruv Himoyasi</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bu sahifa orqali darslar guruhini yangilash, arizalarni qabul qilish va sozlamalarni o'zgartirish mumkin. PIN kodni kiriting:
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 block mb-2">MAXFIY PASSCODE PIN:</label>
              <input 
                type="password" 
                placeholder="••••"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-bold py-3 bg-slate-50 border border-slate-200 focus:border-amber-500/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            
            {authError && (
              <p className="text-xs text-rose-500 text-center font-bold">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 text-amber-400 hover:text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              🔐 Himoyani ochish
            </button>
          </form>

          <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-50">
            * Yuksalish English Academy boshqaruv tizimi 256-bitli xavfsizlik shifrlangan.
          </p>
        </div>
      ) : (
        /* AUTHORIZED CONTROL SYSTEM */
        <div className="space-y-8 animate-fadeIn" id="admin-dashboard-panel">
          
          {/* Header row with stats */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="px-2.5 py-0.5 bg-emerald-500 text-slate-950 text-[10px] uppercase font-black tracking-widest rounded-full">
                ADMIN LEVEL AUTHORIZED
              </span>
              <h2 className="text-2xl font-black text-white">Boshqaruv va CRM Paneli</h2>
              <p className="text-xs text-slate-400">
                O'quvchilar arizalari, darslar o'quv rejasi va akademiya kontaktlarini tahrirlash markazi.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="px-4 py-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[9px] text-slate-500 font-bold block uppercase font-sans">Arizalar</span>
                <span className="text-xl font-bold font-mono text-emerald-400">{applications.length} ta</span>
              </div>
              <div className="px-4 py-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[9px] text-slate-500 font-bold block uppercase font-sans">Darslar</span>
                <span className="text-xl font-bold font-mono text-amber-400">{courses.length} ta</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-3 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Tizimdan chiqish
              </button>
            </div>
          </div>

          {/* Admin Navigation submenu tabs */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-2">
            {[
              { id: 'leads', label: '📞 Kelgan Arizalar (CRM)', icon: FileSpreadsheet },
              { id: 'courses', label: '📖 Kurslar Muharriri', icon: BookOpen },
              { id: 'results', label: '🏆 Natijalar Muharriri', icon: Award },
              { id: 'teachers', label: '👩‍🏫 Ustozlar Muharriri', icon: Users },
              { id: 'configs', label: '⚙ Xususiy Sozlamalar', icon: Settings },
              { id: 'quiz', label: '✏️ Daraja Testi', icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminSubTab(tab.id as any)}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer
                    ${adminSubTab === tab.id 
                      ? 'bg-amber-500 text-slate-950 shadow-sm' 
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/50'
                    }
                  `}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 1. ARIZALAR (LEADS) CRM TAB */}
          {adminSubTab === 'leads' && (
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm space-y-4" id="leads-tab-view">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Ariza qoldirgan o'quvchilar ro'yxati (CRM)</h3>
                  <p className="text-xs text-slate-400">Saytda ariza topshirgan yoki placement testni tugatgan o'quvchilarning bog'lanish nomerlari va formatlari.</p>
                </div>
                <span className="px-2.5 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg">
                  LATEST REALTIME
                </span>
              </div>

              {applications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse" id="leads-crm-table">
                    <thead>
                      <tr className="bg-slate-50/50 text-slate-500 border-y border-slate-100 text-[10px] uppercase font-black tracking-widest">
                        <th className="p-4 pl-6">Mijoz Ismi</th>
                        <th className="p-4">Bog'lanish Telefon</th>
                        <th className="p-4">Tanlangan dars</th>
                        <th className="p-4">Format</th>
                        <th className="p-4">Mijoz holati</th>
                        <th className="p-4">Eslatma / Izoh</th>
                        <th className="p-4 pr-6 text-right">O'chirish</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.map((app) => (
                        <tr key={app.id} id={`lead-row-${app.id}`} className="hover:bg-slate-50/50 transition-all font-medium text-slate-600">
                          
                          {/* Name & Date */}
                          <td className="p-4 pl-6">
                            <span className="text-slate-900 font-extrabold block">{app.studentName}</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              {new Date(app.createdAt).toLocaleDateString('uz-UZ')} {new Date(app.createdAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </td>

                          {/* Call Phone phone call toggle link */}
                          <td className="p-4 font-mono font-bold text-slate-900">
                            <a href={`tel:${app.phone}`} className="hover:text-amber-600 transition-all">
                              📞 {app.phone}
                            </a>
                          </td>

                          {/* Course title */}
                          <td className="p-4 text-slate-800 font-semibold">
                            {app.courseTitle}
                          </td>

                          {/* Format */}
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase
                              ${app.format === 'online' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'}
                            `}>
                              {app.format}
                            </span>
                          </td>

                          {/* Status Badge Dropdown */}
                          <td className="p-4">
                            <select
                              value={app.status}
                              onChange={(e) => handleUpdateApplicationStatus(app.id, e.target.value as any)}
                              className={`p-2 rounded-xl text-xs font-bold border-none outline-none ring-1 focus:ring-2 cursor-pointer
                                ${app.status === 'new' ? 'bg-amber-50 text-amber-600 ring-amber-300 focus:ring-amber-400' : ''}
                                ${app.status === 'contacted' ? 'bg-sky-50 text-sky-600 ring-sky-300 focus:ring-sky-400' : ''}
                                ${app.status === 'approved' ? 'bg-emerald-50 text-emerald-600 ring-emerald-300 focus:ring-emerald-400' : ''}
                                ${app.status === 'rejected' ? 'bg-rose-50 text-rose-600 ring-rose-300 focus:ring-rose-400' : ''}
                              `}
                            >
                              <option value="new">🆕 Yangi</option>
                              <option value="contacted">📞 Bog'lanildi</option>
                              <option value="approved">✅ Tasdiqlandi</option>
                              <option value="rejected">❌ Rad etildi</option>
                            </select>
                          </td>

                          {/* Notes comment box */}
                          <td className="p-4">
                            <input 
                              type="text" 
                              placeholder="Foydali izoh yozish..."
                              value={app.note || ''}
                              onChange={(e) => handleUpdateApplicationNote(app.id, e.target.value)}
                              className="p-2 border border-slate-200 focus:border-amber-500 rounded-xl text-xs w-full focus:outline-none"
                            />
                          </td>

                          {/* Delete Lead action */}
                          <td className="p-4 pr-6 text-right">
                            <button
                              onClick={() => handleDeleteApplication(app.id)}
                              className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-all cursor-pointer"
                              title="Arizani tizimdan doimiy o'chirish"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <span className="text-4xl block">📂</span>
                  <p className="text-xs font-bold font-sans text-slate-500">Hech qanday ariza va kelgan xabarlar mavjud emas.</p>
                </div>
              )}
            </div>
          )}

          {/* 2. KURSLAR MUHARRIRI TAB */}
          {adminSubTab === 'courses' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="courses-manager-view">
              
              {/* Add New Course form */}
              <div className="lg:col-span-5 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-6">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    <Plus className="h-5 w-5 text-amber-500" />
                    Yangi Kurs Qo'shish
                  </h3>
                  <p className="text-xs text-slate-400">Guruhlar dars rejasi va portal sahifasiga yangi o'quv dasturi qo'shadi.</p>
                </div>

                <form onSubmit={handleAddCourse} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Kurs Nomi:</label>
                    <input 
                      type="text" 
                      placeholder="Masalan: IELTS Standard Offline"
                      value={newCourse.title || ''}
                      onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Batafsil Tavsifi (Qisqacha):</label>
                    <textarea 
                      placeholder="Dars ko'nikmalari, kimlarga mosligi haqida..."
                      value={newCourse.description || ''}
                      rows={3}
                      onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Oylik To'lov (UZS):</label>
                      <input 
                        type="number" 
                        value={newCourse.price || 0}
                        onChange={(e) => setNewCourse({ ...newCourse, price: parseFloat(e.target.value) })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Davomiyligi:</label>
                      <input 
                        type="text" 
                        placeholder="Masalan: 3 oy"
                        value={newCourse.duration || ''}
                        onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Format:</label>
                      <select
                        value={newCourse.format}
                        onChange={(e) => setNewCourse({ ...newCourse, format: e.target.value as any })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none cursor-pointer"
                      >
                        <option value="offline">🏢 Oflayn dars</option>
                        <option value="online">🟢 Onlayn dars</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Kategoriya:</label>
                      <select
                        value={newCourse.category}
                        onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value as any })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none cursor-pointer"
                      >
                        <option value="CEFR">CEFR</option>
                        <option value="IELTS">IELTS</option>
                        <option value="General English">General English</option>
                        <option value="Kids">Kids English</option>
                        <option value="Academic">Academic Speaking</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Haftalik darslar soni:</label>
                      <input 
                        type="number" 
                        value={newCourse.lessonsPerWeek || 3}
                        onChange={(e) => setNewCourse({ ...newCourse, lessonsPerWeek: parseFloat(e.target.value) })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Boshlang'ich darajasi:</label>
                      <input 
                        type="text" 
                        placeholder="Masalan: Upper-Intermediate"
                        value={newCourse.level || ''}
                        onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Asosiy dars beruvchi Ustoz nomi:</label>
                    <input 
                      type="text" 
                      placeholder="Sardor Alimov"
                      value={newCourse.teacherName || ''}
                      onChange={(e) => setNewCourse({ ...newCourse, teacherName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 text-amber-400 hover:text-white font-extrabold rounded-xl transition-all cursor-pointer"
                  >
                    🚀 Kursni e'lon qilish
                  </button>
                </form>
              </div>

              {/* Current course listing table */}
              <div className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Amaldagi dars o'quv dasturlari ({courses.length} ta)</h3>
                  <p className="text-xs text-slate-400">Saytdagi "Bizning kurslar" sahifasida mijozlarga ko'rinuvchi o'quv dasturlari ro'yxati.</p>
                </div>

                <div className="space-y-3">
                  {courses.map((c) => (
                    <div key={c.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900 font-extrabold text-sm sm:text-base leading-tight">{c.title}</strong>
                          <span className="text-[9px] bg-slate-900 text-white font-black px-2 py-0.5 rounded-md uppercase">
                            {c.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">Narxi: <strong className="text-slate-800">{c.price.toLocaleString('uz-UZ')} UZS</strong> /oy | Ustoz: {c.teacherName}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteCourse(c.id)}
                        className="p-3 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-xl border border-slate-200 hover:border-rose-200 transition-all cursor-pointer"
                        title="O'quv guruhini butunlay o'chirish"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 3. NATIJALAR MUHARRIRI TAB */}
          {adminSubTab === 'results' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="results-manager-view">
              
              {/* Add New Result Form */}
              <div className="lg:col-span-5 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-6">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    <Plus className="h-5 w-5 text-amber-500" />
                    Yangi Talaba Natijasini Qo'shish
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">Bu yerga qo'shilgan o'quvchi ma'lumotlari "Natijalar" faxriy taxtasida namoyon bo'ladi.</p>
                </div>

                <form onSubmit={handleAddResult} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">O'quvchi to'liq ismi:</label>
                    <input 
                      type="text" 
                      placeholder="Jasurbek Toirov"
                      value={newResult.studentName || ''}
                      onChange={(e) => setNewResult({ ...newResult, studentName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Imtihon Balli (e.g. IELTS 8.0, CEFR C1):</label>
                      <input 
                        type="text" 
                        placeholder="IELTS 8.0"
                        value={newResult.score || ''}
                        onChange={(e) => setNewResult({ ...newResult, score: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Imtihon turi:</label>
                      <select
                        value={newResult.type}
                        onChange={(e) => setNewResult({ ...newResult, type: e.target.value as any })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-550 rounded-xl focus:outline-none cursor-pointer"
                      >
                        <option value="IELTS">IELTS</option>
                        <option value="CEFR">CEFR</option>
                        <option value="University Match">Universitet Maqsad (E.g. Admission)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Batafsil ballari (Sub-scores):</label>
                    <input 
                      type="text" 
                      placeholder="Listening: 8.5, Reading: 8.0, Writing: 7.0, Speaking: 7.5"
                      value={newResult.subjectDetails || ''}
                      onChange={(e) => setNewResult({ ...newResult, subjectDetails: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Viloyat filiali:</label>
                      <input 
                        type="text" 
                        placeholder="Toshkent, Namangan..."
                        value={newResult.originRegion || ''}
                        onChange={(e) => setNewResult({ ...newResult, originRegion: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Imtihon yili:</label>
                      <input 
                        type="text" 
                        value={newResult.year || '2026'}
                        onChange={(e) => setNewResult({ ...newResult, year: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Muvaffaqiyat (Izoh, grant, o'qishga kirdi):</label>
                    <textarea 
                      placeholder="Masalan: Westminster Universitetiga 100% grant asosida qabul qilindi..."
                      value={newResult.details || ''}
                      rows={2}
                      onChange={(e) => setNewResult({ ...newResult, details: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 text-amber-400 hover:text-white font-extrabold rounded-xl transition-all cursor-pointer"
                  >
                    💾 Natijani faxriy ro'yxatga qo'shish
                  </button>
                </form>
              </div>

              {/* Current results list and deletion */}
              <div className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Tizimdagi talabalar muvaffaqiyatlari ({results.length} ta)</h3>
                  <p className="text-xs text-slate-400 font-normal">Bu yerda siz bitiruvchilar natijalarini o'chirishingiz yoki ko'rishingiz mumkin.</p>
                </div>

                <div className="space-y-3 h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                  {results.map((r) => (
                    <div key={r.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900 font-extrabold text-sm sm:text-base leading-tight">{r.studentName}</strong>
                          <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-black text-[10px] rounded-lg">
                            {r.score}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-normal line-clamp-1">{r.details}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteResult(r.id)}
                        className="p-2.5 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-xl border border-slate-200 hover:border-rose-200 transition-all shrink-0 cursor-pointer"
                        title="Natijani o'chirish"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 4. AKADEMIYA SOZLAMALARI TAB */}
          {adminSubTab === 'configs' && (
            <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm max-w-4xl" id="setting-editor-view">
              <div className="pb-5 border-b border-slate-50 mb-6">
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Akademiya va Sahifa Sozlamalari</h3>
                <p className="text-xs text-slate-400">Bu yerdagi ma'lumotlar bosh sahifa, kontakt jadvali va footer qismlarida avtomatik almashadi.</p>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-6 text-xs sm:text-sm">
                
                {/* 🎨 LOGO VA BRENDING SOZLAMALARI */}
                <div className="p-6 bg-slate-50/70 rounded-3xl border border-slate-150 space-y-5" id="branding-section">
                  <div className="flex items-center gap-2 border-b border-slate-205 pb-3">
                    <span className="text-xl">🎨</span>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Logo va Brending Sozlamalari</h4>
                      <p className="text-[11px] text-slate-500 font-normal">Bu yerda o'quv markazi logosini, uning matnini va ramzini istalgancha tahrirlashingiz mumkin.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Logo Asosiy Matni (Birinchi Qator):</label>
                      <input 
                        type="text" 
                        placeholder="Masalan: YUKSALISH"
                        value={editedConfig.logoText || ''}
                        onChange={(e) => setEditedConfig({ ...editedConfig, logoText: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none font-extrabold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Logo Ikkinchi Matni (Izoh):</label>
                      <input 
                        type="text" 
                        placeholder="Masalan: English Academy"
                        value={editedConfig.logoSubtext || ''}
                        onChange={(e) => setEditedConfig({ ...editedConfig, logoSubtext: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2">
                    
                    {/* Presets Grid */}
                    <div className="md:col-span-6 space-y-2">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">
                        Logo Belgisi (Agar maxsus rasm yuklanmagan bo'lsa):
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { id: 'graduation-cap', label: 'Shapka', icon: GraduationCap },
                          { id: 'book-open', label: 'Kitob', icon: BookOpen },
                          { id: 'star', label: 'Yulduz', icon: Star },
                          { id: 'sparkles', label: 'Yulduzcha', icon: Sparkles },
                          { id: 'trophy', label: 'Kubok', icon: Trophy },
                          { id: 'crown', label: 'Toj', icon: Crown },
                          { id: 'globe', label: 'Dunyo', icon: Globe },
                        ].map((item) => {
                          const IconComp = item.icon;
                          const isSelected = editedConfig.logoIcon === item.id || (!editedConfig.logoIcon && item.id === 'graduation-cap');
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setEditedConfig({ ...editedConfig, logoIcon: item.id })}
                              className={`p-3 rounded-xl border transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer
                                ${isSelected 
                                  ? 'bg-amber-500/10 border-amber-500 text-amber-600 font-bold scale-102 shadow-sm' 
                                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                }
                              `}
                            >
                              <IconComp className="h-5 w-5" />
                              <span className="text-[9px] truncate w-full text-center leading-tight">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Image Upload section */}
                    <div className="md:col-span-6 space-y-2">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">
                        Maxsus Rasm yuklash (Rasm yoki SVG ko'rinishida):
                      </label>
                      
                      <div className="p-4 bg-white border border-slate-200 rounded-xl relative flex flex-col items-center justify-center gap-3">
                        {editedConfig.logoUrl ? (
                          <div className="flex items-center gap-3 w-full">
                            <div className="h-14 w-14 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center shrink-0">
                              <img src={editedConfig.logoUrl} alt="Logo Preview" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-grow space-y-1 text-left">
                              <span className="text-xs font-bold text-slate-800 block">Yuklangan rasm faol.</span>
                              <span className="text-[10px] text-slate-400 block font-normal leading-normal">O'quv markazi logosiga shaxsiy rasm muvaffaqiyatli joylandi!</span>
                              <button
                                type="button"
                                onClick={() => setEditedConfig({ ...editedConfig, logoUrl: undefined })}
                                className="text-[10px] text-rose-500 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer mt-1"
                              >
                                <RefreshCw className="h-3 w-3" /> Rasmni o'chirish / Belgini ishlatish
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3 text-center w-full">
                            <div className="flex flex-col items-center justify-center gap-2 py-2">
                              <Upload className="h-6 w-6 text-slate-400 stroke-[1.5]" />
                              <p className="text-[11px] text-slate-550">Logo rasmini sudrab tashlang yoki tanlang (.png, .jpg, .svg)</p>
                            </div>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (file.size > 2 * 1024 * 1024) {
                                    alert("Rasm hajmi juda katta! Iltimos, 2MB dan kichik rasm yuklang.");
                                    return;
                                  }
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setEditedConfig({ ...editedConfig, logoUrl: reader.result as string });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden" 
                              id="logo-file-input" 
                            />
                            <label 
                              htmlFor="logo-file-input"
                              className="inline-flex px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-500 hover:text-white font-bold rounded-lg text-xs transition-all cursor-pointer"
                            >
                              Rasm o'rnatish (Upload)
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                  <div className="space-y-1 border-t border-slate-200 pt-3">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Yoki rasmning To'g'ridan-to'g'ri internet havolasi (URL):</label>
                    <input 
                      type="text" 
                      placeholder="https://images.unsplash.com/photo-1546410531-bb4caa6b424d"
                      value={editedConfig.logoUrl || ''}
                      onChange={(e) => setEditedConfig({ ...editedConfig, logoUrl: e.target.value || undefined })}
                      className="w-full p-2.5 bg-white border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">O'quv Markazi Nomi:</label>
                    <input 
                      type="text" 
                      value={editedConfig.centerName}
                      onChange={(e) => setEditedConfig({ ...editedConfig, centerName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Maqsad / Motto (Motto shior):</label>
                    <input 
                      type="text" 
                      value={editedConfig.motto}
                      onChange={(e) => setEditedConfig({ ...editedConfig, motto: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Batafsil tavsif (Biz haqimizda):</label>
                  <textarea 
                    value={editedConfig.description}
                    rows={3}
                    onChange={(e) => setEditedConfig({ ...editedConfig, description: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Aloqa telefoni (Bosh sahifada ko'rsatiladi):</label>
                    <input 
                      type="text" 
                      value={editedConfig.phone}
                      onChange={(e) => setEditedConfig({ ...editedConfig, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none font-mono font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Elektron pochta:</label>
                    <input 
                      type="email" 
                      value={editedConfig.email}
                      onChange={(e) => setEditedConfig({ ...editedConfig, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Bosh bino manzili:</label>
                    <input 
                      type="text" 
                      value={editedConfig.address}
                      onChange={(e) => setEditedConfig({ ...editedConfig, address: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-slate-100 pt-5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Telegram Kanal Havolasi:</label>
                    <input 
                      type="text" 
                      value={editedConfig.telegramChannel}
                      onChange={(e) => setEditedConfig({ ...editedConfig, telegramChannel: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Admin Telegram havolasi:</label>
                    <input 
                      type="text" 
                      value={editedConfig.telegramPersonal}
                      onChange={(e) => setEditedConfig({ ...editedConfig, telegramPersonal: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Instagram Havolasi:</label>
                    <input 
                      type="text" 
                      value={editedConfig.instagram}
                      onChange={(e) => setEditedConfig({ ...editedConfig, instagram: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">YouTube Kanal Havolasi:</label>
                    <input 
                      type="text" 
                      value={editedConfig.youtube}
                      onChange={(e) => setEditedConfig({ ...editedConfig, youtube: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">O'quvchilar soni sanagichi:</label>
                    <input 
                      type="number" 
                      value={editedConfig.studentCount}
                      onChange={(e) => setEditedConfig({ ...editedConfig, studentCount: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">IELTS 7.0+ muvaffaqiyat sanagichi:</label>
                    <input 
                      type="number" 
                      value={editedConfig.successCount}
                      onChange={(e) => setEditedConfig({ ...editedConfig, successCount: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">O'rtacha muvaffaqiyat bahosi:</label>
                    <input 
                      type="text" 
                      value={editedConfig.averageScore}
                      onChange={(e) => setEditedConfig({ ...editedConfig, averageScore: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none font-bold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-slate-900 border border-slate-800 text-amber-500 hover:text-white font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  Sozlamalarni Saqlash
                </button>

              </form>
            </div>
          )}

          {/* 6. DARAJA TESTI MUHARRIRI TAB */}
          {adminSubTab === 'quiz' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn" id="quiz-manager-view">
              
              {/* Form Card (Add / Edit Question) */}
              <div className="lg:col-span-5 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    {editingQuestionId ? (
                      <>
                        <Edit2 className="h-5 w-5 text-amber-500" />
                        Test Savolini Tahrirlash
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5 text-amber-500" />
                        Yangi Test Savoli Qo'shish
                      </>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Daraja aniqlash (Placement Test) uchun test savoli, uning variantlari va to'g'ri javobini kiriting.
                  </p>
                </div>

                <form onSubmit={handleAddQuizQuestion} className="space-y-4 text-xs sm:text-sm">
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Savol Matni:</label>
                    <textarea 
                      placeholder="Masalan: If I ___ enough free time, I would join the Academic Writing classes."
                      value={newQuestionForm.q}
                      rows={3}
                      onChange={(e) => setNewQuestionForm({ ...newQuestionForm, q: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none focus:bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Javob Variantlari (To'rtta variant):</label>
                    
                    {newQuestionForm.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="h-7 w-7 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <input 
                          type="text" 
                          placeholder={`Masalan: option ${idx + 1}`}
                          value={opt}
                          onChange={(e) => {
                            const updatedOpts = [...newQuestionForm.options];
                            updatedOpts[idx] = e.target.value;
                            setNewQuestionForm({ ...newQuestionForm, options: updatedOpts });
                          }}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none focus:bg-white text-xs font-semibold"
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">To'g'ri Javob Varianti:</label>
                    <select
                      value={newQuestionForm.correctIndex}
                      onChange={(e) => setNewQuestionForm({ ...newQuestionForm, correctIndex: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none cursor-pointer"
                    >
                      <option value={0}>A Varianti</option>
                      <option value={1}>B Varianti</option>
                      <option value={2}>C Varianti</option>
                      <option value={3}>D Varianti</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">To'g'ri javob izohi / Tushuntirish:</label>
                    <textarea 
                      placeholder="Masalan: Conditional Sentence type II formulasiga ko'ra o'tmish zamon 'had' tanlanadi."
                      value={newQuestionForm.explanation}
                      rows={2}
                      onChange={(e) => setNewQuestionForm({ ...newQuestionForm, explanation: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none focus:bg-white text-xs"
                    />
                  </div>

                  <div className="flex gap-2">
                    {editingQuestionId && (
                      <button
                        type="button"
                        onClick={handleCancelQuizEdit}
                        className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-250 text-slate-700 font-bold rounded-xl transition-all cursor-pointer text-xs"
                      >
                        Bekor qilish
                      </button>
                    )}
                    <button
                      type="submit"
                      className={`py-2.5 bg-slate-900 text-amber-400 hover:text-white font-extrabold rounded-xl transition-all cursor-pointer text-xs ${editingQuestionId ? 'w-2/3' : 'w-full'}`}
                    >
                      {editingQuestionId ? "💾 Saqlash" : "➕ Savolni Qo'shish"}
                    </button>
                  </div>

                </form>
              </div>

              {/* Listing Card (Current Questions) */}
              <div className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Tizimdagi Test Savollari ({quizQuestions.length} ta)</h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Placement (Daraja testi) paytida savollar va ularning javoblari avtomatik random tarzda oquvchiga taqdim etiladi.
                  </p>
                </div>

                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-1">
                  {quizQuestions.length === 0 ? (
                    <div className="p-8 border border-dashed border-slate-200 rounded-2xl text-center text-slate-400 text-xs">
                      Savollar mavjud emas. Yangi savollar qo'shing.
                    </div>
                  ) : (
                    quizQuestions.map((q, qIdx) => (
                      <div key={q.id} className="p-5 bg-slate-50 border border-slate-150 rounded-2xl space-y-3 relative group">
                        
                        {/* Upper row */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <span className="px-2.5 py-0.5 bg-slate-200 text-slate-900 text-[9px] uppercase font-black tracking-wider rounded-md">
                              SAVOL #{qIdx + 1}
                            </span>
                            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-relaxed pt-1">
                              {q.q}
                            </h4>
                          </div>
                          
                          {/* Admin tools */}
                          <div className="flex gap-1 shrink-0">
                            <button
                              onClick={() => handleEditQuizQuestionClick(q)}
                              type="button"
                              className="p-1.5 bg-white hover:bg-amber-150 text-slate-500 hover:text-slate-900 rounded-lg border border-slate-200 transition-all cursor-pointer"
                              title="Tahrirlash"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuizQuestion(q.id)}
                              type="button"
                              className="p-1.5 bg-white hover:bg-rose-50 text-slate-450 hover:text-rose-600 rounded-lg border border-slate-200 transition-all cursor-pointer"
                              title="O'chirish"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {q.options.map((opt, oIdx) => {
                            const isCorrect = oIdx === q.correctIndex;
                            return (
                              <div 
                                key={oIdx} 
                                className={`p-2 rounded-xl text-xs flex items-center gap-2 border transition-all
                                  ${isCorrect 
                                    ? 'bg-emerald-500/10 border-emerald-300 text-emerald-700 font-bold' 
                                    : 'bg-white border-slate-200 text-slate-600 font-medium'
                                  }
                                `}
                              >
                                <span className={`h-5 w-5 rounded text-[10px] font-black flex items-center justify-center shrink-0
                                  ${isCorrect 
                                    ? 'bg-emerald-500 text-white' 
                                    : 'bg-slate-150 text-slate-600'
                                  }
                                `}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span className="truncate">{opt}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        {q.explanation && (
                          <div className="p-3 bg-white/70 border border-slate-100 rounded-xl text-[11px] text-slate-500 leading-relaxed font-normal">
                            <strong className="text-emerald-600 font-bold">Izoh: </strong>{q.explanation}
                          </div>
                        )}

                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

          {/* 5. USTOZLAR MUHARRIRI TAB */}
          {adminSubTab === 'teachers' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn" id="teachers-manager-view">
              
              {/* Add New Teacher Form */}
              <div className="lg:col-span-5 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-6">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    <Plus className="h-5 w-5 text-amber-500" />
                    Yangi Ustoz Qo'shish
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">Akademiya jamoasiga yangi o'qituvchi qo'shish, jamoa sahifasini yangilash.</p>
                </div>

                <form onSubmit={handleAddTeacher} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Ustoz To'liq Ismi:</label>
                    <input 
                      type="text" 
                      placeholder="Masalan: Nilufar Karimova"
                      value={newTeacher.name || ''}
                      onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Lavozimi / Rol:</label>
                      <input 
                        type="text" 
                        placeholder="Masalan: Senior CEFR Coach"
                        value={newTeacher.role || ''}
                        onChange={(e) => setNewTeacher({ ...newTeacher, role: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">IELTS / CEFR Balli:</label>
                      <input 
                        type="text" 
                        placeholder="Masalan: 8.5 (C1)"
                        value={newTeacher.ieltsScore || ''}
                        onChange={(e) => setNewTeacher({ ...newTeacher, ieltsScore: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Tajribasi (yil):</label>
                      <input 
                        type="text" 
                        placeholder="Masalan: 5 yil"
                        value={newTeacher.experience || ''}
                        onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Dizayn fon rangi (Gradient):</label>
                      <select
                        value={newTeacher.image}
                        onChange={(e) => setNewTeacher({ ...newTeacher, image: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none cursor-pointer"
                      >
                        <option value="bg-gradient-to-tr from-sky-500 to-indigo-600">Indigo moviy</option>
                        <option value="bg-gradient-to-tr from-emerald-500 to-teal-600">Yashil zumrad</option>
                        <option value="bg-gradient-to-tr from-amber-500 to-yellow-600">Tilla olovrang</option>
                        <option value="bg-gradient-to-tr from-pink-500 to-rose-600">Chiroyli pushti</option>
                        <option value="bg-gradient-to-tr from-purple-500 to-indigo-700">Binafsha sirlar</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Biografiya / Malakasi:</label>
                    <textarea 
                      placeholder="Ustozning qaysi universitetda o'qigani, qisqacha ta'limiy falsafasi..."
                      value={newTeacher.bio || ''}
                      rows={3}
                      onChange={(e) => setNewTeacher({ ...newTeacher, bio: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Ustoz yutuqlari (vergul bilan ajratilgan):</label>
                    <input 
                      type="text" 
                      placeholder="CEFR C1 egasi, 120+ dars bitiruvchilari, 500 ball sovrindori"
                      value={newTeacher.achievementsText || ''}
                      onChange={(e) => setNewTeacher({ ...newTeacher, achievementsText: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 text-amber-400 hover:text-white font-extrabold rounded-xl transition-all cursor-pointer"
                  >
                    💾 Ustozni ro'yxatga qo'shish
                  </button>
                </form>
              </div>

              {/* Current teachers listing */}
              <div className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Akademiya Ustozlar Jamoasi ({teachers.length} ta)</h3>
                  <p className="text-xs text-slate-400 font-normal">Asosiy sahifada mijozlarga namoyon bo'ladigan malakali ustozlar tarkibi.</p>
                </div>

                <div className="space-y-3">
                  {teachers.map((t) => (
                    <div key={t.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-4 font-medium text-slate-600">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full ${t.image} flex items-center justify-center font-extrabold text-white text-sm shrink-0`}>
                          {t.name.charAt(0)}
                        </div>
                        <div className="space-y-0.5">
                          <strong className="text-slate-900 font-extrabold text-sm sm:text-base leading-tight block">{t.name}</strong>
                          <p className="text-xs text-slate-500">{t.role} • Tajriba: {t.experience}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteTeacher(t.id)}
                        type="button"
                        className="p-2.5 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-xl border border-slate-200 hover:border-rose-200 transition-all cursor-pointer"
                        title="Ustozni jamoadan o'chirish"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
