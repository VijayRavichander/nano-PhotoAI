import { useEffect, useState } from "react";
import { Image } from "./Gallery";
import { ImageCard, ImageSkeleton } from "./ImageCard";
import { useInView } from "react-intersection-observer"
import axios from "axios";
import { BACKEND_URL } from "@/config";

export default function InfinitePhotosList({
  initalData,
  limit,
  token
}: {
  initalData: Image[];
  limit: number;
  token: string | null;
}) {


  const [images, setImages] = useState<Image[]>(initalData);
  const [page, setPage] = useState(0)
  const [ref, inView] = useInView()
  const [isDisable, setDisable] = useState(false)


  useEffect(() => {
    const fetchImages = async (offset: number) => {
        try {
          const res = await axios.get(`${BACKEND_URL}/image/bulk`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
                offset: offset,
                limit: limit
            }
          });
  
          return res.data.images;
        } catch (e) {
          console.error("Fetching User Images Failed", e);
          return undefined;
        }
      };
  
    async function loadMoreData() {
        const next = page + 1
        const offset = next * limit
        const newImages = await fetchImages(offset);
    
        if (newImages.length) {
          setPage(next)
          setImages((prev: Image[] | undefined) => [
            ...(prev?.length ? prev : []),
            ...newImages,
          ])
        } else {
          setDisable(true)
        }
      }


    if (inView) {
      loadMoreData()
    }
  }, [inView])

  return (<>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {images.map((image) => (
    <ImageCard
      key={image.id}
      id={image.id}
      imageUrl={image.imageUrl}
      status={image.status}
    />
  ))}
</div>
{!isDisable ? (
        <div ref={ref} className="mt-6 flex flex-col items-center justify-center">
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
</>)
}
