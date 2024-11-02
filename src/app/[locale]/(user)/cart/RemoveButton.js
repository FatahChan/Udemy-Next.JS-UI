"use client";

import useCartStore from "@/app/store/cartStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { toast } from "sonner";

const RemoveButton = ({ id }) => {
  const { fetchUsersCart } = useCartStore();

  const showToast = (message, isError = false) => {
    const toastId = toast("", {
      description: (
        <div className="flex flex-col">
          <div className="flex items-center gap-5">
            {isError ? (
              <TbAlertOctagonFilled className="text-6xl" />
            ) : (
              <IoMdCheckmarkCircle className="text-4xl" />
            )}
            <span className={`font-bold "text-black"`}>{message}</span>
          </div>
          <button
            className="mt-5 mx-14 bg-gray-800 text-white w-20 p-3"
            onClick={() => toast.dismiss(toastId)}
          >
            Dismiss
          </button>
        </div>
      ),
      style: {
        background: isError ? "#fcbca0" : "#acd2cc",
        fontSize: "16px",
        color: "#1c1c1c",
        padding: "12px",
        borderRadius: "0",
        border: isError ? "1px solid #f5c6cb" : "1px solid #ccc",
      },
    });
  };
  const router = useRouter();

  const handleRemove = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_LOCAL_API}/cart/${id}`, {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMmQ1YTIwMWY4MDZmOTJlZWJiMjUiLCJuYW1lIjoiS2FyaW0gQWJkZWxrYXJlZW0iLCJlbWFpbCI6IkthcmltQXltYW4zNjBAZ21haWwuY29tIiwicm9sZSI6WyJzdHVkZW50IiwiaW5zdHJ1Y3RvciJdLCJpYXQiOjE3MzAyMTgxNjYsImV4cCI6MTc2MTc3NTc2Nn0.F-HpJoI6sNENg8pkuWqZ0qlJ-y-WScNJcOGgQi98SFM`, // Replace with your actual token or handle it securely
        },
      });
      router.refresh();
      showToast("Course removed from cart successfully", false);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      fetchUsersCart();
    }
  };
  return (
    <>
      <button
        className="text-violet-700 hover:text-violet-900 text-sm"
        onClick={() => {
          handleRemove();
        }}
      >
        Remove
      </button>
    </>
  );
};

export default RemoveButton;
