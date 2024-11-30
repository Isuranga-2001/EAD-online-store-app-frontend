import React from "react";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import { User } from "@/interfaces/userInterface";

interface PersonalDetailsProps {
  userData: User;
  handleChange: (field: string, value: string) => void;
  handleUpdate: () => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  userData,
  handleChange,
  handleUpdate,
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextBox
          placeholder="Enter your name"
          caption="Name"
          value={userData.name}
          onChange={(value) => handleChange("name", value)}
        />
        <TextBox
          placeholder="Enter your email"
          caption="Email"
          value={userData.email}
          disabled
          onChange={(value) => handleChange("email", value)}
        />
        <TextBox
          placeholder="Enter your phone number"
          caption="Phone"
          value={userData.phone}
          onChange={(value) => handleChange("phone", value)}
        />
        <TextBox
          placeholder="Enter your country"
          caption="Country"
          value={userData.country}
          onChange={(value) => handleChange("country", value)}
        />
        <TextBox
          placeholder="Enter your postal code"
          type="number"
          caption="Postal Code"
          value={userData.postalCode.toString()}
          onChange={(value) => handleChange("postalCode", value)}
        />
      </div>
      <Button
        caption="Update Details"
        onClick={handleUpdate}
        buttonClassName="mt-4"
      />
    </div>
  );
};

export default PersonalDetails;
