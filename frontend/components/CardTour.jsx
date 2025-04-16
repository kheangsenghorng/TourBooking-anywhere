"use client";

import "font-awesome/css/font-awesome.min.css";
import { useTourStore } from "@/store/tourStore";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useFavoriteStore } from "@/store/favoriteStore";
import { Heart } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardTour = () => {
  const router = useRouter();
  const { id } = useParams(); // User ID (if logged in)

  const { galleryImages, fetchGalleryImages, loading, error } = useTourStore();
  const {
    favorites,
    addFavorite,
    removeFavorite,
    loading: loadingFavorite,
    error: errorFavorite,
    fetchFavorites,
  } = useFavoriteStore();

  const [favoritedTours, setFavoritedTours] = useState({});

  useEffect(() => {
    fetchGalleryImages();
    if (id) {
      fetchFavorites(id); // Fetch user favorites if logged in
    }
  }, [fetchGalleryImages, id, fetchFavorites]);

  // Sync favoritedTours state with fetched favorites
  useEffect(() => {
    if (favorites) {
      const favoriteMap = {};
      favorites.forEach((tour) => {
        favoriteMap[tour._id] = true;
      });
      setFavoritedTours(favoriteMap);
    }
  }, [favorites]);

  // Always display the first 4 tours
  const displayedTours = galleryImages.slice(0, 4);

  const handleClick = async (tourId) => {
    if (!id) {
      router.push(`/login`); // Redirect if not logged in
      return;
    }

    try {
      let updatedFavorites = { ...favoritedTours };
      if (favoritedTours[tourId]) {
        await removeFavorite(id, tourId);
        toast.success("Tour removed from favorites!");
        delete updatedFavorites[tourId];
      } else {
        await addFavorite(id, tourId);
        toast.success("Tour added to favorites!");
        updatedFavorites[tourId] = true;
      }

      setFavoritedTours(updatedFavorites); // Update UI instantly
    } catch (err) {
      toast.error(err.message);
    }
  };

  // if (loading || loadingFavorite)
  //   return <p className="text-center">Loading...</p>;
  // if (error) return <p className="text-center text-red-500">{error}</p>;
  // if (errorFavorite)
  //   return <p className="text-center text-red-500">{errorFavorite}</p>;

  return (
    <section>
      <div className="container mx-auto my-5 px-4 max-w-screen-xl">
        {/* Only show "Best Selections" if user has favorites */}
        {id && favorites.length > 0 && (
          <h4 className="mb-4 border rounded text-2xl p-3">Best Selections</h4>
        )}

        {/* Always show tour cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
          {displayedTours.map((tour) => (
            <div
              key={tour._id}
              className="card border rounded-lg shadow-sm relative hover:shadow-md transition-shadow duration-300"
            >
              <Link href={`/tour-detail/${tour._id}`}>
                <img
                  src={tour?.galleryImages?.[0] || "/default-image.jpg"}
                  className="w-full h-56 object-cover rounded-t-lg"
                  alt={`Tour from ${tour?.first_destination} to ${tour?.second_destination}`}
                />
              </Link>

              {id && (
                <button
                  className="btn btn-light bg-white rounded-md btn-sm text-dark absolute top-0 right-0 p-2 m-3 hover:bg-gray-100 transition-colors"
                  onClick={() => handleClick(tour._id)}
                  aria-label={
                    favoritedTours[tour._id]
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Heart
                    className={`h-6 w-6 rounded transition duration-300 ${
                      favoritedTours[tour._id]
                        ? "fill-red-500 text-red-500"
                        : "fill-gray-300 text-gray-300 hover:fill-gray-400 hover:text-gray-400"
                    }`}
                  />
                </button>
              )}

              <div className="p-4">
                <p className="mt-2 mb-0">
                  {tour?.start_location} <span className="mx-2">↔</span>{" "}
                  {tour?.first_destination}
                </p>
                <h5 className="font-bold text-xl mb-0">${tour?.price}</h5>
                <p className="text-gray-600 mb-2 text-sm">
                  Period: 2 nights and 3 days
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center md:justify-end">
          <Link href="/list-tour" passHref>
            <button className="px-9 py-2 rounded-full border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition-colors duration-300">
              View All Packages
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default CardTour;
