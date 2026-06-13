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
        heading: 'العقل فوق العضلة (Mind Over Muscle)',
        text: 'في المستويات التنافسية العليا (الأولمبياد وبطولات العالم)، تتقارب القدرات البدنية والمهارية بين الرياضيين إلى حد التطابق. الجميع سريع، قوي، وموهوب. هنا، يُصبح "العقل" هو العامل الحاسم بنسبة 100%. علم النفس الرياضي التطبيقي لا يقتصر على علاج المشاكل النفسية، بل هو أداة "تحسين الأداء" (Performance Enhancement) الأقوى، والتي تهدف لفتح الإمكانيات الكامنة للرياضي وتحقيق التفوق التنافسي.'
      },
      {
        heading: 'الصلابة الذهنية (Mental Toughness)',
        text: 'الصلابة الذهنية ليست مجرد "القدرة على تحمل الألم"، بل تُعرّف رياضياً بأنها: قدرة الرياضي على إنتاج مستوى عالٍ من الأداء بشكل مستمر ومتسق، بغض النظر عن الظروف التنافسية المحيطة أو الضغوط أو الأخطاء السابقة. الأبطال الحقيقيون يمتلكون قدرة استثنائية على التركيز على "ما يمكن التحكم فيه" متجاهلين العوامل الخارجية.'
      },
      {
        heading: 'نموذج العناصر الأربعة (The 4Cs Model)',
        text: 'الصلابة الذهنية تتكون من 4 أعمدة رئيسية: 1) التحكم (Control): الإيمان بقدرتك على تشكيل مصيرك والتحكم في عواطفك. 2) الالتزام (Commitment): الانخراط العميق في الهدف رغم الملل أو التعب. 3) التحدي (Challenge): رؤية التهديدات كفرص للتطور وليس كمصادر للقلق. 4) الثقة (Confidence): إيمان لا يتزعزع بالقدرات الذاتية وبخطة اللعب.'
      },
      {
        heading: 'الحديث الذاتي (Self-Talk)',
        text: 'العقل البشري يجري حواراً داخلياً لا ينقطع (بمعدل 400 إلى 800 كلمة في الدقيقة). الرياضيون النخبة يُدربون هذا الحوار. الحديث الذاتي السلبي ("لا تضيع هذه الرمية") يبرمج الدماغ على الفشل لأنه يُركز على الخطأ. الحديث الذاتي الفعال يجب أن يكون توجيهياً وبناءً ("انظر للسلة، اتبع الحركة بسلاسة").'
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
        text: 'حالة الوعي الأمثل حيث يشعر الرياضي ويؤدي في أفضل حالاته. صاغها العالم "ميهالي تشيكسنتميهاي" (Mihaly Csikszentmihalyi). في هذه الحالة، يتلاشى الإحساس بالزمن (يصبح أسرع أو أبطأ)، يختفي الشك الذاتي ووعي الأنا (Ego)، ويصبح الفعل والوعي مدمجين تماماً، وكأن الجسم يتحرك من تلقاء نفسه بدون تدخل واعي.'
      },
      {
        heading: 'معادلة الدخول للتدفق (The Flow Equation)',
        text: 'تحدث حالة التدفق فقط عندما يكون هناك توازن دقيق ومثالي بين "صعوبة التحدي" و"مستوى المهارة". إذا كان التحدي سهلاً جداً بالنسبة لمهارتك، سيحدث الملل. وإذا كان التحدي صعباً جداً، سيحدث القلق والتوتر. التدفق يقع في المنتصف تماماً (The Flow Channel)، ويتطلب أهدافاً واضحة، وتركيزاً مطلقاً، وتغذية راجعة فورية.'
      },
      {
        heading: 'كيمياء التدفق (Neurochemistry of Flow)',
        text: 'من الناحية العصبية، الدماغ في حالة التدفق يقوم بإيقاف نشاط القشرة الجبهية المسؤولة عن التحليل والتفكير النقدي (Transient Hypofrontality)، مما يوقف "الناقد الداخلي". في نفس الوقت، يُغمر الدماغ بكوكتيل من 5 ناقلات عصبية: الدوبامين، النورإبينفرين، الإندورفين، الأنانداميد، والسيروتونين. هذا الكوكتيل يسرّع معالجة المعلومات ويرفع سقف الأداء.'
      },
      {
        heading: 'الذاكرة العضلية وحالة اللّا-تفكير',
        text: 'في البطولات الكبرى، التفكير هو عدو الأداء. عندما يُفكر الرياضي الواعي في آليات تنفيذ المهارة (والتي أتقنها لسنوات)، فإنه يعرقل المسارات العصبية الأوتوماتيكية السريعة الموجودة في العقد القاعدية والمخيخ. التدفق يتطلب الوثوق بالتدريب وترك "الطيار الآلي" (العقل الباطن) يقود.'
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
        text: 'ينص النموذج على أن الأداء يتحسن مع زيادة الاستثارة الفسيولوجية (Arousal) ولكن إلى "نقطة مثالية" فقط. إذا زادت الاستثارة عن هذا الحد وتحولت لقلق مفرط، ينهار الأداء. النقطة المثالية تختلف حسب الرياضة: رياضات القوة (رفع الأثقال) تتطلب استثارة عالية جداً، بينما رياضات الدقة (الرماية والجولف) تتطلب استثارة منخفضة جداً.'
      },
      {
        heading: 'إعادة التقييم المعرفي (Cognitive Reappraisal)',
        text: 'علمياً، دماغك لا يستطيع التفريق الفسيولوجي بين "الخوف" و"الحماس" (كلاهما يرفع النبض، يوسع الحدقة، ويسبب التعرق). الأبطال يستخدمون تقنية "إعادة التقييم": بدلاً من تفسير هذه الأعراض كعلامات على الرعب ("أنا منهار")، يفسرونها على أنها علامات جاهزية ("جسمي يضخ الأدرينالين لأنه مستعد للمعركة").'
      },
      {
        heading: 'قلق الحالة مقابل قلق السمة',
        text: 'يُفرق علماء النفس بين "قلق السمة" (Trait Anxiety)، وهو جزء من شخصية الفرد وميله العام للقلق، و"قلق الحالة" (State Anxiety)، وهو القلق اللحظي المرتبط بموقف معين (مثل ضربة جزاء في الدقيقة 90). العمل الرياضي يركز على إدارة قلق الحالة عبر تقنيات التدخل الفوري.'
      },
      {
        heading: 'تقنية التنفس المربع التكتيكي (Box Breathing)',
        text: 'تقنية مستخدمة لدى القوات الخاصة (Navy SEALs) لقرصنة الجهاز العصبي اللاإرادي وخفض معدل ضربات القلب فوراً: شهيق لـ 4 ثوانٍ، كتم النفس لـ 4 ثوانٍ، زفير لـ 4 ثوانٍ، كتم لـ 4 ثوانٍ. تكرار هذه الدورة لعدة دقائق ينشط العصب المبهم (Vagus Nerve) ويوقف استجابة "القتال أو الهروب".'
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
        text: 'هل يمكن بناء العضلات بالتفكير؟ نعم! أثبتت دراسات الرنين المغناطيسي الوظيفي (fMRI) وتخطيط الدماغ أن "التخيل الدقيق" للحركة يُنشط نفس المسارات العصبية والمناطق الدماغية التي تنشط عند الأداء الفعلي. الرياضيون النخبة يقضون ساعات في رسم خرائط ذهنية لأدائهم، مما يعزز المايلين (Myelin) حول الأعصاب ويسرع الاستجابة الحركية.'
      },
      {
        heading: 'نموذج PETTLEP للتصور الفعال',
        text: 'لكي يكون التخيل فعالاً ويُترجم لنتائج، يجب أن يشمل 7 عناصر: Physical (ارتداء ملابس اللعب)، Environment (تخيل الملعب الحقيقي)، Task (نفس المهمة)، Timing (نفس سرعة اللعب الواقعية)، Learning (التكيف مع التطور)، Emotion (استحضار الحماس والضغط)، و Perspective (الرؤية من منظور داخلي من عينيك، وليس كأنك تشاهد نفسك على التلفاز).'
      },
      {
        heading: 'التصور لحل الأزمات (Coping Imagery)',
        text: 'لا تتخيل فقط الأداء المثالي الخالي من العيوب! الرياضيون الأذكياء يستخدمون "تصور التأقلم": يتخيلون أنفسهم يرتكبون خطأ فادحاً، أو يتأخرون في النتيجة، أو يواجهون جمهوراً معادياً... ثم يتخيلون أنفسهم يهدؤون، يطبقون روتينهم، ويتعافون بنجاح. هذا يبني مناعة نفسية ضد الصدمات والمفاجآت أثناء البطولات.'
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
        heading: 'أبعاد التركيز الأربعة (Nideffer’s Model)',
        text: 'صنف Nideffer التركيز إلى 4 أبعاد (عرض x اتجاه): 1) واسع-خارجي (مسح الملعب وحركة اللاعبين). 2) واسع-داخلي (تحليل خطة اللعب). 3) ضيق-داخلي (التركيز على التنفس أو توتر العضلات). 4) ضيق-خارجي (التركيز على مسار الكرة فقط). الأخطاء الفادحة تحدث عندما يعلق الرياضي في البعد الخاطئ في الوقت الخاطئ.'
      },
      {
        heading: 'الكلمات المفتاحية (Cue Words)',
        text: 'في المواقف سريعة الإيقاع، لا يوجد وقت لتعليمات معقدة. الرياضيون يستخدمون كلمات أو عبارات مفتاحية قصيرة وحادة لإعادة توجيه التركيز فوراً عند تشتته. بدلاً من تذكر 10 خطوات للضربة بالمضرب، يستخدم الرياضي كلمة مثل "سلس" أو "انفجر" لاختزال الحركة برمتها في أمر عصبي واحد يحفز الذاكرة العضلية.'
      },
      {
        heading: 'روتين ما قبل الأداء (Pre-Performance Routine)',
        text: 'لماذا ينطط رافاييل نادال الكرة بطريقة معينة ويسحب قميصه قبل كل إرسال؟ الروتين هو سلسلة متسقة وثابتة من الأفعال والأفكار التي تسبق المهارة ذاتية الإيقاع (إرسال، رمية حرة، ضربة جزاء). الروتين يحمي العقل من التفكير الزائد (Overthinking) والضغوط الخارجية، ويعمل كـ "زر تشغيل" آمن للطيار الآلي.'
      },
      {
        heading: 'التركيز على الحاضر وعمى الانتباه',
        text: 'الرياضي الذي يركز على الخطأ الذي ارتكبه في الماضي، أو النتيجة التي سيحصل عليها في المستقبل، يفقد صلته بالزمن الوحيد الذي يمكنه فيه إحداث تغيير: "الحاضر". تدريبات اليقظة الذهنية (Mindfulness) تُعلم الرياضيين الاعتراف بالأفكار المشتتة وتركها تمر دون الحكم عليها، ثم إعادة التركيز فوراً على المهمة الحالية (الكرة القادمة).'
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
        text: 'العقل والجسد ليسا كيانين منفصلين. الارتجاع البيولوجي هو استخدام أجهزة استشعار تكنولوجية لقياس الوظائف الفسيولوجية (النبض، توتر العضلات EMG، حرارة الجلد، موصلية الجلد) وعرضها للرياضي على الشاشة في الوقت الفعلي. الهدف هو تدريب الرياضي على التحكم الإرادي الواعي في هذه الاستجابات اللاإرادية لتحقيق الهدوء أو الاستثارة حسب الحاجة.'
      },
      {
        heading: 'التدريب على موجات الدماغ (Neurofeedback - EEG)',
        text: 'الشكل الأكثر تقدماً. يُوضع جهاز رسام الدماغ الكهربائي (EEG) لتدريب الرياضيين على التحكم في موجاتهم الدماغية. الهدف عادة هو تعلم كيفية زيادة موجات "ألفا" (Alpha 8-12 Hz) المرتبطة بالاسترخاء والتركيز الهادئ والإبداع، وفي نفس الوقت تقليل موجات "بيتا" السريعة (Beta) المرتبطة بالقلق والتوتر والتفكير التحليلي المفرط.'
      },
      {
        heading: 'تطبيقات تماسك القلب والدماغ (Heart-Brain Coherence)',
        text: 'باستخدام أجهزة قياس تقلب معدل ضربات القلب (HRV Biofeedback)، يتدرب الرياضيون على نمط تنفس محدد (عادة 6 أنفاس في الدقيقة) يحاذي إيقاع ضربات القلب مع التنفس وضغط الدم. هذه الحالة من "التماسك الفسيولوجي" تفتح خط تواصل مثالي بين القلب والدماغ العاطفي، مما يلغي تماماً استجابة التوتر والقلق المفرط قبل المباريات.'
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
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedContent, setExpandedContent] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setExpandedSection(prev => prev === id ? null : id);
  };

  const toggleContent = (key: string) => {
    setExpandedContent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white selection:bg-[#e08dff]/30" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Ambient Glow Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#00fcca]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-[#e08dff]/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Top App Bar */}
      <header className="glass border-b border-white/5 p-4 sticky top-0 z-50">
        <div className="flex items-center max-w-5xl mx-auto">
          <div className="w-10 flex justify-start"><BackButton /></div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center flex justify-center" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="bg-gradient-to-l from-[#e08dff] to-[#ff928a] bg-clip-text text-transparent animate-gradient-shift">علم النفس الرياضي</span>
          </h2>
          <div className="w-10"></div>
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
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-3 max-w-xl animate-text-glow" style={{ fontFamily: 'var(--font-heading)' }}>
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
