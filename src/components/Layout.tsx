import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import { logOut } from '../firebase';
import { usePWAInstall } from '../hooks/usePWAInstall';

const navItems = [
  { to: '/', icon: 'home', labelAr: 'الرئيسية', labelEn: 'Home' },
  { to: '/programs', icon: 'fitness_center', labelAr: 'البرامج', labelEn: 'Programs' },
  { to: '/nutrition', icon: 'restaurant', labelAr: 'التغذية', labelEn: 'Nutrition' },
  { to: '/team', icon: 'groups', labelAr: 'الفريق', labelEn: 'Team' },
  { to: '/ai', icon: 'smart_toy', labelAr: 'المدرب الذكي', labelEn: 'AI Coach' },
];

const secondaryItems = [
  { to: '/education', icon: 'school', labelAr: 'التعليم', labelEn: 'Education' },
  { to: '/profile', icon: 'person', labelAr: 'الحساب', labelEn: 'Profile' },
  { to: '/settings', icon: 'settings', labelAr: 'الإعدادات', labelEn: 'Settings' },
  { to: '/telemetry', icon: 'monitoring', labelAr: 'التحليلات', labelEn: 'Telemetry' },
];

export default function Layout() {
  const { user } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isInstallable, installApp } = usePWAInstall();
  const isAr = language === 'ar';
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex">
      {/* ══════════ SIDEBAR (Desktop md+) ══════════ */}
      <aside className={`hidden md:flex flex-col fixed top-0 right-0 h-screen z-40 transition-all duration-300 ${sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'
        } glass border-l border-primary/10`}>

        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-primary/10">
          <div className="bg-gradient-to-br from-primary to-violet-500 p-2 rounded-xl shadow-lg shadow-primary/25 shrink-0">
            <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>fitness_center</span>
          </div>
          {!sidebarCollapsed && (
            <div className="animate-text-reveal">
              <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">HELMY</h1>
              <p className="text-[10px] text-slate-500 font-medium -mt-0.5">{isAr ? 'منصة اللياقة البدنية' : 'Fitness Platform'}</p>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`${sidebarCollapsed ? '' : 'mr-auto'} p-1.5 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors`}
          >
            <span className="material-symbols-outlined text-lg">{sidebarCollapsed ? 'menu_open' : 'menu'}</span>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
          {!sidebarCollapsed && (
            <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold px-3 mb-2 mt-1">{isAr ? 'الأقسام الرئيسية' : 'Main'}</p>
          )}
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-link ${isActive(item.to) ? 'active' : ''} ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              title={sidebarCollapsed ? (isAr ? item.labelAr : item.labelEn) : undefined}
            >
              <span className={`material-symbols-outlined text-xl sidebar-icon ${isActive(item.to) ? 'text-primary' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
              {!sidebarCollapsed && <span>{isAr ? item.labelAr : item.labelEn}</span>}
              {!sidebarCollapsed && isActive(item.to) && (
                <div className="mr-auto w-1.5 h-1.5 rounded-full bg-primary animate-subtle-pulse" />
              )}
            </Link>
          ))}

          {!sidebarCollapsed && (
            <div className="section-divider !my-4" />
          )}
          {sidebarCollapsed && <div className="h-px bg-primary/10 my-3" />}

          {!sidebarCollapsed && (
            <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold px-3 mb-2">{isAr ? 'إعدادات' : 'Settings'}</p>
          )}
          {secondaryItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-link ${isActive(item.to) ? 'active' : ''} ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              title={sidebarCollapsed ? (isAr ? item.labelAr : item.labelEn) : undefined}
            >
              <span className={`material-symbols-outlined text-xl sidebar-icon ${isActive(item.to) ? 'text-primary' : ''}`}>{item.icon}</span>
              {!sidebarCollapsed && <span>{isAr ? item.labelAr : item.labelEn}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-primary/10 space-y-1">
          <button onClick={toggleTheme} className={`sidebar-link w-full ${sidebarCollapsed ? 'justify-center px-0' : ''}`}>
            <span className="material-symbols-outlined text-xl">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            {!sidebarCollapsed && <span>{theme === 'dark' ? (isAr ? 'الوضع الفاتح' : 'Light') : (isAr ? 'الوضع الداكن' : 'Dark')}</span>}
          </button>
          <button onClick={toggleLanguage} className={`sidebar-link w-full ${sidebarCollapsed ? 'justify-center px-0' : ''}`}>
            <span className="material-symbols-outlined text-xl">language</span>
            {!sidebarCollapsed && <span>{isAr ? 'English' : 'العربية'}</span>}
          </button>

          {isInstallable && (
            <button onClick={installApp} className={`sidebar-link w-full bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors ${sidebarCollapsed ? 'justify-center px-0' : ''}`}>
              <span className="material-symbols-outlined text-xl">download</span>
              {!sidebarCollapsed && <span className="font-bold">{isAr ? 'تثبيت التطبيق' : 'Install App'}</span>}
            </button>
          )}

          {/* User Profile Mini */}
          {!sidebarCollapsed && user && (
            <Link to="/profile" className="flex items-center gap-3 p-2 mt-2 rounded-xl hover:bg-primary/5 transition-colors group">
              <div className="w-9 h-9 rounded-full border-2 border-primary/30 overflow-hidden shrink-0 group-hover:border-primary transition-colors">
                <img alt="" src={user.photoURL || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{user.displayName || (isAr ? 'المستخدم' : 'User')}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
              </div>
            </Link>
          )}
        </div>
      </aside>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <main ref={mainRef} className={`flex-1 min-w-0 overflow-x-hidden overflow-y-auto transition-all duration-300 ${sidebarCollapsed ? 'md:mr-[72px]' : 'md:mr-[260px]'
        } pb-20 md:pb-0`}>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <Outlet />
        </div>
      </main>

      {/* ══════════ BOTTOM NAV (Mobile only) ══════════ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-primary/15">
        <div className="flex items-center justify-around px-2 py-1.5 max-w-lg mx-auto">
          {navItems.slice(0, 5).map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`bottom-nav-item ${isActive(item.to) ? 'active' : ''}`}
            >
              <span className={`material-symbols-outlined text-[22px] ${isActive(item.to) ? 'text-primary' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
              <span className="font-semibold">{isAr ? item.labelAr : item.labelEn}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
