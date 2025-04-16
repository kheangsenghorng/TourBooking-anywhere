"use client";
import { useTourStore } from "@/store/tourStore";
import React, { useEffect, useState } from "react";

const FilterSidebar = () => {
  const [participants, setParticipants] = useState(13);
  const [priceRange, setPriceRange] = useState({ min: 200, max: 1000 });
  const [accommodation, setAccommodation] = useState({
    acHeating: true,
    dishwasher: false,
    petsAllowed: false,
    fitnessCenter: false,
    airportTransfer: false,
    Spa: false,
    Pool: false,
    Roomtype: false,
  });

  const [tourAvailability, setTourAvailability] = useState("all");
  const [travelType, setTravelType] = useState("all");

  const {
    filterToursByPrice,
    fetchToursByRating,
    ratingFilter,
    setRatingFilter,
    isLoading,
    error,
  } = useTourStore();

  // Filter tours using the values from priceRange state
  const handleFilter = () => {
    filterToursByPrice({
      minPrice: Number(priceRange.min),
      maxPrice: Number(priceRange.max),
    });
  };

  const handleAccommodationChange = (e) => {
    setAccommodation({ ...accommodation, [e.target.name]: e.target.checked });
  };

  const handleRatingChange = (e) => {
    const rating = parseFloat(e.target.value);
    setRatingFilter(rating); // Set the rating filter
    fetchToursByRating(rating); // Fetch tours based on the rating filter
  };

  const handleAvailabilityChange = (e) => {
    setTourAvailability(e.target.value);
  };

  const handleTravelTypeChange = (e) => {
    setTravelType(e.target.value);
  };

  useEffect(() => {
    // Optional: Trigger tour filtering when availability or travel type changes
    // This could involve fetching tours based on these filters if needed
  }, [tourAvailability, travelType]);

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Participants */}
      <div className="mb-4">
        <label className="block mb-2">Maximum Participants</label>
        <input
          type="range"
          min="0"
          max="35"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          className="w-full"
        />
        <div className="flex justify-between">
          <span>0</span>
          <span>{participants}</span>
          <span>35</span>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex flex-col justify-between gap-4">
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
            className="border rounded p-3"
            placeholder="Min"
          />
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
            className="border rounded p-3"
            placeholder="Max"
          />
        </div>
        {/* Optional Apply Filter Button */}
        <button
          onClick={handleFilter}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Apply Filter
        </button>
      </div>

      {/* Accommodation */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Accommodation</h3>
        {Object.keys(accommodation).map((key) => (
          <label key={key} className="flex items-center mb-2">
            <input
              type="checkbox"
              name={key}
              checked={accommodation[key]}
              onChange={handleAccommodationChange}
              className="mr-2"
            />
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </label>
        ))}
      </div>

      {/* Rating */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Rating</h3>
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star} className="flex items-center mb-2">
            <input
              type="radio"
              value={star}
              checked={ratingFilter === star}
              onChange={handleRatingChange}
              className="mr-2"
            />
            {star} Star
          </label>
        ))}
      </div>

      {/* Tour Availability */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Tour Availability</h3>
        <select
          value={tourAvailability}
          onChange={handleAvailabilityChange}
          className="border rounded w-full p-2"
        >
          <option value="all">All</option>
          <option value="fullyBooked">Fully booked</option>
          <option value="available">Available</option>
        </select>
      </div>

      {/* Travel Type Filter */}
      <div>
        <h3 className="font-semibold mb-2">Travel Type Filter</h3>
        {["all", "roundTrip", "multiDestination"].map((type) => (
          <label key={type} className="flex items-center mb-2">
            <input
              type="radio"
              value={type}
              checked={travelType === type}
              onChange={handleTravelTypeChange}
              className="mr-2"
            />
            {type
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
