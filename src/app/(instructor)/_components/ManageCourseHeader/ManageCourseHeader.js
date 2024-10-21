import Link from "next/link";
import React from "react";
import { MdArrowBackIos } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const ManageCourseHeader = ({
  course,
  path,
  fetchCourse,
  onSave,
  onBasicSave,
  isModified,
  setIsModified,
  isBasicsModified,
  setIsBasicsModified,
  onMessagesSave,
  isMessagesModified,
  setIsMessagesModified,
}) => {
  const saveData = async (e) => {
    e.preventDefault();
    if (isModified) {
      try {
        await onSave();
        await fetchCourse(course._id); // Refresh course data after saving
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
    setIsModified(false);
  };

  const BasicSave = async (e) => {
    e.preventDefault();
    if (isBasicsModified) {
      try {
        await onBasicSave();
        await fetchCourse(course._id); // Refresh course data after saving
      } catch (error) {
        console.error("Error saving basics:", error);
      }
    }
    setIsBasicsModified(false);
  };

  const messagesSave = async (e) => {
    e.preventDefault();
    if (isMessagesModified) {
      try {
        await onMessagesSave();
        await fetchCourse(course._id); // Refresh course data after saving
      } catch (error) {
        console.error("Error saving messages:", error);
      }
    }
    setIsMessagesModified(false);
  };

  return (
    <div className="bg-[#2d2f31] text-white shadow-md sticky top-0 py-4 px-5 z-10">
      <div className="flex gap-5 items-center">
        <div>
          <Link href="/instructor/course" className="flex items-center gap-2">
            <MdArrowBackIos />
            <span className="font-medium hidden lg:block">Back to courses</span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-1 md:gap-0 md:items-center flex-1">
          <div className="flex gap-3 items-center flex-wrap">
            <h1 className="font-bold md:text-lg">
              {course?.title || "Loading..."}
            </h1>
            <span className="bg-[#6a6f73] px-2 py-[1px] md:px-2 md:py-1 text-[9px] md:text-xs text-white font-bold text-center">
              DRAFT
            </span>
            <span className="text-xs md:text-base font-medium">
              {Math.round(course?.duration || "Loading...")}min of video content
              uploaded
            </span>
          </div>
          <div className="flex items-center gap-4">
            {path === "goals" && (
              <form onSubmit={saveData}>
                <button
                  type="submit"
                  className={`text-gray-900 font-medium px-6 py-1 ${
                    isModified
                      ? "bg-gray-300"
                      : "cursor-not-allowed bg-[#969798]"
                  }`}
                  disabled={!isModified}
                >
                  Save
                </button>
              </form>
            )}
            {path === "basics" && (
              <form onSubmit={BasicSave}>
                <button
                  type="submit"
                  className={`text-gray-900 font-medium px-6 py-1 ${
                    isBasicsModified
                      ? "bg-gray-300"
                      : "cursor-not-allowed bg-[#969798]"
                  }`}
                  disabled={!isBasicsModified}
                >
                  Save
                </button>
              </form>
            )}
            {path === "communications" && (
              <form onSubmit={messagesSave}>
                <button
                  type="submit"
                  className={`text-gray-900 font-medium px-6 py-1 ${
                    isMessagesModified
                      ? "bg-gray-300"
                      : "cursor-not-allowed bg-[#969798]"
                  }`}
                  disabled={!isMessagesModified}
                >
                  Save
                </button>
              </form>
            )}
            <IoMdSettings className="text-lg md:text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCourseHeader;
