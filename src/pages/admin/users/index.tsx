import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SidebarLayout from "@/components/SidebarLayout";
import { Table, TableColumn } from "@/components/Table";
import { getAllUsers } from "@/services/userService";
import { User } from "@/interfaces/userInterface";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";

interface GetAllUsersResponse {
  total: number;
  users: User[];
}

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response: GetAllUsersResponse = await getAllUsers(
        currentPage,
        pageSize
      );
      setUsers(response.users);
      setTotalPages(Math.ceil(response.total / pageSize));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleViewEditClick = (userID: number) => {
    router.push(`/admin/users/${userID}`);
  };

  const columns: TableColumn<User>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "Country", accessor: "country" },
    {
      header: "Actions",
      accessor: "id",
      isButton: true,
      buttonCaption: "View/Edit",
      onClick: (row: User) => handleViewEditClick(row.id),
    },
  ];

  return (
    <SidebarLayout selectedSidebarItem={"viewUsers"}>
      <div className="p-4">
        <Table
          columns={columns}
          data={users}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <Spinner isVisible={loading} />
      <Toast />
    </SidebarLayout>
  );
}
