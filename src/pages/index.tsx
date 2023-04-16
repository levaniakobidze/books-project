import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import VideoSlider from "@/components/VideoSlider/VideoSlider";
import { Fragment, useState } from "react";
import BooksList from "@/components/BooksList/BooksList";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Fragment>
      <Navigation />
      <div className="max:w-lg py-5 w-full min:h-screen flex flex-col bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7]">
        <VideoSlider />
        <BooksList />
        <Footer />
      </div>
    </Fragment>
  );
}
