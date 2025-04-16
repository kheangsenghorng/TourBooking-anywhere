"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTourStore } from "@/store/tourStore";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Heart, Star, Clock, Bus, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const parms = useParams();
  const { galleryImages, fetchGalleryImages, loading, error } = useTourStore();
  const [filter, setFilter] = useState("highest");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchGalleryImages(); // Fetch gallery images when the component mounts

    // Load favorites from localStorage or initialize empty array
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [fetchGalleryImages]);

  // Function to handle favorite button click
  const handleFavoriteClick = (tourId) => {
    let newFavorites;

    if (favorites.includes(tourId)) {
      // Remove from favorites
      newFavorites = favorites.filter((id) => id !== tourId);
      toast.success("Tour removed from favorites!");
    } else {
      // Add to favorites
      newFavorites = [...favorites, tourId];
      toast.success("Tour added to favorites!");
    }

    // Update state and save to localStorage
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  // Check if a tour is favorited
  const isFavorite = (tourId) => {
    return favorites.includes(tourId);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Function to calculate duration in days
  const getDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return "N/A";
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  // Sort tours by price
  const sortedTours =
    filter === "highest"
      ? [...galleryImages].sort((a, b) => b.price - a.price)
      : [...galleryImages].sort((a, b) => a.price - b.price);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTours = sortedTours.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedTours.length / itemsPerPage);

  return (
    <div className="p-6">
      {/* Filter Buttons */}
      <div className="flex justify-center border w-[400px] mx-auto rounded-full my-5">
        <button
          onClick={() => setFilter("highest")}
          className={`px-6 py-2 border w-full rounded-full hover:bg-gray-100 ${
            filter === "highest" ? "bg-gray-200" : ""
          }`}
        >
          Highest Price
        </button>
        <button
          onClick={() => setFilter("lowest")}
          className={`px-6 py-2 border w-full rounded-full hover:bg-gray-100 ${
            filter === "lowest" ? "bg-gray-200" : ""
          }`}
        >
          Lowest Price
        </button>
      </div>

      {/* Render Tours */}
      <div className="grid gap-6">
        {currentTours.map((tour) => (
          <Card
            key={tour.tour_id || tour._id}
            className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow w-full mx-auto"
          >
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48">
                  <Link
                    href={
                      parms?.id
                        ? `/${parms.id}/tour-detail/${tour._id}`
                        : `/tour-detail/${tour._id}`
                    }
                  >
                    <div className="h-full w-full relative sm:w-48">
                      <Image
                        src={
                          tour.galleryImages?.[0] ||
                          "/placeholder.svg?height=200&width=200" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                        alt={tour.tour_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                </div>

                <div className="p-6 flex flex-col justify-between w-full relative">
                  {/* Favorite Button */}
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleFavoriteClick(tour._id)}
                      className="hover:bg-rose-50"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isFavorite(tour._id)
                            ? "fill-rose-500 text-rose-500"
                            : ""
                        }`}
                      />
                    </Button>
                  </div>

                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-teal-100 text-teal-700 hover:bg-teal-200"
                      >
                        {tour.tour_name || "Tour"}
                      </Badge>
                      {tour.status && (
                        <Badge
                          variant="secondary"
                          className={
                            tour.status === "Sold out"
                              ? "bg-rose-100 text-rose-700 hover:bg-rose-200"
                              : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          }
                        >
                          {tour.status}
                        </Badge>
                      )}
                    </div>

                    <Link
                      href={
                        parms?.id
                          ? `/${parms.id}/tour-detail/${tour._id}`
                          : `/tour-detail/${tour._id}`
                      }
                    >
                      <h2 className="text-xl font-semibold mb-2 hover:text-rose-600 transition-colors">
                        {tour.tour_name}
                      </h2>
                    </Link>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {tour.description}
                    </p>

                    <div className="flex items-center mb-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < Math.floor(tour.rating || 0)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                      <span className="ml-2 font-medium">
                        {tour.rating || "0"}
                      </span>
                      <span className="ml-1 text-sm text-muted-foreground">
                        {tour.reviews
                          ? `(${tour.reviews} reviews)`
                          : "(No reviews yet)"}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-rose-500" />
                        </div>
                        <span>
                          {getDuration(tour.startDate, tour.endDate)} days
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                          <Bus className="h-4 w-4 text-rose-500" />
                        </div>
                        <span>Transport</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-rose-500" />
                        </div>
                        <span>
                          {tour.status === "Sold out"
                            ? "Unavailable"
                            : "Available"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <div className="font-bold text-2xl text-rose-600">
                        ${tour.price}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        /person
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-2 px-4 py-2 rounded-md border ${
              currentPage === index + 1
                ? "bg-rose-500 text-white"
                : "bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
