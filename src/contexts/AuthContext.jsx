/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
//   const createUser = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

  const Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(user);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <UserContext.Provider value={{ user, logout, Login }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
