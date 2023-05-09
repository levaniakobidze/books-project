import Footer from "@/components/Footer/Footer";
import Navigation from "@/components/Navigation/Navigation";
import { Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

const Instruction = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      title: "What is Tailwind CSS?",
      answer:
        "Tailwind CSS is a utility-first CSS framework that helps you quickly build custom designs without having to write any CSS code yourself. It provides a set of pre-defined CSS classNamees that you can use to style your HTML elements.",
    },
    {
      title: "How do I install Tailwind CSS?",
      answer:
        "You can install Tailwind CSS using npm or yarn. First, create a new project and navigate to the project directory. Then, run the following command: `npm install tailwindcss`. Once the installation is complete, you can create a `tailwind.config.js` file in your project root directory and configure the framework to your liking. Finally, you need to add the Tailwind CSS styles to your HTML or JavaScript file.",
    },
    {
      title: "What are some advantages of using Tailwind CSS?",
      answer:
        "Some advantages of using Tailwind CSS are: it saves time by providing pre-defined CSS classNamees, it promotes consistency in your design, it makes it easier to maintain your CSS code, it makes it easier to make changes to your design, and it allows you to focus on the design instead of the CSS code.",
    },
    {
      title: "Can I customize the colors and styles in Tailwind CSS?",
      answer:
        "Yes, you can customize the colors and styles in Tailwind CSS by modifying the configuration file (`tailwind.config.js`). You can change the colors, fonts, sizes, and other properties of the pre-defined CSS classNamees, or you can create your own custom classNamees. Tailwind CSS also provides plugins that allow you to extend the framework with additional functionality.",
    },
    {
      title: "Is Tailwind CSS mobile-friendly?",
      answer:
        "Yes, Tailwind CSS is mobile-friendly by default. It provides responsive utility classNamees that allow you to create layouts that adapt to different screen sizes. You can also create custom responsive classNamees that apply different styles based on the screen size.",
    },
  ];

  const toggleQuestion = (index: any) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <Fragment>
      <Navigation />
      <section className="relative py-20 overflow-hidden bg-gray-50">
        {/* <img className="absolute top-0 left-0 mt-44" src="saturn-assets/images/faq/light-blue-left.png" alt=""> */}
        {/* <img className="absolute top-0 right-0 mt-10" src="saturn-assets/images/faq/star-right.svg" alt=""> */}
        <div className="relative container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 md:mb-24">
              <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-orange-900 bg-orange-50 rounded-full">
                ხშირად დასმული კითხვები
              </span>
              <h1 className="font-heading mt-5 text-3xl xs:text-3xl md:text-4xl font-bold text-gray-400">
                <span className="font-serif ">ხშირად დასმული კითხვები</span>
              </h1>
            </div>
            <div className="p-10 bg-white rounded-4xl shadow-lg ">
              {questions.map((question, index) => {
                return (
                  <button
                    onClick={() => toggleQuestion(index)}
                    key={index}
                    className=" mt-10 flex group w-full items-start justify-between text-left">
                    <div className=" pr-5">
                      <h3
                        className={`text-sm md:text-xl font-semibold hover:text-blue-400 transition-all  ${
                          activeIndex === index ? "text-blue-400" : "text-black"
                        }`}>
                        {question.title}
                      </h3>
                      <div
                        className={`${
                          activeIndex === index
                            ? "max-h-screen transition-max-height duration-400 ease-out p-10"
                            : "max-h-0 transition-max-height duration-300 ease-in"
                        } mt-3  text-sm md:text-lg  bg-blue-400 duration-300   text-white overflow-hidden`}>
                        <span
                          className={`${
                            activeIndex === index ? "opacity-100" : "opacity-0"
                          } transition-all`}>
                          {question.answer}
                        </span>
                      </div>
                    </div>
                    <div className="pt-1">
                      {activeIndex === index ? (
                        <span>
                          <svg
                            width="17"
                            height="3"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M15.4619 0.045166H1.46194C1.19673 0.045166 0.942374 0.150523 0.754838 0.338059C0.567302 0.525596 0.461945 0.77995 0.461945 1.04517C0.461945 1.31038 0.567302 1.56474 0.754838 1.75227C0.942374 1.93981 1.19673 2.04517 1.46194 2.04517H15.4619C15.7272 2.04517 15.9815 1.93981 16.1691 1.75227C16.3566 1.56474 16.4619 1.31038 16.4619 1.04517C16.4619 0.77995 16.3566 0.525596 16.1691 0.338059C15.9815 0.150523 15.7272 0.045166 15.4619 0.045166Z"
                              fill="#0ab9d8"></path>
                          </svg>
                        </span>
                      ) : (
                        <span>
                          <svg
                            width="17"
                            height="16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M15.4619 7H9.46194V1C9.46194 0.734784 9.35659 0.48043 9.16905 0.292893C8.98151 0.105357 8.72716 0 8.46194 0C8.19673 0 7.94237 0.105357 7.75484 0.292893C7.5673 0.48043 7.46194 0.734784 7.46194 1V7H1.46194C1.19673 7 0.942374 7.10536 0.754838 7.29289C0.567302 7.48043 0.461945 7.73478 0.461945 8C0.461945 8.26522 0.567302 8.51957 0.754838 8.70711C0.942374 8.89464 1.19673 9 1.46194 9H7.46194V15C7.46194 15.2652 7.5673 15.5196 7.75484 15.7071C7.94237 15.8946 8.19673 16 8.46194 16C8.72716 16 8.98151 15.8946 9.16905 15.7071C9.35659 15.5196 9.46194 15.2652 9.46194 15V9H15.4619C15.7272 9 15.9815 8.89464 16.1691 8.70711C16.3566 8.51957 16.4619 8.26522 16.4619 8C16.4619 7.73478 16.3566 7.48043 16.1691 7.29289C15.9815 7.10536 15.7272 7 15.4619 7Z"
                              fill="black"></path>
                          </svg>
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-[100px] max-w-6xl px-10 mx-auto">
          <h1 className="font-heading text-3xl text-center  xs:text-6xl md:text-3xl font-bold text-gray-400">
            <span className="font-serif ">წესები და პირობები</span>
          </h1>
          <p className="mb-4 mt-10 text-gray-700 text-[15px] ">
            ისწავლე ინგლისური ენა დისტანციურად და გაიუმჯობესე შენი ცოდნა ჩვენ
            მიერ შემოთავაზებული მაღალი ხარისხის კურსებისა თუ რესურსების
            დახმარებით. ყველაფერი, რასაც აქ ნახავ, სპეციალურად შენთვის არის
            შექმნილი ლევანისა და გიორგის მიერ. როდესაც გაეცნობი და აითვისებ ჩვენ
            მიერ შემოთავაზებულ რესურსებს, დარწმუნდები, რომ საოცარი თავდაჯერება
            შეგემატება.
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
            English Hub აერთიანებს ინგლისური ენის რესურსებს საწყისი დონიდან, მის
            პრაქტიკულ გამოყენებამდე. ჩვენ, ავტორები, უკვე 5 წელზე მეტია
            თქვენთვის ვქმნით სხვადასხვა უფასო თუ ფასიან რესურსს. აღნიშნული
            რესურსები, როგორც შემსწავლელები აღნიშნავენ, არის უპრეცედენტო და
            ეფექტური თვითმასწავლებელი, რომელიც მარტივად შეგასწავლის ინგლისურ
            ენას და დაგეხმარება ცხოვრების ხარისხის გაუმჯობესებაში, იმ
            გლობალიზებულ სამყაროში, რომელშიც ინგლისურის გარეშე, ფაქტობრივად,
            შეუძლებელია წინსვლა. ჩვენი კურსები და სახელმძღვანელოები გათვლილია
            სხვადასხვა ასაკისა თუ ინტერესის მქონე ადამიანებზე.
          </p>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Instruction;
