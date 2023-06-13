import React, { FC } from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import {
  AiOutlineHome,
  AiOutlineSafety,
  AiOutlineDollar,
} from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import AddBook from "@/components/Admin_components/AddBook/AddBook";
import BooksList from "@/components/BooksList/BooksList";
import Categories from "../../components/Admin_components/Categories/Categories";
import Users from "@/components/Admin_components/Users/Users";
import Books from "@/components/Admin_components/Books/Books";
import Logo from "../../../public/assets/logo.png";
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
const Index: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paySuccessful, setPaySuccessful] = useState<boolean>(false);
  const [isProMember, setIsProMember] = useState(false);
  const router = useRouter();
  const category = router.query.category;

  const navigation = [
    {
      name: "წიგნის დამატება",
      href: "/admin/add_book",
      icon: AiOutlineDollar,
      current: true,
    },
    {
      name: "წიგნის კატეგორიები",
      href: "/admin/admin_categories",
      icon: AiOutlineDollar,
      current: true,
    },
    {
      name: "წიგნები",
      href: "/admin/admin_books",
      icon: AiOutlineHome,
      current: false,
    },
    {
      name: "იუზერები",
      href: "/admin/admin_users",
      icon: AiOutlineHome,
      current: false,
    },
  ];

  const renderComponent = () => {
    switch (category) {
      case "add_book":
        return <AddBook />;
      case "admin_categories":
        return <Categories />;
      case "admin_books":
        return <Books />;
      case "admin_users":
        return <Users />;
      default:
        break;
    }
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full">
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    {/* <Image
                      className="h-8 w-auto cursor-pointer rounded-full"
                      src={Bi}
                      alt="Your Company"
                    /> */}
                    <Link href="/">
                      <Image
                        className="h-[40px] w-[150px]"
                        src={Logo}
                        alt="logo"
                        width={100}
                        height={100}
                      />
                    </Link>
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => {
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={classNames(
                              `/dashboard/${category}` === item.href
                                ? "bg-gray-900 text-white"
                                : "text-gray-700 hover:bg-gray-700 hover:text-white",
                              "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                            )}>
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-300"
                                  : "text-gray-400 group-hover:text-gray-300",
                                "mr-4 h-6 w-6 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col  shadow-lg">
            <div className="flex h-16 flex-shrink-0 items-center bg-blue-100 px-4">
              {/* <Image
                className="h-8 w-auto cursor-pointer"
                src={BitLogo}
                alt="Your Company"
              /> */}
              <Link href="/">
                <Image
                  className="h-[40px] w-[150px]"
                  src={Logo}
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      `/dashboard/${category}` === item.href
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-blue-100",
                      "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                    )}>
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300",
                        "mr-3 h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-end px-4">
              <div className="ml-4 flex items-center lg:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      {/* <Image
                        className="h-8 w-auto cursor-pointer rounded-full"
                        src={UserLogo}
                        alt="Your Company"
                      /> */}
                      asdasd
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <Link
                          href={"/dashboard/your_info"}
                          className={classNames(
                            "block px-4 py-2 text-sm text-gray-700"
                          )}>
                          შენი ინფორმაცია
                        </Link>
                      </Menu.Item>

                      <Menu.Item>
                        <p
                          className={classNames(
                            "block px-4 py-2 text-sm text-gray-700 cursor-pointer "
                          )}>
                          გამოსვლა
                        </p>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              <div className=" max-w-7xl px-4 sm:px-6 lg:px-4">
                {/* Your content */}
                {renderComponent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Index;
