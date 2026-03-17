import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';

export default function Education() {
  const navigate = useNavigate();

  const articles = [
    {
      title: "تشريح الجهاز العضلي",
      description: "الدليل التقني المتكامل للرياضيين",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdsB3v7QMUiU7p2jNyIvMjz9Ofa-7HFX7-mse3vfYsXgLsqs8balOcoN5bBt-0J9KyNKglLSW8aQtfKMmZ7IFmucNKdj327OdtfC18N8F4sw-Z2EWO0OamD2jq2RXvRZdeyLlSgpqUIC7tQ0jtNMsiRY5Z8XV36-og8b6FY-Z13nmQYEiBwl6pMfJLX1Z4AbIA-TfnfEPXM6LIcNylfyv5jvFXYKjKIjW_78a98YbgLzGsGfi7MjAoPVJ142NkZU10qxwP6Fj5NjyW",
      path: "/education/anatomy"
    },
    {
      title: "الميكانيكية وعلم الحركة",
      description: "تعلم أساسيات حركة الجسم وتفاعل القوى",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8Hty8omI8ntTWPKngq1xIBAwDCZKA3UY53Oj1zZPLJt2fJlrfv4rvm8TyTLs4-qAOAuLJuJFaJhDrxkEyu0qQtSPAYLZjrST5XgXFhGaZEA0kFlQaYy4KBH8DWuQp2VUSjLssc7Be9lIQz-ZbrSwlrbeNWzVM_aNPeQMtszgtqmLrv_iEGxRkHOdN32fpjfq73mWFiylFPysTtW4fR9u3-uEeRW82lbpPie0pDeZRhNXy0JuNviGEGbChTMEMtCwyhmjvq2MDlPtj",
      path: "/education/biomechanics"
    },
    {
      title: "التغذية للرياضيين",
      description: "دليلك الشامل للغذاء الصحي والأداء العالي",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2L-VPaiGxNi-a1zOGnx7OxHF0UBfdIsfzaEl0PlsNoCb4jR1bi2T-2HD7sLJih2Wg-cxrIDu9ERBHi9ym1iE4KT1x1LIjiKKbrqYOmZ55tJlCqNlADoBWOGqxwv0etwldvOIw43zWQ0CHmKUwVNfCEqfFsq7b47jEnKHhcnnmI59ZZE1bMgN3YH3OCgi59v7QeYQOBx8CRLI4sSGQsHbDQn4dZYc3FszKOy2Vm3vFIG-mnOun3FGn9cTbsRYPayxSXX356ZN6pT3o",
      path: "/education/sports-nutrition"
    },
    {
      title: "التدريب الرياضي",
      description: "منهجيات التدريب الحديثة لرفع الكفاءة البدنية",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgvs43HRfxu6A3Ma39QjXcJndxZ__pIsUvhRG_0lQCGRZ2ayFniGlt2dSYUzcIDrOzLMcOG9KZib5O4vVme12iaCikwgo5aJA4DakhdHcDZ35Hd--eqTN6cb86hd3ZI8qgRS4Ia2Jq2zGzADtHeyRuQzVmi7kk46h2DtfoNiy8puIpZ2QS4mvbYNPkRUgVDjvZlhahHAEHHjCrT7okwwBislgWO8SWF3L_8qryFST2kFgCrfOsh14-u3TR5h8NAEilbO-tWD86Fc1b",
      path: "/education/training"
    },
    {
      title: "فسيولوجية الرياضة",
      description: "استجابة وتكيف أجهزة الجسم للجهد البدني",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6JzsHqB2J12QRErx_y5rI1ymx20LBtH9cU_ntxop9nnimdY5tJfU20nviTM0pO4jdxmpLsuR-0uEFkUsCaxbw6a0sYJXVh-katszXmmEpzow9bmzH_Hon8Kw_DkpHWutRxmMgu1LZmxN_m4F7jMMtqWVSs5_xkFNpIQrJN1yQLt4yVVfU1j0PV9PHamWnV_sTn42V9l2onUusa3s63_IIXQka1CZ00Skf1XECGH9B_i-u7iCC8gVGSbTTkpV5E8On6Qmu5etJ6LGE",
      path: "/education/physiology"
    },
    {
      title: "سيكولوجية الرياضة",
      description: "العوامل النفسية المؤثرة على الأداء الرياضي",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6RABoCrQM4odBZpYeVLZWmqRloPItJNbFNJsc1qR15eFxObft-3gpyDripB0OXLVLapDC4oqTXr29Bqohqsg6O8MxqTvtalVoEnWTrtDxLw7zNxjPaYDIR_o57Mw0tCBrt9VnKGvlI4ZMDWmZzP4IOFfxfFvlM35CyEknpQzMmRjZpqSoGEjUZF_NcP4x9xuSgSYTvlS7w6RBT_bsFaCraqoNk6HHaCh3VpSLG0QLNJw8NL1fPYHUSGg6xDbMR050X3j6cmCxhNT_",
      path: "/education/psychology"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header Section */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">التعليم</h1>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* Hero Title */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 pt-8 pb-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">المقالات التعليمية</h2>
            <p className="text-slate-500 dark:text-primary/60 mt-2">اكتشف أحدث المعارف في العلوم الرياضية</p>
          </div>
        </FadeContent>

        {/* Articles List */}
        <div className="flex flex-col gap-3 px-4">
          {articles.map((article, index) => (
            <FadeContent key={index} blur={true} duration={1000} initialOpacity={0} delay={index * 100}>
              <SpotlightCard 
                className="flex items-center gap-4 bg-white dark:bg-primary/5 p-3 rounded-2xl border border-primary/10 cursor-pointer group"
                spotlightColor="rgba(115, 17, 212, 0.15)"
                onClick={() => article.path !== '#' && navigate(article.path)}
              >
                <div className="relative shrink-0">
                  <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-20 shadow-lg shadow-primary/10 group-hover:shadow-primary/30 transition-shadow" 
                    style={{ backgroundImage: `url("${article.image}")` }}
                  ></div>
                </div>
                <div className="flex flex-col flex-1 justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{article.title}</p>
                    <span className="material-symbols-outlined text-primary/50 group-hover:text-primary transition-colors text-xl">chevron_left</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal line-clamp-2">{article.description}</p>
                </div>
              </SpotlightCard>
            </FadeContent>
          ))}
        </div>
      </main>
    </div>
  );
}
