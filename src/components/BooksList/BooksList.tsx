import React, { Fragment, useState } from "react";
import Book from "../Book/Book";
import { useContext } from "react";
import { BooksContext } from "@/context/books";
import { IBook } from "@/types/bookTypes";
import AccessWaiting from "../Modals/AccessWaiting/AccessWaiting";

function BooksList() {
  const { books } = useContext(BooksContext);

  return (
    <Fragment>
      <AccessWaiting />
      <div className="px-5 mx-auto max-w-2xl flex flex-wrap justify-center  gap-6 sm:gap-6 lg:mx-0 lg:max-w-none lg:gap-8">
        {books.map((book: IBook, index: number) => {
          return <Book book={book} key={index} />;
        })}
      </div>
    </Fragment>
  );
}

export default BooksList;
