/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext, Fragment } from "react";
import { useRouter, NextRouter } from "next/router";
import { BooksContext } from "@/context/books";
import Navigation from "@/components/Navigation/Navigation";
import Image from "next/image";
import { IBook } from "@/types/bookTypes";
import { StarIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { AuthContext } from "@/context/auth";
import BuyBooks from "@/components/Modals/BuyBook/BuyBook";
import AccessWaiting from "@/components/Modals/AccessWaiting/AccessWaiting";

const Description = () => {
  const router: NextRouter = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<any>(null);
  const {
    books,
    handleBuyBook,
    purchaseHistory,
    setShowAccessWaitingModal,
    setShowLoginRegisterModal,
  } = useContext(BooksContext);
  const { isAuth, user } = useContext(AuthContext);
  const [findBook, setFindBook] = useState({});
  const [findAccessId, setFindAccessId] = useState<any>("");

  useEffect(() => {
    if (router.query.id && books) {
      const filtered = books.find((b: IBook) => b.id === id);
      setBook(filtered);
    }
  }, [router.query, books]);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    if (book && Object.keys(user).length !== 0) {
      setFindBook(purchaseHistory.find((b: any) => b.bookId === book?.id));
      setFindAccessId(book?.access.find((accId: any) => accId === user.id));
    }
  }, [books, book]);

  const seeBook = (id: string) => {
    if (!isAuth) {
      setShowLoginRegisterModal(true);
      return;
    }
    router.push(`/open_book/${book?.id}`);
  };

  return (
    <Fragment>
      <BuyBooks />
      <AccessWaiting />
      <Navigation />
      <div className="bg-white">
        <div className="mx-auto px-4   py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            {/* Product image */}
            <div className="lg:col-span-4 lg:row-end-1">
              <div className="aspect-h-3 aspect-w-3 overflow-hidden  rounded-lg bg-blue-100">
                <img
                  className="object-contain object-center w-full h-[450px]"
                  src={process.env.NEXT_PUBLIC_URL + book?.poster!}
                  alt="asda"
                />
              </div>
            </div>

            {/* Product details */}
            <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
              <div className="flex flex-col-reverse">
                <div className="mt-4">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {book?.title}
                  </h1>
                </div>
                <div>
                  <h3 className="sr-only">Reviews</h3>
                </div>
              </div>
              <p className="mt-6 text-gray-500">{book?.description}</p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {!findBook && !findAccessId && book?.price !== 1 && (
                  <button
                    onClick={() => handleBuyBook(book)}
                    type="button"
                    className="flex w-full items-center font-bold justify-center rounded-md border border-transparent bg-blue-400 px-8 py-3 text-base  text-white hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    ყიდვა {book?.price}ლ
                  </button>
                )}
                {!isAuth && book?.price !== 1 && (
                  <button
                    onClick={() => handleBuyBook(book)}
                    type="button"
                    className="flex w-full items-center font-bold justify-center rounded-md border border-transparent bg-blue-400 px-8 py-3 text-base  text-white hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    ყიდვა {book?.price}ლ
                  </button>
                )}

                {findAccessId || book?.price === 1 ? (
                  <button
                    onClick={() => seeBook(book.id)}
                    className="flex w-full items-center font-bold justify-center rounded-md border border-transparent bg-green-400 px-8 py-3 text-base text-white hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    ნახვა
                  </button>
                ) : null}
                {findBook && !findAccessId && book?.price !== 1 && isAuth && (
                  <div
                    onClick={() => setShowAccessWaitingModal(true)}
                    className="flex w-full  items-center justify-center rounded-md border border-transparent bg-pink-400 cursor-pointer px-8 py-3 text-sm  font-bold text-white hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    დაელოდეთ წვდომას
                  </div>
                )}

                <Link
                  href={isAuth ? "/books" : "/"}
                  type="button"
                  className="flex w-full items-center font-bold justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base  text-pink-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                  უკან დაბრუნება
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Description;
