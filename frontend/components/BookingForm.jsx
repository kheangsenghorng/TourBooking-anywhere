"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"; // Import Font Awesome icons

const BookingForm = () => {
  const [adults, setAdults] = useState(0);
  const [kids, setKids] = useState(0);
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false);
  const [roomQuantities, setRoomQuantities] = useState({
    "1 Bed Room": 0,
    "2 Beds Room": 0,
    "3 Beds Room": 0,
    "Big Room": 0,
  });

  const toggleGuestsDropdown = () => {
    setIsGuestsDropdownOpen((prev) => !prev);
  };

  const roomTypes = [
    {
      name: "1 Bed Room",
      details: "30sqm room, 1 Bed",
      price: 0,
      available: true,
      image: "/image/Hotel in Kep/1.jpg",
    },
    {
      name: "2 Beds Room",
      details: "40sqm room, 2 Bed",
      price: 50,
      available: true,
      image: "/image/Hotel in Kep/2.jpg",
    },
    {
      name: "3 Beds Room",
      details: "40sqm room, 3 Bed",
      price: 100,
      available: true,
      image: "/image/Hotel in Kep/3.jpg",
    },
    {
      name: "Big Room",
      details: "50sqm room, 3 Bed",
      price: 0,
      available: false,
      image: "/image/Hotel in Kep/5.jpg",
    },
  ];

  const totalPayment =
    adults * 125 +
    Object.entries(roomQuantities).reduce((total, [roomName, quantity]) => {
      const room = roomTypes.find((room) => room.name === roomName);
      return total + (room?.price || 0) * quantity;
    }, 0);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md">
      <h2 className="text-2xl font-bold mb-4">BOOK A TOUR</h2>
      <p className="text-gray-600 mb-6">
        You may fill the form below to reserve your tour
      </p>

      {/* Guests */}
      <div className="mb-6 relative">
        <label className="block font-semibold mb-2">Guests*</label>
        <div
          className="border rounded-lg p-4 cursor-pointer flex justify-between items-center"
          onClick={toggleGuestsDropdown}
        >
          <span>
            {adults} Adults, {kids} Kids
          </span>
          {isGuestsDropdownOpen ? (
            <FontAwesomeIcon
              icon={faChevronUp}
              className="w-5 h-5 text-gray-600"
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              className="w-5 h-5 text-gray-600"
            />
          )}
        </div>
        {isGuestsDropdownOpen && (
          <div className="absolute z-10 border rounded-lg p-4 bg-white w-full top-full mt-2 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span>Adults</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="w-8 h-8 flex items-center justify-center border rounded-lg"
                >
                  -
                </button>
                <span>{adults}</span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="w-8 h-8 flex items-center justify-center border rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Kids</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setKids(Math.max(0, kids - 1))}
                  className="w-8 h-8 flex items-center justify-center border rounded-lg"
                >
                  -
                </button>
                <span>{kids}</span>
                <button
                  onClick={() => setKids(kids + 1)}
                  className="w-8 h-8 flex items-center justify-center border rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Room Type */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Room Type*</label>
        <div className="border rounded-lg">
          {roomTypes.map((room) => (
            <div
              key={room.name}
              className={`flex justify-between items-center p-4 border-b last:border-b-0 ${
                room.available ? "" : "opacity-50 pointer-events-none"
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{room.name}</h3>
                  <p className="text-sm text-gray-600">{room.details}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setRoomQuantities((prev) => ({
                      ...prev,
                      [room.name]: Math.max(0, prev[room.name] - 1),
                    }))
                  }
                  className="w-8 h-8 flex items-center justify-center border rounded-lg"
                >
                  -
                </button>
                <span>{roomQuantities[room.name] || 0}</span>
                <button
                  onClick={() =>
                    setRoomQuantities((prev) => ({
                      ...prev,
                      [room.name]: prev[room.name] + 1,
                    }))
                  }
                  className="w-8 h-8 flex items-center justify-center border rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-2">Type</th>
              <th className="text-right pb-2">Quantity</th>
              <th className="text-right pb-2">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Guest</td>
              <td className="text-right py-2">{adults + kids}</td>
              <td className="text-right py-2">${adults * 125}</td>
            </tr>
            {Object.entries(roomQuantities).map(([roomName, quantity]) => {
              const room = roomTypes.find((room) => room.name === roomName);
              return (
                quantity > 0 && (
                  <tr key={roomName} className="border-b">
                    <td className="py-2">{roomName}</td>
                    <td className="text-right py-2">{quantity}</td>
                    <td className="text-right py-2">
                      ${room.price * quantity}
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center font-bold text-lg mb-4">
        <span>Total Payment</span>
        <span>${totalPayment}</span>
      </div>

      <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold">
        Book Now
      </button>
    </div>
  );
};

export default BookingForm;
