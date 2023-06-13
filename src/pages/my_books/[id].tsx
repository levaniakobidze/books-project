/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext, Fragment } from "react";
import { useRouter, NextRouter } from "next/router";
import { BooksContext } from "@/context/books";
import Navigation from "@/components/Navigation/Navigation";
import Image from "next/image";
import { IBook } from "@/types/bookTypes";
import { StarIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { AuthContext } from "@/context/auth";
import BuyBooks from "@/components/Modals/BuyBook/BuyBook";

const product = {
  name: "Application UI Icon Pack",
  version: { name: "1.0", date: "June 5, 2021", datetime: "2021-06-05" },
  price: "$220",
  description:
    "The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.",
  highlights: [
    "200+ SVG icons in 3 unique styles",
    "Compatible with Figma, Sketch, and Adobe XD",
    "Drawn on 24 x 24 pixel grid",
  ],
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg",
  imageAlt:
    "Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.",
};
const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
      date: "July 16, 2021",
      datetime: "2021-07-16",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
      date: "July 12, 2021",
      datetime: "2021-07-12",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

const Description = () => {
  const router: NextRouter = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<IBook | null>(null);
  const { books, handleBuyBook } = useContext(BooksContext);
  const { isAuth, user } = useContext(AuthContext);

  useEffect(() => {
    const filtered = books.find((book: IBook) => book.id === id);
    setBook(filtered);
  }, [id]);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  let findBook;
  if (book && Object.keys(user).length !== 0) {
    findBook = user.history.find((b: any) => b.bookId === book.id);
  }
  return (
    <Fragment>
      <BuyBooks />
      <Navigation />
      <div className="bg-white">
        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            {/* Product image */}
            <div className="lg:col-span-4 lg:row-end-1">
              <div className="aspect-h-3 aspect-w-3 overflow-hidden  rounded-lg bg-blue-100">
                <img
                  src={process.env.NEXT_PUBLIC_URL ?? "/" + book?.poster}
                  alt={product.imageAlt}
                  className="object-contain object-center w-full h-[450px]"
                />
              </div>
            </div>

            {/* Product details */}
            <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
              <div className="flex flex-col-reverse">
                <div className="mt-4">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {book?.title}
                  </h1>
                </div>
                <div>
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-yellow-400"
                            : "text-gray-300",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                </div>
              </div>
              <p className="mt-6 text-gray-500">{book?.description}</p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {!findBook ? (
                  <button
                    onClick={() => handleBuyBook(book)}
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-400 px-8 py-3 text-base font-medium text-white hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    ყიდვა {book?.price}ლ
                  </button>
                ) : (
                  <Link
                    href={`/open_book/${book?.id}`}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-400 px-8 py-3 text-base font-medium text-white hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    ნახვა
                  </Link>
                )}

                <Link
                  href={isAuth ? "/books" : "/"}
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                  უკან დაბრუნება
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Description;
