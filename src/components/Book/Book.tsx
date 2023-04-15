import React, { FC } from "react";
import Image from "next/image";
import { IBook } from "@/types/bookTypes";
interface IProps {
  book: IBook;
}

const Book: FC<IProps> = ({ book }) => {
  return (
    <div className="rounded bg-white shadow-lg">
      <div>
        <Image
          className="w-full object-cover  h-[220px]"
          src={book.img}
          alt="asda"
          height={200}
          width={200}
        />
      </div>
      <p className="text-center mt-5  text-sm font-bold">{book.author}</p>
      <p className=" h-[45px] px-5 text-center mt-5 text-მდ text-gray-500 ">
        {book.description.substr(0, 40)} ...
      </p>
      {/* <p className=" px-5 text-center mt-5 text-მდ font-bold text-gray-900 ">
    {book.price} ლ
  </p> */}
      <div className=" my-5 flex gap-1 justify-between items-center px-10 ">
        <div className=" rounded-full shadow-xl p-4 flex flex-col justify-center items-center">
          <p className="font-bold text-sm px-3  text-[#6ca0d1] ">
            {book.price}ლ
          </p>
        </div>
        <button className=" rounded-full w-[50%] tracking-wider p-3 hover:bg-transparent transition duration-350 hover:outline hover:text-[#6ca0d1]  font-bold hover:outline-[#6ca0d1] bg-[#6ca0d1]   text-bold text-white">
          შეძენა
        </button>
      </div>
    </div>
  );
};

export default Book;
