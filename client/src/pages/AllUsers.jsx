import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { backendRoutes } from "@/helpers/backendRoutes";
import { Loader } from "lucide-react"; // optional icon
import { Button } from "@/components/ui/button";
import { RouteUserPublicProfile } from "@/helpers/routesName";
import { useNavigate } from "react-router-dom";
import appUtils from "@/lib/appUtils";

const AllUsers = () => {
  const { navigate } = appUtils();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get(
          `${backendRoutes.ALL_USERS.BASE}${backendRoutes.ALL_USERS.GET_ALL_USERS}`
        );
        setUsers(res.data.users || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <Loader className="animate-spin mr-2" /> Loading users...
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  if (users.length === 0)
    return (
      <div className="text-gray-500 text-center mt-10">No users found.</div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-md">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Email</th>
              <th className="px-4 py-3 border-b">Role</th>
              <th className="px-4 py-3 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2 text-right">
                  <Button
                    onClick={()=> navigate(`/user/${user._id}`)}
                    size="sm"
                    variant="outline"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
