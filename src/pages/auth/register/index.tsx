import Navigation from "@/components/Navigation/Navigation";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth";
import Link from "next/link";
import RegsietrSucces from "../../../components/Modals/Verify_email/RegisterSuccess";

function Register() {
  const { handleRegister, loading } = useContext(AuthContext);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: "",
    backlink: "",
  });

  let host = "";
  if (typeof window !== "undefined") {
    host = window.location.host;
  }

  useEffect(() => {
    setRegisterData({
      ...registerData,
      backlink: host + "/email_verification",
    });
  }, [host]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const register = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (registerData.userName === "") {
      setErrors({ ...errors, userName: "მიუთითეთ იუზერნეიმი" });
      return;
    } else {
      setErrors({ ...errors, userName: "" });

      console.log("sadad");
    }
    if (!emailRegex.test(registerData.email)) {
      setErrors({ ...errors, email: "მიუთითეთ სწორი ემაილი" });
    } else {
      setErrors({ ...errors, email: "" });
    }

    handleRegister(registerData);
  };

  return (
    <Fragment>
      <Navigation />
      <RegsietrSucces />
      <section className="px-3 py-10 w-ful h-screen flex flex-col    bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7]">
        <div className=" text-center my-5 ">
          <h1 className="text-gray-500 text-4xl font-bold tracking-wider ">
            რეგისტრაცია
          </h1>
          {/* <p className="text-black mt-3 ">შედი შენს ანგარიშზე</p> */}
        </div>
        <div className="mt-2 px-5 py-5 w-full sm:mx-auto sm:w-full sm:max-w-lg border rounded-3xl bg-white ">
          {/* <h1 className="text-gray-700 text-center mt-5 font-bold text-xl">
            შეავსე ველები და შედი შენს ანგარიშზე
          </h1> */}
          <div className="mt-10 ">
            <label htmlFor="userName" className="px-1 text-sm text-gray-800">
              Username
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              onChange={handleChange}
              value={registerData.userName}
              placeholder="შეიყვანეთ Username"
              className={`mt-3 w-full py-2.5 px-3 bg-[#f0f5f9] border-0 outline-none rounded-lg focus:outline focus:outline-cyan-300 ${
                errors.userName && "outlnine outline-pink-600"
              }   text-sm`}
            />
            {errors.userName && (
              <p className="text-pink-600 py-2 text-sm">{errors.userName}</p>
            )}
          </div>
          <div className="mt-5 ">
            <label htmlFor="email" className="px-1 text-sm text-gray-800">
              ელ.ფოსტა
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={registerData.email}
              onChange={handleChange}
              placeholder="შეიყვანეთ ელ.ფოსტა"
              className={`mt-3 w-full py-2.5 px-3 bg-[#f0f5f9] border-0 outline-none rounded-lg focus:outline focus:outline-cyan-300 ${
                errors.email && "outlnine outline-pink-600"
              }  text-sm`}
            />
            {errors.email && (
              <p className="text-pink-600 py-2 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mt-5">
            <label htmlFor="password" className="px-1 text-sm text-gray-800">
              პაროლი
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={registerData.password}
              onChange={handleChange}
              placeholder="შეიყვანეთ პაროლი"
              className={`mt-3 w-full py-2.5 px-3 bg-[#f0f5f9] border-0 outline-none rounded-lg focus:outline focus:outline-cyan-300  ${
                errors.password && "outlnine outline-pink-600"
              } text-sm`}
            />
            {errors.password && (
              <p className="text-pink-600 py-2 text-sm">{errors.password}</p>
            )}
          </div>

          {/* <div className="flex items-center mt-3">
          <input type="checkbox" name="policy" id="policy" />
          <label htmlFor="policy" className="mx-3 cursor-pointer">
            I accept the Terms of Service
          </label>
        </div> */}
          <div>
            <button
              onClick={register}
              className="mt-5 py-3 flex justify-center gap-2 bg-[#496885] w-full text-white rounded-md hover:bg-[#a1bdd7] ">
              {!loading && <p>რეგისტრაცია</p>}
              {loading && <span className="loader"></span>}
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
