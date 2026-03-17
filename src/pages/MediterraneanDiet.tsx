import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';

export default function MediterraneanDiet() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden font-display">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-primary/10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="text-slate-900 dark:text-slate-100 flex size-10 items-center justify-center rounded-full hover:bg-primary/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
          </button>
          <h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">حمية البحر المتوسط</h1>
        </div>
        <div className="size-10 flex items-center justify-center rounded-full bg-primary/10">
          <span className="material-symbols-outlined text-primary">restaurant_menu</span>
        </div>
      </header>

      <main className="flex-1 pb-12 max-w-2xl mx-auto w-full">
        {/* Hero Image */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="@container">
            <div className="@[480px]:px-4 @[480px]:py-4">
              <div 
                className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden @[480px]:rounded-xl min-h-[320px] shadow-2xl relative group" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtzWD-kq8f02hNWumW4KL4nHjHBWoC5XxXEiP__L6t-Ky85_NBWrT02OvwoYvDW6kWVd0mMRGPvRXiVvl8LaOhgJj_A4jdEjpRH_S09EkZgV-jkXL9ScVy-CLFAjLhZHnzyjChrgC8gY0tW29mDPvZJunzKvuuhJ1UbGs2ntFyZ5e9eRudd7F7IZGTxoI8tgCM3Q0BE6b5xo02qEt3uCgDWY1qwzsYFQ_DUQx_MnXhhJqgM47eJUpKbZ4_o2x__pV7tjxvk5_e9oXz")' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60"></div>
                <div className="relative p-6">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-2">النظام الصحي الأول</span>
                  <h2 className="text-white text-3xl font-bold">التوازن الطبيعي</h2>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Overview Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 pt-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary">info</span>
              <h2 className="text-slate-900 dark:text-slate-100 text-[22px] font-bold leading-tight tracking-[-0.015em]">نظرة عامة</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed text-justify">
              تعتبر حمية البحر الأبيض المتوسط من أكثر الأنظمة الغذائية صحة في العالم. لا تعتبر مجرد "حمية" بل هي نمط حياة مستوحى من العادات الغذائية التقليدية لسكان اليونان وإيطاليا وإسبانيا، حيث تركز على الأطعمة النباتية والدهون الصحية والنشاط البدني المستمر.
            </p>
          </section>
        </FadeContent>

        {/* Core Principles */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 pt-10">
            <h2 className="text-slate-900 dark:text-slate-100 text-[20px] font-bold mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified</span>
              المبادئ الأساسية
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary">eco</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">أساس نباتي</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">التركيز على الفواكه، الخضروات، البقوليات، والمكسرات كجزء أساسي من كل وجبة.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary">water_drop</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">دهون صحية</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">استبدال الزبدة والدهون المشبعة بزيت الزيتون البكر الممتاز كمصدر رئيسي للدهون.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary">set_meal</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">بروتين معتدل</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">تفضيل الأسماك والدواجن على اللحوم الحمراء وبكميات معتدلة جداً خلال الأسبوع.</p>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Food Guide */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 pt-10">
            <h2 className="text-slate-900 dark:text-slate-100 text-[20px] font-bold mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">format_list_bulleted</span>
              دليل الغذاء
            </h2>
            <div className="space-y-6">
              {/* Daily */}
              <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/40 p-1">
                <div className="flex items-center gap-3 p-3 bg-primary rounded-lg text-white mb-1">
                  <span className="material-symbols-outlined">calendar_today</span>
                  <span className="font-bold">يومياً</span>
                </div>
                <div className="p-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  الخضروات الورقية، الفواكه الموسمية، الحبوب الكاملة، زيت الزيتون، والمكسرات النيئة.
                </div>
              </div>
              {/* Weekly */}
              <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/40 p-1">
                <div className="flex items-center gap-3 p-3 bg-primary/60 rounded-lg text-white mb-1">
                  <span className="material-symbols-outlined">calendar_view_week</span>
                  <span className="font-bold">أسبوعياً</span>
                </div>
                <div className="p-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  الأسماك والمأكولات البحرية (مرتين على الأقل)، الدواجن، البيض، ومنتجات الألبان (زبادي، أجبان).
                </div>
              </div>
              {/* Monthly */}
              <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/40 p-1">
                <div className="flex items-center gap-3 p-3 bg-slate-500 rounded-lg text-white mb-1">
                  <span className="material-symbols-outlined">event_note</span>
                  <span className="font-bold">شهرياً (بكميات محدودة)</span>
                </div>
                <div className="p-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  اللحوم الحمراء، الحلويات الغنية بالسكر، واللحوم المصنعة.
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Health Benefits */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 pt-10">
            <div className="bg-gradient-to-br from-primary/20 to-transparent p-6 rounded-2xl border border-primary/20">
              <h2 className="text-slate-900 dark:text-slate-100 text-[20px] font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">favorite</span>
                الفوائد الصحية
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-primary text-sm">circle</span>
                  <span>تعزيز صحة القلب وتقليل خطر السكتات الدماغية.</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-primary text-sm">circle</span>
                  <span>خصائص مضادة للالتهابات بفضل زيت الزيتون والأوميغا 3.</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-primary text-sm">circle</span>
                  <span>المساعدة في الحفاظ على وزن صحي ومثالي بشكل طبيعي.</span>
                </li>
              </ul>
            </div>
          </section>
        </FadeContent>

        {/* Tips Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 pt-10">
            <h2 className="text-slate-900 dark:text-slate-100 text-[20px] font-bold mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
              نصائح لنجاح الحمية
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background-light dark:bg-slate-800/40 p-4 rounded-xl border border-primary/5 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary text-3xl mb-2">groups</span>
                <h4 className="font-bold text-sm mb-1">التواصل الاجتماعي</h4>
                <p className="text-xs text-slate-500">استمتع بوجباتك مع العائلة والأصدقاء.</p>
              </div>
              <div className="bg-background-light dark:bg-slate-800/40 p-4 rounded-xl border border-primary/5 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary text-3xl mb-2">directions_run</span>
                <h4 className="font-bold text-sm mb-1">النشاط البدني</h4>
                <p className="text-xs text-slate-500">مارس الرياضة أو المشي بانتظام يومياً.</p>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Back Action */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 pt-12">
            <button 
              onClick={() => navigate('/nutrition/systems')}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
              <span>العودة لصفحة الأنظمة الغذائية</span>
            </button>
          </div>
        </FadeContent>
      </main>

      <footer className="p-6 text-center text-slate-500 text-xs">
        © 2024 تطبيق HELMY - مرشدك الصحي المتكامل
      </footer>
    </div>
  );
}
