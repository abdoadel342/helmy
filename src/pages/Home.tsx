import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import { FadeContent } from '../components/react-bits/FadeContent';
import { ShinyText } from '../components/react-bits/ShinyText';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import SplitText from '../components/react-bits/SplitText';
import GradientText from '../components/react-bits/GradientText';
import { Instagram, Linkedin } from 'lucide-react';
import { logOut } from '../firebase';
import { AnimatedThemeToggler } from '../components/AnimatedThemeToggler';

import { programsData } from './Programs';
import { nutritionPlansData } from './Nutrition';
import { articlesData } from './Education';

/* ── tiny animated counter ── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(start);
    }, 30);
    return () => clearInterval(id);
  }, [target]);
  return <>{count}{suffix}</>;
}

export default function Home() {
  const { user } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAr = language === 'ar';

  const firstName = user?.displayName?.split(' ')[0] || (isAr ? 'رياضي' : 'Athlete');

  const menuItems = [
    { to: '/', icon: 'home', label: t('home') },
    { to: '/education', icon: 'school', label: t('education') },
    { to: '/programs', icon: 'fitness_center', label: t('programs') },
    { to: '/ai', icon: 'smart_toy', label: isAr ? 'المدرب الذكي' : 'AI Coach' },
    { to: '/settings', icon: 'settings', label: t('settings') },
  ];

  const navCards = [
    { to: '/programs', icon: 'exercise', label: t('programs'), desc: isAr ? 'برامج تدريب احترافية' : 'Pro training plans', gradient: 'from-violet-600 to-purple-700' },
    { to: '/nutrition', icon: 'restaurant', label: t('nutrition'), desc: isAr ? 'خطط غذائية مدروسة' : 'Smart meal plans', gradient: 'from-emerald-500 to-teal-600' },
    { to: '/education', icon: 'school', label: t('education'), desc: isAr ? 'علوم رياضية متقدمة' : 'Sports science', gradient: 'from-amber-500 to-orange-600' },
    { to: '/profile', icon: 'person', label: t('profile'), desc: isAr ? 'ملفك الشخصي' : 'Your profile', gradient: 'from-sky-500 to-blue-600' },
  ];

  const stats = [
    { value: programsData.length, suffix: '', label: isAr ? 'برامج تدريبية' : 'Programs', icon: 'fitness_center', to: '/programs' },
    { value: nutritionPlansData.length, suffix: '', label: isAr ? 'خطط غذائية' : 'Meal Plans', icon: 'restaurant_menu', to: '/nutrition' },
    { value: articlesData.length, suffix: '', label: isAr ? 'محتوى علمي' : 'Articles', icon: 'menu_book', to: '/education' },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* ══════════ HEADER ══════════ */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 bg-background-light/70 dark:bg-background-dark/70 backdrop-blur-xl border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-violet-500 p-2.5 rounded-xl shadow-lg shadow-primary/25">
            <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>fitness_center</span>
          </div>
          <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">HELMY</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2.5 text-slate-500 dark:text-slate-400 hover:bg-primary/10 rounded-xl transition-colors">
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background-light dark:ring-background-dark"></span>
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative p-2.5 text-slate-500 dark:text-slate-400 hover:bg-primary/10 rounded-xl transition-colors">
            <span className="material-symbols-outlined text-[22px]">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </header>

      {/* ══════════ DROPDOWN MENU ══════════ */}
      {isMenuOpen && (
        <div className="absolute top-[68px] left-4 right-4 z-50 bg-background-light/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-primary/15 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden animate-[slideDown_0.25s_ease-out]">
          {/* profile row */}
          <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-5 py-4 hover:bg-primary/10 transition-colors border-b border-primary/10">
            <div className="w-11 h-11 rounded-full border-2 border-primary overflow-hidden shrink-0">
              <img alt="Profile" src={user?.photoURL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyvHIZ9KPTYeBU0nMKulR2WSgoitxQVxbkIGeH8eXxSdtGyZEsaoR_NgUqCLweiAdKQV5y8aSrq6pliXT5tOUy9Xhb7I6cph0QqljvEmd7xMkXCkpIpvgmUB2alN2Azzm2SV_5Mbv4EZT_wOadbpFT_7p0hwUdGEI1NmxMpFIcVn5Xcb11I0dRNGQmCbB_BW6SK-A-P_FRxDCePFT7lukp_BmnrbUYNuo-qC0vsV0vD1vUQIrGhuTP0MW_LZr-CN434To_hIE66iKH'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100">{user?.displayName || t('profile')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
            </div>
          </Link>
          {menuItems.map(item => (
            <Link key={item.to + item.icon} to={item.to} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-5 py-3 hover:bg-primary/10 transition-colors border-b border-primary/5">
              <span className="material-symbols-outlined text-primary">{item.icon}</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{item.label}</span>
            </Link>
          ))}

          <button onClick={() => { toggleTheme(); }} className="flex items-center justify-between px-5 py-3 hover:bg-primary/10 transition-colors w-full text-start border-b border-primary/5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{theme === 'dark' ? (isAr ? 'الوضع الفاتح' : 'Light Mode') : (isAr ? 'الوضع الداكن' : 'Dark Mode')}</span>
            </div>
          </button>
          <button onClick={() => { toggleLanguage(); }} className="flex items-center justify-between px-5 py-3 hover:bg-primary/10 transition-colors w-full text-start border-b border-primary/5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">language</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{t('language')}</span>
            </div>
            <span className="text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-lg">{isAr ? 'English' : 'العربية'}</span>
          </button>
          {user?.uid === 'mock-user-123' ? (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-5 py-3 hover:bg-primary/10 text-primary hover:text-primary-light transition-colors w-full text-start">
              <span className="material-symbols-outlined text-primary">login</span>
              <span className="font-medium">{isAr ? 'تسجيل الدخول / إنشاء حساب' : 'Log In / Register'}</span>
            </Link>
          ) : (
            <button onClick={() => { if (window.confirm(isAr ? 'هل أنت متأكد من تسجيل الخروج؟' : 'Are you sure you want to log out?')) { logOut(); setIsMenuOpen(false); } }} className="flex items-center gap-3 px-5 py-3 hover:bg-red-500/10 text-red-500 hover:text-red-400 transition-colors w-full text-start">
              <span className="material-symbols-outlined text-red-500">logout</span>
              <span className="font-medium">{isAr ? 'تسجيل الخروج' : 'Log Out'}</span>
            </button>
          )}
        </div>
      )}

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="space-y-10 py-6">

        {/* ── HERO ── */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="relative overflow-hidden rounded-3xl aspect-[16/9] md:aspect-[21/9] flex items-end">
            {/* bg image */}
            <div className="absolute inset-0 z-0">
              <img alt="Athletic Training" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-violet-900/30 mix-blend-multiply"></div>
            </div>
            {/* content */}
            <div className="relative z-10 p-6 md:p-10 w-full">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-4 text-xs font-bold bg-primary/90 backdrop-blur-sm text-white rounded-full uppercase tracking-wider shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                {t('overview')}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
                <ShinyText text={isAr ? `مرحباً، ${firstName}` : `Welcome, ${firstName}`} disabled={false} speed={3} className="text-white" />
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
                {t('program_desc')}
              </p>
            </div>
          </section>
        </FadeContent>

        {/* ── STATS BAR ── */}
        <FadeContent blur={true} duration={800} initialOpacity={0}>
          <section className="grid grid-cols-3 gap-3 md:gap-5">
            {stats.map((s, i) => (
              <Link key={i} to={s.to} className="relative bg-slate-100/80 dark:bg-zinc-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-zinc-800/60 rounded-2xl p-4 md:p-6 text-center group hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="material-symbols-outlined text-primary text-2xl md:text-3xl mb-2 block group-hover:scale-110 transition-transform duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                <p className="text-2xl md:text-3xl font-black text-primary"><AnimatedCounter target={s.value} suffix={s.suffix} /></p>
                <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 group-hover:text-primary transition-colors">{s.label}</p>
              </Link>
            ))}
          </section>
        </FadeContent>

        {/* ── APP INFO ── */}
        <section className="py-12 px-6 md:px-12 bg-slate-50/80 dark:bg-zinc-900/30 backdrop-blur-sm rounded-3xl border border-slate-200/80 dark:border-zinc-800/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(115,17,212,0.03)_0%,transparent_70%)] pointer-events-none"></div>

          <div className="mb-12 relative z-10">
            <SplitText
              text={isAr ? 'الفلسفة العلمية لتطبيق حلمي' : 'The Scientific Philosophy of Helmy'}
              className="text-3xl md:text-5xl font-black text-center text-primary mb-6"
              delay={50} duration={1.25} ease="power3.out" splitType="words"
              from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }}
              threshold={0.1} rootMargin="-100px" textAlign="center" showCallback={false}
            />
            <p className="text-center text-slate-600 dark:text-slate-300 text-base md:text-lg font-medium leading-relaxed max-w-4xl mx-auto">
              {isAr 
                ? 'نحن لا نقدم مجرد جداول رياضية عشوائية؛ منصة "حلمي" هي بيئة متكاملة مصممة على أسس الطب الرياضي النخبوي، تدمج بين الذكاء الاصطناعي الخوارزمي وعلوم الفسيولوجيا والميكانيكا الحيوية لضمان تحقيقك لنتائج دقيقة ومستدامة.' 
                : 'We don’t just provide random workout templates; Helmy is an elite sports medicine ecosystem blending algorithmic AI, physiology, and biomechanics to guarantee precise and sustainable results.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {/* Feature 1: AI Coach */}
            <div className="bg-white/60 dark:bg-zinc-800/50 p-8 rounded-3xl border border-slate-200/60 dark:border-zinc-700/60 shadow-lg hover:shadow-primary/10 transition-all group">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-white text-3xl">smart_toy</span>
                </div>
                <div>
                  <h4 className="font-black text-xl text-slate-900 dark:text-slate-100">{isAr ? 'عقل اصطناعي متقدم (AI Coach)' : 'Advanced AI Coach'}</h4>
                  <p className="text-primary text-sm font-bold">{isAr ? 'تحليل لحظي وتكيف مستمر' : 'Real-time analysis & adaptation'}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-loose text-sm md:text-base font-medium">
                {isAr 
                  ? 'مدربك الشخصي الذكي لا ينام. مدعوم بخوارزميات متطورة قادرة على تحليل تقدمك، تعديل أحمالك التدريبية بناءً على مستوى الإجهاد (RPE)، وتصميم وجبات دقيقة بضغطة زر. يمكنك سؤاله في أي وقت عن تصحيح الأداء الحركي أو استراتيجيات التعافي، وسيجيبك بناءً على أحدث الأبحاث العلمية.'
                  : 'Your AI coach never sleeps. Powered by advanced algorithms, it analyzes your progress, adjusts training loads based on RPE, and generates precise meals instantly. Ask it anytime about biomechanical corrections or recovery strategies, and get evidence-based answers.'}
              </p>
            </div>
            
            {/* Feature 2: Science */}
            <div className="bg-white/60 dark:bg-zinc-800/50 p-8 rounded-3xl border border-slate-200/60 dark:border-zinc-700/60 shadow-lg hover:shadow-primary/10 transition-all group">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-white text-3xl">science</span>
                </div>
                <div>
                  <h4 className="font-black text-xl text-slate-900 dark:text-slate-100">{isAr ? 'موسوعة العلوم الرياضية' : 'Sports Science Encyclopedia'}</h4>
                  <p className="text-sky-500 text-sm font-bold">{isAr ? 'الميكانيكا الحيوية، الفسيولوجيا، والسيكولوجيا' : 'Biomechanics, Physiology, & Psychology'}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-loose text-sm md:text-base font-medium">
                {isAr 
                  ? 'نؤمن أن المعرفة هي القوة. يوفر التطبيق منهجاً أكاديمياً مبسطاً يشرح آليات الجسد: كيف تعمل أنظمة الطاقة (ATP-PC)، كيف تتشكل الروافع الميكانيكية في المفاصل، وكيف تصل إلى "حالة التدفق" (Flow State) الذهنية لتجاوز حدودك. أنت لا تتدرب فقط، أنت تتعلم كيف يتدرب الأبطال.'
                  : 'We believe knowledge is power. The app provides a simplified academic curriculum explaining body mechanics: how ATP energy systems work, how joint levers function, and how to reach the mental Flow State to push your limits.'}
              </p>
            </div>

            {/* Feature 3: Training */}
            <div className="bg-white/60 dark:bg-zinc-800/50 p-8 rounded-3xl border border-slate-200/60 dark:border-zinc-700/60 shadow-lg hover:shadow-primary/10 transition-all group">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-white text-3xl">fitness_center</span>
                </div>
                <div>
                  <h4 className="font-black text-xl text-slate-900 dark:text-slate-100">{isAr ? 'هندسة الأحمال التدريبية' : 'Training Load Engineering'}</h4>
                  <p className="text-rose-500 text-sm font-bold">{isAr ? 'تقسيم مرحلي ومراقبة دقيقة' : 'Periodization & Precise Monitoring'}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-loose text-sm md:text-base font-medium">
                {isAr 
                  ? 'برامجنا ليست قوالب ثابتة. نستخدم أسلوب "التقسيم المرحلي" (Periodization) لبناء القوة الانفجارية، التضخم العضلي، وتحمل السرعة. تتضمن البرامج إحماءات عصبية عضلية، تمارين البليومتريكس لردود الفعل، وخططاً متكاملة لتأسيس الأطفال حركياً وذهنياً دون تخصص مبكر ضار.'
                  : 'Our programs are not static templates. We use advanced Periodization to build explosive power, hypertrophy, and speed endurance. Programs include neuromuscular warm-ups, plyometrics, and holistic development plans for kids without harmful early specialization.'}
              </p>
            </div>

            {/* Feature 4: Nutrition */}
            <div className="bg-white/60 dark:bg-zinc-800/50 p-8 rounded-3xl border border-slate-200/60 dark:border-zinc-700/60 shadow-lg hover:shadow-primary/10 transition-all group">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-white text-3xl">restaurant_menu</span>
                </div>
                <div>
                  <h4 className="font-black text-xl text-slate-900 dark:text-slate-100">{isAr ? 'التغذية الإكلينيكية والرياضية' : 'Clinical & Sports Nutrition'}</h4>
                  <p className="text-emerald-500 text-sm font-bold">{isAr ? 'حاسبات دقيقة ونظام البدائل' : 'Precise Calculators & Exchange System'}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-loose text-sm md:text-base font-medium">
                {isAr 
                  ? 'تجاوزنا حساب السعرات التقليدي لنقدم لك "نظام بدائل الأطعمة" العالمي. يضم التطبيق أنظمة علاجية مثل حمية البحر المتوسط وDASH للوقاية من الضغط، بالإضافة لتوقيت المغذيات (Nutrient Timing) الدقيق قبل وبعد البطولات الرياضية لضمان أقصى مخزون من الجليكوجين وتعب أقل.'
                  : 'We went beyond simple calorie counting to integrate the global Food Exchange System. The app features clinical diets like DASH and Mediterranean, plus strict Nutrient Timing protocols around competitions for max glycogen storage and minimal fatigue.'}
              </p>
            </div>
          </div>
        </section>

        {/* ── NAVIGATION GRID ── */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black">{t('main_menu')}</h3>
              <Link to="/programs" className="text-primary font-bold flex items-center gap-1 group text-sm">
                {t('view_all')}
                <span className="material-symbols-outlined text-lg translate-x-0 group-hover:translate-x-1 transition-transform">{isAr ? 'chevron_left' : 'chevron_right'}</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {navCards.map((card, i) => (
                <Link key={card.to} to={card.to} className="group">
                  <SpotlightCard className="!p-0 !bg-slate-100/80 dark:!bg-zinc-900/60 !border-slate-200/80 dark:!border-zinc-800/60 hover:!border-primary/40 transition-all duration-300 h-full" spotlightColor="rgba(115, 17, 212, 0.15)">
                    <div className="p-6 md:p-8 flex flex-col items-center text-center gap-3">
                      <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{card.icon}</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-slate-100">{card.label}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{card.desc}</span>
                    </div>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
          </section>
        </FadeContent>

        {/* ── AI COACH BANNER ── */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="relative overflow-hidden rounded-3xl group cursor-pointer shadow-2xl shadow-primary/20">
            <Link to="/ai" className="block w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-primary to-purple-800 z-0"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay"></div>

              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 z-0"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-fuchsia-500/30 rounded-full blur-2xl z-0"></div>

              <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:-rotate-12 transition-transform duration-500">
                    <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>robot_2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
                      {isAr ? 'المدرب الذكي (AI)' : 'Smart AI Coach'}
                      <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">Beta</span>
                    </h3>
                    <p className="text-white/80 max-w-sm text-sm leading-relaxed">
                      {isAr ? 'اسأل المدرب الذكي، قم بتحليل أدائك، وابتكر وجباتك الصحية بخوارزميات متقدمة.' : 'Ask the coach, analyze your form, and generate healthy meals with advanced algorithms.'}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-auto bg-white/10 hover:bg-white text-white hover:text-primary backdrop-blur-md border border-white/20 font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap">
                  {isAr ? 'تحدث مع المدرب' : 'Start Chatting'}
                  <span className="material-symbols-outlined text-xl">{isAr ? 'arrow_back' : 'arrow_forward'}</span>
                </div>
              </div>
            </Link>
          </section>
        </FadeContent>

        {/* ── KIDS TRAINING BANNER ── */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <Link to="/kids-training" className="block group">
            <SpotlightCard className="!p-0 !bg-gradient-to-br !from-amber-950/60 !to-orange-950/40 !border-amber-500/20 hover:!border-amber-500/50 !rounded-3xl transition-all" spotlightColor="rgba(245, 158, 11, 0.2)">
              <div className="p-6 md:p-8 flex items-center gap-5">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shrink-0">
                  <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-white mb-1 flex items-center gap-2">
                    {isAr ? 'برنامج تدريب الأطفال' : 'Kids Training Program'}
                    <span className="bg-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>
                  </h3>
                  <p className="text-zinc-400 text-sm">{isAr ? 'جداول تدريب وألعاب ذكاء مخصصة لطفلك بالذكاء الاصطناعي' : 'AI-powered training schedules and brain games for your child'}</p>
                </div>
                <span className="material-symbols-outlined text-amber-500 text-2xl opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">{isAr ? 'arrow_back' : 'arrow_forward'}</span>
              </div>
            </SpotlightCard>
          </Link>
        </FadeContent>

        {/* ── GOALS + CONTACT ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Goals */}
          <FadeContent blur={true} duration={1000} initialOpacity={0}>
            <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-primary/20 dark:from-zinc-900 dark:to-primary/10 rounded-3xl p-8 text-white h-full flex flex-col justify-center border border-zinc-800/60 overflow-hidden shadow-2xl shadow-black/30">
              <div className="absolute -right-6 -top-6 opacity-[0.07]">
                <span className="material-symbols-outlined text-[160px]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-violet-500 to-transparent"></div>

              <h3 className="text-2xl font-black mb-6 relative z-10 tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
                {t('app_goals')}
              </h3>
              <ul className="space-y-5 relative z-10">
                {[t('goal_1'), t('goal_2'), t('goal_3')].map((goal, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/40 transition-colors">
                      <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <p className="text-base text-slate-300 font-medium leading-relaxed">{goal}</p>
                  </li>
                ))}
              </ul>
            </section>
          </FadeContent>

          {/* Contact */}
          <FadeContent blur={true} duration={1000} initialOpacity={0}>
            <section className="bg-slate-100/80 dark:bg-zinc-900/40 backdrop-blur-sm border border-slate-200/80 dark:border-zinc-800/60 rounded-3xl p-8 h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

              <h3 className="text-xl font-black mb-8 flex items-center justify-center gap-3 text-center">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>contact_support</span>
                {t('contact_us')}
              </h3>
              
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {/* Phone */}
                <a href="tel:+201012345678" className="flex flex-col items-center justify-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors group p-3 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/20 w-[80px] md:w-[100px] text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/25 transition-all group-hover:-translate-y-1">
                    <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                  </div>
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider">{isAr ? 'اتصال' : 'Call'}</span>
                </a>

                {/* Instagram */}
                <a href="https://instagram.com/helmy.app" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors group p-3 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/20 w-[80px] md:w-[100px] text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/25 transition-all group-hover:-translate-y-1">
                    <Instagram className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider">Insta</span>
                </a>

                {/* TikTok */}
                <a href="https://tiktok.com/@helmy.app" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors group p-3 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/20 w-[80px] md:w-[100px] text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/25 transition-all group-hover:-translate-y-1">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary group-hover:text-white transition-colors">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </div>
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider">TikTok</span>
                </a>

                {/* LinkedIn */}
                <a href="https://linkedin.com/company/helmy" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors group p-3 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/20 w-[80px] md:w-[100px] text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/25 transition-all group-hover:-translate-y-1">
                    <Linkedin className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider">LinkedIn</span>
                </a>

                {/* Email */}
                <a href="mailto:support@helmy.com" className="flex flex-col items-center justify-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors group p-3 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/20 w-[80px] md:w-[100px] text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/25 transition-all group-hover:-translate-y-1">
                    <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                  </div>
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider">{isAr ? 'إيميل' : 'Email'}</span>
                </a>
              </div>
            </section>
          </FadeContent>
        </div>

        {/* ── FOOTER BRANDING ── */}
        <footer className="text-center py-6 opacity-50">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          </p>
        </footer>
      </div>
    </div>
  );
}
