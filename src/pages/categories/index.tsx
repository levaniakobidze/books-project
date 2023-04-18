import Navigation from "@/components/Navigation/Navigation";
import React, { Fragment, useContext } from "react";
import { BooksContext } from "@/context/books";
import { ICategory } from "@/types/bookTypes";
import Category from "@/components/Category/Category";
function Categories() {
  const { categories } = useContext(BooksContext);
  return (
    <Fragment>
      <Navigation />
      <div className="min-h-[100vh]  bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7]">
        <div className=" px-10 max:w-lg py-6 w-fullpx-10 mx-auto  grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8   ">
          {categories.map((category: ICategory, index: number) => {
            return <Category key={index} category={category} />;
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default Categories;
