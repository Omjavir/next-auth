"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast, { Toaster }  from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      // alert("Login");
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login Successfll");
      console.log("Login success", response.data);
      router.push("/");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error("Something went wrong, Try again later!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="m-2 text-2xl font-semibold">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg bg-blue-600 text-white mb-4 focus:outline-none focus:border-gray-600"
      >
        Login
      </button>
      <Link href="/register">
        New user ? <b>Register</b> here
      </Link>
      <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  );
}
