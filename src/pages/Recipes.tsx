import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Recipes() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0e0e0e] text-[#ffffff] min-h-screen font-['Manrope'] selection:bg-[#e08dff]/30 selection:text-white pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#0e0e0e]/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(188,0,251,0.08)]">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="active:scale-95 transition-transform text-[#e08dff] hover:opacity-80"
            >
              <span className="material-symbols-outlined text-3xl">arrow_forward</span>
            </button>
            <h1 className="font-['Lexend'] font-bold text-xl leading-relaxed text-[#e08dff]">
              مخطط الوصفات الشامل - HELMY
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-['Space_Grotesk'] text-sm uppercase tracking-widest text-white/70 hover:text-[#00fcca] transition-colors duration-300">الرئيسية</Link>
            <Link to="/programs" className="font-['Space_Grotesk'] text-sm uppercase tracking-widest text-white/70 hover:text-[#00fcca] transition-colors duration-300">التمارين</Link>
            <Link to="/nutrition/recipes" className="font-['Space_Grotesk'] text-sm uppercase tracking-widest text-[#e08dff] hover:text-[#00fcca] transition-colors duration-300">الوصفات</Link>
            <Link to="/profile" className="font-['Space_Grotesk'] text-sm uppercase tracking-widest text-white/70 hover:text-[#00fcca] transition-colors duration-300">الملف</Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="relative h-[353px] md:h-[442px] overflow-hidden flex items-end px-6 pb-10">
          <img alt="Healthy Fitness Meal" className="absolute inset-0 w-full h-full object-cover grayscale-[30%] brightness-[40%] scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhcYOs5t05SV1YMtUUuKDlENL6pKazJ4nrYBTkPSJJI7Pn9Zo5EsIQcWw5W89upwiw9sGXKNz9LcqktinUGRwPYZapVpY59hiRf34ydlmHUk6l45nivOUfWGvm0yGdxdK7wtUCx7dhP1zSt_z6wJo_hFrU185uacCswStx_exqSNW7in1l0YxPYNWAeNpnIYcXkvTJVXbWPnKhiZg10Muqeqr3eWyKALImNiPgAv2zbPlW-mg6mLb6LQGB3QEp4tE-4YoJIGWu_Qmi"/>
          <div className="relative z-10 max-w-4xl">
            <span className="font-['Space_Grotesk'] text-[#00fcca] text-sm uppercase tracking-[0.2em] mb-2 block">تغذية رياضية متكاملة</span>
            <h2 className="font-['Lexend'] text-4xl md:text-6xl font-black text-white leading-tight">
                              مخطط الوصفات <br/> <span className="text-[#e08dff]">المقترحة</span>
            </h2>
          </div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l from-[#e08dff] to-transparent"></div>
        </section>

        {/* Recipe Grid/List */}
        <section className="px-6 mt-12 space-y-12 max-w-7xl mx-auto">
          {/* Recipe Card 1 */}
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-square lg:aspect-auto lg:h-full min-h-[400px]">
              <img alt="Grilled Salmon" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW6Yup489TR7BjzPSj12BCPtlgpqhAcuZ2fk24lqvuTIpgbfxa-58KCClNYHvNvLOCwPSsB03TbRWaOGNfXohR7pPG_Oz6QGlRkqWJhfcosE-rqZHrQ4ZVwSGa-1YLufIMXMbvDuhnjyHAYpSlXZAfGRr3bsF1okrdn01sqLfus0CE1xgxG3af-0442n7gVwviCDozhePQbxAcAgXqw6B7ZEQ7y4ku7SBBJbSoDJQU0CWd1tJLLWU3kZ-hhRR_OELWKijUNR94zu-G"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent"></div>
              <div className="absolute bottom-6 right-6">
                <span className="bg-[#e08dff] px-4 py-1 rounded-full text-[#4f006c] font-bold text-sm">عالي البروتين</span>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-['Lexend'] text-3xl font-bold text-white mb-4">سالمون مشوي مع الهليون</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-[#201f1f] border border-[#494847]/10 px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00fcca] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                    <span className="font-['Space_Grotesk'] text-sm">420 KCAL</span>
                  </div>
                  <div className="bg-[#201f1f] border border-[#494847]/10 px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#e08dff] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>fitness_center</span>
                    <span className="font-['Space_Grotesk'] text-sm">38g PROTEIN</span>
                  </div>
                  <div className="bg-[#201f1f] border border-[#494847]/10 px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ff928a] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>grain</span>
                    <span className="font-['Space_Grotesk'] text-sm">12g CARBS</span>
                  </div>
                  <div className="bg-[#201f1f] border border-[#494847]/10 px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-white/50 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>opacity</span>
                    <span className="font-['Space_Grotesk'] text-sm">24g FATS</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#131313] p-6 rounded-2xl">
                  <h4 className="font-['Lexend'] text-lg font-bold text-[#00fcca] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">checklist</span>
                    المكونات
                  </h4>
                  <ul className="space-y-3 text-[#adaaaa] font-['Manrope'] leading-relaxed">
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e08dff]"></span>
                      200 جرام سالمون طازج
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e08dff]"></span>
                      حزمة هليون صغيرة
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e08dff]"></span>
                      ملعقة زيت زيتون بكر
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e08dff]"></span>
                      ملح بحري وفلفل أسود
                    </li>
                  </ul>
                </div>
                <div className="bg-[#131313] p-6 rounded-2xl">
                  <h4 className="font-['Lexend'] text-lg font-bold text-[#00fcca] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">restaurant_menu</span>
                    طريقة التحضير
                  </h4>
                  <div className="space-y-4 text-[#adaaaa] font-['Manrope'] text-sm">
                    <p><span className="text-[#e08dff] font-bold">01.</span> تتبيل السالمون بالملح والفلفل وزيت الزيتون.</p>
                    <p><span className="text-[#e08dff] font-bold">02.</span> تسخين المقلاة أو الشواية على نار متوسطة.</p>
                    <p><span className="text-[#e08dff] font-bold">03.</span> شوي السالمون لمدة 4-5 دقائق لكل جانب.</p>
                    <p><span className="text-[#e08dff] font-bold">04.</span> إضافة الهليون في الدقائق الأخيرة حتى ينضج.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Card 2 (Inverted Bento Layout) */}
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1 space-y-6">
              <div>
                <h3 className="font-['Lexend'] text-3xl font-bold text-white mb-4">صدور دجاج بالأعشاب البرية</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-[#201f1f] px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00fcca] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                    <span className="font-['Space_Grotesk'] text-sm">350 KCAL</span>
                  </div>
                  <div className="bg-[#201f1f] px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#e08dff] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>fitness_center</span>
                    <span className="font-['Space_Grotesk'] text-sm">45g PROTEIN</span>
                  </div>
                  <div className="bg-[#201f1f] px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ff928a] text-sm">timer</span>
                    <span className="font-['Space_Grotesk'] text-sm">20 MIN</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#131313] p-6 rounded-2xl">
                  <h4 className="font-['Lexend'] text-lg font-bold text-[#e08dff] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">shopping_basket</span>
                    المكونات
                  </h4>
                  <ul className="space-y-3 text-[#adaaaa] font-['Manrope']">
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00fcca]"></span>
                      صدر دجاج منزوع الجلد
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00fcca]"></span>
                      إكليل الجبل وزعتر بري
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00fcca]"></span>
                      فص ثوم مهروس
                    </li>
                  </ul>
                </div>
                <div className="bg-[#131313] p-6 rounded-2xl">
                  <h4 className="font-['Lexend'] text-lg font-bold text-[#e08dff] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">cooking</span>
                    التحضير
                  </h4>
                  <div className="space-y-4 text-[#adaaaa] font-['Manrope'] text-sm">
                    <p><span className="text-[#00fcca] font-bold">01.</span> خلط الأعشاب مع الثوم وزيت خفيف.</p>
                    <p><span className="text-[#00fcca] font-bold">02.</span> تغطية الدجاج بالتتبيلة لمدة 10 دقائق.</p>
                    <p><span className="text-[#00fcca] font-bold">03.</span> الطهي في الفرن على درجة 200 مئوية.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 relative rounded-2xl overflow-hidden aspect-video lg:aspect-auto lg:h-full min-h-[400px]">
              <img alt="Herb Chicken" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8d35vA6uK18Hp-tzLHnSy-mfKnTtqrJ7T6m83sdgD7RGjSb1iVnKIpM7jQ5OiMNlFpVXX0dJeKSloquW9GERAeX48wTYdbtOZT85pe5bZ6hjgJN7uxJ6TVXnLy8QWXkBSgZh791f3K7vTkZqQWFc02HI-AjCx5L0OCEzRw-113Si-mfUUx5TteaHfxbmVdDRjNWkFOMBcfq9-_xl4AHvZRBZGxdtRVhuO93Z-9Ozn6ko0RsXZrDvx5eLLYlfezLcOAdfPIR0_lYrR"/>
              <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/20 via-transparent to-[#0e0e0e]"></div>
            </div>
          </div>

          {/* Recipe Card 3 (Compact Layout) */}
          <div className="bg-[#131313] rounded-[32px] overflow-hidden border border-[#494847]/10 hover:border-[#e08dff]/20 transition-colors">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative h-64 md:h-auto">
                <img alt="Quinoa Salad" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB54LN6lVM5WPCEU2xEIKH3c6LjL6vhLKnO59kziViDHhk0BlSrM6tQpzv89_jKVXclM0WAM-AJbzRZOu3ys8DB2ygSQPu0n3rptTMurkZAVuIV0r14AsTl6GsbxdfOTKYZ_huWAMYD5neE6cUxHi0JKoPHhk8Fij18GHtKeg5rkDez3g1EablndzKbEmYoZ6JYUnPlw3M2dbK0-66z8DZn9QTL0iODUcMZUNTxdRKaW7L1aVtSdIiemfBd1EttnSjMnfDLpOWkFmPY"/>
              </div>
              <div className="md:w-2/3 p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <h3 className="font-['Lexend'] text-2xl font-bold text-white">سلطة الكينوا والبروتين النباتي</h3>
                  <span className="font-['Space_Grotesk'] text-xs text-[#00edbd] bg-[#006b54]/20 px-3 py-1 rounded-full">نباتي</span>
                </div>
                <div className="flex gap-6 border-y border-[#494847]/20 py-4">
                  <div className="text-center">
                    <p className="text-[10px] text-[#adaaaa] font-['Space_Grotesk'] uppercase mb-1">Cals</p>
                    <p className="font-['Lexend'] text-lg font-bold text-[#e08dff]">280</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-[#adaaaa] font-['Space_Grotesk'] uppercase mb-1">Prot</p>
                    <p className="font-['Lexend'] text-lg font-bold text-[#e08dff]">15g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-[#adaaaa] font-['Space_Grotesk'] uppercase mb-1">Carb</p>
                    <p className="font-['Lexend'] text-lg font-bold text-[#e08dff]">42g</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-sm text-white mb-2 underline decoration-[#e08dff] underline-offset-4">المكونات</h5>
                    <p className="text-xs text-[#adaaaa] leading-relaxed">كينوا مسلوقة، حمص، خيار، طماطم كرزية، بقدونس، عصير ليمون، زيت زيتون.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-white mb-2 underline decoration-[#e08dff] underline-offset-4">التحضير</h5>
                    <p className="text-xs text-[#adaaaa] leading-relaxed">تخلط جميع المكونات في وعاء كبير وتتبل بالليمون والزيت والملح وتقدم باردة.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Card 4 */}
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-square lg:aspect-auto lg:h-full min-h-[400px]">
              <img alt="Beef Steak" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzPE6lSUFH5Fb4aiUh76c7jUgfsmK602MqURJLVJV4u5h38_JL59Cb0atCip9Kbp26GmYZxisLSOsuSP4fs1Bd7KNAUB2fo2QXfbbemX4jmMDm8Vsxsk02e_U6edHsLMCyaF-uS9Ubf7KwxBmfqOS8UkFhhg99I2FtPXgVSS6dTBwewcIXlbsXJCyZZ6gG3nBP90DsrI80DK-cU7UUJ-0V0Vnrd9EE8qVM-fXQGiAII60La9zZzOgP0HmZlcg4Pw53kIMzRWxnoX4h"/>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0e0e0e] via-transparent to-transparent"></div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-['Lexend'] text-3xl font-bold text-white mb-4">ستيك بقري بصلصة المشروم</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-[#201f1f] px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00fcca] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                    <span className="font-['Space_Grotesk'] text-sm">510 KCAL</span>
                  </div>
                  <div className="bg-[#201f1f] px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#e08dff] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>fitness_center</span>
                    <span className="font-['Space_Grotesk'] text-sm">52g PROTEIN</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#131313] p-6 rounded-2xl">
                  <h4 className="font-['Lexend'] text-lg font-bold text-[#00fcca] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">inventory_2</span>
                    المكونات
                  </h4>
                  <ul className="space-y-3 text-[#adaaaa] font-['Manrope']">
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e08dff]"></span>
                      250 جرام لحم بقري (سيرلوين)
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e08dff]"></span>
                      كوب مشروم طازج مقطع
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e08dff]"></span>
                      كريمة طبخ قليلة الدسم
                    </li>
                  </ul>
                </div>
                <div className="bg-[#131313] p-6 rounded-2xl">
                  <h4 className="font-['Lexend'] text-lg font-bold text-[#00fcca] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">auto_fix_high</span>
                    السر المهني
                  </h4>
                  <p className="text-sm text-[#adaaaa] leading-relaxed">
                    لضمان طراوة اللحم، اتركه يرتاح لمدة 5 دقائق بعد الطهي قبل التقطيع. صلصة المشروم تُحضر في نفس مقلاة اللحم للحصول على النكهة الكاملة.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Card 5 (Smoothie/Snack) */}
          <div className="bg-[#e08dff]/5 rounded-[32px] p-8 border border-[#e08dff]/20 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-[#e08dff]/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#e08dff] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>blender</span>
            </div>
            <div className="flex-grow text-center md:text-right">
              <h3 className="font-['Lexend'] text-2xl font-bold text-white mb-2">سموذي "الطاقة القصوى"</h3>
              <p className="text-[#adaaaa] font-['Manrope'] max-w-2xl">مثالي قبل التمرين بـ 45 دقيقة. يحتوي على موز، زبدة فول سوداني، بروتين بودرة، وحليب لوز.</p>
            </div>
            <div className="bg-[#0e0e0e] p-4 rounded-2xl shadow-[0_0_15px_rgba(0,252,202,0.3)]">
              <p className="font-['Space_Grotesk'] text-[#00fcca] text-xs mb-1">وقت التحضير</p>
              <p className="font-['Lexend'] text-xl font-black">05:00</p>
            </div>
          </div>
        </section>
      </main>

      {/* Contextual FAB */}
      <button className="fixed bottom-24 md:bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-[#e08dff] to-[#bc00fb] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(188,0,251,0.4)] active:scale-90 transition-all z-50 hover:scale-105">
        <span className="material-symbols-outlined text-white text-3xl font-bold">add</span>
      </button>
    </div>
  );
}
