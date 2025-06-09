import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, setPersistence, onAuthStateChanged, User, browserLocalPersistence } from 'firebase/auth';
import { app } from '../libraries/firebase'; // assegura’t que tens firebase inicialitzat aquí
import { auth } from '../libraries/firebase';

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({ user: null });
// const auth = getAuth(app);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
  
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
      });
      return unsubscribe;
    
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}