import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  UserCredential,
} from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import Auth from '../Config/firebase-config.tsx';

interface AuthProviderProps {
  children: ReactNode;
}

export interface UserInfo {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  signupWithEmailPass: (
    email: string,
    password: string,
  ) => Promise<UserCredential | void>;
  loginWithEmailPass: (
    email: string,
    password: string,
  ) => Promise<UserCredential | void>;
}

export const AuthContext = createContext<UserInfo | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // login with google
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(Auth, new GoogleAuthProvider());
    } catch (error) {
      console.log(error);
    }
  };
  // logout
  const logout = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  // create an account with email and pass
  const signupWithEmailPass = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(Auth, email, password);
  };
  // login with email and pass
  const loginWithEmailPass = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(Auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    setUser,
    loading,
    setLoading,
    loginWithGoogle,
    logout,
    signupWithEmailPass,
    loginWithEmailPass,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
