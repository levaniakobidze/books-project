import React, {
  ReactHTMLElement,
  useContext,
  useEffect,
  useState,
} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StyleIcon from "@mui/icons-material/Style";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import Dropdown from "../../components/Dropdown/Dropdown";
import SettingsIcon from "@mui/icons-material/Settings";

function Navigation() {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuth, user, handleLogin, handleLogout } = useContext(AuthContext);
  const { pathname } = useRouter();

  interface InavTypes {
    name: string;
    href: string;
    needAuth: boolean;
    icon: any;
  }

  const navigation: InavTypes[] = [
    { name: "მთავარი", href: "/", needAuth: false, icon: HomeWorkIcon },
    { name: "წიგნები", href: "/books", needAuth: false, icon: MenuBookIcon },
    {
      name: "კატეგორიები",
      href: "/categories",
      needAuth: false,
      icon: StyleIcon,
    },
    {
      name: "ჩემი წიგნები",
      href: "/my_books",
      needAuth: true,
      icon: MenuBookIcon,
    },
    {
      name: "ჩვენს შესახებ",
      href: "/about",
      needAuth: false,
      icon: InfoIcon,
    },
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
      <nav className="  px-10 flex items-center justify-between z-[100]">
        <div className="font-bold text-3xl text-gray-400 cursor-pointer">
          Logo
        </div>
        <div className="  lg:hidden py-5">
          <MenuIcon
            onClick={() => setShowMenu(!showMenu)}
            style={{ fontSize: "44px" }}
            className={`${
              showMenu && "text-red-500"
            } hover:text-red-500 cursor-pointer text-gray-400 `}
          />
        </div>
        <ul className="lg:flex gap-[20px] hidden items-center  h-[100%]  ">
          {navigation.map((nav, index) => {
            if (!isAuth && nav.needAuth === false) {
              return (
                <li className="text-right" key={index}>
                  <Link onClick={() => setShowMenu(false)} href={nav.href}>
                    <button
                      className={` ${
                        pathname === nav.href
                          ? "text-[#ffadb1] font-bold  border-b-2 py-3 border-blue-400"
                          : "text-gray-400"
                      } hover:text-[#ffadb1]  py-6  font-bold transition-all text-sm tracking-wider`}>
                      <nav.icon className="text-[20px] mx-2 text-gray-400 md:hidden lg:inline" />
                      {nav.name}
                    </button>
                  </Link>
                </li>
              );
            }
            if (isAuth) {
              return (
                <div className="text-right" key={index}>
                  <Link onClick={() => setShowMenu(false)} href={nav.href}>
                    <button
                      className={` ${
                        pathname === nav.href
                          ? "text-[#ffadb1] font-bold  border-b-2 py-3 border-blue-400"
                          : "text-gray-400"
                      } hover:text-[#ffadb1]  py-6  font-bold transition-all text-sm tracking-wider`}>
                      <nav.icon className="text-[20px] mx-2  md:hidden lg:inline" />
                      {nav.name}
                    </button>
                  </Link>
                </div>
              );
            }
          })}

          {!isAuth && (
            <Link
              onClick={() => {
                setShowMenu(false);
              }}
              className={` ${
                pathname === "/auth/login"
                  ? " font-bold  text-blue-400 "
                  : "text-gray-400"
              } hover:text-blue-400  rounded-2xl  p-3 font-bold transition-all text-sm tracking-wider`}
              href="/auth/login">
              <LoginIcon className="mx-2 text-[20px] text-gray-400 md:hidden lg:inline" />
              შესვლა
            </Link>
          )}
        </ul>
        {isAuth && (
          <div className="hidden lg:block">
            <Dropdown username={user.userName} />
          </div>
        )}
      </nav>
      <div
        onClick={() => setShowMenu(false)}
        className={` absolute top-0 bottom-0  ${
          !showMenu ? "left-[-100%]" : "left-0   custom-transition "
        }  
        transition-all w-full  bg-gradient-to-r  z-[999]
            from-[rgba(0,0,0,0.65)] to-[rgba(0,0,0,0.65)] h-[120vh] 
   `}></div>
      <div
        className={` ${
          !showMenu ? "left-[-100%] " : "left-0"
        } px-10 w-[80%] sm:w-full  absolute top-0 bottom-0 z-[999] sm:max-w-[40%] h-[120vh] bg-black transition-all ease-in-out duration-1000`}
        onClick={handleClick}>
        <div className="text-right mt-5">
          <CloseIcon
            onClick={() => setShowMenu(false)}
            className="text-white hover:text-red-500 transition cursor-pointer "
            style={{ fontSize: "44px" }}
          />
        </div>
        <ul className="mt-10">
          {isAuth && <Dropdown username={user.userName} />}
          {navigation.map((nav, index) => {
            return (
              <li className="mt-5 text-right" key={index}>
                <Link
                  onClick={() => setShowMenu(false)}
                  className={` ${
                    pathname === nav.href ? "text-[#6ca0d1]" : "text-white"
                  } hover:text-[#6ca0d1] font-bold transition-all flex justify-start text-lg tracking-wider`}
                  href={nav.href}>
                  <nav.icon className="text-md mx-2" />
                  {nav.name}
                </Link>
              </li>
            );
          })}

          {!isAuth && (
            <li className="mt-5 text-left">
              <Link
                onClick={() => {
                  setShowMenu(false);
                }}
                className={` ${
                  pathname === "/auth/login"
                    ? " font-bold  text-blue-400 "
                    : "text-blue-500"
                }  hover:text-blur-400   rounded-2xl  p-3 font-bold transition-all text-sm tracking-wider`}
                href="/auth/login">
                <LoginIcon className="text-[20px]  mr-2" />
                შესვლა
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
