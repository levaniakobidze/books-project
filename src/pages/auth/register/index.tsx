import Navigation from "@/components/Navigation/Navigation";
import React, { Fragment } from "react";
import Link from "next/link";

function Register() {
  return (
    <Fragment>
      <Navigation />
      <section className="px-10 py-10 w-full min:h-[100vh] flex flex-col    bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7]">
        <div className=" text-center my-5 ">
          <h1 className="text-gray-700 text-4xl font-bold ">რეგისტრაცია</h1>
          {/* <p className="text-black mt-3 ">შედი შენს ანგარიშზე</p> */}
        </div>
        <div className=" px-5 py-10 w-full sm:mx-auto sm:w-full sm:max-w-lg border rounded-3xl bg-white ">
          <h1 className="text-gray-700 text-center mt-5 font-bold text-xl">
            შეავსე ველები და შედი შენს ანგარიშზე
          </h1>
          <div className="mt-10 ">
            <label htmlFor="text" className="text-gray-800">
              Username
            </label>
            <input
              type="username"
              name="text"
              id="username"
              placeholder="შეიყვანეთ Username"
              className="mt-3 w-full py-2.5 px-3 bg-[#f0f5f9] border-0 outline-none rounded-lg focus:outline focus:outline-cyan-300  text-sm"
            />
          </div>
          <div className="mt-10 ">
            <label htmlFor="text" className="text-gray-800">
              ელ.ფოსტა
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="შეიყვანეთ ელ.ფოსტა"
              className="mt-3 w-full py-2.5 px-3 bg-[#f0f5f9] border-0 outline-none rounded-lg focus:outline focus:outline-cyan-300  text-sm"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="password" className="text-gray-800">
              პაროლი
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="შეიყვანეთ პაროლი"
              className="mt-3 w-full py-2.5 px-3 bg-[#f0f5f9] border-0 outline-none rounded-lg focus:outline focus:outline-cyan-300  text-sm"
            />
          </div>
          {/* <div className="flex items-center mt-3">
          <input type="checkbox" name="policy" id="policy" />
          <label htmlFor="policy" className="mx-3 cursor-pointer">
            I accept the Terms of Service
          </label>
        </div> */}
          <div>
            <button className="mt-5 py-3 bg-[#496885] w-full text-white rounded-md hover:bg-[#a1bdd7] ">
              რეგისტრაცია
            </button>
          </div>
          <Link
            href={"/auth/login"}
            className="flex justify-end text-[13px] mt-3 text-gray-600 hover:text-gray-500 cursor-pointer">
            ანგარიშზე შესვლა
          </Link>
        </div>
      </section>
    </Fragment>
  );
}

export default Register;
