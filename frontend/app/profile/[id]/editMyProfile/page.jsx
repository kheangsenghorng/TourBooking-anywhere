"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userStore } from "@/store/userStore";
import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { id } = useParams(); // Extract user ID from URL
  const router = useRouter();
  const { user, loading, error, fetchUserById, editUser } = userStore();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      fetchUserById(id);
    }
  }, [id, fetchUserById]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phonenumber: user.phonenumber || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editUser(id, formData);
    router.push(`/profile/${id}/myprofile`);
  };

  if (loading) return <p>Loading user...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>No user found.</p>;

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <main>
          <h1 className="text-2xl font-bold mb-8">My Profile</h1>
          <div className="flex items-center mb-8">
            <div className="flex">
              <div className="relative">
                <Image
                  src={user?.profile_image || "/avatar.png"}
                  alt="Profile Picture"
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
              <div className="flex flex-col justify-center ml-4">
                <h2 className="mt-4 text-xl font-semibold uppercase">
                  {user?.firstname || "N/A"}{" "}
                  <span>{user?.lastname || "N/A"}</span>
                </h2>
                <p className="text-gray-600">
                  {user?.email || "No email available"}
                </p>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    First Name
                  </label>
                  <Input
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder={user?.firstname || "Enter your first name"}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    last Name
                  </label>
                  <Input
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder={user?.lastname || "Enter your last name"}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={user?.email || "Enter your email"}
                    disabled
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    placeholder={user?.phonenumber || "N/A"}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-10 py-2 rounded-full"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </section>
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Country
                </label>
                <Input placeholder="Enter......" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  City/State
                </label>
                <Input placeholder="Enter......" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  ZIP Code
                </label>
                <Input placeholder="Enter......" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Street</label>
                <Input placeholder="Enter......" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Home Number
                </label>
                <Input placeholder="Enter......" />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
