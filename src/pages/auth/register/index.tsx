import Navigation from "@/components/Navigation/Navigation";
import React, { Fragment, useContext, useState } from "react";
import { AuthContext } from "@/context/auth";
import Link from "next/link";
import RegsietrSucces from "../../../components/Modals/RegisterSuccess/RegisterSuccess";

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
    backlink: "sadasd",
  });

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
              რეგისტრაცია
              {loading && (
                <div role="status">
                  <svg
                    aria-hidden="false"
                    className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
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
