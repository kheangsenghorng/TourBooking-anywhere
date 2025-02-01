import Link from "next/link";

export default function Explore() {
  return (
    <div className="w-[1200px] mx-auto">
      {/* Menu Section */}
      <div className="container mx-auto p-3">
        <div className="bg-white p-6 border rounded-lg mt-6">
          <div className="flex gap-10">
            {/* Explore Link */}
            <Link href="#Explore">
              <div className="text-xl text-blue-600 hover:text-blue-800 cursor-pointer">
                Explore
              </div>
            </Link>

            {/* Rooms Link */}
            <Link href="#Itinerary">
              <div className="text-xl text-blue-600 hover:text-blue-800 cursor-pointer">
                Itinerary
              </div>
            </Link>

            {/* Itinerary Link */}
            <Link href="#Rooms">
              <div className="text-xl text-blue-600 hover:text-blue-800 cursor-pointer">
                Rooms
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
