import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';

const BalanceTraining: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden font-display pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/20 p-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">arrow_forward</span>
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">تمارين التوازن</h1>
        <div className="w-10"></div> {/* Spacer for symmetry */}
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full">
        {/* Hero Image Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="@container px-4 py-4">
            <div 
              className="relative h-64 w-full rounded-xl overflow-hidden bg-cover bg-center flex items-end shadow-lg border border-primary/20" 
              style={{ backgroundImage: "linear-gradient(0deg, rgba(25, 16, 34, 0.9) 0%, rgba(25, 16, 34, 0) 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCHMVY_um5-ex3GnjjB2MSZO7Pq4ATBzAcLxvb1VJlkyEi3lEA0QyffRkVX5pLu1We0sjrikuNWpHC1YfAu5N4CSu1W6uq8hs1cnsjrsrmJssOSzdz_kXkLmk8nEkolHkQWITkHu0Y-BoCMzylhIIdnGgJcoEVFvz6YF3Pr5Jx4T1lsMk6TL8wlTJhVdvlSQOauG6LQ79qEShFl8rF-WIlsfXlP-TtnncH6E8vgDEVyVP1XsqIeJX9ohirj7EnDrtQI3d3T6S9Gsk9i')" }}
            >
              <div className="p-6">
                <span className="bg-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                  <ShinyText text="HELMY PRO" disabled={false} speed={3} className="text-white" />
                </span>
                <h2 className="text-3xl font-bold text-white leading-tight">توازنك هو أساس قوتك</h2>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Introduction Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
              <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">info</span>
                أهمية تمارين التوازن
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                تعتبر تمارين التوازن (الثابتة والديناميكية) ضرورية لتحسين الأداء الرياضي والوقاية من الإصابات. فهي لا تقوي العضلات فحسب، بل تعمل على تعسين استقرار المفاصل وتقوية العضلات المركزية (Core)، مما يمنحك تحكماً أفضل في حركات جسمك تحت الضغط.
              </p>
            </div>
          </section>
        </FadeContent>

        {/* Exercises List */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-4">
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <span className="material-symbols-outlined text-primary">fitness_center</span>
              التمارين الأساسية
            </h3>
            <div className="space-y-4">
              {/* Exercise 1 */}
              <SpotlightCard className="!p-4 !bg-primary/5 dark:!bg-primary/10 !border-primary/20 !rounded-xl flex items-center gap-4" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div 
                  className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0 border border-primary/10" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCp6RbJktNoY1ZIhAx0GcKeNfmZvXhnmHhyh3pNFdZ0S4qLHIaYOX5IOnylN_TirbVKCQ96MLUGQLxGVToUDdiQnjFGbqo0h1Wxv_G9Vr6RKnykOyTiyyGQWrSD1uz_s7EcLPu02vxzGaZWjBvSyimnqkkzaPMptqYmNSyCjUa7Y0xnRGyHuU6Nh4nfJn90dMFRBcK00qKEUVS1sgUMK__X1t9t6idnpxwbjMwHY1_xAhMQG3HRsMhPBK-dd5XidOckNir6qOXqaFXB')" }}
                ></div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">الوقوف على قدم واحدة</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">تمرين أساسي للتوازن الثابت واستقرار الكاحل.</p>
                </div>
                <span className="material-symbols-outlined text-primary text-3xl opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-pointer">play_circle</span>
              </SpotlightCard>

              {/* Exercise 2 */}
              <SpotlightCard className="!p-4 !bg-primary/5 dark:!bg-primary/10 !border-primary/20 !rounded-xl flex items-center gap-4" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div 
                  className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0 border border-primary/10" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuABQF1Ee8Li2WQTWqLORFhcBMRAS33pg1OiUbh6zKdl1YCE4HbhKN8pznLnkg5DzubYYuC_dHeq_2J2r1jkq2I2zAFlOMfhh7vofmazuS8La6tMMrQCBYLIu9Vebn_YAFbYKjfUhKshHXgVLQJWr0TXhHCaChCXO_ua0wczRF5twJhLcOJxqoJrmfbVlI-lVKcHhDUMV8eWg1pwLVDq_j-zatsPiMyTC0gMS8KVlA97WWGNjRhc8LmQ58vFKAC1klRotj0u-324sDxD')" }}
                ></div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">الرفعة المميتة على قدم واحدة</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">يستهدف أوتار الركبة والتوازن الديناميكي.</p>
                </div>
                <span className="material-symbols-outlined text-primary text-3xl opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-pointer">play_circle</span>
              </SpotlightCard>

              {/* Exercise 3 */}
              <SpotlightCard className="!p-4 !bg-primary/5 dark:!bg-primary/10 !border-primary/20 !rounded-xl flex items-center gap-4" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div 
                  className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0 border border-primary/10" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4VwRKGyVer70Wna-3toqb4ycfbJ5VdqAX3tOOQUB6KSn8-spKomBSogRj5PmM8iAzOQj012SUmfbSOWSzRD1nUSWsDUKh4VkegQhnSVV9IJhez-QaK91eIyYGDOtQv47MsynAu7X4hmTDmPzJE0sd0zHFpgPH6ppXSuYNxl7_2O4QjqSiRk2CgI33FhdkxhUg5nsyz9OQmxafKlBaFWvOUHiFWsHhLbmjrf6SvcbbANg5OP7hpp9n77QNAD_COwvMk3NadKXgz3d0')" }}
                ></div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">سكوات على كرة البوسو</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">تحدي متقدم لاستقرار الجسم بالكامل.</p>
                </div>
                <span className="material-symbols-outlined text-primary text-3xl opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-pointer">play_circle</span>
              </SpotlightCard>

              {/* Exercise 4 */}
              <SpotlightCard className="!p-4 !bg-primary/5 dark:!bg-primary/10 !border-primary/20 !rounded-xl flex items-center gap-4" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div 
                  className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0 border border-primary/10" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHkb6k49g48-JibFdgLIJ0eMexN6NAFx0tmWwjz6TuQh2rvf5RvJTF_5sOdkTVS08NEmvLJrExtamnM3LabLhK8j9qWoZLuoGXTPopV5ybfVjm7ybpt4WuvXHENqY_XyDfgHOSG1Yz0oYoAUCWZ1qGOe5VOfJOll_GtM0BKjvtNxwg4HwkdYZdp_2LaHDYwqlyaaahUCqBhORhdIjlZ5Yka_K5WH6CEdvwmRKWhrqvu4xk1yoeS9LM1szJVcv8ekMKwZMUT5JrD7nH')" }}
                ></div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">بلانك مع رفع الأطراف</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">تقوية عضلات الكور وتحسين التنسيق.</p>
                </div>
                <span className="material-symbols-outlined text-primary text-3xl opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-pointer">play_circle</span>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Training Protocol */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">بروتوكول التدريب</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-100 dark:bg-background-dark border border-primary/30 p-3 rounded-lg text-center shadow-sm">
                <p className="text-primary text-xs font-medium mb-1">المجموعات</p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">3 - 4</p>
              </div>
              <div className="bg-slate-100 dark:bg-background-dark border border-primary/30 p-3 rounded-lg text-center shadow-sm">
                <p className="text-primary text-xs font-medium mb-1">التكرار</p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">12 - 15</p>
              </div>
              <div className="bg-slate-100 dark:bg-background-dark border border-primary/30 p-3 rounded-lg text-center shadow-sm">
                <p className="text-primary text-xs font-medium mb-1">الراحة</p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">45 ث</p>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Pro Tips Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-4 mb-8">
            <div className="bg-gradient-to-l from-primary to-primary/60 rounded-xl p-5 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">lightbulb</span>
                نصائح المحترفين
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm pt-1">check_circle</span>
                  حافظ على انقباض عضلات البطن (Core) طوال التمرين لدعم العمود الفقري.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm pt-1">check_circle</span>
                  ثبت نظرك على نقطة غير متحركة أمامك للمساعدة في الحفاظ على التوازن.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm pt-1">check_circle</span>
                  تنفس بانتظام ولا تحبس أنفاسك أثناء أداء الحركات الصعبة.
                </li>
              </ul>
            </div>
          </section>
        </FadeContent>
      </main>
    </div>
  );
};

export default BalanceTraining;
