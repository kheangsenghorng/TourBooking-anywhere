"use client"

import { FaUserSecret } from "react-icons/fa6"
import { IoIosArrowDropdown } from "react-icons/io"
import { FaBell } from "react-icons/fa"
import { BiEditAlt } from "react-icons/bi"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// These components would need to be created in your project
// I'm assuming they exist based on your imports
const TourDetailsGuest = () => (
  <div className="bg-white border border-gray-200 p-6 rounded-lg w-full space-y-4 h-fit shadow-sm">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-[#495560]">Guests</h2>
      <Button variant="outline" size="sm">
        Add Guest
      </Button>
    </div>
    <div className="space-y-3">
      <div className="flex items-center p-3 border border-gray-100 rounded-md hover:bg-gray-50">
        <div className="bg-gray-200 rounded-full p-2 mr-3">
          <FaUserSecret className="h-5 w-5 text-gray-700" />
        </div>
        <div>
          <h3 className="font-medium">John Doe</h3>
          <p className="text-sm text-[#7E92A2]">Confirmed • Paid</p>
        </div>
      </div>
      <div className="flex items-center p-3 border border-gray-100 rounded-md hover:bg-gray-50">
        <div className="bg-gray-200 rounded-full p-2 mr-3">
          <FaUserSecret className="h-5 w-5 text-gray-700" />
        </div>
        <div>
          <h3 className="font-medium">Jane Smith</h3>
          <p className="text-sm text-[#7E92A2]">Pending • Unpaid</p>
        </div>
      </div>
    </div>
  </div>
)

const TourDetailsIteneray = () => (
  <div className="bg-white border border-gray-200 p-6 rounded-lg w-full md:w-2/3 space-y-4 h-fit shadow-sm">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-[#495560]">Itinerary</h2>
      <Button variant="outline" size="sm">
        Edit Itinerary
      </Button>
    </div>
    <div className="space-y-4">
      <div className="border-l-2 border-blue-500 pl-4 py-2">
        <div className="flex justify-between">
          <h3 className="font-medium">Day 1 - Arrival and Welcome Dinner</h3>
          <span className="text-sm text-[#7E92A2]">March 20</span>
        </div>
        <p className="text-sm text-[#7E92A2] mt-1">
          Airport pickup, hotel check-in, and welcome dinner at Mountain View Restaurant.
        </p>
      </div>
      <div className="border-l-2 border-blue-500 pl-4 py-2">
        <div className="flex justify-between">
          <h3 className="font-medium">Day 2 - Hiking Trail Exploration</h3>
          <span className="text-sm text-[#7E92A2]">March 21</span>
        </div>
        <p className="text-sm text-[#7E92A2] mt-1">
          Breakfast at hotel, guided hiking tour, picnic lunch, and evening campfire.
        </p>
      </div>
      <div className="border-l-2 border-blue-500 pl-4 py-2">
        <div className="flex justify-between">
          <h3 className="font-medium">Day 3 - Wildlife Observation</h3>
          <span className="text-sm text-[#7E92A2]">March 22</span>
        </div>
        <p className="text-sm text-[#7E92A2] mt-1">
          Early morning wildlife spotting, photography workshop, and local cuisine dinner.
        </p>
      </div>
    </div>
  </div>
)

const TourDetailsDetail = () => (
  <div className="bg-white border border-gray-200 p-6 rounded-lg w-full md:w-1/3 space-y-4 h-fit shadow-sm">
    <h2 className="text-xl font-semibold text-[#495560]">Details</h2>
    <div className="space-y-4">
      <div className="flex justify-between border-b pb-2">
        <span className="text-[#7E92A2]">Difficulty Level</span>
        <span className="font-medium">Moderate</span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span className="text-[#7E92A2]">Accommodation</span>
        <span className="font-medium">Hotel & Camping</span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span className="text-[#7E92A2]">Meals Included</span>
        <span className="font-medium">Breakfast, Lunch</span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span className="text-[#7E92A2]">Transportation</span>
        <span className="font-medium">Private Van</span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span className="text-[#7E92A2]">Group Size</span>
        <span className="font-medium">5-12 People</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#7E92A2]">Languages</span>
        <span className="font-medium">English, Spanish</span>
      </div>
    </div>
  </div>
)

export default function TourDetailsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Sample tour data - replace with actual data from your API/database
  const tourData = {
    name: "Mountain Expedition",
    createdAt: "01/15/2023",
    startDate: "03/20/2023",
    endDate: "03/27/2023",
    maxParticipants: "12",
    price: "$1,299",
    overview:
      "Experience the breathtaking views of the mountain range with our expert guides. This 7-day expedition includes camping, hiking, and wildlife observation. Suitable for moderately experienced hikers with a good level of fitness.",
    imageUrl: "/placeholder.svg?height=192&width=256",
    status: "Active",
  }

  return (
    <div className="min-h-screen space-y-5 bg-[#F5F6FA] pb-8">
      <div className="sticky top-0 z-10">
        <div className="flex p-6 items-center h-16 justify-between bg-white shadow-sm">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold">Tour Details</h1>
            <BiEditAlt
              className={`text-xl cursor-pointer ${isEditing ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
              onClick={() => setIsEditing(!isEditing)}
            />
            {isEditing && <span className="text-sm text-blue-600 font-medium">Editing Mode</span>}
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <FaBell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="flex space-x-3 items-center">
              <div className="bg-gray-200 rounded-full p-2">
                <FaUserSecret className="h-6 w-6 text-gray-700" />
              </div>
              <div className="text-sm">
                <h1 className="font-medium">Gus Fring</h1>
                <h1 className="text-gray-500">Admin</h1>
              </div>
              <IoIosArrowDropdown className="text-[#5C5C5C] h-5 w-5 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 md:mx-10 pt-6">
        <div className="bg-white border border-gray-200 p-6 rounded-lg w-full space-y-6 h-fit shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 flex-1">
              <div>
                <h1 className="text-[#7E92A2] text-sm font-medium">Tour Name:</h1>
                <h1 className="text-[#495560] font-semibold">{tourData.name}</h1>
              </div>
              <div>
                <h1 className="text-[#7E92A2] text-sm font-medium">Created At:</h1>
                <h1 className="text-[#495560] font-semibold">{tourData.createdAt}</h1>
              </div>
              <div>
                <h1 className="text-[#7E92A2] text-sm font-medium">Start Date:</h1>
                <h1 className="text-[#495560] font-semibold">{tourData.startDate}</h1>
              </div>
              <div>
                <h1 className="text-[#7E92A2] text-sm font-medium">End Date:</h1>
                <h1 className="text-[#495560] font-semibold">{tourData.endDate}</h1>
              </div>
              <div>
                <h1 className="text-[#7E92A2] text-sm font-medium">Maximum Participants:</h1>
                <h1 className="text-[#495560] font-semibold">{tourData.maxParticipants}</h1>
              </div>
              <div>
                <h1 className="text-[#7E92A2] text-sm font-medium">Price:</h1>
                <h1 className="text-[#495560] font-semibold">{tourData.price}</h1>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={tourData.imageUrl || "/placeholder.svg"}
                alt={tourData.name}
                width={256}
                height={192}
                className="w-full lg:w-auto h-48 rounded-xl object-cover"
              />
              <span
                className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  tourData.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : tourData.status === "Draft"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {tourData.status}
              </span>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-4">
              <p className="text-[#495560]">{tourData.overview}</p>
            </TabsContent>
            <TabsContent value="inclusions" className="pt-4">
              <ul className="list-disc pl-5 space-y-2 text-[#495560]">
                <li>Professional English-speaking guide</li>
                <li>7 nights accommodation (3 nights hotel, 4 nights camping)</li>
                <li>All breakfasts and lunches</li>
                <li>Transportation between locations</li>
                <li>All permits and entrance fees</li>
                <li>Camping equipment (tents, sleeping bags)</li>
              </ul>
            </TabsContent>
            <TabsContent value="notes" className="pt-4">
              <p className="text-[#495560]">
                Participants should bring appropriate hiking boots, weather-appropriate clothing, personal medications,
                and a camera. A detailed packing list will be provided upon booking. Tour may be modified due to weather
                conditions or other factors.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mx-4 md:mx-10 space-y-6 md:space-y-0 md:space-x-6 mt-6">
        <TourDetailsGuest />
      </div>

      <div className="flex flex-col md:flex-row mx-4 md:mx-10 space-y-6 md:space-y-0 md:space-x-6 pb-5">
        <TourDetailsIteneray />
        <TourDetailsDetail />
      </div>
    </div>
  )
}

