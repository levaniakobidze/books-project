import AppContext from "@/context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import LoginRegister from "../components/Modals/LoginRegister/LoginRegister";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <AppContext>
      <Layout>
        {isLoading && (
          <div>
            <div className="progress"></div>
          </div>
        )}
        <Component {...pageProps} />
      </Layout>
      <LoginRegister />
    </AppContext>
  );
};

export default App;
