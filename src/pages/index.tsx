import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Navigation />;
}
