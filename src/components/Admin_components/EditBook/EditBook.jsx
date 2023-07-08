import React, { useContext, useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BooksContext } from "@/context/books";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import axios from "axios";
import BookAdded from "@/components/Modals/BookAdded/BookAdded";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";

const EditBook = () => {
  const editorRef = useRef(null);
  const categoryRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const animatedComponents = makeAnimated();
  const router = useRouter();
  const {
    editBookContent,
    setEditBookContent,
    pagetTitle,
    setPageTitle,
    pageContent,
    setPageContent,
    categories,
    selectedBookId,
    setSelectedBookId,
  } = useContext(BooksContext);

  const { adminToken } = useContext(AuthContext);

  const headers = {
    Authorization: `Bearer ${adminToken}`,
    // accept: "application/json",
    // "Content-Type": "application/json",
  };
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
    setEditBookContent((prev) => ({ ...prev, pages: [...prev.pages, page] }));
    editorRef.current.setContent("");
    setPageTitle("");
    window.scrollTo(0, 0);
  };

  const editHandler = () => {
    const newPageContent = editorRef.current.getContent();

    const updatedPages = [...editBookContent.pages];
    updatedPages[pageContent.pageIndex] = {
      ...updatedPages[pageContent.pageIndex],
      title: pagetTitle,
      content: newPageContent,
      audio: "sdsad",
    };
    setEditBookContent((prevBook) => ({
      ...prevBook,
      pages: updatedPages,
    }));
    setPageContent({ title: "", pages: [] });
    editorRef.current.setContent("");
    setPageTitle("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteHandler = () => {
    const updatedPages = editBookContent.pages.filter(
      (page, index) => index !== pageContent.pageIndex
    );

    setEditBookContent((prevBook) => ({
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
        setSelectedImg(base64String);
      };

      reader.readAsDataURL(file);
    },
  });

  const addCategory = () => {
    const category = categoryRef.current.value;
    if (category) {
      setEditBookContent((prev) => ({
        ...prev,
        categories: [...prev.categories, Number(category)],
      }));
    }
    categoryRef.current.value = "";
  };

  const handleSelectPoster = (e) => {
    setEditBookContent((prev) => ({ ...prev, poster: e.target.files[0] }));
    setSelectedImg(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(pageContent.content || "");
    }
  }, [pageContent]);

  // const formData = new FormData();
  // const arrayOfObjects = editBookContent.pages;
  //
  // formData.append("title", editBookContent.title);
  // formData.append("author", editBookContent.author);
  // formData.append("description", editBookContent.description);
  // formData.append("price", editBookContent.price);
  // formData.append("categories", editBookContent.categories);
  //
  // for (let index = 0; index < editBookContent.pages.length; index++) {
  //   const element = editBookContent.pages[index];
  //   formData.append("pages[]", JSON.stringify(element));
  // }

  const updateBook = async () => {
    const postObj = {
      title: editBookContent.title,
      description: editBookContent.description,
      price: editBookContent.price,
      author: editBookContent.author,
      categories: editBookContent.categories,
      pages: editBookContent.pages.map((page) => {
        delete page._id;
        return page;
      }),
    };
    setLoading(true);
    try {
      if (
        editBookContent.title &&
        editBookContent.author &&
        editBookContent.price &&
        editBookContent.poster &&
        editBookContent.description &&
        editBookContent.pages
      ) {
        await axios.put(
          `https://books-project-back-production.up.railway.app/api/books/${selectedBookId}`,
          postObj,
          { headers }
        );
      } else {
        setLoading(false);
        return;
      }
      setEditBookContent({
        title: "",
        poster: "",
        author: "",
        price: "",
        description: "",
        categories: [],
        pages: [],
      });
      setSelectedBookId("");
      setSelectedImg("");
      setLoading(false);
      setShowModal(true);
      router.push("/admin/admin_books");
    } catch (error) {
      console.log(error);
    }
  };

  const colourOptions =
    categories &&
    categories.map((category, index) => {
      return {
        value: category.id,
        label: category.title,
        color: "#00B8D9",
        isFixed: true,
      };
    });

  const customStyles = {
    control: (provided) => ({
      ...provided,
      zIndex: 999,
    }),
  };

  const handleSelect = (selected) => {
    const categories = selected.map((category) => category.value);
    setEditBookContent((prev) => ({
      ...prev,
      categories: [...categories],
    }));
  };

  return (
    <div className="flex">
      <BookAdded showModal={showModal} setShowModal={setShowModal} />
      <div className="w-[100px] mr-2 ">
        <ul className="">
          {editBookContent.pages?.map((page, index) => {
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
              value={editBookContent.title}
              onChange={(e) =>
                setEditBookContent((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
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
              value={editBookContent.author}
              onChange={(e) =>
                setEditBookContent((prev) => ({
                  ...prev,
                  author: e.target.value,
                }))
              }
              required
            />
          </div>
          <div class="relative mt-5">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              წიგნის კატეგორიები
            </label>
            {/* <div className="gap-2 flex justify-between w-full p-4 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
          </div> */}
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={[colourOptions[4], colourOptions[5]]}
              isMulti
              options={colourOptions}
              styles={customStyles}
              onChange={handleSelect}
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
                class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                // {...getRootProps()}
              >
                <input
                  // {...getInputProps()}
                  type="file"
                  id="default-search"
                  placeholder="შეიყვანეთ წიგნის სათაური"
                  onChange={handleSelectPoster}
                  required
                />
              </div>
              {selectedImg && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="w-[100px] mt-5 "
                  src={selectedImg}
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
                value={editBookContent.price}
                onChange={(e) =>
                  setEditBookContent((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                required
              />
            </div>
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
              value={editBookContent.description}
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              onChange={(e) =>
                setEditBookContent((prev) => ({
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
            menubar: "favs file edit  view insert format tools table",

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
                !editBookContent.title ||
                !editBookContent.description ||
                !editBookContent.price ||
                !editBookContent.author
              }
              onClick={editHandler}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              დაედითება
            </button>
          )}

          <button
            disabled={
              !editBookContent.title ||
              !editBookContent.description ||
              !editBookContent.price ||
              !editBookContent.author
            }
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
            disabled={loading || !editBookContent.pages.length}
            onClick={updateBook}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            განახლება{loading && "..."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
