import React, { useState, useEffect } from "react";
import Link from "next/link";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { loginUser } from "@/services/userService";
import { useUser } from "@/contexts/userContext";
import { User, LoginInterface } from "@/interfaces/userInterface";
import {
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  InternalServerException,
  UnexpectedException,
} from "@/utils/exceptions";
import { getTokenContent } from "@/utils/authUtils";

const Signin: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { setUser } = useUser();
  const [email, setEmail] = useState("dennissimmons1985@gmail.com");
  const [password, setPassword] = useState("dennis");

  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("ead-token");
  }, []);

  const handleSignIn = async () => {
    if (email === "") {
      toast.warning("Please enter your email.");
      return;
    }
    if (password === "") {
      toast.warning("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(email, password);

      localStorage.setItem("ead-token", response.token);

      setUser(response.user);

      // Redirect to the dashboard or another page
      toast.success("Sign in successful. Please wait...");
      if (response.user.type === "ADMIN") {
        router.push("/admin/products");
      } else {
        router.push("/products");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof UnauthorizedException) {
        toast.error("Invalid email or password");
      } else if (error instanceof NotFoundException) {
        toast.error("User not found");
      } else if (error instanceof BadRequestException) {
        toast.error("Enter valid email and password");
      } else if (error instanceof InternalServerException) {
        toast.error("Server error occured");
      } else if (error instanceof UnexpectedException) {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-10 bg-blur-3xl bg-gradient-to-r from-blue-500 to-blue-700
        flex items-center justify-center text-black"
      style={{ backgroundImage: `url('/img/banners/back.jpg')` }}
    >
      <div
        className="absolute w-screen h-screen bg-white bg-opacity-20 backdrop-blur-md"
        style={{ zIndex: 1 }}
      ></div>
      <div
        className="bg-white bg-opacity-50 rounded-xl p-4 sm:px-10 border border-gray-200 border-opacity-70 w-80 sm:w-96 h-[400px] flex flex-col items-center justify-center space-y-2"
        style={{ zIndex: 2 }}
      >
        <img
          src="/img/logo.jpg"
          alt="logo"
          className="w-20 h-20 mx-auto rounded-full"
        />
        <h1 className="text-lg font-large text-center text-black opacity-90 font-semibold">
          Administration Portal
        </h1>
        <div className="w-full">
          <TextBox
            caption="Email"
            value={email}
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e)}
          />
          <TextBox
            caption="Password"
            value={password}
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e)}
            componentClassName={"mt-4"}
          />
          <div className="flex flex-col items-center justify-center mt-4">
            <Button caption="SIGN IN" onClick={handleSignIn} />
            <Link href="/auth/forgotpassword">
              <div className="mb-4 mt-2 text-black text-sm hover:text-light-green duration-300 transition-all ease-in-out cursor-pointer">
                Forgot Password?
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Toast />
      <Spinner isVisible={loading} />
    </div>
  );
};

export default Signin;
