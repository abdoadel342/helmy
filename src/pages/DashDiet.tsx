import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';

export default function DashDiet() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden font-display">
      {/* Header Section */}
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 sticky top-0 z-10 border-b border-primary/10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight flex-1 text-center mr-[-40px]">حمية DASH</h2>
      </header>

      <main className="flex-1 pb-12 max-w-2xl mx-auto w-full">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 py-4">
            <div 
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-64 shadow-lg border border-primary/20" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBp_QLxFH9SqqduQJ4h2FCFrrRlWXARw1w-u1Q0KjhL6tYVjItv284rlq9ltIh3RlNKdXVVJr2Yi7lF-HO5JEaB-_7UOa30i-W8TaxsLJUVsazd5E1jPXSo1T3j3ti4vbKof1qz0sQlwa5byya2MrewGPdLmNcEF0tPGx7FUENzK5SVZVOMo2lal0axDRWccmcCuUV6joes5K-U0eE_hkRG6uM6K9Nu0dWeuACWX6P44du_WMiQX_KWjK08ybP62d8K_KJ_YszFGKYu")' }}
            >
              <div className="bg-gradient-to-t from-background-dark/90 to-transparent p-6">
                <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">نظام غذائي صحي</span>
                <h1 className="text-white text-3xl font-bold mt-2">حمية DASH للقلب</h1>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Overview Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <h2 className="text-primary text-2xl font-bold mb-3">نظرة عامة</h2>
            <div className="bg-primary/5 border-r-4 border-primary p-4 rounded-l-lg">
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                حمية DASH (الأساليب الغذائية لوقف ارتفاع ضغط الدم) هي خطة مرنة ومتوازنة لتناول الطعام تساعد في خلق نمط أكل صحي للقلب مدى الحياة. صُممت خصيصاً للمساعدة في خفض ضغط الدم المرتفع وتقليل مخاطر أمراض القلب.
              </p>
            </div>
          </section>
        </FadeContent>

        {/* Key Principles */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-4 bg-primary/5 my-4">
            <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              المبادئ الأساسية
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-primary/20">
                <span className="material-symbols-outlined text-primary mb-1">salinity</span>
                <h4 className="font-bold text-sm">صوديوم منخفض</h4>
                <p className="text-xs text-slate-500">تقليل الملح بشكل كبير</p>
              </div>
              <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-primary/20">
                <span className="material-symbols-outlined text-primary mb-1">nutrition</span>
                <h4 className="font-bold text-sm">بوتاسيوم عالي</h4>
                <p className="text-xs text-slate-500">من الفواكه والخضروات</p>
              </div>
              <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-primary/20">
                <span className="material-symbols-outlined text-primary mb-1">bolt</span>
                <h4 className="font-bold text-sm">مغنيسيوم</h4>
                <p className="text-xs text-slate-500">لتعزيز وظائف القلب</p>
              </div>
              <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-primary/20">
                <span className="material-symbols-outlined text-primary mb-1">skeleton</span>
                <h4 className="font-bold text-sm">كالسيوم</h4>
                <p className="text-xs text-slate-500">من منتجات الألبان قليلة الدسم</p>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Daily Servings Guide */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold mb-4">دليل الحصص اليومية</h3>
            <div className="overflow-hidden rounded-xl border border-primary/20">
              <table className="w-full text-right text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-3">المجموعة الغذائية</th>
                    <th className="p-3">الحصص اليومية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  <tr className="bg-background-light dark:bg-background-dark">
                    <td className="p-3 font-medium">الحبوب الكاملة</td>
                    <td className="p-3">6 - 8 حصص</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="p-3 font-medium">الخضروات</td>
                    <td className="p-3">4 - 5 حصص</td>
                  </tr>
                  <tr className="bg-background-light dark:bg-background-dark">
                    <td className="p-3 font-medium">الفواكه</td>
                    <td className="p-3">4 - 5 حصص</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="p-3 font-medium">ألبان قليلة الدسم</td>
                    <td className="p-3">2 - 3 حصص</td>
                  </tr>
                  <tr className="bg-background-light dark:bg-background-dark">
                    <td className="p-3 font-medium">لحوم وهبرة وبقوليات</td>
                    <td className="p-3">6 أو أقل</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </FadeContent>

        {/* Health Benefits */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-4">
            <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold mb-4">الفوائد الصحية</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg">
                <span className="material-symbols-outlined text-green-500">favorite</span>
                <div>
                  <h4 className="font-bold">خفض ضغط الدم</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">تساعد بفعالية في تقليل ضغط الدم الانقباضي والانبساطي.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg">
                <span className="material-symbols-outlined text-blue-500">health_and_safety</span>
                <div>
                  <h4 className="font-bold">صحة القلب</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">تقليل الكوليسترول الضار والدهون الثلاثية في الدم.</p>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Tips for Starting */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold mb-4">نصائح للبدء</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="size-6 bg-primary text-white rounded-full flex items-center justify-center text-xs shrink-0">1</div>
                <p className="text-sm">أضف حصة واحدة من الخضروات إلى الغداء والعشاء تدريجياً.</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-6 bg-primary text-white rounded-full flex items-center justify-center text-xs shrink-0">2</div>
                <p className="text-sm">استبدل الملح بالأعشاب والتوابل والليمون لإضافة النكهة.</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-6 bg-primary text-white rounded-full flex items-center justify-center text-xs shrink-0">3</div>
                <p className="text-sm">اختر الفواكه الطازجة كوجبات خفيفة بدلاً من الحلويات المصنعة.</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-6 bg-primary text-white rounded-full flex items-center justify-center text-xs shrink-0">4</div>
                <p className="text-sm">اقرأ الملصقات الغذائية لاختيار المنتجات ذات الصوديوم المنخفض.</p>
              </li>
            </ul>
          </section>
        </FadeContent>

        {/* Footer Button */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 pt-4">
            <button 
              onClick={() => navigate('/nutrition/systems')}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">restaurant_menu</span>
              العودة إلى قائمة الحميات
            </button>
          </div>
        </FadeContent>
      </main>

      <footer className="p-6 text-center text-slate-500 text-xs mt-4">
        تطبيق حلمي © 2024 - دليل التغذية الصحي
      </footer>
    </div>
  );
}
