import BooksList from "@/components/BooksList/BooksList";
import React, { Fragment } from "react";
import Navigation from "@/components/Navigation/Navigation";
import Filters from "@/components/Filters/Filters";
function index() {
  return (
    <Fragment>
      <Navigation />
      <div className=" max:w-lg py-5 w-full min-h-screen flex  flex-col md:flex-row   bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7]">
        <BooksList />
      </div>
    </Fragment>
  );
}

export default index;
