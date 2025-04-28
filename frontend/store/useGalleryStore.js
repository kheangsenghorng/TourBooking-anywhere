import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useGalleryStore = create((set) => ({
  galleryImages: [],

  // Setter for updating the gallery images in state
  setGalleryImages: (newImages) => set({ galleryImages: newImages }),

  // Function to delete an image from the gallery
  deleteImage: async (tourId, fileName) => {
    try {
      // Make an API request to delete the image
      const response = await fetch(
        `${API_URL}/files/${tourId}/${fileName}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        // Update the gallery images in the state by removing the deleted image
        set((state) => ({
          galleryImages: state.galleryImages.filter(
            (image) => image !== fileName
          ),
        }));
      } else {
        console.error("Error deleting image:", data.message);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  },
}));
