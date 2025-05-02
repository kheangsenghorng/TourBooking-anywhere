'use client';

import React, { useState } from 'react';

export default function TourDetails() {
  const photos = [
    'https://placehold.co/300x200',
    'https://placehold.co/300x200/blue/white',
    'https://placehold.co/300x200/red/white'
  ];

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <section className="bg-gray-50 p-6 rounded-xl shadow">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">
            Tour Name: <span className="font-medium">Phnom Penh Tour</span>
          </h2>
          <p className="text-sm text-gray-500">Created At: Nov 17, 2024 08:00</p>
          <p className="mt-2">
            Date: Feb 17 - Feb 19, 2024 | Max Participants: 19/20
          </p>
          <p>
            Price: $80.24 | Cancellation:{' '}
            <span className="text-blue-600 font-semibold">True</span>
          </p>
        </div>

        {/* Click to open popup */}
        <button
          onClick={openModal}
          className="relative group focus:outline-none"
        >
          <img
            src={photos[0]}
            alt="Tour"
            className="rounded-xl group-hover:opacity-80 transition"
          />
          <span className="absolute bottom-2 left-2 bg-white text-black text-xs px-2 py-1 rounded shadow">
            +{photos.length - 1} More Photos
          </span>
        </button>
      </div>

      <p className="mt-4 text-gray-700 text-sm">
        Enjoy a seamless journey from Las Vegas to the stunning Grand Canyon West...
      </p>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 space-y-4 w-11/12 max-w-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold">Tour Photos</h3>
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Tour ${index}`}
                  className="rounded-xl object-cover w-full h-40"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
