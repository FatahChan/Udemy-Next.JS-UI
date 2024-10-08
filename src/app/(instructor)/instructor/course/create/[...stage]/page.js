"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { LuMonitorPlay } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";


const Page = () => {
  const path = usePathname();
  const router = useRouter();
  const page = parseInt(path.split("/")[4]);
  const progress = (page - 1) * 0.25 + 0.25;
  const [steps, setStep] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "I’m very busy right now (0-2 hours)",
    "I’ll work on this on the side (2-4 hours)",
    "I have lots of flexibility (5+ hours)",
    "I haven’t yet decided if I have time",
  ];

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= 60) {
      setTitle(newTitle);
    }
  };

  const handleContinue = () => {
    if (page < 4) {
      router.push(`/instructor/course/create/${page + 1}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="shadow-md">
        <div className="px-8 flex h-16">
          <Image
            src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
            width={75}
            height={28}
            alt="Udemy Logo"
          />
          <div className="mx-9 border-l border-gray-300 flex flex-1 items-center px-9">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-xl text-gray-700">{`Step ${page} of 4`}</span>
            </div>
          </div>
          <button className="text-[#5022c3] font-semibold">Exit</button>
        </div>
        <div className="bg-gray-300 h-1">
          <div
            className="h-full bg-[#5022c3] origin-[left] transition-transform duration-150 ease-in-out"
            style={{ transform: `scaleX(${progress})` }}
          ></div>
        </div>
      </div>
      <div className="container flex flex-col flex-1 mx-auto py-20 px-8">
        <div className="flex justify-center">
          {/* First  Step */}
          {page == 1 && (
            <div>
              <h1 className="text-3xl font-bold text-gray-700 font-serif">
                First, let&apos;s find out what type of course you&apos;re
                making.
              </h1>
              <form className="mt-20">
                <fieldset className="mx-auto">
                  <legend className="flex items-center pb-1 absolute h-[1px] w-[1px] overflow-hidden">
                    Type of course
                  </legend>
                  <div className="flex justify-center">
                    {/* First Option: Course */}
                    <label
                      className={`cursor-pointer relative w-56 h-72 min-h-72 border p-4 hover:bg-slate-50  ${
                        steps === 1
                          ? "border-black border-4"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="course-type"
                        value="1"
                        checked={steps === 1}
                        onChange={() => setStep(1)}
                        className="absolute h-[1px] w-[1px] overflow-hidden"
                      />
                      <span className="flex flex-col items-center mt-6 text-center">
                        <LuMonitorPlay className="text-3xl" />
                        <span className="block mt-4 font-bold text-gray-700">
                          Course
                        </span>
                        <span className="block mt-2 text-gray-800 text-sm">
                          Create rich learning experiences with the help of
                          video lectures, quizzes, coding exercises, etc.
                        </span>
                      </span>
                    </label>

                    {/* Second Option: Practice Test */}
                    <label
                      className={`cursor-pointer ml-4 relative w-56 h-72 min-h-72 border p-4 hover:bg-slate-50 text-center ${
                        steps === 2
                          ? "border-black border-4"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="course-type"
                        value="2"
                        checked={steps === 2}
                        onChange={() => setStep(2)}
                        className="absolute h-[1px] w-[1px] overflow-hidden"
                      />
                      <span className="flex flex-col items-center text-center mt-6">
                        <CiViewList className="text-3xl font-bold" />
                        <span className="block mt-4 font-bold text-gray-700">
                          Practice Test
                        </span>
                        <span className="block mt-2 text-gray-800 text-sm">
                          Help students prepare for certification exams by
                          providing practice questions.
                        </span>
                      </span>
                    </label>
                  </div>
                </fieldset>
              </form>
            </div>
          )}
          {/* Second Step */}
          {page === 2 && (
            <div>
              <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold text-gray-700 font-serif">
                  How about a working title?
                </h1>
                <p className="text-base text-gray-700 mt-4">
                  It&apos;s ok if you can&apos;t think of a good title now. You
                  can change it later.
                </p>
              </div>
              <div className="relative px-3 mt-20 w-[600px]">
                <input
                  className="appearance-none block w-full text-gray-700 border border-black py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-title"
                  type="text"
                  placeholder="e.g. Learn Photoshop CS6 from Scratch"
                  value={title}
                  onChange={handleTitleChange}
                />
                <span className="absolute right-4 bottom-3 pr-4 text-gray-600">{`${
                  60 - title.length
                }`}</span>
              </div>
            </div>
          )}
          {/* Third Step */}
          {page === 3 && (
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold text-gray-700 font-serif">
                  What category best fits the knowledge you&apos;ll share?
                </h1>
                <p className="text-base text-gray-700 mt-4">
                  If you&apos;re not sure about the right category, you can
                  change it later.
                </p>
              </div>
              <div className="px-2 mt-20 w-[600px] border border-black">
                <select
                  id="sort-options"
                  name="category"
                  required
                  className="block  w-full  py-3 text-base focus:outline-none bg-transparent text-gray-700 "
                >
                  <option value="">Choose a Category</option>
                </select>
              </div>
            </div>
          )}
          {/* Fourth Step */}
          {page === 4 && (
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold text-gray-700 font-serif">
                  How much time can you spend creating your course per week?
                </h1>
                <p className="text-base text-gray-700 mt-4">
                  There&apos;s no wrong answer. We can help you achieve your
                  goals even if you don&apos;t have much time.
                </p>
              </div>
              <div className="flex flex-col space-y-4 mt-20 w-[60%]">
                {options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-3 border border-black cursor-pointer transition-colors `}
                  >
                    <input
                      type="radio"
                      name="time-commitment"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                      className="mr-4 cursor-pointer"
                    />
                    <span className="text-gray-900 font-bold">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="shadow-md sticky bottom-0 z-10 bg-white">
        <div className="flex justify-between w-full p-4 shadow-sm">
          {page > 1 && (
            <button
              className="bg-white text-gray-700 border border-black font-bold p-4 text-center hover:bg-gray-200"
              onClick={() =>
                router.push(`/instructor/course/create/${page - 1}`)
              }
            >
              Previous
            </button>
          )}
          <button
            className={`${
              steps ? "bg-[#2d2f31]" : "bg-gray-400"
            } text-white font-bold p-4 text-center`}
            disabled={!steps}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;