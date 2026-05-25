import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { doc, getDoc, setDoc, collection, getDocs, query, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { handleFirestoreError, OperationType } from '../errorHandling';
import { Save, Calculator, Target, TrendingUp, Activity, Flame, Utensils, ClipboardList, Trash2, Watch, Scale, Heart, Zap, Smartphone, Link2, RefreshCw, Bluetooth } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BackButton } from '../components/BackButton';

import { AVAILABLE_DEVICES, ConnectedDevice } from '../data/devices';

interface UserProfile {
  uid: string;
  personal_info: {
    user_age: number;
    user_weight: number;
    user_height: number;
    user_gender: 'male' | 'female';
    activity_multiplier: number;
    training_goal: 'bulking' | 'cutting' | 'maintenance';
  };
  calculated_nutrition: {
    calculated_bmr: number;
    calculated_tdee: number;
    target_calories: number;
    macros: {
      protein_grams: number;
      fat_grams: number;
      carb_grams: number;
    };
  };
  weightHistory: { date: string; weight: number }[];
  devices?: ConnectedDevice[];
}

interface ActivityLogEntry {
  id: string;
  program_name: string;
  day_title: string;
  workout_type: string;
  completed_at: any;
}


// AVAILABLE_DEVICES is imported from ../data/devices

const activityLevels = [
  { id: 1.2, label: 'خامل (مكتب، قليل الحركة)' },
  { id: 1.375, label: 'نشاط خفيف (تمرين 1-3 أيام/أسبوع)' },
  { id: 1.55, label: 'نشاط معتدل (تمرين 3-5 أيام/أسبوع)' },
  { id: 1.725, label: 'نشط جداً (تمرين شاق 6-7 أيام)' },
  { id: 1.9, label: 'نشاط مفرط (وظيفة بدنية شاقة)' }
];

const goals = [
  { id: 'maintenance', label: 'محافظة على الوزن' },
  { id: 'bulking', label: 'تضخيم (زيادة عضلية)' },
  { id: 'cutting', label: 'تنشيف (خسارة دهون)' }
];

const defaultProfile: Partial<UserProfile> = {
  personal_info: {
    user_age: 25,
    user_weight: 75,
    user_height: 175,
    user_gender: 'male',
    activity_multiplier: 1.55,
    training_goal: 'maintenance'
  },
  calculated_nutrition: {
    calculated_bmr: 0,
    calculated_tdee: 0,
    target_calories: 0,
    macros: {
      protein_grams: 0,
      fat_grams: 0,
      carb_grams: 0
    }
  },
  weightHistory: [],
  devices: []
};

const DEVICE_TYPES = ['ساعة ذكية', 'ميزان ذكي', 'حزام نبضات القلب', 'دراجة هوائية ذكية', 'جهاز تجديف ذكي', 'جهاز جري ذكي'];

const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'ساعة ذكية':
      return <Watch className="w-6 h-6 text-purple-400" />;
    case 'ميزان ذكي':
      return <Scale className="w-6 h-6 text-emerald-400" />;
    case 'حزام نبضات القلب':
      return <Heart className="w-6 h-6 text-rose-400" />;
    case 'دراجة هوائية ذكية':
      return <Zap className="w-6 h-6 text-yellow-400" />;
    case 'جهاز تجديف ذكي':
      return <Activity className="w-6 h-6 text-cyan-400" />;
    case 'جهاز جري ذكي':
      return <Smartphone className="w-6 h-6 text-blue-400" />;
    default:
      return <Link2 className="w-6 h-6 text-zinc-400" />;
  }
};

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Partial<UserProfile>>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);
  const [loadingLog, setLoadingLog] = useState(true);

  const [devices, setDevices] = useState<ConnectedDevice[]>([]);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  // States for Bluetooth Scanning
  const [isScanningBluetooth, setIsScanningBluetooth] = useState<boolean>(false);
  const [bluetoothDevices, setBluetoothDevices] = useState<ConnectedDevice[]>([]);
  const [showBluetoothScanner, setShowBluetoothScanner] = useState<boolean>(false);
  const [connectingBluetoothId, setConnectingBluetoothId] = useState<string | null>(null);

  // States for cascading dropdowns
  const [selectedType, setSelectedType] = useState<string>('ساعة ذكية');
  const [selectedBrand, setSelectedBrand] = useState<string>('Apple');
  const [selectedDeviceToAdd, setSelectedDeviceToAdd] = useState<string>('apple_watch_9');

  // Update brand list when type changes
  useEffect(() => {
    if (!selectedType) return;
    const brands = Array.from(new Set(AVAILABLE_DEVICES.filter(d => d.type === selectedType).map(d => d.brand)));
    if (brands.length > 0) {
      setSelectedBrand(brands[0]);
    } else {
      setSelectedBrand('');
    }
  }, [selectedType]);

  // Update model list when brand or type changes
  useEffect(() => {
    if (!selectedType || !selectedBrand) return;
    const models = AVAILABLE_DEVICES.filter(d => d.type === selectedType && d.brand === selectedBrand);
    if (models.length > 0) {
      setSelectedDeviceToAdd(models[0].id);
    } else {
      setSelectedDeviceToAdd('');
    }
  }, [selectedType, selectedBrand]);

  const handleAddAndConnectDevice = async () => {
    if (!selectedDeviceToAdd) return;
    
    // Check if already connected
    if (devices.some(d => d.id === selectedDeviceToAdd)) {
      alert('هذا الجهاز متصل بالفعل!');
      return;
    }

    const template = AVAILABLE_DEVICES.find(d => d.id === selectedDeviceToAdd);
    if (!template) return;

    const newDevice: ConnectedDevice = {
      ...template,
      isConnected: true,
      lastSync: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    const newDevices = [...devices, newDevice];
    setDevices(newDevices);
    
    // Automatically trigger scale sync if it is a smart scale
    if (newDevice.type === 'ميزان ذكي' && newDevice.data.weight) {
      const newWeight = newDevice.data.weight;
      const info = profile.personal_info;
      if (info) {
        const updatedInfo = { ...info, user_weight: newWeight };
        let bmr = (10 * newWeight) + (6.25 * info.user_height) - (5 * info.user_age);
        if (info.user_gender === 'male') bmr += 5;
        else bmr -= 161;
        bmr = Math.round(bmr);
        
        const tdee = Math.round(bmr * info.activity_multiplier);
        let target = tdee;
        if (info.training_goal === 'bulking') target += 500;
        if (info.training_goal === 'cutting') target -= 500;
        
        const protein = Math.round(newWeight * 2.2);
        const fat = Math.round((target * 0.25) / 9);
        const carb = Math.max(0, Math.round((target - (protein * 4) - (fat * 9)) / 4));

        const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        let updatedHistory = profile.weightHistory ? [...profile.weightHistory] : [];
        if (updatedHistory.length === 0 || updatedHistory[updatedHistory.length - 1].weight !== newWeight) {
          const lastEntry = updatedHistory[updatedHistory.length - 1];
          if (lastEntry && lastEntry.date === today) {
            updatedHistory[updatedHistory.length - 1].weight = newWeight;
          } else {
            updatedHistory.push({ date: today, weight: newWeight });
          }
        }

        const newProfile = {
          ...profile,
          personal_info: updatedInfo,
          calculated_nutrition: {
            calculated_bmr: bmr,
            calculated_tdee: tdee,
            target_calories: target,
            macros: { protein_grams: protein, fat_grams: fat, carb_grams: carb }
          },
          weightHistory: updatedHistory,
          devices: newDevices
        };

        setProfile(newProfile);
        if (user) {
          try {
            await setDoc(doc(db, 'users', user.uid), newProfile);
          } catch (dbErr) {
            console.warn("Firestore write failed, using local profile state:", dbErr);
          }
        }
        alert(`تم ربط ${newDevice.name} وتحديث الوزن تلقائياً إلى ${newWeight} كجم!`);
        return;
      }
    }

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), { devices: newDevices }, { merge: true });
      } catch (dbErr) {
        console.warn("Firestore write failed, using local devices state:", dbErr);
      }
    }
    alert(`تم ربط ${newDevice.name} بنجاح!`);
  };

  const startBluetoothScan = () => {
    setShowBluetoothScanner(true);
    setBluetoothDevices([]);
    setIsScanningBluetooth(false);
  };

  const startRealBluetoothScan = async () => {
    setIsScanningBluetooth(true);
    setBluetoothDevices([]);
    
    const navBT = (navigator as any).bluetooth;
    
    if (navBT) {
      try {
        const device = await navBT.requestDevice({
          acceptAllDevices: true,
          optionalServices: [
            'heart_rate', 
            'fitness_machine',
            'cycling_power',
            'cycling_speed_and_cadence',
            'weight_scale'
          ]
        });
        
        const nameLower = (device.name || '').toLowerCase();
        let matched = AVAILABLE_DEVICES.find(d => 
          nameLower.includes(d.name.toLowerCase()) || 
          nameLower.includes(d.brand.toLowerCase())
        );
        
        if (!matched) {
          matched = {
            id: `bt_${device.id}`,
            name: device.name || 'جهاز بلوتوث رياضي',
            brand: 'Bluetooth',
            type: nameLower.includes('pulse') || nameLower.includes('heart') || nameLower.includes('h10') ? 'حزام نبضات القلب' :
                  nameLower.includes('scale') || nameLower.includes('weight') || nameLower.includes('body') ? 'ميزان ذكي' :
                  nameLower.includes('bike') || nameLower.includes('cycle') ? 'دراجة هوائية ذكية' : 'ساعة ذكية',
            function: 'جهاز متصل حقيقي عبر تقنية البلوتوث لمراقبة المؤشرات الرياضية',
            icon: 'watch',
            isConnected: false,
            lastSync: '',
            data: {
              heartRate: 75,
              steps: 2500,
              caloriesBurned: 120
            }
          };
        }
        
        // 1. Establish GATT Connection to the physical device so it registers the pairing
        if (device.gatt) {
          try {
            console.log('Connecting to device GATT Server...', device.name);
            const server = await device.gatt.connect();
            console.log('GATT Connected successfully!', server);
            
            // Try to discover standard Bluetooth services if possible
            try {
              const hrService = await server.getPrimaryService('heart_rate');
              const hrChar = await hrService.getCharacteristic('heart_rate_measurement');
              await hrChar.startNotifications();
              hrChar.addEventListener('characteristicvaluechanged', (event: any) => {
                const value = event.target.value;
                const flags = value.getUint8(0);
                const rate = (flags & 1) === 0 ? value.getUint8(1) : value.getUint16(1, true);
                console.log('Real heart rate data received:', rate);
                setDevices(prev => prev.map(d => 
                  d.id === device.id ? { ...d, data: { ...d.data, heartRate: rate } } : d
                ));
              });
            } catch (serviceErr) {
              console.log('Additional GATT services subscription skipped/unsupported:', serviceErr);
            }
          } catch (gattErr) {
            console.error('Failed to establish GATT Server connection:', gattErr);
          }
        }

        const newDevice: ConnectedDevice = {
          ...matched,
          id: device.id,
          name: device.name || matched.name,
          isConnected: true,
          lastSync: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        };
        
        const newDevices = [...devices, newDevice];
        setDevices(newDevices);
        
        if (user) {
          try {
            await setDoc(doc(db, 'users', user.uid), { devices: newDevices }, { merge: true });
          } catch (dbErr) {
            console.warn("Firestore write failed, using local devices state:", dbErr);
          }
        }
        
        alert(`تم اقتران وتوصيل ${newDevice.name} بنجاح عبر البلوتوث الحقيقي!`);
        setShowBluetoothScanner(false);
      } catch (err: any) {
        console.warn("Web Bluetooth error or user cancelled:", err);
        if (err.name !== 'NotFoundError') {
          alert('تعذر الاتصال بالبلوتوث الحقيقي. جاري الانتقال لمساعد المحاكاة.');
        }
        runSimulation();
      } finally {
        setIsScanningBluetooth(false);
      }
    } else {
      alert('البلوتوث غير مدعوم في هذا المتصفح. جاري تشغيل المحاكاة.');
      runSimulation();
    }
  };

  const runSimulation = () => {
    setIsScanningBluetooth(true);
    setBluetoothDevices([]);
    setTimeout(() => {
      const connectedIds = devices.map(d => d.id);
      const potential = AVAILABLE_DEVICES.filter(d => !connectedIds.includes(d.id));
      
      const shuffled = [...potential].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4);
      
      setBluetoothDevices(selected);
      setIsScanningBluetooth(false);
    }, 2000);
  };

  const connectBluetoothDevice = async (device: ConnectedDevice) => {
    setConnectingBluetoothId(device.id);
    
    setTimeout(async () => {
      const newDevice: ConnectedDevice = {
        ...device,
        isConnected: true,
        lastSync: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      };

      const newDevices = [...devices, newDevice];
      setDevices(newDevices);
      setConnectingBluetoothId(null);
      setBluetoothDevices(prev => prev.filter(d => d.id !== device.id));
      
      // Automatically trigger scale sync if it is a smart scale
      if (newDevice.type === 'ميزان ذكي' && newDevice.data.weight) {
        const newWeight = newDevice.data.weight;
        const info = profile.personal_info;
        if (info) {
          const updatedInfo = { ...info, user_weight: newWeight };
          let bmr = (10 * newWeight) + (6.25 * info.user_height) - (5 * info.user_age);
          if (info.user_gender === 'male') bmr += 5;
          else bmr -= 161;
          bmr = Math.round(bmr);
          
          const tdee = Math.round(bmr * info.activity_multiplier);
          let target = tdee;
          if (info.training_goal === 'bulking') target += 500;
          if (info.training_goal === 'cutting') target -= 500;
          
          const protein = Math.round(newWeight * 2.2);
          const fat = Math.round((target * 0.25) / 9);
          const carb = Math.max(0, Math.round((target - (protein * 4) - (fat * 9)) / 4));

          const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
          let updatedHistory = profile.weightHistory ? [...profile.weightHistory] : [];
          if (updatedHistory.length === 0 || updatedHistory[updatedHistory.length - 1].weight !== newWeight) {
            const lastEntry = updatedHistory[updatedHistory.length - 1];
            if (lastEntry && lastEntry.date === today) {
              updatedHistory[updatedHistory.length - 1].weight = newWeight;
            } else {
              updatedHistory.push({ date: today, weight: newWeight });
            }
          }

          const newProfile = {
            ...profile,
            personal_info: updatedInfo,
            calculated_nutrition: {
              calculated_bmr: bmr,
              calculated_tdee: tdee,
              target_calories: target,
              macros: { protein_grams: protein, fat_grams: fat, carb_grams: carb }
            },
            weightHistory: updatedHistory,
            devices: newDevices
          };

          setProfile(newProfile);
          if (user) {
            try {
              await setDoc(doc(db, 'users', user.uid), newProfile);
            } catch (dbErr) {
              console.warn("Firestore write failed, using local profile state:", dbErr);
            }
          }
          alert(`تم ربط ${newDevice.name} وتحديث الوزن تلقائياً إلى ${newWeight} كجم!`);
          return;
        }
      }

      if (user) {
        try {
          await setDoc(doc(db, 'users', user.uid), { devices: newDevices }, { merge: true });
        } catch (dbErr) {
          console.warn("Firestore write failed, using local devices state:", dbErr);
        }
      }
      alert(`تم ربط ${newDevice.name} بنجاح عبر البلوتوث!`);
    }, 1500);
  };

  const handleDisconnectDevice = async (deviceId: string) => {
    if (!window.confirm('هل أنت متأكد من رغبتك في إلغاء ربط هذا الجهاز؟')) return;
    const newDevices = devices.filter(d => d.id !== deviceId);
    setDevices(newDevices);
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), { devices: newDevices }, { merge: true });
      } catch (dbErr) {
        console.warn("Firestore write failed, using local devices state:", dbErr);
      }
    }
    alert('تم إلغاء ربط الجهاز بنجاح.');
  };

  const handleSyncDevice = async (deviceId: string) => {
    setSyncingId(deviceId);
    setTimeout(async () => {
      let weightUpdated = false;
      let newWeight = 0;
      
      const updatedDevices = devices.map(d => {
        if (d.id === deviceId) {
          const brandLower = d.brand.toLowerCase();
          let updatedData = { ...d.data };
          
          if (brandLower === 'apple' || brandLower === 'garmin' || brandLower === 'fitbit' || brandLower === 'samsung' || brandLower === 'xiaomi' || brandLower === 'polar' || brandLower === 'wahoo') {
            updatedData.steps = (d.data.steps || 5000) + Math.floor(Math.random() * 800) + 200;
            updatedData.caloriesBurned = (d.data.caloriesBurned || 200) + Math.floor(Math.random() * 40) + 10;
            updatedData.heartRate = 60 + Math.floor(Math.random() * 40);
          } else if (d.type === 'ميزان ذكي') {
            // Random variation of weight +- 0.3 kg around current weight or default scale weight
            const baseWeight = profile.personal_info?.user_weight || d.data.weight || 75;
            const change = (Math.random() * 0.6 - 0.3);
            updatedData.weight = Math.round((baseWeight + change) * 10) / 10;
            newWeight = updatedData.weight;
            weightUpdated = true;
          } else if (d.type === 'دراجة هوائية ذكية') {
            updatedData.cadence = 75 + Math.floor(Math.random() * 25);
            updatedData.power = 150 + Math.floor(Math.random() * 80);
            updatedData.distance = Math.round(((d.data.distance || 5) + Math.random() * 1.5) * 10) / 10;
          } else if (d.type === 'جهاز تجديف ذكي') {
            updatedData.strokes = 22 + Math.floor(Math.random() * 10);
            updatedData.distance = (d.data.distance || 1000) + Math.floor(Math.random() * 200);
            updatedData.caloriesBurned = (d.data.caloriesBurned || 80) + Math.floor(Math.random() * 15);
          } else if (d.type === 'جهاز جري ذكي') {
            updatedData.speed = Math.round((8 + Math.random() * 4) * 10) / 10;
            updatedData.distance = Math.round(((d.data.distance || 3) + Math.random() * 0.8) * 10) / 10;
          }
          
          return {
            ...d,
            lastSync: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
            data: updatedData
          };
        }
        return d;
      });

      setDevices(updatedDevices);
      setSyncingId(null);

      // If scale weight is updated, apply it to profile state, recalculate macros, and save everything
      if (weightUpdated && newWeight > 0) {
        // Recalculate BMR and TDEE with new weight
        const info = profile.personal_info;
        if (info) {
          const updatedInfo = { ...info, user_weight: newWeight };
          
          let bmr = (10 * newWeight) + (6.25 * info.user_height) - (5 * info.user_age);
          if (info.user_gender === 'male') bmr += 5;
          else bmr -= 161;
          bmr = Math.round(bmr);
          
          const tdee = Math.round(bmr * info.activity_multiplier);
          let target = tdee;
          if (info.training_goal === 'bulking') target += 500;
          if (info.training_goal === 'cutting') target -= 500;
          
          const protein = Math.round(newWeight * 2.2);
          const fat = Math.round((target * 0.25) / 9);
          const carb = Math.max(0, Math.round((target - (protein * 4) - (fat * 9)) / 4));

          const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
          let updatedHistory = profile.weightHistory ? [...profile.weightHistory] : [];
          if (updatedHistory.length === 0 || updatedHistory[updatedHistory.length - 1].weight !== newWeight) {
            const lastEntry = updatedHistory[updatedHistory.length - 1];
            if (lastEntry && lastEntry.date === today) {
              updatedHistory[updatedHistory.length - 1].weight = newWeight;
            } else {
              updatedHistory.push({ date: today, weight: newWeight });
            }
          }

          const newProfile = {
            ...profile,
            personal_info: updatedInfo,
            calculated_nutrition: {
              calculated_bmr: bmr,
              calculated_tdee: tdee,
              target_calories: target,
              macros: { protein_grams: protein, fat_grams: fat, carb_grams: carb }
            },
            weightHistory: updatedHistory,
            devices: updatedDevices
          };

          setProfile(newProfile);
          if (user) {
            try {
              await setDoc(doc(db, 'users', user.uid), newProfile);
            } catch (dbErr) {
              console.warn("Firestore write failed, using local profile state:", dbErr);
            }
          }
          alert(`تمت المزامنة بنجاح! تم تحديث الوزن الحالي إلى: ${newWeight} كجم وإعادة حساب السعرات الحرارية والماكروز.`);
        }
      } else {
        if (user) {
          try {
            await setDoc(doc(db, 'users', user.uid), { devices: updatedDevices }, { merge: true });
          } catch (dbErr) {
            console.warn("Firestore write failed, using local devices state:", dbErr);
          }
        }
        alert('تمت مزامنة بيانات النشاط والجهد الرياضي بنجاح!');
      }
    }, 1500);
  };

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          // Merge with default to ensure all nested objects exist
          setProfile({
            ...defaultProfile,
            ...data,
            personal_info: { ...defaultProfile.personal_info, ...data.personal_info },
            calculated_nutrition: { ...defaultProfile.calculated_nutrition, ...data.calculated_nutrition }
          });
          if (data.devices) {
            setDevices(data.devices);
          }
        } else {
          setProfile({ ...defaultProfile, uid: user.uid });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      } finally {
        setLoading(false);
      }
    };

    const fetchActivityLog = async () => {
      if (!user?.uid) return;
      try {
        const q = query(
          collection(db, 'users', user.uid, 'workout_progress'),
          orderBy('completed_at', 'desc')
        );
        const snapshot = await getDocs(q);
        const logData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ActivityLogEntry[];
        setActivityLog(logData);
      } catch (error) {
        console.error("Error fetching activity log:", error);
      } finally {
        setLoadingLog(false);
      }
    };

    fetchProfile();
    fetchActivityLog();
  }, [user]);

  const handleDeleteActivity = async (activityId: string) => {
    if (!user) return;
    if (!window.confirm("هل أنت متأكد من رغبتك في حذف هذا النشاط؟")) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'workout_progress', activityId));
      setActivityLog(prev => prev.filter(item => item.id !== activityId));
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert("حدث خطأ أثناء حذف النشاط.");
    }
  };

  const calculateNutrition = () => {
    const info = profile.personal_info;
    if (!info || !info.user_weight || !info.user_height || !info.user_age) {
      alert("الرجاء إدخال العمر، الوزن، والطول بشكل صحيح.");
      return;
    }

    // 1. Calculate BMR (Mifflin-St Jeor Equation)
    let bmr = (10 * info.user_weight) + (6.25 * info.user_height) - (5 * info.user_age);
    if (info.user_gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }
    bmr = Math.round(bmr);

    // 2. Calculate TDEE
    const tdee = Math.round(bmr * info.activity_multiplier);

    // 3. Calculate Target Calories
    let target = tdee;
    if (info.training_goal === 'bulking') target += 500;
    if (info.training_goal === 'cutting') target -= 500;

    // 4. Calculate Macros
    const protein = Math.round(info.user_weight * 2.2);
    const fat = Math.round((target * 0.25) / 9);
    const carb = Math.max(0, Math.round((target - (protein * 4) - (fat * 9)) / 4));

    setProfile(prev => ({
      ...prev,
      calculated_nutrition: {
        calculated_bmr: bmr,
        calculated_tdee: tdee,
        target_calories: target,
        macros: {
          protein_grams: protein,
          fat_grams: fat,
          carb_grams: carb
        }
      }
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      // Update weight history
      let updatedHistory = profile.weightHistory ? [...profile.weightHistory] : [];
      const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      const currentWeight = profile.personal_info?.user_weight;

      if (currentWeight) {
        if (updatedHistory.length === 0 || updatedHistory[updatedHistory.length - 1].weight !== currentWeight) {
          const lastEntry = updatedHistory[updatedHistory.length - 1];
          if (lastEntry && lastEntry.date === today) {
            updatedHistory[updatedHistory.length - 1].weight = currentWeight;
          } else {
            updatedHistory.push({ date: today, weight: currentWeight });
          }
        }
      }

      const updatedProfile = { ...profile, uid: user.uid, weightHistory: updatedHistory, devices: devices };
      await setDoc(doc(db, 'users', user.uid), updatedProfile);
      setProfile(updatedProfile);
      alert('تم حفظ الملف الشخصي بنجاح!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    } finally {
      setSaving(false);
    }
  };

  const updatePersonalInfo = (field: keyof UserProfile['personal_info'], value: any) => {
    setProfile(prev => ({
      ...prev,
      personal_info: {
        ...prev.personal_info!,
        [field]: value
      }
    }));
  };

  const nutrition = profile.calculated_nutrition;
  const info = profile.personal_info;

  const macroData = [
    { name: 'بروتين', value: nutrition?.macros.protein_grams || 0, color: '#a855f7' }, // purple-500
    { name: 'كاربوهيدرات', value: nutrition?.macros.carb_grams || 0, color: '#3b82f6' }, // blue-500
    { name: 'دهون', value: nutrition?.macros.fat_grams || 0, color: '#eab308' }, // yellow-500
  ];

  const displayHistory = profile.weightHistory?.length
    ? profile.weightHistory
    : info?.user_weight ? [{ date: 'الآن', weight: info.user_weight }] : [];

  const availableBrands = Array.from(new Set(AVAILABLE_DEVICES.filter(d => d.type === selectedType).map(d => d.brand)));
  const availableModels = AVAILABLE_DEVICES.filter(d => d.type === selectedType && d.brand === selectedBrand);

  const getProgramRoute = (activity: ActivityLogEntry) => {
    const name = (activity.program_name || '').toLowerCase();
    const type = (activity.workout_type || '').toLowerCase();

    if (name.includes('قوة') || name.includes('عضل') || type.includes('muscle')) return '/programs/muscle-strength';
    if (name.includes('تنشيف') || name.includes('دهون') || type.includes('fat')) return '/programs/fat-loss';
    if (name.includes('سرعة') || name.includes('speed')) return '/education/training/speed';
    if (name.includes('بدء') || name.includes('بلوك')) return '/education/training/speed/starting-block';
    if (name.includes('أقصى') || name.includes('max')) return '/education/training/speed/max-speed';
    if (name.includes('انفجاري') || name.includes('power')) return '/education/training/speed/explosive-power';
    if (name.includes('تحمل') || name.includes('endurance')) return '/education/training/speed/speed-endurance';
    if (name.includes('رشاقة') || name.includes('agility')) return '/education/training/speed/agility';
    if (name.includes('توازن') || name.includes('balance')) return '/education/training/speed/balance';
    if (name.includes('توافق') || name.includes('coordination')) return '/education/training/speed/coordination';
    if (name.includes('بليومتريك') || name.includes('plyo')) return '/education/training/speed/plyometrics';
    if (name.includes('قصير') || name.includes('short')) return '/education/training/speed/short-sprints';
    if (name.includes('أطفال') || name.includes('kids')) return '/kids-training';
    
    // Default fallback
    return '/programs';
  };

  if (loading) return (
    <div className="space-y-8 pb-12 animate-pulse">
      <header>
        <div className="h-10 bg-zinc-900 rounded-lg w-48 mb-2"></div>
        <div className="h-4 bg-zinc-900 rounded w-64"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6 bg-zinc-950 p-8 rounded-3xl border border-zinc-800">
          <div className="h-8 bg-zinc-900 rounded w-48 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-zinc-900 rounded w-28"></div>
                <div className="h-14 bg-zinc-900 rounded-2xl w-full"></div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-10">
            <div className="h-14 bg-zinc-900 rounded-2xl flex-1"></div>
            <div className="h-14 bg-zinc-900 rounded-2xl flex-1"></div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800">
            <div className="h-6 bg-zinc-900 rounded w-32 mb-8 mx-auto"></div>
            <div className="h-56 w-56 bg-zinc-900 rounded-full mx-auto mb-8 border-8 border-zinc-800/50"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex justify-between items-center bg-zinc-900/30 p-3 rounded-xl">
                  <div className="h-4 bg-zinc-900 rounded w-20"></div>
                  <div className="h-4 bg-zinc-900 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">ملفك الشخصي</h1>
            <p className="text-zinc-400 text-lg font-medium">أدخل بياناتك لحساب احتياجاتك بدقة علمية متطورة.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* User Inputs Section */}
        <div className="lg:col-span-8 space-y-8 bg-zinc-950 p-8 md:p-10 rounded-[2.5rem] border border-purple-900/30 shadow-2xl shadow-purple-900/5 transition-all hover:border-purple-500/30">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <Activity className="w-8 h-8 text-purple-500 bg-purple-500/10 p-1.5 rounded-xl" />
            البيانات الأساسية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">العمر</label>
              <input
                type="number"
                value={info?.user_age || ''}
                onChange={e => updatePersonalInfo('user_age', Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="25"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">النوع</label>
              <select
                value={info?.user_gender || 'male'}
                onChange={e => updatePersonalInfo('user_gender', e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">الطول (سم)</label>
              <input
                type="number"
                value={info?.user_height || ''}
                onChange={e => updatePersonalInfo('user_height', Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="175"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">الوزن الحالي (كجم)</label>
              <input
                type="number"
                value={info?.user_weight || ''}
                onChange={e => updatePersonalInfo('user_weight', Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="75"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">معدل النشاط اليومي</label>
              <select
                value={info?.activity_multiplier || 1.55}
                onChange={e => updatePersonalInfo('activity_multiplier', Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                {activityLevels.map(level => (
                  <option key={level.id} value={level.id}>{level.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">الهدف التدريبي</label>
              <select
                value={info?.training_goal || 'maintenance'}
                onChange={e => updatePersonalInfo('training_goal', e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                {goals.map(goal => (
                  <option key={goal.id} value={goal.id}>{goal.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              onClick={calculateNutrition}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              حساب الاحتياجات
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {saving ? 'جاري الحفظ...' : 'حفظ البيانات'}
            </button>
          </div>
        </div>

        {/* Calculated Outputs Section */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gradient-to-br from-purple-900 to-black p-6 rounded-3xl border border-purple-500/30 text-center relative overflow-hidden">
            <Flame className="absolute -right-4 -bottom-4 w-24 h-24 text-purple-500/10" />
            <h3 className="text-purple-300 font-medium uppercase tracking-widest text-sm mb-2 relative z-10">معدل الأيض الأساسي (BMR)</h3>
            <div className="text-4xl font-bold text-white mb-1 relative z-10">
              {nutrition?.calculated_bmr ? nutrition.calculated_bmr : '---'}
            </div>
            <p className="text-purple-400/60 text-xs relative z-10">سعرة حرارية / يوم</p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-3xl border border-zinc-800 text-center relative overflow-hidden">
            <Activity className="absolute -left-4 -bottom-4 w-24 h-24 text-zinc-500/10" />
            <h3 className="text-zinc-400 font-medium uppercase tracking-widest text-sm mb-2 relative z-10">إجمالي استهلاك الطاقة (TDEE)</h3>
            <div className="text-4xl font-bold text-purple-500 mb-1 relative z-10">
              {nutrition?.calculated_tdee ? nutrition.calculated_tdee : '---'}
            </div>
            <p className="text-zinc-500 text-xs relative z-10">سعرة حرارية / يوم</p>
          </div>

          {nutrition?.target_calories > 0 && (
            <div className="bg-zinc-950 p-6 rounded-3xl border border-zinc-800">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-purple-500" />
                <h3 className="text-white font-medium">الهدف: {goals.find(g => g.id === info?.training_goal)?.label}</h3>
              </div>
              <div className="text-center mb-6 bg-zinc-900/50 py-4 rounded-2xl border border-zinc-800/50">
                <div className="text-4xl font-black text-white mb-1">{nutrition.target_calories}</div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest">السعرات المستهدفة</p>
              </div>

              <div className="flex items-center justify-center h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value: number) => [`${value}g`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                {macroData.map((macro) => (
                  <div key={macro.name} className="flex flex-col items-center bg-zinc-900/30 p-2 rounded-xl border border-zinc-800/30">
                    <div className="w-3 h-3 rounded-full mb-2" style={{ backgroundColor: macro.color }} />
                    <span className="text-xl font-bold text-white">{macro.value}</span>
                    <span className="text-xs text-zinc-500 mt-1">{macro.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Weight History Chart */}
      {displayHistory.length > 0 && (
        <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-white">تطور الوزن</h2>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#71717a"
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={['dataMin - 2', 'dataMax + 2']}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                  labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
                  itemStyle={{ color: '#a855f7', fontWeight: 'bold' }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  name="الوزن (كجم)"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{ fill: '#a855f7', strokeWidth: 2, r: 4, stroke: '#18181b' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* الأجهزة الرياضية المتصلة */}
      <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 mt-8 text-right">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400">
              <Link2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">الأجهزة الرياضية المتصلة</h2>
              <p className="text-zinc-400 text-sm mt-1">اربط أجهزتك الرياضية الذكية لمزامنة بيانات النشاط والسعرات وتحديث الوزن تلقائياً</p>
            </div>
          </div>
          <button
            onClick={startBluetoothScan}
            className="flex items-center justify-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 px-4 py-2.5 rounded-xl font-bold transition-all duration-300 active:scale-95 text-sm cursor-pointer"
          >
            <Bluetooth size={16} className="animate-pulse" />
            <span>البحث عن الأجهزة بالبلوتوث</span>
          </button>
        </div>

        {/* Bluetooth Scanner Panel */}
        {showBluetoothScanner && (
          <div className="bg-blue-950/20 border border-blue-500/30 rounded-2xl p-6 mb-8 relative overflow-hidden text-right">
            <div className="absolute top-4 left-4">
              <button 
                onClick={() => setShowBluetoothScanner(false)}
                className="text-zinc-400 hover:text-white text-xs font-bold bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 cursor-pointer"
              >
                إغلاق
              </button>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                <Bluetooth className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">ماسح البلوتوث الرياضي</h3>
                <p className="text-blue-300/70 text-xs">البحث التلقائي والاقتران السريع بالأجهزة الرياضية القريبة</p>
              </div>
            </div>

            {!isScanningBluetooth && bluetoothDevices.length === 0 ? (
              <div className="text-center py-8 space-y-6">
                <div className="max-w-md mx-auto space-y-2">
                  <p className="text-white font-bold text-md">اختر طريقة الاقتران المفضلة</p>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    يمكنك البحث عن أجهزة بلوتوث حقيقية قريبة (مثل الساعات والموازين الذكية)، أو تفعيل وضع المحاكاة للاقتران الافتراضي وتجربة الواجهة مباشرةً.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={startRealBluetoothScan}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all duration-300 transform active:scale-95 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Bluetooth size={16} />
                    فحص الأجهزة الحقيقية
                  </button>
                  <button
                    onClick={runSimulation}
                    className="w-full sm:w-auto px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-xl font-bold text-sm transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw size={16} />
                    تفعيل أجهزة المحاكاة الافتراضية
                  </button>
                </div>
              </div>
            ) : isScanningBluetooth ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping opacity-75"></div>
                  <div className="absolute inset-2 rounded-full bg-blue-500/30 animate-pulse"></div>
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white relative z-10 shadow-lg shadow-blue-500/40">
                    <Bluetooth className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-white font-medium text-sm animate-pulse">جاري فحص النطاق بحثاً عن أجهزة رياضية متاحة...</p>
                  <p className="text-blue-400/60 text-xs">تأكد من تشغيل البلوتوث في جهازك الرياضي وجعله قابلاً للاكتشاف</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-blue-400/80 pb-2 border-b border-blue-500/10">
                  <span>تم العثور على {bluetoothDevices.length} أجهزة قريبة</span>
                  <div className="flex gap-3">
                    <button 
                      onClick={startRealBluetoothScan}
                      className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-blue-400 font-bold"
                    >
                      <Bluetooth size={12} />
                      فحص حقيقي
                    </button>
                    <button 
                      onClick={runSimulation}
                      className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-zinc-400 font-bold"
                    >
                      <RefreshCw size={12} />
                      محاكاة
                    </button>
                  </div>
                </div>

                {bluetoothDevices.length === 0 ? (
                  <p className="text-center py-6 text-zinc-400 text-sm">لم يتم العثور على أي أجهزة بلوتوث قريبة. حاول مجدداً.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bluetoothDevices.map((device) => (
                      <div 
                        key={device.id}
                        className="bg-zinc-900/80 border border-blue-500/10 hover:border-blue-500/30 rounded-xl p-4 flex items-center justify-between transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-zinc-950 rounded-lg flex items-center justify-center border border-zinc-800">
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-bold text-sm">{device.name}</h4>
                              <span className="bg-blue-500/10 text-blue-400 text-[10px] px-1.5 py-0.5 rounded border border-blue-500/20">
                                {device.brand}
                              </span>
                            </div>
                            <span className="text-zinc-500 text-xs block">{device.type} • إشارة قوية</span>
                          </div>
                        </div>

                        <button
                          onClick={() => connectBluetoothDevice(device)}
                          disabled={connectingBluetoothId !== null}
                          className="bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                        >
                          {connectingBluetoothId === device.id ? (
                            <>
                              <RefreshCw size={12} className="animate-spin" />
                              <span>جاري الاقتران...</span>
                            </>
                          ) : (
                            <>
                              <Bluetooth size={12} />
                              <span>اقتران وتوصيل</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Device Selectors Grid */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 mb-8">
          <h3 className="text-white font-semibold mb-4 text-md">ربط جهاز رياضي جديد</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* نوع الجهاز */}
            <div className="flex flex-col gap-2">
              <label className="text-zinc-400 text-sm font-medium">1. نوع الجهاز</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-right text-sm cursor-pointer"
              >
                {DEVICE_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* الشركة المصنعة */}
            <div className="flex flex-col gap-2">
              <label className="text-zinc-400 text-sm font-medium">2. الشركة المصنعة</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-right text-sm cursor-pointer"
                disabled={!selectedType}
              >
                {availableBrands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* الموديل */}
            <div className="flex flex-col gap-2">
              <label className="text-zinc-400 text-sm font-medium">3. الموديل والمواصفات</label>
              <select
                value={selectedDeviceToAdd}
                onChange={(e) => setSelectedDeviceToAdd(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-right text-sm cursor-pointer"
                disabled={!selectedBrand}
              >
                {availableModels.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleAddAndConnectDevice}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              <Link2 size={18} />
              <span>ربط ومزامنة الجهاز</span>
            </button>
          </div>
        </div>

        {/* Connected Devices List */}
        {devices.length === 0 ? (
          <div className="text-center py-12 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
              <Watch className="w-8 h-8 text-zinc-600" />
            </div>
            <p className="text-zinc-400 text-lg font-medium">لا توجد أجهزة رياضية متصلة حالياً</p>
            <p className="text-zinc-500 text-sm mt-1 max-w-md">اختر نوع الجهاز والشركة ثم الموديل من القائمة أعلاه لبدء ربط أجهزتك ومتابعة أدائك</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {devices.map((device) => (
              <div
                key={device.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300"
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="bg-purple-500/10 text-purple-400 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/20">
                      {device.brand}
                    </span>
                    <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800">
                      {getDeviceIcon(device.type)}
                    </div>
                  </div>

                  {/* Device Info */}
                  <h4 className="text-white font-bold text-lg mb-1">{device.name}</h4>
                  <span className="text-zinc-500 text-xs block mb-3">{device.type}</span>
                  <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{device.function}</p>

                  {/* Device Metrics Dashboard */}
                  <div className="bg-zinc-950/60 rounded-xl p-4 mb-4 grid grid-cols-2 gap-3 text-right">
                    {device.data.steps !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">خطوات اليوم</span>
                        <span className="text-white font-bold text-md">{device.data.steps.toLocaleString('ar-EG')}</span>
                      </div>
                    )}
                    {device.data.caloriesBurned !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">السعرات المحروقة</span>
                        <span className="text-purple-400 font-bold text-md">{device.data.caloriesBurned} سعرة</span>
                      </div>
                    )}
                    {device.data.heartRate !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">نبضات القلب</span>
                        <span className="text-rose-500 font-bold text-md">{device.data.heartRate} نبضة/د</span>
                      </div>
                    )}
                    {device.data.weight !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">الوزن المسجل</span>
                        <span className="text-emerald-400 font-bold text-md">{device.data.weight} كجم</span>
                      </div>
                    )}
                    {device.data.cadence !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">معدل التبديل</span>
                        <span className="text-yellow-500 font-bold text-md">{device.data.cadence} د/د</span>
                      </div>
                    )}
                    {device.data.power !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">قوة الدفع (الواط)</span>
                        <span className="text-blue-400 font-bold text-md">{device.data.power} واط</span>
                      </div>
                    )}
                    {device.data.distance !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">المسافة</span>
                        <span className="text-cyan-400 font-bold text-md">{device.data.distance} كم</span>
                      </div>
                    )}
                    {device.data.strokes !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">معدل السحب</span>
                        <span className="text-pink-400 font-bold text-md">{device.data.strokes} سحبة/د</span>
                      </div>
                    )}
                    {device.data.speed !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">السرعة</span>
                        <span className="text-orange-400 font-bold text-md">{device.data.speed} كم/س</span>
                      </div>
                    )}
                    {device.data.incline !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">مستوى الميل</span>
                        <span className="text-indigo-400 font-bold text-md">{device.data.incline} %</span>
                      </div>
                    )}
                    {device.data.sleepDuration !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">مدة النوم</span>
                        <span className="text-indigo-400 font-bold text-md">{device.data.sleepDuration}</span>
                      </div>
                    )}
                    {device.data.spo2 !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">نسبة الأكسجين SpO2</span>
                        <span className="text-sky-400 font-bold text-md">{device.data.spo2} %</span>
                      </div>
                    )}
                    {device.data.stressLevel !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">مستوى الإجهاد</span>
                        <span className="text-orange-500 font-bold text-md">{device.data.stressLevel}</span>
                      </div>
                    )}
                    {device.data.bodyFat !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">نسبة الدهون</span>
                        <span className="text-red-400 font-bold text-md">{device.data.bodyFat} %</span>
                      </div>
                    )}
                    {device.data.muscleMass !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">الكتلة العضلية</span>
                        <span className="text-teal-400 font-bold text-md">{device.data.muscleMass} كجم</span>
                      </div>
                    )}
                    {device.data.bodyWater !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">نسبة المياه</span>
                        <span className="text-blue-400 font-bold text-md">{device.data.bodyWater} %</span>
                      </div>
                    )}
                    {device.data.boneMass !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">كتلة العظام</span>
                        <span className="text-amber-600 font-bold text-md">{device.data.boneMass} كجم</span>
                      </div>
                    )}
                    {device.data.visceralFat !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">الدهون الحشوية</span>
                        <span className="text-red-500 font-bold text-md">{device.data.visceralFat}</span>
                      </div>
                    )}
                    {device.data.bmr !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">معدل الأيض BMR</span>
                        <span className="text-emerald-500 font-bold text-md">{device.data.bmr} سعرة</span>
                      </div>
                    )}
                    {device.data.effortLevel !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">مستوى الجهد</span>
                        <span className="text-violet-400 font-bold text-md">{device.data.effortLevel}</span>
                      </div>
                    )}
                    {device.data.hrv !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">تقلب ضربات القلب HRV</span>
                        <span className="text-fuchsia-400 font-bold text-md">{device.data.hrv} ms</span>
                      </div>
                    )}
                    {device.data.resistance !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">المقاومة الرقمية</span>
                        <span className="text-slate-400 font-bold text-md">مستوى {device.data.resistance}</span>
                      </div>
                    )}
                    {device.data.splitTime !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">معدل الوقت /500م</span>
                        <span className="text-rose-400 font-bold text-md">{device.data.splitTime}</span>
                      </div>
                    )}
                    {device.data.durationMins !== undefined && (
                      <div>
                        <span className="text-zinc-500 text-xs block">مدة التمرين</span>
                        <span className="text-lime-400 font-bold text-md">{device.data.durationMins} دقيقة</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="border-t border-zinc-800/80 pt-4 mt-2 flex items-center justify-between">
                  <span className="text-zinc-500 text-xs">
                    آخر مزامنة: <span className="text-zinc-400">{device.lastSync}</span>
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSyncDevice(device.id)}
                      disabled={syncingId !== null}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                        syncingId === device.id
                          ? 'bg-purple-600/20 text-purple-400'
                          : 'bg-zinc-800 hover:bg-purple-600 hover:text-white text-zinc-300'
                      }`}
                    >
                      <RefreshCw size={13} className={syncingId === device.id ? 'animate-spin' : ''} />
                      <span>{syncingId === device.id ? 'مزامنة...' : 'مزامنة الآن'}</span>
                    </button>
                    
                    <button
                      onClick={() => handleDisconnectDevice(device.id)}
                      className="px-3 py-2 rounded-lg text-xs font-bold bg-zinc-800/50 hover:bg-red-500/10 hover:text-red-500 text-zinc-400 transition-all duration-300 cursor-pointer"
                    >
                      إلغاء الربط
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Log */}
      <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ClipboardList className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-white">سجل الأنشطة</h2>
          </div>
        </div>

        {loadingLog ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : activityLog.length > 0 ? (
          <div className="space-y-4">
            {activityLog.map((activity) => (
              <div 
                key={activity.id} 
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('.delete-btn')) return;
                  navigate(getProgramRoute(activity));
                }}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800 hover:border-zinc-700 transition-all shadow-sm"
              >
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{activity.program_name || 'تمرين عام'}</h3>
                  <p className="text-zinc-400 text-sm">{activity.day_title || activity.workout_type || 'نشاط غير محدد'}</p>
                </div>
                <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-4">
                  <div className="text-right">
                    <p className="text-white text-sm">
                      {activity.completed_at?.toDate ? activity.completed_at.toDate().toLocaleDateString('ar-EG') : 'تاريخ غير معروف'}
                    </p>
                    <p className="text-zinc-500 text-xs text-left">
                      {activity.completed_at?.toDate ? activity.completed_at.toDate().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteActivity(activity.id);
                    }}
                    className="delete-btn p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors shrink-0 cursor-pointer"
                    title="حذف النشاط"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
            <Activity className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400">لا يوجد أنشطة مسجلة حتى الآن.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
