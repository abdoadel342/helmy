import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';
import { FadeContent } from '../components/react-bits/FadeContent';
import { ShinyText } from '../components/react-bits/ShinyText';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';

export default function Home() {
  const { user } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl">fitness_center</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-primary uppercase tracking-widest font-black">HELMY</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-primary/10 rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-primary/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-[72px] left-4 right-4 z-50 bg-background-light dark:bg-background-dark border border-primary/20 rounded-2xl shadow-xl shadow-primary/10 overflow-hidden">
          <div className="flex flex-col">
            {/* Profile Section in Menu */}
            <Link to="/profile" className="flex items-center gap-4 px-4 py-4 hover:bg-primary/10 transition-colors border-b border-primary/10">
              <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden shrink-0">
                <img 
                  alt="Profile" 
                  src={user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuCyvHIZ9KPTYeBU0nMKulR2WSgoitxQVxbkIGeH8eXxSdtGyZEsaoR_NgUqCLweiAdKQV5y8aSrq6pliXT5tOUy9Xhb7I6cph0QqljvEmd7xMkXCkpIpvgmUB2alN2Azzm2SV_5Mbv4EZT_wOadbpFT_7p0hwUdGEI1NmxMpFIcVn5Xcb11I0dRNGQmCbB_BW6SK-A-P_FRxDCePFT7lukp_BmnrbUYNuo-qC0vsV0vD1vUQIrGhuTP0MW_LZr-CN434To_hIE66iKH"} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">{user?.displayName || t('profile')}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
              </div>
            </Link>

            <Link to="/" className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors border-b border-primary/10">
              <span className="material-symbols-outlined text-primary">home</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{t('home')}</span>
            </Link>
            <Link to="/education" className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors border-b border-primary/10">
              <span className="material-symbols-outlined text-primary">school</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{t('education')}</span>
            </Link>
            <Link to="/programs" className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors border-b border-primary/10">
              <span className="material-symbols-outlined text-primary">fitness_center</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{t('programs')}</span>
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors border-b border-primary/10">
              <span className="material-symbols-outlined text-primary">settings</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{t('settings')}</span>
            </Link>
            
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center justify-between px-4 py-3 hover:bg-primary/10 transition-colors w-full text-start"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">language</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">{t('language')}</span>
              </div>
              <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">
                {language === 'ar' ? 'English' : 'العربية'}
              </span>
            </button>
          </div>
        </div>
      )}

      <div className="space-y-8 px-4 py-6">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="relative overflow-hidden rounded-2xl bg-primary/20 aspect-[16/9] flex items-end">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
              <img 
                alt="Athletic Training" 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10 p-6 w-full">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold bg-primary text-white rounded-full uppercase tracking-wider">
                {t('overview')}
              </span>
              <h2 className="text-2xl font-bold text-white mb-2">
                <ShinyText text={t('about_program')} disabled={false} speed={3} className="text-white" />
              </h2>
              <p className="text-slate-200 text-sm leading-relaxed max-w-md">
                {t('program_desc')}
              </p>
            </div>
          </section>
        </FadeContent>

        {/* Stats Quick Look */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="grid grid-cols-3 gap-4">
            <SpotlightCard className="bg-primary/10 dark:bg-primary/5 p-4 rounded-xl text-center border border-primary/20" spotlightColor="rgba(115, 17, 212, 0.2)">
              <p className="text-primary font-bold text-lg">12</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('completed_program')}</p>
            </SpotlightCard>
            <SpotlightCard className="bg-primary/10 dark:bg-primary/5 p-4 rounded-xl text-center border border-primary/20" spotlightColor="rgba(115, 17, 212, 0.2)">
              <p className="text-primary font-bold text-lg">85%</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('goal_achieved')}</p>
            </SpotlightCard>
            <SpotlightCard className="bg-primary/10 dark:bg-primary/5 p-4 rounded-xl text-center border border-primary/20" spotlightColor="rgba(115, 17, 212, 0.2)">
              <p className="text-primary font-bold text-lg">24</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('continuous_days')}</p>
            </SpotlightCard>
          </div>
        </FadeContent>

        {/* Grid Menu */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{t('main_menu')}</h3>
              <Link to="/programs" className="text-primary text-sm font-medium">{t('view_all')}</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/programs" className="group relative flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl transition-all hover:border-primary active:scale-95">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">exercise</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100">{t('programs')}</span>
              </Link>
              <Link to="/nutrition" className="group relative flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl transition-all hover:border-primary active:scale-95">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">restaurant</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100">{t('nutrition')}</span>
              </Link>
              <Link to="/education" className="group relative flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl transition-all hover:border-primary active:scale-95">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">school</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100">{t('education')}</span>
              </Link>
              <Link to="/profile" className="group relative flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl transition-all hover:border-primary active:scale-95">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">person</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100">{t('profile')}</span>
              </Link>
            </div>
          </section>
        </FadeContent>

        {/* Goals Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative border-l-4 border-primary">
            <div className="absolute right-0 top-0 opacity-10">
              <span className="material-symbols-outlined text-[100px]">emoji_events</span>
            </div>
            <h3 className="text-xl font-bold mb-3 relative z-10">{t('app_goals')}</h3>
            <ul className="space-y-3 relative z-10">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <p className="text-sm text-slate-300">{t('goal_1')}</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <p className="text-sm text-slate-300">{t('goal_2')}</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <p className="text-sm text-slate-300">{t('goal_3')}</p>
              </li>
            </ul>
          </section>
        </FadeContent>

        {/* Contact & Social Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="space-y-6">
            {/* Contact Us */}
            <div className="bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">contact_support</span>
                {t('contact_us')}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">call</span>
                  <span dir="ltr">+966 50 000 0000</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">mail</span>
                  <span>support@helmy.com</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-widest">{t('follow_us')}</h3>
              <div className="flex justify-center gap-6">
                <a className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                  <span className="material-symbols-outlined">public</span>
                </a>
                <a className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                  <span className="material-symbols-outlined">share</span>
                </a>
                <a className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                  <span className="material-symbols-outlined">camera_alt</span>
                </a>
              </div>
            </div>
          </section>
        </FadeContent>
      </div>
    </div>
  );
}
