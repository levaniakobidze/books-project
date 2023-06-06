import React, { useState, useEffect, useContext, Fragment } from "react";
import { IBook } from "@/types/bookTypes";
import { useRouter, NextRouter } from "next/router";
import { BooksContext } from "@/context/books";
import Navigation from "@/components/Navigation/Navigation";

const Open_book = () => {
  const router: NextRouter = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<IBook | null>(null);
  const { books, handleBuyBook } = useContext(BooksContext);
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);

  useEffect(() => {
    const filtered = books.find((book: IBook) => book.id === id);
    setBook(filtered);
  }, [id]);

  return (
    <Fragment>
      <Navigation />
      <div className="flex">
        <div className="max-w-[800px] min-w-[400px] bg-blue-400 min-h-screen">
          <ul className="p-10 gap-10 fixed">
            <h1 className="text-lg">{book?.title}</h1>
            <p className="text-sm">ავტორი: {book?.author}</p>
            {book?.pages?.map((page: any, index) => {
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
        <div
          className="p-10 w-100 mx-0-auto book disabledCopy"
          onContextMenu={(e) => e.preventDefault()}
          dangerouslySetInnerHTML={{
            __html: book?.pages[selectedBookIndex].content,
          }}></div>
      </div>
    </Fragment>
  );
};

export default Open_book;
