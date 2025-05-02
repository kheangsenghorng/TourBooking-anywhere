import React from "react";
import TourDetails from "@/components/ATourDetails";
import GuestTable from "@/components/GuestTable";
import AdditionalInfo from "@/components/AdditionalInfo";
import Itinerary from "@/components/Itinerary";

export default function App() {
  return (
    <div className="flex">
      <main className="flex-2 p-8 bg-white space-y-6 overflow-auto">
        <TourDetails />
        <GuestTable />
      </main>
      <div className="grid grid-cols gap-6">
          <Itinerary />
        <AdditionalInfo />
      </div>
    </div>
  );
}
