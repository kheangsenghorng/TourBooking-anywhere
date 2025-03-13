"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, Clock, MapPin, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { useParams } from "next/navigation"

// Mock upcoming tours data
const mockUpcomingTours = [
  {
    id: 1,
    name: "Mountain Trek Adventure",
    location: "Swiss Alps",
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    guests: 2,
    image: "/placeholder.svg?height=150&width=300",
    status: "upcoming",
  },
  {
    id: 2,
    name: "City Explorer Tour",
    location: "Paris, France",
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    guests: 4,
    image: "/placeholder.svg?height=150&width=300",
    status: "upcoming",
  },
  {
    id: 3,
    name: "Wildlife Safari",
    location: "Serengeti, Tanzania",
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    guests: 2,
    image: "/placeholder.svg?height=150&width=300",
    status: "upcoming",
  },
]

export default function UpcomingTours() {
    const { id } = useParams()
  const [upcomingTours] = useState(mockUpcomingTours)

  const formatDateRange = (startDate, endDate) => {
    const options = { month: "short", day: "numeric" }
    return `${startDate.toLocaleDateString("en-US", options)} - ${endDate.toLocaleDateString("en-US", options)}`
  }

  const getDaysUntilStart = (startDate) => {
    const today = new Date()
    const diffTime = startDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getTourDuration = (startDate, endDate) => {
    const diffTime = endDate.getTime() - startDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays} days`
  }

  return (
    <div className="space-y-4">
      {upcomingTours.length === 0 ? (
        <p className="text-center text-muted-foreground">No upcoming tours</p>
      ) : (
        upcomingTours.map((tour) => (
          <Card key={tour.id} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="relative">
                <img src={tour.image || "/placeholder.svg"} alt={tour.name} className="h-full w-full object-cover" />
                <Badge
                  className="absolute right-2 top-2"
                  variant={getDaysUntilStart(tour.startDate) <= 1 ? "destructive" : "secondary"}
                >
                  {getDaysUntilStart(tour.startDate) <= 0
                    ? "Today"
                    : getDaysUntilStart(tour.startDate) === 1
                      ? "Tomorrow"
                      : `In ${getDaysUntilStart(tour.startDate)} days`}
                </Badge>
              </div>
              <div className="col-span-2 p-4">
                <h3 className="text-xl font-semibold">{tour.name}</h3>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDateRange(tour.startDate, tour.endDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{getTourDuration(tour.startDate, tour.endDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {tour.guests} {tour.guests === 1 ? "guest" : "guests"}
                    </span>
                  </div>
                </div>
                <CardFooter className="mt-4 justify-end p-0">
                  <Button asChild size="sm">
                    <Link href={`/profile/${id}/tourDetails/${tour.tourId}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}

