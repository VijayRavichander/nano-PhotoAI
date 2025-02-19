"use client";
import { BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { ImageCard, ImageSkeleton } from "./ImageCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InfinitePhotosList from "./InfinitePhotosList";
import { Loader2 } from "lucide-react";

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
  const { getToken } = useAuth();
  const [images, setImages] = useState<Image[]>([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [token, setToken] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

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
  }, []);

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
      <Suspense fallback={<p>Loading</p>}>
        <InfinitePhotosList initalData={images} limit={4} token={token} />
      </Suspense>
      {/* TODO Opening an Image in Modal */}
      {/* <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <DialogHeader>
            <DialogTitle>{selectedImage?.prompt}</DialogTitle>
            <DialogDescription>
              Generated on{" "}
              {selectedImage?.createdAt
                ? new Date(selectedImage.createdAt).toLocaleDateString()
                : ""}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};
