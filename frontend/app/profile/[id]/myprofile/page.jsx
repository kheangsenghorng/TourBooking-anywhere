"use client";
import Link from "next/link";
import Image from "next/image";
import { PenSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { userStore } from "@/store/userStore";

const Page = () => {
  const { id } = useParams();
  const { user, loading, error, fetchUserById } = userStore();

  useEffect(() => {
    if (id) {
      fetchUserById(id);
    }
  }, [id]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>No user found.</p>;

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-8">My Profile</h1>

      <div className="flex items-center mb-8">
        <div className="flex">
          <div className="relative">
            <Image
              src={
                user?.profile_image && user.profile_image.startsWith("https")
                  ? user.profile_image
                  : "/images.png"
              }
              alt="User profile image"
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          <main className="flex flex-col justify-center ml-4">
            <h2 className="mt-4 text-xl font-semibold uppercase">
              {user?.firstname || "N/A"}
              <span> {user?.lastname || "N/A"}</span>
            </h2>
            <p className="text-gray-600">
              {user?.email || "No email available"}
            </p>
          </main>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <Link href={`/profile/${id}/editMyProfile`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-5 py-2 flex items-center gap-2 transition-colors">
            Edit Profile
            <PenSquare className="w-5 h-5" />
          </button>
        </Link>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              First Name
            </label>
            <div className="text-gray-900">{user?.firstname || "N/A"}</div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Last Name
            </label>
            <div className="text-gray-900">{user?.lastname || "N/A"}</div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <div className="text-gray-900">{user?.email || "N/A"}</div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Phone Number
            </label>
            <div className="text-gray-900">{user?.phonenumber || "N/A"}</div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Bio</label>
            <div className="text-gray-900">{user?.bio || "No bio yet"}</div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Address</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Country</label>
            <div className="text-gray-900">
              {user?.address?.country || "N/A"}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              City/State
            </label>
            <div className="text-gray-900">{user?.address?.city || "N/A"}</div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">ZIP Code</label>
            <div className="text-gray-900">
              {user?.address?.zipcode || "N/A"}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Street</label>
            <div className="text-gray-900">
              {user?.address?.street || "N/A"}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Home Number
            </label>
            <div className="text-gray-900">
              {user?.address?.homeNumber || "N/A"}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded">
          Create
        </button>
      </div>
    </div>
  );
};

export default Page;
