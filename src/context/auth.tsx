import { createContext, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
interface AuthContextType {
  isAuth: boolean | null;
  user: {};
}

// {
//   email: "iakobidze2@gmail.com",
//   password: "iakobidze123",
// }

export const AuthContext = createContext<AuthContextType | null | any>(null);

interface ParentComponentProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ParentComponentProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const router = useRouter();

  const handleRegister = (registerData: {
    userName: string;
    email: string;
    password: string;
    backlik: string;
  }) => {
    const registerUrl =
      "https://books-project-back-production.up.railway.app/api/register";
    console.log(registerData);

    axios
      .post(registerUrl, registerData)
      .then((resp) => {
        console.log(resp);
        router.push("/auth/login");
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .post(registerUrl, {
    //     userName: "Student",
    //     email: "studenst@gmail.com",
    //     password: "studenst123",
    //     backlink: "formusla1.com",
    //   })
    //   .then((resp) => {
    //     console.log(resp);
    //     router.push("/auth/login");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const handleLogin = (credentials: { email: string; password: string }) => {
    const loginUrl =
      "https://books-project-back-production.up.railway.app/api/login";
    axios
      .post(loginUrl, credentials)
      .then((resp) => {
        setUser(resp.data);
        setToken(resp.data.token);
        localStorage.setItem("token", resp.data.token);
        Cookies.set("token", resp.data.token);
        setIsAuth(true);
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    setIsAuth(false);
    Cookies.remove("token");
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser({});
    setToken(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, handleLogin, handleLogout, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
