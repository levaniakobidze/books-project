import React, { useState, useEffect, useContext, Fragment } from "react";
import { useRouter } from "next/router";
import { BooksContext } from "@/context/books";
import { IBook } from "../../types/bookTypes";
import Book from "@/components/Book/Book";
import Navigation from "@/components/Navigation/Navigation";

function Category() {
  const router = useRouter();
  const { books } = useContext(BooksContext);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const storageCategory = localStorage.getItem("category");
    const category: any = storageCategory || router.query.category;
    // set Category to localstorage
    if (storageCategory == undefined) {
      localStorage.setItem("category", category);
    }
    const filtered = books.filter((book: IBook) =>
      book.categories.includes(Number(category))
    );
    setFilteredBooks(filtered);
  }, []);

  return (
    <Fragment>
      <Navigation />
      <div className="py-10 px-5 mx-auto  grid max-w-2xl  bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7] min-h-[100vh] grid-cols-2 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
        {filteredBooks.map((book: IBook, index: number) => {
          return <Book book={book} key={index} />;
        })}
      </div>
    </Fragment>
  );
}

export default Category;
