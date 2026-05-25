import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { ShinyText } from '../components/react-bits/ShinyText';
import { BackButton } from '../components/BackButton';

const sections = [
  {
    id: 'intro',
    icon: 'psychology',
    title: 'مقدمة في علم النفس الرياضي',
    subtitle: 'الفارق بين الجيد والعظيم',
    color: '#e08dff',
    content: [
      {
        heading: 'العقل فوق العضلة',
        text: 'في المستويات التنافسية العليا، حيث تتقارب القدرات البدنية والمهارية بين الرياضيين بشكل كبير، يُصبح العقل هو العامل الحاسم. علم النفس الرياضي لا يقتصر على علاج المشاكل النفسية، بل هو أداة "تحسين الأداء" (Performance Enhancement) الأقوى، والتي تهدف لفتح الإمكانيات الكامنة غير المستغلة للرياضي.'
      },
      {
        heading: 'الصلابة الذهنية (Mental Toughness)',
        text: 'ليست مجرد قدرة على تحمل الألم، بل تُعرّف رياضياً بأنها: قدرة الرياضي على إنتاج مستوى عالٍ من الأداء بشكل مستمر ومتسق، بغض النظر عن الظروف التنافسية المحيطة، وتتكون من 4 عناصر (4Cs): التحكم (Control)، الالتزام (Commitment)، التحدي (Challenge)، والثقة (Confidence).'
      }
    ]
  },
  {
    id: 'flow',
    icon: 'waves',
    title: 'حالة التدفق (Flow State)',
    subtitle: 'المنطقة الذهبية للأداء المثالي',
    color: '#00fcca',
    content: [
      {
        heading: 'ما هي الـ "Zone"؟',
        text: 'حالة الوعي الأمثل حيث يشعر الرياضي ويؤدي في أفضل حالاته. صاغها العالم ميكالي تشيكسنتميهايي. في هذه الحالة، يتلاشى الإحساس بالزمن، يختفي الشك الذاتي (Ego)، ويصبح الفعل والوعي مدمجين تماماً.'
      },
      {
        heading: 'كيفية الوصول لحالة التدفق',
        text: 'تحدث حالة التدفق فقط عندما يكون هناك توازن دقيق بين "صعوبة التحدي" و"مستوى المهارة". إذا كان التحدي سهلاً يحدث الملل، وإذا كان صعباً جداً يحدث القلق. يتطلب التدفق أيضاً: أهدافاً واضحة لحظية، تركيزاً كاملاً في الحاضر، وتغذية راجعة فورية.'
      },
      {
        heading: 'كيمياء التدفق',
        text: 'عصبياً، في حالة التدفق يقوم الدماغ بتقليل نشاط القشرة الجبهية (Transient Hypofrontality) مما يوقف الناقد الداخلي، ويغمر الدماغ بكوكتيل من الناقلات العصبية: الدوبامين، الإندورفين، السيروتونين، والأنانداميد (جزيء النعيم).'
      }
    ]
  },
  {
    id: 'anxiety',
    icon: 'warning',
    title: 'إدارة قلق المنافسة (Anxiety)',
    subtitle: 'تحويل الخوف إلى طاقة دافعة',
    color: '#ff928a',
    content: [
      {
        heading: 'نموذج U المقلوب (Inverted-U Theory)',
        text: 'ينص على أن الأداء يتحسن مع زيادة الاستثارة الفسيولوجية (Arousal) ولكن إلى نقطة مثالية فقط. إذا زادت الاستثارة عن هذا الحد وتحولت لقلق مفرط، ينهار الأداء. الرياضات الدقيقة (كالرماية) تحتاج استثارة منخفضة، بينما رياضات القوة (كرفع الأثقال) تحتاج استثارة عالية.'
      },
      {
        heading: 'إعادة التقييم المعرفي (Cognitive Reappraisal)',
        text: 'دماغك لا يستطيع التفريق الفسيولوجي بين "الخوف" و"الحماس" (كلاهما يرفع النبض ويسبب التعرق). تقنية إعادة التقييم تعتمد على تحويل تفسيرك الذاتي للأعراض من "أنا خائف وأعصابي منهارة" إلى "جسمي يضخ الأدرينالين لأنه مستعد للمعركة".'
      },
      {
        heading: 'تقنية التنفس المربع (Box Breathing)',
        text: 'تقنية سريعة لقرصنة الجهاز العصبي اللاإرادي وخفض معدل ضربات القلب: خذ شهيقاً لـ 4 ثوانٍ، اكتم النفس لـ 4 ثوانٍ، زفير لـ 4 ثوانٍ، اكتم لـ 4 ثوانٍ. تكرارها يوقف استجابة "القتال أو الهروب" (Fight or Flight).'
      }
    ]
  },
  {
    id: 'visualization',
    icon: 'visibility',
    title: 'التصور الذهني والبروفة الحركية',
    subtitle: 'اختراق المسارات العصبية للنجاح',
    color: '#e08dff',
    content: [
      {
        heading: 'التخيل الحركي (Motor Imagery)',
        text: 'أثبتت دراسات التخطيط الدماغي العضلي أن تخيل الحركة ينشط نفس المسارات العصبية التي تنشط عند أدائها فعلياً (بدون تفعيل العضلات). الرياضيون النخبة يقضون ساعات في رسم خرائط ذهنية لأدائهم.'
      },
      {
        heading: 'نموذج PETTLEP للتصور الفعال',
        text: 'لكي يكون التخيل فعالاً يجب أن يتضمن 7 عناصر: Physical (الحالة البدنية)، Environment (البيئة المحيطة)، Task (طبيعة المهمة)، Timing (الزمن الفعلي للأداء)، Learning (مستوى التعلم)، Emotion (المشاعر المرافقة)، و Perspective (المنظور الداخلي من عينيك وليس منظور كاميرا خارجية).'
      }
    ]
  },
  {
    id: 'focus',
    icon: 'center_focus_strong',
    title: 'تكتيكات الانتباه والتركيز',
    subtitle: 'السيطرة على المحفزات المشتتة',
    color: '#00fcca',
    content: [
      {
        heading: 'أبعاد التركيز الأربعة',
        text: 'صنف Nideffer التركيز إلى 4 أبعاد حسب العرض والاتجاه: 1. واسع-خارجي (مسح الملعب)، 2. واسع-داخلي (تحليل الخطة)، 3. ضيق-داخلي (التركيز على التنفس/نبض القلب)، 4. ضيق-خارجي (التركيز على الكرة فقط). الفشل يحدث عند استخدام البعد الخاطئ في الوقت الخاطئ.'
      },
      {
        heading: 'الكلمات المفتاحية (Cue Words)',
        text: 'استخدام كلمات قصيرة وحادة لإعادة توجيه التركيز فوراً عند تشتته. بدلاً من التفكير في ميكانيكية الحركة المعقدة، يستخدم الرياضي كلمة مثل "انفجر" أو "سلس" لاختزال الحركة برمتها في أمر عصبي واحد.'
      },
      {
        heading: 'روتين ما قبل الأداء (Pre-Performance Routine)',
        text: 'سلسلة متسقة من الأفعال والأفكار التي يقوم بها الرياضي قبل تنفيذ المهارة (مثل رمية حرة في كرة السلة). الروتين يحمي العقل من التفكير الزائد (Overthinking) ويعمل كـ "زر تشغيل" للذاكرة العضلية.'
      }
    ]
  },
  {
    id: 'biofeedback',
    icon: 'monitor_heart',
    title: 'الارتجاع البيولوجي (Biofeedback)',
    subtitle: 'تكنولوجيا الدمج بين العقل والجسم',
    color: '#ff928a',
    content: [
      {
        heading: 'ما هو الارتجاع البيولوجي؟',
        text: 'استخدام أجهزة تكنولوجية لقياس الوظائف الفسيولوجية (النبض، توتر العضلات، موجات الدماغ) وعرضها للرياضي في الوقت الفعلي. الهدف هو تعلم التحكم الإرادي في هذه الوظائف اللاإرادية لتحسين الأداء.'
      },
      {
        heading: 'تدريب موجات الدماغ (Neurofeedback)',
        text: 'تدريب الرياضيين على زيادة موجات "ألفا" (Alpha waves) المرتبطة بالاسترخاء والتركيز الهادئ، وتقليل موجات "بيتا" السريعة المرتبطة بالقلق والتفكير التحليلي المفرط الذي يعرقل الأداء التلقائي.'
      }
    ]
  }
];

const smartGoals = [
  { letter: 'S', name: 'Specific', desc: 'محددة بدقة (تجنب "أريد أن أصبح أقوى")' },
  { letter: 'M', name: 'Measurable', desc: 'قابلة للقياس الكمي (وزن، زمن، مسافة)' },
  { letter: 'A', name: 'Action-oriented', desc: 'تركز على الأفعال والعمليات بدلاً من النتائج' },
  { letter: 'R', name: 'Realistic', desc: 'واقعية وتمثل تحدياً في نفس الوقت' },
  { letter: 'T', name: 'Time-bound', desc: 'مرتبطة بجدول زمني وموعد نهائي صارم' }
];

export default function Psychology() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>('intro');
  const [expandedContent, setExpandedContent] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setExpandedSection(prev => prev === id ? null : id);
  };

  const toggleContent = (key: string) => {
    setExpandedContent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] font-display text-white selection:bg-[#e08dff]/30">
      {/* Ambient Glow Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#00fcca]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-[#e08dff]/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Top App Bar */}
      <header className="bg-[#0e0e0e]/70 backdrop-blur-xl border-b border-white/5 p-4 sticky top-0 z-50">
        <div className="flex items-center max-w-5xl mx-auto">
          <BackButton />
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 mr-4">
            <span className="bg-gradient-to-l from-[#00fcca] to-[#e08dff] bg-clip-text text-transparent">سيكولوجية الرياضة</span>
          </h2>
          <button className="text-[#ff928a] flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-[#ff928a]/10 rounded-full transition-colors">
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
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[#00fcca]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative p-8 z-10">
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#00fcca] to-[#e08dff] text-white text-xs font-bold rounded-full mb-4 shadow-lg">
                  <ShinyText text="دليل الهندسة العقلية" disabled={false} speed={3} className="text-white" />
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-3 max-w-xl">
                  تطوير الصلابة الذهنية والأداء
                </h1>
                <p className="text-[#adaaaa] text-sm md:text-base max-w-lg leading-relaxed">
                  حالة التدفق، التصور الذهني، والارتجاع البيولوجي: الدليل العلمي لتحويل الضغط لبطولة.
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
                { icon: 'self_improvement', label: 'الصلابة الذهنية', value: '4Cs', color: '#e08dff' },
                { icon: 'waves', label: 'حالة التدفق', value: 'Zone', color: '#00fcca' },
                { icon: 'visibility', label: 'التصور الذهني', value: 'PETTLEP', color: '#ff928a' },
                { icon: 'graphic_eq', label: 'الارتجاع البيولوجي', value: 'Neuro', color: '#e08dff' }
              ].map((stat, i) => (
                <div key={i} className="bg-[#131313] border border-white/5 rounded-2xl p-4 text-center hover:border-white/10 transition-colors group">
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
              <div className="rounded-3xl overflow-hidden border border-white/5 bg-[#131313] transition-all duration-300 hover:border-white/10">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center gap-4 p-5 md:p-6 text-right transition-colors hover:bg-white/[0.02]"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300" style={{ backgroundColor: `${section.color}15` }}>
                    <span className="material-symbols-outlined text-2xl" style={{ color: section.color, fontVariationSettings: "'FILL' 1" }}>{section.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-white">{section.title}</h3>
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
                  </div>
                )}
              </div>
            </FadeContent>
          ))}
        </div>

        {/* SMART Goals Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="max-w-5xl mx-auto px-4 mt-8">
            <div className="bg-[#131313] border border-[#e08dff]/20 rounded-3xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#e08dff]/10 rounded-full blur-3xl"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-[#e08dff] text-3xl">flag</span>
                <h3 className="text-xl font-bold text-white">تحديد الأهداف الذكية (SMART Goals)</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {smartGoals.map((goal, i) => (
                  <div key={i} className="bg-[#0e0e0e] rounded-2xl p-4 border border-white/5 hover:border-[#e08dff]/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl font-black text-[#e08dff] opacity-50">{goal.letter}</span>
                      <span className="text-xs font-bold text-white bg-white/5 px-2 py-1 rounded-md" dir="ltr">{goal.name}</span>
                    </div>
                    <p className="text-sm text-[#adaaaa] leading-relaxed">{goal.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Highlight Callout */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="max-w-5xl mx-auto px-4 mt-8">
            <div className="bg-gradient-to-br from-[#ff928a]/20 to-[#0e0e0e] rounded-3xl p-10 relative overflow-hidden border border-[#ff928a]/30 flex flex-col md:flex-row items-center gap-6 shadow-[0_10px_40px_rgba(255,146,138,0.1)]">
              <div className="w-20 h-20 rounded-full bg-[#ff928a]/20 flex items-center justify-center shrink-0 border border-[#ff928a]/50">
                <span className="material-symbols-outlined text-4xl text-[#ff928a]">auto_awesome</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">إعادة التقييم المعرفي (Cognitive Reappraisal)</h3>
                <p className="text-[#adaaaa] text-sm leading-relaxed italic border-r-2 border-[#ff928a] pr-4 mt-2">
                  "التوتر والحماس متطابقان فسيولوجياً؛ كلاهما يرفع الأدرينالين ونبض القلب. الفرق الوحيد هو القصة التي يرويها عقلك. في المرة القادمة التي تشعر فيها بالتوتر قبل المباراة، لا تقل (أنا خائف)، بل قل (جسدي يستعد ويشحن طاقته للأداء!)."
                </p>
              </div>
            </div>
          </div>
        </FadeContent>

      </div>
    </div>
  );
}
