import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, logOut } from '../firebase';
import { useAuth } from '../AuthContext';
import { handleFirestoreError, OperationType } from '../errorHandling';
import { Save, Settings as SettingsIcon, Globe, Bell, RefreshCw, Activity, CheckCircle2, Trash2, LogOut, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

import { programsData } from './Programs';

export default function Settings() {
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();
  const isAr = language === 'ar';
  const isGuest = !user || user.uid === 'mock-user-123';
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const [settings, setSettings] = useState({
    height: 175,
    weight: 75,
    language: 'ar',
    notifications: true,
  });

  const [bmi, setBmi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const handleLogOut = async () => {
    if (window.confirm(isAr ? 'هل أنت متأكد من رغبتك في تسجيل الخروج؟' : 'Are you sure you want to log out?')) {
      await logOut();
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirm1 = window.confirm(
      isAr 
        ? 'تحذير: هل أنت متأكد من رغبتك في حذف حسابك نهائياً؟ لا يمكن التراجع عن هذا الإجراء.' 
        : 'Warning: Are you sure you want to permanently delete your account? This action cannot be undone.'
    );
    if (!confirm1) return;
    const confirm2 = window.confirm(
      isAr 
        ? 'سيتم حذف كافة تفضيلاتك، خططك الغذائية، وسجلات الأنشطة والأجهزة المتصلة من قاعدة البيانات. هل تريد الاستمرار بحذف الحساب؟' 
        : 'All your preferences, diet plans, activity logs, and connected devices will be deleted from the database. Do you want to proceed with account deletion?'
    );
    if (!confirm2) return;

    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'users', user.uid));
      try {
        await user.delete();
      } catch (authError) {
        console.warn("Could not delete Auth user directly (requires recent login), signing out instead.", authError);
      }
      await logOut();
      alert(
        isAr 
          ? 'تم حذف الحساب والبيانات بالكامل بنجاح. يمكنك الآن التسجيل بحساب جديد.' 
          : 'Account and all data deleted successfully. You can now register a new account.'
      );
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(
        isAr 
          ? 'حدث خطأ أثناء حذف الحساب. تم تسجيل خروجك لحماية خصوصيتك.' 
          : 'An error occurred while deleting the account. You have been logged out to protect your privacy.'
      );
      await logOut();
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.personal_info) {
            setSettings(prev => ({
              ...prev,
              height: data.personal_info.user_height || 175,
              weight: data.personal_info.user_weight || 75,
            }));
          }
          if (data.settings) {
            setSettings(prev => ({
              ...prev,
              ...data.settings
            }));
            if (data.settings.language) {
              setLanguage(data.settings.language as 'ar' | 'en');
            }
          }
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [user]);

  useEffect(() => {
    if (settings.height > 0 && settings.weight > 0) {
      const heightInMeters = settings.height / 100;
      const calculatedBmi = settings.weight / (heightInMeters * heightInMeters);
      setBmi(Number(calculatedBmi.toFixed(1)));
    }
  }, [settings.height, settings.weight]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      
      let updatedData: any = {
        settings: {
          language: settings.language,
          notifications: settings.notifications
        }
      };

      if (docSnap.exists()) {
        const data = docSnap.data();
        updatedData.personal_info = {
          ...(data.personal_info || {}),
          user_height: settings.height,
          user_weight: settings.weight
        };
      } else {
        updatedData.personal_info = {
          user_height: settings.height,
          user_weight: settings.weight
        };
      }

      await setDoc(docRef, updatedData, { merge: true });
      alert(isAr ? 'تم حفظ الإعدادات بنجاح!' : 'Settings saved successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSyncPrograms = async () => {
    setSyncing(true);
    setSyncSuccess(false);
    try {
      // Sync programsData to Firestore
      for (const program of programsData) {
        await setDoc(doc(db, 'programs', program.program_id), program);
      }
      
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    } catch (error) {
      console.error("Error syncing programs:", error);
      alert(isAr ? "حدث خطأ أثناء المزامنة" : "An error occurred during synchronization");
    } finally {
      setSyncing(false);
    }
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: isAr ? 'نقص في الوزن' : 'Underweight', color: 'text-blue-400' };
    if (bmi >= 18.5 && bmi < 24.9) return { label: isAr ? 'وزن طبيعي' : 'Normal Weight', color: 'text-green-400' };
    if (bmi >= 25 && bmi < 29.9) return { label: isAr ? 'زيادة في الوزن' : 'Overweight', color: 'text-yellow-400' };
    return { label: isAr ? 'سمنة' : 'Obese', color: 'text-red-400' };
  };

  if (loading) return (
    <div className="space-y-8 pb-12 animate-pulse">
      <header className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800"></div>
        <div>
          <div className="h-8 bg-zinc-900 rounded-lg w-48 mb-2"></div>
          <div className="h-4 bg-zinc-900 rounded w-64"></div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 space-y-6">
          <div className="h-6 bg-zinc-900 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 bg-zinc-900 rounded w-24"></div>
              <div className="h-12 bg-zinc-900 rounded-xl w-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-zinc-900 rounded w-24"></div>
              <div className="h-12 bg-zinc-900 rounded-xl w-full"></div>
            </div>
          </div>
          <div className="h-24 bg-zinc-900 rounded-2xl w-full mt-6"></div>
        </div>

        <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 space-y-6">
          <div className="h-6 bg-zinc-900 rounded w-48 mb-6"></div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-5 bg-zinc-900 rounded w-32 mb-2"></div>
                <div className="h-4 bg-zinc-900 rounded w-48"></div>
              </div>
              <div className="w-12 h-6 bg-zinc-900 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="h-5 bg-zinc-900 rounded w-32 mb-2"></div>
                <div className="h-4 bg-zinc-900 rounded w-48"></div>
              </div>
              <div className="w-12 h-6 bg-zinc-900 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const bmiCategory = getBmiCategory(bmi);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <header className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-900/30 flex items-center justify-center border border-purple-500/30 group hover:bg-purple-900/50 hover:border-purple-500/50 transition-colors cursor-pointer">
          <SettingsIcon className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">{isAr ? 'الإعدادات' : 'Settings'}</h1>
          <p className="text-zinc-400">{isAr ? 'تخصيص تجربتك وتحديث بياناتك الجسدية' : 'Customize your experience and update physical details'}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Physical Data */}
        <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-500" /> {isAr ? 'البيانات الجسدية' : 'Physical Details'}
          </h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">{isAr ? 'الطول (سم)' : 'Height (cm)'}</label>
              <input 
                type="number" 
                value={settings.height} 
                onChange={e => setSettings({...settings, height: Number(e.target.value)})}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">{isAr ? 'الوزن (كجم)' : 'Weight (kg)'}</label>
              <input 
                type="number" 
                value={settings.weight} 
                onChange={e => setSettings({...settings, weight: Number(e.target.value)})}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400 mb-1">{isAr ? 'مؤشر كتلة الجسم (BMI)' : 'Body Mass Index (BMI)'}</p>
              <div className="text-3xl font-bold text-white">{bmi}</div>
            </div>
            <div className={`px-4 py-2 rounded-full bg-zinc-950 border border-zinc-800 text-sm font-medium ${bmiCategory.color}`}>
              {bmiCategory.label}
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-purple-500" /> {isAr ? 'تفضيلات التطبيق' : 'App Preferences'}
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-2xl border border-zinc-800/50">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-zinc-400" />
                <div>
                  <p className="text-white font-medium">{isAr ? 'اللغة (Language)' : 'Language'}</p>
                  <p className="text-xs text-zinc-500">{isAr ? 'اختر لغة واجهة التطبيق' : 'Choose app interface language'}</p>
                </div>
              </div>
              <select 
                value={settings.language}
                onChange={e => {
                  const newLang = e.target.value as 'ar' | 'en';
                  setSettings({...settings, language: newLang});
                  setLanguage(newLang);
                }}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-2xl border border-zinc-800/50">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-zinc-400" />
                <div>
                  <p className="text-white font-medium">{isAr ? 'الإشعارات' : 'Notifications'}</p>
                  <p className="text-xs text-zinc-500">{isAr ? 'تفعيل إشعارات التذكير بالتمرين' : 'Enable training reminders'}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={settings.notifications}
                  onChange={e => setSettings({...settings, notifications: e.target.checked})}
                />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Data Sync */}
        <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 space-y-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-purple-500" /> {isAr ? 'مزامنة البيانات' : 'Data Synchronization'}
          </h2>
          <p className="text-zinc-400 text-sm">
            {isAr 
              ? 'قم بمزامنة برامج التدريب (التضخيم، السرعة، المرونة) من قاعدة البيانات لملء القوائم تلقائياً.' 
              : 'Sync training programs (Hypertrophy, Speed, Flexibility) from the database to automatically populate lists.'}
          </p>
          
          <button 
            onClick={handleSyncPrograms}
            disabled={syncing}
            className={`w-full py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${
              syncSuccess 
                ? 'bg-green-600/20 text-green-500 border border-green-500/50' 
                : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800'
            }`}
          >
            {syncing ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : syncSuccess ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <RefreshCw className="w-5 h-5" />
            )}
            {syncing 
              ? (isAr ? 'جاري المزامنة...' : 'Syncing...') 
              : syncSuccess 
                ? (isAr ? 'تمت المزامنة بنجاح!' : 'Synced successfully!') 
                : (isAr ? 'مزامنة البرامج التدريبية' : 'Sync Training Programs')}
          </button>
        </div>

        {/* Danger Zone */}
        {isGuest ? (
          <div className="bg-zinc-950 p-8 rounded-3xl border border-purple-900/30 space-y-6 lg:col-span-2">
            <h2 className="text-xl font-bold text-purple-400 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-purple-500" /> {isAr ? 'إدارة الحساب (وضع الزائر)' : 'Account Management (Guest Mode)'}
            </h2>
            <p className="text-zinc-400 text-sm">
              {isAr 
                ? 'أنت تستخدم التطبيق حالياً كزائر. يمكنك تسجيل الدخول أو إنشاء حساب لحفظ بياناتك الرياضية وخططك الغذائية بشكل دائم.' 
                : 'You are currently using the app as a guest. You can log in or create an account to save your fitness data and diet plans permanently.'}
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5 text-white/80 rotate-180" />
                {isAr ? 'تسجيل الدخول / إنشاء حساب جديد' : 'Log In / Register New Account'}
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-950 p-8 rounded-3xl border border-red-900/30 space-y-6 lg:col-span-2">
            <h2 className="text-xl font-bold text-red-500 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> {isAr ? 'منطقة الخطورة والإدارة' : 'Danger Zone & Administration'}
            </h2>
            <p className="text-zinc-400 text-sm">
              {isAr 
                ? 'يمكنك تسجيل الخروج من حسابك الحالي أو حذف الحساب وجميع البيانات والخطط المسجلة نهائياً لجعل التطبيق خالياً ومستعداً لتسجيل جديد.' 
                : 'You can log out of your current account or delete the account and all registered data and plans permanently to reset the application.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleLogOut}
                className="flex-1 py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-5 h-5 text-zinc-400" />
                {isAr ? 'تسجيل الخروج' : 'Log Out'}
              </button>

              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex-1 py-4 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 hover:border-red-500 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {deleting ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
                {deleting 
                  ? (isAr ? 'جاري حذف الحساب...' : 'Deleting account...') 
                  : (isAr ? 'حذف الحساب نهائياً' : 'Permanently Delete Account')}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="pt-4">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="w-full md:w-auto px-12 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <Save className="w-5 h-5" />
          {saving 
            ? (isAr ? 'جاري الحفظ...' : 'Saving...') 
            : (isAr ? 'حفظ الإعدادات' : 'Save Settings')}
        </button>
      </div>
    </motion.div>
  );
}
