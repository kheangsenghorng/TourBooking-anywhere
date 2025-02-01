import React from "react";

const Reviews = () => {
  const reviews = [
    {
      name: "Lalo Salamanca",
      date: "Mar 12 2022",
      rating: 4,
      review:
        "I recently stayed at Tree house Hotel, and it was a pleasant experience overall. I’d recommend Blissful Stay Resort for its comfort and ....",
      avatar: "/image/22.jpg",
    },
    {
      name: "Gus Fring",
      date: "Mar 12 2023",
      rating: 3,
      review:
        "I recently stayed at Tree house Hotel, and it was a pleasant experience overall. I’d recommend Blissful Stay Resort for its comfort and ....",
      avatar: "/image/21.jpg",
    },
    {
      name: "Werner Ziegler",
      date: "Mar 19 2024",
      rating: 4,
      review:
        "I recently stayed at Tree house Hotel, and it was a pleasant experience overall. I’d recommend Blissful Stay Resort for its comfort and ....",
      avatar: "/image/20.jpg",
    },
    {
      name: "Nacho",
      date: "Mar 12 2024",
      rating: 4,
      review:
        "I recently stayed at Tree house Hotel, and it was a pleasant experience overall. I’d recommend Blissful Stay Resort for its comfort and ....",
      avatar: "/image/2.png",
    },
  ];

  const ratings = [
    { stars: 5, count: 8765, percentage: "88%" },
    { stars: 4, count: 382, percentage: "8%" },
    { stars: 3, count: 144, percentage: "3%" },
    { stars: 2, count: 82, percentage: "2%" },
    { stars: 1, count: 62, percentage: "1%" },
  ];

  const renderStars = (count) =>
    Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          fill={index < count ? "#22C55E" : "#E5E7EB"}
          viewBox="0 0 24 24"
          className="w-4 h-4"
        >
          <path d="M12 2.5l3.09 6.26L22 9.74l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.61 2 9.74l6.91-1.02L12 2.5z" />
        </svg>
      ));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Title and Rating */}
      <div className="text-center mb-6 flex ">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="flex items-center justify-center text-green-500 text-2xl font-bold space-x-2 ps-4">
          <span>4.9</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#22C55E"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M12 2.5l3.09 6.26L22 9.74l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.61 2 9.74l6.91-1.02L12 2.5z" />
          </svg>
          <span className="text-gray-500 text-lg">(1210 reviews)</span>
        </div>
      </div>

      {/* Star Rating Breakdown */}
      <div className="mb-8">
        {ratings.map((rating, index) => (
          <div key={index} className="flex items-center space-x-4 mb-2">
            <div className="flex items-center">{renderStars(rating.stars)}</div>
            <div className="w-[280px]">
              <div className="bg-gray-200 h-1 rounded-full relative">
                <div
                  className="bg-green-500 h-1 rounded-full"
                  style={{ width: rating.percentage }}
                ></div>
              </div>
            </div>
            <span className="text-sm text-gray-500">{rating.count}</span>
          </div>
        ))}
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-4 rounded-lg flex space-x-4">
            <img
              src={review.avatar}
              alt={review.name}
              className="w-16 h-16 rounded-full border border-gray-300 shadow-lg object-cover"
            />
            <div>
              <h3 className="font-bold">{review.name}</h3>
              <p className="text-gray-400 text-sm">{review.date}</p>
              <div className="flex space-x-1 my-2">
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-600 text-sm">{review.review}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Reviews Button */}
      <div className="mt-6">
        <button className="px-4 py-2 text-black border-2 rounded-md hover:bg-green-500 hover:text-white transition">
          Show All 100 Reviews
        </button>
      </div>
    </div>
  );
};

export default Reviews;
