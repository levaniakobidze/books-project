import Navigation from "@/components/Navigation/Navigation";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Email_sent from "@/components/Modals/Email_sent/Email_sent";

function Forgot_password() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const host = window.location.host + "/new_password";
    let url =
      "https://books-project-back-production.up.railway.app/api/user/password-sendlink";
    try {
      setLoading(true);
      await axios.post(url, { email, redirectLink: host });
      setShowModal(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Navigation />
      <Email_sent showModal={showModal} setShowModal={setShowModal} />
      <section className="px-3 py-10 w-full h-screen flex flex-col    bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7]">
        <div className=" text-center my-5 ">
          <h1 className="text-gray-500 text-4xl font-bold ">
            შეიყვანეთ ელ.ფოსტის მისამართი
          </h1>
          {/* <p className="text-black mt-3 ">შედი შენს ანგარიშზე</p> */}
        </div>
        <div className="mt-3 px-5 py-5 w-full sm:mx-auto sm:w-full sm:max-w-lg border rounded-3xl bg-white ">
          {/* <h1 className="text-center mt-5 font-bold text-xl">
            შეავსე ველები და შედი შენს ანგარიშზე
          </h1> */}
          <div className="mt-10 ">
            <label htmlFor="email" className="px-1 text-sm text-gray-800">
              ელ.ფოსტა
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="შეიყვანეთ ელ.ფოსტა"
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
              disabled={loading}
              onClick={onSubmit}
              className="mt-5 py-3 bg-[#496885] w-full text-white rounded-md hover:bg-[#a1bdd7] ">
              {!loading && <p>გაგზავნა</p>}
              {loading && <span className="loader"></span>}
            </button>
          </div>
          <div className="flex items-center justify-end">
            <Link
              href={"/auth/register"}
              className="flex justify-end text-[13px] mt-3 text-[#496885] hover:text-gray-500 cursor-pointer">
              რეგისტრაცია
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Forgot_password;
