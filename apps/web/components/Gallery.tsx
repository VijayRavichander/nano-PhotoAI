"use client";
import { BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { ImageCard, ImageSkeleton } from "./ImageCard";
import InfinitePhotosList from "./InfinitePhotosList";
import SearchPhoto from "./SearchPhoto";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";

export interface Image {
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
  const searchParams = useSearchParams();

  const searchparams = searchParams.get("searchKey");
  const { getToken } = useAuth();
  const [images, setImages] = useState<Image[]>([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [token, setToken] = useState<string>("");
  const [search, setSearch] = useState<string>(`${searchparams || ""}`);

  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = await getToken();
        if (token) {
          const res = await axios.get(`${BACKEND_URL}/image/bulk`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              limit: 4,
              offset: 0,
              searchKey: search || null,
            },
          });

          setImages(res.data.images);
          setToken(token);
          setImageLoading(false);
        }
      } catch (e) {
        console.error("Fetching User Images Failed", e);
        setImageLoading(true);
      }
    };

    fetchImages();
  }, [search]);

  if (imageLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <ImageSkeleton />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      <div className="my-4">
        <SearchPhoto search={search} setSearch={setSearch} />
      </div>
      <Suspense>
        <InfinitePhotosList
          initalData={images}
          limit={4}
          token={token}
          search={search}
        />
      </Suspense>
    </div>
  );
};

export default Gallery;
