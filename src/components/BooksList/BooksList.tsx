import React, { useState } from "react";
import Image from "next/image";
import book from "../../../public/assets/book.jpg";
import book2 from "../../../public/assets/book2.png";
import book3 from "../../../public/assets/book3.png";

function BooksList() {
  const [data, setData] = useState([
    {
      id: "2342",
      img: book,
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
    },
    {
      id: "2342",
      img: book2,
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
    },
    {
      id: "2342",
      img: book3,
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
    },
    {
      id: "2342",
      img: book,
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
    },
    {
      id: "2342",
      img: book2,
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
    },
    {
      id: "2342",
      img: book3,
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
    },
    {
      id: "2342",
      img: book,
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
    },
    {
      id: "2342",
      img: book2,
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
    },
  ]);

  return (
    <div className=" px-10 mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
      {data.map((book, index) => {
        return (
          <div className="rounded bg-white shadow-lg" key={index}>
            <div>
              <Image
                className="w-full object-cover  h-[220px]"
                src={book.img}
                alt="asda"
                height={200}
              />
            </div>
            <p className="text-center mt-5  text-sm font-bold">{book.author}</p>
            <p className=" h-[45px] px-5 text-center mt-5 text-მდ text-gray-500 ">
              {book.description.substr(0, 40)} ...
            </p>
            <p className=" px-5 text-center mt-5 text-მდ font-bold text-gray-900 ">
              {book.price} ლ
            </p>
            <div className="flex justify-center ">
              <button className="my-5 w-[50%] tracking-wider p-3 hover:bg-transparent transition duration-350 hover:outline hover:text-[#6ca0d1]  font-bold hover:outline-[#6ca0d1] bg-[#6ca0d1] rounded  text-bold text-white">
                შეძენა
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BooksList;
