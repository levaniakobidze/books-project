import { createContext, ReactNode, useState } from "react";

interface AuthContextType {}

export const AuthContext = createContext<AuthContextType | null>(null);

interface ParentComponentProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ParentComponentProps) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default ContextProvider;
