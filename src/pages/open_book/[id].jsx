import React, { useState, useEffect, useContext, Fragment } from "react";
import { IBook } from "@/types/bookTypes";
import { useRouter, NextRouter } from "next/router";
import { BooksContext } from "@/context/books";
import Navigation from "@/components/Navigation/Navigation";

const Open_book = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const { books, handleBuyBook } = useContext(BooksContext);
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);

  useEffect(() => {
    const filtered = books.find((book) => book.id === id);
    setBook(filtered);
  }, [id, books]);

  return (
    <Fragment>
      <Navigation />
      <div className="flex flex-col md:flex-row ">
        <div className=" w-full md:max-w-[300px]    bg-blue-400 ">
          <ul className="p-3 md:p-10  gap-10 static md:fixed">
            <h1 className="text-lg">{book?.title}</h1>
            <p className="text-sm">ავტორი: {book?.author}</p>
            {book?.pages?.map((page, index) => {
              return (
                <li
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setSelectedBookIndex(index);
                  }}
                  className={`mt-5 cursor-pointer font-bold  ${
                    index !== selectedBookIndex ? "text-white" : "text-pink-500"
                  } leading-5 hover:underline`}
                  key={index}>
                  {page.title}
                </li>
              );
            })}
          </ul>
        </div>
        {book && (
          <div
            className="p-3 md:p-10 w-100 mx-0-auto book disabledCopy overflow-y-scroll h-screen w-full"
            onContextMenu={(e) => e.preventDefault()}
            dangerouslySetInnerHTML={{
              __html: book?.pages[selectedBookIndex].content,
            }}></div>
        )}
      </div>
    </Fragment>
  );
};

export default Open_book;
