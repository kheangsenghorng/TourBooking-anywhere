"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const BookingForm = () => {
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(1);
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false);

  const toggleGuestsDropdown = () => {
    setIsGuestsDropdownOpen((prev) => !prev);
  };

  const totalPayment = (adults * 80.25) + (kids * 80.25);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm border">
      <h2 className="text-xl font-bold mb-2">
        FROM <span className="text-green-600">$80.25</span> <span className="text-sm font-normal">Per Person</span>
      </h2>
      <p className="text-gray-600 mb-4 text-sm">
        You may fill the form below to reserve your tour
      </p>

      {/* Guests */}
      <div className="mb-4 relative">
        <label className="block font-semibold mb-2 text-sm">Guests*</label>
        <div
          className="border rounded-lg px-4 py-3 cursor-pointer flex justify-between items-center text-sm"
          onClick={toggleGuestsDropdown}
        >
          <span>
            {adults.toString().padStart(2, "0")} Adults, {kids.toString().padStart(2, "0")} Kids
          </span>
          {isGuestsDropdownOpen ? (
            <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4 text-gray-600" />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-gray-600" />
          )}
        </div>
        {isGuestsDropdownOpen && (
          <div className="absolute z-10 border rounded-lg p-4 bg-white w-full top-full mt-2 shadow-lg">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span>Adults <span className="text-gray-500 text-xs">Ages 18 or above</span></span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="w-6 h-6 flex items-center justify-center border rounded-full text-lg"
                >
                  -
                </button>
                <span>{adults}</span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="w-6 h-6 flex items-center justify-center border rounded-full text-lg"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Kids <span className="text-gray-500 text-xs">Ages 2-17</span></span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setKids(Math.max(0, kids - 1))}
                  className="w-6 h-6 flex items-center justify-center border rounded-full text-lg"
                >
                  -
                </button>
                <span>{kids}</span>
                <button
                  onClick={() => setKids(kids + 1)}
                  className="w-6 h-6 flex items-center justify-center border rounded-full text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center font-bold text-lg mb-4">
        <span>Total Payment</span>
        <span className="text-2xl">${totalPayment.toFixed(2)}</span>
      </div>

      <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold">
        Book Now
      </button>
    </div>
  );
};

export default BookingForm;
