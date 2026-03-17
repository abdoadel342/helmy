import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';

export default function DietarySystems() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden font-display">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-4 justify-between border-b border-primary/10">
        <div 
          onClick={() => navigate(-1)} 
          className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center mr-[-40px]">الأنظمة الغذائية</h2>
      </div>

      {/* Hero Section */}
      <FadeContent blur={true} duration={1000} initialOpacity={0}>
        <div className="@container">
          <div className="px-4 py-4">
            <div 
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-[220px] relative shadow-lg shadow-primary/5 group" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCoLVIKKiHb1TdYh8v8lI1pH8gf5gI1uE6Mqa3BFyBMamBuNvmAh2_FH9-rrtgCdTKidnubypb7qLk9__DVC_7wZiIdsX7BKuD6QF7BfRWdBo98-2ccN79FNmbKCGb4sTvv8NrC1APskbfAjdTEyDZzPSd5obeRwKW5O8rvjDDVeO6LpanYXqy3vwkeiXR6OwICzMPNzwCan8gpaSt6I-b2XFjaW8w_Y0XBdEcdoO8ircVYAXCGQylweoKcsPkb6zGb8wlaiYLeuNUY")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent transition-opacity duration-500"></div>
              <div className="relative p-6 z-10">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-md mb-3 inline-block uppercase tracking-wider">
                  <ShinyText text="جديد" disabled={false} speed={3} className="text-white" />
                </span>
                <h1 className="text-white text-2xl font-bold mb-1">دليلك نحو غذاء أفضل</h1>
                <p className="text-slate-200 text-sm">اكتشف الأنظمة الصحية التي تناسب نمط حياتك</p>
              </div>
            </div>
          </div>
        </div>
      </FadeContent>

      <FadeContent blur={true} duration={1000} initialOpacity={0}>
        <h3 className="text-slate-900 dark:text-slate-100 tracking-tight text-xl font-bold px-4 pt-4 pb-2">اختر نظامك الغذائي</h3>
      </FadeContent>

      {/* Dietary Systems Cards */}
      <div className="flex flex-col gap-4 p-4 pb-24">
        {/* Mediterranean Diet */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <SpotlightCard className="flex flex-col gap-4 rounded-xl bg-white dark:bg-primary/5 border border-primary/10 p-4 shadow-sm hover:shadow-md transition-shadow" spotlightColor="rgba(115, 17, 212, 0.15)">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-[2_2_0px] flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">restaurant</span>
                  <p className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight">حمية البحر الأبيض المتوسط</p>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed">تركز على الدهون الصحية، الحبوب الكاملة، والبروتينات النباتية لصحة القلب وطول العمر.</p>
                <button 
                  onClick={() => navigate('/nutrition/systems/mediterranean')}
                  className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-white text-sm font-bold leading-normal w-fit shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                >
                  <span>عرض التفاصيل</span>
                </button>
              </div>
              <div 
                className="w-32 h-32 bg-center bg-no-repeat bg-cover rounded-lg shrink-0 shadow-inner" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxfREac3mbNInYsMi306ID7WP8QaON979HQuvUoOovXIDCCvmjO0ArgHdu1SSgqlekmzWtxj3Yt0EkGK1oQiPBREtHAhMqu6y35efkYY8pxaSQ09-_RAFAculKaYbfgMDxhFQqS2BsYz5vralAafK9ZpKdQyHgFf7ZBYZjPKpjkwPNoffasaco9vJnB9qly3cdkb0uB2dFwvBkga7NN4TOJkn53Mcv2u6fm5uhn_DiRxAosEx7b_2JKYek3iGyJ6YoZ9FSyhLbhktz")' }}
              ></div>
            </div>
          </SpotlightCard>
        </FadeContent>

        {/* DASH Diet */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <SpotlightCard className="flex flex-col gap-4 rounded-xl bg-white dark:bg-primary/5 border border-primary/10 p-4 shadow-sm hover:shadow-md transition-shadow" spotlightColor="rgba(115, 17, 212, 0.15)">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-[2_2_0px] flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">favorite</span>
                  <p className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight">حمية DASH</p>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed">نظام غذائي مصمم خصيصاً لإدارة ضغط الدم المرتفع وتعزيز صحة القلب والأوعية.</p>
                <button 
                  onClick={() => navigate('/nutrition/systems/dash')}
                  className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-white text-sm font-bold leading-normal w-fit shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                >
                  <span>عرض التفاصيل</span>
                </button>
              </div>
              <div 
                className="w-32 h-32 bg-center bg-no-repeat bg-cover rounded-lg shrink-0 shadow-inner" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6PZUw1e1p2WHGMUtTedqK1u1sW9E5rvKnhWA7nrSdZyFmRnIabV8Ik3tjOo2D0RRapIVuYBNNZRVFqcb6QAzvUor1NrSasDiniNWAMkBYZvglSTabVrvZJ7Q1qhy7kRKiUIHP7UdmU1sqIMJy1qglJgz7lk6QGGbD5f-o6gvcpwWM_LQw8qowIKSI_WLSB6Ov9A3fdgEBUuI4iGL9dAmt1ZEnTVJkjjYwXaYiYe56JcmyjqduBz3VtK0_J1pOyzACX4GhKkvIGqTq")' }}
              ></div>
            </div>
          </SpotlightCard>
        </FadeContent>

        {/* Healthy Plate */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <SpotlightCard className="flex flex-col gap-4 rounded-xl bg-white dark:bg-primary/5 border border-primary/10 p-4 shadow-sm hover:shadow-md transition-shadow" spotlightColor="rgba(115, 17, 212, 0.15)">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-[2_2_0px] flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">lunch_dining</span>
                  <p className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight">نموذج طبق صحي</p>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed">أفضل وسيلة لتقسيم وجباتك اليومية وضمان الحصول على كافة العناصر الغذائية.</p>
                <button 
                  onClick={() => navigate('/nutrition/systems/healthy-plate')}
                  className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-white text-sm font-bold leading-normal w-fit shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                >
                  <span>عرض التفاصيل</span>
                </button>
              </div>
              <div 
                className="w-32 h-32 bg-center bg-no-repeat bg-cover rounded-lg shrink-0 shadow-inner" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPt_MEeaYh_4uCc2l28one_0UwrHSeH0yE9ZVHb-W1gtivnHFjwo4pwjkycjNQE3QyVwyqWjAQNVspuHOIqWhNdo6FNePQooOOR_OsyolfpQvavYyOFzGuoHdvlD-3BFewm3MwG6r7CAT-o6f3bzpY_A6xKJ6P1RFQQQcqJEinKWDeKpqG8-wvl1McrfN-JWRfFuLB-crPi8zweHTyixtZdOee4jAqtXj1bc8Aa50R91D5PjaWfry0ezFadUFjdlGbUKZgByaDqXYt")' }}
              ></div>
            </div>
          </SpotlightCard>
        </FadeContent>

        {/* Plant-Based */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <SpotlightCard className="flex flex-col gap-4 rounded-xl bg-white dark:bg-primary/5 border border-primary/10 p-4 shadow-sm hover:shadow-md transition-shadow" spotlightColor="rgba(115, 17, 212, 0.15)">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-[2_2_0px] flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">eco</span>
                  <p className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight">النظام النباتي</p>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed">نظام نباتي متكامل يدعم الأداء الرياضي العالي ويقلل من الالتهابات الجسدية.</p>
                <button 
                  onClick={() => navigate('/nutrition/systems/plant-based')}
                  className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-white text-sm font-bold leading-normal w-fit shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                >
                  <span>عرض التفاصيل</span>
                </button>
              </div>
              <div 
                className="w-32 h-32 bg-center bg-no-repeat bg-cover rounded-lg shrink-0 shadow-inner" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDRCy01hV7xpfvY_N66AF36vfWBjWqRY_w9kzOOVh-ixPQ6L16eYg8T6rmEDgEIbFHvZZXhSoA70Bq9YB0RONtuk6c4oP478JrBZ-MSQbi3jb1EoIUBYSbA9PGJfCiXOtVMziUi5_u51FQw9UkVqJnl575pBMUPTHJRBIWMBUWnekR-KQJ3269ZVX2lIeV5_YSsdmlfWCWjabosaSBb-g7VlVAF9StfZbtAMAZkuPxbJixmEXBIwAr8ZX6y32e6KTsUTUwLDLnbTCOj")' }}
              ></div>
            </div>
          </SpotlightCard>
        </FadeContent>

        {/* Exchange Lists */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <SpotlightCard className="flex flex-col gap-4 rounded-xl bg-white dark:bg-primary/5 border border-primary/10 p-4 shadow-sm hover:shadow-md transition-shadow" spotlightColor="rgba(115, 17, 212, 0.15)">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-[2_2_0px] flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">lists</span>
                  <p className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight">نظام قوائم البدائل</p>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed">يمنحك المرونة الكاملة لاستبدال الأطعمة وحساب السعرات بسهولة ويسر.</p>
                <button 
                  onClick={() => navigate('/nutrition/systems/exchange')}
                  className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-white text-sm font-bold leading-normal w-fit shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                >
                  <span>عرض التفاصيل</span>
                </button>
              </div>
              <div 
                className="w-32 h-32 bg-center bg-no-repeat bg-cover rounded-lg shrink-0 shadow-inner" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDgxqf8JSMPYs2ys-6XY4N367gf-BRPCx71nPgbrMxwZlTOF0NkcvUGZio1ZRqwK-socWS12438RhR2LJo96-D1xO7WPtkybzZsxnzhptlCZ1iLS4a2XqoxGf_yAkzPUEi6hrDKl2-7WsEBvzbS7UhfX3LWqaZc-lECFz9DOUJfvGh8e1Hyvd793QbdRCuD6qIPgFB4UoQqgV-IX_11e8_-jNpXHTSirQTsbS0bWvNrhQcaK0nPOFwCtOh88Dn2_vXrvkqWPYUKYnjy")' }}
              ></div>
            </div>
          </SpotlightCard>
        </FadeContent>
      </div>
    </div>
  );
}
