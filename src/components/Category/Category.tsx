import { ICategory } from "@/types/bookTypes";
import Link from "next/link";
import React, { FC } from "react";
interface IProps {
  category: ICategory;
}

const Category: FC<IProps> = ({ category }) => {
  return (
    <Link
      href={`/categories/${category.category}`}
      className="bg-blue-400 font-bold hover:bg-white hover:text-blue-400 transition cursor-pointer p-10 rounded-md shadow-lg flex justify-center items-center text-white">
      {category.category}
    </Link>
  );
};

export default Category;
