import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SidebarLayout from "@/components/SidebarLayout";
import TextBox from "@/components/TextBox";
import Spinner from "@/components/Spinner";
import { getUserById } from "@/services/userService";
import { User } from "@/interfaces/userInterface";

const AdminViewUserPage: React.FC = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (user_id && !isNaN(Number(user_id))) {
      fetchUser(Number(user_id));
    }
  }, [user_id]);

  const fetchUser = async (userID: number) => {
    setLoading(true);
    try {
      const response = await getUserById(userID);
      setUser(response);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarLayout selectedSidebarItem="viewUsers">
      {loading ? (
        <Spinner isVisible={loading} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextBox
            value={user?.name || ""}
            onChange={() => {}}
            placeholder="Name"
            caption="Name"
            disabled
          />
          <TextBox
            value={user?.email || ""}
            onChange={() => {}}
            placeholder="Email"
            caption="Email"
            disabled
          />
          <TextBox
            value={user?.phone || ""}
            onChange={() => {}}
            placeholder="Phone"
            caption="Phone"
            disabled
          />
          <TextBox
            value={user?.country || ""}
            onChange={() => {}}
            placeholder="Country"
            caption="Country"
            disabled
          />
          <TextBox
            value={user?.postalCode?.toString() || ""}
            onChange={() => {}}
            placeholder="Postal Code"
            caption="Postal Code"
            disabled
          />
        </div>
      )}
    </SidebarLayout>
  );
};

export default AdminViewUserPage;
