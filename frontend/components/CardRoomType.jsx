"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RoomTypes() {
  const rooms = [
    {
      id: 1,
      title: "1 Beds Room",
      description:
        "Enjoy stunning views of Angkor Wat from your room, with easy access to our great gym at your hotel.",
      size: "30sqm",
      bed: "1 Bed",
      amenities: ["Free Wi-Fi", "AC", "Bathtub"],
      price: "Free",
      availability: "Available",
      images: [
        "/image/Hotel in Kep/1.jpg",
        "/image/Hotel in Kep/2.jpg",
        "/image/Hotel in Kep/3.jpg",
      ],
    },
    {
      id: 2,
      title: "2 Beds Room",
      description:
        "Enjoy stunning views of Angkor Wat from your room, with easy access to our great gym at your hotel.",
      size: "30sqm",
      bed: "2 Beds",
      amenities: ["Free Wi-Fi", "AC", "Bathtub"],
      price: "Free",
      availability: "Available",
      images: [
        "/image/Hotel in Kep/2.jpg",
        "/image/Hotel in Kep/4.jpg",
        "/image/Hotel in Kep/5.jpg",
      ],
    },
    {
      id: 3,
      title: "3 Beds Room",
      description:
        "Enjoy stunning views of Angkor Wat from your room, with easy access to our great gym at your hotel.",
      size: "40sqm",
      bed: "3 Beds",
      amenities: ["Free Wi-Fi", "AC", "Bathtub"],
      price: "$45/Trip",
      availability: "Available",
      images: [
        "/image/Hotel in Kep/3.jpg",
        "/image/Hotel in Kep/6.jpg",
        "/image/Hotel in Kep/7.jpg",
      ],
    },
    {
      id: 4,
      title: "Big Room",
      description:
        "Enjoy stunning views of Angkor Wat from your room, with easy access to our great gym at your hotel.",
      size: "50sqm",
      bed: "2 Beds",
      amenities: ["Free Wi-Fi", "AC", "Bathtub"],
      price: "$50/Trip",
      availability: "Sold Out",
      images: [
        "/image/Hotel in Kep/5.jpg",
        "/image/Hotel in Kep/9.jpg",
        "/image/Hotel in Kep/10.jpg",
      ],
    },
  ];

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto">
      <Link href="#Rooms" id="Rooms">
        <h1 className="text-3xl font-bold mb-6">Room Types</h1>
      </Link>
      <div className="space-y-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}

function RoomCard({ room }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="rounded-lg border flex flex-col md:flex-row overflow-hidden">
      {/* Image Section */}
      <div className="md:w-1/3 relative">
        <ImageCarousel
          images={room.images}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
        <ThumbnailGallery
          images={room.images}
          currentImage={currentImage}
          onSelect={(index) => setCurrentImage(index)}
        />
      </div>

      {/* Details Section */}
      <div className="p-4 md:w-2/3">
        <h2 className="text-xl font-bold mb-2">{room.title}</h2>
        <p className="text-gray-700 mb-4">{room.description}</p>
        <RoomInfo label="Size" value={room.size} />
        <RoomInfo label="Bed" value={room.bed} />
        <RoomInfo label="Availability" value={room.availability} />
        <div className="flex space-x-2 mb-4">
          {room.amenities.map((amenity, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
            >
              {amenity}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-green-600">{room.price}</p>
          <button
            className={`px-4 py-2 text-sm font-semibold text-white rounded-md shadow-md ${
              room.availability === "Available"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={room.availability !== "Available"}
          >
            {room.availability === "Available" ? "Book Now" : "Sold Out"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ImageCarousel({ images, currentImage, setCurrentImage }) {
  const handleNextImage = () =>
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  const handlePrevImage = () =>
    setCurrentImage(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );

  return (
    <div className="relative w-full h-44">
      <Image
        src={images[currentImage]}
        alt="Room Image"
        layout="fill"
        objectFit="cover"
        className="rounded-lg p-1"
      />
      <button
        onClick={handlePrevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
      >
        ←
      </button>
      <button
        onClick={handleNextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
      >
        →
      </button>
    </div>
  );
}

function ThumbnailGallery({ images, currentImage, onSelect }) {
  return (
    <div className="flex justify-center rounded mt-2 space-x-2">
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`p-1 rounded-md ${
            currentImage === index ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <div className="relative w-20 h-20">
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </button>
      ))}
    </div>
  );
}

function RoomInfo({ label, value }) {
  return (
    <p className="text-sm text-gray-600 mb-2">
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
}
