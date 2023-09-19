"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out Successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Something went wrong, Try again later!");
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data);
    toast.success(`Welcome ${data.username}`);
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="font-semibold text-xl">Profile page</h2>
      <h2 className="p-1 rounded bg-gray-300">
        {data === "nothing" ? (
          "Undefined"
        ) : (
          <div>
            <h2>
              <b className="font-semibold text-lg">id :</b> {data._id}
            </h2>
            <h2>
              <b className="font-semibold text-lg">username :</b>{" "}
              {data.username}
            </h2>
            <h2>
              <b className="font-semibold text-lg">Email :</b> {data.email}
            </h2>
          </div>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  );
}
