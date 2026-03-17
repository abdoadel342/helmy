import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';

export default function Psychology() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-primary/10">
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-900 dark:text-slate-100 flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">سيكولوجية الرياضة</h1>
        <div className="size-10"></div> {/* Spacer for symmetry */}
      </header>

      <main className="flex-1 pb-32 max-w-2xl mx-auto w-full">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="@container px-4 py-3">
            <div 
              className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-80 relative group" 
              style={{ backgroundImage: 'linear-gradient(0deg, rgba(25, 16, 34, 0.8) 0%, rgba(25, 16, 34, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJMevs6yiRKUG1B9T7qj8NXv_jSvx7f0tEd91p7z-MHQ-0A1DMNH7blUW4CLEJE-Hkfm8iS3e5JlQP8vaayxn6ceHLvNHcxkCVg1810j2-XY2NiWO7w2ulFnKRirZItLjLT9bo7zOkKFl-XJVMCiK_V-940bU-8EfTlL9rgHWPi9pcv4bIA7m-B4HS9GzfJtvzGRThy0GXWnf0HFICIcxIt-1oWFvwT9hO4qvkEGn6VzYhx9oprIYOJRmLJ4o_KpYe1aZ_LKNG8Bsk")' }}
            >
              <div className="p-6">
                <span className="bg-primary px-3 py-1 rounded-full text-xs font-semibold mb-2 inline-block text-white">تطوير ذهني</span>
                <h2 className="text-white text-3xl font-bold leading-tight">
                  <ShinyText text="العقل فوق العضلة" disabled={false} speed={3} className="text-white" />
                </h2>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Section 1: Motivation */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary">psychology</span>
              <h3 className="text-xl font-bold">الدافع والتحفيز</h3>
            </div>
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                فهم الدوافع هو المفتاح للاستمرارية. ينقسم التحفيز إلى نوعين أساسيين:
              </p>
              <div className="grid grid-cols-1 gap-3">
                <SpotlightCard className="flex items-start gap-3 p-3 bg-white dark:bg-white/5 rounded-lg border border-primary/5" spotlightColor="rgba(115, 17, 212, 0.15)">
                  <span className="material-symbols-outlined text-primary mt-1">favorite</span>
                  <div>
                    <h4 className="font-bold text-primary">الدافع الداخلي</h4>
                    <p className="text-sm opacity-80 text-slate-700 dark:text-slate-300">حب اللعبة، الاستمتاع بالتحدي، والشعور بالإنجاز الشخصي.</p>
                  </div>
                </SpotlightCard>
                <SpotlightCard className="flex items-start gap-3 p-3 bg-white dark:bg-white/5 rounded-lg border border-primary/5" spotlightColor="rgba(115, 17, 212, 0.15)">
                  <span className="material-symbols-outlined text-primary mt-1">emoji_events</span>
                  <div>
                    <h4 className="font-bold text-primary">الدافع الخارجي</h4>
                    <p className="text-sm opacity-80 text-slate-700 dark:text-slate-300">المكافآت، الميداليات، والاعتراف الاجتماعي من الآخرين.</p>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Section 2: Mental Toughness */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6 bg-primary/5">
            <h3 className="text-xl font-bold mb-5 px-1">الصلابة الذهنية</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="size-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                </div>
                <p className="text-sm font-medium">المرونة</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="size-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>self_improvement</span>
                </div>
                <p className="text-sm font-medium">الثقة</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="size-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>center_focus_strong</span>
                </div>
                <p className="text-sm font-medium">التركيز</p>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Section 3: Anxiety Management */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <h3 className="text-xl font-bold mb-4">إدارة القلق والتوتر</h3>
            <div className="space-y-4">
              <SpotlightCard className="flex gap-4 items-center p-4 rounded-xl border border-primary/20 bg-white dark:bg-background-dark" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <span className="material-symbols-outlined text-primary">air</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">التنفس العميق</h4>
                  <p className="text-sm opacity-70 text-slate-600 dark:text-slate-400">تقنية 4-7-8 لتهدئة الجهاز العصبي فوراً.</p>
                </div>
              </SpotlightCard>
              <SpotlightCard className="flex gap-4 items-center p-4 rounded-xl border border-primary/20 bg-white dark:bg-background-dark" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <span className="material-symbols-outlined text-primary">visibility</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">التصور الذهني</h4>
                  <p className="text-sm opacity-70 text-slate-600 dark:text-slate-400">تخيل الأداء المثالي والنجاح قبل بدء المنافسة.</p>
                </div>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Section 4: Goal Setting */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <h3 className="text-xl font-bold mb-4 relative z-10">تحديد الأهداف (SMART)</h3>
              <ul className="space-y-3 relative z-10">
                <li className="flex items-center gap-3">
                  <span className="size-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">S</span>
                  <span className="text-sm">محددة (Specific)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="size-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">M</span>
                  <span className="text-sm">قابلة للقياس (Measurable)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="size-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">A</span>
                  <span className="text-sm">قابلة للتحقيق (Achievable)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="size-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">R</span>
                  <span className="text-sm">ذات صلة (Relevant)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="size-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">T</span>
                  <span className="text-sm">محددة زمنياً (Time-bound)</span>
                </li>
              </ul>
            </div>
          </section>
        </FadeContent>

        {/* Section 5: Focus Guide */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <h3 className="text-xl font-bold mb-3">التركيز والاسترخاء</h3>
            <div className="bg-primary/5 rounded-xl p-5 border-r-4 border-primary">
              <p className="italic text-slate-700 dark:text-slate-300">
                "الاسترخاء ليس غياب النشاط، بل هو توجيه الطاقة نحو الهدف الصحيح في الوقت المناسب."
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 rounded-full text-xs">تأمل يومي</span>
                <span className="px-3 py-1 bg-primary/10 rounded-full text-xs">تحليل الأداء</span>
                <span className="px-3 py-1 bg-primary/10 rounded-full text-xs">روتين ما قبل الأداء</span>
              </div>
            </div>
          </section>
        </FadeContent>
      </main>

      {/* Footer Button */}
      <div className="fixed bottom-[72px] left-0 right-0 w-full p-4 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent z-40 max-w-2xl mx-auto">
        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-colors">
          <span>ابدأ تدريبك الذهني الآن</span>
          <span className="material-symbols-outlined">bolt</span>
        </button>
      </div>
    </div>
  );
}
