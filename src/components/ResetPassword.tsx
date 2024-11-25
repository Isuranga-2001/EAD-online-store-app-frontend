import React from "react";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";

const ResetPassword: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextBox
          placeholder="Enter current password"
          caption="Current Password"
          type="password"
          value=""
          onChange={() => {}}
        />
        <TextBox
          placeholder="Enter new password"
          caption="New Password"
          type="password"
          value=""
          onChange={() => {}}
        />
        <TextBox
          placeholder="Confirm new password"
          caption="Confirm New Password"
          type="password"
          value=""
          onChange={() => {}}
        />
      </div>
      <Button
        caption="Reset Password"
        onClick={() => {}}
        buttonClassName="mt-4"
      />
    </div>
  );
};

export default ResetPassword;
