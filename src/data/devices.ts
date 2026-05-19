export interface ConnectedDevice {
  id: string;
  name: string;
  brand: string;
  type: string;
  function: string;
  icon: string;
  isConnected: boolean;
  lastSync: string;
  data: {
    steps?: number;
    caloriesBurned?: number;
    heartRate?: number;
    weight?: number;
    cadence?: number;
    power?: number;
    distance?: number;
    strokes?: number;
    speed?: number;
    incline?: number;
    sleepDuration?: string;
    spo2?: number;
    stressLevel?: string;
    bodyFat?: number;
    muscleMass?: number;
    bodyWater?: number;
    boneMass?: number;
    visceralFat?: number;
    bmr?: number;
    effortLevel?: string;
    hrv?: number;
    resistance?: number;
    splitTime?: string;
    durationMins?: number;
  };
}

export const AVAILABLE_DEVICES: ConnectedDevice[] = [
  {
    "id": "apple_watch_10",
    "name": "Apple Watch Series 10",
    "brand": "Apple",
    "type": "ساعة ذكية",
    "function": "أحدث إصدار من ساعة آبل تتميز بشاشة أنحف وتتبع متقدم لمعدل ضربات القلب، السعرات، وتحديد النوم الرياضي",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8900,
      "caloriesBurned": 450,
      "heartRate": 70,
      "sleepDuration": "7 ساعات و30 دقيقة",
      "spo2": 99,
      "stressLevel": "منخفض (15/100)",
      "hrv": 65
    }
  },
  {
    "id": "apple_watch_9",
    "name": "Apple Watch Series 9",
    "brand": "Apple",
    "type": "ساعة ذكية",
    "function": "تتبع النشاط اليومي، السعرات، الخطوات ومعدل نبضات القلب والمسافة الرياضية للتمارين اليومية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8420,
      "caloriesBurned": 420,
      "heartRate": 72,
      "sleepDuration": "7 ساعات و15 دقيقة",
      "spo2": 98,
      "stressLevel": "منخفض (18/100)",
      "hrv": 62
    }
  },
  {
    "id": "apple_watch_ultra_2",
    "name": "Apple Watch Ultra 2",
    "brand": "Apple",
    "type": "ساعة ذكية",
    "function": "تتبع الرياضات الاحترافية القاسية والركض والسباحة والخطوات والسعرات ومعدل نبضات القلب بدقة فائقة",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 12500,
      "caloriesBurned": 650,
      "heartRate": 68,
      "sleepDuration": "7 ساعات و45 دقيقة",
      "spo2": 99,
      "stressLevel": "متوازن (12/100)",
      "hrv": 75,
      "durationMins": 90
    }
  },
  {
    "id": "apple_watch_ultra",
    "name": "Apple Watch Ultra 1",
    "brand": "Apple",
    "type": "ساعة ذكية",
    "function": "ساعة المغامرات والرياضات الصعبة تتميز بهيكل التيتانيوم وتتبع ضربات القلب ونبض الكارديو بدقة متناهية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 11800,
      "caloriesBurned": 600,
      "heartRate": 69,
      "sleepDuration": "7 ساعات و35 دقيقة",
      "spo2": 98,
      "stressLevel": "منخفض (14/100)",
      "hrv": 72
    }
  },
  {
    "id": "apple_watch_se",
    "name": "Apple Watch SE",
    "brand": "Apple",
    "type": "ساعة ذكية",
    "function": "تتبع اللياقة البدنية والتمارين والخطوات اليومية ومعدل ضربات القلب الأساسي والنشاط بسعر اقتصادي",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7500,
      "caloriesBurned": 350,
      "heartRate": 74,
      "sleepDuration": "6 ساعات و50 دقيقة",
      "spo2": 97,
      "stressLevel": "متوسط (25/100)",
      "hrv": 55
    }
  },
  {
    "id": "apple_watch_8",
    "name": "Apple Watch Series 8",
    "brand": "Apple",
    "type": "ساعة ذكية",
    "function": "قياس درجة الحرارة، وتتبع متقدم للدورة الصحية، والخطوات والسعرات ونبض القلب والتمارين اليومية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8100,
      "caloriesBurned": 390,
      "heartRate": 71,
      "sleepDuration": "7 ساعات",
      "spo2": 98,
      "hrv": 60
    }
  },
  {
    "id": "apple_watch_7",
    "name": "Apple Watch Series 7",
    "brand": "Apple",
    "type": "ساعة ذكية",
    "function": "شاشة ريتنا كبيرة وتتبع ذكي لنبضات القلب والنشاط البدني والخطوات وحساب السعرات النشطة",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7900,
      "caloriesBurned": 370,
      "heartRate": 73,
      "sleepDuration": "6 ساعات و40 دقيقة",
      "spo2": 96,
      "hrv": 58
    }
  },
  {
    "id": "apple_watch_6",
    "name": "Apple Watch Series 6",
    "brand": "Apple",
    "type": "ساعة ذكية",
    "function": "تتبع نسبة الأكسجين في الدم والخطوات اليومية ونبضات القلب الكارديو ومعدل النوم بسعر مناسب",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7200,
      "caloriesBurned": 330,
      "heartRate": 75,
      "sleepDuration": "6 ساعات و30 دقيقة",
      "spo2": 95,
      "hrv": 50
    }
  },
  {
    "id": "garmin_fenix_8",
    "name": "Garmin Fenix 8",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "الجيل الجديد للرياضيين المحترفين، شاشة أموليد، قياس طاقة الجسم، السعرات ومزامنة الخطوات والموقع GPS والخرائط المدمجة",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 12800,
      "caloriesBurned": 640,
      "heartRate": 62,
      "sleepDuration": "8 ساعات و10 دقيقة",
      "spo2": 99,
      "stressLevel": "منخفض (8/100)",
      "hrv": 85
    }
  },
  {
    "id": "garmin_fenix_7",
    "name": "Garmin Fenix 7 Pro",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "مراقبة متقدمة للأداء الرياضي، قياس طاقة الجسم البدنية، السعرات ومزامنة الخطوات والموقع GPS",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 11000,
      "caloriesBurned": 580,
      "heartRate": 65,
      "sleepDuration": "8 ساعات",
      "spo2": 98,
      "stressLevel": "منخفض جداً (10/100)",
      "hrv": 80
    }
  },
  {
    "id": "garmin_venu_3",
    "name": "Garmin Venu 3",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "تتبع اللياقة البدنية والتمارين والمؤشرات الحيوية اليومية والخطوات والسعرات ومميزات الاستشفاء بالكامل",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7800,
      "caloriesBurned": 390,
      "heartRate": 70,
      "sleepDuration": "7 ساعات و30 دقيقة",
      "spo2": 97,
      "stressLevel": "منخفض (20/100)",
      "hrv": 68
    }
  },
  {
    "id": "garmin_venu_3s",
    "name": "Garmin Venu 3S",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "إصدار أصغر حجماً وتصميم أنيق لمراقبة الصحة والتمارين والخطوات اليومية ونبضات القلب بدقة وعناية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7500,
      "caloriesBurned": 360,
      "heartRate": 71,
      "sleepDuration": "7 ساعات و40 دقيقة",
      "spo2": 97,
      "stressLevel": "منخفض (18/100)"
    }
  },
  {
    "id": "garmin_vivoactive_5",
    "name": "Garmin Vivoactive 5",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "ساعة ذكية للياقة البدنية تقدم إرشادات صحية مخصصة وتتبع النوم والخطوات ومعدل ضربات القلب والسعرات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8100,
      "caloriesBurned": 340,
      "heartRate": 72,
      "sleepDuration": "7 ساعات و15 دقيقة",
      "spo2": 96
    }
  },
  {
    "id": "garmin_forerunner_965",
    "name": "Garmin Forerunner 965",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "ساعة ركض احترافية بشاشة أموليد لتتبع الأداء الهوائي، المسافة، نبضات القلب والتحمل البدني وحساب الجهد",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 14000,
      "caloriesBurned": 720,
      "heartRate": 62,
      "sleepDuration": "7 ساعات و50 دقيقة",
      "spo2": 99,
      "stressLevel": "منخفض (15/100)",
      "hrv": 85,
      "durationMins": 75
    }
  },
  {
    "id": "garmin_forerunner_955",
    "name": "Garmin Forerunner 955",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "ساعة الجري والترياتلون الاحترافية مع ملاحة GPS فائقة الدقة وتتبع مستمر للنشاط ونبضات القلب والجهد",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 13200,
      "caloriesBurned": 680,
      "heartRate": 64,
      "sleepDuration": "7 ساعات و40 دقيقة",
      "spo2": 98,
      "hrv": 80
    }
  },
  {
    "id": "garmin_forerunner_265",
    "name": "Garmin Forerunner 265",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "تتبع تمارين الجري والحديد وحساب جاهزية التدريب والاستشفاء ونبض القلب والخطوات والسعرات التلقائي",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 10500,
      "caloriesBurned": 490,
      "heartRate": 67,
      "sleepDuration": "7 ساعات و20 دقيقة",
      "spo2": 98,
      "hrv": 70
    }
  },
  {
    "id": "garmin_forerunner_255",
    "name": "Garmin Forerunner 255",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "ساعة ركض رياضية موثوقة لمراقبة الأنشطة اليومية وحساب المسافات والسعرات والخطوات ومعدل ضربات القلب",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9800,
      "caloriesBurned": 450,
      "heartRate": 69,
      "sleepDuration": "7 ساعات",
      "spo2": 97,
      "hrv": 65
    }
  },
  {
    "id": "garmin_forerunner_165",
    "name": "Garmin Forerunner 165",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "ساعة ركض اقتصادية بشاشة أموليد لتتبع خطى الجري والتمارين اليومية والخطوات والسعرات والنشاط الحركي",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9200,
      "caloriesBurned": 410,
      "heartRate": 71,
      "sleepDuration": "7 ساعات و10 دقيقة"
    }
  },
  {
    "id": "garmin_epix_pro",
    "name": "Garmin Epix Pro Gen 2",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "ساعة فاخرة بشاشة أموليد ومصباح LED مدمج وتتبع متقدم للمؤشرات البدنية والسعرات ومستوى اللياقة والجهد",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 11500,
      "caloriesBurned": 610,
      "heartRate": 63,
      "sleepDuration": "8 ساعات",
      "spo2": 99,
      "stressLevel": "منخفض جداً (9/100)",
      "hrv": 82
    }
  },
  {
    "id": "garmin_epix_2",
    "name": "Garmin Epix Gen 2",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "ساعة مغامرات فاخرة لتتبع الأنشطة الجبلية والخطوات وحرق السعرات ومزامنة دقيقة لنبض القلب والموقع",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9500,
      "caloriesBurned": 510,
      "heartRate": 66,
      "sleepDuration": "7 ساعات و10 دقيقة",
      "spo2": 98,
      "hrv": 72
    }
  },
  {
    "id": "garmin_instinct_2",
    "name": "Garmin Instinct 2 Solar",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "ساعة مغامرات قوية للغاية تشحن بالطاقة الشمسية وتدعم تتبع ضربات القلب ومميزات الملاحة والخطوات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 12000,
      "caloriesBurned": 560,
      "heartRate": 67,
      "sleepDuration": "7 ساعات و30 دقيقة",
      "spo2": 97,
      "hrv": 70
    }
  },
  {
    "id": "garmin_lily_2",
    "name": "Garmin Lily 2",
    "brand": "Garmin",
    "type": "ساعة ذكية",
    "function": "تصميم أنيق وصغير الحجم مخصص للنساء لمتابعة الصحة والنشاط اليومي والخطوات ونبضات القلب والجهد البدني",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 6800,
      "caloriesBurned": 280,
      "heartRate": 73,
      "sleepDuration": "7 ساعات و10 دقيقة"
    }
  },
  {
    "id": "samsung_watch_ultra",
    "name": "Galaxy Watch Ultra",
    "brand": "Samsung",
    "type": "ساعة ذكية",
    "function": "أقوى ساعات سامسونج الرياضية بهيكل تيتانيوم صلب، تتبع دقيق للمؤشرات البدنية ومستوى الأكسجين والجهد والدهون والعضلات بدقة متناهية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 13000,
      "caloriesBurned": 680,
      "heartRate": 65,
      "sleepDuration": "8 ساعات",
      "spo2": 99,
      "stressLevel": "منخفض جداً (11/100)",
      "hrv": 78,
      "bodyFat": 14.2,
      "muscleMass": 63.8,
      "bmr": 1850
    }
  },
  {
    "id": "samsung_watch_7",
    "name": "Galaxy Watch 7",
    "brand": "Samsung",
    "type": "ساعة ذكية",
    "function": "ساعة الجيل السابع مع مستشعر BioActive المتقدم لتحليل تركيب الجسم بدقة، والخطوات والسعرات ونبض القلب والنوم والجهد البدني",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8800,
      "caloriesBurned": 410,
      "heartRate": 70,
      "sleepDuration": "7 ساعات و20 دقيقة",
      "spo2": 98,
      "stressLevel": "منخفض (18/100)",
      "hrv": 62,
      "bodyFat": 15,
      "muscleMass": 61.2,
      "bmr": 1780
    }
  },
  {
    "id": "samsung_watch_6",
    "name": "Galaxy Watch 6",
    "brand": "Samsung",
    "type": "ساعة ذكية",
    "function": "تحليل تكوين الجسم الذكي ومراقبة ضربات القلب والخطوات والسعرات ومعدل النوم والجهد اليومي مع مستشعرات حيوية دقيقة",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7500,
      "caloriesBurned": 350,
      "heartRate": 75,
      "sleepDuration": "6 ساعات و55 دقيقة",
      "spo2": 96,
      "stressLevel": "معتدل (35/100)",
      "hrv": 50,
      "bodyFat": 15.2,
      "muscleMass": 62
    }
  },
  {
    "id": "samsung_watch_6_classic",
    "name": "Galaxy Watch 6 Classic",
    "brand": "Samsung",
    "type": "ساعة ذكية",
    "function": "تصميم كلاسيكي بحلقة دوارة مع تتبع الأنشطة، معدل ضربات القلب، السعرات ومراقبة النوم مع مستشعر تحليل الدهون والعضلات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7900,
      "caloriesBurned": 370,
      "heartRate": 73,
      "sleepDuration": "7 ساعات",
      "spo2": 98,
      "hrv": 54,
      "bodyFat": 14.8,
      "muscleMass": 62.5
    }
  },
  {
    "id": "samsung_watch_5_pro",
    "name": "Galaxy Watch 5 Pro",
    "brand": "Samsung",
    "type": "ساعة ذكية",
    "function": "ساعة رياضية قوية ببطارية تدوم طويلاً وتتبع متقدم لتمارين الكارديو، الجري ومسار التمارين وتحديد نسبة المياه والدهون",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9800,
      "caloriesBurned": 480,
      "heartRate": 71,
      "sleepDuration": "7 Dynamic Hours",
      "spo2": 97,
      "hrv": 63,
      "bodyFat": 14.5,
      "muscleMass": 63.2
    }
  },
  {
    "id": "samsung_watch_5",
    "name": "Galaxy Watch 5",
    "brand": "Samsung",
    "type": "ساعة ذكية",
    "function": "تتبع اللياقة البدنية اليومية والأنشطة الرياضية ونبض القلب والخطوات والمسافة مع مستشعر قياس الحرارة وتحليل تركيب الجسم",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8100,
      "caloriesBurned": 370,
      "heartRate": 72,
      "sleepDuration": "7 ساعات",
      "spo2": 97,
      "stressLevel": "معتدل (22/100)",
      "hrv": 58
    }
  },
  {
    "id": "samsung_watch_4_classic",
    "name": "Galaxy Watch 4 Classic",
    "brand": "Samsung",
    "type": "ساعة ذكية",
    "function": "إصدار كلاسيكي بحلقة دوارة مع تتبع المؤشرات الحيوية ونبض القلب والخطوات والسعرات وتحليل الدهون والكتلة العضلية والمائية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7800,
      "caloriesBurned": 350,
      "heartRate": 74,
      "sleepDuration": "6 ساعات و50 دقيقة",
      "spo2": 96,
      "stressLevel": "معتدل (25/100)",
      "hrv": 52
    }
  },
  {
    "id": "samsung_watch_4",
    "name": "Galaxy Watch 4",
    "brand": "Samsung",
    "type": "ساعة ذكية",
    "function": "أول ساعة بنظام تشغيل Wear OS من سامسونج تدعم تحليل نسبة الدهون والعضلات بالجسم ومراقبة الخطوات ونبضات القلب والنشاط",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7600,
      "caloriesBurned": 340,
      "heartRate": 75,
      "sleepDuration": "6 ساعات و45 دقيقة",
      "spo2": 96,
      "hrv": 50
    }
  },
  {
    "id": "samsung_watch_fe",
    "name": "Galaxy Watch FE",
    "brand": "Samsung",
    "type": "ساعة ذكية",
    "function": "ساعة ذكية اقتصادية توفر الميزات الأساسية لمراقبة النشاط ونبض القلب والخطوات والسعرات والنوم والتمارين الحيوية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7200,
      "caloriesBurned": 310,
      "heartRate": 76,
      "sleepDuration": "7 ساعات",
      "spo2": 96
    }
  },
  {
    "id": "samsung_fit_3",
    "name": "Galaxy Fit 3",
    "brand": "Samsung",
    "type": "ساعة ذكية",
    "function": "سوار ذكي بشاشة كبيرة وبطارية تصل إلى 13 يوماً لتتبع الخطوات، السعرات، النوم، ونبضات القلب بدقة وأكثر من 100 تمرين",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9400,
      "caloriesBurned": 330,
      "heartRate": 72,
      "sleepDuration": "7 ساعات",
      "spo2": 98,
      "stressLevel": "منخفض (20/100)"
    }
  },
  {
    "id": "samsung_fit_2",
    "name": "Galaxy Fit 2",
    "brand": "Samsung",
    "type": "ساعة ذكية",
    "function": "سوار رياضي خفيف الوزن واقتصادي لتتبع النشاط اليومي والخطوات ومعدل ضربات القلب التلقائي والسعرات والنوم",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8500,
      "caloriesBurned": 290,
      "heartRate": 74,
      "sleepDuration": "6 ساعات و40 دقيقة"
    }
  },
  {
    "id": "huawei_ultimate",
    "name": "Huawei Watch Ultimate",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "ساعة ذكية للمغامرات الفائقة والغوص وتتبع المؤشرات الحيوية كنبضات القلب والجهد والخطوات والسعرات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 11000,
      "caloriesBurned": 520,
      "heartRate": 68,
      "sleepDuration": "7 ساعات و45 دقيقة",
      "spo2": 99,
      "stressLevel": "منخفض (14/100)",
      "hrv": 76
    }
  },
  {
    "id": "huawei_gt4",
    "name": "Huawei Watch GT 4",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "تصميم هندسي جذاب مع إدارة السعرات الحرارية بدقة وتتبع التمارين والأنشطة والخطوات اليومية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9100,
      "caloriesBurned": 430,
      "heartRate": 69,
      "sleepDuration": "7 ساعات و40 دقيقة",
      "spo2": 98,
      "stressLevel": "منخفض (16/100)",
      "hrv": 66
    }
  },
  {
    "id": "huawei_4_pro",
    "name": "Huawei Watch 4 Pro",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "هيكل تيتانيوم فاخر ومراقبة صحية شاملة بلمسة واحدة تتضمن الخطوات، السعرات، والجهد البدني",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8800,
      "caloriesBurned": 400,
      "heartRate": 72,
      "sleepDuration": "7 ساعات و15 دقيقة",
      "spo2": 97,
      "hrv": 64
    }
  },
  {
    "id": "huawei_watch_4",
    "name": "Huawei Watch 4",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "مراقبة المؤشرات الصحية السبعة الأساسية بضغطة زر وتتبع الخطوات ومعدل ضربات القلب والتمارين والسعرات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9000,
      "caloriesBurned": 410,
      "heartRate": 70,
      "sleepDuration": "7 ساعات و10 دقيقة",
      "spo2": 98,
      "stressLevel": "منخفض (18/100)",
      "hrv": 63
    }
  },
  {
    "id": "huawei_gt3_pro",
    "name": "Huawei Watch GT 3 Pro",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "تصميم تيتانيوم وسيراميك وتتبع متقدم لضربات القلب وتشبع الأكسجين وحالة التمارين واللياقة البدنية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9500,
      "caloriesBurned": 440,
      "heartRate": 67,
      "sleepDuration": "7 ساعات و30 دقيقة",
      "spo2": 98,
      "stressLevel": "منخفض (15/100)",
      "hrv": 70
    }
  },
  {
    "id": "huawei_gt3",
    "name": "Huawei Watch GT 3",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "بطارية تدوم طويلاً مع تتبع ضربات القلب ونظام تحديد المواقع العالمي ومستشعر تشبع الأكسجين بالدم",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8300,
      "caloriesBurned": 380,
      "heartRate": 71,
      "sleepDuration": "7 ساعات",
      "spo2": 97,
      "stressLevel": "معتدل (22/100)",
      "hrv": 60
    }
  },
  {
    "id": "huawei_fit_3",
    "name": "Huawei Watch Fit 3",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "تصميم خفيف وأنيق مع تتبع السعرات الحرارية وإدارة الوزن وتتبع ضربات القلب لأكثر من 100 تمرين",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8700,
      "caloriesBurned": 350,
      "heartRate": 72,
      "sleepDuration": "6 ساعات و55 دقيقة",
      "spo2": 98,
      "stressLevel": "منخفض (19/100)",
      "hrv": 58
    }
  },
  {
    "id": "huawei_fit_2",
    "name": "Huawei Watch Fit 2",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "شاشة AMOLED كبيرة مع توجيه تمارين الركض وتتبع نبضات القلب والخطوات والنشاط الرياضي اليومي",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7800,
      "caloriesBurned": 320,
      "heartRate": 73,
      "sleepDuration": "7 ساعات",
      "spo2": 97,
      "stressLevel": "معتدل (24/100)",
      "hrv": 55
    }
  },
  {
    "id": "huawei_fit_se",
    "name": "Huawei Watch Fit Special Edition",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "ساعة ذكية رياضية تدمج تتبع النوم العلمي ومراقبة معدل نبضات القلب وتشبع الأكسجين بالدم بدقة",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7400,
      "caloriesBurned": 290,
      "heartRate": 74,
      "sleepDuration": "6 ساعات و40 دقيقة",
      "spo2": 96,
      "stressLevel": "متوسط (28/100)"
    }
  },
  {
    "id": "huawei_band_9",
    "name": "Huawei Band 9",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "سوار ذكي متطور للغاية ومريح يقدم مراقبة النوم المحسنة وتتبع نبض القلب والخطوات والسعرات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9200,
      "caloriesBurned": 310,
      "heartRate": 73,
      "sleepDuration": "7 ساعات و15 دقيقة",
      "spo2": 98,
      "stressLevel": "منخفض (17/100)",
      "hrv": 62
    }
  },
  {
    "id": "huawei_band_8",
    "name": "Huawei Band 8",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "تصميم فائق النحافة وخفيف الوزن للغاية لتتبع النوم المستمر، دقات القلب، الخطوات والسعرات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8200,
      "caloriesBurned": 300,
      "heartRate": 74,
      "sleepDuration": "6 ساعات و50 دقيقة",
      "hrv": 55
    }
  },
  {
    "id": "huawei_d2",
    "name": "Huawei Watch D2",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "أحدث ساعة مع قياس ضغط الدم التلقائي والنبض ومراقبة المؤشرات الحيوية والصحة والخطوات والسعرات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8100,
      "caloriesBurned": 330,
      "heartRate": 72,
      "sleepDuration": "7 ساعات و5 دقائق",
      "spo2": 98,
      "stressLevel": "منخفض (20/100)",
      "hrv": 65
    }
  },
  {
    "id": "huawei_d",
    "name": "Huawei Watch D",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "ساعة طبية ذكية مجهزة بمضخة هواء صغيرة لقياس ضغط الدم الشرياني ومراقبة نبض القلب والنشاط",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7600,
      "caloriesBurned": 300,
      "heartRate": 75,
      "sleepDuration": "6 ساعات و50 دقيقة",
      "spo2": 97
    }
  },
  {
    "id": "huawei_gt_runner",
    "name": "Huawei Watch GT Runner",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "ساعة ذكية مخصصة للعدائين مع تتبع المسافة وحساب حمل التمرين ومعدل ضربات القلب التلقائي",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 12000,
      "caloriesBurned": 550,
      "heartRate": 64,
      "sleepDuration": "7 ساعات و50 دقيقة",
      "spo2": 99,
      "stressLevel": "منخفض (12/100)",
      "hrv": 78
    }
  },
  {
    "id": "huawei_buds",
    "name": "Huawei Watch Buds",
    "brand": "Huawei",
    "type": "ساعة ذكية",
    "function": "تصميم مبتكر يدمج سماعات لاسلكية داخل الساعة مع تتبع ذكي لنبض القلب والخطوات والسعرات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8000,
      "caloriesBurned": 340,
      "heartRate": 73,
      "sleepDuration": "6 ساعات و45 دقيقة",
      "spo2": 97
    }
  },
  {
    "id": "fitbit_sense_2",
    "name": "Fitbit Sense 2",
    "brand": "Fitbit",
    "type": "ساعة ذكية",
    "function": "قياس التوتر والنشاط البدني والنوم والسعرات والخطوات اليومية ومعدل ضربات القلب ومراقبة الحرارة",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9200,
      "caloriesBurned": 410,
      "heartRate": 74,
      "sleepDuration": "7 ساعات و10 دقيقة",
      "spo2": 97,
      "stressLevel": "متوسط (28/100)",
      "hrv": 58
    }
  },
  {
    "id": "fitbit_sense",
    "name": "Fitbit Sense",
    "brand": "Fitbit",
    "type": "ساعة ذكية",
    "function": "ساعة متطورة لإدارة مستويات التوتر، ومراقبة ضربات القلب وتتبع الخطوات وحرق السعرات مع مستشعر EDA",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8600,
      "caloriesBurned": 380,
      "heartRate": 75,
      "sleepDuration": "6 ساعات و55 دقيقة",
      "spo2": 96,
      "hrv": 55
    }
  },
  {
    "id": "fitbit_charge_6",
    "name": "Fitbit Charge 6",
    "brand": "Fitbit",
    "type": "ساعة ذكية",
    "function": "سوار رياضي ذكي لتتبع نبضات القلب وجلسات التمرين والمسافة الرياضية والخطوات والسعرات والـ GPS المدمج",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8900,
      "caloriesBurned": 380,
      "heartRate": 72,
      "sleepDuration": "6 ساعات و45 دقيقة",
      "spo2": 98,
      "hrv": 61
    }
  },
  {
    "id": "fitbit_charge_5",
    "name": "Fitbit Charge 5",
    "brand": "Fitbit",
    "type": "ساعة ذكية",
    "function": "سوار رياضي مع مستشعرات صحية لقياس دقات القلب، السعرات المحروقة، النوم، والخطوات اليومية بتصميم خفيف",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8300,
      "caloriesBurned": 350,
      "heartRate": 73,
      "sleepDuration": "7 ساعات"
    }
  },
  {
    "id": "fitbit_versa_4",
    "name": "Fitbit Versa 4",
    "brand": "Fitbit",
    "type": "ساعة ذكية",
    "function": "مساعد اللياقة البدنية والتمارين اليومية ومزامنة الخطوات وحرق السعرات مع أكثر من 40 وضع تمرين ومراقبة النشاط",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8100,
      "caloriesBurned": 340,
      "heartRate": 73,
      "sleepDuration": "7 ساعات",
      "spo2": 97,
      "hrv": 56
    }
  },
  {
    "id": "fitbit_versa_3",
    "name": "Fitbit Versa 3",
    "brand": "Fitbit",
    "type": "ساعة ذكية",
    "function": "سوار رياضي بشاشة كبيرة يدعم تتبع تمارين الكارديو، نبض القلب، السعرات، والخطوات طوال اليوم مع نظام تحديد المواقع",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7900,
      "caloriesBurned": 330,
      "heartRate": 74,
      "sleepDuration": "6 ساعات و50 دقيقة"
    }
  },
  {
    "id": "fitbit_luxe",
    "name": "Fitbit Luxe",
    "brand": "Fitbit",
    "type": "ساعة ذكية",
    "function": "سوار صحي أنيق يجمع بين روعة التصميم وتتبع ضربات القلب، السعرات، النوم، والخطوات اليومية بنعومة فائقة",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7600,
      "caloriesBurned": 280,
      "heartRate": 75,
      "sleepDuration": "7 ساعات و5 دقيقة"
    }
  },
  {
    "id": "fitbit_inspire_3",
    "name": "Fitbit Inspire 3",
    "brand": "Fitbit",
    "type": "ساعة ذكية",
    "function": "تتبع النشاط الأساسي، نبض القلب، السعرات، والخطوات طوال اليوم مع بطارية طويلة المدى وتصميم نحيف جداً",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7800,
      "caloriesBurned": 300,
      "heartRate": 75,
      "sleepDuration": "7 ساعات و15 دقيقة",
      "hrv": 52
    }
  },
  {
    "id": "fitbit_inspire_2",
    "name": "Fitbit Inspire 2",
    "brand": "Fitbit",
    "type": "ساعة ذكية",
    "function": "تتبع النشاط اليومي، نبض القلب، السعرات، والخطوات طوال اليوم مع بطارية تدوم حتى 10 أيام",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7200,
      "caloriesBurned": 270,
      "heartRate": 76,
      "sleepDuration": "6 ساعات و45 دقيقة"
    }
  },
  {
    "id": "xiaomi_band_9",
    "name": "Xiaomi Smart Band 9",
    "brand": "Xiaomi",
    "type": "ساعة ذكية",
    "function": "أحدث سوار من شاومي بتصميم تيتانيوم أنيق، دقة قياسات فائقة، بطارية عملاقة، وتتبع النوم والسعرات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9800,
      "caloriesBurned": 340,
      "heartRate": 71,
      "sleepDuration": "7 ساعات و30 دقيقة",
      "spo2": 98,
      "stressLevel": "منخفض (18/100)",
      "hrv": 60
    }
  },
  {
    "id": "xiaomi_band_8",
    "name": "Xiaomi Smart Band 8",
    "brand": "Xiaomi",
    "type": "ساعة ذكية",
    "function": "سوار رياضي اقتصادي متطور لمراقبة الخطوات والسعرات المحروقة وأكثر من 150 وضعاً رياضياً ونبض القلب والسرعة",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9500,
      "caloriesBurned": 320,
      "heartRate": 73,
      "sleepDuration": "7 ساعات و20 دقيقة",
      "spo2": 97,
      "stressLevel": "منخفض (22/100)",
      "hrv": 57
    }
  },
  {
    "id": "xiaomi_band_8_active",
    "name": "Xiaomi Smart Band 8 Active",
    "brand": "Xiaomi",
    "type": "ساعة ذكية",
    "function": "سوار رياضي خفيف جداً بشاشة مستطيلة لقياس المؤشرات اليومية والخطوات والسعرات والنبض بسعر اقتصادي للغاية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8100,
      "caloriesBurned": 280,
      "heartRate": 74,
      "sleepDuration": "6 ساعات و50 دقيقة"
    }
  },
  {
    "id": "xiaomi_watch_2_pro",
    "name": "Xiaomi Watch 2 Pro",
    "brand": "Xiaomi",
    "type": "ساعة ذكية",
    "function": "ساعة ذكية بنظام تشغيل Wear OS من جوجل وهيكل فولاذي متين وتتبع متقدم لتركيبة الجسم والنبض والـ GPS",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8800,
      "caloriesBurned": 420,
      "heartRate": 69,
      "sleepDuration": "7 ساعات",
      "spo2": 98,
      "stressLevel": "منخفض (16/100)",
      "hrv": 64
    }
  },
  {
    "id": "xiaomi_watch_2",
    "name": "Xiaomi Watch 2",
    "brand": "Xiaomi",
    "type": "ساعة ذكية",
    "function": "ساعة ذكية مع Wear OS وشاشة AMOLED متميزة وتتبع المؤشرات البدنية للتمارين الرياضية والسعرات المحروقة والخطوات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8500,
      "caloriesBurned": 390,
      "heartRate": 70,
      "sleepDuration": "7 ساعات و10 دقيقة",
      "spo2": 97,
      "hrv": 61
    }
  },
  {
    "id": "xiaomi_watch_s3",
    "name": "Xiaomi Watch S3",
    "brand": "Xiaomi",
    "type": "ساعة ذكية",
    "function": "ساعة ذكية أنيقة بإطار قابل للتخصيص ومزودة بنظام تحديد المواقع وتتبع نبض القلب والسعرات والأنشطة الرياضية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8300,
      "caloriesBurned": 390,
      "heartRate": 70,
      "sleepDuration": "7 ساعات",
      "spo2": 98,
      "hrv": 60
    }
  },
  {
    "id": "xiaomi_redmi_4",
    "name": "Xiaomi Redmi Watch 4",
    "brand": "Xiaomi",
    "type": "ساعة ذكية",
    "function": "شاشة ضخمة وتتبع للياقة البدنية، قياس الأكسجين في الدم، ضربات القلب، السعرات ومراقبة الخطوات والنوم اليومي",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8600,
      "caloriesBurned": 340,
      "heartRate": 72,
      "sleepDuration": "6 ساعات و30 دقيقة",
      "spo2": 96
    }
  },
  {
    "id": "xiaomi_redmi_3",
    "name": "Xiaomi Redmi Watch 3",
    "brand": "Xiaomi",
    "type": "ساعة ذكية",
    "function": "شاشة AMOLED واضحة ومكالمات بلوتوث مع تتبع نبض القلب والخطوات والسعرات وأكثر من 120 وضعاً رياضياً",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7900,
      "caloriesBurned": 310,
      "heartRate": 74,
      "sleepDuration": "7 ساعات"
    }
  },
  {
    "id": "xiaomi_redmi_3_active",
    "name": "Xiaomi Redmi Watch 3 Active",
    "brand": "Xiaomi",
    "type": "ساعة ذكية",
    "function": "شاشة كبيرة 1.83 بوصة وتتبع ذكي لنبض القلب والخطوات اليومية والسعرات المحروقة بسعر اقتصادي مبهر",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7600,
      "caloriesBurned": 290,
      "heartRate": 75,
      "sleepDuration": "6 ساعات و40 دقيقة"
    }
  },
  {
    "id": "xiaomi_band_7",
    "name": "Xiaomi Mi Smart Band 7",
    "brand": "Xiaomi",
    "type": "ساعة ذكية",
    "function": "الجيل الكلاسيكي لسلسلة شاومي يتتبع تشبع الأكسجين، نبض القلب، النوم، والخطوات اليومية بكفاءة بطارية عالية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8200,
      "caloriesBurned": 290,
      "heartRate": 73,
      "sleepDuration": "7 ساعات"
    }
  },
  {
    "id": "xiaomi_band_7_pro",
    "name": "Xiaomi Smart Band 7 Pro",
    "brand": "Xiaomi",
    "type": "ساعة ذكية",
    "function": "سوار ذكي بتصميم ساعة يد أنيق مع نظام تحديد مواقع GPS مدمج وتتبع دقات القلب والخطوات وحرق السعرات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8400,
      "caloriesBurned": 310,
      "heartRate": 72,
      "sleepDuration": "6 ساعات و50 دقيقة",
      "spo2": 97
    }
  },
  {
    "id": "amazfit_balance",
    "name": "Amazfit Balance",
    "brand": "Amazfit",
    "type": "ساعة ذكية",
    "function": "ساعة صحية رائدة تقوم بتحليل التوازن الجسدي والذهني، وقياس تكوين الجسم (العضلات والدهون)، ونبض القلب والسعرات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9200,
      "caloriesBurned": 430,
      "heartRate": 68,
      "sleepDuration": "7 ساعات و45 دقيقة",
      "spo2": 98,
      "stressLevel": "منخفض (14/100)",
      "hrv": 72,
      "bodyFat": 14.8,
      "muscleMass": 62.5
    }
  },
  {
    "id": "amazfit_gtr_4",
    "name": "Amazfit GTR 4",
    "brand": "Amazfit",
    "type": "ساعة ذكية",
    "function": "ساعة ذكية بنظام تحديد مواقع ثنائي النطاق وأكثر من 150 وضعاً رياضياً وتتبع ضربات القلب المستمر والخطوات والسعرات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8900,
      "caloriesBurned": 390,
      "heartRate": 71,
      "sleepDuration": "7 ساعات و15 دقيقة",
      "spo2": 98,
      "hrv": 63
    }
  },
  {
    "id": "amazfit_gtr_3_pro",
    "name": "Amazfit GTR 3 Pro",
    "brand": "Amazfit",
    "type": "ساعة ذكية",
    "function": "شاشة Ultra HD AMOLED فائقة الوضوح مع قياس 4 مؤشرات صحية بلمسة واحدة وتتبع نبضات القلب والخطوات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8100,
      "caloriesBurned": 360,
      "heartRate": 73,
      "sleepDuration": "7 ساعات",
      "spo2": 97
    }
  },
  {
    "id": "amazfit_gts_4",
    "name": "Amazfit GTS 4",
    "brand": "Amazfit",
    "type": "ساعة ذكية",
    "function": "تصميم أنيق ورفيع للغاية مع تتبع للأنشطة الرياضية والكارديو والخطوات وحرق السعرات الحرارية بدقة عالية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8300,
      "caloriesBurned": 350,
      "heartRate": 72,
      "sleepDuration": "6 ساعات و55 دقيقة",
      "spo2": 98
    }
  },
  {
    "id": "amazfit_gts_4_mini",
    "name": "Amazfit GTS 4 Mini",
    "brand": "Amazfit",
    "type": "ساعة ذكية",
    "function": "ساعة رياضية خفيفة وصغيرة الحجم توفر تتبعاً طوال اليوم لضربات القلب والخطوات والسعرات والنوم بدقة متناهية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7600,
      "caloriesBurned": 290,
      "heartRate": 74,
      "sleepDuration": "7 ساعات"
    }
  },
  {
    "id": "amazfit_cheetah_pro",
    "name": "Amazfit Cheetah Pro",
    "brand": "Amazfit",
    "type": "ساعة ذكية",
    "function": "ساعة ركض احترافية خفيفة للغاية مع تكنولوجيا تحديد المواقع بنظام ريادي وحساب جهد الكارديو وحمل التمرين",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 13500,
      "caloriesBurned": 610,
      "heartRate": 63,
      "sleepDuration": "7 ساعات و40 دقيقة",
      "spo2": 99,
      "hrv": 78
    }
  },
  {
    "id": "amazfit_falcon",
    "name": "Amazfit Falcon",
    "brand": "Amazfit",
    "type": "ساعة ذكية",
    "function": "ساعة مغامرات فاخرة من التيتانيوم مصممة للتدريب الرياضي المتعدد وقياس نبض القلب والمسافة وحرق السعرات والسرعة",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 11800,
      "caloriesBurned": 550,
      "heartRate": 65,
      "sleepDuration": "8 ساعات",
      "spo2": 98,
      "hrv": 75
    }
  },
  {
    "id": "amazfit_active",
    "name": "Amazfit Active",
    "brand": "Amazfit",
    "type": "ساعة ذكية",
    "function": "ساعة أنيقة وعصرية تقدم خطط تدريب مخصصة بالذكاء الاصطناعي وتتبع الخطوات والسعرات والمسافة وحالة الجسم",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8500,
      "caloriesBurned": 340,
      "heartRate": 72,
      "sleepDuration": "7 ساعات و10 دقيقة"
    }
  },
  {
    "id": "amazfit_trex_ultra",
    "name": "Amazfit T-Rex Ultra",
    "brand": "Amazfit",
    "type": "ساعة ذكية",
    "function": "ساعة المغامرات القاسية المقاومة للماء والحرارة مع نظام تحديد مواقع GPS خارق وتتبع نبض القلب والخطوات والجهد",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 12500,
      "caloriesBurned": 590,
      "heartRate": 66,
      "sleepDuration": "7 ساعات و50 دقيقة",
      "spo2": 98,
      "hrv": 70
    }
  },
  {
    "id": "amazfit_trex_2",
    "name": "Amazfit T-Rex 2",
    "brand": "Amazfit",
    "type": "ساعة ذكية",
    "function": "ساعة رياضية متينة فائقة القوة ومقاومة للصدمات لمراقبة التمارين الخارجية والخطوات والسعرات والأنشطة اليومية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 12000,
      "caloriesBurned": 580,
      "heartRate": 69,
      "sleepDuration": "7 ساعات و30 دقيقة",
      "hrv": 68
    }
  },
  {
    "id": "amazfit_bip_5",
    "name": "Amazfit Bip 5",
    "brand": "Amazfit",
    "type": "ساعة ذكية",
    "function": "شاشة كبيرة وتتبع للياقة البدنية والمؤشرات الحيوية اليومية والخطوات والسعرات بسعر اقتصادي جداً ومكالمات بلوتوث",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7200,
      "caloriesBurned": 310,
      "heartRate": 75,
      "sleepDuration": "6 ساعات و40 دقيقة",
      "hrv": 49
    }
  },
  {
    "id": "amazfit_bip_5_unity",
    "name": "Amazfit Bip 5 Unity",
    "brand": "Amazfit",
    "type": "ساعة ذكية",
    "function": "نسخة رياضية معدلة بهيكل ألومنيوم أنيق وتتبع الأنشطة اليومية والخطوات ونبض القلب وحرق السعرات بدقة ممتازة",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7400,
      "caloriesBurned": 320,
      "heartRate": 74,
      "sleepDuration": "6 ساعات و50 دقيقة"
    }
  },
  {
    "id": "polar_vantage_v3",
    "name": "Polar Vantage V3",
    "brand": "Polar",
    "type": "ساعة ذكية",
    "function": "ساعة رياضية احترافية متعددة الرياضات لقياس التعب العضلي، معدل دقات القلب ومزامنة السعرات وحمل التمارين بدقة فائقة",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 11500,
      "caloriesBurned": 600,
      "heartRate": 63,
      "sleepDuration": "8 ساعات و10 دقيقة",
      "spo2": 99,
      "stressLevel": "منخفض جداً (9/100)",
      "hrv": 88
    }
  },
  {
    "id": "polar_vantage_v2",
    "name": "Polar Vantage V2",
    "brand": "Polar",
    "type": "ساعة ذكية",
    "function": "ساعة الجري والترياتلون الاحترافية تساعد الرياضيين على اختبار الأداء والجهد ومراقبة ضربات القلب والاستشفاء",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 10800,
      "caloriesBurned": 560,
      "heartRate": 65,
      "sleepDuration": "7 ساعات و50 دقيقة",
      "hrv": 80
    }
  },
  {
    "id": "polar_vantage_m3",
    "name": "Polar Vantage M3",
    "brand": "Polar",
    "type": "ساعة ذكية",
    "function": "ساعة رياضية متعددة الاستخدامات تقدم توجيهات تدريبية ذكية وتتبعاً متقدماً لنبض القلب والخطوات والسعرات والنوم اليومي",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9500,
      "caloriesBurned": 470,
      "heartRate": 68,
      "sleepDuration": "7 ساعات و30 دقيقة",
      "hrv": 72
    }
  },
  {
    "id": "polar_grit_x2",
    "name": "Polar Grit X2 Pro",
    "brand": "Polar",
    "type": "ساعة ذكية",
    "function": "ساعة التدريبات الخارجية والمغامرات مبنية بمعايير عسكرية لتتبع الخطوات، المسافات، نبض القلب، السعرات، وحمل التمرين القاسي",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 12500,
      "caloriesBurned": 620,
      "heartRate": 64,
      "sleepDuration": "7 ساعات و55 دقيقة",
      "spo2": 98,
      "hrv": 82
    }
  },
  {
    "id": "polar_grit_x_pro",
    "name": "Polar Grit X Pro",
    "brand": "Polar",
    "type": "ساعة ذكية",
    "function": "ساعة تدريب خارجية فائقة المتانة لتتبع الكارديو، الجري، ونبض القلب والخطوات والمسافات والتحمل البدني بدقة متناهية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 11800,
      "caloriesBurned": 580,
      "heartRate": 66,
      "sleepDuration": "7 ساعات و40 دقيقة",
      "hrv": 78
    }
  },
  {
    "id": "polar_ignite_3",
    "name": "Polar Ignite 3",
    "brand": "Polar",
    "type": "ساعة ذكية",
    "function": "ساعة لياقة بدنية وتوجيه للتمارين اليومية المخصصة وتتبع دقيق للخطوات ومعدل ضربات القلب اليومي والنوم لتحديد طاقة الجسم",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8000,
      "caloriesBurned": 350,
      "heartRate": 68,
      "sleepDuration": "7 ساعات و25 دقيقة",
      "hrv": 72
    }
  },
  {
    "id": "polar_pacer_pro",
    "name": "Polar Pacer Pro",
    "brand": "Polar",
    "type": "ساعة ذكية",
    "function": "ساعة جري فائقة الخفة مزودة بنظام تحديد المواقع وتتبع الأداء ومستوى استهلاك الأكسجين ومعدل ضربات القلب التلقائي والسعرات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 11200,
      "caloriesBurned": 530,
      "heartRate": 65,
      "sleepDuration": "7 ساعات و15 دقيقة",
      "hrv": 75
    }
  },
  {
    "id": "polar_unite",
    "name": "Polar Unite",
    "brand": "Polar",
    "type": "ساعة ذكية",
    "function": "ساعة لياقة بدنية بسيطة واقتصادية تركز على تتبع التمارين اليومية والخطوات والسعرات ومعدل النوم ونبضات القلب الكارديو",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7500,
      "caloriesBurned": 310,
      "heartRate": 72,
      "sleepDuration": "7 ساعات"
    }
  },
  {
    "id": "suunto_vertical",
    "name": "Suunto Vertical",
    "brand": "Suunto",
    "type": "ساعة ذكية",
    "function": "ساعة مغامرات خارجية مدعومة بالشحن الشمسي، تتبع الخطوات والسعرات ومعدل النبض في أقسى الظروف والخرائط بدون إنترنت",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 13000,
      "caloriesBurned": 680,
      "heartRate": 65,
      "sleepDuration": "7 ساعات و55 دقيقة",
      "spo2": 98,
      "hrv": 78
    }
  },
  {
    "id": "suunto_race",
    "name": "Suunto Race",
    "brand": "Suunto",
    "type": "ساعة ذكية",
    "function": "شاشة أموليد متطورة لتتبع أداء السباقات والتمارين وحساب وقت الاستشفاء ونبض القلب والخطوات والسعرات المحروقة بالتفصيل",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 10500,
      "caloriesBurned": 540,
      "heartRate": 67,
      "sleepDuration": "7 ساعات و40 دقيقة",
      "hrv": 74
    }
  },
  {
    "id": "suunto_race_s",
    "name": "Suunto Race S",
    "brand": "Suunto",
    "type": "ساعة ذكية",
    "function": "نسخة أصغر حجماً وأخف وزناً ومثالية للسباقات والركض السريع مع تتبع نبضات القلب والخطوات والسعرات بدقة عالية",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 10200,
      "caloriesBurned": 510,
      "heartRate": 68,
      "sleepDuration": "7 ساعات و30 دقيقة",
      "hrv": 72
    }
  },
  {
    "id": "suunto_ocean",
    "name": "Suunto Ocean",
    "brand": "Suunto",
    "type": "ساعة ذكية",
    "function": "ساعة ذكية متكاملة تجمع بين تتبع الرياضة اليومية والغوص الترفيهي وتتبع نبض القلب والخطوات والسعرات ومعدل تشبع الأكسجين",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 9500,
      "caloriesBurned": 480,
      "heartRate": 69,
      "sleepDuration": "7 ساعات و20 دقيقة",
      "spo2": 98,
      "hrv": 70
    }
  },
  {
    "id": "suunto_9_peak",
    "name": "Suunto 9 Peak Pro",
    "brand": "Suunto",
    "type": "ساعة ذكية",
    "function": "ساعة رياضية فائقة النحافة وبطارية طويلة جداً تتبع نبض القلب، السعرات المحروقة، النوم، والخطوات اليومية بمثالية متكاملة",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 11000,
      "caloriesBurned": 520,
      "heartRate": 66,
      "sleepDuration": "7 ساعات و10 دقيقة",
      "hrv": 71
    }
  },
  {
    "id": "suunto_5_peak",
    "name": "Suunto 5 Peak",
    "brand": "Suunto",
    "type": "ساعة ذكية",
    "function": "ساعة رياضية مدمجة وخفيفة الوزن تدعم تتبع النوم والخطوات والسعرات ومعدل ضربات القلب للأنشطة والكارديو اليومي",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8200,
      "caloriesBurned": 360,
      "heartRate": 72,
      "sleepDuration": "7 ساعات"
    }
  },
  {
    "id": "suunto_3",
    "name": "Suunto 3",
    "brand": "Suunto",
    "type": "ساعة ذكية",
    "function": "ساعة لياقة بدنية مصممة لتتبع الأنشطة اليومية وتقديم إرشادات تدريبية تكيفية ذكية بناءً على معدل نبض القلب والخطوات",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7500,
      "caloriesBurned": 290,
      "heartRate": 74,
      "sleepDuration": "6 ساعات و50 دقيقة"
    }
  },
  {
    "id": "withings_scanwatch_2",
    "name": "Withings ScanWatch 2",
    "brand": "Withings",
    "type": "ساعة ذكية",
    "function": "ساعة هجينة كلاسيكية فاخرة تقدم تتبعاً طبياً لدرجة حرارة الجسم ومعدل ضربات القلب والخطوات والسعرات ومخطط القلب ECG",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8100,
      "caloriesBurned": 320,
      "heartRate": 70,
      "sleepDuration": "7 ساعات و25 دقيقة",
      "spo2": 98,
      "hrv": 60
    }
  },
  {
    "id": "withings_scanwatch_nova",
    "name": "Withings ScanWatch Nova",
    "brand": "Withings",
    "type": "ساعة ذكية",
    "function": "ساعة غوص كلاسيكية هجينة فاخرة مع مستشعرات صحية متقدمة لتتبع النشاط، الخطوات، السعرات، والجهد البدني اليومي",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 8300,
      "caloriesBurned": 340,
      "heartRate": 69,
      "sleepDuration": "7 ساعات و30 دقيقة",
      "spo2": 98
    }
  },
  {
    "id": "withings_scanwatch_light",
    "name": "Withings ScanWatch Light",
    "brand": "Withings",
    "type": "ساعة ذكية",
    "function": "ساعة هجينة أنيقة وبسيطة تركز على المؤشرات الحيوية الأساسية وتتبع الخطوات والسعرات اليومية ومعدل النوم بنعومة",
    "icon": "watch",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "steps": 7300,
      "caloriesBurned": 260,
      "heartRate": 73,
      "sleepDuration": "7 ساعات"
    }
  },
  {
    "id": "withings_body_scan",
    "name": "Withings Body Scan",
    "brand": "Withings",
    "type": "ميزان ذكي",
    "function": "قياس دقيق جداً للوزن وتكوين الجسم (العضلات، الدهون، الماء) ومعدل ضربات القلب وسرعة موجة النبض وتخطيط القلب الكهربائي",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 78.4,
      "bodyFat": 14.5,
      "muscleMass": 63.2,
      "bodyWater": 58.6,
      "boneMass": 3.4,
      "visceralFat": 4,
      "bmr": 1840
    }
  },
  {
    "id": "withings_body_smart",
    "name": "Withings Body Smart",
    "brand": "Withings",
    "type": "ميزان ذكي",
    "function": "مزامنة تلقائية للوزن وتحديد مؤشر كتلة الجسم ونسبة دهون الجسم والكتلة العضلية والمائية اليومية عبر الواي فاي",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 77.9,
      "bodyFat": 15.2,
      "muscleMass": 62,
      "bodyWater": 57.8,
      "boneMass": 3.3,
      "visceralFat": 5,
      "bmr": 1810
    }
  },
  {
    "id": "withings_body_comp",
    "name": "Withings Body Comp",
    "brand": "Withings",
    "type": "ميزان ذكي",
    "function": "تحليل متقدم لتكوين الجسم وتحديد دهون الأحشاء ونسبة العضلات الكلية والوزن مع مزامنة سحابية وتتبع صحة الأعصاب",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 76.8,
      "bodyFat": 14.8,
      "muscleMass": 62.5,
      "bodyWater": 58.1,
      "boneMass": 3.3,
      "visceralFat": 4,
      "bmr": 1790
    }
  },
  {
    "id": "withings_body_cardio",
    "name": "Withings Body Cardio",
    "brand": "Withings",
    "type": "ميزان ذكي",
    "function": "ميزان متطور لمراقبة صحة القلب والشرايين وقياس تكوين كتلة الجسم والدهون والعضلات وتحديثها تلقائياً بالواي فاي",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 79.1,
      "bodyFat": 16.5,
      "muscleMass": 61.2,
      "bodyWater": 56.4,
      "boneMass": 3.2,
      "visceralFat": 6,
      "bmr": 1780
    }
  },
  {
    "id": "withings_body_scale",
    "name": "Withings Body Scale",
    "brand": "Withings",
    "type": "ميزان ذكي",
    "function": "ميزان ذكي أساسي لقياس الوزن ومؤشر كتلة الجسم ونقل البيانات سحابياً لتتبع التطور الأسبوعي للوزن",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 75,
      "bodyFat": 18,
      "bmr": 1650
    }
  },
  {
    "id": "xiaomi_scale_2",
    "name": "Xiaomi Mi Composition Scale 2",
    "brand": "Xiaomi",
    "type": "ميزان ذكي",
    "function": "قياس 13 مؤشراً حيوياً للجسم بما في ذلك الوزن ونسبة الدهون والكتلة العضلية وتوازن الجسم تلقائياً وتحديثها بالهاتف",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 75.2,
      "bodyFat": 18.2,
      "muscleMass": 58.4,
      "bodyWater": 59.5,
      "boneMass": 3,
      "visceralFat": 7,
      "bmr": 1680
    }
  },
  {
    "id": "xiaomi_scale_basic",
    "name": "Xiaomi Mi Smart Scale 2",
    "brand": "Xiaomi",
    "type": "ميزان ذكي",
    "function": "ميزان ذكي اقتصادي للوزن ومؤشر كتلة الجسم مع استشعار التغيرات الطفيفة جداً بدقة عالية ونقل البيانات بالبلوتوث",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 74.5,
      "bodyFat": 18.9,
      "bmr": 1640
    }
  },
  {
    "id": "xiaomi_scale_s400",
    "name": "Xiaomi Body Composition Scale S400",
    "brand": "Xiaomi",
    "type": "ميزان ذكي",
    "function": "استشعار مزدوج التردد لقياس دقيق ومقاومة كهربائية حيوية شاملة للدهون والعضلات والماء ومعدل النبض والمؤشرات الحيوية",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 76.1,
      "bodyFat": 17.5,
      "muscleMass": 59.8,
      "bodyWater": 58.2,
      "boneMass": 3.1,
      "visceralFat": 6,
      "bmr": 1710
    }
  },
  {
    "id": "xiaomi_scale_s300",
    "name": "Xiaomi Smart Scale S300",
    "brand": "Xiaomi",
    "type": "ميزان ذكي",
    "function": "ميزان ذكي لقياس الوزن والدهون الأساسية مع تتبع المؤشرات البدنية الأساسية وبطارية طويلة المدى وتصميم عصري",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 74,
      "bodyFat": 18.5,
      "bmr": 1620
    }
  },
  {
    "id": "eufy_scale_p3",
    "name": "Eufy Smart Scale P3",
    "brand": "Eufy",
    "type": "ميزان ذكي",
    "function": "تحليل ثلاثي الأبعاد للجسم والوزن ومعدل ضربات القلب ومستوى الدهون والعضلات ومزامنة الواي فاي التلقائية وشاشة ملونة",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 74.8,
      "bodyFat": 16.2,
      "muscleMass": 59.1,
      "bodyWater": 60.1,
      "boneMass": 3.1,
      "visceralFat": 5,
      "bmr": 1700
    }
  },
  {
    "id": "eufy_scale_c1",
    "name": "Eufy Smart Scale C1",
    "brand": "Eufy",
    "type": "ميزان ذكي",
    "function": "ميزان ذكي مدمج يقيس 12 مؤشراً حيوياً للجسم بما في ذلك الوزن ومعدل الدهون عبر البلوتوث وتوافق مع الهواتف الذكية",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 73.2,
      "bodyFat": 17.8,
      "muscleMass": 57,
      "bodyWater": 58.4,
      "boneMass": 2.9,
      "visceralFat": 6,
      "bmr": 1620
    }
  },
  {
    "id": "eufy_scale_p2_pro",
    "name": "Eufy Smart Scale P2 Pro",
    "brand": "Eufy",
    "type": "ميزان ذكي",
    "function": "ميزان شامل للوزن، الدهون، العضلات، ومعدل الاستقلاب الأساسي ومؤشر جودة الجسم مع نموذج ثلاثي الأبعاد بالبلوتوث والواي فاي",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 75.9,
      "bodyFat": 15.8,
      "muscleMass": 60.5,
      "bodyWater": 59.2,
      "boneMass": 3.2,
      "visceralFat": 5,
      "bmr": 1735
    }
  },
  {
    "id": "eufy_scale_p2",
    "name": "Eufy Smart Scale P2",
    "brand": "Eufy",
    "type": "ميزان ذكي",
    "function": "ميزان ذكي دقيق لقياس نسبة الدهون والوزن والعضلات ومزامنة سريعة وتحديد كمية المياه والدهون الحشوية بالجسم",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 75.2,
      "bodyFat": 16.5,
      "muscleMass": 59.8,
      "bodyWater": 58.6,
      "boneMass": 3.1,
      "visceralFat": 5,
      "bmr": 1710
    }
  },
  {
    "id": "eufy_scale_a1",
    "name": "Eufy Smart Scale A1",
    "brand": "Eufy",
    "type": "ميزان ذكي",
    "function": "ميزان ذكي مبسط وفعال لقياس الوزن ونسبة الدهون ومؤشر كتلة الجسم مع ربط تلقائي بلوتوث لـ 16 مستخدماً",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 72.8,
      "bodyFat": 18.5,
      "bmr": 1600
    }
  },
  {
    "id": "garmin_index_s2",
    "name": "Garmin Index S2",
    "brand": "Garmin",
    "type": "ميزان ذكي",
    "function": "ميزان ذكي احترافي يتصل بالواي فاي لتتبع الوزن واتجاهات تغير الوزن ونسبة الدهون والكتلة العضلية والمائية بالتنسيق مع ساعات جارمن",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 77.2,
      "bodyFat": 15,
      "muscleMass": 61.8,
      "bodyWater": 58.9,
      "boneMass": 3.3,
      "visceralFat": 4,
      "bmr": 1795
    }
  },
  {
    "id": "huawei_scale_3",
    "name": "Huawei Scale 3",
    "brand": "Huawei",
    "type": "ميزان ذكي",
    "function": "مراقبة الوزن ونسبة الدهون في الجسم والحصول على تحليل مفصل لتكوين الجسم عبر الواي فاي والبلوتوث",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 76.5,
      "bodyFat": 17.2,
      "muscleMass": 59.2,
      "bodyWater": 58.5,
      "boneMass": 3.1,
      "visceralFat": 6,
      "bmr": 1715
    }
  },
  {
    "id": "huawei_scale_3_pro",
    "name": "Huawei Scale 3 Pro",
    "brand": "Huawei",
    "type": "ميزان ذكي",
    "function": "ميزان ذكي بثمانية أقطاب يقيس بدقة تكوين أطراف الجسم المنفصلة (الذراعين، الساقين، الجذع) بالكامل ونسبة دهون الأحشاء",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 78.1,
      "bodyFat": 14.2,
      "muscleMass": 63.5,
      "bodyWater": 60.2,
      "boneMass": 3.4,
      "visceralFat": 4,
      "bmr": 1850
    }
  },
  {
    "id": "huawei_scale_3_bt",
    "name": "Huawei Scale 3 Bluetooth Edition",
    "brand": "Huawei",
    "type": "ميزان ذكي",
    "function": "ميزان ذكي يقيس مؤشر كتلة الجسم ونسبة دهون الجسم وتكوينه الأساسي ونقل البيانات بالبلوتوث تلقائياً للهواتف الذكية",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 75.8,
      "bodyFat": 17.8,
      "muscleMass": 58.9,
      "bodyWater": 58.1,
      "boneMass": 3,
      "visceralFat": 6,
      "bmr": 1700
    }
  },
  {
    "id": "huawei_scale_2_pro",
    "name": "Huawei Smart Body Fat Scale 2 Pro",
    "brand": "Huawei",
    "type": "ميزان ذكي",
    "function": "ميزان متطور بثمانية أقطاب لتحليل دقيق لتركيبة الجسم ونسبة الدهون والعضلات في الأطراف والجذع بالتفصيل الرياضي",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 78.5,
      "bodyFat": 14,
      "muscleMass": 63.8,
      "bodyWater": 60.5,
      "boneMass": 3.4,
      "visceralFat": 4,
      "bmr": 1860
    }
  },
  {
    "id": "fitbit_aria_air",
    "name": "Fitbit Aria Air",
    "brand": "Fitbit",
    "type": "ميزان ذكي",
    "function": "ميزان بلوتوث ذكي يتزامن مباشرة مع تطبيق فيتبيت لتتبع الوزن وحساب مؤشر كتلة الجسم التلقائي لتقدم أهدافك",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 73.8,
      "bodyFat": 19.5,
      "bmr": 1610
    }
  },
  {
    "id": "fitbit_aria_2",
    "name": "Fitbit Aria 2 Wi-Fi Smart Scale",
    "brand": "Fitbit",
    "type": "ميزان ذكي",
    "function": "ميزان ذكي يتصل بالواي فاي لقياس الوزن ونسبة دهون الجسم والكتلة العضلية وتحديثها تلقائياً بالهاتف",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 74.2,
      "bodyFat": 18.5,
      "muscleMass": 58,
      "bodyWater": 57.5,
      "bmr": 1630
    }
  },
  {
    "id": "renpho_smart_scale",
    "name": "Renpho Smart Body Fat Scale",
    "brand": "Renpho",
    "type": "ميزان ذكي",
    "function": "ميزان ذكي شهير عالمياً يقيس 13 بياناً للجسم والوزن ويتوافق مع تطبيقات الصحة للهواتف الذكية وساعات اليد",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 75,
      "bodyFat": 17.5,
      "muscleMass": 58.5,
      "bodyWater": 59.1,
      "boneMass": 3.1,
      "visceralFat": 6,
      "bmr": 1690
    }
  },
  {
    "id": "beurer_bf_1000",
    "name": "Beurer BF 1000",
    "brand": "Beurer",
    "type": "ميزان ذكي",
    "function": "ميزان ألماني احترافي للغاية لتحليل الجسم بالكامل مع شاشة مرتفعة على حامل وقياس دقيق للأطراف والعضلات والدهون بدقة طبية",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 80.2,
      "bodyFat": 13.8,
      "muscleMass": 65.4,
      "bodyWater": 61.2,
      "boneMass": 3.6,
      "visceralFat": 4,
      "bmr": 1890
    }
  },
  {
    "id": "beurer_bf_720",
    "name": "Beurer BF 720",
    "brand": "Beurer",
    "type": "ميزان ذكي",
    "function": "ميزان قياس الوزن والدهون وتكوين العضلات مع نقل البيانات بالبلوتوث وتصنيف النشاط البدني للقياس اليومي وتخزين النتائج",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 79.5,
      "bodyFat": 15.5,
      "muscleMass": 63,
      "bodyWater": 58.8,
      "boneMass": 3.4,
      "visceralFat": 5,
      "bmr": 1835
    }
  },
  {
    "id": "beurer_bf_950",
    "name": "Beurer BF 950",
    "brand": "Beurer",
    "type": "ميزان ذكي",
    "function": "ميزان تشخيصي راقي ومزود بإضاءة LED ملونة لتوضيح مدى مطابقة مؤشرات جسمك لأهدافك الصحية مع بلوتوث متكامل",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 76.8,
      "bodyFat": 16,
      "muscleMass": 60.2,
      "bodyWater": 59,
      "boneMass": 3.2,
      "visceralFat": 5,
      "bmr": 1750
    }
  },
  {
    "id": "beurer_bf_600",
    "name": "Beurer BF 600",
    "brand": "Beurer",
    "type": "ميزان ذكي",
    "function": "ميزان تشخيصي مدمج لنقل وتتبع قيم وزن الجسم ونسبة الدهون والعضلات للهاتف عبر البلوتوث وتصميم زجاجي رائع",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 75.1,
      "bodyFat": 17,
      "muscleMass": 58.5,
      "bodyWater": 58.2,
      "bmr": 1680
    }
  },
  {
    "id": "beurer_bf_180",
    "name": "Beurer BF 180",
    "brand": "Beurer",
    "type": "ميزان ذكي",
    "function": "ميزان طبي بسيط وعصري يقيس تكوين الجسم والوزن والدهون الاستقلابية وحساب مؤشر كتلة الجسم على شاشة مضاءة زرقاء",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 74,
      "bodyFat": 17.5,
      "bmr": 1640
    }
  },
  {
    "id": "amazfit_scale",
    "name": "Amazfit Smart Scale",
    "brand": "Amazfit",
    "type": "ميزان ذكي",
    "function": "يقيس الوزن والدهون والعضلات ويقوم بمراقبة معدل ضربات القلب واقفاً مع تحليل التوازن الجسدي والمؤشرات الحيوية بالبلوتوث والواي فاي",
    "icon": "scale",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "weight": 75.9,
      "bodyFat": 16.5,
      "muscleMass": 59.8,
      "bodyWater": 59.1,
      "boneMass": 3.2,
      "visceralFat": 5,
      "bmr": 1720
    }
  },
  {
    "id": "polar_h10",
    "name": "Polar H10 Heart Rate Sensor",
    "brand": "Polar",
    "type": "حزام نبضات القلب",
    "function": "أدق حزام قياس لنبضات القلب والجهد البدني لمزامنة حرق السعرات بكارديو اللياقة العالي والحديد والرياضات العنيفة",
    "icon": "heart",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "heartRate": 135,
      "caloriesBurned": 450,
      "effortLevel": "شديد (85%)",
      "hrv": 82
    }
  },
  {
    "id": "polar_verity",
    "name": "Polar Verity Sense",
    "brand": "Polar",
    "type": "حزام نبضات القلب",
    "function": "حزام ذراع ضوئي مرن لقياس نبضات القلب ومستوى الجهد وعدد السعرات وتتبع أداء التمارين البدنية والكارديو والسباحة",
    "icon": "heart",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "heartRate": 130,
      "caloriesBurned": 410,
      "effortLevel": "متوسط (72%)",
      "hrv": 74
    }
  },
  {
    "id": "polar_h9",
    "name": "Polar H9 Heart Rate Sensor",
    "brand": "Polar",
    "type": "حزام نبضات القلب",
    "function": "حزام صدر رياضي موثوق لتتبع معدل ضربات القلب والسعرات التقديرية بدقة ممتازة للتمارين المنزلية والخارجية",
    "icon": "heart",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "heartRate": 125,
      "caloriesBurned": 390,
      "effortLevel": "معتدل (68%)",
      "hrv": 70
    }
  },
  {
    "id": "garmin_hrm_pro",
    "name": "Garmin HRM-Pro Plus",
    "brand": "Garmin",
    "type": "حزام نبضات القلب",
    "function": "حزام صدر متقدم يقيس ديناميكيات الجري وضربات القلب ومزامنة السعرات ومميزات الجري المتقدمة وحمل التدريب للرياضيين",
    "icon": "heart",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "heartRate": 140,
      "caloriesBurned": 480,
      "effortLevel": "أقصى جهد (92%)",
      "hrv": 85
    }
  },
  {
    "id": "garmin_hrm_dual",
    "name": "Garmin HRM-Dual",
    "brand": "Garmin",
    "type": "حزام نبضات القلب",
    "function": "حزام نبضات قلب كلاسيكي يرسل البيانات عبر البلوتوث وANT+ لتمارين الكارديو واللياقة اليومية والحديد بكفاءة عالية",
    "icon": "heart",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "heartRate": 120,
      "caloriesBurned": 350,
      "effortLevel": "خفيف (60%)",
      "hrv": 68
    }
  },
  {
    "id": "garmin_hrm_swim",
    "name": "Garmin HRM-Swim",
    "brand": "Garmin",
    "type": "حزام نبضات القلب",
    "function": "حزام صدر رياضي لا ينزلق مصمم خصيصاً للسباحين لتتبع ضربات القلب وحرق السعرات في الماء ومقاوم للمواد الكيميائية",
    "icon": "heart",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "heartRate": 115,
      "caloriesBurned": 320,
      "effortLevel": "معتدل (65%)"
    }
  },
  {
    "id": "wahoo_tickr_fit",
    "name": "Wahoo TICKR Fit",
    "brand": "Wahoo",
    "type": "حزام نبضات القلب",
    "function": "حزام ذراع لقياس نبضات القلب والتحمل البدني وتتبع فترات التدريب الهوائي واللاحوائي والسعرات في الصالات الرياضية",
    "icon": "heart",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "heartRate": 128,
      "caloriesBurned": 390,
      "effortLevel": "متوسط (75%)",
      "hrv": 72
    }
  },
  {
    "id": "wahoo_tickr",
    "name": "Wahoo TICKR",
    "brand": "Wahoo",
    "type": "حزام نبضات القلب",
    "function": "حزام صدر ذكي خفيف الوزن لتتبع السعرات ونبضات القلب والجهد البدني للتمارين الخارجية والصالات الرياضية",
    "icon": "heart",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "heartRate": 122,
      "caloriesBurned": 370,
      "effortLevel": "معتدل (70%)",
      "hrv": 69
    }
  },
  {
    "id": "wahoo_tickr_x",
    "name": "Wahoo TICKR X",
    "brand": "Wahoo",
    "type": "حزام نبضات القلب",
    "function": "حزام صدر متطور يحتوي على ذاكرة مدمجة لتسجيل التمارين وتتبع التردد وقياس كفاءة الحركة البدنية والجري",
    "icon": "heart",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "heartRate": 132,
      "caloriesBurned": 420,
      "effortLevel": "شديد (82%)",
      "hrv": 79
    }
  },
  {
    "id": "myzone_mz_switch",
    "name": "Myzone MZ-Switch",
    "brand": "Myzone",
    "type": "حزام نبضات القلب",
    "function": "أول حزام مرن يمكن ارتداؤه على الصدر أو المعصم أو الذراع مع تتبع نقاط الجهد الرياضي والسعرات بدقة تامة",
    "icon": "heart",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "heartRate": 126,
      "caloriesBurned": 380,
      "effortLevel": "متوسط (73%)",
      "hrv": 71
    }
  },
  {
    "id": "myzone_mz3",
    "name": "Myzone MZ-3",
    "brand": "Myzone",
    "type": "حزام نبضات القلب",
    "function": "حزام صدر رياضي كلاسيكي يركز على تتبع الجهد البدني والنبض وحساب النقاط التنافسية للياقة بدقة ومزامنة الهاتف",
    "icon": "heart",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "heartRate": 130,
      "caloriesBurned": 400,
      "effortLevel": "شديد (80%)",
      "hrv": 76
    }
  },
  {
    "id": "coospo_h808s",
    "name": "Coospo H808S",
    "brand": "Coospo",
    "type": "حزام نبضات القلب",
    "function": "حزام صدر اقتصادي متين يرسل نبضات القلب في الوقت الفعلي ومناسب للدراجين والجري الداخلي والخارجي والكارديو",
    "icon": "heart",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "heartRate": 118,
      "caloriesBurned": 340,
      "effortLevel": "خفيف (58%)",
      "hrv": 64
    }
  },
  {
    "id": "coospo_h9z",
    "name": "Coospo H9Z Rechargeable",
    "brand": "Coospo",
    "type": "حزام نبضات القلب",
    "function": "حزام قياس نبض قابل لإعادة الشحن مع مؤشر إضاءة LED ملون لبيان مستويات الجهد والنبض البدني أثناء التمارين",
    "icon": "heart",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "heartRate": 124,
      "caloriesBurned": 360,
      "effortLevel": "معتدل (68%)",
      "hrv": 70
    }
  },
  {
    "id": "peloton_bike_plus",
    "name": "Peloton Bike+",
    "brand": "Peloton",
    "type": "دراجة هوائية ذكية",
    "function": "دراجة تمرين ذكية شاشتها تدور وتتزامن تلقائياً مع مقاومة المدرب ومقاييس السرعة والطاقة والمسافة والسعرات",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 85,
      "power": 195,
      "distance": 12.4,
      "speed": 28.5,
      "resistance": 45,
      "durationMins": 45,
      "caloriesBurned": 480
    }
  },
  {
    "id": "peloton_bike",
    "name": "Peloton Bike",
    "brand": "Peloton",
    "type": "دراجة هوائية ذكية",
    "function": "الدراجة التفاعلية الكلاسيكية لممارسة التمارين في المنزل مع تتبع السعرات وقوة الدفع ومستوى التردد والسرعة والمسافة",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 80,
      "power": 170,
      "distance": 10.2,
      "speed": 25.4,
      "resistance": 38,
      "durationMins": 30,
      "caloriesBurned": 320
    }
  },
  {
    "id": "wahoo_kickr_bike",
    "name": "Wahoo KICKR Bike",
    "brand": "Wahoo",
    "type": "دراجة هوائية ذكية",
    "function": "محاكاة كاملة للمنحدرات وتغير التروس ومزامنة قوة الدفع المباشر والسرعة والمسافة الرياضية مع مقاومة كهرومغناطيسية",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 90,
      "power": 210,
      "distance": 15.1,
      "speed": 32.1,
      "resistance": 50,
      "durationMins": 60,
      "caloriesBurned": 550
    }
  },
  {
    "id": "wahoo_kickr_bike_shift",
    "name": "Wahoo KICKR Bike Shift",
    "brand": "Wahoo",
    "type": "دراجة هوائية ذكية",
    "function": "نسخة دراجة ذكية صامتة جداً وسريعة الاستجابة لقياس الطاقة وتتبع تمارين الدراجات المنزلية وحساب السعرات والسرعة",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 88,
      "power": 198,
      "distance": 13.5,
      "speed": 30.2,
      "resistance": 42,
      "durationMins": 50,
      "caloriesBurned": 450
    }
  },
  {
    "id": "wahoo_kickr_trainer",
    "name": "Wahoo KICKR Smart Trainer",
    "brand": "Wahoo",
    "type": "دراجة هوائية ذكية",
    "function": "جهاز تدريب ذكي للمحاكاة المباشرة يركب عليه دراجتك الهوائية لقياس الطاقة والسرعة والتبديل بدقة احترافية",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 89,
      "power": 205,
      "distance": 14,
      "speed": 31,
      "durationMins": 40,
      "caloriesBurned": 420
    }
  },
  {
    "id": "wahoo_kickr_core",
    "name": "Wahoo KICKR CORE",
    "brand": "Wahoo",
    "type": "دراجة هوائية ذكية",
    "function": "جهاز تدريب ذكي تفاعلي بمقاومة دفع مباشرة ومقاييس دقيقة للطاقة والتبديل ومثالي للتدريبات المنزلية الافتراضية",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 84,
      "power": 180,
      "distance": 11.5,
      "speed": 27.5,
      "durationMins": 30
    }
  },
  {
    "id": "wahoo_kickr_rollr",
    "name": "Wahoo KICKR ROLLR",
    "brand": "Wahoo",
    "type": "دراجة هوائية ذكية",
    "function": "جهاز بكرات تدريب ذكي يجمع بين شعور الركوب الطبيعي والتحكم في المقاومة الذكية ومقاييس التبديل والسرعة",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 86,
      "power": 175,
      "distance": 12,
      "speed": 28,
      "durationMins": 35
    }
  },
  {
    "id": "tacx_neo_2t",
    "name": "Tacx Neo 2T Smart",
    "brand": "Tacx",
    "type": "دراجة هوائية ذكية",
    "function": "جهاز تدريب دراجات ذكي تفاعلي ومباشر يقيس السرعة والطاقة والتردد ومحاكاة الطرق بدقة متناهية وبدون ضوضاء",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 88,
      "power": 205,
      "distance": 14.2,
      "speed": 31,
      "durationMins": 45,
      "caloriesBurned": 410
    }
  },
  {
    "id": "tacx_flow_smart",
    "name": "Tacx Flow Smart",
    "brand": "Tacx",
    "type": "دراجة هوائية ذكية",
    "function": "جهاز تدريب دراجات هوائية ذكي للمبتدئين يقيس القوة والسرعة ويتصل بتطبيقات التدريب الافتراضي لتحديات التبديل",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 78,
      "power": 140,
      "distance": 8.5,
      "speed": 22.8,
      "durationMins": 30,
      "caloriesBurned": 250
    }
  },
  {
    "id": "tacx_neo_bike",
    "name": "Tacx Neo Bike Smart",
    "brand": "Tacx",
    "type": "دراجة هوائية ذكية",
    "function": "دراجة تمرين ذكية متكاملة توفر تجربة ركوب صامتة وقوية مع محاكاة الرياح والمنحدرات والطاقة وحساب كامل للسعرات",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 92,
      "power": 230,
      "distance": 18,
      "speed": 34.5,
      "resistance": 55,
      "durationMins": 60,
      "caloriesBurned": 580
    }
  },
  {
    "id": "tacx_neo_bike_plus",
    "name": "Tacx Neo Bike Plus",
    "brand": "Tacx",
    "type": "دراجة هوائية ذكية",
    "function": "أحدث دراجة ذكية متكاملة من تاكس بمحاكاة تبديل تروس واقعية وشاشة مدمجة وتتبع دقيق للمسافة والقوة والسرعة والجهد",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 94,
      "power": 240,
      "distance": 20,
      "speed": 35.8,
      "resistance": 58,
      "durationMins": 60,
      "caloriesBurned": 610
    }
  },
  {
    "id": "tacx_flux_2",
    "name": "Tacx Flux 2 Smart",
    "brand": "Tacx",
    "type": "دراجة هوائية ذكية",
    "function": "جهاز تدريب ذكي بمقاومة دفع مباشرة ومستويات طاقة حتى 2000 واط لقياس السرعة والمسافة والجهد المنزلي",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 85,
      "power": 190,
      "distance": 13,
      "speed": 29,
      "durationMins": 40
    }
  },
  {
    "id": "tacx_flux_s",
    "name": "Tacx Flux S Smart",
    "brand": "Tacx",
    "type": "دراجة هوائية ذكية",
    "function": "جهاز تدريب تفاعلي اقتصادي بالدفع المباشر يقيس بدقة طاقتك وسرعتك ومثالي للمزامنة مع تطبيقات التدريب",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 82,
      "power": 165,
      "distance": 10.8,
      "speed": 26.2,
      "durationMins": 30
    }
  },
  {
    "id": "keiser_m3i",
    "name": "Keiser M3i Lite",
    "brand": "Keiser",
    "type": "دراجة هوائية ذكية",
    "function": "دراجة تمرين مغناطيسية احترافية مزودة بتقنية البلوتوث لإرسال مقاييس الطاقة والمسافة والسرعة ومستوى المقاومة للتطبيق",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 84,
      "power": 180,
      "distance": 11.8,
      "speed": 27.2,
      "resistance": 16,
      "durationMins": 40,
      "caloriesBurned": 360
    }
  },
  {
    "id": "schwinn_ic4",
    "name": "Schwinn IC4",
    "brand": "Schwinn",
    "type": "دراجة هوائية ذكية",
    "function": "دراجة تمرين منزلية هادئة للغاية تتصل بالبلوتوث بالتطبيقات الرياضية لمزامنة السرعة والمسافة والجهد والسعرات",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 82,
      "power": 165,
      "distance": 9.7,
      "speed": 24.5,
      "resistance": 32,
      "durationMins": 35,
      "caloriesBurned": 310
    }
  },
  {
    "id": "stages_sb20",
    "name": "Stages SB20 Smart Bike",
    "brand": "Stages",
    "type": "دراجة هوائية ذكية",
    "function": "دراجة لياقة بدنية مجهزة بمقياس طاقة مزدوج الجانب لمراقبة كفاءة التبديل وتدريب الطاقة والمسافة والسرعة طوال التمرين",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 89,
      "power": 215,
      "distance": 14.8,
      "speed": 31.8,
      "resistance": 48,
      "durationMins": 50,
      "caloriesBurned": 490
    }
  },
  {
    "id": "concept2_bike_erg",
    "name": "Concept2 BikeErg",
    "brand": "Concept2",
    "type": "دراجة هوائية ذكية",
    "function": "دراجة هوائية ذكية بمروحة مقاومة هواء لقياس دقيق للغاية للتبديل والمسافة والسرعة وقوة الدفع والسعرات المستهلكة",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 91,
      "power": 220,
      "distance": 15,
      "speed": 32.5,
      "durationMins": 30,
      "caloriesBurned": 400
    }
  },
  {
    "id": "nordictrack_s22i",
    "name": "NordicTrack Commercial S22i Studio Cycle",
    "brand": "NordicTrack",
    "type": "دراجة هوائية ذكية",
    "function": "دراجة تمارين بشاشة 22 بوصة ومحاكاة انحدار وميل حقيقي لتتبع المسافة والسرعة وقوة الدفع والسعرات التلقائي",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 83,
      "power": 185,
      "distance": 12.2,
      "speed": 26.8,
      "resistance": 20,
      "durationMins": 45,
      "caloriesBurned": 440
    }
  },
  {
    "id": "technogym_ride",
    "name": "Technogym Ride",
    "brand": "Technogym",
    "type": "دراجة هوائية ذكية",
    "function": "دراجة تمارين فاخرة للغاية بشاشة مدمجة وتطبيقات تدريب احترافية ومزامنة للقوة والسرعة والتبديل ومقاومة دقيقة",
    "icon": "bike",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "cadence": 93,
      "power": 245,
      "distance": 19.5,
      "speed": 35,
      "resistance": 62,
      "durationMins": 60,
      "caloriesBurned": 600
    }
  },
  {
    "id": "concept2_rower",
    "name": "Concept2 RowErg",
    "brand": "Concept2",
    "type": "جهاز تجديف ذكي",
    "function": "تتبع معدل السحب في الدقيقة (Strokes) والسعرات وقوة السحب ومقاومة الهواء ومزامنة المسافة الرياضية ووقت الانقسام",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 28,
      "distance": 2000,
      "caloriesBurned": 150,
      "splitTime": "2:04 د/500م",
      "power": 185,
      "durationMins": 10
    }
  },
  {
    "id": "concept2_model_d",
    "name": "Concept2 Model D Rower",
    "brand": "Concept2",
    "type": "جهاز تجديف ذكي",
    "function": "الجهاز المعياري لمنافسات التجديف الداخلي متصل بشاشة PM5 لتسجيل الأداء والمسافات بدقة قصوى والجهد العضلي",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 27,
      "distance": 2500,
      "caloriesBurned": 190,
      "splitTime": "2:00 د/500م",
      "power": 195,
      "durationMins": 12
    }
  },
  {
    "id": "concept2_ski_erg",
    "name": "Concept2 SkiErg",
    "brand": "Concept2",
    "type": "جهاز تجديف ذكي",
    "function": "جهاز محاكاة التزلج وتمرين الجزء العلوي من الجسم يتتبع قوة السحب ومعدل الضربات والمسافة والسعرات بدقة عالية",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 32,
      "distance": 1500,
      "caloriesBurned": 130,
      "splitTime": "2:10 د/500م",
      "power": 175,
      "durationMins": 8
    }
  },
  {
    "id": "waterrower_erg",
    "name": "WaterRower Performance Erg",
    "brand": "WaterRower",
    "type": "جهاز تجديف ذكي",
    "function": "جهاز تجديف خشبي بمقاومة مائية يتصل ذكياً بمقياس الأداء لمزامنة المسافة وضربات السحب والسعرات في الدقيقة",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 26,
      "distance": 1800,
      "caloriesBurned": 135,
      "splitTime": "2:10 د/500م",
      "power": 160,
      "durationMins": 15
    }
  },
  {
    "id": "waterrower_natural",
    "name": "WaterRower Natural Ash",
    "brand": "WaterRower",
    "type": "جهاز تجديف ذكي",
    "function": "جهاز تجديف خشبي كلاسيكي مصنوع من الرماد الطبيعي مع مستشعر بلوتوث لنقل السرعة والمسافة والسعرات المستهلكة",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 24,
      "distance": 1500,
      "caloriesBurned": 110,
      "splitTime": "2:15 د/500م",
      "power": 145,
      "durationMins": 15
    }
  },
  {
    "id": "waterrower_club",
    "name": "WaterRower Club Wood",
    "brand": "WaterRower",
    "type": "جهاز تجديف ذكي",
    "function": "جهاز تجديف خشبي مصمم للاستخدام المكثف في الأندية مع مستشعر ذكي لتتبع السرعة والضربات والسعرات والمسافة",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 25,
      "distance": 2200,
      "caloriesBurned": 165,
      "splitTime": "2:08 د/500م",
      "power": 170,
      "durationMins": 15
    }
  },
  {
    "id": "waterrower_m1",
    "name": "WaterRower M1 LoRise",
    "brand": "WaterRower",
    "type": "جهاز تجديف ذكي",
    "function": "جهاز تجديف مصنوع من الألومنيوم القوي لربط وقياس المسافات والجهد العضلي ومعدل الضربات بالدقيقة",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 28,
      "distance": 2000,
      "caloriesBurned": 145,
      "splitTime": "2:05 د/500م",
      "power": 180,
      "durationMins": 10
    }
  },
  {
    "id": "hydrow_wave",
    "name": "Hydrow Wave",
    "brand": "Hydrow",
    "type": "جهاز تجديف ذكي",
    "function": "جهاز تجديف ذكي مدمج الحجم يتميز بمقاومة الكهرومغناطيسية التي تحاكي التجديف الحقيقي في المياه ومزامنة التمارين",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 29,
      "distance": 2200,
      "caloriesBurned": 170,
      "splitTime": "2:02 د/500م",
      "durationMins": 12
    }
  },
  {
    "id": "hydrow_pro",
    "name": "Hydrow Pro Rower",
    "brand": "Hydrow",
    "type": "جهاز تجديف ذكي",
    "function": "جهاز تجديف فاخر للغاية بشاشة عملاقة ومزامنة كاملة لجلسات التدريب الحية والمسافة والجهد البدني والسعرات",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 30,
      "distance": 3000,
      "caloriesBurned": 220,
      "splitTime": "1:58 د/500م",
      "durationMins": 15
    }
  },
  {
    "id": "ergatta_rower",
    "name": "Ergatta Rower",
    "brand": "Ergatta",
    "type": "جهاز تجديف ذكي",
    "function": "جهاز تجديف بتصميم فني يعتمد على اللعب الافتراضي والتنافس لمزامنة المسافة والسرعة ومعدل السحب وحرق السعرات",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 25,
      "distance": 1900,
      "caloriesBurned": 140,
      "splitTime": "2:12 د/500م",
      "durationMins": 15
    }
  },
  {
    "id": "echelon_rower",
    "name": "Echelon Smart Rower-s",
    "brand": "Echelon",
    "type": "جهاز تجديف ذكي",
    "function": "جهاز تجديف ذكي ذو مقاومة مغناطيسية صامتة مزود بعناصر تحكم في المقاومة على المقود ومزامنة السرعة والمسافة",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 28,
      "distance": 1700,
      "caloriesBurned": 125,
      "splitTime": "2:15 د/500م",
      "durationMins": 10
    }
  },
  {
    "id": "nordictrack_rw900",
    "name": "NordicTrack RW900",
    "brand": "NordicTrack",
    "type": "جهاز تجديف ذكي",
    "function": "جهاز تجديف مزود بمقاومة هوائية ومغناطيسية مزدوجة مع شاشة لمس متزامنة مع برامج التدريب الرياضي والميل والسرعة",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 27,
      "distance": 2100,
      "caloriesBurned": 160,
      "splitTime": "2:05 د/500م",
      "durationMins": 15
    }
  },
  {
    "id": "nordictrack_rw700",
    "name": "NordicTrack RW700",
    "brand": "NordicTrack",
    "type": "جهاز تجديف ذكي",
    "function": "جهاز تجديف تفاعلي بشاشة أصغر ومقاومة مغناطيسية صامتة وتتبع دقيق للمسافات وضربات التجديف والسعرات",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 26,
      "distance": 1800,
      "caloriesBurned": 135,
      "splitTime": "2:10 د/500م",
      "durationMins": 12
    }
  },
  {
    "id": "technogym_skillrow",
    "name": "Technogym Skillrow",
    "brand": "Technogym",
    "type": "جهاز تجديف ذكي",
    "function": "جهاز تجديف رياضي فائق الدقة مزود بمقاومة متعددة المستويات لتطوير القوة البدنية والتحمل الهوائي والسرعة",
    "icon": "rower",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "strokes": 29,
      "distance": 2500,
      "caloriesBurned": 185,
      "splitTime": "1:59 د/500م",
      "power": 200,
      "durationMins": 12
    }
  },
  {
    "id": "nordictrack_2450",
    "name": "NordicTrack Commercial 2450",
    "brand": "NordicTrack",
    "type": "جهاز جري ذكي",
    "function": "مزامنة سرعة الركض، مستوى ميل الجهاز التلقائي، والمسافة وضربات القلب لكارديو اللياقة البدنية والتمارين المنزلية",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 10.5,
      "incline": 2,
      "distance": 5.2,
      "caloriesBurned": 380,
      "durationMins": 30
    }
  },
  {
    "id": "nordictrack_1750",
    "name": "NordicTrack Commercial 1750",
    "brand": "NordicTrack",
    "type": "جهاز جري ذكي",
    "function": "جهاز جري منزلي متطور يتوافق مع تدريبات الخرائط والمزامنة التلقائية للميل والسرعة والسعرات والمسافة الفعلية",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 9.5,
      "incline": 1.5,
      "distance": 4.5,
      "caloriesBurned": 320,
      "durationMins": 30
    }
  },
  {
    "id": "nordictrack_2950",
    "name": "NordicTrack Commercial 2950",
    "brand": "NordicTrack",
    "type": "جهاز جري ذكي",
    "function": "شاشة ضخمة ومحرك جبار لتتبع الركض الاحترافي ومستويات ميل حتى 15% مع مزامنة نبضات القلب والجهد والمسافة والسعرات",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 12,
      "incline": 3,
      "distance": 8.1,
      "caloriesBurned": 550,
      "durationMins": 45
    }
  },
  {
    "id": "nordictrack_1250",
    "name": "NordicTrack Commercial 1250",
    "brand": "NordicTrack",
    "type": "جهاز جري ذكي",
    "function": "جهاز جري منزلي فعال يدعم الانحدار التلقائي ومقاييس السرعة وتتبع النشاط اليومي الرياضي مع تبريد مستمر",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 8.8,
      "incline": 1,
      "distance": 3.8,
      "caloriesBurned": 260,
      "durationMins": 25
    }
  },
  {
    "id": "sole_f80",
    "name": "Sole Fitness F80",
    "brand": "Sole",
    "type": "جهاز جري ذكي",
    "function": "جهاز جري متين جداً يتتبع السرعة والمسافة الرياضية والوقت وضربات القلب ومزامنة البيانات للتطبيق بسلاسة",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 9.8,
      "incline": 1.5,
      "distance": 4.8,
      "caloriesBurned": 340,
      "durationMins": 30
    }
  },
  {
    "id": "sole_f85",
    "name": "Sole Fitness F85",
    "brand": "Sole",
    "type": "جهاز جري ذكي",
    "function": "أقوى أجهزة الجري المنزلية من سول مزود بشاشة لمس ذكية وتتبع المؤشرات الحيوية والسرعة والميل بدقة عالية",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 11,
      "incline": 2.5,
      "distance": 6.5,
      "caloriesBurned": 480,
      "durationMins": 40
    }
  },
  {
    "id": "sole_f63",
    "name": "Sole Fitness F63",
    "brand": "Sole",
    "type": "جهاز جري ذكي",
    "function": "جهاز جري اقتصادي ومتين جداً يوفر خيارات التحكم في السرعة والميل وتتبع نبضات القلب والخطوات والسعرات اليومية",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 8.5,
      "incline": 1,
      "distance": 3.5,
      "caloriesBurned": 240,
      "durationMins": 25
    }
  },
  {
    "id": "sole_tt8",
    "name": "Sole Fitness TT8",
    "brand": "Sole",
    "type": "جهاز جري ذكي",
    "function": "جهاز جري احترافي ذو هيكل عريض ومحرك قوي للغاية ومقاومة ممتازة ومثالي للجري الطويل وشاق وتتبع الجهد",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 11.5,
      "incline": 3,
      "distance": 10,
      "caloriesBurned": 720,
      "durationMins": 60
    }
  },
  {
    "id": "technogym_myrun",
    "name": "Technogym MyRun",
    "brand": "Technogym",
    "type": "جهاز جري ذكي",
    "function": "مزامنة ذكية لمعدل ضربات الركض، استهلاك الطاقة، وتحسين خطوة الجري والمسافة الإجمالية والسعرات والنشاط البدني",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 11.2,
      "incline": 1,
      "distance": 6,
      "caloriesBurned": 410,
      "durationMins": 35
    }
  },
  {
    "id": "technogym_run_personal",
    "name": "Technogym Run Personal",
    "brand": "Technogym",
    "type": "جهاز جري ذكي",
    "function": "جهاز جري فخم للغاية يجمع بين التصميم الراقي والمواد عالية الجودة والتدريب الافتراضي المتقدم وحساب السعرات",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 10,
      "incline": 1.5,
      "distance": 5.5,
      "caloriesBurned": 390,
      "durationMins": 30
    }
  },
  {
    "id": "technogym_skillrun",
    "name": "Technogym Skillrun",
    "brand": "Technogym",
    "type": "جهاز جري ذكي",
    "function": "جهاز الجري الرياضي المتكامل للمحترفين لتطوير القوة، السرعة، والتحمل مع محاكاة دفع المظلات والمقاومة الطينية",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 14.5,
      "incline": 4,
      "distance": 7.5,
      "caloriesBurned": 620,
      "durationMins": 30
    }
  },
  {
    "id": "echelon_stride",
    "name": "Echelon Stride-6",
    "brand": "Echelon",
    "type": "جهاز جري ذكي",
    "function": "جهاز جري ذكي قابل للطي والتخزين بسهولة مع مستشعرات لنبض القلب والسرعة ومزامنة سريعة مع التطبيقات الرياضية",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 8.5,
      "incline": 1,
      "distance": 3.8,
      "caloriesBurned": 260,
      "durationMins": 25
    }
  },
  {
    "id": "proform_pro2000",
    "name": "ProForm Pro 2000",
    "brand": "ProForm",
    "type": "جهاز جري ذكي",
    "function": "جهاز جري منزلي متطور ومزود بمروحة تبريد وتتبع أداء الجري ومستويات انحدار حتى -3% ومزامنة كاملة للميل والسرعة",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 9,
      "incline": 1,
      "distance": 4.2,
      "caloriesBurned": 290,
      "durationMins": 30
    }
  },
  {
    "id": "proform_carbon",
    "name": "ProForm Carbon T10",
    "brand": "ProForm",
    "type": "جهاز جري ذكي",
    "function": "جهاز جري بشاشة لمس 10 بوصات مدمجة وممتازة ومستشعرات قبضة لمعدل ضربات القلب وسرعة ركض متزامنة وسعرات",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 8.2,
      "incline": 0.5,
      "distance": 3.5,
      "caloriesBurned": 230,
      "durationMins": 25
    }
  },
  {
    "id": "bowflex_t22",
    "name": "Bowflex Treadmill 22",
    "brand": "Bowflex",
    "type": "جهاز جري ذكي",
    "function": "جهاز جري خارق بشاشة 22 بوصة ومستويات ميل حتى 20% لتحقيق أقصى استهلاك للسعرات وتحديات الركض الجبلي والمسافة",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 10.8,
      "incline": 5,
      "distance": 5.8,
      "caloriesBurned": 490,
      "durationMins": 35
    }
  },
  {
    "id": "bowflex_t10",
    "name": "Bowflex Treadmill 10",
    "brand": "Bowflex",
    "type": "جهاز جري ذكي",
    "function": "جهاز جري متين جداً مزود بشاشة 10 بوصات وتتبع ذكي لنشاط الجري المنزلي ومستويات حرق السعرات والمسافة والنبض",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 9.2,
      "incline": 2,
      "distance": 4,
      "caloriesBurned": 300,
      "durationMins": 30
    }
  },
  {
    "id": "horizon_70at",
    "name": "Horizon 7.0 AT",
    "brand": "Horizon",
    "type": "جهاز جري ذكي",
    "function": "جهاز جري سريع الاستجابة لتغيرات السرعة والميل ومثالي للتدريبات المتقطعة (HIIT) والمزامنة الفورية للتطبيق",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 8.8,
      "incline": 1,
      "distance": 3.9,
      "caloriesBurned": 270,
      "durationMins": 25
    }
  },
  {
    "id": "horizon_78at",
    "name": "Horizon 7.8 AT",
    "brand": "Horizon",
    "type": "جهاز جري ذكي",
    "function": "جهاز جري عالي الأداء مع مقبض دوار مريح لتغيير السرعة الفوري وشاشة لمزامنة البيانات والصحة والتمارين الشاقة",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 10.2,
      "incline": 1.5,
      "distance": 5,
      "caloriesBurned": 360,
      "durationMins": 30
    }
  },
  {
    "id": "peloton_tread",
    "name": "Peloton Tread",
    "brand": "Peloton",
    "type": "جهاز جري ذكي",
    "function": "جهاز الجري المنزلي المتكامل مع شاشة عالية الدقة وجلسات ركض حية وتتبع المسافة وحرق السعرات ونبضات القلب الكارديو",
    "icon": "treadmill",
    "isConnected": false,
    "lastSync": "لم يتم المزامنة بعد",
    "data": {
      "speed": 11.5,
      "incline": 2,
      "distance": 6.2,
      "caloriesBurned": 450,
      "durationMins": 30
    }
  }
];
