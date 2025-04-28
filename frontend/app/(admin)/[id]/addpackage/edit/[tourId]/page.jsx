"use client";

import React, { useRef, useState, useEffect } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useTourStore } from "@/store/tourStore";
import { useParams } from "next/navigation";
import { useReviewStore } from "@/store/reviewStore";
import { useRouter } from "next/navigation";
import { useItineraryStore } from "@/store/itinerariesStore";
import { useGalleryStore } from "@/store/useGalleryStore";

const getToday = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function EditTourPage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef(null);

  // Populate form fields from fetched tour
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

  const {
    updateTour,
    exists,
    checkTourId,
    isChecking,
    gallery,
    loading,
    fetchGallery,
    fetchTour,
    tour,
  } = useTourStore();

  const { fetchItinerariesByTourId, itineraries } = useItineraryStore();
  const { galleryImages, deleteImage } = useGalleryStore();

  const handleDelete = (fileName) => {
    deleteImage(params.tourId, fileName);
  };

  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itineraryList, setItineraryList] = useState([]);

  // Validate unique tour_id
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (formState.tour_id && formState.tour_id !== tour?.tour_id) {
        checkTourId(formState.tour_id);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [formState.tour_id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const handleDeleteItinerary = (index) => {
    setItineraryList((prev) => prev.filter((_, i) => i !== index));
  };
  const handleAddClick = () => fileInputRef.current?.click();

  const handleImageUpload = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (files.length + newImages.length + gallery.length > 10) {
      setError("Maximum 10 images allowed");
      return;
    }
    setNewImages((prev) => [...prev, ...files]);
    setError(null);
  };

  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index) => {
    console.log("Removing existing image at index:", index);

    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleExpand = (index) => {
    setItineraryList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  const handleItineraryChange = (index, field, value) => {
    setItineraryList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addNewItinerary = () => {
    setItineraryList((prev) => [
      ...prev,
      { name: "", description: "", date: "", time: "", expanded: true },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData();

      Object.entries(formState).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      newImages.forEach((image) => {
        formData.append("files", image);
      });

      formData.append("itineraries", JSON.stringify(itineraryList));

      const updatedTour = await updateTour(params.tourId, formData);

      alert("Tour updated successfully!");
    } catch (err) {
      console.error("Error updating tour:", err);
      setError(err.message || "Failed to update tour");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch tour, gallery, itineraries
  useEffect(() => {
    if (params?.tourId) {
      fetchTour(params.tourId);
      fetchGallery(params.tourId);
      fetchItinerariesByTourId(params.tourId);
    }
  }, [params?.tourId]);

  useEffect(() => {
    if (tour) {
      setFormState({
        tour_id: tour.tour_id || "",
        tour_name: tour.tour_name || "",
        description: tour.description || "",
        price: tour.price || "",
        start_location: tour.start_location || "",
        first_destination: tour.first_destination || "",
        second_destination: tour.second_destination || "",
        startDate: tour.startDate
          ? new Date(tour.startDate).toISOString().split("T")[0]
          : getToday(), // Ensure the start date is either the fetched date or today's date
        endDate: tour.endDate
          ? new Date(tour.endDate).toISOString().split("T")[0]
          : getToday(), // Ensure the end date is either the fetched date or today's date
        status: tour.status || "",
        overview: tour.overview || "",
        category: tour.category || "66107b6f9f06c25112345678",
        location: tour.location || "66107b6f9f06c25112345679",
        limit: tour.limit || "",
      });
    }
  }, [tour]);

  // Populate itineraryList from fetched itineraries
  useEffect(() => {
    if (itineraries?.length) {
      setItineraryList(
        itineraries.map((item) => ({
          name: item.name || "",
          description: item.description || "",
          date: item.date
            ? new Date(item.date).toISOString().split("T")[0]
            : getToday(), // Ensure the itinerary date is either the fetched date or today's date
          time: item.time || "",
          expanded: false,
        }))
      );
    }
  }, [itineraries]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md space-y-6 text-[#092C4C]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Update Tour</h2>
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
            disabled={images.length + newImages.length >= 10}
            className={`text-sm text-gray-800 font-medium px-5 py-2 rounded-md border-2 ${
              images.length + newImages.length >= 10
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
            disabled={images.length + newImages.length >= 10}
          />

          {/* Existing images */}
          {gallery.map((img, idx) => (
            <div key={`existing-${idx}`} className="relative flex-shrink-0">
              <img
                src={img.url || img}
                alt={`preview-${idx}`}
                className="h-16 w-28 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleDelete(img)}
                className="absolute top-[-4px] right-[-4px] bg-black rounded-full shadow text-red-500"
              >
                <IoCloseCircleSharp className="cursor-pointer text-base" />
              </button>
            </div>
          ))}

          {/* New images */}
          {newImages.map((img, idx) => (
            <div key={`new-${idx}`} className="relative flex-shrink-0">
              <img
                src={URL.createObjectURL(img)}
                alt={`preview-${idx}`}
                className="h-16 w-28 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleDelete(img)}
                className="absolute top-[-4px] right-[-4px] bg-black rounded-full shadow text-red-500"
              >
                <IoCloseCircleSharp className="cursor-pointer text-base" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of your form remains the same */}
      {/* Tour ID and Name */}
      <div className="grid grid-cols-2 gap-3">
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
          {isChecking && (
            <p className="text-blue-500 text-sm mt-1">Checking...</p>
          )}
          {!isChecking &&
            exists === true &&
            formState.tour_id !== tour?.tour_id && (
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
            min={getToday()} // Ensure start date is not earlier than today
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
            min={formState.startDate || getToday()} // Ensure end date is not earlier than start date
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
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, price: e.target.value }))
            }
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

        {itineraryList.map((item, index) => (
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
                <span className="text-gray-500 text-sm">
                  {item.date || "No Date"}
                </span>
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
                    value={item.name}
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
                    value={item.description}
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

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={item.time}
                    onChange={(e) =>
                      handleItineraryChange(index, "time", e.target.value)
                    }
                    required
                    className="w-full border px-2 py-3 rounded-md text-sm bg-blue-100 border-[#EAEEF4]"
                  />
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
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-full shadow-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Updating..." : "Update Tour"}
          </button>
        </div>
      </div>
    </div>
  );
}
