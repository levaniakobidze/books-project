import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext } from "react";
import { BooksContext } from "@/context/books";
import axios from "axios";
import { AuthContext } from "@/context/auth";

export default function DeletBook(props: any) {
  const {
    showDeleteBookModal,
    setShowDeleteBookModal,
    selectedDeleteBookId,
    setSelectedDeleteBookId,
  } = useContext(BooksContext);
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { adminToken } = useContext(AuthContext);
  const headers: any = {
    Authorization: `Bearer ${adminToken}`,
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const getBooks = async () => {
    try {
      const resp = await axios.get(
        "https://books-project-back-production.up.railway.app/api/allbook"
      );
      props.setBooks(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const deleteBook = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `https://books-project-back-production.up.railway.app/api/books/${selectedDeleteBookId}`,
        { headers }
      );
      getBooks();
      setLoading(false);
      setSelectedDeleteBookId("");
      setShowDeleteBookModal(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Transition.Root show={showDeleteBookModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setShowDeleteBookModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900">
                      ნამდვილად გსურთ წიგნის წაშლა
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    onClick={() => setShowDeleteBookModal(false)}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">
                    გაუქმება
                  </button>
                  <button
                    onClick={deleteBook}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-400 text-white   px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300  sm:col-start-1 sm:mt-0">
                    წაშლა {loading && "..."}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
