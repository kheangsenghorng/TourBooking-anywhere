"use client";

import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBookingStore } from "@/store/useBookingStore"; // Removed named import
import { useParams } from "next/navigation";

export default function GuestTable() {
  const params = useParams();
  const tourId = params?.bookingtourId;
  const id = params?.id; // Adjust based on your routing
  const { bookings, loading, error, fetchTourBookings } = useBookingStore();

  useEffect(() => {
    if (tourId) {
      fetchTourBookings(id, tourId);
    }
  }, [id, tourId, fetchTourBookings]);

  function formatBookingDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", year: "numeric" };
    const day = date.getDate();

    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const formattedDate = `${
      date.toLocaleString("en-US", options).split(" ")[0]
    } ${day}${getDaySuffix(day)}, ${date.getFullYear()}`;
    return formattedDate;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Guest List</h3>
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="">{error}</p>
      ) : bookings.length === 0 ? (
        <p>No guests found for this tour.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-left">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Guest</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Book Date</th>
                <th className="p-4 font-medium">No. Guests</th>
                <th className="p-4 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking, index) => (
                <tr
                  key={booking._id || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-gray-500">#{index + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={
                            booking.userId?.profile_image ||
                            "/default-profile.png"
                          }
                          alt={booking.userId?.name}
                        />
                        <AvatarFallback>
                          {booking.userId?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-800">
                          {booking.userId?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{booking.userId?.email}</td>
                  <td className="p-4 text-gray-600">
                    {formatBookingDate(booking.createdAt)}
                  </td>
                  <td className="p-4 text-gray-600">{booking.bookingSit}</td>
                  <td className="p-4 text-right font-medium">
                    ${booking.bookingTotal?.toLocaleString() || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <div>
          Showing {bookings.length} of {bookings.length} guests
        </div>
        {/* Pagination Placeholder */}
        <div className="flex space-x-4">
          <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
