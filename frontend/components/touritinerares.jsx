"use client";

import { useEffect, useState } from "react";
import { Check, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { useTourStore } from "@/store/tourStore";

export default function TourItinerary() {
  const { tourId } = useParams();
  const [showEndInfo, setShowEndInfo] = useState(false);
  const { loading, error, fetchTour, tour, itineraries } = useTourStore();

  useEffect(() => {
    if (tourId) {
      fetchTour(tourId);
    }
  }, [tourId]);

  const startDate = tour?.startDate ? new Date(tour.startDate) : null;
  const endDate = tour?.endDate ? new Date(tour.endDate) : null;

  const formatDate = (date) =>
    date?.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const diff = Math.abs(endDate - startDate);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getCompletionPercent = () => {
    if (!itineraries?.length) return 0;
    const completed = itineraries.filter((item) => item.endDate).length;
    return Math.round((completed / itineraries.length) * 100);
  };

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error fetching itineraries: {error}
      </div>
    );
  }

  const TourEndInfo = () => (
    <Card className="mt-4 border-blue-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-blue-700">
          Tour End Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Start Date:</span>
            <span className="font-medium">{formatDate(startDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">End Date:</span>
            <span className="font-medium">{formatDate(endDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Duration:</span>
            <span className="font-medium">{calculateDuration()} days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Last Activity:</span>
            <span className="font-medium">
              {itineraries[itineraries.length - 1]?.name || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tour Progress:</span>
            <span className="font-medium">
              {getCompletionPercent()}% Complete
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-2 flex-wrap">
        <h1 className="text-xl font-medium text-gray-800">Itinerary</h1>
        <div className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
          {getCompletionPercent()}% Complete
        </div>
        <div className="text-sm flex items-center gap-1 text-gray-500">
          <Pencil className="h-4 w-4" />
          <span>
            {tour?.start_location?.name || "N/A"}
            {tour?.first_destination?.name &&
              ` → ${tour.first_destination.name}`}
            {tour?.second_destination?.name &&
              ` → ${tour.second_destination.name}`}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          {itineraries.map((item, index) => {
            const formattedDate = item?.date
              ? new Date(item.date).toLocaleDateString("km-KH", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })
              : "";

            return (
              <div key={index} className="flex mb-8 relative">
                <div className="flex flex-col items-center mr-4">
                  <div
                    className={`rounded-full h-10 w-10 flex items-center justify-center z-10 ${
                      item.day
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}
                  >
                    {item.day ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  {index < itineraries.length - 1 && (
                    <div className="w-0.5 bg-gray-200 h-full absolute top-10 left-5 -ml-[1px]"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">
                    {formattedDate}
                  </div>
                  <h3 className="font-medium text-gray-900 text-lg">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {item.startTime} - {item.endTime}
                    </div>
                    {item.day && (
                      <>
                        <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          Completed at {item.day}
                        </div>
                        <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center">
                          <span className="h-2 w-2 bg-blue-500 rounded-full mr-1 animate-pulse"></span>
                          In progress
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showEndInfo && <TourEndInfo />}

        <div className="mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Check Tour End Time/Day
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tour End Information</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Start Date</div>
                    <div className="font-medium">{formatDate(startDate)}</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">End Date</div>
                    <div className="font-medium">{formatDate(endDate)}</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Last Activity</div>
                  <div className="font-medium">
                    {itineraries[itineraries.length - 1]?.name || "N/A"}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {itineraries[itineraries.length - 1]?.description || ""}
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Completion Status</div>
                  <div className="font-medium">
                    {getCompletionPercent()}% of Tour Completed
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${getCompletionPercent()}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">
                    Completed Activities
                  </div>
                  <div className="space-y-2 mt-2">
                    {itineraries
                      .filter((item) => {
                        const date = item?.date ? new Date(item.date) : null;
                        return (
                          date &&
                          (!startDate || date >= startDate) &&
                          (!endDate || date <= endDate)
                        );
                      })
                      .map((item, index) => {
                        const day = new Date(item.date).toLocaleDateString(
                          "km-KH",
                          {
                            weekday: "long",
                          }
                        );
                        return (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span>{item.name}</span>
                            <span
                              className={
                                tour.endDate
                                  ? "text-green-600"
                                  : "text-gray-500"
                              }
                            >
                              {day} {tour.endDate ? "✓" : ""}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <Button onClick={() => setShowEndInfo(true)} className="w-full">
                  Show End Info on Itinerary
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
