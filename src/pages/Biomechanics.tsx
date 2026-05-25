import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import { BackButton } from '../components/BackButton';
import { useLanguage } from '../LanguageContext';

const sections = [
  {
    id: 'intro',
    icon: 'science',
    title: 'مقدمة في الميكانيكا الحيوية',
    subtitle: 'الأسس العلمية لفهم حركة الجسم',
    color: '#e08dff',
    content: [
      {
        heading: 'ما هي الميكانيكا الحيوية؟',
        text: 'تُمثل الميكانيكا الحيوية (Biomechanics) أحد أعقد الحقول المعرفية المتداخلة، حيث تُعنى بتطبيق القوانين الصارمة للميكانيكا والفيزياء الكلاسيكية على الأنظمة البيولوجية الحية لفهم كيفية تفاعل هذه الأنظمة مع القوى الداخلية والخارجية. على النطاق الشامل، يمتد هذا العلم ليدرس ظواهر متباينة التعقيد، بدءاً من الآليات الدقيقة لانقباض الخلايا العضلية على المستوى المجهري، مروراً بتحليل المشية وتحركات الكائنات الحية، وصولاً إلى فك شفرات الحركات المعقدة التي ينفذها الرياضيون النخبة.'
      },
      {
        heading: 'الفرعان الأساسيان',
        text: 'ينقسم هذا الهيكل العلمي إلى فرعين متكاملين: علم الكينماتيكا (Kinematics) الذي يختص بوصف الحركة رياضياً من خلال دراسة الإزاحة والسرعة والعجلة دون الأخذ في الاعتبار القوى المسببة؛ وعلم الكينتيكا (Kinetics) الذي يتعمق في الجذور السببية للحركة عبر دراسة القوى المباشرة مثل قوة الجاذبية وقوى الاحتكاك وقوى رد فعل الأرض (Ground Reaction Forces).'
      },
      {
        heading: 'الذكاء الاصطناعي والنمذجة الحاسوبية',
        text: 'يشهد هذا المجال تداخلاً ثورياً مع علوم هندسة الإلكترونيات الحيوية (Bionics) والتكنولوجيا التطبيقية، مما مهد الطريق لتطوير تقنيات تحليلية غير مسبوقة. وتُوج هذا التطور بدمج تقنيات النمذجة الحاسوبية (Computational Modeling) والذكاء الاصطناعي (AI) لتحليل الأنماط الحركية المعقدة، والتنبؤ بمخاطر الإصابة، وتصميم برامج تدريبية وتأهيلية تتكيف ديناميكياً مع الخصائص الفسيولوجية والميكانيكية لكل رياضي على حدة.'
      }
    ]
  },
  {
    id: 'joints',
    icon: 'skeleton',
    title: 'التشريح الميكانيكي للمفاصل',
    subtitle: 'التوازن بين الاستقرار والمرونة',
    color: '#00fcca',
    content: [
      {
        heading: 'المفاصل المستقرة (Stable Joints)',
        text: 'الفئة الأولى هي المفاصل المستقرة التي توفر حركة معدومة أو ضئيلة جداً، حيث تتحد الأسطح المفصلية بقوة هائلة عبر أنسجة ضامة ليفية (Fibrous Connective Tissue). وتتجلى هذه الفئة في مفاصل الجمجمة التي صُممت لتحمل الصدمات وحماية الدماغ، وكذلك المفصل بين عظمة الظنبوب (Tibia) والشظية (Fibula).'
      },
      {
        heading: 'المفاصل ذات الحركة المحدودة',
        text: 'ترتبط بواسطة الغضاريف (Cartilage-United Joints)، وتسمح بحركات مقيدة. المثال الأبرز هو مفاصل العمود الفقري؛ فرغم أن الحركة بين كل فقرتين متجاورتين محدودة للغاية للحفاظ على استقرار الحبل الشوكي، إلا أن المجموع التراكمي لهذه الحركات الدقيقة يمنح الجذع مرونة فائقة للانحناء والالتواء.'
      },
      {
        heading: 'المفاصل حرة الحركة (Freely Moveable)',
        text: 'الفئة الأهم في سياق الأداء الرياضي. لا تتحد الأسطح العظمية هنا بشكل مباشر، بل تُغلف داخل كبسولة مفصلية تحتوي على سائل زلالي مُشحم يقلل من الاحتكاك الميكانيكي إلى أدنى مستوياته. تشمل هذه الفئة معظم مفاصل الهيكل الطرفي مثل الكتف والمرفق والورك والركبة.'
      }
    ]
  },
  {
    id: 'torque',
    icon: 'rotate_right',
    title: 'عزم الدوران وذراع العزم',
    subtitle: 'الأسس الفيزيائية للحركة البارامترية',
    color: '#ff928a',
    content: [
      {
        heading: 'مفهوم عزم الدوران (Torque)',
        text: 'تتميز الحركة البشرية بأنها نادراً ما تحدث في خطوط مستقيمة بحتة، بل هي في جوهرها حركات دورانية زاوية للأطراف حول محاور مفصلية ثابتة. يُعرّف عزم الدوران بأنه حاصل ضرب القوة المطبقة في طول "ذراع الرافعة" (Lever Arm)، والذي يُشار إليه بمصطلح "ذراع العزم" (Moment Arm).'
      },
      {
        heading: 'ذراع العزم الداخلي والخارجي',
        text: 'ترتبط معظم العضلات الهيكلية بالعظام من خلال أوتار تنغرس بالقرب من المفاصل. ينتج عن هذا ضآلة "ذراع العزم الداخلي" مقارنة بـ "ذراع العزم الخارجي" للمقاومة. هذا التفاوت يفرض حقيقة فسيولوجية: يجب على العضلات أن تولد قوى انقباضية تفوق بأضعاف وزن المقاومة الخارجية.'
      },
      {
        heading: 'منحنى القوة (Strength Curve)',
        text: 'مع تغير زاوية المفصل أثناء الأداء الحركي، يتغير الموضع المكاني لوتر العضلة بالنسبة لمحور الدوران، مما يؤدي إلى تغير مستمر في طول ذراع العزم والميزة الميكانيكية. يحدد منحنى القوة قدرة العضلة اللحظية على إنتاج عزم دوران في كل نقطة من المدى الحركي. إن فهم هذه المنحنيات يُمكّن المدربين من تحديد الزوايا التي تكون فيها العضلة تحت أقصى إجهاد.'
      }
    ]
  },
  {
    id: 'levers',
    icon: 'construction',
    title: 'أنظمة الروافع البشرية',
    subtitle: 'تطبيقات الميزة الميكانيكية',
    color: '#e08dff',
    content: [
      {
        heading: 'روافع النوع الأول (First-Class Levers)',
        text: 'تقع نقطة الارتكاز بين القوة والحمل. تظهر بوضوح في مفصل الرقبة، حيث تقع نقطة ارتكاز الجمجمة على الفقرة العنقية الأولى (الأطلس)، بينما تسحب عضلات العنق الخلفية الرأس لموازنة وزن الوجه.'
      },
      {
        heading: 'روافع النوع الثاني (Second-Class Levers)',
        text: 'يقع الحمل بين نقطة الارتكاز والقوة. الميزة الميكانيكية دائماً أكبر من 1 (MA > 1). مثال: حركة الوقوف على أمشاط القدم حيث تمثل أمشاط القدم نقطة الارتكاز ووزن الجسم الحمل المتركز في منتصف القدم وعضلات الساق الخلفية توفر قوة السحب الصاعدة عبر وتر أخيل.'
      },
      {
        heading: 'روافع النوع الثالث (Third-Class Levers)',
        text: 'التكوين الهندسي المهيمن على التشريح البشري. قوة العضلة بين نقطة الارتكاز والحمل. الميزة الميكانيكية دائماً أقل من واحد (MA < 1). يُعد الساعد البشري النموذج الأكثر تجسيداً: في حركة ثني المرفق يعمل مفصل المرفق كنقطة ارتكاز وينغرس وتر البايسبس على بُعد بوصتين فقط من المفصل بينما الحمل في اليد على مسافة طويلة.'
      },
      {
        heading: 'حساب القوى المفصلية',
        text: 'في رفع ثقل 4 كجم بساعد يزن 2.5 كجم: تبلغ قوة شد البايسبس المطلوبة 470 نيوتن، أي 7.38 أضعاف الوزن الإجمالي! ويقابل ذلك قوة ضغط رد فعل عند المرفق تقدر بـ 407 نيوتن. هذا يوضح أن القوى الداخلية تصل لذروتها كلما كان الحمل أبعد عن المفصل.'
      },
      {
        heading: 'لماذا اختارت الطبيعة الميزة المنخفضة؟',
        text: 'رغم تدني الميزة الميكانيكية، فإن هذا التكوين التشريحي يوفر فوائد تطورية لا غنى عنها: "السرعة" و"المرونة الحركية العالية". ارتباط العضلات بالقرب من المفاصل يسمح لمقدار ضئيل من قصر الألياف العضلية بأن يترجم فوراً إلى حركة واسعة وسريعة في نهاية الطرف.'
      }
    ]
  },
  {
    id: 'tools',
    icon: 'precision_manufacturing',
    title: 'أدوات التقييم الميكانيكي الحيوي',
    subtitle: 'التكنولوجيا المتقدمة لتحليل الأداء',
    color: '#00fcca',
    content: [
      {
        heading: 'أنظمة التقاط الحركة (Motion Capture)',
        text: 'تسجيل الإحداثيات المكانية وحركة المفاصل في الفضاء ثلاثي الأبعاد. الأنظمة البصرية القائمة على العلامات تعد المعيار الذهبي بدقة أقل من مليمتر واحد. تبرز الآن أنظمة "التقاط الحركة بدون علامات" القائمة على كاميرات صناعية مقترنة بخوارزميات الديناميكيات العكسية.'
      },
      {
        heading: 'منصات قياس القوى (Force Plates)',
        text: 'قياس قوى رد فعل الأرض والعزوم الديناميكية. تعتمد على "الخلايا الانضغاطية" شديدة الدقة، ويمكنها تحديد أكثر من 60 متغيراً حركياً مختلفاً للقفز ورصد حلقات القفز أوتوماتيكياً.'
      },
      {
        heading: 'التخطيط الكهربائي للعضلات (EMG)',
        text: 'استشعار النشاط الكهربائي والإشارات العصبية الواصلة للعضلات. تبرز أهميتها في تحديد توقيت انقباض كل عضلة داخل السلسلة الحركية ومقدار الجهد النسبي وكشف آليات التعب العضلي.'
      },
      {
        heading: 'وحدات القياس بالقصور الذاتي (IMUs)',
        text: 'قياسات متقدمة للتوجه المكاني والسرعة والتسارع عبر أجهزة قابلة للارتداء. تُقدم بديلاً جوهرياً للتحليل خارج المختبر لتوفير بيانات لحظية للمدربين أثناء التدريب الفعلي في الملعب.'
      }
    ]
  },
  {
    id: 'sports',
    icon: 'sports_score',
    title: 'تطبيقات في الرياضات التنافسية',
    subtitle: 'دراسات حالة متقدمة',
    color: '#ff928a',
    content: [
      {
        heading: 'ألعاب القوى والوثب الطويل',
        text: 'تعتمد ميكانيكا الوثب الطويل على التحويل المعقد للسرعة الأفقية إلى سرعة انطلاق مثالية. الرياضيون النخبة يعتمدون استراتيجية "الخطوة قبل الأخيرة الطويلة والخطوة الأخيرة القصيرة" لخفض ارتفاع مركز الثقل بشكل محكوم وتهيئة زاوية ارتقاء أكثر فاعلية.'
      },
      {
        heading: 'الانطلاق السريع في العدو (Sprint Start)',
        text: 'التسارع الأولي من مكعبات البدء أهم مشتقات أداء السرعة. الدورة الحركية تتجزأ إلى مرحلة "كبح" سلبية تليها مرحلة "دفع" إيجابية تدفع الجسم للأعلى وللأمام. زمن رد الفعل المثالي حوالي 0.28-0.29 ثانية وسرعة مركز الكتلة عند 3 أمتار تصل 4.52 م/ث.'
      },
      {
        heading: 'رفع الأثقال الأولمبية',
        text: 'المسار المثالي للقضيب الحديدي ليس خطاً مستقيماً بل منحنياً يأخذ شكل حرف S للحفاظ على التوازن بأقل إهدار للطاقة. مسافة سقوط القضيب في الرفعات الفاشلة كانت أطول بشكل ذي دلالة إحصائية — فارق بالسنتيمترات يمثل الحد الفاصل بين الفشل والنجاح.'
      },
      {
        heading: 'ميكانيكا الموائع والسباحة',
        text: 'تتأثر المقاومة النشطة بـ "المساحة السطحية الأمامية" لجسم السباح. السباحة الحرة تحقق كفاءة ميكانيكية أعلى بكثير من سباحة الظهر وتتعرض لسحب نشط أقل بنسبة 25% عند سرعة 1.2 م/ث.'
      },
      {
        heading: 'كرة القدم وتحليل الركلة',
        text: 'تعتمد قوة الركلة على سلسلة حركية تبدأ من الورك مروراً بالركبة وصولاً للقدم. زاوية الاقتراب المثالية 30-45 درجة والسرعة الزاوية للركبة عند التلامس تصل 2000 درجة/ثانية. تحليل EMG يكشف أن عضلة الرباعية تُنشط قبل 50 مللي ثانية من التلامس بالكرة.'
      },
      {
        heading: 'التنس وميكانيكا الإرسال',
        text: 'الإرسال يتضمن سلسلة حركية من 8 مفاصل رئيسية تنتج سرعات كرة تتجاوز 230 كم/ساعة. الدوران الداخلي للكتف يساهم بـ 54% من سرعة الإرسال بينما يساهم انبساط المعصم بـ 31%. تحليل زاوية المرفق يكشف عن مخاطر "مرفق التنس" عند تجاوز 175 درجة من التمدد.'
      }
    ]
  },
  {
    id: 'rehab',
    icon: 'healing',
    title: 'الدور الوقائي والتأهيلي',
    subtitle: 'الوقاية من الإصابات وإعادة التأهيل',
    color: '#e08dff',
    content: [
      {
        heading: 'إعادة تأهيل الرباط الصليبي الأمامي (ACL)',
        text: 'إصابات الركبة غالباً ما تحدث بشكل غير تلامسي نتيجة تباطؤ مفاجئ أو تغيير اتجاه حاد. يُعتمد على القياسات الميكانيكية الحيوية لتقييم سعة القفز وبيانات الأداء وردود الفعل. بروتوكول العودة للعب يتضمن 4 مراحل: الجلسات المبدئية (انقباضات آيزومترية)، المرحلة المتوسطة (تقوية متدرجة)، المرحلة المتقدمة (تدريبات بليومترية)، وأخيراً العودة التدريجية للملعب.'
      },
      {
        heading: 'إصابات الكتف عند الرياضيين',
        text: 'تحليل ميكانيكا الرمي يكشف أن الكتف يتعرض لعزم دوران خارجي يصل 67 نيوتن·متر وقوة قص أمامية تصل 400 نيوتن أثناء مرحلة التسلح. برامج الوقاية تركز على تقوية عضلات الكفة المدورة وتحسين نسبة القوة بين الدوران الداخلي والخارجي (المثالية 66-75%).'
      },
      {
        heading: 'آلام أسفل الظهر والوضعية الصحيحة',
        text: 'عندما ينحني شخص لرفع صندوق بوزن 30 كجم بوضعية خاطئة، تُنتج عزم دوران كبير يجبر عضلات الجذع على بذل قوى شد هائلة قد تؤدي لتمزق الأنسجة. الوقوف باعتدال يُلغي عزم الدوران ويسمح للعضلات بالاسترخاء بأقل طاقة ممكنة.'
      },
      {
        heading: 'تقنيات الوقاية الحديثة',
        text: 'تشمل التحليل ثلاثي الأبعاد للجري لكشف اختلالات التماثل، وأجهزة القياس القابلة للارتداء (IMU) لمراقبة الحمل التراكمي، وبرامج التدريب العصبي العضلي (Neuromuscular Training) التي أثبتت خفض إصابات ACL بنسبة 50-70% في كرة القدم النسائية.'
      }
    ]
  },
  {
    id: 'equipment',
    icon: 'sports_tennis',
    title: 'هندسة المعدات الرياضية',
    subtitle: 'التقليد الطبيعي والتصميم الحيوي',
    color: '#00fcca',
    content: [
      {
        heading: 'تصميم الأحذية الرياضية',
        text: 'التقييمات الميكانيكية الحيوية نقطة الانطلاق لإنتاج نعال داخلية مدعومة حيوياً بمقاومة صلابة محسوبة. بعض النماذج التجريبية استلهمت بنيتها من "قدم النعام" نظراً لقدرتها الاستثنائية على كبح الصدمات. تقنية ألواح الكربون في أحذية الجري الحديثة تزيد كفاءة الطاقة بنسبة 4%.'
      },
      {
        heading: 'مضارب التنس وأدوات الضرب',
        text: 'توزيع الكتلة ونقطة الارتطام المثالية (Sweet Spot) تحدد انتقال الطاقة للكرة. الألياف الكربونية والغرافين في المضارب الحديثة خفضت الوزن 30% مع زيادة الصلابة 15%، مما يقلل اهتزازات المرفق ويحسن التحكم.'
      },
      {
        heading: 'الأطراف الصناعية الرياضية',
        text: 'النوابض الكربونية المستوحاة من وتر أخيل تحقق استرداد طاقة يصل 90%. تصميم "الشفرة الجارية" (Running Blade) يحاكي ميكانيكا خطوة الفهد. التحدي الأكبر: محاكاة الكاحل البشري الذي يوفر 3 درجات حرية و40% من طاقة الدفع.'
      }
    ]
  },
  {
    id: 'analysis',
    icon: 'analytics',
    title: 'منهجية التحليل الحركي',
    subtitle: 'الإطار الأكاديمي والتطبيقي',
    color: '#ff928a',
    content: [
      {
        heading: 'تفكيك المهارة المعقدة',
        text: 'يشترط النجاح في التحليل الحركي تفكيك المهارة المعقدة إلى عناصرها الأساسية. يعتمد المحللون منهجية قائمة على تصنيف "الأهداف الميكانيكية الأساسية" لكل تخصص رياضي بدقة متناهية: هل الهدف أقصى مسافة؟ أقصى سرعة؟ أقصى دقة؟ أو توازن بينها؟'
      },
      {
        heading: 'التساؤلات التشريحية والكينتيكية',
        text: 'ينبغي الإجابة كمياً عن: ما هي المفاصل المشاركة؟ هل تتحرك بنطاق واسع أم ضيق؟ ما هي طبيعة انقباض العضلات (متحد المركز، لامركزي، ثابت)؟ وما هي الأسس الميكانيكية لضمان الاقتصاد في الجهد وتجنب الإصابات؟'
      },
      {
        heading: 'المعادلات الأساسية',
        text: 'معادلة الميزة الميكانيكية: MA = Fo/Fi = li/lo. معادلة عزم الدوران: τ = F × d × sin(θ). معادلة التوازن الاستاتيكي: Σ τ = 0 (مجموع عزوم الدوران = صفر). معادلة القدرة: P = τ × ω (القدرة = عزم الدوران × السرعة الزاوية).'
      },
      {
        heading: 'البحث الأكاديمي والمستقبل',
        text: 'الجامعات والمعاهد الأكاديمية المحرك الرئيسي وراء نشر هذه المعارف من خلال معامل تخصصية. التوجهات المستقبلية تشمل: التوائم الرقمية (Digital Twins) للرياضيين، والواقع المعزز لتصحيح الأداء اللحظي، والتعلم الآلي للتنبؤ بالإصابات قبل حدوثها بأسابيع.'
      }
    ]
  }
];

const sprintData = [
  { label: 'زمن رد الفعل (القدم اليمنى)', value: '0.29 ± 0.01 s' },
  { label: 'زمن رد الفعل (القدم اليسرى)', value: '0.28 ± 0.01 s' },
  { label: 'السرعة العمودية — مرحلة الكبح', value: '-0.89 ± 0.04 m/s' },
  { label: 'السرعة العمودية — مرحلة الدفع', value: '0.99 ± 0.16 m/s' },
  { label: 'سرعة مركز الكتلة عند 3م', value: '4.52 ± 0.07 m/s' },
  { label: 'طول الخطوة الأولى', value: '103.60 ± 1.34 cm' },
  { label: 'طول الخطوة الثالثة', value: '132.40 ± 2.51 cm' }
];

export default function Biomechanics() {
  const navigate = useNavigate();
  const { language } = useLanguage();
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
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#e08dff]/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#00fcca]/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Top App Bar */}
      <header className="bg-[#0e0e0e]/70 backdrop-blur-xl border-b border-white/5 p-4 sticky top-0 z-50">
        <div className="flex items-center max-w-5xl mx-auto">
          <BackButton />
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 mr-4">
            <span className="bg-gradient-to-l from-[#e08dff] to-[#00fcca] bg-clip-text text-transparent">الميكانيكا الحيوية وعلم الحركة</span>
          </h2>
          <button className="text-[#e08dff] flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-[#e08dff]/10 rounded-full transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>share</span>
          </button>
        </div>
      </header>

      <div className="flex-1 pb-20 relative z-10">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="max-w-5xl mx-auto px-4 pt-6">
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-3xl min-h-[280px] md:min-h-[360px] relative group shadow-2xl border border-[#e08dff]/20"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA4b5HnyIozkdfc_5d0pX3CIE_8ongjp6LmP9RL7Yk9bUvZUBwPsxsT2y7x_7i1jmJjCFcy7lQ4c8oC39UZg6YS5L64AEAVtS_EjlByfUEECvnwm94Pp-e2yPO1E_lGEkwAw9e52Q2DWZNNUfHBufTde1H824-gomospRrfB3PLCrlbHVRXODyf3jMvCMPSPV0tWTPQyprVt5GSN8fAyut_bp_A66yeImlkceTXm3s_MeKXxegb4dXPL4bsOMF1Fm0fffdliOeElmW1")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[#e08dff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative p-8 z-10">
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#e08dff] to-[#bc00fb] text-white text-xs font-bold rounded-full mb-4 shadow-lg shadow-[#bc00fb]/20">
                  <ShinyText text="BIOMECHANICS GUIDE" disabled={false} speed={3} className="text-white" />
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-3 max-w-xl">
                  الدليل الشامل في الميكانيكا الحيوية الرياضية
                </h1>
                <p className="text-[#adaaaa] text-sm md:text-base max-w-lg leading-relaxed">
                  ديناميكيات الروافع، ذراع العزم، والتحليل التكنولوجي المتقدم للأداء البشري
                </p>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Quick Stats */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="max-w-5xl mx-auto px-4 mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: 'school', label: 'فصل علمي', value: '8', color: '#e08dff' },
                { icon: 'auto_stories', label: 'موضوع فرعي', value: '30+', color: '#00fcca' },
                { icon: 'calculate', label: 'معادلة حيوية', value: '12', color: '#ff928a' },
                { icon: 'sports', label: 'رياضة مُحللة', value: '6', color: '#e08dff' }
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

        {/* Key Equation Banner */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="max-w-5xl mx-auto px-4 mt-8">
            <div className="bg-gradient-to-br from-[#e08dff]/10 to-[#bc00fb]/10 rounded-3xl p-6 border border-[#e08dff]/20 relative overflow-hidden">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#e08dff]/10 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <span className="text-[10px] text-[#e08dff] uppercase tracking-widest font-bold">المعادلة الأساسية</span>
                  <h3 className="text-lg font-bold text-white mt-1">الميزة الميكانيكية للروافع</h3>
                  <p className="text-[#adaaaa] text-sm mt-2 leading-relaxed">تحدد العلاقة بين قوة المخرجات وقوة المدخلات العضلية</p>
                </div>
                <div className="bg-[#0e0e0e] px-8 py-5 rounded-2xl border border-[#e08dff]/30 shadow-inner font-mono text-center min-w-[220px]">
                  <span className="text-[#e08dff] text-2xl font-bold">MA = F<sub>o</sub> / F<sub>i</sub></span>
                  <div className="text-[#adaaaa]/60 text-xs mt-2">=  l<sub>i</sub> / l<sub>o</sub></div>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Main Content Sections */}
        <div className="max-w-5xl mx-auto px-4 mt-10 space-y-4">
          {sections.map((section, sectionIdx) => (
            <FadeContent key={section.id} blur={true} duration={800} initialOpacity={0}>
              <div className="rounded-3xl overflow-hidden border border-white/5 bg-[#131313] transition-all duration-300 hover:border-white/10">
                {/* Section Header (Clickable) */}
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

                {/* Section Content */}
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

                    {/* Sprint Data Table for sports section */}
                    {section.id === 'sports' && (
                      <div className="mt-4">
                        <h4 className="text-sm font-bold text-[#ff928a] mb-3 flex items-center gap-2">
                          <span className="material-symbols-outlined text-base">table_chart</span>
                          بيانات الانطلاق السريع (Sprint Start)
                        </h4>
                        <div className="overflow-x-auto rounded-2xl border border-white/5">
                          <table className="w-full text-sm text-right">
                            <thead>
                              <tr className="bg-[#ff928a]/10">
                                <th className="p-3 border-b border-l border-white/5 text-[#ff928a] font-bold">المتغير الكينماتيكي</th>
                                <th className="p-3 border-b border-white/5 text-[#ff928a] font-bold text-left" dir="ltr">القيمة</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sprintData.map((row, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                  <td className="p-3 border-b border-l border-white/5 text-[#adaaaa]">{row.label}</td>
                                  <td className="p-3 border-b border-white/5 text-left font-mono text-white" dir="ltr">{row.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Equations for analysis section */}
                    {section.id === 'analysis' && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { label: 'الميزة الميكانيكية', eq: 'MA = Fo / Fi = li / lo' },
                          { label: 'عزم الدوران', eq: 'τ = F × d × sin(θ)' },
                          { label: 'التوازن الاستاتيكي', eq: 'Σ τ = 0' },
                          { label: 'القدرة الميكانيكية', eq: 'P = τ × ω' }
                        ].map((eq, i) => (
                          <div key={i} className="bg-[#0e0e0e] rounded-2xl p-4 border border-[#e08dff]/10 text-center">
                            <p className="text-[10px] text-[#adaaaa] uppercase tracking-widest mb-2">{eq.label}</p>
                            <p className="font-mono text-[#e08dff] font-bold text-lg">{eq.eq}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </FadeContent>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="max-w-5xl mx-auto px-4 mt-12">
            <div className="bg-gradient-to-br from-[#bc00fb] to-[#4c0068] rounded-3xl p-10 text-center relative overflow-hidden group shadow-[0_20px_50px_rgba(188,0,251,0.15)] border border-[#e08dff]/20">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00fcca]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              <span className="text-xs tracking-widest text-white/60 mb-4 inline-block uppercase">إلهام علمي</span>
              <p className="font-bold text-xl md:text-2xl text-white leading-relaxed relative z-10 italic max-w-2xl mx-auto">
                "الجسم البشري هو أعظم آلة هندسية صممتها الطبيعة — كل عضلة رافعة، وكل مفصل نقطة ارتكاز، وكل حركة معادلة فيزيائية مثالية."
              </p>
              <div className="mt-8 flex justify-center gap-2">
                <div className="w-1 h-1 rounded-full bg-white"></div>
                <div className="w-8 h-1 rounded-full bg-white"></div>
                <div className="w-1 h-1 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
        </FadeContent>
      </div>
    </div>
  );
}
