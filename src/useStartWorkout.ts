import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './AuthContext';

export function useStartWorkout() {
  const { user } = useAuth();
  const [isStarting, setIsStarting] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);

  const handleStartWorkout = async (programName: string, exerciseName: string, programId: string = 'prog_002') => {
    if (!user) {
      alert('يرجى تسجيل الدخول لحفظ تقدمك.');
      return;
    }
    setIsStarting(true);
    try {
      const workoutId = `${programId}_${Date.now()}`;
      const docRef = doc(db, 'users', user.uid, 'workout_progress', workoutId);
      await setDoc(docRef, {
        program_id: programId,
        program_name: programName,
        workout_type: 'speed_fitness',
        day_title: exerciseName,
        completed_at: serverTimestamp(),
      });
      setWorkoutStarted(true);
      setTimeout(() => setWorkoutStarted(false), 3000);
    } catch (error) {
      console.error('Error saving workout:', error);
      alert('حدث خطأ أثناء حفظ التمرين. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsStarting(false);
    }
  };

  return { isStarting, workoutStarted, handleStartWorkout };
}
