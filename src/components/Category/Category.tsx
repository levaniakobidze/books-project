import { ICategory } from "@/types/bookTypes";
import Link from "next/link";
import React, { FC } from "react";
interface IProps {
  category: ICategory;
}

const Category: FC<IProps> = ({ category }) => {
  return (
    <Link
      onClick={() => localStorage.setItem("category", category.category)}
      href={{
        pathname: `/categories/${category.category}`,
        query: { category: JSON.stringify(category) },
      }}
      // style={{
      //   backgroundImage:
      //     "linear-gradient( rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)),url('/assets/pink.png')",
      // }}
      className="backdrop-filter backdrop-sepia bg-cover bg-center bg-no-repeat
        font-bold hover:text-white hover:rounded-lg duration-300 hover:bg-pink-400
        transition-bg cursor-pointer p-10 rounded-md shadow-lg hover:shadow-xl flex justify-center
        items-center bg-blue-400 text-white">
      {category.category}
    </Link>
  );
};

export default Category;
