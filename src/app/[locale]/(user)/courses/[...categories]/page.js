"use client";
import { BreadcrumbDemo } from "@/app/_components/Breadcrumb/Breadcrumb";
import FeaturedCourseSlider from "@/app/_components/FeaturedCourseSlider/FeaturedCourseSlider";
import FilterSlider from "@/app/_components/FilterSlider/FilterSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosInformationCircle } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import FilterAccordion from "@/app/_components/FilterAccordion/FilterAccordion";
import CourseLargeCard from "@/app/_components/CourseLargeCard/CourseLargeCard";
import TopicsSlider from "@/app/_components/TopicsSlider/TopicsSlider";
import { usePathname } from "next/navigation";
import InstructorSlider from "@/app/_components/InstructorSlider/InstructorSlider";
import { useState } from "react";

const Page = () => {
  const pathname = usePathname();
  const category = pathname.split("/")[3];
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <>
      <div className="hidden lg:block bg-white border border-b-gray-300 font-sans ">
        <BreadcrumbDemo category={category} />
      </div>
      <div className="mx-12 mt-12">
        <h1 className="font-bold text-3xl text-gray-800">
          <span className="capitalize">{category}</span> Courses
        </h1>
        <div className="mt-16">
          <h3 className="font-bold text-2xl text-gray-800 mb-2">
            Courses to get you started
          </h3>
          <p className="text-gray-600 mb-2">
            Explore courses from experienced, real-world experts.
          </p>
        </div>
      </div>
      <FilterSlider />
      {/* Featured Courses*/}
      <div className="mx-12 mt-12">
        <h3 className="font-bold text-2xl text-gray-800 mb-2">
          Featured Courses
        </h3>
        <p className="text-gray-600 mb-2">
          Many learners enjoyed this highly rated course for its engaging
          content.
        </p>
        {/* Course Card */}
        <div className="border border-gray-200 font-sans hover:cursor-pointer hover:bg-slate-50">
          <FeaturedCourseSlider />
        </div>
      </div>
      {/* Popular Topics*/}
      <div className="mx-12 mt-12 mb-12">
        <h3 className="font-bold text-2xl text-gray-800 mb-2">
          Popular Topics
        </h3>
        <TopicsSlider />
      </div>
      {/* Popular Instructor*/}
      <div className="mx-12 mt-12 mb-12">
        <h3 className="font-bold text-2xl text-gray-800 mb-2">
          Popular Instructor
        </h3>
        <p className="text-gray-600 mb-2">
          Many learners enjoyed this highly rated course for its engaging
          content.
        </p>
        <InstructorSlider />
      </div>
      {/* All Courses */}
      <div className="mx-12 mt-12 mb-12">
        <h3 className="font-bold text-2xl text-gray-800 mb-4">
          All <span className="capitalize">{category}</span> courses
        </h3>
        <div className="flex items-center border border-gray-200 text-gray-800 mb-6 p-4">
          <IoIosInformationCircle style={{ fontSize: "32px" }} />
          <p className="font-bold text-base text-gray-800 ml-6">
            Not sure? All courses have a 30-day money-back guarantee
          </p>
        </div>
        {/* Course Cards */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="flex items-center border border-black font-sans hover:cursor-pointer hover:bg-gray-200 p-4"
              onClick={toggleFilter}
            >
              <IoFilterOutline style={{ fontSize: "18px" }} />
              <span className="font-bold ml-2">Filter</span>
            </div>
            <div className="flex items-center border text-3xl border-black font-sans hover:cursor-pointer hover:bg-gray-200 ml-4 w-40 p-2">
              <div className="relative w-full">
                <select
                  id="sort-options"
                  name="sort"
                  required
                  className="block w-full px-2 pt-5 text-base focus:outline-none bg-transparent text-gray-800"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <label
                  htmlFor="sort-options"
                  className="absolute text-xs font-bold text-gray-700 transition-all left-3 top-0 peer-focus:text-xs peer-focus:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 hover:text-gray-600"
                >
                  Sort by
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-2 mb-12">
          <div
            className={`w-[25%] ${
              isFilterVisible ? "lg:block" : "lg:hidden"
            } hidden pt-4`}
          >
            <FilterAccordion />
          </div>
          <div className="w-full lg:ml-6">
            {Array.from({ length: 16 }, (_, i) => (
              <CourseLargeCard key={i} />
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Page;
