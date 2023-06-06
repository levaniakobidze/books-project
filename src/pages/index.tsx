import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import VideoSlider from "@/components/VideoSlider/VideoSlider";
import { Fragment, useState, useContext } from "react";
import BooksList from "@/components/BooksList/BooksList";
import Footer from "@/components/Footer/Footer";
import Categories from "./categories";
import Category from "../components/Category/Category";
import { BooksContext } from "@/context/books";
import { ICategory } from "@/types/bookTypes";
import SearchWord from "@/components/SerachWord/SearchWord";
import Book from "@/components/Book/Book";
import { IBook } from "@/types/bookTypes";
import LoginRegister from "../components/Modals/LoginRegister/LoginRegister";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { categories, books } = useContext(BooksContext);
  return (
    <Fragment>
      <Navigation />
      <div className="max:w-lg  w-full min:h-screen flex flex-col bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7]">
        <VideoSlider />
        {categories.length >= 4 && (
          <div>
            <h1 className="text-center text-gray-500 font-bold text-2xl tracking-wider">
              კატეგორიები
            </h1>
            <div className="mt-5 px-10 max:w-lg py-6 w-fullpx-10 mx-auto  grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8   ">
              {categories.map((category: ICategory, index: number) => {
                return <Category key={index} category={category} />;
              })}
            </div>
          </div>
        )}
        <div className="mt-20">
          <h1 className="text-center mb-10 text-gray-500 font-bold text-2xl tracking-wider">
            წიგნები
          </h1>
          <div className=" px-5 mx-auto  grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
            {books &&
              books.slice(0, 4).map((book: IBook, index: number) => {
                return <Book book={book} key={index} />;
              })}
          </div>
        </div>

        {/* //////////////////////////////// */}
        <SearchWord />
        {/* ///////////////////////////// */}
        <Footer />
      </div>
    </Fragment>
  );
}
