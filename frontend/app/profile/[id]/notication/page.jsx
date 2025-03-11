"use client";

import { useState } from "react";
import { Trash2, Building, Users } from "lucide-react";

export default function NotificationPage() {
  const [activeTab, setActiveTab] = useState("hotel");
  const [activePage, setActivePage] = useState(1);

  const notifications = [
    {
      id: 1,
      sender: "Mr.Ronaldo",
      message: "A concise message confirming the booking",
      date: "Nov 19",
    },
    {
      id: 2,
      sender: "Mr.Ronaldo",
      message: "A concise message confirming the booking",
      date: "Nov 19",
    },
    {
      id: 3,
      sender: "Mr.Ronaldo",
      message: "A concise message confirming the booking",
      date: "Nov 19",
    },
    {
      id: 4,
      sender: "Mr.Ronaldo",
      message: "A concise message confirming the booking",
      date: "Nov 19",
    },
    {
      id: 5,
      sender: "Mr.Ronaldo",
      message: "A concise message confirming the booking",
      date: "Nov 19",
    },
  ];

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Notification</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`flex items-center gap-2 px-6 py-2 rounded-full ${
            activeTab === "hotel"
              ? "bg-gray-900 text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
          onClick={() => setActiveTab("hotel")}
        >
          <Building size={18} />
          <span>Hotel</span>
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-2 rounded-full ${
            activeTab === "tour"
              ? "bg-gray-900 text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
          onClick={() => setActiveTab("tour")}
        >
          <Users size={18} />
          <span>Tour</span>
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-6"></div>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center justify-between py-5 px-6 border border-gray-200 rounded-lg"
          >
            <div className="w-32">
              <p className="font-medium">{notification.sender}</p>
            </div>
            <div className="flex-grow">
              <p className="text-gray-700">{notification.message}</p>
            </div>
            <div className="flex items-center gap-6">
              <button className="text-gray-400 hover:text-gray-600">
                <Trash2 size={20} />
              </button>
              <p className="text-gray-600 w-16 text-right">
                {notification.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-2">
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            activePage === 1
              ? "bg-gray-100 text-gray-800"
              : "text-gray-500 hover:bg-gray-50"
          }`}
          onClick={() => setActivePage(1)}
        >
          1
        </button>
        <button
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            activePage === 2
              ? "bg-gray-100 text-gray-800"
              : "text-gray-500 hover:bg-gray-50"
          }`}
          onClick={() => setActivePage(2)}
        >
          2
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
