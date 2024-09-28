import Image from "next/image";
import React from "react";

export default function Top_Categories() {
  return (
    <>
      <div className="px-10 mx-auto m-20">
        <h1 className="font-bold tracking-normal text-4xl mb-10">
          Top Categories
        </h1>
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              href: "https://www.udemy.com/courses/design/",
              src: "https://s.udemycdn.com/home/top-categories/lohp-category-design-v2.jpg",
              alt: "Design",
            },
            {
              href: "https://www.udemy.com/courses/development/",
              src: "https://s.udemycdn.com/home/top-categories/lohp-category-development-v2.jpg",
              alt: "Development",
            },
            {
              href: "https://www.udemy.com/courses/marketing/",
              src: "https://s.udemycdn.com/home/top-categories/lohp-category-marketing-v2.jpg",
              alt: "Marketing",
            },
            {
              href: "https://www.udemy.com/courses/it-and-software/",
              src: "https://s.udemycdn.com/home/top-categories/lohp-category-it-and-software-v2.jpg",
              alt: "IT And Software",
            },
            {
              href: "https://www.udemy.com/courses/personal-development/",
              src: "https://s.udemycdn.com/home/top-categories/lohp-category-personal-development-v2.jpg",
              alt: "Personal Development",
            },
            {
              href: "https://www.udemy.com/courses/business/",
              src: "https://s.udemycdn.com/home/top-categories/lohp-category-business-v2.jpg",
              alt: "Business",
            },
            {
              href: "https://www.udemy.com/courses/photograohy/",
              src: "https://s.udemycdn.com/home/top-categories/lohp-category-photography-v2.jpg",
              alt: "Photography",
            },
            {
              href: "https://www.udemy.com/courses/music/",
              src: "https://s.udemycdn.com/home/top-categories/lohp-category-music-v2.jpg",
              alt: "Music",
            },
          ].map((category, index) => (
            <div className="relative mb-6" key={index}>
              <a href={category.href}>
                <div className="relative w-[168px] h-[168px] lg:w-[300px] lg:h-[300px] overflow-hidden">
                  <Image
                    className="transition duration-200 transform hover:scale-105"
                    src={category.src}
                    alt={category.alt}
                    width={300}
                    height={300}
                  />
                </div>
              </a>
              <div className="mt-3 text-left font-bold">
                <span>{category.alt}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-wrap md:hidden flex">
          {[
            "Design",
            "Development",
            "Marketing",
            "Personal Development",
            "Business",
            "Photography",
            "Music",
          ].map((category, index) => (
            <a href="https://www.example.com" className="mr-3 mb-3" key={index}>
              <button className="hover:bg-gray-200 border-black border-2 rounded-full border-solid h-16">
                <span className="text-black font-bold px-4">{category}</span>
              </button>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
