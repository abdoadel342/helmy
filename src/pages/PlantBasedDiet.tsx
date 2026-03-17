import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';

export default function PlantBasedDiet() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-b border-primary/10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-10 rounded-full hover:bg-primary/10 transition-colors"
        >
          <span className="material-symbols-outlined text-primary">arrow_forward</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight">النظام النباتي للرياضيين</h1>
        <div className="size-10"></div> {/* Spacer for balance */}
      </header>

      <main>
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 py-6">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl shadow-primary/20">
              <img 
                alt="Protein rich plant based meal" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApr58HZmaJP01XZuC_gkr5TiXSwRimBDLXfFf2NO2sWqM8ZMz8vdzIZpivPGkeKKURsBD2RBUEQkmXGifaR_XSTCjatqrPlfCp640-jP3TtcDVB7FlAjXqwku4uf-37OyctcvDQ9AK-n9LHdNgQFhTIObCTaCpubbD72onPgX2yJdg5lPG87YTswoSWEgm_sQ9rn63wT38l1t9BYVG1OGuYpD0dl1uJNrDNQNDSRscnBx-S8z-__oWdW3HeySC0FRqNSnTWZe8UEgr"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
              <div className="absolute bottom-4 right-4 left-4">
                <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">دليل التغذية الذكي</span>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Introduction */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">لماذا النظام النباتي؟</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              يعزز النظام الغذائي النباتي الأداء الرياضي من خلال تحسين سرعة الاستشفاء العضلي، تقليل مستويات الالتهاب في الجسم، وتوفير مصادر طاقة نظيفة ومستدامة تدعمك طوال فترة التمرين وما بعدها.
            </p>
          </section>
        </FadeContent>

        {/* Core Principles */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified</span>
              المبادئ الأساسية
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">fiber_manual_record</span>
                <div>
                  <h4 className="font-bold text-sm">ألياف عالية</h4>
                  <p className="text-xs text-slate-500 mt-1">لتحسين الهضم وامتصاص المغذيات بشكل أفضل.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">eco</span>
                <div>
                  <h4 className="font-bold text-sm">مضادات الأكسدة</h4>
                  <p className="text-xs text-slate-500 mt-1">لمحاربة الإجهاد التأكسدي الناتج عن التمرين المكثف.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">bolt</span>
                <div>
                  <h4 className="font-bold text-sm">طاقة نظيفة</h4>
                  <p className="text-xs text-slate-500 mt-1">كربوهيدرات معقدة توفر وقوداً ثابتاً للعضلات.</p>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Protein Sources */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">fitness_center</span>
              مصادر البروتين النباتي
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative aspect-square rounded-xl overflow-hidden">
                <img 
                  alt="Legumes" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv-6JODQfSoobA3_-0hO4Mx6qXxml3TfVxe6YxhSs4SyanL2XxWAVoV91wdMhiS2eFryN_-rXQSjBXFsdKZ84Az34sgz5RWvSsCFtbbav-WtR8SWxVktbK2l6zhLj3DnK4AFW2C4j51GVNPULAEuXHDxlX2k-m3XPdvSagHwjB0rCjmBZMVzVWYfTx_jfVDRkF8jo52VtuodiF1UrfTOZSkRAm4c2rcNmqIWiKVvEEfFuCFcVe0zvgWcSQyDfmGwUeYizDh2uYk448"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex flex-col justify-end p-3">
                  <p className="text-white font-bold text-sm">البقوليات</p>
                  <p className="text-white/70 text-[10px]">عدس، حمص، فاصوليا</p>
                </div>
              </div>
              <div className="group relative aspect-square rounded-xl overflow-hidden">
                <img 
                  alt="Soy Products" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj7zCG6Mof1Lpr8-yM3iugFlL_NmNlhwFkXe2sMkA9kgA-TQLLX_MeA7kHYcFzmVDC9X1i_lg8QBoKO1oFFyzZsvlWKeEfkPm8VSCDjh6zKaIh0WTIWTwHVDBUspPaW4ZkbHJMgBCFmPrwbARf5Ja-XgcQCoivZR7JgunVkLJnIe2mTrW9sxXg1f--axV0otuf0lleaTcuWk0Cknme0N6P2ljOsKRJ3NuVyh56NApWvPNikJPHE04yF_XNVxkPoPY82gvM3psQzZEo"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex flex-col justify-end p-3">
                  <p className="text-white font-bold text-sm">منتجات الصويا</p>
                  <p className="text-white/70 text-[10px]">توفو، تيمبي</p>
                </div>
              </div>
              <div className="group relative aspect-square rounded-xl overflow-hidden">
                <img 
                  alt="Grains" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0S6Vr_7gB31xS82LD0ynJmg6j2nkmG6_i3oNeWckp9MV_2D738hflkvu67lcjnarOB8S_8wxOVNciqmfmyq-Cjd2R3ts1SOByU1G7t-kk6tb1CRWS27NvRQGrHJuk0f_B0NP3K8_Nd9yYpbqK5fcLEj9Or95wpMqpTxa52I7pzgAHZ0-tN37zsONK0ou3Ghs4fWfZWMq2SbNOnpAW8K5B6Dmsa0RUXwW0bOJeM_LXqWaHsOd1LKkCKOmhKJJww-YY8YC0Lywhd4lo"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex flex-col justify-end p-3">
                  <p className="text-white font-bold text-sm">الحبوب الكاملة</p>
                  <p className="text-white/70 text-[10px]">كينوا، شوفان</p>
                </div>
              </div>
              <div className="group relative aspect-square rounded-xl overflow-hidden">
                <img 
                  alt="Nuts and Seeds" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfcm-aa1eU6Rd8U-_LsZg4a9v_D55od_xt9fVX4RIAgmvQIj28_CfYRkxWPZ4mjjU2jONRClvP1IfIGqgCDOtt74LrCQ8hHtBqLx1THE12EHtxs8nZ_U6SgZIh4oIvrm4t8sYYC80_WQZGKPRHvIpaifIOb_WlPrCBfID_23FrJnNs_cIz4_7xNSdAl3cBHcWmBAXr-Am0hpZc9tPuAWfpUR5xXS4ZylDbKO8wiYawabyYsFCnadiF9tzNjWoNpzejtzvImUVBQqQm"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex flex-col justify-end p-3">
                  <p className="text-white font-bold text-sm">المكسرات والبذور</p>
                  <p className="text-white/70 text-[10px]">شيا، جوز، بذور الكتان</p>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Essential Nutrients */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">monitoring</span>
              عناصر يجب مراقبتها
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <div className="min-w-[120px] p-4 rounded-xl bg-slate-100 dark:bg-primary/10 border border-slate-200 dark:border-primary/20 text-center">
                <div className="text-primary font-bold text-lg mb-1">B12</div>
                <p className="text-[10px] text-slate-500">فيتامين الأعصاب</p>
              </div>
              <div className="min-w-[120px] p-4 rounded-xl bg-slate-100 dark:bg-primary/10 border border-slate-200 dark:border-primary/20 text-center">
                <div className="text-primary font-bold text-lg mb-1">حديد</div>
                <p className="text-[10px] text-slate-500">لنقل الأكسجين</p>
              </div>
              <div className="min-w-[120px] p-4 rounded-xl bg-slate-100 dark:bg-primary/10 border border-slate-200 dark:border-primary/20 text-center">
                <div className="text-primary font-bold text-lg mb-1">زنك</div>
                <p className="text-[10px] text-slate-500">لدعم المناعة</p>
              </div>
              <div className="min-w-[120px] p-4 rounded-xl bg-slate-100 dark:bg-primary/10 border border-slate-200 dark:border-primary/20 text-center">
                <div className="text-primary font-bold text-lg mb-1">أوميغا-3</div>
                <p className="text-[10px] text-slate-500">لصحة القلب</p>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Sample Meal Plan */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">restaurant_menu</span>
              نموذج يومي مقترح
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex flex-col items-center justify-center border border-primary/20">
                  <span className="material-symbols-outlined text-primary">wb_sunny</span>
                  <span className="text-[10px] font-bold">فطور</span>
                </div>
                <div className="flex-1 border-b border-primary/10 pb-2">
                  <p className="text-sm font-semibold">شوفان بالبذور والفواكه</p>
                  <p className="text-xs text-slate-500">شوفان، بذور الشيا، توت، حليب لوز</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex flex-col items-center justify-center border border-primary/20">
                  <span className="material-symbols-outlined text-primary">lunch_dining</span>
                  <span className="text-[10px] font-bold">غداء</span>
                </div>
                <div className="flex-1 border-b border-primary/10 pb-2">
                  <p className="text-sm font-semibold">سلطة كينوا وفاصوليا سوداء</p>
                  <p className="text-xs text-slate-500">كينوا، فاصوليا، أفوكادو، ليمون</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex flex-col items-center justify-center border border-primary/20">
                  <span className="material-symbols-outlined text-primary">dinner_dining</span>
                  <span className="text-[10px] font-bold">عشاء</span>
                </div>
                <div className="flex-1 border-b border-primary/10 pb-2">
                  <p className="text-sm font-semibold">ستير-فراي التوفو</p>
                  <p className="text-xs text-slate-500">توفو، بروكلي، أرز بني، صوص صويا</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex flex-col items-center justify-center border border-primary/20">
                  <span className="material-symbols-outlined text-primary">icecream</span>
                  <span className="text-[10px] font-bold">سناك</span>
                </div>
                <div className="flex-1 pb-2">
                  <p className="text-sm font-semibold">مخفوق بروتين نباتي</p>
                  <p className="text-xs text-slate-500">مكسرات، فاكهة، بروتين البازلاء</p>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Call to Action */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 mt-10">
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-primary/40">
              <span className="material-symbols-outlined">menu_book</span>
              اكتشف الوصفات النباتية
            </button>
          </div>
        </FadeContent>
      </main>
    </div>
  );
}
