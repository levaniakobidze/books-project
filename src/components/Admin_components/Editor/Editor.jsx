import React, { useContext, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BooksContext } from "@/context/books";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import axios from "axios";

const TextEditor = () => {
  const editorRef = useRef(null);
  const categoryRef = useRef(null);

  const {
    bookContent,
    setBookContent,
    bookTitle,
    setBookTitle,
    pagetTitle,
    setPageTitle,
    pageContent,
    setPageContent,
  } = useContext(BooksContext);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const uploadHandler = () => {
    const page = {
      title: pagetTitle,
      content: editorRef.current.getContent(),
      audio: "asda",
    };
    setBookContent((prev) => ({ ...prev, pages: [...prev.pages, page] }));
    editorRef.current.setContent("");
    setPageTitle("");
    window.scrollTo(0, 0);

    console.log(bookContent);
  };

  const editHandler = () => {
    const newPageContent = editorRef.current.getContent();

    const updatedPages = [...bookContent.pages];
    updatedPages[pageContent.pageIndex] = {
      ...updatedPages[pageContent.pageIndex],
      title: pagetTitle,
      content: newPageContent,
      audio: "",
    };

    setBookContent((prevBook) => ({
      ...prevBook,
      pages: updatedPages,
    }));
    setPageContent({ title: "", pages: [] });
    editorRef.current.setContent("");
    setPageTitle("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteHandler = () => {
    const updatedPages = bookContent.pages.filter(
      (page, index) => index !== pageContent.pageIndex
    );

    setBookContent((prevBook) => ({
      ...prevBook,
      pages: updatedPages,
    }));
    editorRef.current.setContent("");
    setPageTitle("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setBookContent((prev) => ({ ...prev, poster: base64String }));
      };

      reader.readAsDataURL(file);
    },
  });

  const addCategory = () => {
    const category = categoryRef.current.value;
    if (category) {
      setBookContent((prev) => ({
        ...prev,
        categories: [...prev.categories, Number(category)],
      }));
    }
    categoryRef.current.value = "";
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(pageContent.content || "");
    }
  }, [pageContent]);

  const upload = async () => {
    try {
      await axios.post(
        "https://books-project-back-production.up.railway.app/api/books",
        bookContent
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="mb-5">
        <div class="relative">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            წიგნის სათაური
          </label>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="სათაური"
            value={bookContent.title}
            onChange={(e) =>
              setBookContent((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
        </div>
        <div class="relative mt-5">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            წიგნის ავტორი
          </label>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="შეიყვანეთ წიგნის სათაური"
            value={bookContent.author}
            onChange={(e) =>
              setBookContent((prev) => ({ ...prev, author: e.target.value }))
            }
            required
          />
        </div>
        <div className="flex gap-5">
          <div class="relative mt-5">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              წიგნის პოსტერი
            </label>
            <div
              class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...getRootProps()}>
              <p className="text-gray-500  cursor-pointer">დაამატე</p>
              <input
                {...getInputProps()}
                type="file"
                id="default-search"
                placeholder="შეიყვანეთ წიგნის სათაური"
                value={bookTitle}
                required
              />
            </div>
            {bookContent.poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="w-[100px] mt-5 "
                src={bookContent.poster}
                alt="Selected"
              />
            )}
          </div>
          <div class="relative mt-5">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              წიგნის ფასი
            </label>
            <input
              type="number"
              id="default-search"
              class="block w-full p-4 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="შეიყვანეთ წიგნის სათაური"
              value={bookContent.price}
              onChange={(e) =>
                setBookContent((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
              required
            />
          </div>
        </div>
        <div class="relative mt-5">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            წიგნის კატეგორიები
          </label>
          <div className="gap-2 flex justify-between w-full p-4 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <input
              type="text"
              id="default-search"
              className="border-0 outline-0"
              placeholder="შეიყვანეთ წიგნის სათაური"
              ref={categoryRef}
              required
            />
            <button
              onClick={addCategory}
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 mr-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              დამატება
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-5">
          {bookContent.categories?.map((category, index) => {
            return (
              <div
                onClick={() => {
                  let categories = [...bookContent.categories];
                  categories = categories.filter(
                    (category, catIndex) => catIndex !== index
                  );
                  setBookContent((prev) => ({
                    ...prev,
                    categories: categories,
                  }));
                }}
                key={index}
                className="flex items-center bg-blue-500 text-white rounded-full px-3 py-1">
                <span className="mr-2">{category}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            );
          })}
        </div>
        <div className="mt-5">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            წიგნის აღწერა
          </label>
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            onChange={(e) =>
              setBookContent((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }></textarea>
        </div>
      </form>

      <Editor
        apiKey="vzkfeug5q4me46sye4gvez1nd382k6hwqpx9loke76rq1f7i"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatselect | fontsizeselect | customFontsizeselect | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | table | image media | help",
          content_style:
            "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
          fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
          setup: (editor) => {
            editor.ui.registry.addButton("customFontsizeselect", {
              text: "Font Size",
              type: "menubutton",
              fetch: (callback) => {
                const items = [
                  { text: "Tiny", value: "8pt" },
                  { text: "Small", value: "10pt" },
                  { text: "Normal", value: "12pt" },
                  { text: "Large", value: "14pt" },
                  { text: "Huge", value: "18pt" },
                ];
                callback(items);
              },
              onAction: (buttonApi) => {
                const value = buttonApi.value;
                editor.execCommand("fontSize", false, value);
              },
              onSetup: (buttonApi) => {
                buttonApi.onAction = () => buttonApi.onAction();
              },
            });
          },
        }}
      />
      <form className="mt-5">
        <div class="relative">
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="შეიყვანეთ გვერდის სათაური"
            value={pagetTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            required
          />
        </div>
      </form>
      <div className="mt-5">
        {pageContent.content && (
          <button
            disabled={
              !bookContent.title ||
              !bookContent.description ||
              !bookContent.price ||
              !bookContent.author
            }
            onClick={editHandler}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            დაედითება
          </button>
        )}

        <button
          // disabled={
          //   !bookContent.title ||
          //   !bookContent.description ||
          //   !bookContent.price ||
          //   !bookContent.author
          // }
          onClick={uploadHandler}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          გვერდის დამატება
        </button>
        <button
          onClick={deleteHandler}
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          გვერდის წაშლა
        </button>
        <button
          onClick={upload}
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          ატვირთვა
        </button>
      </div>
    </>
  );
};

export default TextEditor;
