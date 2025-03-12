"use client";
import Link from "next/link";
import Image from "next/image";
import { PenSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { id } = useParams();

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-8">My Profile</h1>

      <div className="flex items-center mb-8">
        <div className="flex">
          <div className="relative">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          <main className="flex flex-col items-cente justify-center ml-4">
            <h2 className="mt-4 text-xl font-semibold">Mrr Ronaldo</h2>
            <p className="text-gray-600">Ronaldo@gmail.com</p>
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
            <div className="text-gray-900">Mrr</div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Last Name
            </label>
            <div className="text-gray-900">Ronaldo</div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <div className="text-gray-900">Ronaldo@gmail.com</div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Phone Number
            </label>
            <div className="text-gray-900">+855 123 456 789</div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Bio</label>
            <div className="text-gray-900">No bio yet</div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Address</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Country</label>
            <div className="text-gray-900">Cambodia</div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              City/State
            </label>
            <div className="text-gray-900">Toul Kouk, Phnom Penh</div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">ZIP Code</label>
            <div className="text-gray-900">120407</div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Street</label>
            <div className="text-gray-900">Plov Betong</div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Home Number
            </label>
            <div className="text-gray-900">168</div>
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

export default page;
