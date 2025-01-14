"use client";
import useCourseStore from "@/app/store/courseStore";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const AddContentForm = ({
  addVideo,
  setAddVideo,
  id,
  videoAdded,
  setAddContent,
  courseId,
}) => {
  const [uploadVideoProgress, setUploadVideoProgress] = useState(0);
  const [videoLoading, setVideoLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState({ name: "", lastModified: "" });
  const [error, setError] = useState("");
  const cancelTokenSource = useRef(null); // Reference to store the cancel token
  const { fetchCourse } = useCourseStore();
  const params = useParams();

  const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const preset_key = process.env.NEXT_PUBLIC_CLOUD_PRESET;

  const handleVideoChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const MAX_VIDEO_SIZE = 4 * 1024 * 1024 * 1024;
    if (file.size > MAX_VIDEO_SIZE) {
      setError("File size exceeds the maximum limit of 4 GB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    setVideoLoading(true);
    setError(""); // Clear any previous error

    cancelTokenSource.current = axios.CancelToken.source();

    try {
      const date = new Date();
      const formattedDate = `${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;

      setFileData({ name: file.name, lastModified: formattedDate });

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
        formData,
        {
          cancelToken: cancelTokenSource.current.token, // Attach the cancel token
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadVideoProgress(percentCompleted);
          },
        }
      );
      setFormData({
        resourceTitle: data.original_filename,
        duration: data.duration,
        resource: data.secure_url,
      });
      setTimeout(() => {
        videoAdded();
        fetchCourse(params.id); // Update the course data in the store
      }, 1000);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading video. Please try again.");
    } finally {
      setVideoLoading(false);
    }
  };

  const handleCancelUpload = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("Upload canceled by the user.");
      setUploadVideoProgress(0);
      setFileData({ name: "", lastModified: "" });
      setAddVideo(false);
      setAddContent(null);
    }
  };

  useEffect(() => {
    const uploadLectureVideo = async () => {
      await axios.put(
        `${process.env.NEXT_PUBLIC_LOCAL_API}/lectures/${id}/course/${courseId}`,
        formData
      );
    };
    uploadLectureVideo();
  }, [formData, id, courseId]);

  return (
    <div className="relative">
      <div className="absolute right-14 -top-[28px] bg-white flex items-center gap-2 border border-black border-b-0 p-1  text-sm cursor-default">
        <p className="font-bold">
          {addVideo ? "Select content type" : "Add Video"}
        </p>
        <IoMdClose
          className="text-lg cursor-pointer"
          onClick={() => {
            setAddContent(null);
            setAddVideo(true);
          }}
        />
      </div>
      {addVideo ? (
        <div className="bg-white text-center gap-2 border border-black border-t-0 p-4 ml-20 mr-2 relative">
          <p>
            Select the main type of content. Files and links can be added as
            resources.
            <span className="text-[#5022c3] cursor-pointer underline underline-offset-4 hover:text-[#3b198f]">
              Learn about content types.
            </span>
          </p>
          <button
            className="relative flex flex-col items-center gap-2 bg-gray-50 border border-gray-300 mx-auto mt-5 w-20 font-medium hover:bg-gray-900 group overflow-hidden"
            onClick={() => setAddVideo(false)}
          >
            {/* Gray circle */}
            <FaCirclePlay className="text-3xl mt-2 text-gray-200 transition-all duration-300 transform group-hover:translate-y-[-100%] group-hover:opacity-0" />

            {/* White circle */}
            <FaCirclePlay className="text-3xl absolute top-full mt-2 text-white transition-all duration-300 transform group-hover:translate-y-[-230%]" />

            {/* Video label */}
            <span className="text-gray-800 text-xs w-full relative z-10 bg-gray-200 p-1 group-hover:bg-gray-950 group-hover:text-white">
              video
            </span>
          </button>
        </div>
      ) : uploadVideoProgress === 0 ? (
        <div className="bg-white gap-2 border border-black border-t-0 p-4 ml-20 mr-2">
          <div className="border-b">
            <p className="font-bold pb-3 border-b-2 w-fit border-black">
              Upload Video
            </p>
          </div>
          <div className="mt-4 flex w-full">
            <span className="p-3 text-gray-900 font-medium border border-black flex-1">
              No file selected
            </span>

            {/* File input */}
            <label className="bg-white border border-black p-3 cursor-pointer hover:bg-gray-100">
              <span className="font-bold text-black">Select Video</span>
              <input
                name="source"
                className="hidden"
                type="file"
                accept=".mp4, .mov, .avi"
                onChange={handleVideoChange}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            <span className="font-bold">Note</span>: All files should be at
            least 720p and less than 4.0 GB.
          </p>
        </div>
      ) : (
        <div className="bg-white gap-2 border border-black border-t-0 p-4 ml-20 mr-2">
          <div className="border-b">
            <p className="font-bold pb-3 border-b-2 w-fit border-black">
              Upload Video
            </p>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left">
                <th className="px-2 py-2 w-[40%]">Filename</th>
                <th className="px-1 py-2">Type</th>
                <th className="px-4 py-2 w-[30%]">Status</th>
                <th className="px-1 py-2">Date</th>
                <th className="px-1 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-2">{fileData.name}</td>
                <td className="px-1 py-2">Video</td>
                <td className="px-4 py-2 h-max flex items-center justify-center">
                  <div className="w-full bg-gray-200 h-2.5">
                    <div
                      className={`bg-purple-700 h-2.5`}
                      style={{ width: `${uploadVideoProgress}%` }}
                    ></div>
                  </div>
                  <span className="ml-2">{uploadVideoProgress}%</span>
                </td>
                <td className="px-1 py-2">{fileData.lastModified}</td>
                <td
                  className="px-1 py-2 font-medium text-violet-700 hover:text-violet-900 cursor-pointer text-right"
                  onClick={handleCancelUpload}
                >
                  x
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddContentForm;
