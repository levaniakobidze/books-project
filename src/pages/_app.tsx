import AppContext from "@/context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import LoginRegister from "../components/Modals/LoginRegister/LoginRegister";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Component {...pageProps} />
      <LoginRegister />
    </AppContext>
  );
}
