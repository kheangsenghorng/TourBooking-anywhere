import Carousel from "@/components/Carousal";
import SearchTour from "@/components/SearchTour";
import SearchLocation from "@/components/SearchLocation";
import TourList from "@/components/TourList";
import FilterSidebar from "@/components/FilterSidebar";

export default function PageTour() {
  return (
    <div>
      <Carousel />
      <SearchTour />
      <div
        className="flex justify-between w-[1200px] mx-auto
       "
      >
        <div className="w-[25%]">
          <SearchLocation />
          <FilterSidebar />
        </div>

        <div>
          <TourList />
        </div>
      </div>
    </div>
  );
}
