"use client";

import { useState } from "react";
import { Search, Edit2, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TourDetails() {
  const [activeTab, setActiveTab] = useState("details");

  const tourData = {
    name: "Phnom Penh Tour",
    createdAt: "Nov 17, 2024 08:00",
    startDate: "Feb 17",
    endDate: "Feb 19, 2024",
    maxParticipants: "19/20",
    price: "$80.24",
    cancellation: true,
    overview:
      "Enjoy a seamless journey from Las Vegas to the stunning Grand Canyon West, one of the most iconic destinations in the world. Relax in an air-conditioned vehicle and spend your day marveling at the awe-inspiring views from Eagle Point and Guano Point, and immerse yourself in the rich culture of the Hualapai Tribe. For an even more unforgettable experience, customize your tour by adding a Grand Canyon Skywalk ticket, giving you a thrilling perspective over the canyon's edge",
  };

  const itinerary = [
    {
      date: "17 Feb 2025",
      title: "Arrival and City Orientation",
      description:
        "Explore West Phnom, the Royal Palace, and the Silver Pagoda. Then enjoy an evening meal along the riverside.",
    },
    {
      date: "18 Feb 2025",
      title: "Historical and Cultural Insights",
      description:
        "Visit Tuol Sleng Genocide Museum and Choeung Ek Killing Fields for a somber look at Cambodia's history, followed by shopping at the Russian Market.",
    },
    {
      date: "19 Feb 2025",
      title: "Mekong River Adventure",
      description:
        "Take a day trip to Koh Dach (Silk Island) to experience village life, silk weaving, and a relaxing Mekong sunset cruise.",
    },
    {
      date: "19 Feb 2025",
      title: "Mekong River Adventure",
      description:
        "Take a day trip to Koh Dach (Silk Island) to experience village life, silk weaving, and a relaxing Mekong sunset cruise.",
    },
  ];

  const guests = [
    {
      id: "#0101",
      name: "George R.R Martin",
      email: "George@gmail.com",
      bookDate: "Oct 28th, 2020",
      guests: "4 Adults, 2 Kids",
      accessible: false,
    },
    {
      id: "#0103",
      name: "Markus Suzuk",
      email: "Markus@gmail.com",
      bookDate: "Oct 28th, 2020",
      guests: "2 Adult, 0 Kid",
      accessible: false,
    },
    {
      id: "#0112",
      name: "Ankur Warikoo",
      email: "Ankur@gmail.com",
      bookDate: "Oct 28th, 2020",
      guests: "2 Adults, 0 Kid",
      accessible: false,
    },
    {
      id: "#0231",
      name: "George R.R Martin",
      email: "Martin@gmail.com",
      bookDate: "Oct 28th, 2020",
      guests: "2 Adults, 1 Kids",
      accessible: false,
    },
    {
      id: "#0231",
      name: "Ankur Warikoo",
      email: "Ankur@gmail.com",
      bookDate: "Oct 28th, 2020",
      guests: "3 Adults, 0 Kid",
      accessible: false,
    },
    {
      id: "#0231",
      name: "Ankur Warikoo",
      email: "Ankur@gmail.com",
      bookDate: "Oct 28th, 2020",
      guests: "3 Adults, 2 Kids",
      accessible: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tour Details</h1>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by name or ID"
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500">Tour Name</span>
                    <Edit2 size={14} className="text-gray-400" />
                  </div>
                  <h2 className="text-blue-600 font-medium">{tourData.name}</h2>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Created At</div>
                  <div>{tourData.createdAt}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    Start/End Date
                  </div>
                  <div>{`${tourData.startDate} - ${tourData.endDate}`}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    Max Participants
                  </div>
                  <div>{tourData.maxParticipants}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Price</div>
                  <div>{tourData.price}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Cancellation</div>
                  <div>{tourData.cancellation ? "True" : "False"}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Overview</div>
                  <p className="">{tourData.overview}</p>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=350&width=300"
                  alt="Tour thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-md flex items-center">
                  <span className="mr-1">+2</span>
                  <span>Photos</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Itinerary</h2>
              <Edit2 size={16} className="text-gray-400" />
            </div>

            <div className="space-y-4">
              {itinerary.map((item, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                    {index < itinerary.length - 1 && (
                      <div className="w-0.5 h-full bg-blue-200 my-1"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">{item.date}</div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Additional Info</h2>
              <Edit size={16} className="text-gray-400" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>Confirmation will be received at time of booking</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Edit size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>Not wheelchair accessible</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Edit size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>Not wheelchair accessible</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Edit size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>Not wheelchair accessible</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Edit size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>Not wheelchair accessible</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Edit size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <div className="flex space-x-4 border-b mb-4">
            <button
              className={`pb-2 px-1 ${
                activeTab === "details"
                  ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("details")}
            >
              <div className="flex items-center">
                <span className="mr-2">ID</span>
              </div>
            </button>
            <button
              className={`pb-2 px-1 ${
                activeTab === "guests"
                  ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("guests")}
            >
              <div className="flex items-center">
                <span className="mr-2">Guest Name</span>
              </div>
            </button>
            <button
              className={`pb-2 px-1 ${
                activeTab === "email"
                  ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("email")}
            >
              <div className="flex items-center">
                <span className="mr-2">Email</span>
              </div>
            </button>
            <button
              className={`pb-2 px-1 ${
                activeTab === "date"
                  ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("date")}
            >
              <div className="flex items-center">
                <span className="mr-2">Book Date</span>
              </div>
            </button>
            <button
              className={`pb-2 px-1 ${
                activeTab === "count"
                  ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("count")}
            >
              <div className="flex items-center">
                <span className="mr-2">No. Guest</span>
              </div>
            </button>
          </div>

          <table className="min-w-full">
            <tbody>
              {guests.map((guest, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-4 pr-4 w-24">{guest.id}</td>
                  <td className="py-4 pr-4 w-48">{guest.name}</td>
                  <td className="py-4 pr-4 w-48">{guest.email}</td>
                  <td className="py-4 pr-4 w-36">{guest.bookDate}</td>
                  <td className="py-4 pr-4 w-36">{guest.guests}</td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit size={14} />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
