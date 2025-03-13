"use client"

import { useState } from "react"

export default function FeedbackForm() {
  const [hotelName, setHotelName] = useState("")
  const [satisfaction, setSatisfaction] = useState(null)
  const [recommendation, setRecommendation] = useState(null)
  const [comment, setComment] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({ hotelName, satisfaction, recommendation, comment })
    alert("Thank you for your feedback!")
    // Reset form
    setHotelName("")
    setSatisfaction(null)
    setRecommendation(null)
    setComment("")
  }

  return (
    <div className="w-full bg-white p-8 rounded-lg shadow">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Travel <span className="text-green-500">With Us</span>
        </h1>
        <p className="text-gray-600">Thank you in advance for your feedback.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="hotelName" className="block text-sm font-medium mb-2">
            Name of Hotel
          </label>
          <input
            type="text"
            id="hotelName"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Grand Land Hotel"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Overall satisfaction with page <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">(1 = lowest and 5 = highest)</p>

          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setSatisfaction(rating)}
                className={`flex-1 py-2 px-4 border rounded-md ${
                  satisfaction === rating
                    ? "bg-green-50 border-green-500 text-green-700"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {rating} <span className="text-green-500">★</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            How likely are you to recommend Expedia to a friend or colleague?
          </label>
          <p className="text-xs text-gray-500 mb-2">(0 = not very likely and 10 = very likely)</p>

          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => setRecommendation(score)}
                className={`w-10 h-10 flex items-center justify-center border rounded-md ${
                  recommendation === score ? "bg-gray-200 border-gray-400" : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {score}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            Please include anything else you'd like us to know
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded h-32"
            placeholder="Enter your comment here"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  )
}

