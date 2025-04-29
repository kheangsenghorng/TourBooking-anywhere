"use client";

import React, { useRef, useState, useEffect } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useTourStore } from "@/store/tourStore";
import { useParams } from "next/navigation";


const getToday = () => {
  const t = new Date();
  const yyyy = t.getFullYear();
  const mm = String(t.getMonth() + 1).padStart(2, "0");
  const dd = String(t.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function CreateTourPage() {
  const params = useParams();
  const { fetchTours, tours, createTour, exists, checkTourId, isChecking } =
    useTourStore();

  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [filterTourId, setFilterTourId] = useState("");

  const [formState, setFormState] = useState({
    tour_id: "",
    tour_name: "",
    description: "",
    price: "",
    start_location: "",
    first_destination: "",
    second_destination: "",
    startDate: "",
    endDate: "",
    status: "",
    overview: "",
    category: "66107b6f9f06c25112345678",
    location: "66107b6f9f06c25112345679",
    limit: "",
  });

  const [itineraries, setItineraries] = useState([
    {
      name: "", // Initialize with empty string
      description: "", // Initialize with empty string
      date: "", // Initialize with empty string or default value
      startTime: "",
      endTime: "", // Initialize with empty string
      expanded: true, // Assume this field is for expanding the itinerary in UI
    },
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (formState.tour_id) {
        checkTourId(formState.tour_id);
      }
      fetchTours(params.id);
    }, 500);
    return () => clearTimeout(timeout);
  }, [formState.tour_id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteItinerary = (index) => {
    setItineraries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddClick = () => fileInputRef.current?.click();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 10) {
      setError("Maximum 10 images allowed");
      return;
    }
    setImages((prev) => [...prev, ...files]);
    setError(null);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleExpand = (index) => {
    setItineraries((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  // Handle changes to individual itinerary fields
  const handleItineraryChange = (index, field, value) => {
    setItineraries((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // Add a new itinerary with initialized fields
  const addNewItinerary = () => {
    setItineraries((prev) => [
      ...prev,
      {
        name: "", // Initialize with empty string
        description: "", // Initialize with empty string
        date: "", // Initialize with empty string or default value
        startTime: "",
        endTime: "", // Initialize with empty string
        expanded: true, // Assume this field is for expanding the itinerary in UI
      },
    ]);
  };
  const filteredTours = tours?.filter((tour) =>
    tour.tour_id.toLowerCase().includes(formState.tour_id.toLowerCase())
  );

  const handleSelectTourId = (selectedTourId) => {
    // Directly set the tour_id into formState
    setFormState((prevState) => ({
      ...prevState,
      tour_id: selectedTourId,
      tour_name: filteredTours.find((tour) => tour.tour_id === selectedTourId)
        ?.tour_name, // Set the tour_name based on the selected tour_id
    }));
  };

  const validateForm = () => {
    if (!formState.tour_name) {
      setError("Tour name is required");
      return false;
    }
    if (!images) {
      setError("Tour images are required");
      return false;
    }
    if (!formState.tour_id) {
      setError("Tour ID is required");
      return false;
    }
    if (!formState.startDate || !formState.endDate) {
      setError("Start and end dates are required");
      return false;
    }
    if (new Date(formState.endDate) < new Date(formState.startDate)) {
      setError("End date must be after start date");
      return false;
    }
    if (!formState.price || isNaN(formState.price)) {
      setError("Valid price is required");
      return false;
    }
    if (!formState.limit || isNaN(formState.limit)) {
      setError("Valid participant limit is required");
      return false;
    }
    if (itineraries.length === 0) {
      setError("At least one itinerary is required");
      return false;
    }
    if (itineraries.some((item) => !item.name || !item.date)) {
      setError("All itineraries must have a name and date");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    const formData = new FormData();

    Object.entries(formState).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    images.forEach((image) => formData.append("files", image));
    formData.append("itineraries", JSON.stringify(itineraries));

    setIsLoading(true);

    await createTour(formData, params.id);
    console.log(params.id);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md space-y-6 text-[#092C4C]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Create Tour</h2>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Tour Images */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Tour Images (Max 10)
        </label>
        <div className="flex gap-2 mt-2 overflow-x-scroll hide-scrollbar pt-1">
          <button
            type="button"
            onClick={handleAddClick}
            disabled={images.length >= 10}
            className={`text-sm text-gray-800 font-medium px-5 py-2 rounded-md border-2 ${
              images.length >= 10
                ? "bg-gray-200 border-gray-300 cursor-not-allowed"
                : "bg-[#F6FAFD] border-[#EAEEF4]"
            }`}
          >
            ADD
          </button>
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            disabled={images.length >= 10}
          />
          {images.map((img, idx) => (
            <div key={idx} className="relative flex-shrink-0">
              <img
                src={URL.createObjectURL(img)}
                alt={`preview-${idx}`}
                className="h-16 w-28 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-[-4px] right-[-4px] bg-black rounded-full shadow text-red-500"
              >
                <IoCloseCircleSharp className="cursor-pointer text-base" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tour ID and Name */}
      <div className="grid grid-cols-2 gap-3">
        {/* <div>
          <label className="block text-md font-medium mb-1">Tour ID *</label>
          <input
            type="text"
            name="tour_id"
            value={formState.tour_id}
            onChange={handleFormChange}
            placeholder="Tour ID (e.g., THO-000010)"
            required
            className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          />
          {/* Feedback messages */}
        {/* {isChecking && (
            <p className="text-blue-500 text-sm mt-1">Checking...</p>
          )}

          {!isChecking && exists === true && (
            <p className="text-red-500 text-sm mt-1">
              This Tour ID is already taken.
            </p>
          )}

          {!isChecking && exists === false && formState.tour_id && (
            <p className="text-green-500 text-sm mt-1">
              This Tour ID is available.
            </p>
          )}
        </div> */}
        <div>
          <label className="block text-md font-medium mb-1">Tour ID *</label>
          <input
            type="text"
            name="tour_id"
            value={formState.tour_id}
            onChange={handleFormChange}
            placeholder="Tour ID (e.g., THO-000010)"
            required
            className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          />
          {/* Filtered Tours Preview */}
          {/* Matching Tours Dropdown */}
          {formState.tour_id && filteredTours?.length > 0 && (
            <div className="mt-2 border rounded-md p-3 bg-white shadow-sm">
              <p className="text-sm font-semibold mb-2">Matching Tours:</p>
              <ul className="text-sm space-y-1">
                {filteredTours.map((tour) => (
                  <li
                    key={tour._id}
                    onClick={() => handleSelectTourId(tour.tour_id)}
                    className="text-gray-700 cursor-pointer hover:text-blue-500"
                  >
                    {tour.tour_id} -{tour.tour_name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Feedback messages */}
          {isChecking && (
            <p className="text-blue-500 text-sm mt-1">Checking...</p>
          )}

          {!isChecking && exists === true && (
            <p className="text-red-500 text-sm mt-1">
              This Tour ID is already taken.
            </p>
          )}

          {!isChecking && exists === false && formState.tour_id && (
            <p className="text-green-500 text-sm mt-1">
              This Tour ID is available.
            </p>
          )}
        </div>

        <div>
          <label className="block text-md font-medium mb-1">Tour Name *</label>
          <input
            type="text"
            name="tour_name"
            value={formState.tour_name}
            onChange={handleFormChange}
            placeholder="Tour Name"
            required
            className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-md font-medium mb-1">Start Date *</label>
          <input
            type="date"
            name="startDate"
            value={formState.startDate}
            onChange={handleFormChange}
            min={getToday()}
            required
            className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          />
        </div>
        <div>
          <label className="block text-md font-medium mb-1">End Date *</label>
          <input
            type="date"
            name="endDate"
            value={formState.endDate}
            onChange={handleFormChange}
            min={formState.startDate}
            required
            className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          />
        </div>
      </div>

      {/* Locations */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-md font-medium mb-1">
            Start Location *
          </label>
          <input
            type="text"
            name="start_location"
            value={formState.start_location}
            onChange={handleFormChange}
            placeholder="Starting location"
            required
            className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          />
        </div>
        <div>
          <label className="block text-md font-medium mb-1">
            First Destination *
          </label>
          <input
            type="text"
            name="first_destination"
            value={formState.first_destination}
            onChange={handleFormChange}
            placeholder="First destination"
            required
            className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          />
        </div>
        <div>
          <label className="block text-md font-medium mb-1">
            Second Destination
          </label>
          <input
            type="text"
            name="second_destination"
            value={formState.second_destination}
            onChange={handleFormChange}
            placeholder="Second destination"
            className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          />
        </div>
      </div>

      {/* Pricing and Capacity */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-md font-medium mb-1">Price ($) *</label>
          <input
            type="number"
            name="price"
            value={formState.price}
            onChange={handleFormChange}
            placeholder="Tour price"
            min="0"
            step="0.01"
            required
            className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          />
        </div>
        <div>
          <label className="block text-md font-medium mb-1">
            Participant Limit *
          </label>
          <input
            type="number"
            name="limit"
            value={formState.limit}
            onChange={handleFormChange}
            placeholder="Max participants"
            min="1"
            required
            className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          />
        </div>
      </div>

      {/* Special Status */}
      {/* <div>
        <label className="block text-md font-medium mb-1">Special Status</label>
        <select
          name="specialStatus"
          value={formState.specialStatus}
          onChange={handleFormChange}
          className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
        >
          <option value="">None</option>
          <option value="Special Offer">Special Offer</option>
          <option value="Sold Out">Sold Out</option>
        </select>
      </div> */}

      {/* Status (required) */}
      <div>
        <label className="block text-md font-medium mb-1">Status</label>
        <select
          name="status"
          value={formState.status}
          onChange={handleFormChange}
          className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          required
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="Ongoing">Ongoing</option>
          <option value="Full">Full</option>
          <option value="Close">Close</option>
        </select>
      </div>

      {/* Category and Location IDs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-md font-medium mb-1">Category ID</label>
          <input
            type="text"
            name="category"
            value={formState.category}
            onChange={handleFormChange}
            placeholder="Category ID"
            className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          />
        </div>
        <div>
          <label className="block text-md font-medium mb-1">Location ID</label>
          <input
            type="text"
            name="location"
            value={formState.location}
            onChange={handleFormChange}
            placeholder="Location ID"
            className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          />
        </div>
      </div>

      {/* Description and Overview */}
      <div>
        <label className="block text-md font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formState.description}
          onChange={handleFormChange}
          rows="3"
          className="w-full border-2 px-2 py-1 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          placeholder="Short description..."
        ></textarea>
      </div>

      <div>
        <label className="block text-md font-medium mb-1">Overview *</label>
        <textarea
          name="overview"
          value={formState.overview}
          onChange={handleFormChange}
          rows="5"
          required
          className="w-full border-2 px-2 py-1 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          placeholder="Detailed tour overview..."
        ></textarea>
      </div>

      {/* Itineraries */}
      <div>
        <h3 className="text-md font-semibold mb-2">Itinerary *</h3>
        {itineraries.map((item, index) => (
          <div
            key={index}
            className="bg-[#F6FAFD] border-2 rounded-lg px-4 py-3 mb-3 shadow-sm"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div className="text-gray-800 font-medium mr-1 flex items-center gap-2">
                <span>{item.name || "Untitled Itinerary"}</span>
                <span className="text-gray-500 text-sm">{item.date}</span>
              </div>

              <div className="flex items-center space-x-3 text-gray-400">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteItinerary(index);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
                <span className="mr-2">{item.expanded ? "▲" : "▼"}</span>
              </div>
            </div>

            {item.expanded && (
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Itinerary Name *
                  </label>
                  <input
                    type="text"
                    value={item.name || ""}
                    onChange={(e) =>
                      handleItineraryChange(index, "name", e.target.value)
                    }
                    required
                    className="w-full border px-2 py-3 rounded-md text-sm bg-blue-100 border-[#EAEEF4]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Itinerary Description
                  </label>
                  <textarea
                    value={item.description || ""}
                    onChange={(e) =>
                      handleItineraryChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full border px-2 py-3 rounded-md text-sm bg-blue-100 border-[#EAEEF4]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) =>
                      handleItineraryChange(index, "date", e.target.value)
                    }
                    min={formState.startDate}
                    max={formState.endDate}
                    required
                    className="w-full border px-2 py-3 rounded-md text-sm bg-blue-100 border-[#EAEEF4]"
                  />
                </div>
                <div className="flex gap-4">
                  {/* Start Time */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Start Time *
                    </label>
                    <input
                      type="time"
                      value={item.startTime || ""}
                      onChange={(e) =>
                        handleItineraryChange(
                          index,
                          "startTime",
                          e.target.value
                        )
                      }
                      required
                      className="w-full border px-2 py-3 rounded-md text-sm bg-blue-100 border-[#EAEEF4]"
                    />
                  </div>

                  {/* End Time */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      End Time *
                    </label>
                    <input
                      type="time"
                      value={item.endTime || ""}
                      onChange={(e) =>
                        handleItineraryChange(index, "endTime", e.target.value)
                      }
                      required
                      className="w-full border px-2 py-3 rounded-md text-sm bg-blue-100 border-[#EAEEF4]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={addNewItinerary}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-full shadow-md"
          >
            Add New Itinerary
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md"
          >
            {isLoading ? "Creating..." : "Submit Tour"}
          </button>
        </div>
      </div>
    </div>
  );
}
