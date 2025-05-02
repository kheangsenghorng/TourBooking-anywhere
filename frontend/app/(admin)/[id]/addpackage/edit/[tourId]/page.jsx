"use client";

import React, { useRef, useState, useEffect } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useTourStore } from "@/store/tourStore";
import { useParams, useRouter } from "next/navigation";
import { useItineraryStore } from "@/store/itinerariesStore";
import { useGalleryStore } from "@/store/useGalleryStore";
import { useLocationStore } from "@/store/useLocationStore";
import { useCategoryStore } from "@/store/categoryStore";

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
    category: "",
    limit: "",
  });

  const [locationIds, setLocationIds] = useState({
    start_location: "",
    first_destination: "",
    second_destination: "",
  });
  const [activeField, setActiveField] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [itineraryList, setItineraryList] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState({
    start_location: false,
    first_destination: false,
    second_destination: false,
    category: false,
  });

  const {
    createTour,
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

  const {
    locations,
    fetchLocations,
    loading: locationsLoading,
    error: locationError,
  } = useLocationStore();
  
  const {
    categories,
    error: categoryError,
    loading: categoriesLoading,
    createCategory,
    fetchCategories,
    updateCategory,
    deleteCategory,
  } = useCategoryStore();

  const { fetchItinerariesByTourId, itineraries } = useItineraryStore();
  const { galleryImages, deleteImage, uploadFiles } = useGalleryStore();

  const handleDelete = async (fileName) => {
    try {
      await deleteImage(params.tourId, fileName);
      fetchGallery(params.tourId);
    } catch (error) {
      console.error("Error deleting image:", error);
      setError("Failed to delete image");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchLocations(), fetchCategories()]);
        if (params?.tourId) {
          await fetchTour(params.tourId);
          await fetchGallery(params.tourId);
          await fetchItinerariesByTourId(params.tourId);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message || "Failed to load data");
      } finally {
        setIsPageLoading(false);
      }
    };
    loadData();
  }, [params?.tourId]);

  const getFilename = (url) => {
    return url.split("/").pop();
  };

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

  const handleRemoveExistingImage = async (index) => {
    const item = gallery[index];
    if (!item) return;

    const fileName = getFilename(item.url || item);
    try {
      await handleDelete(fileName);
    } catch (error) {
      console.error("Error removing image:", error);
      setError("Failed to remove image");
    }
  };

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
      {
        name: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        expanded: true,
      },
    ]);
  };

  const filteredLocations = locations.filter((loc) =>
    activeField && formState[activeField] 
      ? loc.name.toLowerCase().includes(formState[activeField].toLowerCase())
      : []
  );

  const handleSelectLocation = (field, location) => {
    setFormState((prev) => ({
      ...prev,
      [field]: location.name,
    }));

    setLocationIds((prev) => ({
      ...prev,
      [field]: location._id,
    }));

    setShowSuggestions((prev) => ({
      ...prev,
      [field]: false,
    }));
    setActiveField(null);
  };

  const handleSelectCategory = (category) => {
    setFormState((prev) => ({
      ...prev,
      category: category.name,
    }));
    setCategoryId(category._id);
    setShowSuggestions((prev) => ({ ...prev, category: false }));
    setActiveField(null);
  };

  const filteredCategories = categories.filter((cat) =>
    formState.category 
      ? cat.name.toLowerCase().includes(formState.category.toLowerCase())
      : []
  );

  const validateForm = () => {
    if (!formState.tour_name) {
      setError("Tour name is required");
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
    if (itineraryList.length === 0) {
      setError("At least one itinerary is required");
      return false;
    }
    if (itineraryList.some((item) => !item.name || !item.date)) {
      setError("All itineraries must have a name and date");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Upload new images first
      if (newImages.length > 0) {
        const imageFormData = new FormData();
        newImages.forEach((image) => imageFormData.append("files", image));
        await uploadFiles(params.id, params.tourId, imageFormData);
      }

      // Prepare tour data
      const tourData = {
        ...formState,
        start_location: locationIds.start_location || tour?.start_location?._id,
        first_destination: locationIds.first_destination || tour?.first_destination?._id,
        second_destination: locationIds.second_destination || tour?.second_destination?._id,
        category: categoryId || tour?.category?._id,
        itineraries: itineraryList,
      };

      await updateTour(params.tourId, tourData);
      alert("Tour updated successfully!");
      router.push(`/${params.id}/addpackage`);
    } catch (err) {
      console.error("Error updating tour:", err);
      setError(err.message || "Failed to update tour");
    } finally {
      setIsLoading(false);
    }
  };

  // Update form state when tour data is loaded
  useEffect(() => {
    if (tour) {
      setFormState({
        tour_id: tour.tour_id || "",
        tour_name: tour.tour_name || "",
        description: tour.description || "",
        price: tour.price || "",
        start_location: tour.start_location?.name || "",
        first_destination: tour.first_destination?.name || "",
        second_destination: tour.second_destination?.name || "",
        startDate: tour.startDate
          ? new Date(tour.startDate).toISOString().split("T")[0]
          : getToday(),
        endDate: tour.endDate
          ? new Date(tour.endDate).toISOString().split("T")[0]
          : getToday(),
        status: tour.status || "",
        overview: tour.overview || "",
        category: tour.category?.name || "",
        limit: tour.limit || "",
      });

      setLocationIds({
        start_location: tour.start_location?._id || "",
        first_destination: tour.first_destination?._id || "",
        second_destination: tour.second_destination?._id || "",
      });

      setCategoryId(tour.category?._id || "");
    }
  }, [tour]);

  // Update itinerary list when itineraries are loaded
  useEffect(() => {
    if (itineraries?.length) {
      setItineraryList(
        itineraries.map((item) => ({
          name: item.name || "",
          description: item.description || "",
          date: item.date
            ? new Date(item.date).toISOString().split("T")[0]
            : getToday(),
          startTime: item.startTime || "",
          endTime: item.endTime || "",
          expanded: false,
        }))
      );
    }
  }, [itineraries]);

  if (isPageLoading) {
    return <div className="p-4">Loading...</div>;
  }

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
            disabled={gallery.length + newImages.length >= 10}
            className={`text-sm text-gray-800 font-medium px-5 py-2 rounded-md border-2 ${
              gallery.length + newImages.length >= 10
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
            disabled={gallery.length + newImages.length >= 10}
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
                onClick={() => handleRemoveExistingImage(idx)}
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
                alt={`preview-new-${idx}`}
                className="h-16 w-28 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveNewImage(idx)}
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
            min={formState.startDate || getToday()}
            required
            className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
          />
        </div>
      </div>

      {/* Locations */}
      <div className="grid grid-cols-3 gap-3">
        {['start_location', 'first_destination', 'second_destination'].map((field) => (
          <div key={field} className="relative">
            <label className="block text-md font-medium mb-1">
              {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              {field !== 'second_destination' ? ' *' : ''}
            </label>
            <input
              type="text"
              name={field}
              value={formState[field]}
              onChange={(e) => {
                handleFormChange(e);
                setActiveField(field);
                setShowSuggestions(prev => ({ ...prev, [field]: true }));
              }}
              onFocus={() => {
                setActiveField(field);
                setShowSuggestions(prev => ({ ...prev, [field]: true }));
              }}
              onBlur={() => setTimeout(() => {
                setShowSuggestions(prev => ({ ...prev, [field]: false }));
              }, 200)}
              placeholder={`${field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`}
              required={field !== 'second_destination'}
              className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
            />
            {showSuggestions[field] && filteredLocations.length > 0 && (
              <div className="absolute z-10 mt-1 w-full border rounded-md bg-white shadow-md max-h-48 overflow-auto">
                <ul className="text-sm divide-y divide-gray-100">
                  {filteredLocations.map((location) => (
                    <li
                      key={location._id}
                      onMouseDown={() => handleSelectLocation(field, location)}
                      className="px-3 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                    >
                      {location.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
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

      {/* Status */}
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

      {/* Category */}
      <div className="relative">
        <label className="block text-md font-medium mb-1">Category</label>
        <input
          type="text"
          name="category"
          value={formState.category}
          onChange={(e) => {
            handleFormChange(e);
            setActiveField('category');
            setShowSuggestions(prev => ({ ...prev, category: true }));
          }}
          onFocus={() => {
            setActiveField('category');
            setShowSuggestions(prev => ({ ...prev, category: true }));
          }}
          onBlur={() => setTimeout(() => {
            setShowSuggestions(prev => ({ ...prev, category: false }));
          }, 200)}
          placeholder="Category"
          className="w-full border-2 px-2 py-3 rounded-md text-sm bg-[#F6FAFD] border-[#EAEEF4]"
        />
        {showSuggestions.category && filteredCategories.length > 0 && (
          <div className="absolute z-10 mt-1 w-full border rounded-md bg-white shadow-md max-h-48 overflow-auto">
            <ul className="text-sm divide-y divide-gray-100">
              {filteredCategories.map((category) => (
                <li
                  key={category._id}
                  onMouseDown={() => handleSelectCategory(category)}
                  className="px-3 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        )}
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

                <div className="flex gap-4">
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