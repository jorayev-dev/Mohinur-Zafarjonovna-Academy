import { Course, Teacher, Result, EnrollmentApplication, CenterConfig, DatabaseSchema, StudentProgress, QuizQuestion } from './types';

export const DEFAULT_CONFIG: CenterConfig = {
  centerName: "Mohinur Zafarjonovna Academy",
  motto: "Professional CEFR darslari hamda yangi qo'shilgan yuqori natijali intensiv IELTS guruhlari!",
  description: "Mohinur Zafarjonovna Academy - faqat ingliz tiliga ixtisoslashgan va asosan CEFR milliy darajalari (B1, B2, C1) hamda endilikda yangi tashkil etilgan xalqaro IELTS darslariga tayyorlovchi zamonaviy o'quv dargohidir. 1000 dan ortiq muvaffaqiyatli bitiruvchilarimiz milliy sertifikatlar va yuqori IELTS natijalarini qo'lga kiritgan.",
  address: "Toshkent shahri, Chilonzor tumani, Bunyodkor ko'chasi, 42-uy (Novza metrosi va Novza machiti yaqinida)",
  phone: "+998 90 123 45 67",
  email: "info@mohinur-academy.uz",
  telegramChannel: "https://t.me/mohinur_zafarjonovna_academy",
  telegramPersonal: "https://t.me/mohinur_academy_admin",
  instagram: "https://instagram.com/mohinur_zafarjonovna_academy",
  youtube: "https://youtube.com/c/mohinur_zafarjonovna_academy",
  studentCount: 1250,
  successCount: 395,
  averageScore: "C1 / IELTS 7.5"
};

export const INITIAL_COURSES: Course[] = [
  {
    id: "cefr-b2-master",
    title: "CEFR B2 Complete (Milliy Sertifikat)",
    description: "Milliy va xalqaro attestatsiya hamda oliy o'quv yurtlariga kirishda imtiyoz beruvchi B2 sertifikatiga tayyorlash kursi. Darslar asosan CEFR leksikasi, tinglab tushunish va gapirish ko'nikmasiga qaratilgan va har hafta yangi mock sinovlari o'tkaziladi.",
    price: 500000,
    duration: "4 oy",
    category: "CEFR",
    format: "offline",
    lessonsPerWeek: 3,
    teacherName: "Mohinur Zafarjonovna",
    level: "Intermediate (B1) dan boshlab",
    skillsLearned: [
      "B2 darajadagi leksika va murakkab gap qoliplari",
      " Listening, Reading, Writing hamda Speaking bo'limlari chuqur tahlili",
      "Milliy davlat test tizimi (DTM) doirasidagi topshiriqlar yetish sirlari",
      "Haqiqiy sertifikat egalari bilan Speaking simulyatsiyalari"
    ]
  },
  {
    id: "cefr-c1-intensive",
    title: "CEFR C1 Advanced Masterclass",
    description: "Pedagoglar, abituriyentlar va ingliz tilini mukammal biluvchilar uchun mo'ljallangan oliy darajali C1 sertifikati kursi. Har yakshanba bepul qo'shimcha muloqot va real imtihon tahlillari taqdim etiladi.",
    price: 580000,
    duration: "3 oy",
    category: "CEFR",
    format: "offline",
    lessonsPerWeek: 3,
    teacherName: "Mohinur Zafarjonovna",
    level: "Upper-Intermediate (B2) +",
    skillsLearned: [
      "Oliy akademik darajadagi Advanced lug'atlar to'plami",
      "CEFR Writing bo'limining professional tahriri va insholar",
      "Og'zaki imtihondagi kutilmagan va murakkab savollarga ideal javoblar",
      "Maksimal ball uchun tahliliy eshitib-tushunish mashqlari"
    ]
  },
  {
    id: "ielts-std",
    title: "IELTS Standard (YANGI / ENDI QO'SHILDI)",
    description: "Akademiya hayotida yangi boshlangan xalqaro IELTS kursi! Barcha ko'nikmalarni (Writing, Speaking, Reading, Listening) mukammal tarzda noldan o'rganish hamda haftalik haqiqiy mock testlar topshirish. Yangi professional IELTS coachlari nazoratida.",
    price: 650000,
    duration: "4 oy",
    category: "IELTS",
    format: "offline",
    lessonsPerWeek: 3,
    teacherName: "Sardor Alimov",
    level: "Intermediate +",
    skillsLearned: [
      "IELTS Essay turlari va optimal yozish strukturasi",
      "Speaking Part 1, 2 va 3 uchun tezkor iboralar va idiomalar",
      "Reading scan va skim qilish, savollarga tezkor javob topish",
      "Listening accent va spelling xatoliklar ustida ishlash"
    ]
  },
  {
    id: "ielts-rockets",
    title: "IELTS Rockets Online Intensive (YANGI SAVDO)",
    description: "IELTS darslari endi yangidan qoshilganligi sababli, masofadan o'qishni xohlovchilar uchun maxsus jonli efirli Rockets onlayn kursi. Vaqti cheklangan va tez fursatda IELTS topshiruvchilarga mo'ljallangan.",
    price: 490000,
    duration: "2.5 oy",
    category: "IELTS",
    format: "online",
    lessonsPerWeek: 4,
    teacherName: "Kamola Shodiyeva",
    level: "Upper-Intermediate",
    skillsLearned: [
      "25+ Akademik qoliplar va murakkab gap turlari",
      "Band 8+ darajasi uchun advanced grammatika darslari",
      "Real vaqtda Speaking mock tahlillari",
      "Ekspertlar tomonidan cheksiz essey tekshiruvlari"
    ]
  },
  {
    id: "gen-std-offline",
    title: "General English Complete (CEFR poydevori)",
    description: "Ingliz tili darajangizni kuchli gapirish va eshitish asosida noldan oshirib borish kursi. Keyinchalik CEFR va IELTS guruhlariga o'tish uchun mukammal poydevor.",
    price: 450000,
    duration: "3 oy",
    category: "General English",
    format: "offline",
    lessonsPerWeek: 3,
    teacherName: "Bekzod Umarov",
    level: "Elementary -> Pre-Intermediate",
    skillsLearned: [
      "Kundalik va rasmiy muloqot, nutq ravonligi",
      "Yozma va og'zaki fikr bildirish qoidalari",
      "Lug'at boyligini 2000+ yangi so'zlarga ko'paytirish",
      "Asosiy ingliz tili zamonlari va kelishiklari"
    ]
  },
  {
    id: "gen-online",
    title: "General English Standard Online",
    description: "Moslashuvchan jadval asosida masofadan turib ingliz tilini o'rganish istagidagi o'quvchilar uchun. Maxsus video-darsliklar, interaktiv topshiriqlar va video aloqa.",
    price: 350000,
    duration: "4 oy",
    category: "General English",
    format: "online",
    lessonsPerWeek: 3,
    teacherName: "Rayhona Karimova",
    level: "Beginner dan boshlab",
    skillsLearned: [
      "O'zbekchadan inglizchaga tezkor tarjima qilish ko'nikmasi",
      "Eshitish tushunish darslari va subtitle audio tahlili",
      "Nutqdagi xatoliklarni bartaraf etish",
      "Weekly live chat va guruh muloqotlari"
    ]
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: "t1",
    name: "Sardor Alimov",
    role: "Lead IELTS Master Trainer",
    ieltsScore: "8.5",
    experience: "8 yil",
    bio: "Buyuk Britaniyadagi uzoq muddatli pedagogik master-klass va tajribaga ega. O'zbekistonda 500 dan ortiq o'quvchilarga IELTS 7.5 va undan yuqori natijalarini olishda bevosita ustozlik qilgan. Yuksalish o'quv markazining asosiy o'quv metodologi.",
    image: "bg-gradient-to-tr from-amber-500 to-yellow-600",
    achievements: [
      "O'zining IELTS balli 8.5 (Listening: 9.0, Reading: 9.0)",
      "C2 darajali pedagogik sertifikat sohibi",
      "150+ dan ortiq talabasi Westminster va boshqa xalqaro universitetlarda grant sohibidir"
    ]
  },
  {
    id: "t2",
    name: "Kamola Shodiyeva",
    role: "Senior Online Coach & IELTS expert",
    ieltsScore: "8.0",
    experience: "6 yil",
    bio: "Onlayn ta'lim platformalari va masofaviy o'qitish interaktiv metodlarining mutaxassisi. Darslari juda ham qiziqarli o'tishi va o'quvchilar yozma ishlarini skanerdek tahlil qilishi bilan tanilgan.",
    image: "bg-gradient-to-tr from-emerald-500 to-teal-600",
    achievements: [
      "IELTS 8.0 ball",
      "Onlayn dars berish bo'yicha maxsus raqamli metodika muallifi",
      "90% dan ortiq onlayn o'quvchilari IELTS 7.0+ ga erishgan"
    ]
  },
  {
    id: "t3",
    name: "Bekzod Umarov",
    role: "Head of General English Dept.",
    ieltsScore: "8.0",
    experience: "7 yil",
    bio: "Noldan boshlab ingliz tili o'rganuvchilarni qisqa muddatda tushunish va suhbatlashish bosqichiga chiqarishda ajoyib metodikaga ega. Grammatikani hech qanday murakkab formulalarsiz oson tushuntiradi.",
    image: "bg-gradient-to-tr from-sky-500 to-indigo-600",
    achievements: [
      "IELTS 8.0 ball",
      "Kattalar uchun General English darsligini uyg'unlashtirgan muallif",
      "Shogirdlarining 320 nafari keyinchalik IELTS ixtisoslashuviga o'tib, 7+ ball olgan"
    ]
  },
  {
    id: "t4",
    name: "Madina Tursunova",
    role: "Kids Course Specialist",
    ieltsScore: "7.5 (C1)",
    experience: "5 yil",
    bio: "Bolalar psixologiyasi va ularni chet tillariga qiziqtirish bo'yicha nufuzli kurslar bitiruvchisi. darslarida turli teatrlashtirilgan o'yinlar va qiziqarli vizual dasturlardan foydalanadi.",
    image: "bg-gradient-to-tr from-pink-500 to-rose-600",
    achievements: [
      "Cambridge TKT (Teaching Knowledge Test) sertifikati",
      "Kelajak Yoshlari o'quv loyihasining bosh tashkilotchisi",
      "100 dan ortiq bolalarda mustaqil gapirish qobiliyatini ilk oylardanoq shakllantirgan"
    ]
  }
];

export const INITIAL_RESULTS: Result[] = [
  {
    id: "r1",
    studentName: "Asadbek Temirov",
    score: "IELTS 8.5",
    type: "IELTS",
    subjectDetails: "Listening 9.0, Reading 9.0, Writing 7.5, Speaking 8.0",
    originRegion: "Toshkent",
    details: "Yuksalish Academyda 6 oy tayyorlandi. WIUT (Westminster) universitetiga 100% davlat granti sohibi bo'ldi.",
    year: "2025",
    avatarStyle: "from-blue-600 to-indigo-600"
  },
  {
    id: "r2",
    studentName: "Madina Islomova",
    score: "IELTS 8.0",
    type: "IELTS",
    subjectDetails: "Listening 8.5, Reading 8.5, Writing 7.0, Speaking 8.0",
    originRegion: "Samarqand",
    details: "IELTS rockets onlayn kurslarimizda qatnashgan. NYU Abu Dhabi (Abu Dabi Nyu-York Universiteti) to'liq grant sohibasi bo'ldi.",
    year: "2026",
    avatarStyle: "from-teal-500 to-emerald-600"
  },
  {
    id: "r3",
    studentName: "Dilshodbek Rayimov",
    score: "IELTS 8.0",
    type: "IELTS",
    subjectDetails: "Listening 9.0, Reading 8.0, Writing 7.0, Speaking 7.5",
    originRegion: "Buxoro",
    details: "Offline darslarda Sardor Alimov guruhida o'qigan. Webster University Toshkent filialiga o'qishga kirdi.",
    year: "2025",
    avatarStyle: "from-amber-500 to-orange-600"
  },
  {
    id: "r4",
    studentName: "Shahzoda Aliyeva",
    score: "CEFR C1",
    type: "CEFR",
    subjectDetails: "Yozma imtihon: 68/75, Og'zaki nutq: 23/25",
    originRegion: "Namangan",
    details: "C1 tayyorlov kursimizni 3 oy o'qidi. O'zbekiston Davlat Jahon Tillari Universitetiga grand asosida kirdi.",
    year: "2026",
    avatarStyle: "from-pink-500 to-purple-600"
  },
  {
    id: "r5",
    studentName: "Shaxbozbek Xasanov",
    score: "IELTS 8.5",
    type: "IELTS",
    subjectDetails: "Listening 9.0, Reading 8.5, Writing 8.0, Speaking 8.0",
    originRegion: "Toshkent",
    details: "Standard IELTS kurslarimizda 5 oy tajriba to'pladi. Inha Universiteti bepul ta'lim grantiga loyiq topildi.",
    year: "2025",
    avatarStyle: "from-cyan-500 to-blue-600"
  },
  {
    id: "r6",
    studentName: "Rayhona Odilova",
    score: "IELTS 8.0",
    type: "IELTS",
    subjectDetails: "Listening 8.0, Reading 9.0, Writing 7.0, Speaking 7.5",
    originRegion: "Andijon",
    details: "Online darslar orqali IELTS balligini 6.0 dan 8.0 ga chiqardi. MDIST (Singapur menejmentni rivojlantirish instituti) talabasi.",
    year: "2026",
    avatarStyle: "from-violet-500 to-fuchsia-600"
  },
  {
    id: "r7",
    studentName: "Jasurbek Yoqubov",
    score: "CEFR C1",
    type: "CEFR",
    subjectDetails: "Eshitish: 28/30, O'qish: 29/30, Gapirish va Yozma: Professional",
    originRegion: "Farg'ona",
    details: "Grammar Intensive va CEFR tayyorgarligi qatnashchisi. Toshkent Davlat Yuridik Universitetiga kirdi.",
    year: "2025",
    avatarStyle: "from-green-600 to-teal-700"
  },
  {
    id: "r8",
    studentName: "Kamola Solihova",
    score: "IELTS 7.5",
    type: "IELTS",
    subjectDetails: "Listening 8.0, Reading 7.5, Writing 6.5, Speaking 7.5",
    originRegion: "Jizzax",
    details: "General English kurslarimizni tugatib, bevosita IELTS master-kursimizga yozildi. Milliy Universitet kirdi.",
    year: "2025",
    avatarStyle: "from-red-500 to-pink-600"
  },
  {
    id: "r9",
    studentName: "Bekzod Tojiyev",
    score: "IELTS 7.5",
    type: "IELTS",
    subjectDetails: "Listening 7.5, Reading 8.0, Writing 7.0, Speaking 7.5",
    originRegion: "Xorazm",
    details: "Online pre-IELTS va IELTS standard darslaridan foydalandi. Toshkent Axborot Texnologiyalari Universiteti (TATU) talabasi.",
    year: "2026",
    avatarStyle: "from-emerald-600 to-cyan-600"
  },
  {
    id: "r10",
    studentName: "Farangiz Nabiyeva",
    score: "IELTS 8.0",
    type: "IELTS",
    subjectDetails: "Listening 8.5, Reading 8.0, Writing 7.5, Speaking 8.0",
    originRegion: "Samarqand",
    details: "Yuksalish o'quv materiallari hamda interaktiv guruhlari orqali tayyorlanib, Singapur Menejment Institutiga qabul qilindi.",
    year: "2025",
    avatarStyle: "from-sky-600 to-indigo-700"
  },
  {
    id: "r11",
    studentName: "Abbosbek Ergashev",
    score: "IELTS 8.5",
    type: "IELTS",
    subjectDetails: "Listening 9.0, Reading 9.0, Writing 7.5, Speaking 8.5",
    originRegion: "Toshkent",
    details: "Sardorbek Alimovning shaxsiy mentorlik sinfidagi o'quvchi. Prezidentlik stipendianti bo'lib o'qishga qabul qilindi.",
    year: "2026",
    avatarStyle: "from-amber-600 to-red-600"
  },
  {
    id: "r12",
    studentName: "Mohinur Toirova",
    score: "IELTS 7.0",
    type: "IELTS",
    subjectDetails: "Listening 7.5, Reading 7.0, Writing 6.5, Speaking 7.0",
    originRegion: "Qashqadaryo",
    details: "Toshkent filialimizga ko'chib kelib offline ravishda 4 oy o'qidi. Westminster Universiteti talabasi bo'ldi.",
    year: "2025",
    avatarStyle: "from-fuchsia-500 to-rose-600"
  },
  {
    id: "r13",
    studentName: "Sherzod G'ofurov",
    score: "CEFR C1",
    type: "CEFR",
    subjectDetails: "CEFR ball markazi: 65 ball",
    originRegion: "Navoiy",
    details: "Onlayn guruhimizda qatnashib CEFR muvaffaqiyatiga yetdi va milliy universitetning davlat grandiga ega bo'ldi.",
    year: "2025",
    avatarStyle: "from-teal-600 to-blue-700"
  },
  {
    id: "r14",
    studentName: "Sevinch Po'latova",
    score: "IELTS 7.5",
    type: "IELTS",
    subjectDetails: "Listening 8.5, Reading 7.5, Writing 6.5, Speaking 7.0",
    originRegion: "Sirdaryo",
    details: "Toshkent shahridagi yotoqxona va intensiv darslarimiz orqali ta'lim oldi. Webster universiteti grant sohibasi.",
    year: "2026",
    avatarStyle: "from-violet-600 to-purple-700"
  },
  {
    id: "r15",
    studentName: "Azizbek Qodirov",
    score: "IELTS 8.0",
    type: "IELTS",
    subjectDetails: "Listening 8.5, Reading 8.5, Writing 7.0, Speaking 8.0",
    originRegion: "Toshkent",
    details: "Pre-IELTS va IELTS guruhlarimizda jami 8 oy tayyorlandi. Amity Universiteti grant asosida qabul qilindi.",
    year: "2025",
    avatarStyle: "from-emerald-500 to-blue-600"
  }
];

export const INITIAL_APPLICATIONS: EnrollmentApplication[] = [
  {
    id: "app-1",
    studentName: "Shohruxbek Qosimov",
    phone: "+998 90 987 65 43",
    courseId: "ielts-std",
    courseTitle: "IELTS Standard (Offline)",
    format: "offline",
    status: "new",
    createdAt: "2026-05-20T10:30:00Z"
  },
  {
    id: "app-2",
    studentName: "Nozima G'aniyeva",
    phone: "+998 91 111 22 33",
    courseId: "ielts-rockets",
    courseTitle: "IELTS Rockets Online Intensive",
    format: "online",
    status: "contacted",
    note: "Telegram orqali suhbat qilindi. Onlayn jonli efir darajasiga qiziqmoqda.",
    createdAt: "2026-05-21T08:15:00Z"
  },
  {
    id: "app-3",
    studentName: "Sardorbek Alimov",
    phone: "+998 94 444 55 66",
    courseId: "gen-std-offline",
    courseTitle: "General English Complete (Pre-Int)",
    format: "offline",
    status: "approved",
    note: "Suhbatdan o'tdi, dushanba-chorshanba-juma soat 14:00 darslariga qo'shildi. To'lov to'liq amalga oshirilgan.",
    createdAt: "2026-05-21T12:00:00Z"
  }
];

export const INITIAL_STUDENTS: StudentProgress[] = [
  {
    id: "stu-1",
    studentName: "Asilbek Nabiyev",
    phone: "+998 99 888 77 66",
    courseId: "cefr-b2-master",
    courseTitle: "CEFR B2 Complete (Milliy Sertifikat)",
    teacherName: "Mohinur Zafarjonovna",
    attendance: 96,
    homeworks: 92,
    vocabulary: 88,
    currentTopic: "CEFR Reading Part 4: Matching headings and gap completion",
    lessonsCompleted: 24,
    totalLessons: 48,
    upcomingMocks: [
      {
        id: "mock-1",
        title: "CEFR B2 Mock Exam (DTM Standarti)",
        date: "2026-05-28",
        time: "09:30",
        status: "registered"
      }
    ],
    mockHistory: [
      {
        title: "CEFR Entry Diagnostic Test",
        date: "2026-04-12",
        reading: "B1",
        listening: "B1+",
        writing: "B1",
        speaking: "B1+",
        overall: "B1"
      },
      {
        title: "CEFR Monthly Mock Progress",
        date: "2026-05-02",
        reading: "B2",
        listening: "B1+",
        writing: "B2",
        speaking: "B2",
        overall: "B2"
      }
    ],
    teacherNotes: "Mohinur Zafarjonovna: 'Asilbek darslarda juda faol va intiluvchan. Reading bo'limidagi sarlavhalarni topish ustida ko'proq mashq qiling, insholaringizdagi grammatika ancha yaxshilandi!'"
  },
  {
    id: "stu-2",
    studentName: "Malika Rustamova",
    phone: "+998 93 456 78 90",
    courseId: "ielts-std",
    courseTitle: "IELTS Standard (YANGI / ENDI QO'SHILDI)",
    teacherName: "Sardor Alimov",
    attendance: 92,
    homeworks: 85,
    vocabulary: 90,
    currentTopic: "IELTS Writing Task 2: Opinion Essays and paragraph planning",
    lessonsCompleted: 15,
    totalLessons: 48,
    upcomingMocks: [
      {
        id: "mock-2",
        title: "IELTS Full Mock Test (Listening, Reading, Writing, Speaking)",
        date: "2026-05-30",
        time: "14:00",
        status: "registered"
      }
    ],
    mockHistory: [
      {
        title: "IELTS Diagnostic Exam",
        date: "2026-04-20",
        reading: "6.0",
        listening: "6.5",
        writing: "5.5",
        speaking: "6.0",
        overall: "6.0"
      },
      {
        title: "IELTS Standard Mock #1",
        date: "2026-05-10",
        reading: "6.5",
        listening: "7.5",
        writing: "6.0",
        speaking: "6.5",
        overall: "6.5"
      }
    ],
    teacherNotes: "Sardor Alimov: 'Malika, Listening qobiliyatingiz hamda Speaking nutqingiz juda tabiiy chiqmoqda. Writing Task 2-da argumentlarni mustahkamroq ifodalash uchun ko'proq ilmiy iboralar va idiomalar ishlating.'"
  }
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q-1",
    q: "She ___ to the library to study English every afternoon.",
    options: ["go", "goes", "going", "gone"],
    correctIndex: 1,
    explanation: "Uchinchi shaxs birlikda (She/He/It) Present Simple zamonida fe'lga '-es' qo'shiladi: 'goes'."
  },
  {
    id: "q-2",
    q: "If I ___ enough free time, I would join the Academic Writing classes.",
    options: ["have", "had", "will have", "have had"],
    correctIndex: 1,
    explanation: "Conditional Sentence type II (tasavvurdagi kelajak): If + Past Simple, would + Verb. 'had' to'g'ri javob."
  },
  {
    id: "q-3",
    q: "By the time the professor entered, the students ___ writing the essay.",
    options: ["finished", "have finished", "had finished", "finish"],
    correctIndex: 2,
    explanation: "By the time shaklida, o'tmishdagi belgilangan vaqtdan oldinroq tugagan ish Past Perfect bo'ladi: 'had finished'."
  },
  {
    id: "q-4",
    q: "Our IELTS instructor suggested ___ English YouTube podcasts for spelling.",
    options: ["to watch", "watch", "watching", "watched"],
    correctIndex: 2,
    explanation: "'Suggest' fe'lidan so'ng bevosita boshqa fe'l borsa, u '-ing' shaklida (Gerund) ishlatiladi: 'suggested watching'."
  },
  {
    id: "q-5",
    q: "Find the correct academic spelling and formal sentence:",
    options: [
      "A: I think IELTS is like really hard to beat.",
      "B: Research indicates that academic English proficiency is key to success.",
      "C: We don't gotta study grammar charts anymore."
    ],
    correctIndex: 1,
    explanation: "Ilmiy va akademik ingliz tilida shaxsiy bo'lmagan olmoshlar va rasmiy terminlar (Research indicates...) ishlatiladi."
  }
];

const LOCAL_STORAGE_KEY = 'yuksalish_academy_db';

export function getDatabase(): DatabaseSchema {
  if (typeof window === 'undefined') {
    return {
      courses: INITIAL_COURSES,
      teachers: INITIAL_TEACHERS,
      results: INITIAL_RESULTS,
      applications: INITIAL_APPLICATIONS,
      config: DEFAULT_CONFIG,
      students: INITIAL_STUDENTS,
      quizQuestions: INITIAL_QUIZ_QUESTIONS
    };
  }

  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    const db: DatabaseSchema = {
      courses: INITIAL_COURSES,
      teachers: INITIAL_TEACHERS,
      results: INITIAL_RESULTS,
      applications: INITIAL_APPLICATIONS,
      config: DEFAULT_CONFIG,
      students: INITIAL_STUDENTS,
      quizQuestions: INITIAL_QUIZ_QUESTIONS
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
    return db;
  }

  try {
    const parsed = JSON.parse(stored);
    
    // Backward compatibility upgrade if students list not found
    let mutated = false;
    if (!parsed.students) {
      parsed.students = INITIAL_STUDENTS;
      mutated = true;
    }
    
    // Backward compatibility upgrade if quizQuestions not found
    if (!parsed.quizQuestions) {
      parsed.quizQuestions = INITIAL_QUIZ_QUESTIONS;
      mutated = true;
    }

    if (mutated) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
    }
    
    return parsed;
  } catch (e) {
    console.error('Error parsing storage database, reverting to mock data', e);
    return {
      courses: INITIAL_COURSES,
      teachers: INITIAL_TEACHERS,
      results: INITIAL_RESULTS,
      applications: INITIAL_APPLICATIONS,
      config: DEFAULT_CONFIG,
      students: INITIAL_STUDENTS,
      quizQuestions: INITIAL_QUIZ_QUESTIONS
    };
  }
}

export function saveDatabase(db: DatabaseSchema) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
  }
}
