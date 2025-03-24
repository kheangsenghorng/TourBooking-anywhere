"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCopy, faPen } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";

import { profileStore } from "@/store/profileStore"; // Ensure correct path
import Image from "next/image";
import Link from "next/link";

const UserPage = () => {
  const params = useParams();

  const { users, fetchProfileImage, fetchUsers, loading, error } =
    profileStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // ✅ Fetch users when params.id changes
  useEffect(() => {
    if (params.id) {
      fetchUsers(params.id);
    }
  }, [params.id]);

  const filteredUsers = Array.isArray(users)
    ? users.filter((user) =>
        `${user.firstname} ${user.lastname}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : [];

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-700">User Management</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by user name"
                className="pl-10 pr-4 py-2 border rounded-lg w-64 md:w-96"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-[20px] h-[20px]"
              />
            </div>
            <Link
              href={`/${params.id}/adduser`}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add User
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Profile</th>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">Tour Name</th>
                <th className="px-4 py-2">Tour Rating</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-red-500">
                    Error loading users
                  </td>
                </tr>
              ) : currentUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    No users found
                  </td>
                </tr>
              ) : (
                currentUsers.map((user, i) => (
                  <tr
                    key={user._id}
                    className="border-t text-nowrap hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">#{startIndex + i + 1000}</td>
                    <td className="px-4 py-3">
                      <Link href={`/${params.id}/viewuser/${user._id}`}>
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              user.profile_image_url ||
                              "https://www.gravatar.com/avatar/?d=mp&s=120"
                            }
                            alt="Profile"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      {user.lastname} {user.firstname}
                    </td>
                    <td className="px-4 py-3">{user.tourName || "N/A"}</td>
                    <td className="px-4 py-3">{user.tourRating || "N/A"}</td>
                    <td className="px-4 py-3">{user.phonenumber}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          user?.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            : user?.status === "approved"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-gray-100 text-gray-800 border border-gray-200"
                        }`}
                      >
                        {user?.status || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{user.role}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        className="p-1 hover:text-blue-500"
                        title="Copy user details"
                      >
                        <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 hover:text-blue-500"
                        title="Edit user"
                      >
                        <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredUsers.length > usersPerPage && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + usersPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 border rounded bg-blue-50 text-blue-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
