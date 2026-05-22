export interface Course {
  id: string;
  title: string;
  description: string;
  price: number; // in UZS, e.g., 450000
  duration: string; // e.g., "3 oy", "4 oy"
  category: 'CEFR' | 'IELTS' | 'General English' | 'Kids' | 'Academic' | 'Speaking';
  format: 'online' | 'offline';
  lessonsPerWeek: number; // e.g., 3
  teacherName: string;
  level: string; // e.g., "Intermediate", "All Levels", "B2+"
  skillsLearned: string[]; // e.g., ["Writing Task 2", "Academic Vocabulary"]
}

export interface Teacher {
  id: string;
  name: string;
  role: string; // e.g., "Lead IELTS Coach", "Senior English Teacher"
  ieltsScore: string; // e.g., "8.5" or "9.0" or "C2"
  experience: string; // e.g., "6 yil"
  bio: string;
  image: string; // URL or letter avatar descriptor
  achievements: string[]; // e.g., ["100+ students with IELTS 7.5+"]
}

export interface Result {
  id: string;
  studentName: string;
  score: string; // e.g., "8.5", "8.0", "7.5", "C1", "B2"
  type: 'IELTS' | 'CEFR' | 'University Match'; // IELTS, CEFR (B2/C1), or Local/International university entry
  subjectDetails: string; // e.g., "Listening 9.0, Reading 8.5" or "Shaxsiy muvaffaqiyat"
  originRegion: string; // e.g., "Toshkent", "Samarqand"
  details: string; // e.g., "Westminster uchrashuv a'zosi, Grant sohibi"
  year: string; // e.g., "2025" or "2026"
  avatarStyle: string; // css gradient class for dynamic profile background
}

export interface EnrollmentApplication {
  id: string;
  studentName: string;
  phone: string;
  courseId: string;
  courseTitle: string;
  format: 'online' | 'offline';
  status: 'new' | 'contacted' | 'approved' | 'rejected';
  note?: string; // admin internal notes
  createdAt: string;
}

export interface CenterConfig {
  centerName: string;
  motto: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  telegramChannel: string;
  telegramPersonal: string;
  instagram: string;
  youtube: string;
  studentCount: number; // e.g., 1420
  successCount: number; // e.g., 380 (IELTS 7+)
  averageScore: string; // e.g., "7.2"
  logoUrl?: string; // Base64 or URL path
  logoIcon?: string; // e.g., "graduation-cap", "book", "star", etc.
  logoText?: string; // Primary logo text/acronym
  logoSubtext?: string; // Subtitle line e.g. "English Academy"
}

export interface StudentProgress {
  id: string;
  studentName: string;
  phone: string;
  courseId: string;
  courseTitle: string;
  teacherName: string;
  attendance: number; // e.g., 94
  homeworks: number; // e.g., 88
  vocabulary: number; // e.g., 90
  currentTopic: string;
  lessonsCompleted: number;
  totalLessons: number;
  upcomingMocks: {
    id: string;
    title: string;
    date: string;
    time: string;
    status: 'registered' | 'pending_payment';
  }[];
  mockHistory: {
    title: string;
    date: string;
    reading: string;
    listening: string;
    writing: string;
    speaking: string;
    overall: string;
  }[];
  teacherNotes: string;
}

export interface QuizQuestion {
  id: string;
  q: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface DatabaseSchema {
  courses: Course[];
  teachers: Teacher[];
  results: Result[];
  applications: EnrollmentApplication[];
  config: CenterConfig;
  students?: StudentProgress[]; // Marked optional so it doesn't break previous localStorages, but populated dynamically
  quizQuestions?: QuizQuestion[]; // Added dynamically managed quiz questions list
}

