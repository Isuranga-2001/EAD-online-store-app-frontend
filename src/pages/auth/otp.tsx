import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  InternalServerException,
  UnexpectedException,
} from "@/utils/exceptions";
import { useGeneralContext } from "@/contexts/generalContext";

const OTPPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const router = useRouter();

  const { showAlertBox, hideAlertBox } = useGeneralContext();

  useEffect(() => {}, []);

  const handlePasswordReset = async () => {
    if (password === "" || password2 === "") {
      toast.warning("Please enter your new password.");
      return;
    }

    if (password !== password2) {
      toast.warning("Passwords do not match.");
      return;
    }

    if (password.length < 8 || password.length > 15) {
      toast.warning("Password must be between 8 and 15 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.warning("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.warning("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      toast.warning("Password must contain at least one number.");
      return;
    }

    // validate OTP for 6 character length and all should not be empty
    for (let i = 0; i < otp.length; i++) {
      if (otp[i] === "" || isNaN(parseInt(otp[i]))) {
        toast.warning("Please enter a valid OTP.");
        return;
      }
    }

    try {
      setLoading(true);
      const email = router.query.email as string;
      // await verifyForgotPassword(email, otp.join(""), password);
      toast.success("Password reset successful.");
      showAlertBox({
        isVisible: true,
        title: "Success",
        body: "Password reset successful. You can now sign in with your new password.",
        buttonStructure: 0,
        button1OnClick: () => {
          hideAlertBox();
          router.push("/auth/signin");
        },
      });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        toast.error("Invalid OTP.");
      } else if (error instanceof NotFoundException) {
        toast.error("User not found.");
      } else if (error instanceof BadRequestException) {
        toast.error("Invalid request. Please check your input.");
      } else if (error instanceof InternalServerException) {
        toast.error("Internal server error. Please try again later.");
      } else if (error instanceof UnexpectedException) {
        toast.error("An unexpected error occurred. Please try again.");
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field if a digit is entered
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleClearOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    const firstInput = document.getElementById("otp-0");
    if (firstInput) {
      firstInput.focus();
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
        className="bg-white bg-opacity-50 rounded-xl p-4 sm:px-10 border border-gray-200 border-opacity-70 w-80 sm:w-96 h-[500px] flex flex-col items-center justify-center space-y-2"
        style={{ zIndex: 2 }}
      >
        <img
          src="/img/logo.jpg"
          alt="logo"
          className="w-20 h-20 mx-auto rounded-full"
        />
        <h3 className="text-md text-center text-black opacity-90 font-semibold">
          OTP
        </h3>
        <div className="mb-4 text-light-blue text-xs">
          Check your email for OTP
        </div>
        <div className="flex space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-10 h-10 text-center text-lg border border-gray-300 rounded"
            />
          ))}
        </div>
        <div className="w-full flex justify-center items-center space-x-8">
          <div
            className="mb-4 mt-2 text-black text-sm hover:text-light-blue duration-300 transition-all ease-in-out cursor-pointer"
            onClick={handleClearOtp}
          >
            Clear OTP
          </div>
          <div className="mb-4 mt-2 text-black text-sm hover:text-light-blue duration-300 transition-all ease-in-out cursor-pointer">
            Resend OTP
          </div>
        </div>
        <h3 className="text-md font-large text-center text-black opacity-90 font-semibold mt-4">
          New Password
        </h3>
        <div className="w-full">
          <TextBox
            caption="New Password"
            value={password}
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e)}
          />
          <TextBox
            caption="Re-enter Password"
            value={password2}
            type="password"
            placeholder="Re-enter new password"
            onChange={(e) => setPassword2(e)}
            componentClassName="mt-4"
          />
          <div className="flex flex-col items-center justify-center mt-4">
            <Button caption="RESET PASSWORD" onClick={handlePasswordReset} />
          </div>
        </div>
      </div>
      <Toast />
      <Spinner isVisible={loading} />
    </div>
  );
};

export default OTPPage;
