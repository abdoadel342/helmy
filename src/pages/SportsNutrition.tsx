import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';

export default function SportsNutrition() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Header Section */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/20">
        <div className="flex items-center p-4 justify-between max-w-2xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-white hover:bg-primary/20 p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <h1 className="text-slate-900 dark:text-white text-lg font-bold flex-1 text-center">تغذية الرياضيين</h1>
          <button className="text-slate-900 dark:text-white hover:bg-primary/20 p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full pb-24">
        {/* Hero Image */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 py-4">
            <div className="relative h-56 w-full overflow-hidden rounded-xl shadow-2xl group">
              <img 
                alt="Sports Nutrition" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsv1spO5eXzInYTq6B5b5Dw2qE7vrsz5sN6hqNektoqUXmFIOJcaZ5F1fJB3fbZjGsaRxCbhm1AZBSYS6ZzsvJmwQoF3xN-s7Fm0x1ULgb9NtPjeLmwlHx2OVFr9F8rg5N6_1z924GwXaDeQzqhdas--75jSdiUa_yTkekMWdbCCjtDiyoYBWHvCoE_hkmuhpKvQD6qlpKaLM7ttj9tQrfWTChSQ7ywPlY2MiQW6eaJJoNLoc7wp4EgSIhNZMzsYSRwOsw52fHYPjD"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
              <div className="absolute bottom-4 right-4">
                <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider inline-block">
                  <ShinyText text="دليل شامل" disabled={false} speed={3} className="text-white" />
                </span>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Navigation Tabs */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 mb-6">
            <div className="flex border-b border-primary/20 overflow-x-auto no-scrollbar">
              <button className="border-b-2 border-primary px-4 py-3 text-sm font-bold text-primary shrink-0">المغذيات</button>
              <button onClick={() => navigate('/nutrition/calculator')} className="border-b-2 border-transparent px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 shrink-0 hover:text-primary transition-colors">حساب الطاقة</button>
              <button onClick={() => navigate('/nutrition/systems')} className="border-b-2 border-transparent px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 shrink-0 hover:text-primary transition-colors">الأنظمة الغذائية</button>
              <button className="border-b-2 border-transparent px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 shrink-0">الفحوصات</button>
            </div>
          </div>
        </FadeContent>

        {/* Macronutrients Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 space-y-4 mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">nutrition</span>
              المغذيات الكبرى (Macros)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <SpotlightCard className="p-4 rounded-xl border-r-4 border-r-orange-500 bg-primary/5 border border-primary/10" spotlightColor="rgba(249, 115, 22, 0.15)">
                <div className="flex justify-between items-start mb-2">
                  <span className="material-symbols-outlined text-orange-500">bakery_dining</span>
                  <span className="text-xs font-bold text-orange-500">4 سعرات/جم</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">الكربوهيدرات</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">المصدر الأساسي للطاقة وتحويل الغليكوجين في العضلات.</p>
              </SpotlightCard>
              
              <SpotlightCard className="p-4 rounded-xl border-r-4 border-r-blue-500 bg-primary/5 border border-primary/10" spotlightColor="rgba(59, 130, 246, 0.15)">
                <div className="flex justify-between items-start mb-2">
                  <span className="material-symbols-outlined text-blue-500">egg_alt</span>
                  <span className="text-xs font-bold text-blue-500">4 سعرات/جم</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">البروتينات</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">بناء الأنسجة العضلية وترميمها بعد المجهود البدني.</p>
              </SpotlightCard>

              <SpotlightCard className="p-4 rounded-xl border-r-4 border-r-yellow-500 bg-primary/5 border border-primary/10" spotlightColor="rgba(234, 179, 8, 0.15)">
                <div className="flex justify-between items-start mb-2">
                  <span className="material-symbols-outlined text-yellow-500">opacity</span>
                  <span className="text-xs font-bold text-yellow-500">9 سعرات/جم</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">الدهون</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">تنظيم الهرمونات وتوفير طاقة مستدامة للتمارين الطويلة.</p>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Classification Info */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 mb-8">
            <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
              <h3 className="text-primary font-bold mb-2">تصنيف المغذيات</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="size-2 bg-primary rounded-full"></span>
                  <p><span className="font-bold">المغذيات الكبرى:</span> تُقاس بالجرام.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 bg-primary rounded-full"></span>
                  <p><span className="font-bold">المغذيات الصغرى:</span> فيتامينات ومعادن (ملجم/ميكروجم).</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 bg-blue-400 rounded-full"></span>
                  <p><span className="font-bold">الماء:</span> العنصر الحيوي لترطيب الخلايا والأداء البدني.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Energy Calculations */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calculate</span>
                حسابات الطاقة والتمثيل الغذائي
              </h2>
            </div>
            
            <Link to="/nutrition/calculator" className="bg-primary text-white rounded-xl p-4 flex gap-4 items-center block hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 mb-4">
              <div className="size-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl text-white">calculate</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">حاسبة الطاقة الذكية</h3>
                <p className="text-xs text-white/80">احسب احتياجك اليومي من السعرات الحرارية بدقة</p>
              </div>
              <span className="material-symbols-outlined text-white/50">arrow_back_ios</span>
            </Link>

            <div className="bg-white dark:bg-background-dark border border-black/5 dark:border-white/5 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
                <h3 className="font-bold">مكونات استهلاك الطاقة اليومي (TEE)</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">60%</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">BMR (معدل الأيض الأساسي)</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">الطاقة المستهلكة في وقت الراحة (Harris-Benedict / Mifflin).</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">10%</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">TEF (التأثير الحراري للطعام)</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">الطاقة اللازمة لهضم وامتصاص الغذاء.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">30%</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">PAL (مستوى النشاط البدني)</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">عامل ضرب النشاط (1.2 خامل إلى 2.0 رياضي محترف).</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Body Types */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 space-y-4 mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">أنماط الجسم وتوزيع المغذيات</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SpotlightCard className="p-4 rounded-xl text-center bg-primary/5 border border-primary/10" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary mb-2">person_outline</span>
                <h4 className="font-bold text-sm">Ectomorph</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2">نحيف، حرق سريع</p>
                <div className="bg-primary/20 px-2 py-1 rounded text-[10px] font-bold text-primary dark:text-white">55% كربوهيدرات</div>
              </SpotlightCard>
              
              <SpotlightCard className="p-4 rounded-xl text-center bg-primary/5 border-primary/40 ring-1 ring-primary/40" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary mb-2">accessibility_new</span>
                <h4 className="font-bold text-sm">Mesomorph</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2">عضلي، حرق متوازن</p>
                <div className="bg-primary/20 px-2 py-1 rounded text-[10px] font-bold text-primary dark:text-white">40% كربوهيدرات</div>
              </SpotlightCard>
              
              <SpotlightCard className="p-4 rounded-xl text-center bg-primary/5 border border-primary/10" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary mb-2">person_add</span>
                <h4 className="font-bold text-sm">Endomorph</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2">ممتلئ، حرق بطيء</p>
                <div className="bg-primary/20 px-2 py-1 rounded text-[10px] font-bold text-primary dark:text-white">25% كربوهيدرات</div>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Portion Sizes */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 space-y-4 mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">تقدير الحصص باليد</h2>
            <div className="grid grid-cols-2 gap-3">
              <SpotlightCard className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-lg" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary">front_hand</span>
                <div>
                  <p className="text-xs font-bold">راحة اليد</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">حصص البروتين</p>
                </div>
              </SpotlightCard>
              <SpotlightCard className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-lg" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary">back_hand</span>
                <div>
                  <p className="text-xs font-bold">قبضة اليد</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">حصص النشويات</p>
                </div>
              </SpotlightCard>
              <SpotlightCard className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-lg" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary">thumb_up</span>
                <div>
                  <p className="text-xs font-bold">الإبهام</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">حصص الدهون</p>
                </div>
              </SpotlightCard>
              <SpotlightCard className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-lg" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary">pan_tool_alt</span>
                <div>
                  <p className="text-xs font-bold">كفة اليد</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">الخضروات</p>
                </div>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Lab Tests */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 space-y-4 mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">science</span>
              الفحوصات المخبرية المهمة
            </h2>
            <div className="bg-white dark:bg-background-dark border border-primary/30 rounded-xl p-4 shadow-sm">
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm border-b border-black/5 dark:border-white/5 pb-2">
                  <span>مقاومة الأنسولين (HOMA IR)</span>
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </li>
                <li className="flex justify-between items-center text-sm border-b border-black/5 dark:border-white/5 pb-2">
                  <span>وظائف الغدة الدرقية (TSH)</span>
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </li>
                <li className="flex justify-between items-center text-sm border-b border-black/5 dark:border-white/5 pb-2">
                  <span>مستوى فيتامين D</span>
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span>هرمون الحليب (Prolactin)</span>
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </li>
              </ul>
            </div>
          </section>
        </FadeContent>

        {/* Interactive Meal Planning Outline */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">خارطة تخطيط الوجبات</h2>
            <div className="space-y-2">
              <details className="bg-slate-50 dark:bg-white/5 rounded-lg overflow-hidden group border border-black/5 dark:border-white/5">
                <summary className="p-4 cursor-pointer font-bold list-none flex justify-between items-center group-open:bg-primary/10 dark:group-open:bg-primary/20">
                  <span>1. أساسيات التغذية</span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="p-4 text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-transparent">تعلم الفرق بين السعرات الحرارية والقيمة الغذائية وكيفية قراءة الملصقات الغذائية.</div>
              </details>
              
              <details className="bg-slate-50 dark:bg-white/5 rounded-lg overflow-hidden group border border-black/5 dark:border-white/5">
                <summary className="p-4 cursor-pointer font-bold list-none flex justify-between items-center group-open:bg-primary/10 dark:group-open:bg-primary/20">
                  <span>2. تقييم الحالة التغذوية</span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="p-4 text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-transparent">استخدام قياسات الجسم (InBody) والفحوصات لتحديد نقطة البداية.</div>
              </details>
              
              <details className="bg-slate-50 dark:bg-white/5 rounded-lg overflow-hidden group border border-black/5 dark:border-white/5">
                <summary className="p-4 cursor-pointer font-bold list-none flex justify-between items-center group-open:bg-primary/10 dark:group-open:bg-primary/20">
                  <span>3. خرافات الأنظمة الغذائية</span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="p-4 text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-transparent">الحقيقة وراء الديتوكس، قطع الكربوهيدرات، والمكملات السحرية.</div>
              </details>
            </div>
          </section>
        </FadeContent>

        {/* Smart Tip CTA */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 mb-8">
            <div className="bg-gradient-to-r from-primary to-purple-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-white">lightbulb</span>
                  <h3 className="text-white font-bold">نصيحة ذكية</h3>
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  تخطيط الوجبات المسبق (Meal Prep) هو المفتاح الحقيقي للاستمرارية. ابدأ بتجهيز وجبتين ليوم غدٍ وستلاحظ الفرق في طاقتك والتزامك.
                </p>
                <button className="bg-white text-primary px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-slate-100 transition-colors">ابدأ الآن</button>
              </div>
              <span className="material-symbols-outlined absolute -bottom-4 -left-4 text-white/10 text-9xl">tips_and_updates</span>
            </div>
          </div>
        </FadeContent>

        {/* Healthy Limits Footer Info */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 mb-12">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-black/10 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5">
                <p className="text-xs text-slate-500 dark:text-slate-400">السكر المضاف</p>
                <p className="text-lg font-bold text-red-500 dark:text-red-400">&lt; 10%</p>
              </div>
              <div className="p-4 border border-black/10 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5">
                <p className="text-xs text-slate-500 dark:text-slate-400">الصوديوم اليومي</p>
                <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">2300mg</p>
              </div>
            </div>
            <div className="mt-4 p-4 border border-primary/20 rounded-xl bg-primary/5 text-center">
              <p className="text-sm font-bold">النشاط البدني الموصى به</p>
              <p className="text-primary font-bold text-xl">150 - 300 دقيقة / أسبوع</p>
            </div>
          </section>
        </FadeContent>
      </main>


    </div>
  );
}
