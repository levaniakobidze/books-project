import { createContext, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
interface AuthContextType {
  isAuth: boolean | null;
}

export const AuthContext = createContext<AuthContextType | null | any>(null);

interface ParentComponentProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ParentComponentProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = () => {
    setIsAuth(true);
    router.push("/");
    Cookies.set("jwt", "asdasdasfwwfefwsdfsdfds");
  };
  const handleLogout = () => {
    setIsAuth(false);
    Cookies.remove("jwt");
    localStorage.removeItem("loggedin");
  };

  return (
    <AuthContext.Provider value={{ isAuth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
