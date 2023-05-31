import React, { useContext, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BooksContext } from "@/context/books";

const TextEditor = () => {
  const editorRef = useRef(null);

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
    const page = { title: pagetTitle, content: editorRef.current.getContent() };
    setBookContent((prev) =>
      !prev.title
        ? { title: bookTitle, pages: [...prev.pages, page] }
        : { title: prev.title, pages: [...prev.pages, page] }
    );
    editorRef.current.setContent("");
    setPageTitle("");
    window.scrollTo(0, 0);
  };

  const editHandler = () => {
    const newPageContent = editorRef.current.getContent();

    const updatedPages = [...bookContent.pages];
    updatedPages[pageContent.pageIndex] = {
      ...updatedPages[pageContent.pageIndex],
      title: pagetTitle,
      content: newPageContent,
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

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(pageContent.content || "");
    }
  }, [pageContent]);

  return (
    <>
      <form className="mb-5">
        <div class="relative">
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="შეიყვანეთ წიგნის სათაური"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            required
          />
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
            disabled={!pagetTitle || !bookTitle}
            onClick={editHandler}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            დაედითება
          </button>
        )}

        <button
          disabled={!pagetTitle || !bookTitle}
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
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          ატვირთვა
        </button>
      </div>
    </>
  );
};

export default TextEditor;
