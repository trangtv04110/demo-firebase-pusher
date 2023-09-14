import Button from "@/components/Button";
import EmptyLayout from "@/layouts/EmptyLayout";
import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/helpers";
import { registerWithEmailAndPassword } from "@/firebase";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (name && email && password && passwordConfirm) {
      if (!validateEmail(email)) {
        toast.error("You have entered an invalid email address!");
        return;
      }

      if (password !== passwordConfirm) {
        toast.error("Confirm password not match");
        return;
      }

      if (password.length < 6) {
        toast.error("Password should be at least 6 characters");
        return;
      }

      setLoading(true);

      const res = await registerWithEmailAndPassword(name, email, password);

      if (res && res.errorCode) {
        if (res.errorCode === "auth/email-already-in-use") {
          toast.error("This email is used.");
        } else {
          toast.error(res.errorCode);
        }
      }

      setLoading(false);
    } else {
      toast.error("Please enter all information!");
    }
  };

  return (
    <EmptyLayout>
      <Head>
        <title>Register | Chatting</title>
      </Head>
      <div className="m-auto max-w-3xl bg-slate-300 rounded-md p-8 shadow-lg flex flex-col space-y-4">
        <div className="text-2xl text-center">Register</div>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Full Name
          </span>
          <input
            type="text"
            name="name"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Email
          </span>
          <input
            type="email"
            name="email"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password
          </span>
          <input
            type="password"
            name="password"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Confirm password
          </span>
          <input
            type="password"
            name="confirmPassword"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </label>

        <div className="pt-2 flex justify-end items-center space-x-4">
          {/* <Link href="/" className="text-slate-600">
            Cancel
          </Link> */}
          <Button
            onClick={handleRegister}
            isLoading={loading}
            disabled={loading}
          >
            Register
          </Button>
        </div>

        <div className="text-slate-600 flex space-x-2 justify-center">
          <span>Have an account?</span>
          <Link href="/login" className="underline">
            Login here
          </Link>
        </div>
      </div>
    </EmptyLayout>
  );
}
