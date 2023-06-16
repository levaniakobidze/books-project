import BooksList from "@/components/BooksList/BooksList";
import React, { FC, Fragment, useEffect, useContext, useState } from "react";
import Navigation from "@/components/Navigation/Navigation";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";
import { BooksContext } from "@/context/books";
import { IBook } from "@/types/bookTypes";
import Link from "next/link";
import AdminBook from "@/components/Admin_components/AdminBook/AdminBook";

const MyBooks = () => {
  const { isAuth, user } = useContext(AuthContext);
  const { books, purchaseHistory, getAllBooks } = useContext(BooksContext);

  const [myBooks, setMyBooks] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const filteredBooks = books.filter((book: IBook) => {
      return purchaseHistory.some((obj2: any) => obj2.bookId === book.id);
    });
    setMyBooks(filteredBooks);
    // if (!isAuth) {
    //   router.push("/auth/login");
    // }
  }, [purchaseHistory]);

  useEffect(() => {
    getAllBooks();
  }, [router.pathname]);

  return (
    <Fragment>
      <Navigation />
      <div
        className=" px-5 mx-auto min-h-screen  grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8
          bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7]">
        {myBooks &&
          myBooks.map((book: IBook, index) => {
            return <AdminBook key={index} book={book} />;
          })}
      </div>
    </Fragment>
  );
};

export default MyBooks;
