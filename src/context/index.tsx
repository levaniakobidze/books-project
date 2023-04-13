import React, { ReactNode } from "react";
import AuthContext from "./auth";

interface ParentComponentProps {
  children: ReactNode;
}

const AppContext = ({ children }: ParentComponentProps) => {
  return <AuthContext>{children}</AuthContext>;
};
export default AppContext;
