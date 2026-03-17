import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';

export default function NutritionPlan() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-primary/10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <div className="flex flex-col">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">HELMY</span>
            <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">خطة بناء العضلات</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-slate-900 dark:text-white size-10 flex items-center justify-center rounded-full hover:bg-primary/10">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </header>

      <div className="flex flex-col">
        {/* Macro Summary Cards */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4">
            <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-primary/5 border border-primary/10 shadow-sm">
              <span className="material-symbols-outlined text-primary text-xl">local_fire_department</span>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">السعرات</p>
              <p className="text-slate-900 dark:text-white text-xl font-bold leading-tight">2,800</p>
            </div>
            <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-primary/5 border border-primary/10 shadow-sm">
              <span className="material-symbols-outlined text-primary text-xl">fitness_center</span>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">بروتين</p>
              <p className="text-slate-900 dark:text-white text-xl font-bold leading-tight">180g</p>
            </div>
            <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-primary/5 border border-primary/10 shadow-sm">
              <span className="material-symbols-outlined text-primary text-xl">bakery_dining</span>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">كربوهيدرات</p>
              <p className="text-slate-900 dark:text-white text-xl font-bold leading-tight">350g</p>
            </div>
            <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-primary/5 border border-primary/10 shadow-sm">
              <span className="material-symbols-outlined text-primary text-xl">opacity</span>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">دهون</p>
              <p className="text-slate-900 dark:text-white text-xl font-bold leading-tight">80g</p>
            </div>
          </div>
        </FadeContent>

        {/* Progress Chart Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 py-2">
            <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl p-5">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">توزيع المغذيات الكبرى</p>
                  <p className="text-slate-900 dark:text-white text-2xl font-bold">المستهدف اليومي</p>
                </div>
                <span className="text-primary font-bold text-lg">100%</span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-900 dark:text-slate-200">بروتين</span>
                    <span className="text-slate-500">180/180g</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-900 dark:text-slate-200">كربوهيدرات</span>
                    <span className="text-slate-500">245/350g</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full opacity-70" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-900 dark:text-slate-200">دهون</span>
                    <span className="text-slate-500">60/80g</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full opacity-40" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Daily Meal Plan Title */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 pt-6 pb-2">
            <h2 className="text-slate-900 dark:text-white text-xl font-bold">جدول الوجبات اليومي</h2>
            <p className="text-slate-500 text-sm">اتبع هذا النظام للحصول على أفضل نتائج تضخيم</p>
          </div>
        </FadeContent>

        {/* Meal List */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="flex flex-col gap-4 p-4">
            {/* Breakfast */}
            <div className="flex flex-col bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden meal-card-gradient">
              <div className="flex items-center gap-4 p-4">
                <img 
                  className="size-20 rounded-lg object-cover shadow-lg shadow-black/20" 
                  alt="Healthy breakfast with eggs and avocado" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHMmQ1U_WXHkRyA3TIeUBmSDnCE0Nhvhhtziws6Pz9W2LZlGGPuV6HIn9G5nNpRJKze3XyA2Ihv4JPqoVxT2EaYpCHzQy9QEMGaFLXJTJV4lQeRKCor5pwbT7ep3UGXeQK8CSWHYOx2Me0yg7nWUdtZsEe8dNLTtR-bNOM94LfDUchVV8GXP8xs0nXJKd2soFzQSlBgydaWQJJlCU_Xoxsm8xeEmov0hLCyhutRFe5_odn2C1RSOxVgswg2LAS8IL2F96-7Od_REIZ"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded-full">الإفطار</span>
                    <span className="text-slate-400 text-[10px]">08:00 AM</span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-bold mt-1">شوفان بالموز وزبدة الفول السوداني</h3>
                  <p className="text-slate-500 text-xs mt-1">450 سعرة • 25ج بروتين</p>
                </div>
              </div>
            </div>

            {/* Snack 1 */}
            <div className="flex flex-col bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden meal-card-gradient">
              <div className="flex items-center gap-4 p-4">
                <img 
                  className="size-20 rounded-lg object-cover shadow-lg shadow-black/20" 
                  alt="Greek yogurt with honey and nuts" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3J7FY8LfxRvCYYlxFZbGW1jLywdhOqm6n7c-f3vDPcpFC2ruaqky4GC77RWpMa2MmwZ7bmpsa4sDWSMKrZYRYMYteGAAgJlXkr9h9jrpCtgl3qYZbkbLmTDm2dEqFllMJKEHFP8IlEca3oKlonBT6Ue-uFXl1ZiQtSyYacGeaz641N-xr_ZP9BDRZxXRdn2OEDcjEznmBRitKwIaEH6PSS5kPZtag6E1frg8lkrsA_SNt4mFqFMlJr9E8VYrfJp9BN_j4Q-CDjhEt"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded-full">سناك 1</span>
                    <span className="text-slate-400 text-[10px]">11:00 AM</span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-bold mt-1">زبادي يوناني مع مكسرات</h3>
                  <p className="text-slate-500 text-xs mt-1">200 سعرة • 15ج بروتين</p>
                </div>
              </div>
            </div>

            {/* Lunch */}
            <div className="flex flex-col bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden meal-card-gradient">
              <div className="flex items-center gap-4 p-4">
                <img 
                  className="size-20 rounded-lg object-cover shadow-lg shadow-black/20" 
                  alt="Chicken breast with rice and broccoli" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH7FISbQ5_prvjuDlLqIU8JcQ4L-PDcsSWBmr2wGHWtijS0yJD6wvshWP3e-hUYBvLmRVUnzuSUQB9Bcz2EvfUuGQYaQdzT015hWaNWAVYwvFUgRaMwdndNV0dyJA16tR6GkqScxpWZmeUos0MA9Qg0Mp5B87z1eQZ0pAcN9p747zK3-OJrtFqa2JfUeJQJvqfTkzDvjjxZCeT2WG63dgRYrPpuqwgZpGMUBjdKLzrDBCBwsdu6kunxOFgmsrIhhkFrAItKJqfIBqL"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded-full">الغداء</span>
                    <span className="text-slate-400 text-[10px]">02:30 PM</span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-bold mt-1">صدر دجاج مشوي مع أرز بني وبروكلي</h3>
                  <p className="text-slate-500 text-xs mt-1">650 سعرة • 45ج بروتين</p>
                </div>
              </div>
            </div>

            {/* Snack 2 (Pre-workout) */}
            <div className="flex flex-col bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden meal-card-gradient border-r-4 border-r-primary">
              <div className="flex items-center gap-4 p-4">
                <img 
                  className="size-20 rounded-lg object-cover shadow-lg shadow-black/20" 
                  alt="Apple and almond snack" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmcTraynuyVnc5xMS6YLpxwVNDlckNOP2iaVDkDNZ1px0FdCAzk4Thz4rg48BKcKpIAuXd8rRFrOfA07PXX5loRTVa6urJ0SWrLhF9wq0Lf2XcF-yTHS0d9nF5ne8FfXsTLjCHdJ6upeQkLWCUt4UzG9K4lLceHpqvuSCXuqi07rlx7hUAFn6VjMBDiKCWPo09oIcFNSFsxWyB8I0eXYRX28WxLT7rdCzztj6jSeziqbqvWlfOTwkAwgFNfaKI9OwEx5p3BdelwNmy"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">قبل التمرين</span>
                    <span className="text-slate-400 text-[10px]">05:00 PM</span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-bold mt-1">تفاحة مع حفنة لوز</h3>
                  <p className="text-slate-500 text-xs mt-1">250 سعرة • 8ج بروتين</p>
                </div>
              </div>
            </div>

            {/* Post-workout */}
            <div className="flex flex-col bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden meal-card-gradient border-r-4 border-r-primary">
              <div className="flex items-center gap-4 p-4">
                <img 
                  className="size-20 rounded-lg object-cover shadow-lg shadow-black/20" 
                  alt="Protein shake" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmfhd61LBcv7EkML9ipJYNoSfiIlTMJbbK1ut3iSYGRS84DC93OKWSwz-0Z2RZEsgSNvKYdDjFmeS9ni7EA-sB3WZ6bypiwBsnhc5MRv3KXKlDBdTG8ptzWZNNiOlEt0afKtc65CUyaJ0RNInhwIwMJU48VqSVX0D3WN9jyci9rZbAUKXKrSB4LxhXHUeYh4cb007roLJvzBEcgbEg3SHgbpGO3_oOykipuikAW0NzMomX2EXWZR8_RwHlvL6M3lm5BeVPj_jvylJC"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">بعد التمرين</span>
                    <span className="text-slate-400 text-[10px]">07:00 PM</span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-bold mt-1">بروتين شيك + حبة موز</h3>
                  <p className="text-slate-500 text-xs mt-1">300 سعرة • 30ج بروتين</p>
                </div>
              </div>
            </div>

            {/* Dinner */}
            <div className="flex flex-col bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden meal-card-gradient">
              <div className="flex items-center gap-4 p-4">
                <img 
                  className="size-20 rounded-lg object-cover shadow-lg shadow-black/20" 
                  alt="Grilled salmon with sweet potato" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwRo97uX9sAEySU-PBY3ofPCCealnLC8GaLpSkJqTSR31FdZJXfcFC2mKu4q94CyEFYTTzk1VP3HscGjMXS6XjuKh-Pc-SKXg4JtNHeI2BPuOVkV6jQFk6PSwDV9NiXl3aqzzAx1uTM8R3PUU8VN1JHHcmwjS5TZXM_5wcMSRHl11Dg9aUP8Xh5PNZX6UYfJjXg85EuN2p1u25JqKi24TmhrKSZ7XKF3QHlMt6CkN7SDasC4k6OW_e7eG6OgxqEFQafal2EUQQ3hGQ"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded-full">العشاء</span>
                    <span className="text-slate-400 text-[10px]">09:30 PM</span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-bold mt-1">سمك سلمون مشوي مع بطاطا حلوة</h3>
                  <p className="text-slate-500 text-xs mt-1">550 سعرة • 35ج بروتين</p>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Tips Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="mx-4 mb-6 p-5 bg-primary rounded-2xl text-white overflow-hidden relative">
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-10">lightbulb</span>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined">tips_and_updates</span>
              نصائح التضخيم العضلي
            </h3>
            <ul className="space-y-3 relative z-10 text-sm opacity-90">
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
                <span>تناول ما لا يقل عن 1.8 إلى 2.2 جرام من البروتين لكل كيلو من وزن جسمك.</span>
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
                <span>اشرب ما لا يقل عن 3-4 لتر من الماء يومياً لدعم عملية البناء.</span>
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
                <span>النوم الكافي (7-9 ساعات) هو المفتاح الحقيقي لاستشفاء العضلات ونموها.</span>
              </li>
            </ul>
          </div>
        </FadeContent>
      </div>
    </div>
  );
}
