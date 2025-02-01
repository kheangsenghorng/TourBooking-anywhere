"use client";

import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

// // Updated datasets with more items to test pagination
const highestPriceData = Array(1).fill({
  title: "Phnom Penh, Angkor Wat and Kompot",
  description:
    "Experience the dazzling lights of the Las Vegas Strip and beyond with a nighttime helicopter flight.",
  rating: 4.8,
  reviews: 112,
  duration: "2 Weeks",
  status: "Sold out",
  price: 1200,
  image: "/image/Hotel in kompot/1.jpg",
});

const lowestPriceData = Array(1).fill({
  title: "Budget Phnom Penh and Kompot",
  description: "Affordable tour from Phnom Penh to Kompot.",
  rating: 4.2,
  reviews: 80,
  duration: "1 Week",
  status: "Available",
  price: 500,
  image: "/image/Hotel in kompot/1.jpg",
});

export default function Home() {
  const [cards, setCards] = useState(highestPriceData);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;

  const handleHighestPriceClick = () => {
    setCards(highestPriceData);
    setCurrentPage(1); // Reset to the first page
  };

  const handleLowestPriceClick = () => {
    setCards(lowestPriceData);
    setCurrentPage(1); // Reset to the first page
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex justify-center border w-[400px] mx-auto rounded-full my-5">
        <button
          onClick={handleHighestPriceClick}
          className="px-6 py-2 border w-full rounded-full hover:bg-gray-100"
          aria-label="Highest Price"
        >
          Highest Price
        </button>
        <button
          onClick={handleLowestPriceClick}
          className="py-2 w-full rounded-full hover:bg-gray-100"
          aria-label="Lowest Price"
        >
          Lowest Price
        </button>
      </div>

      {/* Render paginated cards */}
      <div className="grid gap-6 px-4 w-full">
        {currentCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto"
          >
            <div className="flex">
              <img
                src={card.image}
                alt={card.title}
                className="w-48 h-48 object-cover"
              />
              <div className="p-4 relative flex w-[650px] flex-col border transition justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-4">{card.title}</h2>
                  <p className="text-gray-500">{card.description}</p>
                  <div className="mt-2 text-yellow-500">
                    {Array(Math.floor(card.rating)).fill("★").join("")}
                    <span className="ml-2 text-gray-600">
                      {card.rating} ({card.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">
                    <i className="fa-regular fa-clock"></i> {card.duration}
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      card.status === "Sold out"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {card.status}
                  </p>
                  <p className="text-lg font-bold">${card.price} / person</p>
                  <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
