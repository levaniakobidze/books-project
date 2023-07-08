import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { title } from "process";
import DeleteBook from "@/components/Modals/DeleteBook/DeleteBook";
import Link from "next/link";
import { BooksContext } from "@/context/books";
import { AuthContext } from "@/context/auth";
const Books = () => {
  const [books, setBooks] = useState<any>([]);
  const [userId, setUserId] = useState("");
  const [accessLoading, setAccessLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    setEditBookContent,
    setShowDeleteBookModal,
    setSelectedDeleteBookId,
    setSelectedBookId,
  } = useContext(BooksContext);
  const { user, adminToken } = useContext(AuthContext);
  const [selected, setSelected] = useState("");

  const headers: any = {
    Authorization: `Bearer ${adminToken}`,
    accept: "application/json",
    "Content-Type": "application/json",
  };

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
    setAccessLoading(true);
    const access = {
      bookId: book.id,
      userId: userId,
    };
    try {
      await axios.put(
        `https://books-project-back-production.up.railway.app/api/access/${book.id}/${userId}`,
        access,
        { headers }
      );
      setAccessLoading(false);
      setUserId("");
    } catch (error) {
      setAccessLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap gap-6">
      <DeleteBook setBooks={setBooks} />
      {books &&
        books.map((book: any, index: number) => {
          return (
            <div
              key={index}
              className="max-w-xs w-[600px] rounded overflow-hidden justify-between flex flex-col shadow-lg">
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
                  <Link
                    onClick={() => {
                      setEditBookContent(book);
                      setSelectedBookId(book.id);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    href="/admin/edit_book">
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedDeleteBookId(book.id);
                      setShowDeleteBookModal(true);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    წაშლა{loading && "..."}
                  </button>
                </div>
                <div className="p-1 w-full bg-gray-200  justify-center  mt-5 flex  items-center">
                  <input
                    type="text"
                    className=" bg-transparent px-4 h-500 flex-1 w-[100px]"
                    placeholder="შეიყვანეთ ID"
                    value={selected === book.id ? userId : ""}
                    onChange={(e) => {
                      setSelected(book.id);
                      setUserId(e.target.value);
                    }}
                  />
                  <button
                    disabled={accessLoading && !Boolean(userId)}
                    onClick={() => giveAccess(book)}
                    className=" bg-green-500 mx-auto hover:bg-green-700 text-white font-bold py-1 px-2 text-[10px] rounded">
                    წვდომის მიცემა{" "}
                    {accessLoading && selected === book.id && "..."}
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
