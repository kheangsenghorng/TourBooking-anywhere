
import SearchTour from "@/components/Search";
import Banner from "@/components/BannerHotel"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export default function Home() {
  return (
    <div >
      <Navbar />
      <SearchTour />
      <Banner />
      <Footer />
    </div>
  );
}
