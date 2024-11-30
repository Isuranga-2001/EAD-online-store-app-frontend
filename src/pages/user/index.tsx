import React, { useEffect, useState } from "react";
import VisitorLayout from "@/components/VisitorLayout";
import { useUser } from "@/contexts/userContext";
import { updateUser } from "@/services/userService";
import { User } from "@/interfaces/userInterface";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";
import PersonalDetails from "@/components/PersonalDetails";
import ResetPassword from "@/components/ResetPassword";
import OrderHistory from "@/components/OrderHistory";

const UserDetailsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();
  const [userData, setUserData] = useState<User | null>(user);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    if (userData) {
      setUserData({ ...userData, [field]: value });
    }
  };

  const handleUpdate = async () => {
    if (userData) {
      try {
        setLoading(true);
        const updatedUser = await updateUser(userData.id, userData);
        setUser(updatedUser);
        toast.success("User details updated successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update user details!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <VisitorLayout>
      {userData && (
        <div className="mx-auto mt-10">
          <PersonalDetails
            userData={userData}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
          />
          <hr className="my-6" />
          <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
          <p>
            Find all your orders here. You can view the status of your orders
          </p>
          <OrderHistory userId={userData.id} />
          <hr className="my-6" />
          <ResetPassword />
        </div>
      )}
      <Toast />
      <Spinner isVisible={loading} />
    </VisitorLayout>
  );
};

export default UserDetailsPage;
