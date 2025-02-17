"use client"
import { BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImageCard, ImageSkeleton } from "./ImageCard";

interface Image {
  id: string;
  imageUrl: string;
  modelId: string;
  userId: string;
  prompt: string;
  falAiRequestId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const Gallery = () => {
  const { getToken } = useAuth();
  const [images, setImages] = useState<Image[]>([]);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${BACKEND_URL}/image/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setImages(res.data.images);
        setImageLoading(false);
      } catch (e) {
        console.error("Fetching User Images Failed", e);
        setImageLoading(true);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Gallery</h2>{" "}
        <span>{images.length} images</span>
      </div>
      <div>
        {imageLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <ImageSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((image) => (
              <ImageCard
                key = {image.id}
                id={image.id}
                imageUrl={image.imageUrl}
                status={image.status}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
