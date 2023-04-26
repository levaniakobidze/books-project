import React, { FC } from "react";
import Image from "next/image";
import { IBook } from "@/types/bookTypes";
import { useContext } from "react";
import { BooksContext } from "@/context/books";
interface IProps {
  book: IBook;
}

const Book: FC<IProps> = ({ book }) => {
  const { handleBuyBook } = useContext(BooksContext);
  return (
    <div className="rounded shadow-lg  outline outline-blue-100 max-h-[400px]">
      <div className="px-3">
        <Image
          className="w-full object-cover  h-[220px]"
          src={book.img}
          alt="asda"
          height={200}
          width={200}
        />
      </div>
      <p className="hidden text-center mt-5  text-sm font-bold">
        {book.author}
      </p>

      {/* <p className=" px-5 text-center mt-5 text-მდ font-bold text-gray-900 ">
    {book.price} ლ
  </p> */}
      <div className=" my-5 flex  items-center justify-between ">
        <div className="  bg-blue-400  rounded-tr-lg rounded-br-lg px-3 py-1  sm:mt-0 md:shadow-xl  sm:flex flex-col justify-center items-center">
          <p className="    font-bold text-sm   text-[#ffffff] ">
            {book.price}ლ
          </p>
        </div>
        {/* <p className="text-[13px]">Levan masadashvili</p> */}
        <button
          onClick={handleBuyBook}
          className="  rounded-sm  tracking-wider px-3 py-1 text-sm rounded-tl-lg rounded-bl-lg sm:px-5 hover:bg-transparent transition duration-350 hover:outline hover:text-[#6ca0d1]  font-bold hover:outline-[#6ca0d1] bg-[#6ca0d1]   text-bold text-white">
          შეძენა
        </button>
      </div>
      <p className=" hidden sm:flex mb-3   px-5 text-center mt-5 text-მდ text-gray-500 ">
        {book.description.substr(0, 50)} ...
      </p>
    </div>
  );
};

export default Book;
