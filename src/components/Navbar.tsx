import React from 'react';
import { GraduationCap, BookOpen, Star, Sparkles, Trophy, Crown, Globe, ShieldCheck, Lock, Menu, X, Phone, User } from 'lucide-react';
import { CenterConfig } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  phone: string;
  isAdminLoggedIn: boolean;
  config?: CenterConfig;
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

export default function Navbar({ activeTab, setActiveTab, phone, isAdminLoggedIn, config }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems: { id: string; label: string; icon?: React.ComponentType<any> }[] = [
    { id: 'home', label: 'Bosh sahifa' },
    { id: 'courses', label: 'Kurslarimiz' },
    { id: 'results', label: 'Natijalar' },
    { id: 'ai-chat', label: 'AI Maslahatchi & Test' },
    { id: 'apply', label: "Ro'yxatdan o'tish" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 border-b border-slate-800 text-white backdrop-blur-md shadow-lg" id="element-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => { setActiveTab('home'); setIsOpen(false); }}
            id="logo-container"
          >
            {config?.logoUrl ? (
              <div className="h-11 w-11 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-all border border-slate-700 bg-slate-950 flex items-center justify-center shrink-0">
                <img 
                  src={config.logoUrl} 
                  alt={config.logoText || config.centerName || "Academy Logo"} 
                  className="h-full w-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="p-2.5 bg-gradient-to-tr from-amber-500 to-yellow-600 rounded-xl shadow-inner group-hover:scale-105 transition-all shrink-0">
                {(() => {
                  const SelectedIcon = (config?.logoIcon && LOGO_ICONS_MAP[config.logoIcon as keyof typeof LOGO_ICONS_MAP]) || GraduationCap;
                  return <SelectedIcon className="h-6 w-6 text-slate-950 stroke-[2]" />;
                })()}
              </div>
            )}
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-400 bg-clip-text text-transparent">
                {config?.logoText || 'YUKSALISH'}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">
                  {config?.logoSubtext || 'English Academy'}
                </span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1" id="desktop-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer
                    ${isActive 
                      ? 'bg-amber-500/10 text-amber-400 font-semibold border-b-2 border-amber-500/80 rounded-b-none' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }
                  `}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {item.label}
                  {item.id === 'ai-chat' && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-500 text-slate-950 rounded-full flex items-center gap-0.5 animate-pulse">
                      <Sparkles className="h-2 w-2 fill-current" /> NEW
                    </span>
                  )}
                  {item.id === 'admin' && isAdminLoggedIn && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right side CTA */}
          <div className="hidden sm:flex items-center gap-4" id="nav-cta">
            <a 
              href={`tel:${phone}`}
              className="flex items-center gap-2 px-4 py-2 border border-slate-700 hover:border-amber-500/50 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-amber-400 transition-all bg-slate-950/40"
              id="phone-cta"
            >
              <Phone className="h-3.5 w-3.5 text-amber-500" />
              <span>{phone}</span>
            </a>
            <button
              onClick={() => setActiveTab('apply')}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md hover:shadow-amber-500/10 transform hover:-translate-y-0.5 transition-all cursor-pointer"
              id="enroll-cta"
            >
              Darsga yozilish
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3" id="mobile-menu-trigger">
            <a href={`tel:${phone}`} className="sm:hidden p-2 bg-slate-800 rounded-lg text-amber-400">
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 animate-fadeIn" id="mobile-menu-content">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between transition-all
                    ${isActive 
                      ? 'bg-amber-500/15 text-amber-400 border-l-4 border-amber-500' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }
                  `}
                >
                  <span className="flex items-center gap-3">
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </span>
                  {item.id === 'ai-chat' && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-500 text-slate-950 rounded-full">
                      Level Test
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-4 pb-2 px-4 border-t border-slate-800 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>100% Ingliz tili mukammal ta'limi</span>
              </div>
              <button
                onClick={() => {
                  setActiveTab('apply');
                  setIsOpen(false);
                }}
                className="w-full text-center py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold rounded-xl shadow"
              >
                Hoziroq yozilish
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
