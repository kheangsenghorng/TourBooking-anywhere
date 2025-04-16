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
  Check,
  MessageSquare,
} from "lucide-react";
import { useEffect } from "react";
import { useReviewStore } from "@/store/reviewStore";
import { Button } from "@/components/ui/button";

export default function TourFeedbackAlt() {
  const { id, feedbackId } = useParams();
  const { reviews, getReviewsByUser, isLoading, error } = useReviewStore();

  useEffect(() => {
    if (id) {
      getReviewsByUser(id);
    }
  }, [id, getReviewsByUser]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-center"> {error}</p>;

  return (
    <div className="max-w-4xl p-4">
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
                  <span className="text-xs font-semibold">
                    {tour.averageRating}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <div className="sm:w-1/3 h-48 sm:h-auto relative rounded-xl overflow-hidden">
                  <Image
                    src={
                      tour?.tourId.galleryImages[0] ||
                      ("/placeholder.svg?height=300&width=300" ||
                        "/placeholder.svg")
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
                    <Link
                      href={`/${id}/tour-detail/${tour.tourId?._id}#feedback`}
                    >
                      <div className="flex items-center text-white text-sm text-nowrap">
                        <MessageCircle className="w-3.5 h-3.5 mr-1" />
                        {tour.totalReviews}
                      </div>
                    </Link>
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
                      {tour.review} {tour.text}
                    </p>
                  </div>

                  <div className="mt-auto">
                    {tour.rating ? (
                      <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-green-100 p-2 rounded-full mr-3">
                              <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Thank you for your feedback!
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                Your rating helps improve our services
                              </p>
                            </div>
                          </div>

                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= Math.round(tour.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={`/${id}/tour-detail/${tour.tourId?._id}/feedback`}
                      >
                        <Button className="w-full flex items-center justify-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Leave Feedback
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews.length > 5 && (
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
      )}
    </div>
  );
}
