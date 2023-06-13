import BooksList from "@/components/BooksList/BooksList";
import React, { FC, Fragment, useEffect, useContext, useState } from "react";
import Navigation from "@/components/Navigation/Navigation";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";
import { BooksContext } from "@/context/books";
import { IBook } from "@/types/bookTypes";
import Link from "next/link";

const MyBooks = () => {
  const { isAuth, user } = useContext(AuthContext);
  const { books } = useContext(BooksContext);

  const [myBooks, setMyBooks] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const filteredBooks = books.filter((book: IBook) => {
      return user.history.some((obj2: any) => obj2.bookId === book.id);
    });
    setMyBooks(filteredBooks);
    if (!isAuth) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <Fragment>
      <Navigation />
      <div
        className=" max:w-lg py-5 w-full min-h-screen flex flex-col px-5
          bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7]">
        {myBooks &&
          myBooks.map((book: IBook, index) => {
            return (
              <Link
                key={index}
                href={`/my_books/${book.id}`}
                className="rounded shadow-lg max-w-sm border max-h-[400px]">
                <div className="px-3">
                  <img
                    className="w-full object-cover  h-[220px]"
                    src={process.env.NEXT_PUBLIC_URL + book?.poster}
                    alt="asda"
                  />
                </div>
                <p className="hidden text-center mt-5  text-sm font-bold">
                  {book.author}
                </p>

                {/* <p className=" px-5 text-center mt-5 text-მდ font-bold text-gray-900 ">
      {book.price} ლ
    </p> */}
                <div className=" my-5 flex  items-center justify-between ">
                  <div className=" bg-blue-400  rounded-tr-lg rounded-br-lg px-3 py-1  sm:mt-0 md:shadow-xl  sm:flex flex-col justify-center items-center">
                    <p className=" font-bold text-sm   text-[#ffffff] ">
                      აქტიური
                    </p>
                  </div>
                  <Link
                    href={`/open_book/${book?.id}`}
                    className="  rounded-sm  tracking-wider px-3 py-1 text-sm rounded-tl-lg rounded-bl-lg sm:px-5 hover:bg-transparent transition duration-350 hover:outline hover:text-[#6ca0d1]  font-bold hover:outline-[#6ca0d1] bg-[#6ca0d1]   text-bold text-white">
                    ნახვა
                  </Link>
                  {/* <p className="text-[13px]">Levan masadashvili</p> */}
                </div>
                <p className=" hidden sm:flex mb-3   px-5 text-center mt-5 text-მდ text-gray-500 ">
                  {book.description.substr(0, 50)} ...
                </p>
              </Link>
            );
          })}
      </div>
    </Fragment>
  );
};

export default MyBooks;
