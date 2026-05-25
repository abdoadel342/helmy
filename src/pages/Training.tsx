import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { ShinyText } from '../components/react-bits/ShinyText';
import { BackButton } from '../components/BackButton';

const sections = [
  {
    id: 'intro',
    icon: 'menu_book',
    title: 'الإطار المنهجي والفلسفي',
    subtitle: 'التعريف والأسس للتدريب الرياضي',
    color: '#e08dff',
    content: [
      {
        heading: 'مفهوم التدريب الرياضي',
        text: 'تُعرّف خطة التدريب الرياضي بأنها العملية البدنية والتربوية المستمرة والممنهجة التي تهدف بشكل أساسي إلى إحداث سلسلة من التكيفات الفسيولوجية والعصبية والسيكولوجية المحددة، وذلك من أجل الوصول بالرياضي إلى أعلى المستويات الممكنة في تخصصه البدني والمهاري.'
      },
      {
        heading: 'توصيات النشاط البدني للصحة العامة',
        text: 'تشير توصيات الكلية الأمريكية للطب الرياضي (ACSM) إلى أن البالغين الأصحاء يحتاجون لنشاط بدني هوائي معتدل لمدة لا تقل عن 30 دقيقة، 5 أيام أسبوعياً (أو عالي الشدة لـ 20 دقيقة، 3 أيام)، مع دمج تمارين المقاومة التي تحافظ على القوة العضلية ليومين على الأقل أسبوعياً.'
      }
    ]
  },
  {
    id: 'biology',
    icon: 'psychology',
    title: 'الأسس البيولوجية والتكيف',
    subtitle: 'نظرية التكيف وميكانيكية الاستجابة للإجهاد',
    color: '#00fcca',
    content: [
      {
        heading: 'نظرية متلازمة التكيف العام (GAS)',
        text: 'يفترض نموذج هانز سيلي (Hans Selye) أن الاستجابة للإجهاد تمر بثلاث مراحل: 1. مرحلة الإنذار (تعب أولي وتلف دقيق)، 2. مرحلة المقاومة (الاستشفاء والتعويض الزائد)، 3. مرحلة الإرهاق (الفشل والانهيار إذا استمر الإجهاد دون راحة).'
      },
      {
        heading: 'ديناميكية التعويض الزائد (Supercompensation)',
        text: 'في مرحلة الاستشفاء، يعيد الجسم بناء الأنسجة ليتجاوز مستوى اللياقة الأساسي (Supercompensation). التوقيت الاستراتيجي للتدريب القادم ضمن نافذة "التعويض الزائد" هو مفتاح التقدم؛ أما تأخيره فيعيد الجسم لخط الأساس.'
      }
    ]
  },
  {
    id: 'principles',
    icon: 'rule',
    title: 'المبادئ الجوهرية للتدريب',
    subtitle: 'القواعد الذهبية لتصميم البرامج',
    color: '#ff928a',
    content: [
      {
        heading: '1. مبدأ زيادة الحمل (Overload)',
        text: 'لحدوث أي تكيف فسيولوجي، يجب أن يبذل الجسم جهداً يتجاوز المستويات المعتادة. في المقاومة، يعني استخدام أحمال أثقل، أو حجم تدريبي أكبر لتوليد توتر عتبوي كافٍ لإحداث التكيف.'
      },
      {
        heading: '2. مبدأ التدرج (Progression)',
        text: 'يرتبط التدرج بزيادة الحمل، ويعني إجراء تغييرات استراتيجية وتدريجية (عبر متغيرات FITT: التردد، الشدة، الوقت، النوع) للسماح بتطور مستمر دون التعرض للإصابات.'
      },
      {
        heading: '3. مبدأ الخصوصية (SAID Principle)',
        text: 'التكيفات المحددة للضغوط المفروضة. الجسم يتكيف بدقة مع نوع النشاط الممارس (طريقة الانقباض العضلي، نوع الألياف المستهدفة، وزوايا الحركة).'
      },
      {
        heading: '4. مبدأ الاستشفاء والعكسية',
        text: 'بدون راحة يفشل نظام التكيف. ومن جهة أخرى، ينطبق مبدأ "استخدمه أو افقده" (Reversibility)، حيث تتدهور اللياقة عند التوقف التام عن التدريب.'
      }
    ]
  },
  {
    id: 'programming',
    icon: 'settings_suggest',
    title: 'هندسة الحمل التدريبي',
    subtitle: 'الشدة، الحجم، والتخطيط المرحلي',
    color: '#e08dff',
    content: [
      {
        heading: 'متغيرات التصميم الكلاسيكية',
        text: 'الحجم (إجمالي العمل)، الشدة (درجة صعوبة الوزن أو السرعة)، التردد (عدد الجلسات)، وكثافة التدريب (أوقات الراحة مقابل العمل).'
      },
      {
        heading: 'الجرعة التدريبية الفعالة الدنيا (METD)',
        text: 'لاكتساب القوة، قد يحتاج الرياضي إلى 3-6 مجموعات فقط لـ 1-5 تكرارات بوزن >80% من 1RM أسبوعياً. بينما يتطلب التضخم العضلي أحجاماً تدريبية أعلى.'
      },
      {
        heading: 'التقسيم المرحلي (Periodization)',
        text: 'تقسيم الخطة السنوية (Macrocycle) إلى دورات متوسطة (Mesocycles) لعدة أسابيع، ودورات صغرى (Microcycles) أسبوعية، لضمان التقدم وتجنب الإفراط في التدريب.'
      }
    ]
  },
  {
    id: 'monitoring',
    icon: 'monitor_heart',
    title: 'مراقبة الأحمال والاستشفاء',
    subtitle: 'تقنيات التتبع المتقدمة',
    color: '#00fcca',
    content: [
      {
        heading: 'معدل المجهود المحسوس (RPE / RIR)',
        text: 'مقياس شخصي لتقييم صعوبة التمرين (من 1 إلى 10). نظام RIR (تكرارات في الاحتياط) يستخدم لتحديد متى يجب التوقف لتجنب الفشل العضلي الكارثي، حيث يفضل البقاء في نطاق 1-3 RIR لتحفيز مثالي.'
      },
      {
        heading: 'تقلب معدل ضربات القلب (HRV)',
        text: 'مؤشر فسيولوجي دقيق يقيس التباين الزمني بين النبضات. الـ HRV المرتفع يدل على استشفاء جيد واستعداد عصبي، بينما الانخفاض المفاجئ ينذر بالإجهاد العالي وحاجتك للراحة النشطة.'
      },
      {
        heading: 'تقنيات الاستشفاء النشط (Active Recovery)',
        text: 'استخدام أجهزة الضغط الهوائي، العلاج بالتبريد (Cryotherapy)، وجلسات الكارديو منخفض الشدة LISS للمساعدة في إزالة الفضلات الأيضية وتوصيل المغذيات للأنسجة التالفة.'
      }
    ]
  },
  {
    id: 'demographics',
    icon: 'groups',
    title: 'الاعتبارات الديموغرافية والبيولوجية',
    subtitle: 'تكييف الخطة للفئات المختلفة',
    color: '#ff928a',
    content: [
      {
        heading: 'الناشئون والشباب (Youth Athletes)',
        text: 'التخصص المبكر في رياضة واحدة غير ضروري ويزيد من الاحتراق النفسي. يُفضل "التنويع المبكر" لبناء قاعدة حركية واسعة، والتصنيف البيولوجي لتقسيمهم حسب النضج بدلاً من العمر الزمني.'
      },
      {
        heading: 'كبار السن (Senior Athletes)',
        text: 'لمواجهة "الساركوبينيا" (فقدان الكتلة العضلية المرتبط بالعمر)، تُركز البرامج على تمارين القوة لحماية العظام والمفاصل، والتدريب الحسي الحركي لتعزيز التوازن ومنع السقوط.'
      },
      {
        heading: 'الرياضيات الإناث وثالوث الرياضية',
        text: 'الرياضيات أكثر عرضة لتمزق الرباط الصليبي الأمامي (ACL) بمعدل 2-8 أضعاف بسبب التركيب التشريحي (زاوية Q). يُشدد على تدريبات الإحماء العصبي العضلي. ويجب الحذر من نقص الطاقة المتاح الذي يؤدي لاضطراب الدورة وضعف كثافة العظام (RED-S).'
      }
    ]
  }
];

const intensityData = [
  { level: '1', percent: '30% - 50%', type: 'واطئة (خفيفة جداً)', effect: 'الراحة الإيجابية وتسريع الاستشفاء' },
  { level: '2', percent: '50% - 70%', type: 'معتدلة', effect: 'بناء التحمل العضلي والتهيؤ التشريحي' },
  { level: '3', percent: '70% - 80%', type: 'متوسطة', effect: 'نطاق التضخم العضلي (Hypertrophy)' },
  { level: '4', percent: '80% - 90%', type: 'تحت القصوية', effect: 'تطوير القوة القصوى والقدرة الانفجارية' },
  { level: '5', percent: '90% - 100%', type: 'قصوية', effect: 'استنفاد عصبي عضلي، تطوير القوة المطلقة' },
  { level: '6', percent: '100%+', type: 'فوق القصوية', effect: 'الانقباض اللامركزي (Eccentric)، صدمة النظام العصبي' }
];

export default function Training() {
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
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] font-display text-white selection:bg-[#00fcca]/30">
      {/* Ambient Glow Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff928a]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00fcca]/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Top App Bar */}
      <header className="bg-[#0e0e0e]/70 backdrop-blur-xl border-b border-white/5 p-4 sticky top-0 z-50">
        <div className="flex items-center max-w-5xl mx-auto">
          <BackButton />
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 mr-4">
            <span className="bg-gradient-to-l from-[#ff928a] to-[#e08dff] bg-clip-text text-transparent">التدريب الرياضي</span>
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
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/50 to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[#00fcca]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative p-8 z-10">
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#ff928a] to-[#e08dff] text-white text-xs font-bold rounded-full mb-4 shadow-lg">
                  <ShinyText text="دليل المحترفين والمدربين" disabled={false} speed={3} className="text-white" />
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-3 max-w-xl">
                  استراتيجيات التدريب الرياضي الحديث
                </h1>
                <p className="text-[#adaaaa] text-sm md:text-base max-w-lg leading-relaxed">
                  الأسس الفسيولوجية، البرمجة المرحلية المتقدمة، وإدارة الأحمال لبناء أداء رياضي استثنائي.
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
                { icon: 'speed', label: 'كفاءة الاستشفاء', value: '+40%', color: '#00fcca' },
                { icon: 'fitness_center', label: 'مبادئ التدريب', value: '4', color: '#ff928a' },
                { icon: 'trending_up', label: 'التعويض الزائد', value: '100%', color: '#e08dff' },
                { icon: 'model_training', label: 'مراحل تدريبية', value: '3', color: '#00fcca' }
              ].map((stat, i) => (
                <div key={i} className="bg-[#131313] border border-white/5 rounded-2xl p-4 text-center hover:border-white/10 transition-colors group">
                  <span className="material-symbols-outlined text-2xl mb-2 block transition-transform group-hover:scale-110" style={{ color: stat.color, fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
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

                    {/* Custom Data Table for Programming Section */}
                    {section.id === 'programming' && (
                      <div className="mt-4">
                        <h4 className="text-sm font-bold text-[#e08dff] mb-3 flex items-center gap-2">
                          <span className="material-symbols-outlined text-base">table_chart</span>
                          مستويات الشدة التدريبية والتأثير الفسيولوجي
                        </h4>
                        <div className="overflow-x-auto rounded-2xl border border-white/5">
                          <table className="w-full text-sm text-right">
                            <thead>
                              <tr className="bg-[#e08dff]/10">
                                <th className="p-3 border-b border-l border-white/5 text-[#e08dff] font-bold">الشدة</th>
                                <th className="p-3 border-b border-l border-white/5 text-[#e08dff] font-bold" dir="ltr">%1RM</th>
                                <th className="p-3 border-b border-l border-white/5 text-[#e08dff] font-bold">التصنيف</th>
                                <th className="p-3 border-b border-white/5 text-[#e08dff] font-bold">التأثير الأساسي</th>
                              </tr>
                            </thead>
                            <tbody>
                              {intensityData.map((row, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                  <td className="p-3 border-b border-l border-white/5 text-[#adaaaa] font-bold text-center">{row.level}</td>
                                  <td className="p-3 border-b border-l border-white/5 text-[#adaaaa] font-mono text-center" dir="ltr">{row.percent}</td>
                                  <td className="p-3 border-b border-l border-white/5 text-white">{row.type}</td>
                                  <td className="p-3 border-b border-white/5 text-[#adaaaa]">{row.effect}</td>
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
            <div className="bg-gradient-to-br from-[#00fcca]/20 to-[#0e0e0e] rounded-3xl p-10 relative overflow-hidden border border-[#00fcca]/30 flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#00fcca]/20 flex items-center justify-center shrink-0 border border-[#00fcca]/50 shadow-[0_0_30px_rgba(0,252,202,0.3)]">
                <span className="material-symbols-outlined text-4xl text-[#00fcca]">psychology_alt</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">التداخل التدريبي (Interference Effect)</h3>
                <p className="text-[#adaaaa] text-sm leading-relaxed">
                  احذر من الجمع العشوائي بين القوة والكارديو عالي الشدة! الرؤية الكلاسيكية لعلم الفسيولوجيا تؤكد أن الجمع غير المدروس قد يحد من المكاسب العضلية نتيجة تصادم المسارات الجينية (mTOR للبناء مقابل AMPK للتحمل). افصل بين التدريبين بـ 6 ساعات على الأقل، أو اجعل الكارديو منخفض الشدة.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>

      </div>
    </div>
  );
}
