"use client";
import React, { useState } from "react";

const destinations = [
  "Phnom Penh",
  "Siem Reap",
  "Battambang",
  "Kampot",
  "Sihanoukville",
  "Koh Kong",
  "Takeo",
  "Kampong Cham",
  "Kampong Thom",
  "Kampong Speu",
  "Kampong Chhnang",
  "Prey Veng",
  "Svay Rieng",
  "Banteay Meanchey",
  "Pailin",
  "Pursat",
  "Kratie",
  "Stung Treng",
  "Ratanakiri",
  "Mondulkiri",
  "Oddar Meanchey",
  "Kep",
  "Tbong Khmum",
  "Preah Vihear",
];

const SearchLocation = () => {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-semibold mb-4">Search</h2>

      <div className="mb-4">
        <label className="block mb-2">Destinations</label>
        <select
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
          className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Choose Location
          </option>
          {destinations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Duration</label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter duration (e.g., 5 days)"
        />
      </div>
    </div>
  );
};

export default SearchLocation;
