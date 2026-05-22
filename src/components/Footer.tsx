import { GraduationCap, BookOpen, Star, Sparkles, Trophy, Crown, Globe, MapPin, Phone, Mail, Instagram, Youtube, Send, ArrowUp, Calendar } from 'lucide-react';
import { CenterConfig } from '../types';

interface FooterProps {
  config: CenterConfig;
  setActiveTab: (tab: string) => void;
}

const LOGO_ICONS_MAP = {
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
  'star': Star,
  'sparkles': Sparkles,
  'trophy': Trophy,
  'crown': Crown,
  'globe': Globe
};

export default function Footer({ config, setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 font-sans" id="element-footer">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border-b border-slate-850 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-bold tracking-tight">O'z bilimingni sinab ko'rishga tayyormisan?</h3>
            <p className="text-slate-400 text-sm mt-1">Bepul daraja aniqlash testi va maslahat olishdan boshlang!</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('ai-chat')}
              className="px-6 py-3 bg-slate-900 text-amber-400 border border-amber-500/30 hover:border-amber-400 hover:text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              Bepul Level Test (AI)
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold rounded-xl text-sm shadow-lg hover:shadow-amber-500/10 transition-all cursor-pointer"
            >
              Sinfga a'zo bo'lish
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo & About */}
          <div className="space-y-6" id="footer-col-about">
            <div className="flex items-center gap-3">
              {config?.logoUrl ? (
                <div className="h-10 w-10 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center shrink-0">
                  <img 
                    src={config.logoUrl} 
                    alt={config.logoText || config.centerName || "Logo"} 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="p-2 bg-amber-500 rounded-lg text-slate-950 shadow-md shrink-0">
                  {(() => {
                    const SelectedIcon = (config?.logoIcon && LOGO_ICONS_MAP[config.logoIcon as keyof typeof LOGO_ICONS_MAP]) || GraduationCap;
                    return <SelectedIcon className="h-5 w-5" />;
                  })()}
                </div>
              )}
              <div>
                <span className="text-lg font-extrabold text-white tracking-widest uppercase">
                  {config?.logoText || 'YUKSALISH'}
                </span>
                <span className="block text-[9px] font-bold tracking-widest text-amber-500 uppercase">
                  {config?.logoSubtext || 'English Academy'}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {config.description}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3" id="footer-social-links">
              {config.telegramChannel && (
                <a 
                  href={config.telegramChannel} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 transition-all text-slate-300 rounded-xl"
                  title="Telegram Kanalimiz"
                >
                  <Send className="h-4 w-4" />
                </a>
              )}
              {config.instagram && (
                <a 
                  href={config.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 transition-all text-slate-300 rounded-xl"
                  title="Instagram Sahifamiz"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {config.youtube && (
                <a 
                  href={config.youtube} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 transition-all text-slate-300 rounded-xl"
                  title="YouTube Kanalimiz"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Nav */}
          <div id="footer-col-nav">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase border-l-2 border-amber-500 pl-3 mb-6">
              Tezkor Havorolar
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-all text-left cursor-pointer">
                  &rsaquo; Bosh sahifa
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-amber-400 transition-all text-left cursor-pointer">
                  &rsaquo; Bizning kurslar (Onlayn & Oflayn)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('results')} className="hover:text-amber-400 transition-all text-left cursor-pointer">
                  &rsaquo; Kurs natijalari (IELTS 7.5+)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai-chat')} className="hover:text-amber-400 transition-all text-left cursor-pointer">
                  &rsaquo; Ingliz tili daraja testi
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-amber-400 transition-all text-left cursor-pointer">
                  &rsaquo; Maxfiy Admin Boshqaruv
                </button>
              </li>
            </ul>
          </div>

          {/* Specialization Details */}
          <div id="footer-col-specialization">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase border-l-2 border-amber-500 pl-3 mb-6">
              Bizning Afzalliklar
            </h4>
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex gap-2.5 items-start">
                <span className="text-emerald-500 text-lg">✔</span>
                <p><strong className="text-slate-300">Faqat Ingliz Tili:</strong> Butun diqqatimiz bir tilda yuqori natijaga yo'naltirilgan.</p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-emerald-500 text-lg">✔</span>
                <p><strong className="text-slate-300">Qo'shimcha Support Teacher:</strong> Asosiy darsdan tashqari bepul yordamchi ustoz tizimi.</p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-emerald-500 text-lg">✔</span>
                <p><strong className="text-slate-300">Mock Imtihonlar:</strong> Haqiqiy IDP standardida bepul haftalik sinov testlari.</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div id="footer-col-contact">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase border-l-2 border-amber-500 pl-3 mb-6">
              Bog'lanish
            </h4>
            <ul className="space-y-4 text-sm" id="footer-contact-info">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  {config.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber-500 shrink-0" />
                <a href={`tel:${config.phone}`} className="text-slate-300 hover:text-amber-400 font-bold transition-all">
                  {config.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amber-500 shrink-0" />
                <a href={`mailto:${config.email}`} className="text-slate-300 hover:text-amber-400 transition-all">
                  {config.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-amber-500 shrink-0" />
                <span className="text-slate-300">Dushanba - Yakshanba, 09:00 - 21:00</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 💻 DASTURCHI HAQIDA MA'LUMOT VA XIZMATLAR */}
        <div className="border-t border-slate-900 pt-10 mt-12" id="developer-portfolio-section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-900/20 p-6 sm:p-8 rounded-2xl border border-slate-900 text-left">
            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase">PROFESSIONAL LOYIHALAR UCHUN</span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-white">Dasturchi: Xojiakbar Jo'rayev</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                O'quv markazlari, maktablar va biznes egalari uchun premium darajadagi zamonaviy veb-saytlar, interaktiv boshqaruv panellari (CRM) hamda Telegram botlar yaratib beraman. Loyihalarga sifat kafolati hamda individual yondashuv taqdim etiladi!
              </p>
            </div>
            
            <div className="lg:col-span-3 space-y-1.5 border-l-0 lg:border-l lg:border-slate-900 lg:pl-6">
              <span className="text-slate-300 text-xs font-bold block uppercase tracking-wider">Xizmat turlari:</span>
              <ul className="text-xs text-slate-400 space-y-1">
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-500 text-[10px]">⭐</span> Murakkab Admin panellar
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-500 text-[10px]">⭐</span> Zamonaviy tezkor Web ilovalar (React, Vite)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-500 text-[10px]">⭐</span> Avtomatlashgan integratsiyalar
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-2 justify-end">
              <a 
                href="https://t.me/xojiakbar_jorayev_uz" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 font-sans text-slate-950 hover:bg-amber-400 font-extrabold rounded-xl text-xs transition-all cursor-pointer shadow-lg hover:shadow-amber-500/10 shrink-0"
              >
                <Send className="h-3.5 w-3.5" /> Telegramda bog'lanish
              </a>
              <a 
                href="https://instagram.com/xojiakbar_jorayev_uz" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0"
              >
                <Instagram className="h-3.5 w-3.5" /> Instagram sahifam
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-center" id="footer-copyright-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500">
            &copy; {currentYear} <strong>{config?.logoText || 'Yuksalish'} {config?.logoSubtext || 'English Academy'}</strong>. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('admin')} 
              className="text-slate-600 hover:text-amber-500 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            >
              🔐 Admin kirish
            </button>
            <button 
              onClick={scrollToTop} 
              className="p-2.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded-xl transition-all cursor-pointer"
              title="Yuqoriga qaytish"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
