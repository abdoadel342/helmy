import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import { StarBorder } from '../components/react-bits/StarBorder';

const AgilityTraining: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 min-h-screen pb-32 font-sans">
      {/* Top AppBar */}
      <header className="sticky top-0 z-50 bg-slate-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <h1 className="text-lg font-bold tracking-tight text-center flex-1">تمارين الرشاقة (Agility Training)</h1>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          {/* Hero Section */}
          <div className="px-4 py-6">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-slate-200 dark:border-slate-800">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <div className="absolute bottom-4 right-4 z-20">
                <div className="bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/20 shadow-lg">
                  <ShinyText text="HELMY Pro" disabled={false} speed={3} className="text-white" />
                </div>
              </div>
              <div 
                className="w-full h-full bg-center bg-no-repeat bg-cover transform hover:scale-105 transition-transform duration-700" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBknD2AqGKRi5O0s2VYM8a_aOcBEizEbChjf55cZofvG-WG7p3vULAO8ad6hDPoMENoPc7Z4NEUdnP5aL6Qtrdk8ReZewC8ulYdaNIB5gzTIL9pMbGAxT7T_2r2a_CDtsu0UEl53CSiwVCoZvLLpslU1SxNGgnasjOzRsW-LYujsk3l4rtVCobspTMklQ7ctVm9lD7m4_3VRwHfHOl3Jm7s7v8mQaOeH3Mm7qydkeFazb2r6GgACnzjRlGr2kmj2bjomTa1UoFyKI9L")' }}
              ></div>
            </div>
          </div>

          {/* Definition Section */}
          <section className="px-4 mb-8">
            <SpotlightCard className="!p-6 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 !rounded-2xl" spotlightColor="rgba(115, 17, 212, 0.15)">
              <div className="border-r-4 border-primary pr-4">
                <h2 className="text-primary text-xl font-bold mb-2">ما هي الرشاقة؟</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  الرشاقة هي القدرة الحركية المركبة التي تمكنك من تغيير اتجاه الجسم بسرعة وفعالية مع الحفاظ على التوازن والتحكم الكامل في الحركة، وهي ركن أساسي في معظم الرياضات التنافسية.
                </p>
              </div>
            </SpotlightCard>
          </section>

          {/* Agility Ladder Drills */}
          <section className="px-4 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">grid_on</span>
              <h3 className="text-lg font-bold">تمارين سلم الرشاقة (Ladder Drills)</h3>
            </div>
            <div className="space-y-4">
              {/* Drill 1 */}
              <SpotlightCard className="!p-4 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 !rounded-xl cursor-pointer hover:!border-primary/30 transition-colors group" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                    <div 
                      className="w-full h-full bg-slate-800 flex items-center justify-center bg-cover bg-center group-hover:scale-110 transition-transform duration-500" 
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0DtWvxCZtFLd45C99TGOOcWfdaCd-yLuOoC6VyC8rrzhabeDgwi41c0rJhWnIZDXQGhH2KNfE_wsafvu_yfky6eR00ywlXbcNlEkLE9BJWChwra3z5VCUlO_Vtgq19q-7XBh7jrNTqjlMfWeRET6ZlUxbolmyGgqnDiB7tlhvRcNNaB0biqHoRsSObQIeFSJvo-5XbQh_HkU_QtyOs_cUp4G25SRfKH3t2AaO6o5CSRa5UcOEhXl0jfc8vAGVG9a0-KnNe7b9OuVh')" }}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary">In-and-Out</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">تحسين سرعة القدمين والتنسيق الحركي الجانبي.</p>
                  </div>
                  <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">play_circle</span>
                </div>
              </SpotlightCard>

              {/* Drill 2 */}
              <SpotlightCard className="!p-4 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 !rounded-xl cursor-pointer hover:!border-primary/30 transition-colors group" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                    <div 
                      className="w-full h-full bg-slate-800 flex items-center justify-center bg-cover bg-center group-hover:scale-110 transition-transform duration-500" 
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCfpS3XCSgI75uO0krYodI7zWOXXKlzy5C2bW0MU3TCNXmDBZAzLlUq9rZ6NYMeZod30gxzK_RHpDdaapI18Y0m9zsbpFrvyTcV6CapnYIhT1Bo_JleD56hP4yQDxEFPkz8Gm80fBatj2Lfrn13_6ZcYS25OnGds4vYZsA_mtv5D25zJDSQ3UPlso1CegfNqJlLXkfyZha0wJU5Hkj9mHJyhSKOzeVUzUb7FlYEf83_wcvCZB4MaXOi_O_8G7-yQ_zkWFJypUTpHDcf')" }}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary">Ickey Shuffle</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">التمرين الأكثر شهرة لتعزيز سرعة الاستجابة والنمط الحركي.</p>
                  </div>
                  <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">play_circle</span>
                </div>
              </SpotlightCard>
            </div>
          </section>

          {/* Cone Drills */}
          <section className="px-4 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">change_history</span>
              <h3 className="text-lg font-bold">تمارين الأقماع (Cone Drills)</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <SpotlightCard className="!p-4 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">T-Drill</h4>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-medium">احترافي</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">يركز على الجري للأمام، الحركة الجانبية، والرجوع للخلف في مساحة محددة.</p>
              </SpotlightCard>
              
              <SpotlightCard className="!p-4 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Pro Agility (5-10-5)</h4>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-medium">اختبار سرعة</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">معيار عالمي لقياس القدرة على الانطلاق وتغيير الاتجاه المفاجئ.</p>
              </SpotlightCard>
            </div>
          </section>

          {/* Technical Tips */}
          <section className="px-4 mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
              نصائح تقنية للأداء المثالي
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3 bg-slate-100 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-slate-800/50">
                <div className="size-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined text-[16px] text-white">check</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">وضع القدم: </span> 
                  <span className="text-slate-600 dark:text-slate-400">الهبوط على أمشاط القدمين دائماً لضمان سرعة رد الفعل.</span>
                </div>
              </div>
              <div className="flex gap-3 bg-slate-100 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-slate-800/50">
                <div className="size-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined text-[16px] text-white">check</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">مركز الثقل: </span> 
                  <span className="text-slate-600 dark:text-slate-400">حافظ على خفض مركز ثقل الجسم (ثني الركبتين) لتسهيل تغيير الاتجاه.</span>
                </div>
              </div>
              <div className="flex gap-3 bg-slate-100 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-slate-800/50">
                <div className="size-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined text-[16px] text-white">check</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">الخطوة الانفجارية: </span> 
                  <span className="text-slate-600 dark:text-slate-400">ركز على القوة في أول خطوة بعد كل تغيير في الاتجاه.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Protocol Section */}
          <section className="px-4 mb-8">
            <div className="bg-slate-100 dark:bg-[#131313] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-primary/10 dark:bg-primary/20 px-4 py-3 border-b border-primary/10">
                <h3 className="text-primary font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined">timer</span>
                  بروتوكول التدريب
                </h3>
              </div>
              <div className="p-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">المجموعات</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">3 - 4</p>
                </div>
                <div className="border-x border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">التكرارات</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">6 - 8</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">الراحة</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">60ث</p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-3 text-sm text-center italic text-slate-600 dark:text-slate-400 border border-primary/10">
                  "التركيز على جودة الحركة (Quality) أهم من السرعة القصوى في البداية"
                </div>
              </div>
            </div>
          </section>
        </FadeContent>
      </main>

      {/* Footer Action */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-slate-50/95 dark:bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-2xl mx-auto">
          <StarBorder
            as="button"
            className="w-full !p-0"
            color="rgba(115, 17, 212, 0.8)"
            speed="3s"
          >
            <div className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-[32px] flex items-center justify-center gap-2 transition-all active:scale-95">
              <span className="material-symbols-outlined">rocket_launch</span>
              ابدأ التدريب الآن
            </div>
          </StarBorder>
        </div>
      </footer>
    </div>
  );
};

export default AgilityTraining;
