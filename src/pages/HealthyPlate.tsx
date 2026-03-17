import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';

export default function HealthyPlate() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-2 rounded-lg bg-primary/10 text-primary"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">نموذج الطبق الصحي</h1>
        <div className="w-10"></div> {/* Spacer for balance */}
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        <FadeContent blur={true} duration={600} easing="ease-out" initialOpacity={0}>
          {/* Visual Plate Section */}
          <section className="flex flex-col items-center py-8 px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">كوّن وجبتك المثالية</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">التوازن هو سر الصحة المستدامة</p>
            </div>

            {/* Interactive Plate Visual */}
            <div className="relative w-[280px] h-[280px] rounded-full bg-[#2d1b3d] border-8 border-[#3d2652] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.3)] mb-8">
              {/* Half Plate: Veggies & Fruits */}
              <div 
                className="absolute top-0 left-0 w-1/2 h-full bg-cover bg-center border-l-2 border-background-dark/30 flex items-center justify-center transition-all duration-300 ease-in-out" 
                style={{ backgroundImage: "linear-gradient(rgba(115, 17, 212, 0.2), rgba(115, 17, 212, 0.2)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZ3cNoP77tX2YWbqCCsdYCTvKLeLLPLR4GOgq9ce-LfTRTEYfwqH1lmQyIGVfqEQMRFL4qJT4UKcguP8w29llKj8w1ZOweaGCRzCIPDk9dls6Mv8-O7-FNEHyPR8kpAl_azwRIsYUYV3nYFZgUTQngTeLNFJbXJOowYzBBox2zOQY3PRAtNoP9k6VZ8qqhEHasutY9cHKUaTv9kLHFmwY2EK6D5vVy-H_SLOo_vXDBMjcWVQXBf_-2QzQDYUGvo_geU_iy07SrQHk6')" }}
              >
                <div className="bg-background-dark/60 backdrop-blur-sm p-2 rounded-lg text-center text-white">
                  <span className="block font-bold text-xs">١/٢</span>
                  <span className="text-[10px] font-medium">خضروات</span>
                </div>
              </div>

              {/* Quarter Plate: Protein */}
              <div 
                className="absolute top-0 right-0 w-1/2 h-1/2 bg-cover bg-center border-b-2 border-l-2 border-background-dark/30 flex items-center justify-center transition-all duration-300 ease-in-out" 
                style={{ backgroundImage: "linear-gradient(rgba(115, 17, 212, 0.1), rgba(115, 17, 212, 0.1)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcmalIDAAXnZj-SEd6HBc1kOLT2rIqH-vEdFcvUjU-otU39KbWRj5yWK4muRRRmV3cA0yG2OpyZaGtwMaURovHiNK7IglsNHgEqhQToHkRI2Ij0vVhqcQPZz2pZjR-LN_pg5lmIFrPJM5DJBQ9kZKn2_xDCYHN9WKXzN3onZxDO1LeNdSihcHtRarivJ1jbzxac1jAxYL_ENu5UpW-lSpVFNoZVfVeheVEJM3t8PyFSmmurx-lwbVTgMXSAvk98hKQqC0JCc4SsBj7')" }}
              >
                <div className="bg-background-dark/60 backdrop-blur-sm p-1 rounded-lg text-center text-white">
                  <span className="block font-bold text-xs">١/٤</span>
                  <span className="text-[10px] font-medium">بروتين</span>
                </div>
              </div>

              {/* Quarter Plate: Grains */}
              <div 
                className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-cover bg-center border-l-2 border-background-dark/30 flex items-center justify-center transition-all duration-300 ease-in-out" 
                style={{ backgroundImage: "linear-gradient(rgba(115, 17, 212, 0.1), rgba(115, 17, 212, 0.1)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDlRAqbVl70eDSrCw3DbRfnQc5N_qZyun5ByqHVAwnAhEzFvVvqVnDdHwbkjET5QpwNMxG0SlWfnhg31sn5-N3zQhtKfjLUq0XAIwKj12h0X6lt-RItfAUzX0NigqKiNg_RC8QYIZmGdgNlF06QPmN4Rp2nFivAabwqAN2cGc6CL10AmTdfplBbhKfYkgIiDf1py-rmtJupc6mVI8ZAN_eoal0H5qb6vOGvEREsJNAmEJV3QIQJ4x73IEYp6egYOjIWB3gOQQAlLLp')" }}
              >
                <div className="bg-background-dark/60 backdrop-blur-sm p-1 rounded-lg text-center text-white">
                  <span className="block font-bold text-xs">١/٤</span>
                  <span className="text-[10px] font-medium">حبوب</span>
                </div>
              </div>
            </div>

            {/* Legend/Quick Stats */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
              <div className="bg-primary/5 p-3 rounded-xl border border-primary/10 text-center">
                <span className="material-symbols-outlined text-green-500 mb-1">eco</span>
                <p className="text-[10px] opacity-70">ألياف عالية</p>
              </div>
              <div className="bg-primary/5 p-3 rounded-xl border border-primary/10 text-center">
                <span className="material-symbols-outlined text-red-400 mb-1">fitness_center</span>
                <p className="text-[10px] opacity-70">بناء عضلي</p>
              </div>
              <div className="bg-primary/5 p-3 rounded-xl border border-primary/10 text-center">
                <span className="material-symbols-outlined text-blue-400 mb-1">bolt</span>
                <p className="text-[10px] opacity-70">طاقة مستدامة</p>
              </div>
            </div>
          </section>

          {/* Detailed Tips Section */}
          <section className="px-4 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              نصائح ملء الطبق
            </h3>
            
            <div className="space-y-3">
              {/* Veggies Tip */}
              <div className="flex gap-4 p-4 bg-white dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10">
                <div className="size-12 rounded-lg overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" alt="Close up of fresh broccoli and greens" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSkKrNvCb9oH6OxYNQsU1g2Hq7Ol39DNrkrvzfVgqQih-a_P7sDVQ1RWT887TdOMA1n2aw8Biw8kXPQIQ79NnCuQ5HhGTUF6jTJfhNk6l_uNgWiaSZjAH4VQIKW9RzN9BJSXPPcBSxajxH6h8nMlQu1WNuOT8v6lffkluQHF9qOc8sFxmcT5KuFaVyGL5GCE69VBaFDPNRKTXMMhsbODwXadW21zgUDktrr0G0HmOMs0-A4y0Unph7m3R0iZrHM4Q0iyBBEk_yEQac" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">نصف الطبق: الخضروات</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">ركز على التنوع والألوان الزاهية. الخضروات الورقية والبروكلي خيارات ممتازة.</p>
                </div>
              </div>

              {/* Protein Tip */}
              <div className="flex gap-4 p-4 bg-white dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10">
                <div className="size-12 rounded-lg overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" alt="Grilled salmon steak with herbs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2_6cYJna80524a7e9w1lxkxsc8XBBSPmtiMG9TPlDW_kyPIKa4ynnUF_ObA_l_oqkL0GeC4VlSmGZpz_S9PbekZEH2okuJz1UBvwcVK0_ezSAJ9o66j9Fvi2u1Pal-nYYlZGZ8xBnFUmkMGWMHe5hmyJmF5bQTKJCnkBiS0Ou2kpnqZUb3Eo9CygtatYngzid6mRxmImwiaB6tCRjm7Nkm92rK9ad9c017DMaFNboivUTVIP1Fl_-mSqcmdP2ZTBh-Bo2GcOoBwkh" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">ربع الطبق: البروتين</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">اختر البروتينات الخالية من الدهون مثل الدجاج، السمك، أو البقوليات كبديل نباتي.</p>
                </div>
              </div>

              {/* Grains Tip */}
              <div className="flex gap-4 p-4 bg-white dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10">
                <div className="size-12 rounded-lg overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" alt="Bowl of cooked brown rice or quinoa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfJWq7ppQ7WTRi0PkyaDzwmYtxj9uhpl6wnIYS8E0MWYYAfhbi365aCXthYqT9y8Jng3bwm_JEDLusNkqmrP008lsJ4fAH_ppdQN-YGpNr7X3sp_TK6gDRW8ALYTS90tF7cuHstheSJGhH8AJZBiWG4fCFJ5x19qWPINay8kzeiezyc17ojJssKoOQaW6maenF62CwpfN1tFxGmmJYImSeJ8kx42Ru50wu8ep8TDeLLTW615wy3GpyebPYtL2GWj4_56mkHzoO7EK2" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">ربع الطبق: الكربوهيدرات</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">استخدم الحبوب الكاملة مثل الأرز البني، الكينوا، أو الشوفان لطاقة تدوم أطول.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Healthy Additions */}
          <section className="px-4 mt-8">
            <h3 className="text-xl font-bold mb-4">إضافات صحية</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group overflow-hidden rounded-xl aspect-[4/3]">
                <img className="absolute inset-0 w-full h-full object-cover" alt="Fresh glass of milk or yogurt bowl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqDSG7hJRZ-gQD_MHQn13VMZ8grcIDuscPH-09LAoDLbjwmpdLsZmzTohV46KI8oa9NcQuXk4gIPixNvdJzSXUPS_OuSYO3y63d2z6zSQfeOlQ03AI5sMz1HQwUfRyPEZwN8vOE6m8ZVN5CzaGycXuWjcOvwy9j0WkJBx8iNlGUJ-XKFYFekhifu7XOcyR_ebrDsk2KLSVCndxREC4t8WB-TEvzsn_5ScmMb56bj0BTRMeeGRsohvysTfZNMPi5Qb_BOcuxzqDOqkG" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
                  <p className="text-white font-bold text-sm">الألبان</p>
                  <p className="text-white/70 text-[10px]">زبادي قليل الدسم</p>
                </div>
              </div>
              
              <div className="relative group overflow-hidden rounded-xl aspect-[4/3]">
                <img className="absolute inset-0 w-full h-full object-cover" alt="Sliced avocado with olive oil" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZPuphpzkUdyA_ttjaZa0tbO3ktBAV28b4hNsPvHU1BH0WxVOC4Txo3Sn3Peh55butst-YMUpgPvIAUoR0dl0cS0UOQ8AbE1NrDPw3o7qwsS0sU25gNeZ2uyxOmUFTTsFPRgFZhALumm4zaW0ooRkYR4WdDmOZJ3jMg20hHRaH4KIBb64rOpVP08Om2maqV24hhwf7EGCMuFDxTGo7KQ7iKQd9bFgOFmjUoqKGZ_-sEi4OicBkFmXdtY2OnDTZ9hCSErJ6sLJ72B0v" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
                  <p className="text-white font-bold text-sm">دهون صحية</p>
                  <p className="text-white/70 text-[10px]">أفوكادو، زيت زيتون</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Action */}
          <div className="p-6">
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
              تطبيق على وجبتي القادمة
            </button>
          </div>
        </FadeContent>
      </main>
    </div>
  );
}
