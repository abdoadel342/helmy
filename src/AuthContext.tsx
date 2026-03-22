import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const mockUser = {
  uid: 'mock-user-123',
  email: 'hero@helmy.com',
  displayName: 'بطل حلمي',
  photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HelmyHero',
} as User;

const AuthContext = createContext<AuthContextType>({ user: mockUser, loading: false });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Optionally keep firebase sync, but we start with mockUser.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(mockUser);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
