import Gallery from "@/components/Gallery";
import Exlpore from "@/components/Explore";
import PhnomPenhTour from "@/components/PhnomPenhTour";
import BookingForm from "@/components/BookingForm";
import CardRoomType from "@/components/CardRoomType";
import Reviews from "@/components/Reviews";
export default function PageTour() {
  return (
    <div>
      <Gallery />
      <Exlpore />
      <div className="flex justify-between mx-auto w-[1200px]">
        <div className="w-[800px]">
          <PhnomPenhTour />
          <CardRoomType />
          <Reviews />
        </div>
        <div>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
