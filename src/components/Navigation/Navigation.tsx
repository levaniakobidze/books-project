import React, { ReactHTMLElement, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useRouter } from "next/router";
function Navigation() {
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useRouter();

  interface InavTypes {
    name: string;
    href: string;
  }

  const navigation: InavTypes[] = [
    { name: "მთავარი", href: "/" },
    { name: "წიგნები", href: "/books" },
    { name: "კატეგორიები", href: "/categorys" },
    { name: "ჩემი წიგნები", href: "/my_books" },
    { name: "შესვლა", href: "/auth/login" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];

    if (showMenu) {
      html.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
    }
  }, [showMenu]);

  return (
    <div>
      <nav className="py-5 px-10 flex items-center justify-between z-0">
        <div className="font-bold text-3xl text-gray-400 cursor-pointer">
          Logo
        </div>
        <div>
          <MenuIcon
            onClick={() => setShowMenu(!showMenu)}
            style={{ fontSize: "44px" }}
            className={`${
              showMenu && "text-red-500"
            } hover:text-red-500 cursor-pointer `}
          />
        </div>
      </nav>
      <div
        onClick={() => setShowMenu(false)}
        className={` absolute top-0 bottom-0  ${
          !showMenu ? "left-[-100%]" : "left-0   custom-transition "
        }  
        transition-all w-full  bg-gradient-to-r 
            from-[rgba(0,0,0,0.65)] to-[rgba(0,0,0,0.65)] h-[120vh]
   `}></div>
      <div
        className={` ${
          !showMenu ? "left-[-100%] " : "left-0"
        } px-10 w-[65%] sm:w-full  absolute top-0 bottom-0 sm:max-w-[20%] h-[120vh] bg-black transition-all ease-in-out duration-1000`}
        onClick={handleClick}>
        <div className="text-right mt-5">
          <CloseIcon
            onClick={() => setShowMenu(false)}
            className="text-white hover:text-red-500 transition cursor-pointer "
            style={{ fontSize: "44px" }}
          />
        </div>
        <ul className="mt-10">
          {navigation.map((nav, index) => {
            return (
              <li className="mt-5 text-right" key={index}>
                <Link
                  onClick={() => setShowMenu(false)}
                  className={` ${
                    pathname === nav.href ? "text-red-500" : "text-white"
                  } hover:text-red-500 transition-all text-lg tracking-wider`}
                  href={nav.href}>
                  {nav.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
