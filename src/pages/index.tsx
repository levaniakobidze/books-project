import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import VideoSlider from "@/components/VideoSlider/VideoSlider";
import { Fragment } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Fragment>
      <Navigation />
      <div className="py-5 w-full h-screen flex flex-col    bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7]">
        <VideoSlider />
      </div>
    </Fragment>
  );
}
