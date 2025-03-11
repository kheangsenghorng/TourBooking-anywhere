import Image from "next/image"
import { Heart, ArrowLeft, ChevronDown, Trash2, Hotel, Users } from "lucide-react"

export default function FavoritesPage() {
  return (
    <div className="max-w-3xl  p-4">
      {/* Header */}
      <div className="mb-4">
        <button className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            <h1 className="text-xl font-semibold">Favorite</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Short</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Filter section */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-500">(50 fav)</div>
        <div className="flex items-center gap-3">
          <button className="text-sm flex items-center gap-1">
            <span>Select</span>
          </button>
          <button className="text-sm flex items-center gap-1">
            <span>All</span>
          </button>
          <button className="text-sm flex items-center gap-1 text-gray-500">
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 bg-gray-900 text-white rounded-full flex items-center gap-2">
          <Hotel className="h-4 w-4" />
          <span>Hotel</span>
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Tour</span>
        </button>
      </div>

      {/* Tour cards */}
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex">
            <div className="w-1/3 relative">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Angkor Wat temple"
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-2/3 p-4 relative">
              <div className="absolute top-4 right-4">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              </div>

              <div className="mb-1">
                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">PHNOM PENH TOUR</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full ml-2">Sold out</span>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">Phnom Penh</span>
                <span className="bg-black text-white p-1 rounded-sm">→</span>
                <span className="font-medium">Siem Reap</span>
                <span className="bg-black text-white p-1 rounded-sm">→</span>
                <span className="font-medium">Kompot</span>
              </div>

              <p className="text-sm text-gray-600 mb-2">4 night 5day. Enjoy stunning views of Angkor Wat</p>

              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">
                    ★
                  </span>
                ))}
                <span className="ml-2 font-medium">4.8</span>
                <span className="ml-1 text-sm text-gray-500">112 reviews</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span className=" w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-xs">
                      <span>⏱</span>
                    </span>
                    <span>2 Weeks</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-xs">
                      <span>🚌</span>
                    </span>
                    <span>Transport</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">$870</div>
                  <div className="text-xs text-gray-500">/person</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button className="w-8 h-8 flex items-center justify-center border rounded-md">
          <span>←</span>
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-md">1</button>
        <button className="w-8 h-8 flex items-center justify-center border rounded-md">2</button>
        <button className="w-8 h-8 flex items-center justify-center border rounded-md">
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

