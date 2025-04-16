"use client"

import { useState } from "react"

import { Check, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function TourItinerary() {
  const [showEndInfo, setShowEndInfo] = useState(false)
  // Simulating current date during the tour
    //const currentDate = new Date("2025-02-18T16:30:00") // Example date during the tour

  const itineraryData = [
    {
      day: "01",
      date: "17 Feb 2025",
      title: "Arrival and City Orientation",
      description:
        "Explore Wat Phnom, the Royal Palace, and the Silver Pagoda, then enjoy an evening stroll along the Riverside.",
      isCompleted: true,
      completedAt: "17 Feb 2025, 19:45",
      startTime: "08:00",
      endTime: "20:00",
    },
    {
      day: "02",
      date: "18 Feb 2025",
      title: "Historical and Cultural Insights",
      description:
        "Visit Tuol Sleng Genocide Museum and Choeung Ek Killing Fields for a somber look at Cambodia's history, followed by shopping at the Russian Market.",
      isCompleted: true,
      completedAt: "18 Feb 2025, 16:30",
      startTime: "09:00",
      endTime: "17:00",
      inProgress: true,
    },
    {
      day: "03",
      date: "19 Feb 2025",
      title: "Mekong River Adventure",
      description:
        "Take a day trip to Koh Dach (Silk Island) to experience village life, silk weaving, and a relaxing Mekong sunset cruise.",
      isCompleted: false,
      startTime: "08:30",
      endTime: "14:00",
    },
    {
      day: "04",
      date: "19 Feb 2025",
      title: "Mekong River Adventure",
      description:
        "Take a day trip to Koh Dach (Silk Island) to experience village life, silk weaving, and a relaxing Mekong sunset cruise.",
      isCompleted: false,
      startTime: "15:00",
      endTime: "18:00",
      isLastDay: true,
    },
  ]

  const startDate = new Date("2025-02-17")
  const endDate = new Date("2025-02-19")
  const endTime = "18:00" // Assuming the tour ends at 6 PM

  const calculateDuration = () => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const TourEndInfo = () => (
    <Card className="mt-4 border-blue-100 ">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-blue-700">Tour End Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Start Date:</span>
            <span className="font-medium">17 Feb 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">End Date:</span>
            <span className="font-medium">19 Feb 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">End Time:</span>
            <span className="font-medium">{endTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Duration:</span>
            <span className="font-medium">{calculateDuration()} days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Last Activity:</span>
            <span className="font-medium">Mekong River Adventure</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tour Progress:</span>
            <span className="font-medium">
              {Math.round((itineraryData.filter((item) => item.isCompleted).length / itineraryData.length) * 100)}%
              Complete
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="text-gray-500 mb-1">Time Remaining:</div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${Math.round(
                      (itineraryData.filter((item) => item.isCompleted).length / itineraryData.length) * 100,
                    )}%`,
                  }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium">
                {itineraryData.length - itineraryData.filter((item) => item.isCompleted).length} activities left
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium text-gray-800">Itinerary</h1>
        </div>
        <div className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
          {Math.round((itineraryData.filter((item) => item.isCompleted).length / itineraryData.length) * 100)}% Complete
        </div>
        <div className="text-sm flex items-center gap-1 text-gray-500">
          <Pencil className="h-4 w-4" />
          <span>Phnom Penh - Kampot</span>
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          {itineraryData.map((item, index) => (
            <div key={index} className="flex mb-8 relative">
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`rounded-full h-10 w-10 flex items-center justify-center z-10 ${
                    item.isCompleted ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500 border border-gray-200"
                  }`}
                >
                  {item.isCompleted ? <Check className="h-5 w-5" /> : <span>{item.day}</span>}
                </div>
                {index < itineraryData.length - 1 && (
                  <div className="w-0.5 bg-gray-200 h-full absolute top-10 left-5 -ml-[1px]"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500 mb-1">{item.date}</div>
                <h3 className="font-medium text-gray-900 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {item.startTime} - {item.endTime}
                  </div>
                  {item.isCompleted && (
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      Completed at {item.completedAt}
                    </div>
                  )}
                  {item.inProgress && (
                    <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center">
                      <span className="h-2 w-2 bg-blue-500 rounded-full mr-1 animate-pulse"></span>
                      In progress
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showEndInfo && <TourEndInfo />}

        <div className="mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
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
                    <div className="font-medium">17 Feb 2025</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">End Date</div>
                    <div className="font-medium">19 Feb 2025</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">End Time</div>
                  <div className="font-medium">{endTime}</div>
                </div>

                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Last Activity</div>
                  <div className="font-medium">Mekong River Adventure</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Take a day trip to Koh Dach (Silk Island) to experience village life, silk weaving, and a relaxing
                    Mekong sunset cruise.
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Completion Status</div>
                  <div className="font-medium">
                    {Math.round((itineraryData.filter((item) => item.isCompleted).length / itineraryData.length) * 100)}
                    % of Tour Completed
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${Math.round(
                          (itineraryData.filter((item) => item.isCompleted).length / itineraryData.length) * 100,
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Completed Activities</div>
                  <div className="space-y-2 mt-2">
                    {itineraryData
                      .filter((item) => item.isCompleted)
                      .map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.title}</span>
                          <span className="text-green-600">{item.completedAt}</span>
                        </div>
                      ))}
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
  )
}
