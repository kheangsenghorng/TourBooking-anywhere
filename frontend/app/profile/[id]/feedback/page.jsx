"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, MapPin, ChevronLeft, ChevronRight, Users } from "lucide-react";
import Feedback from "@/app/(admin)/[id]/feedback-admin/page";

const hotels = [
  {
    id: 1,
    name: "Grand Land Hotel",
    location: "Siem Reap",
    rating: 4.8,
    reviews: 1257,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Grand Land Hotel",
    location: "Siem Reap",
    rating: 4.8,
    reviews: 1257,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Grand Land Hotel",
    location: "Siem Reap",
    rating: 4.8,
    reviews: 1257,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Grand Land Hotel",
    location: "Siem Reap",
    rating: 4.8,
    reviews: 1257,
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function HotelListing() {
  const { id, feedbackId } = useParams();
  return (
    <div className="max-w-4xl  p-4">
      {/* Tabs */}
      {/* <div className="flex gap-2 mb-6">
        <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full">
          <span>Hotel</span>
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full">
          <Users size={16} />
          <span>Tour</span>
        </button>
      </div> */}

      {/* Hotel Cards */}
      <div className="space-y-4">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden shadow-sm border"
          >
            <div className="sm:w-1/3 h-48 sm:h-auto relative">
              <Image
                src={hotel.image || "/placeholder.svg"}
                alt={hotel.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="sm:w-2/3 p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">{hotel.name}</h2>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{hotel.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">
                      ({hotel.reviews})
                    </span>
                  </div>
                </div>
                <div className="flex items-center mt-1 text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="mr-2">Hotel</span>
                  <span className="text-gray-400">•</span>
                  <span className="ml-2">{hotel.location}</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-600 mb-2">
                  How would you rate the hotel?
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 text-gray-300 cursor-pointer"
                      />
                    ))}
                  </div>
                  <Link href={`/profile/${id}/feedbackpage/${feedbackId}`}>
                    <button className="bg-primary text-primary-foreground px-4 py-1 rounded-md">
                      Evaluate
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-md border">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md border">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md border">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
