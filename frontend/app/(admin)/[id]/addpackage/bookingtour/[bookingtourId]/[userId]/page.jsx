"use client";

import Image from "next/image";
import { Calendar, Pencil, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileStore } from "@/store/profileStore";
import { userStore } from "@/store/userStore";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function BookingConfirmation() {
  const params = useParams();
  const router = useRouter();
  const {
    user,
    useById,
    loading,
    error,
    fetchUserById,
    editUser,
    fetchUserByIdadmin,
  } = userStore();
  const {
    profileImage,
    setProfileImage,
    fetchProfileImage,
    uploadProfileImage,
  } = profileStore();

  useEffect(() => {
    if (params.userId) {
      fetchUserByIdadmin(params.id, params.userId);
      if (typeof params.userId === "string" && params.userId.trim() !== "") {
        fetchProfileImage(params.userId);
      } else {
        console.error("Invalid param.id:", params.userId);
      }
    }
  }, [params.userId, fetchUserById, fetchProfileImage]);

  const tourHistory = [
    {
      id: "#1413",
      name: "Phnom Penh Tour",
      bookedDate: "Oct 28th, 2020",
      status: "Confirmed",
      price: "$120",
      startDate: "Oct 29th 2020",
      endDate: "Nov 12th 2020",
      image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: "#15261",
      name: "Phnom Penh, Angkor Wat and Kampot",
      bookedDate: "Oct 28th, 2020",
      status: "Canceled",
      price: "$180",
      startDate: "Oct 29th 2020",
      endDate: "Nov 12th 2020",
      image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: "#25402",
      name: "Siem Reap Tour",
      bookedDate: "Oct 28th, 2020",
      status: "Confirmed",
      price: "$300",
      startDate: "Oct 29th 2020",
      endDate: "Nov 12th 2020",
      image: "/placeholder.svg?height=60&width=80",
    },
  ];

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="w-full max-w-full grid md:grid-cols-2 gap-4 bg-white rounded-lg overflow-hidden shadow-lg p-4">
        {/* Booking Details Card */}
        <div className="p-4 border rounded-lg">
          {/* User Profile */}
          <div className="flex items-center justify-between pb-4 border-b mb-6">
            <div className="flex items-center gap-3  ">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profileImage} alt="User profile image" />
                <AvatarFallback className="bg-sky-100">
                  {useById?.lastname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-medium">
                  {useById?.firstname} {useById?.lastname}
                </h2>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {useById?.status?.charAt(0).toUpperCase() +
                    useById?.status?.slice(1) || "Active"}
                </span>
              </div>
            </div>

            <Link href={`/${params.id}/edituser/${params.userId}`}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Edit
              </button>
            </Link>
          </div>

          {/* Tour Details */}
          <div className="border rounded-lg overflow-hidden">
            {/* Tour Header */}
            <div className="border-b border-dashed border-blue-200 p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-blue-600">
                  bookingData.tour.name
                </h3>
                <p className="text-sm text-gray-500">
                  #bookingData.tour.bookingNumber
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full">
                bookingData.tour.status
              </span>
            </div>

            {/* Guests */}
            <div className="border-b border-dashed border-blue-200 p-4">
              <div className="text-sm text-gray-500 mb-2">Guests</div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-gray-400" />
                  <span>bookingData.tour.guests.total People</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>
                    bookingData.tour.guests.adults Adults,{" "}
                    bookingData.tour.guests.kids Kid
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Date */}
            <div className="border-b border-dashed border-blue-200 p-4">
              <div className="text-sm text-gray-500 mb-2">Booking Date</div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-400" />
                <span>bookingData.tour.bookingDate</span>
              </div>
            </div>

            {/* Tour Date */}
            <div className="p-4 flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500 mb-2">Tour Date</div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-gray-400" />
                  <span>bookingData.tour.tourDates</span>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                View Tour
              </Button>
            </div>
          </div>
        </div>

        {/* Tour Images */}
        <div className="grid grid-rows-3 gap-2">
          <div className="row-span-2 relative h-full min-h-[300px]">
            <Image
              src="/image/1.jpg"
              alt="Bamboo treehouse"
              fill
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 row-span-1">
            <div className="relative h-full min-h-[100px]">
              <Image
                src="/placeholder.svg"
                alt="Treehouse interior"
                fill
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="relative h-full min-h-[100px]">
              <Image
                src="/placeholder.svg"
                alt="Treehouse bedroom"
                fill
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="relative h-full min-h-[100px]">
              <Image
                src="/placeholder.svg"
                alt="Treehouse details"
                fill
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="p-6 text-xl font-medium">User Tour History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Tour Name
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Booked Date
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Price
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Start Date
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tourHistory.map((tour) => (
                <tr key={tour.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-20 h-14">
                        <Image
                          src={tour.image || "/placeholder.svg"}
                          alt={tour.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{tour.id}</p>
                        <p className="font-medium">{tour.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{tour.bookedDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        tour.status === "Confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {tour.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{tour.price}</td>
                  <td className="px-6 py-4 text-sm">{tour.startDate}</td>
                  <td className="px-6 py-4 text-sm">{tour.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
