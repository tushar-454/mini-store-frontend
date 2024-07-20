import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
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
  loginWithGoogle: () => Promise<UserCredential | void>;
  logout: () => Promise<void>;
  signupWithEmailPass: (
    email: string,
    password: string,
  ) => Promise<UserCredential | void>;
  loginWithEmailPass: (
    email: string,
    password: string,
  ) => Promise<UserCredential | void>;
  updateUserProfile: (
    displayName: string,
    image: string,
  ) => Promise<UserCredential | void>;
  // carts: ProductCardType[];
  // setCarts: React.Dispatch<React.SetStateAction<ProductCardType[] | null>>;
}

export const AuthContext = createContext<UserInfo | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [carts, setCarts] = useState([]);

  // login with google
  const loginWithGoogle = async () => {
    return await signInWithPopup(Auth, new GoogleAuthProvider());
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

  // upadate user info
  const updateUserProfile = async (displayName: string, image: string) => {
    const currentUser = Auth.currentUser;
    if (currentUser) {
      return await updateProfile(currentUser, {
        displayName: displayName,
        photoURL: image,
      });
    }
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
    updateUserProfile,
    carts,
    setCarts,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
