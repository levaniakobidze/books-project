import React, { useState } from "react";
import Book from "../Book/Book";
import { useContext } from "react";
import { BooksContext } from "@/context/books";
import { IBook } from "@/types/bookTypes";

function BooksList() {
  const { books } = useContext(BooksContext);

  return (
    <div className=" px-5 mx-auto min-h-screen  grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
      {books.map((book: IBook, index: number) => {
        return <Book book={book} key={index} />;
      })}
    </div>
  );
}

export default BooksList;
