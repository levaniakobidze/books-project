import { IBook } from "@/types/bookTypes";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/auth";
import { BooksContext } from "@/context/books";
const AdminBook = ({ book }: { book: any }) => {
  const { user } = useContext(AuthContext);
  const { purchaseHistory, setShowAccessWaitingModal } =
    useContext(BooksContext);

  let findBook;
  let findAccessId;
  if (book && Object.keys(user).length !== 0) {
    findBook = purchaseHistory.find((b: any) => b.bookId === book.id);
    findAccessId = book?.access.find((accId: any) => accId === user.id);
  }

  return (
    <>
      <Link
        href={`/my_books/${book.id}`}
        className="rounded mt-10 shadow-lg max-w-sm border min-w-[200px] max-h-[400px]">
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
            <p className=" font-bold text-sm   text-[#ffffff] ">აქტიური</p>
          </div>

          {findAccessId ? (
            <Link
              href={`/open_book/${book?.id}`}
              className=" bg-green-400 text-white text-sm font-bold  rounded-tl-lg rounded-bl-lg px-3 py-1  sm:mt-0 md:shadow-xl  sm:flex flex-col justify-center items-center">
              ნახვა
            </Link>
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowAccessWaitingModal(true);
              }}
              className=" bg-pink-400 text-white text-sm font-bold rounded-tl-lg rounded-bl-lg px-3 py-1  sm:mt-0 md:shadow-xl  sm:flex flex-col justify-center items-center">
              დაელოდეთ
            </div>
          )}
          {/* <Link
      href={`/open_book/${book?.id}`}
      className="  rounded-sm  tracking-wider px-3 py-1 text-sm rounded-tl-lg rounded-bl-lg sm:px-5 hover:bg-transparent transition duration-350 hover:outline hover:text-[#6ca0d1]  font-bold hover:outline-[#6ca0d1] bg-[#6ca0d1]   text-bold text-white">
      ნახვა
    </Link> */}
          {/* <p className="text-[13px]">Levan masadashvili</p> */}
        </div>
        <p className=" hidden sm:flex mb-3   px-5 text-center mt-5 text-მდ text-gray-500 ">
          {book.description.substr(0, 50)} ...
        </p>
      </Link>
    </>
  );
};

export default AdminBook;
