import React, { Fragment, useContext } from "react";
import TextEditor from "../Editor/Editor";
import { BooksContext } from "@/context/books";
const AddBook = () => {
  const { bookContent, setPageContent, setPageTitle } =
    useContext(BooksContext);
  return (
    <Fragment>
      <div className="flex flex-col md:flex-row ">
        <div className="w-[100px] mr-2 ">
          <ul className="">
            {bookContent.pages?.map((page: any, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setPageContent({ pageIndex: index, content: page.content });
                    setPageTitle(page.title);
                  }}
                  className="mt-2 text-sm cursor-pointer text-blue-500">
                  {page.title.substr(0, 10)}
                  {page.title.length > 10 && "..."}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <TextEditor />
        </div>
      </div>
    </Fragment>
  );
};

export default AddBook;
