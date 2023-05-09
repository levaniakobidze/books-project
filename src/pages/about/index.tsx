import Footer from "@/components/Footer/Footer";
import Navigation from "@/components/Navigation/Navigation";
import React, { Fragment } from "react";

function index() {
  return (
    <Fragment>
      <Navigation />
      <section className="min-h-screen pb-10 bg-gradient-to-r to-tl from-[#c7d8e8] to-[#fde6e7] dark:bg-gray-900">
        <div className="gap-16 items-left py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              კეთილი იყოს შენი მობრძანდება English Hub-ზე!
            </h2>
            <p className="mb-4 text-gray-700 text-[15px] ">
              ისწავლე ინგლისური ენა დისტანციურად და გაიუმჯობესე შენი ცოდნა ჩვენ
              მიერ შემოთავაზებული მაღალი ხარისხის კურსებისა თუ რესურსების
              დახმარებით. ყველაფერი, რასაც აქ ნახავ, სპეციალურად შენთვის არის
              შექმნილი ლევანისა და გიორგის მიერ. როდესაც გაეცნობი და აითვისებ
              ჩვენ მიერ შემოთავაზებულ რესურსებს, დარწმუნდები, რომ საოცარი
              თავდაჯერება შეგემატება.
            </p>
            <p className=" text-gray-700 text-[15px]">
              ხოდა, სწრაფად გაიარე რეგისტრაცია, რას უცდი?
            </p>
            <h3 className="mt-4 text-[16px] text-md tracking-tight font-extrabold text-gray-900 dark:text-white">
              რას ნახავ English Hub-ზე?
            </h3>
            <p className=" text-gray-700 text-[15px]">
              ყველაფერი ერთ პლატფორმაზე! რესურსები შექმნილია ქვემოთ ჩამოთვლილი
              უნარ-ჩვევების გასაუმჯობესებლად:
            </p>
            <ul className="list-disc pl-10 mt-4 text-[15px]">
              <li className="list-style">მოსმენა</li>
              <li className="list-style">კითხვა</li>
              <li className="list-style">წერა</li>
              <li className="list-style">საუბარი</li>
            </ul>
            <p className="text-gray-700 text-[15px] mt-4">
              English Hub აერთიანებს ინგლისური ენის რესურსებს საწყისი დონიდან,
              მის პრაქტიკულ გამოყენებამდე. ჩვენ, ავტორები, უკვე 5 წელზე მეტია
              თქვენთვის ვქმნით სხვადასხვა უფასო თუ ფასიან რესურსს. აღნიშნული
              რესურსები, როგორც შემსწავლელები აღნიშნავენ, არის უპრეცედენტო და
              ეფექტური თვითმასწავლებელი, რომელიც მარტივად შეგასწავლის ინგლისურ
              ენას და დაგეხმარება ცხოვრების ხარისხის გაუმჯობესებაში, იმ
              გლობალიზებულ სამყაროში, რომელშიც ინგლისურის გარეშე, ფაქტობრივად,
              შეუძლებელია წინსვლა. ჩვენი კურსები და სახელმძღვანელოები გათვლილია
              სხვადასხვა ასაკისა თუ ინტერესის მქონე ადამიანებზე.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 items-left h-[100%]">
            <img
              className="w-full rounded-lg  sticky top-5"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg  sticky top-5 "
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>

          <p className="text-gray-700 text-[15px] mt-4 ">
            <span className="text-[16px] text-md tracking-tight font-extrabold text-gray-900 dark:text-white">
              ვინ ვართ ჩვენ?
            </span>
            <br />
            თუ გსურს, იცოდე მეტი ჩვენი საქმიანობის შესახებ, მაშინ ეწვიე ჩვენს
            სასწავლო გვერდებს:
            <div className="flex gap-3 mt-3">
              <a href="https://www.facebook.com/EnglishwithLevan">
                {" "}
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-[30px]">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>{" "}
              </a>
              <a href="https://www.facebook.com/EnglishWithGeorge">
                {" "}
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-[30px] ">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>{" "}
              </a>
            </div>
          </p>
          {/* <div className="flex justify-end bg-red-200 w-full">
            <p className="text-gray-700 ">
              English Hub აერთიანებს ინგლისური ენის რესურსებს საწყისი დონიდან,
              მის პრაქტიკულ გამოყენებამდე. ჩვენ, ავტორები, უკვე 5 წელზე მეტია
              თქვენთვის ვქმნით სხვადასხვა უფასო თუ ფასიან რესურსს. აღნიშნული
              რესურსები, როგორც შემსწავლელები აღნიშნავენ, არის უპრეცედენტო და
              ეფექტური თვითმასწავლებელი, რომელიც მარტივად შეგასწავლის ინგლისურ
              ენას და დაგეხმარება ცხოვრების ხარისხის გაუმჯობესებაში, იმ
              გლობალიზებულ სამყაროში, რომელშიც ინგლისურის გარეშე, ფაქტობრივად,
              შეუძლებელია წინსვლა. ჩვენი კურსები და სახელმძღვანელოები გათვლილია
              სხვადასხვა ასაკისა თუ ინტერესის მქონე ადამიანებზე.
            </p>
          </div> */}
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}

export default index;
