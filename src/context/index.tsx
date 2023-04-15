import React, { ReactNode } from "react";
import AuthContext from "./auth";
import BooksContext from "./books";

interface ParentComponentProps {
  children: ReactNode;
}

const AppContext = ({ children }: ParentComponentProps) => {
  return (
    <AuthContext>
      <BooksContext>{children}</BooksContext>
    </AuthContext>
  );
};
export default AppContext;
