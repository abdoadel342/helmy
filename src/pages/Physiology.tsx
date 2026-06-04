import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { ShinyText } from '../components/react-bits/ShinyText';
import { BackButton } from '../components/BackButton';

const sections = [
  {
    id: 'energy',
    icon: 'bolt',
    title: 'أنظمة إنتاج الطاقة (Energy Systems)',
    subtitle: 'محركات الجسم الأيضية أثناء الجهد البدني',
    color: '#e08dff',
    content: [
      {
        heading: 'نظام الفوسفاجين (ATP-PC System)',
        text: 'أسرع أنظمة إنتاج الطاقة، يعتمد على تكسير مركب فوسفات الكرياتين (PC) لإعادة بناء الـ ATP. يعمل بدون أكسجين (لاهوائي) ولا يُنتج حمض اللاكتيك. يُستخدم في الحركات الانفجارية القصوى (مثل رفع الأثقال، القفز، انطلاقة الـ 100 متر). يُستنفد خلال 10 إلى 15 ثانية ويحتاج إلى 3-5 دقائق للتعافي الكامل.'
      },
      {
        heading: 'نظام الجليكوليسيس اللاهوائي (Glycolytic System)',
        text: 'يُنتج الطاقة عبر التكسير الجزئي للكربوهيدرات (الجليكوجين) في غياب الأكسجين. يمتد دور هذا النظام من 15 ثانية حتى دقيقتين (مثل عدو الـ 400 متر أو جولات الملاكمة المكثفة). يُنتج أيونات الهيدروجين واللاكتات كمنتج ثانوي، مما يؤدي إلى حموضة العضلة والشعور بالحرقان الذي يحد من الانقباض.'
      },
      {
        heading: 'النظام المؤكسد (Oxidative / Aerobic System)',
        text: 'المحرك الرئيسي لأنشطة التحمل الطويلة. يعتمد بشكل أساسي على الأكسجين لحرق الكربوهيدرات ثم الدهون (وأحياناً البروتين في حالات الإجهاد الشديد). هو أبطأ الأنظمة في إنتاج الطاقة لكنه يمتلك سعة شبه لانهائية. يتكفل بإنتاج الطاقة للجهود التي تتجاوز الـ 3 دقائق.'
      }
    ]
  },
  {
    id: 'muscle',
    icon: 'fitness_center',
    title: 'فسيولوجيا الألياف العضلية',
    subtitle: 'الهيكل الخلوي والاستجابة الحركية',
    color: '#00fcca',
    content: [
      {
        heading: 'الألياف بطيئة الانقباض (Type I - Slow Twitch)',
        text: 'ألياف حمراء غنية بالشعيرات الدموية، الميوجلوبين، والميتوكوندريا. تمتلك كفاءة عالية جداً في استخدام الأكسجين لتوليد الـ ATP لفترات طويلة. قوة الانقباض فيها منخفضة لكنها شديدة المقاومة للتعب. (هيمنة تامة لدى عداءي الماراثون الدراجين).'
      },
      {
        heading: 'الألياف سريعة الانقباض الانتقالية (Type IIa)',
        text: 'تُعرف بالألياف الوردية. تمثل جسراً بين التحمل والقوة الانفجارية. تستخدم الأيض الهوائي واللاهوائي معاً. يمكنها التكيف لتصبح أكثر قدرة على التحمل أو أكثر قوة بناءً على طبيعة التحفيز التدريبي.'
      },
      {
        heading: 'الألياف سريعة الانقباض النقية (Type IIx / IIb)',
        text: 'ألياف بيضاء تعتمد حصرياً على الأيض اللاهوائي. تتقلص بقوة هائلة وسرعة قصوى لكنها تتعب بسرعة فائقة لاحتوائها على عدد قليل من الميتوكوندريا. (المسؤولة عن القوة القصوى للرباعين وعدائي المسافات القصيرة).'
      },
      {
        heading: 'مبدأ حجم هينمان (Henneman’s Size Principle)',
        text: 'قانون فسيولوجي ينص على أن الجهاز العصبي يقوم بتجنيد الوحدات الحركية بشكل متسلسل تصاعدي بناءً على المقاومة المطلوبة. يبدأ بالألياف البطيئة (الضعيفة)، ولا يتم تفعيل الألياف السريعة (الضخمة) إلا عند الوصول لأوزان ثقيلة أو عند الوصول للفشل العضلي.'
      }
    ]
  },
  {
    id: 'cardio',
    icon: 'favorite',
    title: 'التكيف القلبي الوعائي والتنفسي',
    subtitle: 'كيف يتغير قلبك ورئتيك مع التدريب؟',
    color: '#ff928a',
    content: [
      {
        heading: 'حجم الضربة القلبي (Stroke Volume)',
        text: 'مع تدريب التحمل المستمر، تتضخم البطين الأيسر للقلب وتزداد سعة تجويفه، مما يسمح له بضخ كمية أكبر من الدم في كل نبضة. هذا هو التكيف الأهم الذي يميز قلب الرياضي عن قلب الشخص العادي.'
      },
      {
        heading: 'معدل ضربات القلب أثناء الراحة (RHR)',
        text: 'بسبب زيادة حجم الضربة القلبي، لا يحتاج القلب للنبض بعدد مرات كبير لضخ نفس كمية الدم المطلوبة وقت الراحة. لذلك ينخفض النبض لدى الرياضيين المتقدمين إلى 40-50 نبضة/الدقيقة (Bradycardia الحميدة).'
      },
      {
        heading: 'الحد الأقصى لاستهلاك الأكسجين (VO2 Max)',
        text: 'أفضل معيار لقياس اللياقة الهوائية. يمثل أقصى كمية من الأكسجين يستطيع الجسم استنشاقها، نقلها عبر الدم، واستهلاكها داخل الميتوكوندريا العضلية لإنتاج الطاقة. الرياضيون النخبة يمتلكون قيماً تفوق الـ 80 مل/كجم/دقيقة.'
      },
      {
        heading: 'عتبة اللاكتات (Lactate Threshold)',
        text: 'النقطة التي يبدأ عندها حمض اللاكتيك بالتراكم في الدم بمعدل أسرع من قدرة الجسم على التخلص منه. تأخير هذه العتبة هو الهدف الرئيسي لتدريب الرياضيين، لأنه يسمح لهم بالحفاظ على سرعة عالية دون الشعور السريع بالإعياء.'
      }
    ]
  },
  {
    id: 'endocrine',
    icon: 'science',
    title: 'استجابة الغدد الصماء والهرمونات',
    subtitle: 'التنظيم الكيميائي للأداء والتعافي',
    color: '#e08dff',
    content: [
      {
        heading: 'هرمون التستوستيرون (Testosterone)',
        text: 'الهرمون البنائي الأساسي. يرتفع مستواه بشكل حاد أثناء تدريبات المقاومة الثقيلة والتمارين متعددة المفاصل. يساهم في تخليق البروتين العضلي وتطوير الجهاز العصبي. لتعظيم إفرازه طبيعياً: استخدم أوزان >85% من 1RM، بفترات راحة قصيرة نسبياً (1-2 دقيقة).'
      },
      {
        heading: 'هرمون النمو البشري (HGH)',
        text: 'يلعب دوراً حاسماً في التعافي، حرق الدهون، وتقوية الأوتار والأربطة. يتم تحفيز إفرازه بقوة استجابةً لتراكم اللاكتات العالي وانخفاض الـ pH في العضلة (كما في تدريب التضخم أو الـ HIIT)، ويحدث الإفراز الأعظم له أثناء مرحلة النوم العميق.'
      },
      {
        heading: 'الكورتيزول (Cortisol)',
        text: 'يُعرف بهرمون الإجهاد. هو هرمون هدمي (Catabolic) ضروري للحياة، يكسر الأنسجة (كربوهيدرات، دهون، بروتينات) لتوفير الطاقة السريعة وقت التدريب العنيف. المشكلة تحدث عند بقاء الكورتيزول مرتفعاً بشكل مزمن نتيجة الإفراط في التدريب وقلة النوم، مما يدمر المكاسب العضلية والمناعة.'
      }
    ]
  },
  {
    id: 'environmental',
    icon: 'landscape',
    title: 'الفسيولوجيا البيئية',
    subtitle: 'تأثير المرتفعات والحرارة على الأداء',
    color: '#00fcca',
    content: [
      {
        heading: 'التدريب في المرتفعات (Altitude Training)',
        text: 'في المرتفعات (فوق 2000م)، يقل الضغط الجزئي للأكسجين في الهواء (Hypoxia). كاستجابة تعويضية، تفرز الكلى هرمون الـ EPO الذي يحفز إنتاج المزيد من خلايا الدم الحمراء لتحسين نقل الأكسجين. يستخدم الرياضيون استراتيجية "العيش في المرتفعات والتدريب في السهول" (Live High, Train Low) لتحقيق أقصى استفادة فسيولوجية ورياضية.'
      },
      {
        heading: 'التأقلم الحراري (Heat Acclimatization)',
        text: 'عند التدريب في الأجواء الحارة والرطبة، يتنافس الجلد (للتبريد) والعضلات (للعمل) على تدفق الدم. يتطلب التأقلم الفسيولوجي من 7 إلى 14 يوماً. التكيفات تشمل: التعرق بوقت أبكر وبغزارة أكبر، زيادة حجم بلازما الدم، وانخفاض تركيز الأملاح في العرق لتفادي التشنجات.'
      }
    ]
  }
];

const fiberTypes = [
  { type: 'Type I', name: 'بطيئة الانقباض', energy: 'هوائي (أكسجيني)', fatigue: 'مقاومة عالية جداً للتعب', force: 'منخفضة', color: 'حمراء (Myoglobin عالي)' },
  { type: 'Type IIa', name: 'سريعة انتقالية', energy: 'هوائي + لاهوائي', fatigue: 'مقاومة متوسطة', force: 'متوسطة إلى عالية', color: 'وردية' },
  { type: 'Type IIx', name: 'سريعة نقية', energy: 'لاهوائي (فوسفاجين وجلايكوليسيس)', fatigue: 'تتعب بسرعة فائقة', force: 'قصوى / انفجارية', color: 'بيضاء' }
];

export default function Physiology() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>('energy');
  const [expandedContent, setExpandedContent] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setExpandedSection(prev => prev === id ? null : id);
  };

  const toggleContent = (key: string) => {
    setExpandedContent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white selection:bg-[#ff928a]/30" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Ambient Glow Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#ff928a]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-[#00fcca]/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Top App Bar */}
      <header className="glass border-b border-white/5 p-4 sticky top-0 z-50">
        <div className="flex items-center max-w-5xl mx-auto">
          <BackButton />
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 mr-4" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="bg-gradient-to-l from-[#ff928a] to-[#e08dff] bg-clip-text text-transparent animate-gradient-shift">فسيولوجية الرياضة</span>
          </h2>
          <button className="text-[#00fcca] flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-[#00fcca]/10 rounded-full transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>share</span>
          </button>
        </div>
      </header>

      <div className="flex-1 pb-20 relative z-10">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="max-w-5xl mx-auto px-4 pt-6">
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-3xl min-h-[280px] md:min-h-[360px] relative group shadow-2xl border border-white/10"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=1200&q=80")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[#ff928a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative p-8 z-10">
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#ff928a] to-[#e08dff] text-white text-xs font-bold rounded-full mb-4 shadow-lg shadow-[#ff928a]/20">
                  <ShinyText text="ديناميكية الجسد" disabled={false} speed={3} className="text-white" />
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-3 max-w-xl animate-text-glow" style={{ fontFamily: 'var(--font-heading)' }}>
                  كيف يتكيف جسمك مع الجهد البدني؟
                </h1>
                <p className="text-[#adaaaa] text-sm md:text-base max-w-lg leading-relaxed">
                  فهم أنظمة الطاقة الأيضية، تكيف الألياف العضلية، والمنظومة الهرمونية لتحقيق ذروة الأداء الرياضي.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Quick Stats Grid */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="max-w-5xl mx-auto px-4 mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: 'battery_charging_full', label: 'أنظمة الطاقة', value: '3', color: '#00fcca' },
                { icon: 'network_cell', label: 'أنواع الألياف', value: 'Type I & II', color: '#ff928a' },
                { icon: 'favorite', label: 'كفاءة القلب', value: 'VO2 Max', color: '#e08dff' },
                { icon: 'water_drop', label: 'المنظومة الهرمونية', value: 'Anabolic', color: '#00fcca' }
              ].map((stat, i) => (
                <div key={i} className="web-card !bg-[#131313] p-4 text-center group stagger-item">
                  <span className="material-symbols-outlined text-2xl mb-2 block transition-transform group-hover:scale-110" style={{ color: stat.color, fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                  <p className="text-xl font-black text-white font-mono">{stat.value}</p>
                  <p className="text-[10px] text-[#adaaaa] uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeContent>

        {/* Main Content Modules */}
        <div className="max-w-5xl mx-auto px-4 mt-10 space-y-4">
          {sections.map((section, sectionIdx) => (
            <FadeContent key={section.id} blur={true} duration={800} initialOpacity={0}>
              <div className="web-card !bg-[#131313] overflow-hidden">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center gap-4 p-5 md:p-6 text-right transition-colors hover:bg-white/[0.02]"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300" style={{ backgroundColor: `${section.color}15` }}>
                    <span className="material-symbols-outlined text-2xl" style={{ color: section.color, fontVariationSettings: "'FILL' 1" }}>{section.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'var(--font-heading)' }}>{section.title}</h3>
                    <p className="text-[#adaaaa] text-xs mt-0.5">{section.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${section.color}15`, color: section.color }}>
                      {section.content.length} مواضيع
                    </span>
                    <span
                      className="material-symbols-outlined text-[#adaaaa] transition-transform duration-300"
                      style={{ transform: expandedSection === section.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >expand_more</span>
                  </div>
                </button>

                {/* Section Content (Accordions) */}
                {expandedSection === section.id && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-3">
                    <div className="h-px bg-gradient-to-l from-transparent via-white/10 to-transparent mb-4"></div>
                    {section.content.map((item, itemIdx) => {
                      const key = `${section.id}-${itemIdx}`;
                      const isOpen = expandedContent[key];
                      return (
                        <div
                          key={itemIdx}
                          className="rounded-2xl border border-white/5 bg-[#0e0e0e] overflow-hidden transition-all duration-300 hover:border-white/10"
                        >
                          <button
                            onClick={() => toggleContent(key)}
                            className="w-full flex items-center gap-3 p-4 text-right"
                          >
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${section.color}10` }}>
                              <span className="text-sm font-black" style={{ color: section.color }}>{itemIdx + 1}</span>
                            </div>
                            <span className="flex-1 text-sm font-semibold text-white">{item.heading}</span>
                            <span
                              className="material-symbols-outlined text-lg transition-transform duration-300"
                              style={{ color: section.color, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            >expand_more</span>
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4">
                              <div className="h-px bg-white/5 mb-3"></div>
                              <p className="text-[#adaaaa] text-sm leading-[1.9] pr-11">{item.text}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Custom Data Table for Muscle Fiber Section */}
                    {section.id === 'muscle' && (
                      <div className="mt-4">
                        <h4 className="text-sm font-bold text-[#00fcca] mb-3 flex items-center gap-2">
                          <span className="material-symbols-outlined text-base">table_chart</span>
                          المقارنة الفسيولوجية لأنواع الألياف العضلية
                        </h4>
                        <div className="overflow-x-auto rounded-2xl border border-white/5">
                          <table className="w-full text-sm text-right">
                            <thead>
                              <tr className="bg-[#00fcca]/10">
                                <th className="p-3 border-b border-l border-white/5 text-[#00fcca] font-bold" dir="ltr">Type</th>
                                <th className="p-3 border-b border-l border-white/5 text-[#00fcca] font-bold">الاسم الدارج</th>
                                <th className="p-3 border-b border-l border-white/5 text-[#00fcca] font-bold">نظام الطاقة المسيطر</th>
                                <th className="p-3 border-b border-l border-white/5 text-[#00fcca] font-bold">إنتاج القوة</th>
                                <th className="p-3 border-b border-white/5 text-[#00fcca] font-bold">قابلية الإرهاق</th>
                              </tr>
                            </thead>
                            <tbody>
                              {fiberTypes.map((row, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                  <td className="p-3 border-b border-l border-white/5 text-white font-mono font-bold" dir="ltr">{row.type}</td>
                                  <td className="p-3 border-b border-l border-white/5 text-[#adaaaa]">{row.name}</td>
                                  <td className="p-3 border-b border-l border-white/5 text-[#adaaaa]">{row.energy}</td>
                                  <td className="p-3 border-b border-l border-white/5 text-white font-bold">{row.force}</td>
                                  <td className="p-3 border-b border-white/5 text-[#adaaaa]">{row.fatigue}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </FadeContent>
          ))}
        </div>

        {/* Highlight Callout */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="max-w-5xl mx-auto px-4 mt-12">
            <div className="bg-gradient-to-br from-[#e08dff]/20 to-[#0e0e0e] rounded-3xl p-10 relative overflow-hidden border border-[#e08dff]/30 flex flex-col md:flex-row items-center gap-6 shadow-[0_10px_40px_rgba(224,141,255,0.1)]">
              <div className="w-20 h-20 rounded-full bg-[#e08dff]/20 flex items-center justify-center shrink-0 border border-[#e08dff]/50">
                <span className="material-symbols-outlined text-4xl text-[#e08dff]">bolt</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">استمرارية أنظمة الطاقة (Energy Continuum)</h3>
                <p className="text-[#adaaaa] text-sm leading-relaxed border-r-2 border-[#e08dff] pr-4 mt-2">
                  "أنظمة إنتاج الطاقة (الفوسفاجين، الجليكوليسيس، الهوائي) لا تعمل مثل مفاتيح الكهرباء (On/Off)، بل تعمل جميعها في وقت واحد منذ اللحظة الأولى للجهد البدني، ولكن يتغير النظام المسيطر أو المهيمن بناءً على طول مدة التمارين وكثافتها القصوى."
                </p>
              </div>
            </div>
          </div>
        </FadeContent>

      </div>
    </div>
  );
}
