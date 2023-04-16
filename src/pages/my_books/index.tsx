import BooksList from "@/components/BooksList/BooksList";
import React, { FC, Fragment, useEffect, useContext } from "react";
import Navigation from "@/components/Navigation/Navigation";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";

const MyBooks = () => {
  const { isAuth } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!isAuth) {
      router.push("/auth/login");
    }
  });

  return (
    <Fragment>
      <Navigation />
      <div className=" max:w-lg py-5 w-full min:h-screen flex flex-col    bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7]">
        <BooksList />
      </div>
    </Fragment>
  );
};

export default MyBooks;
