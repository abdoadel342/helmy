import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { doc, getDoc, setDoc, collection, query, where, getDocs, addDoc, onSnapshot, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import { FadeContent } from '../components/react-bits/FadeContent';
import GradientText from '../components/react-bits/GradientText';
import { Link } from 'react-router-dom';

interface UserProfile {
  uid: string;
  role?: 'coach' | 'trainee';
  joinedGroups?: Group[]; // For trainees
  personal_info?: any;
}

interface Group {
  id: string;
  name: string;
  coachId: string;
  createdAt: any;
}

interface InviteCode {
  id: string;
  groupId: string;
  used: boolean;
  createdAt: any;
}

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: any;
}

export default function Team() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Inputs
  const [groupNameInput, setGroupNameInput] = useState('');
  const [joinCodeInput, setJoinCodeInput] = useState('');

  // Groups Lists
  const [ownedGroups, setOwnedGroups] = useState<Group[]>([]); // Coach's created groups
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]); // Trainee's joined groups

  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  // Active Group Data
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!user) return;
    
    // Load local storage fallback first
    const localProfileStr = localStorage.getItem(`team_profile_${user.uid}`);
    if (localProfileStr) {
      try {
        const localP = JSON.parse(localProfileStr);
        if (localP && localP.role) {
          setProfile(localP);
          if (localP.joinedGroups) {
            setJoinedGroups(localP.joinedGroups);
          }
        }
      } catch (e) {}
    }

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        let currentProfile: UserProfile = { uid: user.uid };
        if (docSnap.exists()) {
          currentProfile = docSnap.data() as UserProfile;
          if (currentProfile.joinedGroups) {
            setJoinedGroups(currentProfile.joinedGroups);
          }
          localStorage.setItem(`team_profile_${user.uid}`, JSON.stringify(currentProfile));
        }
        setProfile(currentProfile);

        if (currentProfile.role === 'coach') {
          await fetchOwnedGroups();
        }
      } catch (error) {
        console.warn("Firestore access denied, using local profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const fetchOwnedGroups = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, 'groups'), where('coachId', '==', user.uid));
      const snapshot = await getDocs(q);
      const groups = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Group));
      setOwnedGroups(groups);
    } catch (error) {
      console.warn("Error fetching owned groups:", error);
    }
  };

  const fetchActiveGroupData = async (groupId: string) => {
    try {
      const gSnap = await getDoc(doc(db, 'groups', groupId));
      if (gSnap.exists()) {
        setActiveGroup({ id: gSnap.id, ...gSnap.data() } as Group);
      } else {
        const fallbackName = ownedGroups.find(g => g.id === groupId)?.name || joinedGroups.find(g => g.id === groupId)?.name || 'مجموعة غير معروفة';
        const fallbackCoachId = joinedGroups.find(g => g.id === groupId)?.coachId || user!.uid;
        setActiveGroup({ id: groupId, name: fallbackName, coachId: fallbackCoachId, createdAt: new Date() });
      }

      // Fetch members: Since trainee groups are arrays now, querying all users who joined this group
      // requires a different query. But since rules are relaxed, we can just get users who have this group in their joinedGroups array.
      // Firestore 'array-contains' is good, but since we are mocking/prototyping, we can just fetch users.
      // Wait, 'groupId' field is no longer single string.
      // For MVP, we will just fetch all users and filter locally to bypass complex indexing.
      const coachId = gSnap.exists() ? gSnap.data().coachId : null;
      const usersSnap = await getDocs(collection(db, 'users'));
      const mList = usersSnap.docs.map(d => ({ id: d.id, ...d.data() } as UserProfile))
        .filter(u => u.id === coachId || (u.joinedGroups && u.joinedGroups.some(g => g.id === groupId)));
      
      setMembers(mList.length > 0 ? mList : [profile!]);

      // Listen to messages
      const msgQuery = query(collection(db, 'group_messages'), where('groupId', '==', groupId));
      const unsubscribe = onSnapshot(msgQuery, (snapshot) => {
        const msgList = snapshot.docs.map(d => {
          const data = d.data();
          // Convert timestamp safely, default to current time for pending server writes so they sort to the bottom
          let timeMillis = Date.now(); 
          if (data.createdAt && typeof data.createdAt.toMillis === 'function') {
            timeMillis = data.createdAt.toMillis();
          } else if (data.createdAt instanceof Date) {
            timeMillis = data.createdAt.getTime();
          }
          return { id: d.id, ...data, _timeMillis: timeMillis } as Message & { _timeMillis: number };
        }).sort((a, b) => a._timeMillis - b._timeMillis);
        
        setMessages(msgList);
      }, (error) => {
        console.error("Error listening to messages:", error);
      });
      return unsubscribe;
    } catch (error) {
      console.warn("Firestore fetch group data failed, using mock data:", error);
      if (!activeGroup) {
        const mockName = ownedGroups.find(g => g.id === groupId)?.name || joinedGroups.find(g => g.id === groupId)?.name || 'مجموعة محلية';
        setActiveGroup({ id: groupId, name: mockName, coachId: user!.uid, createdAt: new Date() });
        setMembers([profile!]);
      }
    }
  };

  const saveProfileWithLocalFallback = async (updatedProfile: UserProfile) => {
    if (!user) return;
    setProfile(updatedProfile);
    localStorage.setItem(`team_profile_${user.uid}`, JSON.stringify(updatedProfile));
    try {
      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true });
    } catch (error) {
      console.warn("Firestore write failed, using local state:", error);
    }
  };

  const handleSetRole = async (role: 'coach' | 'trainee') => {
    if (!user || !profile) return;
    const updatedProfile = { ...profile, role, joinedGroups: [] };
    await saveProfileWithLocalFallback(updatedProfile);
  };

  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateGroup = async () => {
    if (!user || !profile || !groupNameInput.trim()) return;
    
    const newGroupRef = doc(collection(db, 'groups'));
    const realGroupId = newGroupRef.id;
    const newGroup: Group = { id: realGroupId, name: groupNameInput, coachId: user.uid, createdAt: new Date() };
    
    setOwnedGroups(prev => [...prev, newGroup]);
    setGroupNameInput('');
    
    try {
      await setDoc(newGroupRef, {
        name: groupNameInput,
        coachId: user.uid,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.warn("Error creating group on server:", error);
    }
  };

  const handleGenerateInviteCode = async () => {
    if (!activeGroupId) return;
    const code = generateRandomCode();
    setGeneratedCode(code);
    
    try {
      await setDoc(doc(db, 'invite_codes', code), {
        groupId: activeGroupId,
        used: false,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.warn("Error saving invite code to server:", error);
    }
  };

  const handleJoinGroup = async () => {
    if (!user || !profile || !joinCodeInput.trim()) return;
    const code = joinCodeInput.trim().toUpperCase();
    
    try {
      const codeRef = doc(db, 'invite_codes', code);
      const codeSnap = await getDoc(codeRef);
      
      if (!codeSnap.exists()) {
        alert('كود الدعوة غير صحيح أو لم يعد صالحاً!');
        return;
      }
      
      const codeData = codeSnap.data() as InviteCode;
      if (codeData.used) {
        alert('تم استخدام كود الدعوة هذا مسبقاً من قِبل شخص آخر!');
        return;
      }

      // Check if already joined
      if (joinedGroups.some(g => g.id === codeData.groupId)) {
        alert('أنت منضم بالفعل لهذه المجموعة!');
        setJoinCodeInput('');
        return;
      }

      // Fetch group name
      const gSnap = await getDoc(doc(db, 'groups', codeData.groupId));
      const groupName = gSnap.exists() ? gSnap.data().name : 'مجموعة جديدة';
      const coachId = gSnap.exists() ? gSnap.data().coachId : 'unknown';

      const newJoinedGroup: Group = { id: codeData.groupId, name: groupName, coachId, createdAt: new Date() };
      const updatedJoinedGroups = [...joinedGroups, newJoinedGroup];
      
      const updatedProfile = { ...profile, joinedGroups: updatedJoinedGroups };
      
      setJoinedGroups(updatedJoinedGroups);
      setJoinCodeInput('');
      await saveProfileWithLocalFallback(updatedProfile);
      
      // Mark as used
      await updateDoc(codeRef, { used: true });

      alert('تم الانضمام للمجموعة بنجاح وستظهر في قائمتك!');

    } catch (error) {
      console.warn("Error joining group on server:", error);
      // Fallback for local testing
      const mockGroupId = 'mock-group-' + code;
      if (joinedGroups.some(g => g.id === mockGroupId)) {
        alert('أنت منضم بالفعل لهذه المجموعة!');
        return;
      }
      const newJoinedGroup: Group = { id: mockGroupId, name: 'مجموعة محلية (وهمية)', coachId: 'unknown', createdAt: new Date() };
      const updatedJoinedGroups = [...joinedGroups, newJoinedGroup];
      const updatedProfile = { ...profile, joinedGroups: updatedJoinedGroups };
      
      setJoinedGroups(updatedJoinedGroups);
      setJoinCodeInput('');
      await saveProfileWithLocalFallback(updatedProfile);
      alert('تم الانضمام للمجموعة الوهمية بنجاح!');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile || !activeGroupId || !newMessage.trim()) return;
    
    const mockMsg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      senderId: user.uid,
      senderName: user.displayName || 'مستخدم',
      createdAt: new Date()
    };
    setMessages(prev => [...prev, mockMsg]);
    setNewMessage('');

    try {
      await addDoc(collection(db, 'group_messages'), {
        groupId: activeGroupId,
        text: mockMsg.text,
        senderId: mockMsg.senderId,
        senderName: mockMsg.senderName,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.warn("Error sending message to server:", error);
    }
  };

  const handleLeaveGroup = async (groupIdToLeave: string) => {
    if (!user || !profile) return;
    if (!window.confirm('هل أنت متأكد من مغادرة هذه المجموعة؟ سيتطلب العودة إليها كود دعوة جديد!')) return;
    
    const updatedJoinedGroups = joinedGroups.filter(g => g.id !== groupIdToLeave);
    const updatedProfile = { ...profile, joinedGroups: updatedJoinedGroups };
    
    setJoinedGroups(updatedJoinedGroups);
    if (activeGroupId === groupIdToLeave) {
      setActiveGroupId(null);
      setActiveGroup(null);
      setMessages([]);
    }
    await saveProfileWithLocalFallback(updatedProfile);
  };

  const handleOpenGroup = (groupId: string) => {
    setActiveGroupId(groupId);
    setGeneratedCode(null);
    fetchActiveGroupData(groupId);
  };

  const handleBackToGroups = () => {
    setActiveGroupId(null);
    setActiveGroup(null);
    setMessages([]);
    setMembers([]);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <FadeContent blur duration={400} easing="ease-out" initialOpacity={0}>
      <div className="relative min-h-screen bg-[#0e0e0e] text-white pb-32">
        <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5 mb-6">
          {activeGroupId ? (
            <button onClick={handleBackToGroups} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          ) : (
            <div className="w-10 h-10"></div>
          )}
          <h1 className="text-lg font-bold mx-auto">
            <GradientText colors={['#a855f7','#c084fc','#a855f7']} animationSpeed={6} showBorder={false}>
              {activeGroupId && activeGroup ? activeGroup.name : 'الفريق والمجموعات'}
            </GradientText>
          </h1>
          <div className="w-10 h-10"></div>
        </header>

        <div className="max-w-4xl mx-auto px-4">
          
          {/* 1. ROLE SELECTION */}
          {!profile?.role && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#131313] rounded-3xl p-8 border border-white/5 text-center">
              <span className="material-symbols-outlined text-5xl text-primary mb-4">groups</span>
              <h2 className="text-2xl font-bold mb-2">أهلاً بك في نظام المجموعات</h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">لتخصيص تجربتك، يرجى إخبارنا بطبيعة حسابك. هل أنت مدرب تدير فريقاً أم متدرب؟</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => handleSetRole('coach')} className="bg-[#1a1a1a] hover:bg-primary/10 border border-white/5 hover:border-primary/50 transition-all rounded-2xl p-6 text-center group">
                  <span className="material-symbols-outlined text-4xl text-emerald-400 mb-3 group-hover:scale-110 transition-transform">sports</span>
                  <h3 className="text-lg font-bold mb-1">أنا مدرب</h3>
                  <p className="text-xs text-slate-500">لدي فريق وأريد إنشاء مجموعة وإرسال تدريبات</p>
                </button>
                <button onClick={() => handleSetRole('trainee')} className="bg-[#1a1a1a] hover:bg-primary/10 border border-white/5 hover:border-primary/50 transition-all rounded-2xl p-6 text-center group">
                  <span className="material-symbols-outlined text-4xl text-blue-400 mb-3 group-hover:scale-110 transition-transform">fitness_center</span>
                  <h3 className="text-lg font-bold mb-1">أنا متدرب</h3>
                  <p className="text-xs text-slate-500">أريد الانضمام لمجموعة مدرب أو التدريب بمفردي</p>
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. COACH DASHBOARD (Groups List) */}
          {profile?.role === 'coach' && !activeGroupId && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-[#131313] rounded-3xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">add_moderator</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">إنشاء مجموعة جديدة</h2>
                    <p className="text-sm text-slate-400">أضف مجموعة لإنشاء أكواد دعوة للمتدربين الجدد</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={groupNameInput}
                    onChange={(e) => setGroupNameInput(e.target.value)}
                    placeholder="مثال: فريق وحوش الحديد"
                    className="flex-1 bg-[#0e0e0e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                  <button 
                    onClick={handleCreateGroup}
                    disabled={!groupNameInput.trim()}
                    className="bg-primary hover:bg-primary/90 text-white font-bold px-6 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    إنشاء
                  </button>
                </div>
              </div>

              <div className="bg-[#131313] rounded-3xl p-6 border border-white/5">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-primary">view_list</span>
                  مجموعاتك الحالية
                </h3>
                
                {ownedGroups.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-3xl text-slate-500">folder_open</span>
                    </div>
                    <p className="text-slate-400 font-bold">لا يوجد لديك أي مجموعات حالياً.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ownedGroups.map(group => (
                      <button 
                        key={group.id} 
                        onClick={() => handleOpenGroup(group.id)}
                        className="bg-[#1a1a1a] hover:bg-white/5 border border-white/5 hover:border-primary/30 p-5 rounded-2xl flex items-center justify-between transition-all group-btn"
                      >
                        <div className="flex items-center gap-4 text-right">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-purple-600/80 flex items-center justify-center text-white shrink-0">
                            <span className="material-symbols-outlined">shield</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-lg">{group.name}</h4>
                            <p className="text-xs text-slate-400 mt-1">اضغط للدخول ولتوليد أكواد الدعوة</p>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-500 transform group-btn-hover:-translate-x-1 transition-transform">arrow_back_ios</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 3. TRAINEE DASHBOARD (Groups List & Join) */}
          {profile?.role === 'trainee' && !activeGroupId && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              <div className="bg-[#131313] rounded-3xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">login</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">الانضمام لمجموعة</h2>
                    <p className="text-sm text-slate-400">أدخل كود الدعوة الفردي الذي أرسله لك مدربك</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    value={joinCodeInput}
                    onChange={(e) => setJoinCodeInput(e.target.value)}
                    placeholder="أدخل الكود هنا"
                    className="flex-1 bg-[#0e0e0e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary uppercase text-center sm:text-right tracking-widest font-mono"
                  />
                  <button 
                    onClick={handleJoinGroup}
                    disabled={!joinCodeInput.trim()}
                    className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50"
                  >
                    انضمام
                  </button>
                </div>
              </div>

              <div className="bg-[#131313] rounded-3xl p-6 border border-white/5">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-primary">view_list</span>
                  مجموعاتي المشترك بها
                </h3>
                
                {joinedGroups.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-white/10 rounded-2xl">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-3xl text-slate-500">search_off</span>
                    </div>
                    <p className="text-slate-400 font-bold mb-2">أنت غير منضم لأي مجموعة حالياً</p>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">يمكنك إدخال كود الدعوة في الأعلى للانضمام، أو متابعة تدريبك الفردي.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {joinedGroups.map(group => (
                      <div key={group.id} className="bg-[#1a1a1a] border border-white/5 p-5 rounded-2xl flex items-center justify-between transition-all group-btn relative overflow-hidden">
                        <button 
                          onClick={() => handleOpenGroup(group.id)}
                          className="absolute inset-0 z-10 w-full h-full hover:bg-white/5"
                        ></button>
                        <div className="flex items-center gap-4 text-right z-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/80 to-purple-600/80 flex items-center justify-center text-white shrink-0">
                            <span className="material-symbols-outlined">shield</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-lg">{group.name}</h4>
                            <p className="text-xs text-slate-400 mt-1">اضغط للدخول إلى شات المجموعة</p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleLeaveGroup(group.id); }}
                          className="z-20 w-8 h-8 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                          title="مغادرة المجموعة"
                        >
                          <span className="material-symbols-outlined text-sm">logout</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative pt-6 text-center">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0e0e0e] px-4 text-xs font-bold text-slate-500">أو</span>
                <Link to="/programs" className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-colors bg-[#131313] hover:bg-[#1a1a1a] border border-white/5 px-6 py-3 rounded-xl font-bold w-full">
                  استكمال التدريب بشكل منفرد <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

            </motion.div>
          )}

          {/* 4. ACTIVE GROUP (Dashboard & Chat) */}
          {activeGroupId && activeGroup && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              
              {/* Coach Invite Generator */}
              {profile?.role === 'coach' && (
                <div className="bg-[#131313] rounded-3xl p-5 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-400">person_add</span>
                      دعوة متدرب جديد
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">يُستخدم الكود لمرة واحدة ولشخص واحد فقط</p>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {generatedCode ? (
                      <div className="flex-1 sm:flex-none flex items-center bg-[#0e0e0e] border border-emerald-500/30 rounded-xl p-1 pr-4">
                        <span className="font-mono font-bold tracking-widest text-emerald-400 mr-4">{generatedCode}</span>
                        <button 
                          onClick={() => { navigator.clipboard.writeText(generatedCode); alert('تم نسخ الكود وإرساله للمتدرب!'); }}
                          className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">content_copy</span>
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={handleGenerateInviteCode}
                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
                      >
                        توليد كود دعوة فردي
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Members List */}
                <div className="lg:col-span-1 bg-[#131313] rounded-3xl p-5 border border-white/5 h-[400px] flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">groups</span>
                      أعضاء المجموعة
                    </h3>
                    <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded-lg">{members.length}</span>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {members.map((m, idx) => (
                      <div key={m.id || idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {m.id === activeGroup.coachId ? <span className="material-symbols-outlined text-[18px]">sports</span> : 'متدرب'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate">
                            {m.id === user?.uid ? 'أنت' : 'مستخدم'}
                            {m.id === activeGroup.coachId && <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">مدرب</span>}
                          </p>
                          {profile?.role === 'coach' && m.id !== user?.uid && m.personal_info && (
                            <p className="text-[10px] text-slate-500 truncate">
                              الوزن: {m.personal_info.user_weight}كجم | الهدف: {m.personal_info.training_goal === 'cutting' ? 'تنشيف' : 'تضخيم'}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Group Chat */}
                <div className="lg:col-span-2 bg-[#131313] rounded-3xl p-5 border border-white/5 h-[400px] flex flex-col">
                  <h3 className="font-bold flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                    <span className="material-symbols-outlined text-primary">forum</span>
                    شات المجموعة والتعليمات
                  </h3>
                  
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4 custom-scrollbar pr-2 flex flex-col">
                    {messages.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">لا توجد رسائل حتى الآن. كن أول من يرسل رسالة!</div>
                    ) : (
                      messages.map(msg => {
                        const isMe = msg.senderId === user?.uid;
                        const isCoach = msg.senderId === activeGroup.coachId;
                        return (
                          <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} w-full`}>
                            <div className={`flex items-end gap-2 max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isCoach ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-slate-300'}`}>
                                <span className="material-symbols-outlined text-[16px]">{isCoach ? 'sports' : 'person'}</span>
                              </div>
                              <div className={`px-4 py-3 rounded-2xl relative ${isMe ? 'bg-primary text-white rounded-tr-sm' : 'bg-zinc-800 text-slate-200 rounded-tl-sm'}`}>
                                {isCoach && !isMe && <p className="text-[10px] text-emerald-400 font-bold mb-1">المدرب</p>}
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <form onSubmit={handleSendMessage} className="relative mt-auto">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      placeholder="اكتب رسالة للمجموعة..."
                      className="w-full bg-[#0e0e0e] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-primary/50"
                    />
                    <button 
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="absolute left-2 top-2 bottom-2 w-10 bg-primary/20 hover:bg-primary text-primary hover:text-white disabled:opacity-50 disabled:hover:bg-primary/20 disabled:hover:text-primary rounded-xl flex items-center justify-center transition-colors"
                    >
                      <span className="material-symbols-outlined transform rotate-180">send</span>
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </FadeContent>
  );
}
