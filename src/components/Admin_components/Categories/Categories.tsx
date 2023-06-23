import { BooksContext } from "@/context/books";
import { ICategory } from "@/types/bookTypes";
import React, { Fragment, useContext, useState } from "react";
import axios from "axios";

const Categories = () => {
  const { categories, getCategories } = useContext(BooksContext);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const addCategory = async () => {
    setLoading(true);
    if (!category) {
      setLoading(false);
      return;
    }
    try {
      await axios.post(
        "https://books-project-back-production.up.railway.app/api/category",
        { title: category }
      );
      getCategories();
      setLoading(false);
      setCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (id: any) => {
    setDeleteLoading(true);
    try {
      await axios.delete(
        `https://books-project-back-production.up.railway.app/api/category/${id}`
      );
      getCategories();
      setDeleteLoading(false);
    } catch (error) {
      console.log(error);
      setDeleteLoading(false);
    }
  };

  return (
    <Fragment>
      <p className="text-gray-500 my-5">კატეგორიები</p>
      <div className="flex flex-wrap  gap-10">
        {categories?.map((category: ICategory, index: number) => {
          return (
            <div
              key={index}
              className="shadow-md border border-gray-100 rounded-lg p-4 mb-4">
              <div className="bg-gray-100 p-4">
                <h2 className="text-md">{category.title}</h2>
              </div>
              <div className="p-4">
                <p className="text-sm">category: ({index + 1})</p>
              </div>
              <div className="text-right">
                <button
                  disabled={deleteLoading}
                  onClick={() => handleDeleteCategory(category.id)}
                  className="border-none bg-red-600 text-white px-4 py-2 cursor-pointer">
                  წაშლა {deleteLoading && "..."}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <p className="text-gray-500">კატეგორიების დამატება</p>
        <form className="mt-5">
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900  rounded-lg bg-gray-50 outline-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <button
              disabled={loading}
              onClick={addCategory}
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-green-700 hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              დამატება
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Categories;
