import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Sparkles } from "lucide-react";
interface TrainedModels {
  id: string;
  name: string;
  trainingstatus: "Completed" | "Pending";
  thumbnail: string;
}

export const SelectModel = ({
  selectedModel,
  setSelectedModel,
}: {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}) => {
  const [models, setModels] = useState<TrainedModels[]>();
  const { getToken } = useAuth();
  const [modelLoading, setModelLoading] = useState(true);

  useEffect(() => {
    const getModels = async () => {
      const token = await getToken();
      const res = await axios.get(`${BACKEND_URL}/models`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModels(res.data.models);
      setSelectedModel(res.data.models[0]?.id);
      setModelLoading(false);
    };

    getModels();
  }, []);

  if (modelLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <div className="">Choose Your Trained Model</div>
      <div>
        {models && models.length > 0 && !modelLoading ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {models
                .filter((model) => model.trainingstatus === "Completed")
                .map((model) => (
                  <Card
                    onClick={() => {
                      setSelectedModel(model.id);
                    }}
                    key={model.id}
                    className={`${selectedModel == model.id ? "border-blue-200 border" : ""}`}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={model.thumbnail}
                        alt={`Thumbnail for ${model.name}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-white">
                            {model.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
            {models.filter((model) => model.trainingstatus === "Pending")
              .length > 0 && (
              <div>
                <div className="font-bold text-lg text-orange-300">
                  Models in Training
                </div>
                {models
                  .filter((model) => model.trainingstatus === "Pending")
                  .map((model) => (
                    <Card
                      key={model.id}
                      className="bg-blue-100 text-primary-foreground"
                    >
                      <CardHeader>
                        <CardTitle className="text-center">
                          {model.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>{/* Model Image */}</CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        ) : (
          <div className="my-10 text-center text-gray-500 italic">
            Nothing to see here... yet! Your trained models will show up right
            in this spot.
          </div>
        )}
      </div>
    </div>
  );
};
