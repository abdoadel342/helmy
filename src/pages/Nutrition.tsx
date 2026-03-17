import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';

export default function Nutrition() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-b border-primary/10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold tracking-tight">التغذية للرياضيين</h1>
        </div>
        <div className="size-10"></div> {/* Spacer for symmetry */}
      </header>

      <div className="space-y-6 px-4 py-4">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section>
            <Link to="/education/sports-nutrition" className="block relative w-full aspect-[16/9] rounded-xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
              <div 
                className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCaKbMQbNeRCjI_euqIVu57IO5vJskPuww0puMSR0U415wg0tUk21ZRG84VeC3sNkZSAAXUm9KOyIQK--AUTRCpa5_leARTB0KbTz7ognF6xEwfHPieXyIuhPAVrU1-wzQ9R7ny87cC203DNgs6VSwTsNnvPgHqWU2CwBFolpp0p-nAIAvZjGp9tHkltlRKAJGhzIOD2UGD_8Lkb2eY2mT0bm28r2jXj61KqC2-Nb-FOG5raXtQHkWNq4jYcxH10B60dFW6_uIeDeki")' }}
              ></div>
              <div className="absolute bottom-4 right-4 left-4 z-20">
                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">جديد</span>
                <h2 className="text-white text-2xl font-bold">وقود الأبطال</h2>
                <p className="text-slate-200 text-sm opacity-90">دليلك الشامل للتغذية الرياضية المتقدمة</p>
              </div>
            </Link>
          </section>
        </FadeContent>

        {/* Nutrition Plans Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">restaurant_menu</span>
                خطط التغذية
              </h2>
              <button className="text-primary text-sm font-medium">عرض الكل</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/nutrition/plan" className="group cursor-pointer">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors z-10"></div>
                  <div 
                    className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHHkswTdSJ5qBWQMxm9vRiceixqW8h5WSmsw9baVVMFUBr8eIaUCKAqSGiiwdX2KtMcLmSPPHnd8HVvDf2_kGoooccgO8sRIvohf6mCtXPsM_Gxbsvzwc2l1i76H4TKRj_3LV6rAqajKYKMfglsmBd_6wsl5iMAufETLV8x7YUUha2B-0VzEq5nJ0SN9kEExQwOu5-hCCQKdCI27aY5h6CJ2Mbz9fxPcZf8AIp2KGccmgj9dv_IEWfh2FHWwVFIlisRE5vS3BY5BgC")' }}
                  ></div>
                  <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/80 to-transparent z-20">
                    <p className="text-white text-sm font-bold">بناء العضلات</p>
                  </div>
                </div>
              </Link>
              <Link to="/nutrition/fat-loss" className="group cursor-pointer">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors z-10"></div>
                  <div 
                    className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDc6owwdaNDxFNxNAdFelf92nz1jut3-sQTMtmAEruNNr9dhE6HuenDA52FaUHcYfMFuhFANVJ-kdCRm-8BD7v-8B5mqKEFMKExpU1cENjGwy3Adin78qg1DFzMV0ZsKLa5q3MFb5tvi5w0OYCBz3c6fLGJFQmN8tzrdR09fgNC6Hn-Ut60o1zWP9oKNfqV9_YlPOLjcuexe45P4nDitCD7WCwyKpmrx53B8_QEsesC9aBdzu_G_qQ4I9gaKhQk5KsfirHTomXaS9Cw")' }}
                  ></div>
                  <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/80 to-transparent z-20">
                    <p className="text-white text-sm font-bold">خسارة الدهون</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </FadeContent>

        {/* Supplements Guide Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="bg-primary/5 -mx-4 px-4 py-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">pill</span>
              دليل المكملات
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-background-light dark:bg-background-dark p-3 rounded-xl border border-primary/10 cursor-pointer hover:border-primary/30 transition-colors">
                <div className="size-14 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-3xl">exercise</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base">واي بروتين (Whey)</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-1">المصدر الأسرع لترميم الألياف العضلية بعد التمرين.</p>
                </div>
                <span className="material-symbols-outlined text-slate-400">chevron_left</span>
              </div>
              <div className="flex items-center gap-4 bg-background-light dark:bg-background-dark p-3 rounded-xl border border-primary/10 cursor-pointer hover:border-primary/30 transition-colors">
                <div className="size-14 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base">الكرياتين مونوهيدرات</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-1">زيادة القوة البدنية وتحسين الأداء في التمارين عالية الكثافة.</p>
                </div>
                <span className="material-symbols-outlined text-slate-400">chevron_left</span>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Hydration Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section>
            <div className="bg-gradient-to-br from-primary to-[#4a0b8a] rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined">water_drop</span>
                  نصائح الترطيب
                </h2>
                <p className="text-slate-100 text-sm mb-4 leading-relaxed opacity-90">
                  يؤثر نقص الماء بنسبة 2% فقط على أدائك الرياضي بشكل ملحوظ. تأكد من شرب 500 مل قبل التمرين بـ 30 دقيقة.
                </p>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span className="text-xs">كل ساعتين</span>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">glass_cup</span>
                    <span className="text-xs">3-4 لتر يومياً</span>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined absolute -bottom-4 -left-4 text-9xl opacity-10 rotate-12">opacity</span>
            </div>
          </section>
        </FadeContent>

        {/* Healthy Recipes Teaser */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="mb-4">
            <h2 className="text-xl font-bold mb-4">وصفات مقترحة</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar -mx-4 px-4">
              <div className="min-w-[140px] space-y-2 cursor-pointer group">
                <div 
                  className="h-24 w-full rounded-lg bg-center bg-cover transition-transform duration-300 group-hover:scale-105" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZ9qOCJCj2pgK21QW77HT1tpYUt-g4aIQQrV9M8Ad9FBP3a9l_YeSJsZmlM8p4M4lSIPbvUEAgx0AR6HFsbRVIU86X6eBJ4_9LH-1wfKLZjeF04_3iwzTBnNKN9gpJbsJ3WLrzINgHYXVGldJtGXlpsPhJRaKz6qQea-f7Un4DN9HBGDNHrxHk7Pj_nH5oFcf7GgRL9Y-DcKZqX8RtaWOROAmY1u0rg00uMZQyPjgYPnDDeIfBHCpTlK1MeBnVi49CIJ1QLqSBxWQq")' }}
                ></div>
                <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">شوفان البروتين</p>
                <p className="text-[10px] text-slate-500">15 دقيقة • 350 سعرة</p>
              </div>
              <div className="min-w-[140px] space-y-2 cursor-pointer group">
                <div 
                  className="h-24 w-full rounded-lg bg-center bg-cover transition-transform duration-300 group-hover:scale-105" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDE-0yhpX0SjR8UnkysvKpLGQhHGuusu7Oeyi8wilNrF4eyrdm0ZcC0c78Fo2haotLQUtw5AMWJEAts5DgXTVpMp6T0nIubEFki9RdX14ykbNdyoQ4pEC6uoTY6c8VZcPuwlL67TD4a7uDFxMbt3Z6nuXxhwYcTCqRn-FgF0_o0vvxTL9hb9tZw_pfo_AlaJeekuUVbMH7zuGyp7aqNCYjjZ7j6jrzvWd3J_Hg06iLekrfKUYzMHQPkpghVdoE2tKWWIPv8Sgyt8cG_")' }}
                ></div>
                <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">سالمون مشوي</p>
                <p className="text-[10px] text-slate-500">25 دقيقة • 420 سعرة</p>
              </div>
              <div className="min-w-[140px] space-y-2 cursor-pointer group">
                <div 
                  className="h-24 w-full rounded-lg bg-center bg-cover transition-transform duration-300 group-hover:scale-105" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDR6m_B3XimTKpH7J42b9lKbM9Bkxtt992aAFlu8OpN-cO0_V-_S7hZXDNC-L4Ux4q4ka0P3WGOlplgrbRpDlyRacXPkuuFZsmsk6G16-DTDZnpB3wbE_cmC4QIXLpxu-iIHXdZdRKksAwg4DCJOn0w0MUgi9O4_eCpNKS3yIsQ3uqAoqV_4N2RA-tRXNJH6enhlr4oMOx_FU9xP28CQw-PTR897io_xlMxOypIBA1wLNfFchGlx2MuXqP-2SPS9cxHRCVBUSzEgKel")' }}
                ></div>
                <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">سلطة الدجاج</p>
                <p className="text-[10px] text-slate-500">20 دقيقة • 310 سعرة</p>
              </div>
            </div>
          </section>
        </FadeContent>
      </div>
    </div>
  );
}
