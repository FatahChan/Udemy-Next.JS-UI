"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdModeEdit } from "react-icons/md";
import { toast } from "sonner";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { IoMdCheckmarkCircle } from "react-icons/io";
import axios from "axios";
import AccountSidenav from "../accountSidenav/AccountSidenav";
import useUserStore from "@/app/store/userStore";
import { Spinner } from "@material-tailwind/react";

const page = () => {
  const { user, setUser } = useUserStore();
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      await setUser();
      setPageIsLoading(false);
    };

    fetchUser();
  }, [setUser]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setEmailData((prevData) => ({ ...prevData, email: user.email }));
    }
  }, [user]);

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
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /*Password */
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handlePasswordChange = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    !passwordData && setError("Please Enter Data!");
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.put(
        `http://localhost:3001/user/change-password/6718e7e6d862afcf2b83f769`,
        passwordData
      );
      if (data.message === "success") {
        setSuccess("Password updated successfully!");
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        showToast("Your changes have been saved successfully");
      } else {
        setError(data.message);
      }
    } catch (error) {
      showToast(
        "Your changes have not been saved. Please address the issues.",
        true
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handlePasswordChangeUpdate = (event) => {
    const { name, value } = event.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  /*Email*/
  const [emailData, setEmailData] = useState({
    email: email,
    password: "",
  });
  const handleEmailChange = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { data } = await axios.post(
        `http://127.0.0.1:3001/user/change-email/6718e7e6d862afcf2b83f769`,
        emailData
      );
      if (data.message === "success") {
        showToast("Your changes have been saved successfully");
        setEmailData({ email: "", password: "" });
      }
    } catch (error) {
      console.log(error.response.data.message);
      console.error(error);
      setEmailError(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChangeUpdate = (event) => {
    const { name, value } = event.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center py-10 flex-1 mx-4 md:mx-8 lg:mx-20">
        <AccountSidenav />
        <div className="border border-gray-300 flex-1 max-w-[900px]">
          <div className="flex border-b border-gray-300 py-4">
            <div className="mx-auto max-w-7xl px-6 text-center">
              <h1 className="font-heading font-bold leading-tight tracking-normal text-lg sm:text-xl md:text-2xl max-w-3xl">
                Account
              </h1>
              <p className="font-text mt-2 leading-6">
                Edit your account settings and change your password here
              </p>
            </div>
          </div>
          {pageIsLoading ? (
            <div className="flex-1 flex justify-center items-center mt-4">
              <Spinner className="h-16 w-16 text-gray-900/50" />
            </div>
          ) : (
            <div className="flex-1">
              <div className="px-4 max-w-[700px] mx-auto my-6">
                <h2 className="font-semibold px-3 ">Email:</h2>
                <div className="w-full px-3 mt-2  min-w-[200px]">
                  <div className="relative flex border border-black">
                    <div className="w-full pl-3 pr-10 py-4 bg-transparent text-slate-600 text-sm">
                      <span className="text-black flex-1">
                        Your email address is <b>{email}</b>
                      </span>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            <Button
                              type="button"
                              className="h-full p-0  border-l border-black shadow-none text-slate-900 hover:bg-slate-100 w-12 flex justify-center items-center"
                            >
                              <MdModeEdit className="text-2xl" />
                            </Button>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] bg-white">
                          <DialogHeader>
                            <DialogTitle>Change your email</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={handleEmailChange}
                            className="grid gap-4 py-4"
                          >
                            <div className="items-center gap-4">
                              <input
                                id="email"
                                name="email"
                                value={emailData.email}
                                onChange={handleEmailChangeUpdate}
                                className="border border-black w-full p-2"
                                placeholder="Enter your email"
                              />
                            </div>
                            <div className="items-center gap-4">
                              <input
                                id="password"
                                type="password"
                                name="password"
                                value={emailData.password}
                                onChange={handleEmailChangeUpdate}
                                className="border border-black w-full p-2"
                                placeholder="Enter your password"
                              />
                            </div>
                            {emailError && (
                              <div className="p-3 bg-[#fcbca0] text-gray-800 flex items-center gap-4">
                                <TbAlertOctagonFilled className="text-3xl text-black" />
                                <p className="font-semibold">{emailError}</p>
                              </div>
                            )}
                            {success && (
                              <div className="text-green-500">{success}</div>
                            )}
                            <div className="mt-4">
                              <div className="mb-4">
                                <p>
                                  For your security, if you change your email
                                  address your saved credit card information
                                  will be deleted.
                                </p>
                              </div>
                              <div className="flex justify-end">
                                <Button
                                  type="submit"
                                  className="bg-black text-white font-bold hover:bg-gray-800 h-12 w-20"
                                  disabled={isLoading}
                                >
                                  {isLoading ? "Saving..." : "Save"}
                                </Button>
                              </div>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-300"></div>
              <div className="flex-1">
                <div className="px-4 max-w-[700px] mx-auto">
                  <div>
                    <h2 className="font-semibold px-3 mt-6">Password:</h2>
                    <div className="w-full px-3 mt-2 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="current-password"
                      ></label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-black py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="current-password"
                        type="password"
                        name="oldPassword"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChangeUpdate}
                        placeholder="Enter current password"
                      />
                    </div>

                    <div className="w-full px-3 mt-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="new-password"
                      ></label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-black py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="new-password"
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChangeUpdate}
                        placeholder="Enter new password"
                      />
                    </div>

                    <div className="w-full px-3 mt-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="confirm-password"
                      ></label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-black py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="confirm-password"
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChangeUpdate}
                        placeholder="Re-type new password"
                      />
                    </div>
                    {error && (
                      <div className="mx-3 p-3 bg-[#fcbca0] text-gray-800 flex items-center gap-4">
                        <TbAlertOctagonFilled className="text-3xl text-black" />
                        <p className="font-semibold">{error}</p>
                      </div>
                    )}

                    {/* Save button */}
                    <div className="flex items-center ml-3">
                      <button
                        className="bg-zinc-800 text-white hover:bg-zinc-700 p-3 font-bold my-6"
                        onClick={() => {
                          handlePasswordChange();
                        }}
                      >
                        Change password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
