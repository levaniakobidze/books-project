import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "@/context/auth";
import Link from "next/link";
import { BooksContext } from "@/context/books";
import axios from "axios";
import { useRouter } from "next/router";

const BuyBooks = () => {
  const {
    showBuyBookModal,
    setShowBuyBookModal,
    purchase,
    setPurchase,
    setShowPurchaseSuccessModal,
  } = useContext(BooksContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handlePurcahes = async () => {
    setLoading(true);
    try {
      await axios.post(process.env.NEXT_PUBLIC_URL + "/api/purchase", purchase);
      setLoading(false);
      router.push("/my_books");
      // setTimeout(() => {
      setShowBuyBookModal(false);
      setShowPurchaseSuccessModal(true);
      // }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Transition.Root show={showBuyBookModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowBuyBookModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden  rounded-lg bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900">
                      თანხის გადახდა
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-md text-gray-500">
                        გადაიხადე შესაბამისი წიგნის საფასური ქვემოთ მოცემულ
                        ანგარიშის ნომერზე, შემდეგ ქვემოთ მოცემულ ველში შეიყვანე
                        თქვენი ბარათის მფლობელის სახელი და გვარი. და მხოლოდ ამის
                        შემდეგ დააჭირეთ ვარდისფერ ღილაკს „გაგზავნა„. დაელოდეთ
                        რამოდენიმე საათი და წიგნი გაგიაქტიურდებათ.
                      </p>
                    </div>
                    <div className="my-5">
                      <p className="font-bold">ანგარიშის ნომერი</p>
                      <p className="mt-1">GE000BG3444424B00SFG44</p>
                    </div>
                    <div className="mb-10">
                      <label className="font-bold" htmlFor="default-input">
                        ბარათის მფლობელი
                      </label>
                      <input
                        onChange={(e) =>
                          setPurchase({ ...purchase, cardName: e.target.value })
                        }
                        value={purchase.cardName}
                        type="text"
                        id="default-input"
                        placeholder="შეიყვანეთ ბარათის მფლობელის სახელი"
                        className="mt-3 max-w-sm mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={handlePurcahes}
                      className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 border border-pink-700 rounded">
                      გადავიხადე {loading && "..."}
                    </button>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6"></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BuyBooks;
