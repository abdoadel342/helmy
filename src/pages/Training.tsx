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
        heading: 'مفهوم التدريب الرياضي (Sports Training)',
        text: 'تُعرّف خطة التدريب الرياضي بأنها العملية التربوية والفسيولوجية المستمرة والممنهجة التي تهدف إلى إحداث سلسلة من التكيفات البيولوجية والعصبية والسيكولوجية. الهدف ليس مجرد "التعرق"، بل توجيه الجسم للتكيف مع ضغوط محددة للوصول بالرياضي إلى أعلى المستويات الممكنة في تخصصه البدني والمهاري بحلول يوم المنافسة (Peak Performance).'
      },
      {
        heading: 'توصيات النشاط البدني للصحة العامة (ACSM)',
        text: 'تشير توصيات الكلية الأمريكية للطب الرياضي ومنظمة الصحة العالمية إلى أن البالغين الأصحاء يحتاجون لنشاط هوائي معتدل الشدة لـ 150-300 دقيقة أسبوعياً (أو 75-150 دقيقة عالي الشدة). الأهم: دمج تمارين المقاومة لجميع المجموعات العضلية الكبرى ليومين على الأقل أسبوعياً. هذه التوصيات هي "الحد الأدنى" للوقاية من الأمراض المزمنة، وليس الحد الأقصى للأداء الرياضي.'
      },
      {
        heading: 'مثلث الأداء الذهبي',
        text: 'يتكون الأداء الرياضي من 3 أضلاع متساوية الأهمية: 1) التدريب (الهدم والتحفيز)، 2) التغذية (مواد البناء والطاقة)، 3) الاستشفاء (الوقت الذي يحدث فيه البناء الفعلي). الخلل في أي ضلع يؤدي لانهيار المنظومة بأكملها. التدريب هو "الشرارة"، لكن التغذية والنوم هما "الوقود".'
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
        heading: 'متلازمة التكيف العام (General Adaptation Syndrome - GAS)',
        text: 'نموذج هانز سيلي (Hans Selye) هو حجر الأساس للتدريب الحديث. يمر الجسم بـ 3 مراحل استجابة لأي ضغط (تدريب): 1) مرحلة الصدمة/الإنذار (تعب، تلف عضلي دقيق، انخفاض مؤقت في الأداء). 2) مرحلة المقاومة (التعافي والتكيف ليصبح الجسم أقوى من ذي قبل). 3) مرحلة الإرهاق (إذا كان الإجهاد كبيراً جداً دون راحة، يحدث انهيار وفشل وإفراط في التدريب).'
      },
      {
        heading: 'ديناميكية التعويض الزائد (Supercompensation)',
        text: 'السر وراء تطور الرياضيين! بعد التدريب (الهدم)، يعيد الجسم بناء الأنسجة ليتجاوز مستوى اللياقة الأساسي تحسباً لضغوط مستقبلية مشابهة (Supercompensation). التدريب في قمة هذه النافذة يؤدي لتقدم مستمر. التدريب قبل الأوان يؤدي للتراجع (Overtraining). تأخير التدريب يعيد الجسم لمستوى الصفر (Detraining).'
      },
      {
        heading: 'تكيف الجهاز العصبي المركزي (CNS)',
        text: 'زيادة القوة في الأسابيع الأولى (4-8 أسابيع) من التدريب لا تعود لزيادة حجم العضلات! بل تعود لـ "التعلم العصبي". الدماغ يتعلم كيف يُرسل إشارات أقوى وأسرع للعضلات (Rate Coding)، ويُجند عدداً أكبر من الألياف العضلية (Motor Unit Recruitment)، ويُقلل من الإشارات المثبطة لحماية الأوتار.'
      },
      {
        heading: 'تأثير التداخل (Interference Effect / Concurrent Training)',
        text: 'ماذا يحدث عند دمج الكارديو القاسي مع رفع الأثقال؟ التدريب الهوائي يُحفز مسار (AMPK) المرتبط بالتحمل، بينما تدريب القوة يُحفز مسار (mTOR) المرتبط بالبناء العضلي. المساران يتصادمان! الكارديو المفرط قد يرسل إشارات تُثبط البناء العضلي. الحل: افصل بينهما بـ 6-8 ساعات على الأقل، أو اجعل الكارديو في أيام منفصلة.'
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
        heading: 'مبدأ زيادة الحمل التدريجي (Progressive Overload)',
        text: 'القاعدة رقم 1: لكي تنمو العضلة أو يتحسن القلب، يجب إجبارهم على القيام بعمل أكبر مما اعتادوا عليه. الزيادة التدريجية لا تعني فقط زيادة الوزن المحمول! بل يمكن زيادة: التكرارات، المجموعات، مدى الحركة، جودة الانقباض، أو تقليل فترات الراحة. بدون زيادة تدريجية، سيتوقف التطور (Plateau).'
      },
      {
        heading: 'مبدأ الخصوصية (SAID Principle)',
        text: 'Specific Adaptation to Imposed Demands. الجسم يتكيف بدقة متناهية مع نوع الضغط المفروض عليه. التدريب بتكرارات عالية يبني التحمل وليس القوة القصوى. الجري البطيء لمسافات طويلة لن يجعلك عداءً سريعاً لمسافة 100م. تريد القفز أعلى؟ يجب أن تتدرب على القفز. تريد قوة مطلقة؟ ارفع أوزاناً ثقيلة.'
      },
      {
        heading: 'مبدأ الفروق الفردية (Individuality)',
        text: 'لا يوجد برنامج تدريبي يناسب الجميع. الأفراد يستجيبون لنفس البرنامج التدريبي بشكل مختلف تماماً بسبب: الوراثة (نوع الألياف العضلية)، العمر، الجنس، التغذية، ضغوط الحياة، والتاريخ الإصابي. ما يجعلك بطلاً قد يتسبب في إصابة صديقك.'
      },
      {
        heading: 'مبدأ العكسية والتناقص (Reversibility & Diminishing Returns)',
        text: 'العكسية: "استخدمه أو افقده". التوقف عن التدريب لـ 2-3 أسابيع يؤدي لتراجع حاد في اللياقة الهوائية، يليه تراجع في الحجم والقوة العضلية. التناقص: المبتدئ يكتسب قوة وحجماً بسرعة هائلة، لكن كلما اقتربت من حدودك الجينية القصوى، يصبح مقدار التطور أقل بكثير ويتطلب جهداً ووقتاً أضعافاً مضاعفة.'
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
        heading: 'متغيرات التصميم الكلاسيكية (Volume, Intensity, Frequency)',
        text: 'الحجم (Volume): إجمالي العمل المنجز (مجموعات × تكرارات × وزن). الشدة (Intensity): الصعوبة بالنسبة لأقصى قدرة (كـ % من 1RM). التردد (Frequency): عدد مرات تدريب العضلة/المهارة أسبوعياً. القاعدة: توجد علاقة عكسية حتمية بين الحجم والشدة! لا يمكنك التدريب بكثافة قصوى وحجم ضخم لفترة طويلة دون إصابة.'
      },
      {
        heading: 'نطاقات التكرارات (Rep Ranges) - التحديث العلمي',
        text: 'الاعتقاد القديم (1-5 قوة، 8-12 حجم، 15+ تحمل) غير دقيق تماماً. العلم الحديث يثبت أن التضخم العضلي (Hypertrophy) يحدث بأي نطاق تكرارات (من 5 إلى 30 تكراراً) طالما تم الوصول إلى الفشل العضلي أو الاقتراب منه! ومع ذلك، نطاق 8-12 تكرار هو "الأكثر كفاءة" لأنه يوازن بين إجهاد المفاصل (الأوزان الثقيلة) والإجهاد القلبي/اللاكتاتي (التكرارات العالية).'
      },
      {
        heading: 'التقسيم المرحلي (Periodization)',
        text: 'لا يمكن للرياضي التدريب بأقصى شدة طوال العام. التقسيم المرحلي هو تلاعب منهجي بمتغيرات التدريب. 1) الماكرو-سايكل (Macrocycle): خطة سنوية (مثلاً موسم أولمبي). 2) الميزو-سايكل (Mesocycle): مرحلة تمتد لأسابيع (مثلاً مرحلة التضخم العضلي ثم مرحلة القوة). 3) المايكرو-سايكل (Microcycle): الخطة الأسبوعية. يمنع هذا التخطيط الركود والاحتراق.'
      },
      {
        heading: 'الجرعة الفعالة الدنيا (Minimum Effective Dose - MED)',
        text: 'أقل مقدار من التدريب مطلوب لتحقيق نتيجة. للمحافظة على القوة والعضلات المكتسبة، يمكنك تقليل حجم التدريب بنسبة 60-70% والتدريب مرة واحدة فقط أسبوعياً، بشرط الحفاظ على نفس "الشدة" (الأوزان الثقيلة)! هذا مفيد جداً في فترات الانشغال أو السفر.'
      },
      {
        heading: 'التدريب القائم على السرعة (Velocity Based Training - VBT)',
        text: 'أحدث ثورات التدريب! بدلاً من استخدام نسب مئوية من 1RM (التي تتغير يومياً حسب الإرهاق والنوم)، يتم استخدام أجهزة استشعار لقياس سرعة رفع البار. إذا انخفضت سرعة الرفع عن حد معين (Velocity Loss)، يتوقف الرياضي عن المجموعة، لأن التكرارات البطيئة بعد هذه النقطة تزيد الإرهاق العصبي ولا تزيد القوة الانفجارية.'
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
        heading: 'معدل المجهود المحسوس وتكرارات في الاحتياط (RPE & RIR)',
        text: 'RPE هو مقياس من 1 إلى 10 لمدى صعوبة التمرين. RIR (Reps in Reserve) هو أداة أدق: كم تكرار إضافي كنت تستطيع القيام به قبل الفشل التام؟ أفضل نتائج التضخم والقوة تتحقق بالتدريب في نطاق 1-3 RIR. الوصول الدائم للفشل العضلي (0 RIR) يطيل فترة الاستشفاء بشكل كبير دون فوائد بناء عضلية إضافية تُذكر.'
      },
      {
        heading: 'تقلب معدل ضربات القلب (Heart Rate Variability - HRV)',
        text: 'مؤشر فسيولوجي دقيق يقيس التباين الزمني بالملي ثانية بين النبضات. قلبك لا ينبض كالساعة! التباين العالي (High HRV) يعني أن جهازك العصبي مرن ومتوازن (مستعد لتدريب قاسي). التباين المنخفض (Low HRV) يعني هيمنة الجهاز العصبي السمبثاوي (إجهاد، قلة نوم، مرض)، مما يفرض عليك إجراء جلسة استشفاء بدلاً من التدريب القاسي.'
      },
      {
        heading: 'أسبوع التخفيف (Deload Week)',
        text: 'تخفيض مخطط للحجم التدريبي والشدة لمدة أسبوع كل 4 إلى 8 أسابيع. الغرض ليس إراحة العضلات فقط، بل الأهم هو إراحة الجهاز العصبي المركزي (CNS) والأوتار والمفاصل التي تتعافى ببطء شديد. غالباً ما يعود الرياضي بعد أسبوع الديلود أقوى وبأوزان جديدة بفضل التخلص من الإرهاق المتراكم (Dissipating Fatigue).'
      },
      {
        heading: 'تقنيات الاستشفاء: ما ينجح وما لا ينجح',
        text: 'الوسائل المثبتة علمياً: النوم (7-9 ساعات هو الملك المطلق للاستشفاء)، التغذية الكافية (كربوهيدرات وبروتين)، والترطيب. الوسائل المساعدة (أدلة متوسطة): الاستشفاء النشط (مشي خفيف، دراجة)، المساج، العلاج بالتبريد (مفيد لتقليل الألم لكنه قد يُثبط البناء العضلي إذا استُخدم فوراً بعد التدريب). الوسائل الضعيفة: معظم المكملات باهظة الثمن لا تعوض سوء النوم والتغذية.'
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
        text: 'التخصص المبكر جداً في رياضة واحدة هو خطأ فادح يؤدي للإصابات المزمنة والاحتراق النفسي (Burnout). يُفضل "التنويع المبكر" لتطوير مهارات حركية أساسية شاملة (الجري، القفز، الرمي، التوازن). هل رفع الأثقال يوقف نمو الأطفال؟ خرافة تامة! التدريب بوزن الجسم والأوزان الخفيفة تحت إشراف يزيد كثافة العظام ويقوي الأوتار ويحميهم من إصابات الملاعب.'
      },
      {
        heading: 'كبار السن (Senior Athletes)',
        text: 'الخطر الأكبر للتقدم في العمر هو الساركوبينيا (Sarcopenia - فقدان الكتلة العضلية) والديناموبينيا (فقدان القوة السريعة)، مما يؤدي لهشاشة العظام والسقوط. كبار السن يجب أن يعطوا الأولوية لتدريبات المقاومة (الأوزان) على الكارديو! تدريب القوة يبطئ بشكل دراماتيكي عملية الشيخوخة الخلوية ويحافظ على استقلالية الحركة. لا يفوت الأوان أبداً للبدء برفع الأثقال.'
      },
      {
        heading: 'الرياضيات الإناث وثالوث الرياضية (Female Athlete Triad)',
        text: 'النساء قادرات على تحمل حجم تدريبي أعلى والتعافي أسرع من الرجال بفضل هرمون الاستروجين. لكن تشريحياً، الحوض الأوسع يزيد من "زاوية Q"، مما يجعل النساء عرضة للإصابة بتمزق الرباط الصليبي (ACL) بمعدل 2-8 أضعاف الرجال! الخطر الصحي الأكبر هو (RED-S): نقص الطاقة النسبي في الرياضة. عدم تناول سعرات كافية لتعويض المجهود يؤدي لاضطراب الدورة الشهرية وانخفاض كثافة العظام مبكراً.'
      },
      {
        heading: 'التدريب أثناء الحمل',
        text: 'ما لم تكن هناك موانع طبية، التدريب المعتدل آمن ومفيد جداً. يقلل من سكري الحمل، آلام الظهر، ويسهل الولادة والتعافي بعدها. يجب تجنب: رفع أوزان تسبب حبس النفس (Valsalva Maneuver)، التمارين التي تتطلب الاستلقاء على الظهر بعد الثلث الأول (تضغط على الوريد الأجوف)، الرياضات التلامسية، والتدريب في بيئات شديدة الحرارة لتجنب ارتفاع حرارة الجنين.'
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
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedContent, setExpandedContent] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setExpandedSection(prev => prev === id ? null : id);
  };

  const toggleContent = (key: string) => {
    setExpandedContent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white selection:bg-[#00fcca]/30" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Ambient Glow Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff928a]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00fcca]/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Top App Bar */}
      <header className="glass border-b border-white/5 p-4 sticky top-0 z-50">
        <div className="flex items-center max-w-5xl mx-auto">
          <div className="w-10 flex justify-start"><BackButton /></div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center flex justify-center" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="bg-gradient-to-l from-[#ff928a] to-[#e08dff] bg-clip-text text-transparent animate-gradient-shift">التدريب الرياضي</span>
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
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/50 to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[#00fcca]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative p-8 z-10">
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#ff928a] to-[#e08dff] text-white text-xs font-bold rounded-full mb-4 shadow-lg">
                  <ShinyText text="دليل المحترفين والمدربين" disabled={false} speed={3} className="text-white" />
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-3 max-w-xl animate-text-glow" style={{ fontFamily: 'var(--font-heading)' }}>
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
                <div key={i} className="web-card !bg-[#131313] p-4 text-center group stagger-item">
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
