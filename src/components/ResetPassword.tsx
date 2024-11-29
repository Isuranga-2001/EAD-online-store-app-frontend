import React from "react";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import { forgotPassword } from "@/services/userService";
import { toast } from "react-toastify";
import { useUser } from "@/contexts/userContext";

const ResetPassword: React.FC = () => {
  const { user } = useUser();

  const resetPassword = async () => {
    try {
      if (user) {
        await forgotPassword(user.email);
      }

      toast.success("Password reset link sent to your email!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset password!");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
      <Button
        caption="Reset Password"
        onClick={() => {
          resetPassword();
        }}
        buttonClassName="mt-4"
      />
    </div>
  );
};

export default ResetPassword;
