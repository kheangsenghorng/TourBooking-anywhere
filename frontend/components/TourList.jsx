"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTourStore } from "@/store/tourStore";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  const { galleryImages, fetchGalleryImages, loading, error } = useTourStore();
  const [filter, setFilter] = useState("highest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchGalleryImages(); // Fetch gallery images when the component mounts
  }, [fetchGalleryImages]);

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
      <div className="grid gap-6 px-4">
        {currentTours.map((tour) => (
          <div
            key={tour.tour_id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto"
          >
            {/* Favorite Button */}
            <button className="btn btn-light bg-white rounded-md btn-sm text-dark absolute top-0 right-0 p-2 m-3 shadow-md border">
              <i className="fa-regular fa-heart"></i>
            </button>

            <div className="flex">
              <Link href={`/tour-detail/${tour._id}`}>
                <img
                  src={tour.galleryImages[0]}
                  alt={tour.tour_name}
                  className="w-48 h-48 object-cover"
                />
              </Link>

              <div className="p-4 flex w-[650px] flex-col border transition justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-4">{tour.tour_name}</h2>
                  <p className="text-gray-500">{tour.description}</p>
                  <div className="mt-2 text-yellow-500">
                    {Array(Math.max(1, Math.floor(tour.rating || 0)))
                      .fill("★")
                      .join("")}
                    <span className="ml-2 text-gray-600">
                      {tour.rating
                        ? `${tour.rating} (${tour.reviews} reviews)`
                        : "No ratings yet"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">
                    <i className="fa-regular fa-clock"></i>{" "}
                    {getDuration(tour.startDate, tour.endDate)} days
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      tour.status === "Sold out"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {tour.status}
                  </p>
                  <p className="text-lg font-bold">${tour.price} / person</p>
                </div>
              </div>
            </div>
          </div>
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
                ? "bg-blue-500 text-white"
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
