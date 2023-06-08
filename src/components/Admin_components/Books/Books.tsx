import React, { useEffect, useState } from "react";
import axios from "axios";
import { title } from "process";

const Books = () => {
  const [books, setBooks] = useState<any>([]);
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

  return (
    <div className="flex flex-wrap gap-6">
      {books &&
        books.map((book: any, index: number) => {
          return (
            <div
              key={index}
              className="max-w-xs rounded overflow-hidden shadow-lg">
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
                <div className="flex mt-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    წაშლა
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
