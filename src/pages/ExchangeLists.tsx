import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';

export default function ExchangeLists() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden font-display">
      {/* Header Section */}
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-primary/10">
        <div 
          onClick={() => navigate(-1)}
          className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center mr-[-40px]">نظام البدائل الغذائية</h2>
      </header>

      <main className="flex-1 pb-12 max-w-2xl mx-auto w-full">
        {/* Search Bar */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 py-4">
            <label className="flex flex-col min-w-40 h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                <div className="text-primary/70 flex border-none bg-primary/5 dark:bg-primary/10 items-center justify-center pr-4 rounded-r-xl">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input 
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-1 focus:ring-primary border-none bg-primary/5 dark:bg-primary/10 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-base font-normal leading-normal" 
                  placeholder="بحث عن صنف غذائي..." 
                />
              </div>
            </label>
          </div>
        </FadeContent>

        {/* Introduction */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 py-4">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-5 text-white shadow-lg shadow-primary/20">
              <h2 className="text-xl font-bold mb-2">حول نظام البدائل</h2>
              <p className="text-sm opacity-90 leading-relaxed">
                يسمح لك نظام البدائل بتنويع مصادر غذائك مع الحفاظ على أهداف السعرات الحرارية والعناصر الغذائية الكبرى (الماكروز). كل حصة في المجموعة الواحدة تعادل الأخرى من حيث القيمة الغذائية.
              </p>
            </div>
          </div>
        </FadeContent>

        {/* Food Groups Grid */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 py-4">
            <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">grid_view</span>
              المجموعات الغذائية
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Starch */}
              <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 p-4 rounded-2xl flex flex-col items-center text-center">
                <div className="size-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 mb-3">
                  <span className="material-symbols-outlined text-3xl">bakery_dining</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">النشويات</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">الحصة: 1/2 كوب أو 1 شريحة</p>
              </div>
              
              {/* Fruits */}
              <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 p-4 rounded-2xl flex flex-col items-center text-center">
                <div className="size-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 mb-3">
                  <span className="material-symbols-outlined text-3xl">nutrition</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">الفواكه</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">الحصة: ثمرة متوسطة</p>
              </div>
              
              {/* Vegetables */}
              <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 p-4 rounded-2xl flex flex-col items-center text-center">
                <div className="size-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 mb-3">
                  <span className="material-symbols-outlined text-3xl">eco</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">الخضروات</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">الحصة: 1 كوب (طازج)</p>
              </div>
              
              {/* Dairy */}
              <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 p-4 rounded-2xl flex flex-col items-center text-center">
                <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mb-3">
                  <span className="material-symbols-outlined text-3xl">water_drop</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">الألبان</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">الحصة: 1 كوب حليب/زبادي</p>
              </div>
              
              {/* Fats */}
              <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 p-4 rounded-2xl flex flex-col items-center text-center">
                <div className="size-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 mb-3">
                  <span className="material-symbols-outlined text-3xl">opacity</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">الدهون</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">الحصة: 1 ملعقة صغيرة</p>
              </div>
              
              {/* Proteins */}
              <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 p-4 rounded-2xl flex flex-col items-center text-center border-primary/40 ring-1 ring-primary/20">
                <div className="size-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-primary mb-3">
                  <span className="material-symbols-outlined text-3xl">set_meal</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">البروتينات</h4>
                <p className="text-xs text-primary font-medium mt-1">عرض التصنيفات</p>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Protein Sub-categories Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 py-4">
            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-3 flex items-center gap-2">
              تخصص البروتين
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-white dark:bg-primary/10 rounded-xl border border-slate-100 dark:border-primary/5">
                <div className="size-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500 ml-3 shrink-0">
                  <span className="material-symbols-outlined">health_and_safety</span>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-sm">بروتين قليل الدهون</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">مثال: صدور الدجاج، بياض البيض</p>
                </div>
                <span className="text-xs font-medium bg-slate-100 dark:bg-white/10 px-2 py-1 rounded">30 جرام</span>
              </div>
              
              <div className="flex items-center p-3 bg-white dark:bg-primary/10 rounded-xl border border-slate-100 dark:border-primary/5">
                <div className="size-10 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-500 ml-3 shrink-0">
                  <span className="material-symbols-outlined">trending_flat</span>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-sm">بروتين متوسط الدهون</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">مثال: اللحم البقري، بيضة كاملة</p>
                </div>
                <span className="text-xs font-medium bg-slate-100 dark:bg-white/10 px-2 py-1 rounded">30 جرام</span>
              </div>
              
              <div className="flex items-center p-3 bg-white dark:bg-primary/10 rounded-xl border border-slate-100 dark:border-primary/5">
                <div className="size-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500 ml-3 shrink-0">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-sm">بروتين عالي الدهون</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">مثال: اللحوم المصنعة، الجبن الشيدر</p>
                </div>
                <span className="text-xs font-medium bg-slate-100 dark:bg-white/10 px-2 py-1 rounded">30 جرام</span>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* How to Use Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 py-8 mt-4 bg-slate-100 dark:bg-primary/5 rounded-t-[2.5rem]">
            <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">info</span>
              كيفية الاستخدام
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-none size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                <p className="text-sm text-slate-700 dark:text-slate-300">حدد نوع الطعام الذي ترغب في استبداله من خطتك الغذائية.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-none size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
                <p className="text-sm text-slate-700 dark:text-slate-300">اختر المجموعة المقابلة له من القائمة أعلاه.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-none size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</div>
                <p className="text-sm text-slate-700 dark:text-slate-300">استخدم كمية "الحصة الواحدة" المحددة لضمان ثبات السعرات.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-none size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">4</div>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">يمكنك تبديل أي طعام بطعام آخر "داخل نفس المجموعة" فقط.</p>
              </div>
            </div>
            
            <button className="w-full mt-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 hover:brightness-110 active:scale-95 transition-all">
              ابدأ التخطيط الآن
            </button>
          </div>
        </FadeContent>
      </main>
    </div>
  );
}
