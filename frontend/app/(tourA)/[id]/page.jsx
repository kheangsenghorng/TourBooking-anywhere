import SearchTour from "@/components/Search";
import Banner from "@/components/BannerHotel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CardTour from "@/components/CardTour";

export default function Home() {
  return (
    <div>
      <SearchTour />
      <Banner />
      <CardTour />
    </div>
  );
}
