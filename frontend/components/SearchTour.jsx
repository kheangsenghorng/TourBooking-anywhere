"use client";

import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Ensure this is included
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const provinces = [
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

const SearchTour = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSearch = () => {
    console.log("Searching for:", destination, startDate, endDate);
  };

  return (
    <div className="flex bg-white h-[100px] items-center justify-between p-6 border rounded-full shadow-md mx-auto my-5 w-[1000px]">
      {/* Destination Dropdown */}
      <div className="relative w-1/3">
        <label className="text-sm font-semibold text-gray-600">Where to</label>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="mt-1 block w-full p-3 text-gray-900 text-base font-semibold rounded-full focus:outline-none"
        >
          <option value="" disabled>
            Select a Province
          </option>
          {provinces.map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      {/* Vertical Line */}
      <div className="border-l-2 border-gray-300 h-8 mx-4"></div>

      {/* Date Section */}
      <div className="flex flex-col items-start">
        <div className="flex items-center">
          {/* Start Date Picker */}
          <div className="relative">
            <i className="fas fa-calendar-alt absolute left-3 top-3 text-gray-400"></i>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              placeholderText="Start Date"
              className="pl-10 p-3 text-base font-semibold text-gray-100 rounded-l-full focus:outline-none"
            />
          </div>

          {/* Vertical Line */}
          <div className="border-l-2 border-gray-300 mx-2 h-8"></div>

          {/* End Date Picker */}
          <div className="relative">
            <i className="fas fa-calendar-alt absolute left-3 top-3 text-gray-400"></i>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="pl-10 p-3 text-base font-semibold text-gray-900 rounded-r-full focus:outline-none"
            />
          </div>
        </div>
        {startDate && endDate && (
          <div className="text-gray-800 mt-2">
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-green-600 transition duration-300"
      >
        <i className="fas fa-search" />
      </button>
    </div>
  );
};

export default SearchTour;
