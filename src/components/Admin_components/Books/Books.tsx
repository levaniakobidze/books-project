import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { title } from "process";
import Link from "next/link";
import { BooksContext } from "@/context/books";
const Books = () => {
  const [books, setBooks] = useState<any>([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const { setBookContent } = useContext(BooksContext);
  const getBooks = async () => {
    try {
      const resp = await axios.get(
        "https://books-project-back-production.up.railway.app/api/allbook"
      );
      setBooks(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const giveAccess = async (book: any) => {
    const updatedBook = {
      ...book,
      access: [...book.access, userId],
    };
    try {
      await axios.put(
        `https://books-project-back-production.up.railway.app/api/books/${book.id}`,
        updatedBook
      );
    } catch (error) {}
  };

  const deleteBook = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://books-project-back-production.up.railway.app/api/books/${id}`
      );
      getBooks();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-6">
      {books &&
        books.map((book: any, index: number) => {
          return (
            <div
              key={index}
              className="max-w-xs w-[300px] rounded overflow-hidden justify-between flex flex-col shadow-lg">
              <img
                className="w-full h-[300px]"
                src={process.env.NEXT_PUBLIC_URL + book?.poster}
                alt="Book cover"
              />
              <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2">{book.title}</h2>
                <p className="text-gray-700 text-base">
                  {book.description.substr(0, 20)}...
                </p>
                <div className="flex mt-4 justify-between">
                  <button
                    onClick={() => setBookContent(book)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    <Link href="/admin/add_book">Edit</Link>
                  </button>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    წაშლა{loading && "..."}
                  </button>
                </div>
                <div className="p-1 w-full bg-gray-200  justify-center  mt-5 flex  items-center">
                  <input
                    type="text"
                    className=" bg-transparent px-4 h-500 flex-1 w-[100px]"
                    placeholder="შეიყვანეთ ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  <button
                    onClick={() => giveAccess(book)}
                    className=" bg-green-500 mx-auto hover:bg-green-700 text-white font-bold py-1 px-2 text-sm rounded">
                    დამატება
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Books;
