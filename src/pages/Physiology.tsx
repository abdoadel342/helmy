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
        heading: 'جزيء الـ ATP — عملة الطاقة العالمية',
        text: 'أدينوسين ثلاثي الفوسفات (ATP) هو جزيء الطاقة الوحيد الذي تستطيع خلايا الجسم استخدامه مباشرة. كل حركة عضلية، كل نبضة قلب، كل فكرة — تعتمد على تكسير الرابطة الفوسفاتية الأخيرة في الـ ATP لتحرير الطاقة. الجسم يُخزّن فقط 80-100 جم من ATP في أي لحظة — يكفي لـ 2-3 ثوانٍ من الجهد الأقصى فقط! لذلك يجب إعادة تصنيعه باستمرار — وهذا دور أنظمة الطاقة الثلاثة.'
      },
      {
        heading: 'نظام الفوسفاجين (ATP-PC System)',
        text: 'أسرع أنظمة إنتاج الطاقة على الإطلاق! يعتمد على تكسير مركب فوسفات الكرياتين (PC) المُخزّن في العضلات لإعادة بناء ATP فوراً عبر إنزيم الكرياتين كيناز. الخصائص: لاهوائي (لا يحتاج أكسجين)، لا يُنتج حمض اللاكتيك، يُنتج طاقة خلال أقل من ثانية. المدة: 6-15 ثانية فقط ثم يُستنفد. التعافي الكامل: 3-5 دقائق. التطبيق الرياضي: رفع الأثقال (1-5 تكرارات)، القفز العمودي، انطلاقة 100 متر، رمي الرمح. تحسينه: مكملات الكرياتين مونوهيدرات (3-5 جم/يوم) تزيد مخازن PC بنسبة 20-40%!'
      },
      {
        heading: 'نظام الجليكوليسيس اللاهوائي (Glycolytic System)',
        text: 'يُنتج الطاقة عبر التكسير الجزئي للكربوهيدرات (الجليكوجين العضلي أو الجلوكوز) في غياب الأكسجين الكافي. يولّد 2 ATP من كل جزيء جلوكوز (مقارنة بـ 36-38 في النظام الهوائي). المدة: من 15 ثانية حتى 2-3 دقائق. المنتج الثانوي: أيونات الهيدروجين (H+) واللاكتات — تراكمها يسبب حموضة العضلة (انخفاض pH) والشعور "بالحرقان" الذي يُجبرك على التوقف أو الإبطاء. التطبيق الرياضي: عدو 400-800 متر، جولات الملاكمة المكثفة، تمارين HIIT. تحسينه: تدريب Interval عالي الشدة يُحسّن قدرة الجسم على "تحمّل" اللاكتات ويُعزّز إنزيمات التنظيف (LDH).'
      },
      {
        heading: 'النظام المؤكسد (Oxidative / Aerobic System)',
        text: 'المحرك الرئيسي لأنشطة التحمل الطويلة والحياة اليومية. يعتمد على الأكسجين لحرق الوقود عبر 3 مراحل متسلسلة: 1) الجليكوليسيس الهوائي (تكسير الجلوكوز). 2) دورة كريبس (Krebs Cycle) في الميتوكوندريا. 3) سلسلة نقل الإلكترون (ETC) — حيث يتم إنتاج الحصة الأكبر من ATP. الناتج: 36-38 ATP لكل جزيء جلوكوز! يحرق أيضاً: الأحماض الدهنية (تولّد 129 ATP لكل جزيء!) والبروتين في الحالات القصوى. المدة: من 3 دقائق إلى ساعات. التطبيق: الماراثون، السباحة الطويلة، ركوب الدراجات، المشي. تحسينه: تدريب Zone 2 (60-70% من HRmax) لتحسين كثافة الميتوكوندريا.'
      },
      {
        heading: 'استمرارية أنظمة الطاقة (Energy Continuum)',
        text: 'حقيقة جوهرية: الأنظمة الثلاثة تعمل جميعها في آنٍ واحد منذ اللحظة الأولى لأي جهد بدني! لا تعمل كمفاتيح كهربائية (On/Off) بل كـ "خلاطات صوت" تتغير نسب مساهمتها حسب شدة ومدة التمرين. مثال: في عدو 100م، يُسهم الفوسفاجين بـ 50%، الجليكوليسيس بـ 44%، والهوائي بـ 6%. بينما في ماراثون، يُسهم الهوائي بـ 99%! في تمرين 1 دقيقة مكثف: الفوسفاجين 15%، الجليكوليسيس 55%، الهوائي 30%. فهم هذا التداخل ضروري لتصميم برامج تدريبية تستهدف النظام الصحيح.'
      },
      {
        heading: 'التكيف الميتوكوندري (Mitochondrial Biogenesis)',
        text: 'الميتوكوندريا هي "محطات الطاقة" داخل الخلايا العضلية — وزيادة عددها وكفاءتها هي أهم تكيف للتحمل الهوائي. التدريب المنتظم (خاصة Zone 2 وHIIT) يُحفّز بروتين PGC-1α الذي يأمر الخلية ببناء ميتوكوندريا جديدة. النتيجة: زيادة عدد الميتوكوندريا 50-100% خلال 6-8 أسابيع! هذا يعني قدرة أعلى على حرق الدهون كوقود، إنتاج ATP أسرع، وتأخير التعب. عكسياً: التوقف عن التدريب لـ 2-4 أسابيع يُقلل كثافة الميتوكوندريا بنسبة 50% — تكيف سريع الفقدان!'
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
        text: 'ألياف حمراء غنية بالشعيرات الدموية، الميوجلوبين (بروتين تخزين الأكسجين)، والميتوكوندريا. تمتلك كفاءة عالية جداً في استخدام الأكسجين لتوليد الـ ATP لفترات طويلة. قطر صغير نسبياً. مقاومة فائقة للتعب. سرعة انقباض: 110 مللي ثانية. الوقود: الأحماض الدهنية + الأكسجين. هيمنة لدى عداءي الماراثون والسباحين للمسافات الطويلة (80-90% من عضلات الساق). التدريب المثالي: تكرارات عالية (15-25+)، كارديو Zone 2.'
      },
      {
        heading: 'الألياف سريعة الانقباض الانتقالية (Type IIa)',
        text: 'تُعرف بالألياف الوردية. تمثل جسراً بين التحمل والقوة الانفجارية. تستخدم الأيض الهوائي واللاهوائي معاً. حجم أكبر من Type I. مقاومة متوسطة للتعب. سرعة انقباض: 50 مللي ثانية. أهم ميزة: الأكثر قابلية للتكيف! يمكنها التحول لتصبح أشبه بـ Type I مع تدريب التحمل، أو أشبه بـ Type IIx مع تدريب القوة. هيمنة لدى لاعبي الرياضات المختلطة (كرة القدم، الفنون القتالية). التدريب المثالي: تكرارات متوسطة (8-12)، تمارين التضخم العضلي.'
      },
      {
        heading: 'الألياف سريعة الانقباض النقية (Type IIx / IIb)',
        text: 'ألياف بيضاء تعتمد حصرياً على الأيض اللاهوائي (الفوسفاجين والجليكوليسيس). أكبر قطراً. تتقلص بقوة هائلة وسرعة قصوى لكنها تتعب خلال ثوانٍ معدودة. سرعة انقباض: 25 مللي ثانية. المسؤولة عن القوة القصوى للرباعين وعدائي المسافات القصيرة. التدريب المثالي: تكرارات منخفضة (1-5) بأوزان ثقيلة (85-100% 1RM). حقيقة مهمة: الأشخاص غير النشطين يفقدون هذه الألياف مع التقدم بالعمر — تدريب القوة يحميها!'
      },
      {
        heading: 'مبدأ حجم هينمان (Henneman\'s Size Principle)',
        text: 'قانون فسيولوجي أساسي: الجهاز العصبي يُجنّد الوحدات الحركية بشكل متسلسل تصاعدي من الأصغر (Type I) إلى الأكبر (Type IIx) بناءً على المقاومة المطلوبة. أحمال خفيفة: Type I فقط. أحمال متوسطة: Type I + IIa. أحمال قصوى أو الاقتراب من الفشل العضلي: جميع الأنواع. التطبيق: لتفعيل كل الألياف العضلية، إما استخدم أوزاناً ثقيلة (>85% 1RM) أو أوزاناً خفيفة مع الوصول للفشل. كلا الطريقتين تُحقق تجنيداً كاملاً!'
      },
      {
        heading: 'تخليق البروتين العضلي (Muscle Protein Synthesis — MPS)',
        text: 'عملية بناء بروتين عضلي جديد — المحرك الأساسي لنمو العضلات! يتم تحفيزها بعاملين: 1) التحفيز الميكانيكي (التمرين — خاصة الانقباض اللامركزي والتمدد تحت الحمل). 2) التحفيز الغذائي (البروتين — خاصة اللوسين الذي يُفعّل مسار mTOR). بعد التمرين، يرتفع معدل MPS بنسبة 100-150% ويبقى مرتفعاً لـ 24-72 ساعة. "النافذة الأنابولية" الحقيقية ليست 30 دقيقة بل 24 ساعة كاملة! المفتاح: توزيع البروتين على 4-6 وجبات (20-40 جم لكل وجبة) على مدار اليوم لتحفيز MPS بشكل متكرر.'
      },
      {
        heading: 'الوحدة الحركية (Motor Unit) والتنسيق العصبي العضلي',
        text: 'الوحدة الحركية = عصب حركي واحد + جميع الألياف العضلية التي يُغذيها. العضلات الدقيقة (عضلات العين): 1 عصب يُغذي 5-10 ألياف فقط = تحكم فائق الدقة. العضلات الكبيرة (الكوادز): 1 عصب يُغذي 1000-2000 ليف = قوة هائلة لكن تحكم أقل دقة. تكيفات التدريب العصبية (أول 4-8 أسابيع): زيادة معدل إطلاق النبضات (Rate Coding)، تحسين التزامن بين الوحدات الحركية (Synchronization)، وتقليل تثبيط الأعضاء الوترية (Golgi Tendon Organ). هذا يُفسّر لماذا يزداد المبتدئون في القوة بسرعة دون زيادة ملحوظة في حجم العضلات!'
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
        text: 'مع تدريب التحمل المستمر، تتضخم البطين الأيسر للقلب وتزداد سعة تجويفه (Eccentric Hypertrophy)، مما يسمح له بضخ كمية أكبر من الدم في كل نبضة. الشخص العادي: 70 مل/نبضة. الرياضي المتقدم: 100-120 مل/نبضة. النخبة (مثل لانس أرمسترونغ): 200 مل/نبضة! هذا هو التكيف الأهم الذي يميز "قلب الرياضي" (Athlete\'s Heart) — قلب أكبر وأقوى وأكثر كفاءة. يتطلب 6-12 شهراً من التدريب المنتظم لتحقيق تغييرات ملموسة.'
      },
      {
        heading: 'معدل ضربات القلب أثناء الراحة (RHR)',
        text: 'بسبب زيادة حجم الضربة القلبي، لا يحتاج القلب للنبض بعدد مرات كبير لضخ نفس كمية الدم المطلوبة وقت الراحة. لذلك ينخفض النبض لدى الرياضيين المتقدمين إلى 40-50 نبضة/الدقيقة (Bradycardia الحميدة). بعض الرياضيين النخبة: 28-35 نبضة/دقيقة! المعادلة: الناتج القلبي (Cardiac Output) = حجم الضربة × معدل النبض. إذا زاد حجم الضربة يقل النبض اللازم. RHR هو مؤشر ممتاز لمراقبة اللياقة: انخفاضه مع التدريب = تحسن. ارتفاعه المفاجئ = إجهاد أو مرض.'
      },
      {
        heading: 'الحد الأقصى لاستهلاك الأكسجين (VO2 Max)',
        text: 'أفضل معيار لقياس اللياقة القلبية التنفسية. يمثل أقصى كمية أكسجين يستطيع الجسم استنشاقها ونقلها واستخدامها لإنتاج الطاقة الهوائية. يُقاس بـ مل/كجم/دقيقة. الشخص العادي: 35-45. رياضي لائق: 50-60. النخبة: 70-85. أعلى قيمة مسجلة: 97.5 (عداء نرويجي!). يتحدد بعوامل: 1) سعة الرئتين. 2) قوة القلب. 3) كثافة الشعيرات الدموية. 4) كثافة الميتوكوندريا. 5) الجينات (تُحدد 50% من الحد الأقصى!). يمكن تحسينه 15-20% بالتدريب. مؤشر قوي للتنبؤ بطول العمر والصحة العامة!'
      },
      {
        heading: 'عتبة اللاكتات (Lactate Threshold — LT)',
        text: 'النقطة التي يبدأ عندها اللاكتات بالتراكم في الدم بمعدل أسرع من قدرة الجسم على إزالته. تحدث عادة عند 60-80% من VO2max للمبتدئين و85-95% للرياضيين النخبة. عتبة اللاكتات الأولى (LT1 / VT1): بداية ارتفاع اللاكتات فوق خط الأساس — الحد الأعلى لتدريب Zone 2. العتبة الثانية (LT2 / OBLA / VT2): عند تركيز لاكتات 4 مللي مول/لتر — "نقطة اللاعودة" التي لا يمكن الاستمرار فوقها لفترة طويلة. أهمية تأخيرها: كل 1% تحسن في LT = 1% تحسن في سرعة السباق الفعلية! أفضل من تحسين VO2max!'
      },
      {
        heading: 'نطاقات التدريب القلبي (Heart Rate Zones)',
        text: 'Zone 1 (50-60% HRmax): الاستشفاء النشط — حرق دهون منخفض، لا يُسبب إجهاداً. Zone 2 (60-70% HRmax): "المنطقة السحرية" — أقصى حرق للدهون، بناء القاعدة الهوائية، تحسين كثافة الميتوكوندريا. يجب أن تُشكّل 80% من حجم التدريب! Zone 3 (70-80% HRmax): "المنطقة الرمادية" — شدة متوسطة لا تُحفز تكيفات كبيرة. يُفضل تجنبها! Zone 4 (80-90% HRmax): تدريب عتبة اللاكتات — يُحسّن القدرة على تحمل الشدة العالية. 1-2 جلسة/أسبوع. Zone 5 (90-100% HRmax): VO2max Intervals — أقصى تحسين للسعة الهوائية. فترات قصيرة (3-5 دقائق) بأقصى جهد. مُرهق جداً!'
      },
      {
        heading: 'تكيفات الأوعية الدموية والشعيرات',
        text: 'التدريب الهوائي المنتظم يُحدث تغييرات هيكلية في الجهاز الوعائي: 1) تكوّن أوعية جديدة (Angiogenesis): زيادة عدد الشعيرات الدموية حول الألياف العضلية بنسبة 20-40% — مما يُحسّن توصيل الأكسجين والمغذيات وإزالة الفضلات. 2) تحسين وظيفة البطانة الوعائية: إنتاج أكبر لأكسيد النيتريك (NO) مما يُوسّع الأوعية ويُحسّن تدفق الدم ويُخفض ضغط الدم. 3) زيادة حجم بلازما الدم: بنسبة 10-20% مع التدريب المنتظم — يُحسّن تبريد الجسم ونقل الأكسجين. 4) زيادة الهيموجلوبين الكلي: المزيد من "ناقلات الأكسجين" في الدم.'
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
        text: 'الهرمون البنائي (Anabolic) الأساسي. يرتفع مستواه بشكل حاد (15-30%) أثناء تدريبات المقاومة الثقيلة والتمارين متعددة المفاصل (سكوات، رفعة ميتة). يساهم في: تخليق البروتين العضلي، زيادة كثافة العظام، تطوير الجهاز العصبي، وزيادة عدد كريات الدم الحمراء. لتعظيم إفرازه طبيعياً: أوزان >85% من 1RM، فترات راحة 1-2 دقيقة، تمارين مركبة، نوم 7-9 ساعات، دهون صحية كافية (20-35% من السعرات)، وتجنب الإفراط في التدريب. المستوى الطبيعي: 300-1000 نانوجرام/ديسيلتر. انخفاضه تحت 300 = أعراض واضحة (إرهاق، فقدان عضلي، اكتئاب).'
      },
      {
        heading: 'هرمون النمو البشري (HGH / Somatotropin)',
        text: 'يلعب دوراً حاسماً في: التعافي العضلي، حرق الدهون (تحلل الدهون)، تقوية الأوتار والأربطة والغضاريف، ونمو العظام. يتم تحفيز إفرازه بقوة استجابةً لـ: تراكم اللاكتات العالي (تمارين التضخم بتكرارات 8-12)، تدريب HIIT، والصيام المتقطع. الإفراز الأعظم: أثناء مرحلة النوم العميق (70-80% من الإفراز اليومي!) — وهذا يُفسّر لماذا النوم هو "أقوى مكمل غذائي". النوم أقل من 6 ساعات يُقلل إفراز HGH بنسبة 70%! يتناقص طبيعياً بنسبة 14% لكل عقد بعد سن 30 — تدريب القوة والنوم الكافي يُبطئان هذا التراجع.'
      },
      {
        heading: 'الكورتيزول (Cortisol) — الصديق والعدو',
        text: 'هرمون الإجهاد الأساسي — هدمي (Catabolic) لكنه ضروري للحياة! الوظائف الإيجابية: تعبئة الطاقة السريعة (تكسير الغليكوجين والدهون)، مضاد للالتهاب (بجرعات قصيرة)، تنظيم المناعة. المشكلة: ارتفاعه المزمن (نتيجة الإفراط في التدريب، قلة النوم، الضغط النفسي) يُدمّر العضلات (هدم بروتيني)، يُضعف المناعة، يزيد تخزين دهون البطن، ويُبطئ التعافي. نسبة T:C (تستوستيرون:كورتيزول): المؤشر الذهبي للاستشفاء — انخفاضها بأكثر من 30% يُشير للإفراط في التدريب. الحل: النوم الكافي، إدارة الحمل التدريبي، التأمل/اليوغا، وعدم تجاوز 60-75 دقيقة في جلسة تدريب المقاومة.'
      },
      {
        heading: 'الإنسولين (Insulin) — مفتاح الخلايا',
        text: 'هرمون بنائي يُفرز من البنكرياس استجابةً لارتفاع سكر الدم بعد الأكل. الوظيفة: "يفتح أبواب الخلايا" لإدخال الجلوكوز والأحماض الأمينية والكرياتين. للرياضيين: بعد التمرين مباشرة، حساسية الإنسولين تكون في ذروتها — الوقت الذهبي لتناول الكربوهيدرات والبروتين لتعويض الغليكوجين وتسريع البناء العضلي. مقاومة الإنسولين (Insulin Resistance): عندما تفقد الخلايا حساسيتها للإنسولين — مقدمة لمرض السكري النوع 2. التمرين المنتظم (خاصة تدريب المقاومة) هو أقوى علاج طبيعي لتحسين حساسية الإنسولين!'
      },
      {
        heading: 'الإبينفرين والنورإبينفرين (Catecholamines)',
        text: 'هرمونات "القتال أو الهروب" (Fight or Flight) تُفرز من الغدة الكظرية والجهاز العصبي الودي. تأثيرها فوري: زيادة معدل ضربات القلب وقوة انقباضه، توسيع مجاري الهواء (القصبات الهوائية)، تعبئة الغليكوجين والأحماض الدهنية كوقود، تحويل تدفق الدم من الأحشاء إلى العضلات العاملة، زيادة اليقظة والتركيز. للرياضيين: مسؤولة عن "الاندفاعة الأدرينالينية" التي تُمكّن من أداء خارق في المنافسات. تدريب HIIT يُحسّن كفاءة إفراز الكاتيكولامينات ويُعزّز حرق الدهون (خاصة دهون البطن العنيدة!).'
      },
      {
        heading: 'هرمون IGF-1 والإريثروبويتين (EPO)',
        text: 'IGF-1 (عامل النمو شبيه الإنسولين): يُفرز من الكبد والعضلات استجابةً لهرمون النمو. يُحفّز مباشرةً تخليق البروتين العضلي ونمو الخلايا الساتلية (Satellite Cells). مستوياته ترتفع مع تدريب المقاومة الثقيلة والتغذية الكافية. الإريثروبويتين (EPO): يُفرز من الكلى استجابةً لنقص الأكسجين (Hypoxia). يُحفّز نخاع العظم لإنتاج المزيد من كريات الدم الحمراء — مما يزيد سعة نقل الأكسجين. يرتفع طبيعياً مع التدريب في المرتفعات أو استخدام أقنعة Hypoxia. تحذير: الـ EPO الصناعي محظور رياضياً (منشط دموي خطير!).'
      }
    ]
  },
  {
    id: 'environmental',
    icon: 'landscape',
    title: 'الفسيولوجيا البيئية',
    subtitle: 'تأثير المرتفعات والحرارة والبرودة على الأداء',
    color: '#00fcca',
    content: [
      {
        heading: 'التدريب في المرتفعات (Altitude Training)',
        text: 'في المرتفعات (فوق 2000م)، يقل الضغط الجزئي للأكسجين بنسبة 20-25%. الاستجابة الفسيولوجية: الكلى تفرز EPO خلال 6-24 ساعة → زيادة إنتاج كريات الدم الحمراء خلال 1-3 أسابيع → تحسين نقل الأكسجين بنسبة 5-10%. الاستراتيجية المثلى: "العيش في المرتفعات (2000-2500م) والتدريب في السهول (1200م)" — Live High, Train Low (LHTL). المدة المثالية: 3-4 أسابيع. التأثيرات تبقى 2-3 أسابيع بعد العودة للسهول. تحذير: الارتفاع المفرط (فوق 3000م) يُقلل شدة التدريب ويُسبب فقدان عضلي! بدائل: خيام Hypoxia وأقنعة التدريب بنقص الأكسجين.'
      },
      {
        heading: 'التأقلم الحراري (Heat Acclimatization)',
        text: 'التدريب في الحرارة (فوق 30°م) يُشكّل تحدياً فسيولوجياً ضخماً: تتنافس العضلات (تحتاج دماً للأكسجين) والجلد (يحتاج دماً للتبريد). التأقلم يتطلب 7-14 يوماً من التعرض التدريجي. التكيفات: التعرق يبدأ أبكر وبغزارة أكبر (حتى 3 لتر/ساعة!)، تقل ملوحة العرق (حفاظ على الصوديوم)، يزداد حجم بلازما الدم 10-15%، ينخفض معدل القلب 15-20 نبضة عند نفس الشدة. فائدة مفاجئة: التأقلم الحراري يُحسّن الأداء حتى في الأجواء المعتدلة! لأن زيادة حجم البلازما تُحسّن الناتج القلبي.'
      },
      {
        heading: 'التعرض للبرودة (Cold Exposure)',
        text: 'الغطس في الماء البارد (10-15°م لمدة 10-15 دقيقة) بعد التمرين: يُقلل الالتهاب والتورم العضلي (مفيد بين منافستين قريبتين). لكن! الاستخدام المنتظم بعد تمارين المقاومة قد يُعيق تكيفات التضخم العضلي بنسبة 25% لأنه يُثبط الإشارات الالتهابية اللازمة للبناء. التعرض للبرودة الشديدة (العلاج بالتبريد Cryotherapy عند -110°م لمدة 2-3 دقائق): يُحفّز إفراز النورإبينفرين (مضاد اكتئاب طبيعي)، يُنشّط الدهون البنية (Brown Fat) التي تحرق سعرات للتدفئة. الحمام البارد الصباحي: يُحسّن اليقظة والمزاج والتركيز عبر صدمة الكاتيكولامينات.'
      },
      {
        heading: 'النوم وفسيولوجيا التعافي',
        text: 'النوم ليس "راحة سلبية" بل أنشط عملية تعافي في الجسم! مرحلة النوم العميق (N3 / SWS): إفراز 70-80% من هرمون النمو اليومي، ترميم الأنسجة العضلية، تقوية الجهاز المناعي، توحيد الذاكرة الحركية (Motor Memory Consolidation — مهم لتعلم المهارات!). مرحلة REM: معالجة الضغط النفسي والعاطفي، تحسين الإبداع وحل المشكلات. تأثير الحرمان: نقص ساعة واحدة من النوم يُقلل الأداء الهوائي 10%، ويُقلل التستوستيرون 10-15%، ويزيد خطر الإصابة 60%! النوم أقل من 7 ساعات يُضاعف خطر الإصابة. التوصية: 7-9 ساعات + قيلولة 20-30 دقيقة بعد الظهر لمن يتدربون مرتين يومياً.'
      },
      {
        heading: 'الإفراط في التدريب (Overtraining Syndrome — OTS)',
        text: 'حالة مرضية حقيقية تحدث عندما يتجاوز الإجهاد التراكمي (تدريبي + نفسي + غذائي) قدرة الجسم على التعافي لفترة مطولة. الأعراض: انخفاض مستمر في الأداء رغم الراحة، إرهاق مزمن، أرق، فقدان الشهية، اكتئاب، زيادة الإصابات، انخفاض المناعة (مرض متكرر)، ارتفاع معدل القلب أثناء الراحة. المؤشرات الفسيولوجية: انخفاض نسبة T:C، انخفاض HRV، ارتفاع CRP (علامة الالتهاب). الفرق عن الإجهاد العابر (Overreaching): الإجهاد العابر يتعافى منه خلال أسبوع واحد من الراحة — وقد يُسبب "تعويضاً زائداً" (Supercompensation) ويرفع الأداء! أما OTS فيحتاج أسابيع إلى شهور. الوقاية: قاعدة 10% (لا تزد حجم التدريب أكثر من 10% أسبوعياً)، نوم كافي، تغذية كافية، أسبوع تخفيف (Deload) كل 4-6 أسابيع.'
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
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
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
          <div className="w-10 flex justify-start"><BackButton /></div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center flex justify-center" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="bg-gradient-to-l from-[#ff928a] to-[#e08dff] bg-clip-text text-transparent animate-gradient-shift">فسيولوجية الرياضة</span>
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
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")' }}
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
