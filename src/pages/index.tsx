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
import Word from "@/components/Word/Word";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { categories, books } = useContext(BooksContext);
  return (
    <Fragment>
      <Navigation />
      <div className="max:w-lg  w-full min:h-screen flex flex-col no-print  ">
        <VideoSlider />
        {categories.length > 0 && (
          <div className="flex flex-col mx-auto md:flex-row gap-6   ">
            {categories.length >= 4 && (
              <div className="">
                <h1 className="text-center text-gray-500 font-bold text-2xl tracking-wider">
                  კატეგორიები
                </h1>
                <div className=" px-10 max:w-lg py-[60px] w-fullpx-10 mx-auto  grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8   ">
                  {categories
                    .slice(0, 6)
                    .map((category: ICategory, index: number) => {
                      return <Category key={index} category={category} />;
                    })}
                </div>
              </div>
            )}
            <div className="flex flex-col items-center">
              <h2 className="text-center text-gray-500 font-bold text-2xl tracking-wider">
                დღის სიტყვა
              </h2>
              <Word />
            </div>
          </div>
        )}
        <div className="mt-20">
          <h1 className="text-center mb-10 text-gray-500 font-bold text-2xl tracking-wider">
            წიგნები
          </h1>
          <div className="px-5 mx-auto max-w-2xl flex flex-wrap justify-center items-center gap-6 sm:gap-6 lg:mx-0 lg:max-w-none lg:gap-8">
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
