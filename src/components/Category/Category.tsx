import { ICategory } from "@/types/bookTypes";
import Link from "next/link";
import React, { FC } from "react";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
interface IProps {
  category: ICategory;
}

const Category: FC<IProps> = ({ category }) => {
  return (
    <Link
      onClick={() => localStorage.setItem("category", category.id.toString())}
      href={{
        pathname: `/categories/${category.id}`,
      }}
      // style={{
      //   backgroundImage:
      //     "linear-gradient( rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)),url('/assets/pink.png')",
      // }}
      className="backdrop-filter backdrop-sepia bg-cover bg-center bg-no-repeat
        font-bold hover:text-gray-400 hover:rounded-3xl duration-300 
        transition-bg cursor-pointer p-5 rounded-3xl shadow-xl hover:shadow-sm bg-white flex justify-center
        items-center  text-gray-500 flex-col gap-2">
      <ContactSupportIcon className="w-[50px] text-pink-500" />
      <p className="mt-2">{category.title}</p>
      <div className="text-[12px]">{"(2)"}</div>
    </Link>
  );
};

export default Category;
