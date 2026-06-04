import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dumbbell, Flame, Activity, Target, ArrowLeft, CheckCircle2, Play } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
};

const item = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function LandingPage() {
  const heroImages = [
    '/images/hero-1.png',
    '/images/hero-2.png',
    '/images/hero-3.png',
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white selection:bg-primary/30 font-sans overflow-x-hidden" dir="rtl">
      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0e0e0e]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">HELMY</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/login" className="text-slate-300 hover:text-white transition-colors">تسجيل الدخول</Link>
          <Link to="/login" className="bg-white text-black px-6 py-2.5 rounded-full hover:bg-slate-200 transition-colors font-bold">ابدأ الآن</Link>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 flex flex-col items-center text-center min-h-screen justify-center">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto"
          initial="initial"
          animate="whileInView"
          variants={fadeIn}
        >
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            مستقبلك الرياضي يبدأ هنا
          </span>
          <h1 className="text-5xl md:text-[5rem] font-black tracking-tight mb-6 leading-[1.1]">
            صمم جسدك.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              بذكاء وتطور.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            تطبيق احترافي يجمع بين العلم، التكنولوجيا، وأساليب التدريب المتقدمة لمساعدتك على بناء العضلات، خسارة الدهون، وتتبع تقدمك بدقة متناهية.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/25">
              <span>ابدأ رحلتك مجاناً</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group backdrop-blur-sm">
              <Play className="w-5 h-5 fill-current text-slate-300 group-hover:text-white transition-colors" />
              <span>شاهد كيف يعمل</span>
            </button>
          </div>
        </motion.div>

        {/* Hero Image / Dashboard Mockup */}
        <motion.div 
          className="mt-20 relative w-full max-w-5xl mx-auto rounded-[40px] overflow-hidden border border-white/10 shadow-2xl h-[500px] md:h-[700px] bg-zinc-900"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/20 to-transparent z-10" />
          
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={currentImageIndex}
              src={heroImages[currentImageIndex]}
              alt="AR Fitness Training" 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </AnimatePresence>
          
          {/* Floating UI Elements on the image to show app nature */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
            className="absolute bottom-12 right-8 md:right-12 z-20 bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-3xl flex items-center gap-5"
          >
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
              <Activity className="w-7 h-7 text-primary" />
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400 font-medium mb-1">معدل الحرق</p>
              <p className="text-2xl font-bold text-white">2,450 <span className="text-sm font-normal text-slate-500">kcal</span></p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
            className="absolute top-12 left-8 md:left-12 z-20 bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-3xl flex items-center gap-5"
          >
            <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
              <Dumbbell className="w-7 h-7 text-emerald-400" />
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400 font-medium mb-1">تمرين اليوم</p>
              <p className="text-xl font-bold text-white">Upper Body Power</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section className="py-32 px-6 md:px-12 bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6">كل ما تحتاجه للوصول لهدفك</h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">أدوات احترافية مصممة خصيصاً لتمنحك السيطرة الكاملة على تدريبك وتغذيتك.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              { icon: Dumbbell, title: "بناء العضلات", desc: "برامج تدريبية متطورة مبنية على أسس الميكانيكا الحيوية لزيادة الكتلة العضلية بفعالية." },
              { icon: Flame, title: "خسارة الدهون", desc: "خطط دقيقة لحرق الدهون مع الحفاظ على الكتلة العضلية من خلال أنظمة HIIT والكارديو." },
              { icon: Activity, title: "متابعة التمارين", desc: "سجل أوزانك، تكراراتك، ومستوى الإجهاد (RPE) لضمان التطور المستمر Progressive Overload." },
              { icon: Target, title: "متابعة السعرات", desc: "حاسبات دقيقة ونظام بدائل الأطعمة لضمان تحقيق هدفك الغذائي بكل سهولة." }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={item}
                className="bg-[#151515] border border-white/5 p-8 rounded-[32px] hover:bg-[#1a1a1a] hover:border-primary/20 transition-colors group"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROGRESS TRACKING SHOWCASE ── */}
      <section className="py-32 px-6 md:px-12 overflow-hidden relative bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            className="flex-1 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black leading-[1.2]">
              راقب تطورك،<br/>
              <span className="text-primary">بالأرقام والحقائق.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              لا تترك نتائجك للصدفة. التطبيق يوفر لك لوحة تحكم شاملة تعرض مدى التزامك بالأهداف الأسبوعية، تطور قوتك في التمارين الأساسية، وقياسات جسمك بمرور الوقت.
            </p>
            <ul className="space-y-5 pt-4">
              {['تتبع الأوزان والتكرارات لكل جلسة', 'مؤشرات التزام أسبوعية وشهرية', 'رسوم بيانية توضح مسار تقدمك'].map((listItem, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  {listItem}
                </li>
              ))}
            </ul>
            <div className="pt-6">
              <button className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white rounded-full font-bold transition-colors">
                اكتشف ميزات التتبع
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <div className="relative bg-[#151515] border border-white/10 rounded-[40px] p-6 shadow-2xl">
              {/* Mock Dashboard Element */}
              <div className="h-64 rounded-3xl bg-zinc-900 border border-white/5 mb-6 relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-primary/20 to-transparent" />
                <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,100 L0,50 Q25,80 50,40 T100,20 L100,100 Z" fill="rgba(115, 17, 212, 0.2)" />
                  <path d="M0,50 Q25,80 50,40 T100,20" fill="none" stroke="#7311d4" strokeWidth="2" />
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900 p-5 rounded-2xl border border-white/5">
                  <p className="text-slate-400 text-sm mb-1">الالتزام</p>
                  <p className="text-2xl font-bold">92%</p>
                </div>
                <div className="bg-zinc-900 p-5 rounded-2xl border border-white/5">
                  <p className="text-slate-400 text-sm mb-1">تمارين منجزة</p>
                  <p className="text-2xl font-bold">48</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 px-6 md:px-12 bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6">قصص نجاح حقيقية</h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium">انضم لآلاف المتدربين الذين غيروا حياتهم مع Helmy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "أحمد كمال", role: "متدرب", text: "التطبيق غيّر مفهومي للتمرين تماماً. واجهة نظيفة جداً وخالية من التعقيد، وتتبع الأوزان ساعدني أكسر ثباتي اللي استمر شهور." },
              { name: "عمر حسن", role: "رياضي", text: "أفضل تطبيق جربته لحساب السعرات ومتابعة برامج الضخامة. الـ AI Coach يعطيني نصائح دقيقة كأن معي مدرب شخصي محترف." },
              { name: "زياد طارق", role: "مبتدئ", text: "كنت تائه في البداية، لكن تقسيم البرامج ووضوح التمارين في التطبيق خلاني ألتزم بسهولة وأشوف نتائج فعلية خلال أول شهرين فقط." }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#151515] p-8 rounded-[32px] border border-white/5 relative"
              >
                <div className="absolute -top-5 right-8 text-6xl text-primary/20 font-serif">"</div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(star => <CheckCircle2 key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                </div>
                <p className="text-slate-300 leading-relaxed mb-8 font-medium">{review.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xl text-primary">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <p className="text-sm text-slate-500">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / PRICING ── */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden bg-[#0e0e0e]">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(115,17,212,0.15)_0%,transparent_70%)] pointer-events-none z-0" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6">استثمر في صحتك</h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium">خطط بسيطة وواضحة بدون رسوم خفية.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-[#151515] border border-white/5 p-10 rounded-[40px] flex flex-col">
              <h3 className="text-3xl font-black mb-3">الأساسي</h3>
              <p className="text-slate-400 text-base mb-8 font-medium">للمبتدئين في رحلة اللياقة</p>
              <div className="mb-10">
                <span className="text-6xl font-black">مجاناً</span>
                <span className="text-slate-500 ml-2">/ دائم</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['برامج تدريبية أساسية', 'حاسبة سعرات حرارية', 'تتبع التمارين الأساسية'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-slate-600 shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
              <Link to="/login" className="w-full py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all text-center">
                ابدأ مجاناً
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-primary/20 to-[#151515] border border-primary/50 p-10 rounded-[40px] flex flex-col relative">
              <div className="absolute -top-4 left-10 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-primary/30">
                الأكثر طلباً
              </div>
              <h3 className="text-3xl font-black mb-3">برو</h3>
              <p className="text-primary-100 text-base mb-8 font-medium">للباحثين عن أقصى النتائج</p>
              <div className="mb-10">
                <span className="text-6xl font-black">199</span>
                <span className="text-slate-400 ml-2">ج.م / شهرياً</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['وصول غير محدود لجميع البرامج', 'خطط تغذية مخصصة', 'تحليلات تقدم متقدمة', 'دعم مباشر من المدرب الذكي'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-white">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
              <Link to="/login" className="w-full py-4 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 text-white font-bold transition-all text-center">
                اشترك الآن
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 bg-[#0a0a0a] py-12 px-6 md:px-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Dumbbell className="w-6 h-6 text-primary" />
          <span className="text-2xl font-black tracking-tight text-white">HELMY</span>
        </div>
        <p className="text-slate-500 text-sm font-medium">
          © {new Date().getFullYear()} Helmy Fitness. جميع الحقوق محفوظة.
        </p>
      </footer>
    </div>
  );
}
