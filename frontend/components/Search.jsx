"use client";
import React from "react"; // Make sure React is imported
import "@fortawesome/fontawesome-free/css/all.min.css";
import DatePicker from "./ui/DatePicker"; // Import DatePicker component

const TabsAndSearch = () => {
  // State to manage dates
  const [dates, setDates] = React.useState({
    checkIn: "",
    checkOut: "",
  });

  // State to manage rooms and guests
  const [rooms, setRooms] = React.useState(1); // Default to 1 room
  const [adults, setAdults] = React.useState(1); // Default to 1 adult
  const [children, setChildren] = React.useState(0); // Default to 0 children

  // Update the check-in date
  const handleCheckInChange = (newCheckIn) => {
    setDates((prevDates) => ({
      ...prevDates,
      checkIn: newCheckIn,
    }));
  };

  // Update the check-out date
  const handleCheckOutChange = (newCheckOut) => {
    setDates((prevDates) => ({
      ...prevDates,
      checkOut: newCheckOut,
    }));
  };

  return (
    <section>
      <div className="container mx-auto my-8 relative px-4">
        <div className="p-6 rounded-lg">
          {/* Search Fields */}
          <div className="bg-gray-50 p-6 rounded-lg shadow max-w-[1250px] mx-auto">
            <div className="grid gap-6">
              {/* Tabs */}
              <div className="absolute w-full max-w-[800px] left-1/2 top-1 transform -translate-x-1/2 flex justify-center items-center rounded-full">
                <a
                  className="flex items-center w-full md:w-[500px] border-green-700 justify-center px-6 py-2 text-gray-600 bg-gray-100 rounded-full hover:text-green-600 hover:bg-white shadow-lg transition hover:scale-105"
                  href="#tour-tab"
                >
                  <i className="fas fa-map mr-2"></i> Tour With Us
                </a>
              </div>

              {/* Check-in/Check-out Dates */}
              <div className="grid gap-6 mt-12 md:mt-8">
                <div className="flex items-center bg-white rounded-full p-4 border w-full">
                  <i className="fas fa-calendar-days text-green-700 mr-4"></i>
                  <DatePicker
                    checkIn={dates.checkIn}
                    checkOut={dates.checkOut}
                    onCheckInChange={handleCheckInChange}
                    onCheckOutChange={handleCheckOutChange}
                  />
                </div>

                {/* Rooms and Guests */}
              </div>

              {/* Search Button */}
              <div className="relative mt-8 flex justify-center">
                <button className="absolute w-full md:w-[800px] top-[calc(100%+10px)] left-1/2 transform -translate-x-1/2 bg-green-700 text-white text-lg font-medium px-8 py-3 rounded-full shadow-lg hover:scale-105 transition">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabsAndSearch;
