"use client";
import { useEffect, useState } from "react";
import { Image } from "./Gallery";
import { ImageCard, ImageSkeleton } from "./ImageCard";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DownloadIcon } from "lucide-react";

export default function InfinitePhotosList({
  initalData,
  limit,
  token,
  search,
}: {
  initalData: Image[];
  limit: number;
  token: string | null;
  search: string | null;
}) {
  const [images, setImages] = useState<Image[]>(initalData);
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();
  const [isDisable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    console.log("Effect triggered");
    console.log("Initial data:", initalData);
    console.log("Current search:", search);
    console.log("Effect triggered, initialData:", initalData);
    setIsLoading(false);
    setImages(initalData);
    setDisable(false)
    setPage(0)
  }, [initalData, search]);

  useEffect(() => {
    const fetchImages = async (offset: number) => {
      try {
        const res = await axios.get(`${BACKEND_URL}/image/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            offset: offset,
            searchKey: search,
            limit: limit,
          },
        });

        return res.data.images || [];
      } catch (e) {
        console.error("Fetching User Images Failed", e);
        return undefined;
      }
    };

    async function loadMoreData() {
      const next = page + 1;
      const offset = next * limit;
      const newImages = await fetchImages(offset);

      if (newImages.length) {
        setPage(next);
        setImages((prev: Image[] | undefined) => [
          ...(prev?.length ? prev : []),
          ...newImages,
        ]);
      } else {
        setDisable(true);
      }
      console.log(newImages);
    }

    console.log("IN View");
    console.log(inView);
    if (inView) {
      console.log("Loading More Data");
      loadMoreData();
    }
  }, [inView]);

  const handleImageClick = (index: number, image: Image) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    console.log(index);
  };

  const handleDownload = async (imageUrl: string, imageName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      console.log(response);
      console.log(blob);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${imageName}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  if (isLoading) {
    return <>Loading..</>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => {
              handleImageClick(index, image);
            }}
            className="hover:cursor"
          >
            <ImageCard
              key={image.id}
              id={image.id}
              imageUrl={image.imageUrl}
              status={image.status}
            />
          </div>
        ))}
      </div>
      {!isDisable ? (
        <div
          ref={ref}
          className="mt-6 flex flex-col items-center justify-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <ImageSkeleton />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* TODO Opening an Image in Modal */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-[425px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <DialogHeader>
            <DialogTitle className="text-sm font-thin p-[3.5px]">
              <span className="font-bold">Prompt Used:</span>{" "}
              {selectedImage?.prompt}
            </DialogTitle>
            <DialogDescription className="text-sm py-3">
              Generated on{" "}
              {selectedImage?.createdAt
                ? new Date(selectedImage.createdAt).toLocaleDateString()
                : ""}
            </DialogDescription>
          </DialogHeader>
          <div>{/* Can add more */}</div>
          <DialogFooter>
            <DialogClose
              onClick={() => {
                handleDownload(selectedImage?.imageUrl!, selectedImage?.id!);
              }}
            >
              <Button>
                Download <DownloadIcon />
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
