import React from 'react';
import { Send, Sparkles, MessageCircle, ClipboardCheck, Trophy, ArrowRight, CheckCircle, RefreshCw } from 'lucide-react';
import { Course, QuizQuestion } from '../types';

interface AIAssistantTabProps {
  courses: Course[];
  setActiveTab: (tab: string) => void;
  setSelectedCourseId: (id: string) => void;
  phone: string;
  quizQuestions?: QuizQuestion[];
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export default function AIAssistantTab({ courses, setActiveTab, setSelectedCourseId, phone, quizQuestions = [] }: AIAssistantTabProps) {
  // Modes: Chat vs Test
  const [activeSubMode, setActiveSubMode] = React.useState<'chat' | 'test'>('chat');

  // Chat States
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "Salom! 🇬🇧 Yuksalish English Academy sun'iy intellekt maslahat markaziga xush kelibsiz. Men sizga kerakli darslar, narxlar, dars jadvali, IELTS imtihoni sirlari yoki darajangizga mos guruhlarni tanlashda yordam beraman. Quyidagi tayyor savollardan birini tanlang yoki o'z savolingizni yozing!",
      timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  // Quick Chat templates
  const quickQuestions = [
    { text: "Kurslar qachon va qayerda boshlanadi?", response: "🏢 Oflayn darslarimiz har dushanba yangi ochiluvchi guruhlar asosida Toshkent shahri Novza metro yaqinida (Bunyodkor ko'chasi, 42-uy) joylashgan shinam bino filialiimizda bo'lib o'tadi. Onlayn darslarimiz esa haftasiga 3-4 marotaba zoom va maxsus video darsliklar platformasida jonli efirlarda o'tiladi. Yangi guruhga bugun ro'yxatdan o'tishingiz mumkin!" },
    { text: "IELTS Standard kursi narxi va shartlari?", response: "🎓 IELTS Standard (Sardor Alimov guruhi) oflayn kursi haftasiga 3 marta 2 soatdan asosiy dars, har kuni bepul qo'shimcha Support Teacher ko'rishi va haftalik juma kungi mock imtihonlarni ta'minlaydi. To'lovi oyiga 650,000 so'm. O'quvchilarimiz odatda 4 oy davomida tayyorlanib, 7.5 va 8.0 ballarni olishga muvaffaq bo'lishgan." },
    { text: "Haftalik o'quv natijalari va kafolat bormi?", response: "🏆 Yuksalish Academy - faqat ingliz tiliga ixtisoslashgan yagona professional markaz. Shuning uchun bizda o'quvchilar 100% ingliz muhitida o'rganadilar. Uyga vazifalar support tizimida nazorati o'tiladi. Agar o'quvchi barcha dars va mocklarda muntazam qatnashsa, u o'z IELTS maqsadiga yetishiga 100% yuridik va o'quv kafolat beramiz." },
    { text: "Har haftalik bepul Mock test kimlar uchun?", response: "📝 Bizda har yakshanba yoki juma kunlari haqiqiy Cambridge / IDP formatidagi Mock imtihonlari o'tkaziladi. Bu test barcha rasmiy o'quvchilarimiz uchun mutlaqo bepul. Unda Listening (naushniklarda), Reading, Writing va Speaking shaxsan ustozlarimiz tomonidan tekshirilib, xatoliklar darsda tahlil qilinadi." }
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and custom reply
    setTimeout(() => {
      let aiText = "Tushunarli! Sizning ingliz tilini o'rganishga bo'lgan ishtiyoqingiz juda ajoyib. Yuksalish Academy guruhlari aynan sizning darajangiz uchun mo'ljallangan. Batafsil ma'lumot olish yoki sinov darsimizga yozilish uchun administratorlarimiz bilan bevosita bog'lanishingiz mumkin. Yoki 'Ro'yxatdan o'tish' bo'limida telefon raqamingizni qoldiring, 10 daqiqada siz bilan aloqaga chiqamiz.";
      
      // Match key phrases
      const lowerText = textToSend.toLowerCase();
      if (lowerText.includes('narx') || lowerText.includes('pul') || lowerText.includes('to\'lov')) {
        aiText = "💰 Bizning akademiyamizda dars turlari va to'lovlari quyidagicha:\n- IELTS Standard (Offline): 650,000 so'm / oy\n- IELTS Rockets (Online): 490,000 so'm / oy\n- General English Offline: 550,000 so'm / oy\n- General English Online: 380,000 so'm / oy\n- Kids English Offline: 450,000 so'm / oy\nBarcha oflayn darslarimizda darsdan so'ng bepul Support Teacher va haftalik Mock testlar narx ichiga kiritilgan.";
      } else if (lowerText.includes('manzil') || lowerText.includes('metro') || lowerText.includes('qayerda')) {
        aiText = "📍 Yuksalish English Academy bosh ofisi Toshkent shahri, Chilonzor tumani, Bunyodkor ko'chasi, 42-uyda joylashgan (Mo'ljal: Novza metrosi ro'parasida, ko'chaga qaragan bino). Telefonimiz: " + phone + ". Dushanbadan yakshanbagacha soat 09:00 dan 21:00 gacha eshiklarimiz ochiq, mehmon bo'lib ko'rishingiz mumkin!";
      } else if (lowerText.includes('tel') || lowerText.includes('aloqa') || lowerText.includes('nomer')) {
        aiText = "📞 Biz bilan bog'lanish uchun istalgan vaqtda " + phone + " raqamiga qo'ng'iroq qilishingiz mumkin. Shuningdek, 'Ro'yxatdan o'tish' sahifasida raqamingizni qoldirsangiz, mutaxassislarimiz tekin konsultatsiya berish uchun qo'ng'iroq qilishadi.";
      } else if (lowerText.includes('ielts')) {
        aiText = "🎯 IELTS kurslarimiz bizning eng kuchli yo'nalishimiz siridir. Har yakshanba bepul mock imtihon topshirilishi va faqat oxirgi imtihon savollarining tahlil qilinishi hisobiga o'quvchilar kamida IELTS 7.0 dan 8.5 gacha ball oladilar. Lead Master ustozimiz Sardor Alimov (IELTS 8.5) dars dasturlarini shaxsan nazorat qiladilar.";
      }

      const aiMsg: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  // Test System States
  // Dynamic randomized quiz preparation (scrambles questions and options)
  const prepareRandomizedQuiz = React.useCallback((questions: QuizQuestion[]): QuizQuestion[] => {
    if (!questions || questions.length === 0) return [];

    // Clone & Shuffle Questions (Fisher-Yates)
    const shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }

    // Shuffle options of each question and keep index correct
    return shuffledQuestions.map((q) => {
      const originalOptions = q.options || [];
      const correctOptionText = originalOptions[q.correctIndex] || "";

      // Scramble options
      const shuffledOptions = [...originalOptions];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }

      // Re-find correct index
      const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);

      return {
        ...q,
        options: shuffledOptions,
        correctIndex: newCorrectIndex !== -1 ? newCorrectIndex : 0
      };
    });
  }, []);

  const [activeQuestions, setActiveQuestions] = React.useState<QuizQuestion[]>([]);

  // Initialize or re-scramble questions when sub-mode moves to "test" or quizQuestions changes
  React.useEffect(() => {
    if (activeSubMode === 'test' && quizQuestions.length > 0) {
      setActiveQuestions(prepareRandomizedQuiz(quizQuestions));
    }
  }, [activeSubMode, quizQuestions, prepareRandomizedQuiz]);

  const [currentQIndex, setCurrentQIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<number[]>([]);
  const [showTestResults, setShowTestResults] = React.useState(false);
  const [testScore, setTestScore] = React.useState(0);

  const handleSelectOption = (optIndex: number) => {
    setSelectedAnswers(prev => [...prev, optIndex]);
    if (optIndex === activeQuestions[currentQIndex]?.correctIndex) {
      setTestScore(score => score + 1);
    }

    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setShowTestResults(true);
    }
  };

  const handleResetTest = () => {
    setActiveQuestions(prepareRandomizedQuiz(quizQuestions));
    setCurrentQIndex(0);
    setSelectedAnswers([]);
    setShowTestResults(false);
    setTestScore(0);
  };

  // Determine course recommendation based on score percentage
  const getRecommendation = () => {
    const total = activeQuestions.length || 5;
    const scorePercentage = total > 0 ? (testScore / total) * 100 : 0;

    if (scorePercentage <= 30) {
      return {
        level: "Beginner - Elementary (A1/A2)",
        title: "General English Complete (Pre-Int)",
        id: "gen-std-offline",
        desc: "Sizga ingliz tilida erkin so'zlashish qoidalarini, so'z yodlash va zamonlarni noldan boshlab kuchli asos bilan o'rganishni tavsiya qilamiz. Bu kurs sizda mustahkam poydevor quradi."
      };
    } else if (scorePercentage <= 70) {
      return {
        level: "Intermediate (B1/B2)",
        title: "IELTS Standard (Inter dan boshlab)",
        id: "ielts-std",
        desc: "Sizda ingliz tilining asosiy qoidalari bor. Endi esa bevosita IELTS formatidagi darslarni (Writing, Speaking, Mock testlar) boshlash vaqti keldi! Bu kurs sizga kamida IELTS 7.0 ballini berishga mo'ljallangan."
      };
    } else {
      return {
        level: "Upper-Intermediate - Advanced (CEFR C1)",
        title: "Advanced Speaking & Academic Writing",
        id: "academic-speaking",
        desc: "Mukammal akademik daraja! Sizga maxsus advanced iboralar va akademik tezislar yozishni o'rgatuvchi intensiv darslarimiz mos keladi. Universitet granti yoki IELTS 8.0 ballini qo'lga kiritish davri keldi."
      };
    }
  };

  const recommendedCourse = getRecommendation();

  return (
    <div className="space-y-10 pb-16 animate-fadeIn" id="ai-assistant-tab-container">
      
      {/* 1. Header with Tab selection */}
      <div className="text-center max-w-2xl mx-auto space-y-4" id="ai-tab-header">
        <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full flex items-center gap-1 w-fit mx-auto">
          <Sparkles className="h-3 w-3 animate-pulse" />
          INTERAKTIV MARKAZ
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          AI Maslahatchi & Daraja Testi
        </h1>
        <p className="text-slate-500 text-sm">
          Akademiyamizning innovatsion texnologiyalari yordamida tekin ingliz tili daraja testini topshiring yoki o'quv markaz darslari bo'yicha tekin maslahat oling!
        </p>

        {/* Sub-tab chooser buttons */}
        <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 mt-4">
          <button
            onClick={() => setActiveSubMode('chat')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer
              ${activeSubMode === 'chat' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
              }
            `}
          >
            <MessageCircle className="h-4 w-4 text-amber-500 animate-pulse" />
            Yuksalish AI Maslahat
          </button>
          <button
            onClick={() => setActiveSubMode('test')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer
              ${activeSubMode === 'test' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
              }
            `}
          >
            <ClipboardCheck className="h-4 w-4 text-emerald-500" />
            Tekin Level Test
          </button>
        </div>
      </div>

      {/* 2. CHAT BOT MODE */}
      {activeSubMode === 'chat' && (
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8" id="chat-mode-area">
          
          {/* Left instructions / quick-asks */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm tracking-wider uppercase">Tezkor so'rovlar</h3>
              <p className="text-xs text-slate-400">Tez va oson ma'lumot olish uchun quyidagi standart savollardan birini bosing:</p>
              
              <div className="space-y-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputText(q.text);
                      handleSendMessage(q.text);
                    }}
                    className="w-full text-left p-3 bg-slate-50 hover:bg-amber-500/10 hover:border-amber-500/40 text-xs text-slate-700 hover:text-amber-900 font-semibold border border-slate-200 rounded-xl transition-all cursor-pointer"
                  >
                    💡 {q.text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Window container */}
          <div className="lg:col-span-8 flex flex-col h-[500px] bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
            
            {/* Chat header */}
            <div className="bg-slate-950 p-4 border-b border-slate-850 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-xl text-slate-950 animate-pulse">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">Yuksalish AI Advisor</h4>
                  <span className="text-[10px] text-emerald-500 flex items-center gap-1 font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Hozir faol (Online)
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Ver 2.5 API</span>
            </div>

            {/* Message Feed list */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin">
              {messages.map((m) => {
                const isAI = m.sender === 'ai';
                return (
                  <div key={m.id} className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm space-y-1 shadow-sm leading-relaxed
                      ${isAI 
                        ? 'bg-slate-850 text-slate-200 border border-slate-800' 
                        : 'bg-amber-500 text-slate-950 font-semibold'
                      }
                    `}>
                      <p className="whitespace-pre-line">{m.text}</p>
                      <span className={`block text-[9px] text-right 
                        ${isAI ? 'text-slate-500' : 'text-slate-800'}
                      `}>
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 text-slate-400 text-xs flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-bounce"></span>
                      <span className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                    AI yozmoqda...
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-slate-950 border-t border-slate-850 flex gap-2">
              <input
                type="text"
                placeholder="Bu yerga darslar yoki IELTS haqidagi savolingizni yozing..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage(inputText);
                }}
                className="flex-1 bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-550"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                className="px-4.5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl transition-all cursor-pointer"
              >
                <Send className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* 3. TEST PLACEMENT MODE */}
      {activeSubMode === 'test' && (
        <div className="max-w-3xl mx-auto bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-sm" id="test-mode-area">
          
          {activeQuestions.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <RefreshCw className="h-8 w-8 text-amber-500 animate-spin mx-auto" />
              <p className="text-slate-500 text-sm font-medium">Test savollari yuklanmoqda...</p>
            </div>
          ) : !showTestResults ? (
            /* ACTIVE QUIZ SCREEN */
            <div className="space-y-6">
              
              {/* Progress visual */}
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">INGLIZ TILI DARAJA TESTI</span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">Savol: {currentQIndex + 1} / {activeQuestions.length}</h3>
                </div>
                <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300" 
                    style={{ width: `${((currentQIndex + 1) / activeQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Active question */}
              <div className="space-y-4">
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {activeQuestions[currentQIndex]?.q}
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  {activeQuestions[currentQIndex]?.options.map((opt, iconIdx) => (
                    <button
                       key={iconIdx}
                      onClick={() => handleSelectOption(iconIdx)}
                      className="w-full text-left px-5 py-4 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold border border-slate-200 hover:border-amber-500 rounded-xl text-xs sm:text-sm flex items-center justify-between group transition-all cursor-pointer"
                    >
                      <span>{opt}</span>
                      <ArrowRight className="h-4 w-4 text-slate-350 group-hover:text-amber-500 transition-all opacity-0 group-hover:opacity-100 transform translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-400 italic text-center pt-4">
                * To'g'ri javoblarga ko'ra oxirida sizga eng mos IELTS / CEFR guruhi tavsiya qilinadi.
              </div>

            </div>
          ) : (
            /* RESULTS SCREEN WITH PATHWAYS SUGGESTION */
            <div className="space-y-8 animate-fadeIn text-center">
              
              <div className="space-y-3">
                <div className="h-16 w-16 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white mx-auto shadow-md">
                  <Trophy className="h-8 w-8 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Sizning testingiz yakunlandi!</h3>
                <p className="text-slate-500 text-sm">
                  To'g'ri javoblar soni: <strong className="text-slate-900 font-extrabold">{testScore} ta</strong> (savollar jami: {activeQuestions.length}).
                </p>
              </div>

              {/* Recommendation card */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 text-left space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">ANIQLANGAN LEVEL</span>
                    <strong className="text-base sm:text-lg font-black text-slate-900">{recommendedCourse.level}</strong>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 text-xs font-bold rounded-lg uppercase">
                    Muvaffaqiyatli
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">TAVSIYA ETiLAYOTGAN KURS</span>
                  <h4 className="text-lg font-extrabold text-amber-600 font-sans leading-tight">{recommendedCourse.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {recommendedCourse.desc}
                  </p>
                </div>

                <div className="bg-white border border-slate-100 p-4 rounded-xl flex items-start gap-2 text-xs text-slate-500">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Siz ushbu guruhga yozilish orqali noldan boshlab ingliz tilidagi barcha xalqaro IELTS talablarini ustoz bilan haftalik Mock va Support Teacher yordamida kafolatlangan reja asosida o'rganasiz.</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleResetTest}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-100 text-slate-700 hover:text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Testni qayta topshirish
                </button>
                <button
                  onClick={() => {
                    setSelectedCourseId(recommendedCourse.id);
                    setActiveTab('apply');
                  }}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Tavsiya etilgan darsga yozilish <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
