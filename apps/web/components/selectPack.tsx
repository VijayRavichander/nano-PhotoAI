import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface Pack {
  id: string;
  name: string;
  description: string;
  imageUrl1: string;
  imageUrl2: string;
  prompts: {
    id: string;
    prompt: string;
  };
}

export const SelectPack = ({
  selectedPack,
  setselectedPack,
}: {
  selectedPack: string;
  setselectedPack: (model: string) => void;
}) => {
  const [packs, setPacks] = useState<Pack[]>();
  const [packLoading, setpackLoading] = useState(true);

  useEffect(() => {
    const getPacks = async () => {
      const res = await axios.get(`${BACKEND_URL}/pack/bulk`);
      setPacks(res.data.packs);
      setselectedPack(res.data.packs[0]?.id);
      setpackLoading(false);
    };

    getPacks();
  }, []);

  if (packLoading || !packs) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <div className="my-8">Choose a Style Pack</div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {packs.map((pack) => (
            <Card
              onClick={() => {
                setselectedPack(pack.id);
              }}
              key={pack.id}
              className={`${selectedPack == pack.id ? "border-blue-200 border p-3": ""}`}
            >
              <CardHeader className="p-0">
                <div className="grid grid-cols-2 gap-0.5 bg-muted/20">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={pack.imageUrl1}
                      alt={`${pack.name} preview 1`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={pack.imageUrl2}
                      alt={`${pack.name} preview 2`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {pack.name} 
                {/* TODO */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
