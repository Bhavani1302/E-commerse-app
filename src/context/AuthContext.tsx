import React, { createContext, useContext, useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


type AuthContextType = {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
};


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null); 

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); //  login
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
      } else {
        console.error("An unknown error occurred during login.");
      }
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // signup
    } catch (error) {
      if (error instanceof Error) {
        console.error("Signup failed:", error.message); 
      } else {
        console.error("An unknown error occurred during signup.");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
