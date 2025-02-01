"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";

const TabsAndSearch = () => {
  return (
    <section>
      <div className="container mx-auto my-8 relative">
        <div className="p-6 rounded-lg">
          {/* Search Fields */}
          <div className="bg-gray-50 p-6 rounded-lg shadow max-w-[1250px] mx-auto">
            <div className="grid gap-6">
              {/* Tabs */}
              <div className="absolute w-full max-w-[800px] left-1/2 top-1 transform -translate-x-1/2 flex justify-between items-center rounded-full">
                <a
                  className="flex items-center w-full justify-center border px-6 py-2 text-green-700 bg-white rounded-full shadow-lg transition hover:scale-105"
                  href="#hotel-tab"
                >
                  <i className="fas fa-hotel mr-2"></i> Hotel
                </a>
                <a
                  className="flex items-center w-full border-green-700 justify-center px-6 py-2 text-gray-600 bg-gray-100 rounded-full hover:text-green-600 hover:bg-white shadow-lg transition hover:scale-105"
                  href="#tour-tab"
                >
                  <i className="fas fa-map mr-2"></i> Tour
                </a>
              </div>

              {/* Check-in/Check-out */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-center bg-white rounded-full p-4 border">
                  <i className="fas fa-calendar-days text-green-700 mr-4"></i>
                  <div>
                    <small className="text-gray-500">Check-in/out dates</small>
                    <div className="text-gray-800">8 Nov - 10 Nov 2024</div>
                  </div>
                  <div className="ml-auto bg-white px-3 py-1 text-center rounded-full shadow">
                    <small className="text-gray-500">4 Nights</small>
                  </div>
                </div>

                {/* Rooms and Guests */}
                <div className="flex items-center bg-white rounded-full p-4 border">
                  <i className="fas fa-users text-green-700 mr-4"></i>
                  <div>
                    <small className="text-gray-500">Rooms and Guests</small>
                    <div className="text-gray-800">
                      2 rooms, 4 adults, 1 child
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="relative mt-8">
                <button
                  className="absolute w-[1000px] left-1/2 transform -translate-x-1/2 bg-green-700 text-white text-lg font-medium px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
                  style={{ bottom: "-40px" }}
                >
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
