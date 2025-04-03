"use client";

import Image from "next/image";
import {
  Heart,
  ArrowLeft,
  ChevronDown,
  Trash2,
  Hotel,
  Users,
} from "lucide-react";
import { useFavoriteStore } from "@/store/favoriteStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function FavoritesPage() {
  const params = useParams();
  const { favorites, loading, error, fetchFavorites, removeFavorite } =
    useFavoriteStore();
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchFavorites(params.id);
    }
  }, [params.id, fetchFavorites]);

  const handleClick = (tourId) => {
    removeFavorite(params.id, tourId);

    setFavorited(false); // Set favorited to false since the item is removed
    // Remove the favorite
    toast.success("Tour removed from favorites!");
  };

  const getDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return "N/A";
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button aria-label="Go back" className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            <h1 className="text-xl font-semibold">Favorite</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-500">
          {favorites.length} favorites
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm flex items-center gap-1">
            <span>Select</span>
          </button>
          <button className="text-sm flex items-center gap-1">
            <span>All</span>
          </button>
          <button className="text-sm flex items-center gap-1 text-gray-500">
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl">
        <div className="flex gap-3 mb-6">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-full flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Tour</span>
          </button>
        </div>

        {favorites.map((tour, index) => (
          <div
            key={index}
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="flex">
              <div className="w-1/3 relative">
                <Link href={`/tour-detail/${tour._id}`}>
                  <Image
                    src={
                      tour.galleryImages[0] ||
                      "/placeholder.svg?height=200&width=200"
                    }
                    alt={tour.title || "Tour image"}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </Link>
              </div>
              <div className="w-2/3 p-4 relative">
                <div className="absolute top-4 right-4">
                  <Heart
                    onClick={() => handleClick(tour._id)}
                    className={`h-6 w-6 rounded transition duration-300  ${
                      favorited
                        ? "fill-gray-300 text-gray-300"
                        : " fill-red-500 text-red-500"
                    }`}
                  />
                </div>

                <div className="mb-1">
                  <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                    {tour.tour_name || "Tour"}
                  </span>
                  {tour.status && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full ml-2">
                      {tour.status}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-2">{tour.description}</p>

                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, star) => (
                    <span key={star} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                  <span className="ml-2 font-medium">{tour.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">
                    {tour.reviews} reviews
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-xs">
                        ⏱
                      </span>
                      <span>
                        {getDuration(tour.startDate, tour.endDate) || "2 Weeks"}{" "}
                        days
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-xs">
                        🚌
                      </span>
                      <span>Transport</span>
                    </div>
                  </div>
                  <div className="text-right flex justify-center items-center">
                    <div className="font-bold text-lg">${tour.price}</div>
                    <div className="text-xs text-gray-500">/person</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center items-center gap-2 mt-8">
          <button className="w-8 h-8 flex items-center justify-center border rounded-md">
            ←
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-md">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center border rounded-md">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center border rounded-md">
            →
          </button>
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
}
