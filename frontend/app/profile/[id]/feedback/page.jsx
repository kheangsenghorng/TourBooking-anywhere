"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  MessageCircle,
} from "lucide-react";
import { useEffect } from "react";
import { useReviewStore } from "@/store/reviewStore";

export default function TourFeedbackAlt() {
  const { id, feedbackId } = useParams();
  const {
    reviews,
    getReviewsByUser,
    loading,
    error,
    totalUserReviews,
    reviewsByTour,
  } = useReviewStore();

  useEffect(() => {
    if (id) {
      getReviewsByUser(id);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-4xl p-4">
      {/* Tour Cards */}
      <div className="grid gap-6">
        {reviews.map((tour) => (
          <div
            key={tour._id}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    Tour
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {tour.tourId?.status}
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold">{tour.rating}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <div className="sm:w-1/3 h-48 sm:h-auto relative rounded-xl overflow-hidden">
                  <Image
                    src={
                      tour?.tourId?.galleryImages[0] ||
                      "/placeholder.svg?height=300&width=300"
                    }
                    alt={tour.tourId?.tour_name || "Tour Image"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center text-white text-sm">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {tour.tourId?.start_location}
                    </div>
                    <div className="flex items-center text-white text-sm text-nowrap">
                      <Link href={`/${id}/tour-detail/${tour.tourId?._id}#feedback`}>
                        <MessageCircle className="w-3.5 h-3.5 mr-1 " />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="sm:w-2/3 flex flex-col">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {tour.name}
                    </h2>

                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                      <span>
                        Tour Date:{" "}
                        <span className="font-medium text-gray-700">
                          {new Date(tour.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                          <span className="mx-1">•</span>
                          {new Date(tour.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </span>
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      We hope you enjoyed your tour experience. Your feedback
                      helps us improve our services and assists other travelers
                      in making informed decisions.
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="bg-white p-4 rounded-xl border border-gray-100">
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        Rate your experience:
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div key={star} className="relative group">
                              <input
                                type="radio"
                                name={`rating-${tour.id}`}
                                id={`rating-${tour.id}-${star}`}
                                value={star}
                                className="sr-only peer"
                                defaultChecked={
                                  star === Math.round(tour.rating)
                                } // Highlights the average
                              />
                              <label
                                htmlFor={`rating-${tour.id}-${star}`}
                                className="cursor-pointer block p-1"
                              >
                                <Star
                                  className={`w-7 h-7 
          text-gray-200 
          peer-checked:text-yellow-400 peer-checked:fill-yellow-400 
          ${
            star <= Math.round(tour.rating)
              ? "text-yellow-400 fill-yellow-400"
              : ""
          } 
          group-hover:text-yellow-400 group-hover:fill-yellow-400
        `}
                                />
                              </label>
                            </div>
                          ))}
                        </div>

                        <Link
                          href={`/profile/${id}/feedbackpage/${feedbackId}?type=tour`}
                        >
                          <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm">
                            Submit Feedback
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8">
        <nav
          className="inline-flex bg-white rounded-lg shadow-sm p-1"
          aria-label="Pagination"
        >
          <button className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Previous</span>
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-md bg-primary text-white font-medium">
            1
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Next</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
