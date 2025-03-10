import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 2,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const images = [
    {
      imgLink:
        "https://v3.fal.media/files/koala/84wru95vKQECDBViya1a6_f7fbcde7dd294c7aa8bd2c91cb363ef1.jpg",
      title: "Stylish",
      description: "Cool and Trendy Potraits",
    },
    {
      imgLink:
        "https://v3.fal.media/files/kangaroo/ShEq7FJwFecw0bqZby5gW_2499042a23c140a1933d7e6bd51080ba.jpg",
      title: "Aesthetic",
      description: "Natural and Lively Shots",
    },
    {
      imgLink:
        "https://v3.fal.media/files/panda/-c8LZoXWMIGjFH8HQhlFc_569d2b76a2b046ee988dd863ba6559dd.jpg",
      title: "Timeless",
      description: "Classic and Artistic Frames",
    },

    {
      imgLink:
        "https://v3.fal.media/files/panda/VZcihmE89CdXT9Xz-o7bm_7df6c67ae1114eac8701dc334c0f62b1.jpg",
      title: "Sleek",
      description: "Sharp and Professional Looks",
    },
    {
      imgLink:
        "https://v3.fal.media/files/rabbit/c2S25KfAyda_drAdxZZTV_412ac793dbb74a06adbad3288ee03b92.jpg",
      title: "Opulent",
      description: "Luxurious and High-end Style",
    },
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {images.map((image, index) => (
            <div className="embla__slide flex-shrink-0 w-1/3 p-2" key={index}>
              {/* Image Wrapper */}
              <div className="relative group">
                <img
                  src={image.imgLink}
                  alt={`Image ${index + 1}`}
                  className="w-full rounded-lg shadow-lg"
                />

                {/* Hover Overlay */}
                <div className="absolute bottom-2 left-0 w-full bg-black/30 text-white py-2 px-4 rounded-lg opacity-0 translate-y-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <h3 className="text-lg font-bold text-blue-200">
                    {image.title}
                  </h3>
                  <p className="text-sm font-semibold">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-1">
        <div className="">
          <Button
            onClick={scrollPrev}
            className="p-3 rounded-lg bg-neutral-100/30 hover:bg-neutral-200/60 backdrop-blur-sm transition-colors border border-neutral-200/20 text-neutral-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        <div className="">
          <Button
            onClick={scrollNext}
            className="p-3 rounded-lg bg-neutral-100/30 hover:bg-neutral-200/60 backdrop-blur-sm transition-colors border border-neutral-200/20 text-neutral-700"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
