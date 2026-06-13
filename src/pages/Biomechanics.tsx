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
        heading: 'الفرعان الأساسيان: الكينماتيكا والكينتيكا',
        text: 'ينقسم هذا الهيكل العلمي إلى فرعين متكاملين: علم الكينماتيكا (Kinematics) الذي يختص بوصف الحركة رياضياً هندسياً من خلال دراسة الإزاحة والسرعة والعجلة (التسارع) دون الأخذ في الاعتبار القوى المسببة للحركة. في المقابل، علم الكينتيكا (Kinetics) يتعمق في الجذور السببية للحركة عبر دراسة القوى المباشرة مثل قوة الجاذبية، قوى الاحتكاك، وقوى رد فعل الأرض (Ground Reaction Forces)، وعزوم الدوران الداخلية التي تنتجها العضلات.'
      },
      {
        heading: 'الديناميكيات والميكانيكا الساكنة',
        text: 'التحليل الاستاتيكي (Statics) يدرس الأنظمة التي تكون في حالة توازن تام، إما ساكنة أو تتحرك بسرعة ثابتة (التسارع = صفر). في هذه الحالة، مجموع كل القوى والعزوم يساوي صفراً. أما التحليل الديناميكي (Dynamics) فيدرس الأنظمة التي تخضع للتسارع. في الرياضة، التحليل الديناميكي هو المهيمن نظراً لأن التغييرات المفاجئة في السرعة والاتجاه هي جوهر الأداء الرياضي التنافسي.'
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
        heading: 'المفاصل الليفية (Fibrous Joints) — ثبات مطلق',
        text: 'توفر هذه المفاصل حركة معدومة أو ضئيلة جداً، حيث تتحد الأسطح العظمية بقوة هائلة عبر أنسجة ضامة ليفية. تتجلى في دروز الجمجمة التي صُممت لتحمل الصدمات وحماية الدماغ، والمفصل الوتدي (Gomphosis) الذي يثبت الأسنان في الفك، والمفصل المُرتبط بين عظمة الظنبوب (Tibia) والشظية (Fibula) الذي يوفر قاعدة صلبة للمشي.'
      },
      {
        heading: 'المفاصل الغضروفية (Cartilaginous Joints) — مرونة محدودة',
        text: 'ترتبط العظام هنا بواسطة غضاريف زجاجية أو ليفية، وتسمح بحركات مقيدة لحماية الهياكل الحيوية مع توفير بعض المرونة. المثال الأبرز هو الأقراص الفقرية (Intervertebral Discs). رغم أن الحركة بين كل فقرتين محدودة جداً، إلا أن المجموع التراكمي للحركة عبر العمود الفقري يمنح الجذع مرونة فائقة للانحناء والالتواء، مع العمل كممتص صدمات هيدروليكي هائل الكفاءة.'
      },
      {
        heading: 'المفاصل الزلالية (Synovial Joints) — محركات الأداء',
        text: 'الفئة الأهم ميكانيكياً ورياضياً. العظام لا تتلامس مباشرة، بل تُغلف بكبسولة مفصلية تحتوي على سائل زلالي (Synovial Fluid) يوفر تشحيماً يفوق كفاءة زيوت المحركات الاصطناعية (معامل احتكاك منخفض جداً). الغضروف المفصلي يغطي أطراف العظام ليوزع القوى الضاغطة. تشمل مفاصل الكرة والتجويف (الكتف، الورك)، المفاصل الرزية (المرفق، الركبة)، والمفاصل المدارية.'
      },
      {
        heading: 'مفارقة الحركية والاستقرار (Mobility vs. Stability)',
        text: 'قانون ميكانيكي حيوي: كلما زادت القدرة الحركية للمفصل، انخفض استقراره، والعكس صحيح. مفصل الكتف هو المفصل الأكثر حركية في الجسم بفضل تجويفه الضحل، لكنه الأكثر عرضة للخلع والإصابة ويحتاج لعضلات الكفة المدورة لتثبيته. بينما مفصل الورك يتمتع بتجويف عميق يوفر استقراراً هائلاً لتحمل وزن الجسم، لكن على حساب المدى الحركي.'
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
        text: 'الحركة البشرية نادراً ما تحدث في خطوط مستقيمة، بل هي في جوهرها حركات دورانية (Angular) لأطراف الجسم حول محاور مفاصل ثابتة. يُعرّف عزم الدوران بأنه "قوة الدوران" الناتجة عن القوة المطبقة على مسافة معينة من محور الدوران. المعادلة هي: (عزم الدوران = القوة × ذراع العزم). لزيادة عزم الدوران، يمكنك إما زيادة القوة المطبقة، أو زيادة طول ذراع العزم.'
      },
      {
        heading: 'ذراع العزم الداخلي (Internal Moment Arm)',
        text: 'المسافة العمودية بين محور دوران المفصل وخط عمل القوة العضلية المنتجة. معظم العضلات تنغرس بالقرب جداً من المفاصل، مما يجعل "ذراع العزم الداخلي" قصيراً جداً. على سبيل المثال، وتر البايسبس ينغرس على بعد حوالي 3-5 سم فقط من مفصل المرفق. هذا القصر يُجبر العضلة على إنتاج قوى انقباضية هائلة لتوليد عزم دوران كافٍ لتحريك أطراف طويلة.'
      },
      {
        heading: 'ذراع العزم الخارجي (External Moment Arm)',
        text: 'المسافة العمودية بين محور دوران المفصل وخط عمل قوة المقاومة (الجاذبية، وزن الدمبل، الخصم). في تمرين البايسبس، يكون ذراع العزم الخارجي أطول ما يمكن عندما يكون الساعد موازياً للأرض (زاوية 90 درجة)، مما يعني أن المقاومة في هذه النقطة تكون في أقصى مستوياتها. يتغير طول ذراع العزم الخارجي باستمرار طوال المدى الحركي لأي تمرين بأوزان حرة.'
      },
      {
        heading: 'منحنى القوة الميكانيكية (Strength Curve)',
        text: 'منحنى يُوضح كيف تتغير قدرة العضلة على إنتاج القوة عبر زوايا المفصل المختلفة. ينتج هذا التغير عن تبدل طول ذراع العزم الداخلي وتغير تداخل خيوط الأكتين والميوسين. فهم هذا المنحنى يُمكّن المدربين من تحديد الزوايا الأضعف والأقوى (Sticking Points) واستخدام المقاومة المتغيرة (كالأحزمة المطاطية أو السلاسل) لمطابقة مقاومة التمرين مع منحنى قوة العضلة.'
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
        text: 'تقع نقطة الارتكاز (المفصل) بين القوة (العضلة) والحمل (المقاومة). يشبه تصميم "الأرجوحة". تظهر بوضوح في مفصل الرقبة، حيث تقع نقطة ارتكاز الجمجمة على الفقرة العنقية الأولى (الأطلس)، بينما تسحب عضلات العنق الخلفية الرأس لأسفل لموازنة وزن الجزء الأمامي للوجه. أيضاً تحدث في مفصل المرفق أثناء عمل عضلة الترايسبس لمد الساعد.'
      },
      {
        heading: 'روافع النوع الثاني (Second-Class Levers)',
        text: 'يقع الحمل بين نقطة الارتكاز والقوة. يشبه تصميم "عربة البناء". الميزة الميكانيكية دائماً أكبر من 1، مما يعني أن قوة صغيرة يمكنها التغلب على مقاومة كبيرة، لكن على حساب سرعة ومسافة الحركة. مثالها البشري الأوضح: حركة الوقوف على أمشاط القدم، حيث تمثل الأمشاط نقطة الارتكاز، ووزن الجسم (المتركز في منتصف القدم) هو الحمل، وعضلات الساق (الكالفز) توفر القوة الصاعدة.'
      },
      {
        heading: 'روافع النوع الثالث (Third-Class Levers)',
        text: 'قوة العضلة تقع بين نقطة الارتكاز والحمل. يشبه تصميم "الملقط". الميزة الميكانيكية دائماً أقل من 1، مما يعني أن العضلة يجب أن تبذل قوة تفوق وزن المقاومة بكثير. هذا هو التكوين التشريحي المهيمن في الجسم البشري (أكثر من 90% من المفاصل). مثال: حركة ثني المرفق (البايسبس). المرفق هو الارتكاز، الوتر ينغرس قريباً منه، والوزن في اليد البعيدة.'
      },
      {
        heading: 'السر التطوري للروافع البشرية',
        text: 'لماذا اختارت الطبيعة "الميزة الميكانيكية الضعيفة" للروافع من النوع الثالث كنموذج تصميمي مهيمن؟ الإجابة هي: "السرعة" و"مدى الحركة". ارتباط العضلات بالقرب من المفاصل يسمح لمقدار ضئيل جداً من قصر الألياف العضلية (بضعة سنتيمترات) بأن يُترجم إلى حركة واسعة وسريعة جداً في نهاية الطرف الخارجي. هذا التصميم يفضل السرعة الحركية على القوة المطلقة، وهو ما كان حاسماً لبقاء الإنسان الأولي.'
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
        heading: 'أنظمة التقاط الحركة (Motion Capture - MoCap)',
        text: 'تسجيل الإحداثيات المكانية وحركة المفاصل في الفضاء ثلاثي الأبعاد. الأنظمة البصرية القائمة على العلامات العاكسة (مثل Vicon) تعد المعيار الذهبي بدقة أقل من مليمتر واحد ومعدلات إطار تتجاوز 1000 إطار/ثانية. تبرز حالياً تقنيات "التقاط الحركة بدون علامات" (Markerless MoCap) المعتمدة على الذكاء الاصطناعي وكاميرات الرؤية الحاسوبية، مما يسمح بتحليل اللاعبين أثناء المباريات الفعلية دون ارتداء معدات مقيدة.'
      },
      {
        heading: 'منصات قياس القوى (Force Plates)',
        text: 'ألواح معدنية تحتوي على مستشعرات كهرضغطية (Piezoelectric Sensors) فائقة الحساسية لقياس قوى رد فعل الأرض (GRF) في ثلاثة أبعاد (عمودي، أمامي/خلفي، وجانبي) بالإضافة إلى قياس مركز الضغط (CoP) وعزوم الدوران. تُعد الأداة الأساسية لتحليل القفز العمودي (CMJ)، تحديد اختلالات التوازن بين الساقين بدقة، وتتبع الاستشفاء من إصابات الأطراف السفلية.'
      },
      {
        heading: 'التخطيط الكهربائي للعضلات (Electromyography - EMG)',
        text: 'قياس النشاط الكهربائي والإشارات العصبية التي تصل للعضلات لتوليد الانقباض. يُستخدم الـ EMG السطحي (sEMG) عبر أقطاب لاصقة لمعرفة "متى" تنقبض العضلة (التوقيت الزمني)، و"ما مدى قوة" انقباضها (سعة الإشارة). يُمكن للباحثين عبره تحديد العضلات التي تساهم في حركة معينة، كشف التعب العضلي قبل أن يصبح واضحاً حركياً، وتحديد التسلسل الحركي المثالي للضربات في الرياضة.'
      },
      {
        heading: 'وحدات القياس بالقصور الذاتي (IMUs)',
        text: 'أجهزة استشعار صغيرة قابلة للارتداء تحتوي على مقاييس تسارع (Accelerometers) ومقاييس جيروسكوب (Gyroscopes) ومقاييس مغناطيسية. توفر قياسات مستمرة للتسارع الخطي والسرعة الزاوية والتوجه المكاني. تُقدم بديلاً جوهرياً للتحليل خارج المختبر، وتوفر بيانات لحظية للمدربين أثناء التدريب الفعلي في الملعب أو المضمار بتكلفة منخفضة وحرية حركة تامة للرياضي.'
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
        heading: 'الوثب الطويل والألعاب الأولمبية',
        text: 'تعتمد ميكانيكا الوثب الطويل على التحويل المعقد للسرعة الأفقية المكتسبة من الركض إلى سرعة انطلاق عمودية. الرياضيون النخبة يطبقون تقنية "الخطوة قبل الأخيرة الطويلة والخطوة الأخيرة القصيرة". هذا يخفض ارتفاع مركز ثقل الجسم، ويطيل فترة تلامس القدم بالأرض لتوليد قوة دفع عمودية أكبر، ويهيئ زاوية ارتقاء مثالية (عادة بين 20 إلى 22 درجة).'
      },
      {
        heading: 'ميكانيكا الانطلاق في العدو (Sprint Start)',
        text: 'التسارع الأولي من مكعبات البدء حاسم في سباقات 100م. الدورة الحركية لرد الفعل تنقسم إلى: استجابة عصبية (0.15 ثانية)، ثم توليد قوة دفع هائلة. يجب إبقاء مركز الثقل منخفضاً والجذع مائلاً للأمام لفترة طويلة للسماح بتطبيق القوة في اتجاه أفقي أطول فترة ممكنة. سرعة العدائين النخبة (مثل أوسين بولت) تتجاوز 12 متراً/ثانية بخطوات تصل طولها إلى 2.7 متر.'
      },
      {
        heading: 'رفع الأثقال وتخطيط المسار الحركي',
        text: 'في رفعة الخطف (Snatch)، المسار المثالي للقضيب الحديدي ليس خطاً مستقيماً عمودياً كما يعتقد المبتدئون! بل يجب أن يكون مساراً منحنياً يأخذ شكل حرف S اللاتيني: سحب القضيب نحو الجسم (لتقليل ذراع العزم على أسفل الظهر)، ثم دفعه للأمام لتجاوز الركبتين، ثم سحبه عمودياً وأخيراً إسقاط الجسم تحته. الانحراف بضعة سنتيمترات يُسقط الرفعة.'
      },
      {
        heading: 'ديناميكا الموائع والسباحة (Fluid Dynamics)',
        text: 'السباحة صراع ضد قوى السحب المائي (Drag Forces). قوة السحب تتضاعف مع مربع السرعة (إذا ضاعفت سرعتك، تتضاعف المقاومة 4 مرات). يعتمد السباحون على تقليل "المساحة السطحية الأمامية" والحفاظ على استقامة الجسم (Streamlining). بدلة السباحة الكاملة المصنوعة من البولي يوريثان قللت السحب الاحتكاكي لدرجة أدت لتحطيم عشرات الأرقام القياسية عام 2009 قبل أن تُحظر!'
      },
      {
        heading: 'الركلة الحرة في كرة القدم وتأثير ماغنوس',
        text: 'قوة ركلة الكرة تتولد عبر سلسلة حركية تبدأ من الورك، للركبة، للكاحل. لكن السر يكمن في "تأثير ماغنوس" (Magnus Effect). عند ضرب الكرة من الأسفل أو الجانب لتدور حول محورها، يختلف ضغط الهواء على جانبي الكرة نتيجة الاحتكاك، مما يولد قوة هوائية تحرف مسار الكرة بشكل قوسي (كما في ركلات روبرتو كارلوس الشهيرة). السرعة الزاوية للركبة تصل لـ 2000 درجة/ثانية.'
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
        heading: 'ديناميكية تمزق الرباط الصليبي (ACL)',
        text: 'إصابات الركبة (تمزق ACL) غالباً ما تحدث بشكل غير تلامسي — لا أحد يضرب اللاعب! تحدث نتيجة ميكانيكا سيئة أثناء الهبوط من القفز أو تغيير الاتجاه الحاد: حيث تتجه الركبة للداخل (Valgus Collapse) مع تثبيت القدم بالأرض ودوران الجذع. هذا يُنتج قوة قص ودوران هائلة تمزق الرباط. التدريب الوقائي يركز على تعليم الهبوط الصحيح وتقوية عضلات الأرداف (Gluteus Medius) لمنع انهيار الركبة للداخل.'
      },
      {
        heading: 'إصابات الكفة المدورة وتناقض رامي البيسبول',
        text: 'تتعرض أكتاف الرماة لعزوم دوران خارجية استثنائية (تصل إلى 180 درجة في الكتف!). أثناء مرحلة "التباطؤ" بعد رمي الكرة، يجب على عضلات الكفة المدورة إنتاج قوى لامركزية عنيفة لإيقاف حركة الذراع وإلا ستنفصل من المفصل. أكثر من 50% من إصابات الكتف تحدث في هذه المرحلة. التأهيل يركز على بناء القوة اللامركزية للعضلات الدوارة الخارجية (Infraspinatus).'
      },
      {
        heading: 'ميكانيكا رفع الأثقال وحماية أسفل الظهر',
        text: 'العمود الفقري البشري يتكون من فقرات تفصلها أقراص غضروفية محيطها ليفي (Annulus Fibrosus) ونواتها هلامية (Nucleus Pulposus). عند رفع غرض ثقيل بظهر منحنٍ، يتعرض الجزء الأمامي للقرص لضغط هائل بينما يتعرض الجزء الخلفي للشد، مما يؤدي إلى بروز النواة الهلامية للخلف والضغط على العصب (الانزلاق الغضروفي/عرق النسا). الحفاظ على استقامة الظهر (المنحنى القطني الطبيعي) يوزع قوى الضغط بالتساوي ويمنع القص.'
      },
      {
        heading: 'التدريب العصبي العضلي (Neuromuscular Training)',
        text: 'برامج وقائية شاملة (مثل برنامج FIFA 11+) لا تعتمد فقط على التقوية العضلية، بل على إعادة برمجة الاستجابات العصبية. تستخدم تمارين التوازن، تدريبات التحفيز الحسي العميق (Proprioception)، والقفز البليومتري لتعليم الدماغ كيفية إرسال إشارات تنشيط أسرع وأكثر تناسقاً للعضلات المثبتة قبل حدوث الضغط المفاجئ على المفصل، مما يخفض معدلات الإصابات بشكل كبير.'
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
        heading: 'أحذية الجري المعززة بالكربون',
        text: 'شهد عالم الماراثون ثورة بسبب إدخال شرائح ألياف الكربون الصلبة المنحنية في نعال الأحذية محاطة برغوة فائقة الخفة والتمدد (مثل Nike Alphafly). اللوح الكربوني يمنع ثني أصابع القدم المفرط ويُعيد توجيه طاقة رد فعل الأرض للأمام (تأثير الزنبرك)، مما يزيد كفاءة الجري بنسبة 4% (وهو فارق دقائق كاملة في سباق الماراثون).'
      },
      {
        heading: 'مضارب التنس ونقطة الارتطام المثالية',
        text: 'توزيع الكتلة، صلابة الإطار، ونمط الأوتار تحدد جميعها "النقطة الحلوة" (Sweet Spot) للمضرب. عند ضرب الكرة في هذا المركز، تختفي الاهتزازات تقريباً ويتم نقل أقصى طاقة للكرة. التصاميم الحديثة تستخدم أنابيب النانو الكربونية والغرافين لزيادة الصلابة وتوسيع النقطة الحلوة مع تقليل الوزن، مما يحمي اللاعبين من متلازمة "مرفق التنس".'
      },
      {
        heading: 'تكنولوجيا الدراجات الهوائية والأنفاق الهوائية',
        text: 'في سباقات الدراجات المضمارية، السحب الديناميكي الهوائي يشكل أكثر من 90% من المقاومة التي يواجهها الدراج! تُصمم الدراجات والخوذات والبدلات من خلال برمجيات ديناميكا الموائع الحسابية (CFD) والاختبارات في الأنفاق الهوائية. كل انحناء وكل غرزة في بدلة الدراج مصممة لتحويل تدفق الهواء المضطرب إلى تدفق انسيابي لتوفير أجزاء من الثانية.'
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
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
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
          <div className="w-10 flex justify-start"><BackButton /></div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center flex justify-center">
            <span className="bg-gradient-to-l from-[#e08dff] to-[#00fcca] bg-clip-text text-transparent">الميكانيكا الحيوية وعلم الحركة</span>
          </h2>
          <div className="w-10"></div>
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
