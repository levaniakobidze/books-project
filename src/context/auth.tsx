import { createContext, ReactNode, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showRegisterSuccessModal, setShowRegisterSuccessModal] =
    useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(localStorage.getItem("isAuth"));
    console.log(localStorage.getItem("token"));

    if (localStorage.getItem("isAuth")) {
      setIsAuth(true);
    }
    if (localStorage.getItem("token")) {
      const token: any = localStorage.getItem("token");
      setToken(token || null);
    }
  }, []);
  useEffect(() => {
    setLoginError(false);
  }, [router.asPath]);

  // TODO:: Registe function
  const handleRegister = (registerData: {
    userName: string;
    email: string;
    password: string;
    backlik: string;
  }) => {
    const registerUrl =
      "https://books-project-back-production.up.railway.app/api/register";
    setLoading(true);
    axios
      .post(registerUrl, registerData)
      .then((resp) => {
        setLoading(false);
        setShowRegisterSuccessModal(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  // TODO:: Login function
  const handleLogin = (credentials: { email: string; password: string }) => {
    const loginUrl =
      "https://books-project-back-production.up.railway.app/api/login";
    setLoading(true);
    axios
      .post(loginUrl, credentials)
      .then((resp) => {
        setUser(resp.data);
        setToken(resp.data.token);
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("isAuth", "true");
        Cookies.set("token", resp.data.token);
        setLoading(false);
        setIsAuth(true);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setLoginError(
          (Array.isArray(err.response.data) && err.response.data[0].message) ||
            err.response.data.geo ||
            err.response.data.en
        );
        setLoading(false);
      });
  };

  const handleLogout = () => {
    setIsAuth(false);
    Cookies.remove("token");
    Cookies.remove("isAuth");
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser({});
    setToken(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuth,
        handleLogin,
        handleLogout,
        handleRegister,
        loginError,
        loading,
        showRegisterSuccessModal,
        setShowRegisterSuccessModal,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
