import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';

export function usePersistentState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { user } = useAuth();
  
  // نستخدم معرف المستخدم لضمان عزل بيانات كل مستخدم
  const prefix = user?.uid ? `user_${user.uid}` : 'guest';
  const fullKey = `${prefix}_${key}`;

  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(fullKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${fullKey}":`, error);
      return initialValue;
    }
  });

  // تحديث التخزين المحلي عند تغير القيمة
  useEffect(() => {
    try {
      window.localStorage.setItem(fullKey, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error setting localStorage key "${fullKey}":`, error);
    }
  }, [fullKey, state]);

  // في حال قام المستخدم بتغيير الحساب (تسجيل خروج ودخول لحساب آخر)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(fullKey);
      if (item) {
        setState(JSON.parse(item));
      } else {
        setState(initialValue);
      }
    } catch (error) {
      console.warn(`Error reloading localStorage key "${fullKey}":`, error);
    }
    // نتجاهل initialValue هنا لمنع الحلقات اللانهائية
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullKey]);

  return [state, setState];
}
