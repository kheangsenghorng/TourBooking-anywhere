"use client";
import { useTourStore } from "@/store/tourStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function PhnomPenhTour() {
  const { tourId } = useParams();
  const { tour, loading, error, fetchTour } = useTourStore();

  useEffect(() => {
    if (tourId) {
      fetchTour(tourId);
    }
  }, [tourId]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  return (
    <div className="min-h-screen w-[800px]">
      {/* Header Section */}
      <header className="text-black py-8">
        <div className="container mx-auto ps-6">
          <Link href="#Explore" id="Explore">
            <h1 className="text-4xl font-bold">{tour?.tour_name}</h1>
          </Link>

          <p className="text-lg mt-2 text-yellow-500">
            | ★★★★★ <span className="text-gray-500">4.9 (12:10 reviews)</span>
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto">
        {/* Overview Section */}
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Overview
          </h2>
          <p className="text-gray-600 leading-relaxed">{tour?.overview}</p>
          <p className="text-gray-600 mt-4">
            Read more about - Grand Canyon West, Hoover Dam Stop and Optional
            Lunch and Skywalk
          </p>
        </div>

        {/* Itinerary Section */}
        <div className="bg-white p-6 rounded-lg mt-6">
          <Link href="#Explore" id="Itinerary">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Itinerary
            </h2>
          </Link>
          <div className="border-l-2 border-gray-300 ml-4">
            {/* Day 01 */}
            <div className="flex items-start mb-8 relative">
              <div className="w-6 h-6 bg-green-600 text-white flex items-center justify-center rounded-full absolute -left-3">
                1
              </div>
              <div className="ml-8 relative">
                <p className="text-sm text-gray-500">21 Dec 25</p>
                <h3 className="text-xl font-semibold text-black">
                  Arrival and City Orientation
                </h3>
                <p className="text-gray-600">
                  Explore Wat Phnom, the Royal Palace, and the Silver Pagoda,
                  then enjoy an evening stroll along the Riverside.
                </p>
              </div>
            </div>

            {/* Day 02 */}
            <div className="flex items-start mb-8 relative">
              <div className="w-6 h-6 bg-green-600 text-white flex items-center justify-center rounded-full absolute -left-3">
                2
              </div>
              <div className="ml-8 relative">
                <p className="text-sm text-gray-500">22 Dec 25</p>
                <h3 className="text-xl font-semibold text-black">
                  Historical and Cultural Insights
                </h3>
                <p className="text-gray-600">
                  Visit Tuol Sleng Genocide Museum and Choeung Ek Killing Fields
                  for a somber look at Cambodia's history, followed by shopping
                  at the Russian Market.
                </p>
              </div>
            </div>

            {/* Day 03 */}
            <div className="flex items-start mb-8 relative">
              <div className="w-6 h-6 bg-green-600 text-white flex items-center justify-center rounded-full absolute -left-3">
                3
              </div>
              <div className="ml-8 relative">
                <p className="text-sm text-gray-500">23 Dec 25</p>
                <h3 className="text-xl font-semibold text-black">
                  Mekong River Adventure
                </h3>
                <p className="text-gray-600">
                  Take a day trip to Koh Dach (Silk Island) to experience
                  village life, silk weaving, and a relaxing Mekong sunset
                  cruise.
                </p>
              </div>
            </div>

            {/* Day 04 */}
            <div className="flex items-start mb-8 relative">
              <div className="w-6 h-6 bg-green-600 text-white flex items-center justify-center rounded-full absolute -left-3">
                4
              </div>
              <div className="ml-8 relative">
                <p className="text-sm text-gray-500">24 Dec 25</p>
                <h3 className="text-xl font-semibold text-black">
                  Architectural and Artistic Exploration
                </h3>
                <p className="text-gray-600">
                  Discover Phnom Penh’s iconic landmarks, shop at Central
                  Market, and enjoy street art or a cultural performance.
                </p>
              </div>
            </div>

            {/* Day 05 */}
            <div className="flex items-start mb-8 relative">
              <div className="w-6 h-6 bg-green-600 text-white flex items-center justify-center rounded-full absolute -left-3">
                5
              </div>
              <div className="ml-8 relative">
                <p className="text-sm text-gray-500">25 Dec 25</p>
                <h3 className="text-xl font-semibold text-black">
                  Day Trip to Oudong
                </h3>
                <p className="text-gray-600">
                  Climb Oudong Mountain for stunning views and visit nearby
                  pagodas and meditation centers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
