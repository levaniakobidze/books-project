import Navigation from "@/components/Navigation/Navigation";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Password_recovered from "../components/Modals/Password_recovered/Password_recovered";
function Login() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    new_password: "",
    confirm_new_password: "",
  });

  const onSubmit = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = urlParams.get("hash");
    const url =
      "https://books-project-back-production.up.railway.app/api/user/password-recovery";
    try {
      setLoading(true);
      await axios.post(url, {
        password: data.new_password,
        hash: hash,
      });
      setShowModal(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Navigation />
      <Password_recovered showModal={showModal} setShowModal={setShowModal} />
      <section className="px-3 py-10 w-full h-screen flex flex-col    bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7]">
        <div className=" text-center my-5 ">
          <h1 className="text-gray-500 text-4xl font-bold ">
            შეიყვანეთ ახალი პაროლი
          </h1>
          {/* <p className="text-black mt-3 ">შედი შენს ანგარიშზე</p> */}
        </div>
        <div className="mt-3 px-5 py-5 w-full sm:mx-auto sm:w-full sm:max-w-lg border rounded-3xl bg-white ">
          {/* <h1 className="text-center mt-5 font-bold text-xl">
            შეავსე ველები და შედი შენს ანგარიშზე
          </h1> */}

          <div className="mt-5">
            <label htmlFor="password" className="px-1 text-sm text-gray-800">
              ახალი პაროლი
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={data.new_password}
              onChange={(e) =>
                setData({ ...data, new_password: e.target.value })
              }
              placeholder="ახალი პაროლი"
              className="mt-3 w-full py-2.5 px-3 bg-[#f0f5f9] border-0 outline-none rounded-lg focus:outline focus:outline-cyan-300  text-sm"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="password" className="px-1 text-sm text-gray-800">
              გაიმეორეთ პაროლი
            </label>
            <input
              type="password"
              name="repeat_password"
              id="repeat_password"
              value={data.confirm_new_password}
              onChange={(e) =>
                setData({ ...data, confirm_new_password: e.target.value })
              }
              placeholder="გაიმეორეთ პაროლი"
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
            <button
              onClick={onSubmit}
              className="mt-5 py-3 bg-[#496885] w-full text-white rounded-md hover:bg-[#a1bdd7] ">
              {!loading && <p>შენახვა</p>}
              {loading && <span className="loader"></span>}
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Login;
