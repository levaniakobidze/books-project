import BooksList from "@/components/BooksList/BooksList";
import React, { FC, Fragment, useEffect, useContext, useState } from "react";
import Navigation from "@/components/Navigation/Navigation";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";
import { BooksContext } from "@/context/books";
import { IBook } from "@/types/bookTypes";
import Link from "next/link";
import FreeResource from "@/components/FreeResource/FreeResource";
import PurchaseSuccess from "@/components/Modals/PurchaseSuccess/PurchaseSuccess";
import AccessWaiting from "@/components/Modals/AccessWaiting/AccessWaiting";

const MyBooks = () => {
  const { isAuth, user } = useContext(AuthContext);
  const { books, purchaseHistory, getPurchaseHistory } =
    useContext(BooksContext);

  const [freeResources, setFreeResources] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const filteredBooks = books.filter((book: IBook) => {
      return book.price === 1;
    });
    setFreeResources(filteredBooks);
  }, [purchaseHistory]);

  useEffect(() => {
    getPurchaseHistory();
  }, [router.pathname]);

  return (
    <Fragment>
      <Navigation />
      <PurchaseSuccess />
      <AccessWaiting />
      <div
        className="
          bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7]">
        {freeResources.length > 0 && (
          <div className=" w-[100%] px-5 mx-auto min-h-screen  grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
            {freeResources &&
              freeResources.map((book: IBook, index) => {
                return <FreeResource key={index} book={book} />;
              })}
          </div>
        )}

        {freeResources.length < 1 && (
          <div className="w-[100%] min-h-screen   flex justify-center items-center">
            <p className="text-gray-500 text-3xl">,ჩემი წიგნები, - ცარიელია</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default MyBooks;
