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

interface TrainedModels {
  id: string;
  name: string;
  trainingstatus: "Completed" | "Pending";
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


  if(modelLoading){
    return (
        <div>   
            Loading..
        </div>
    )
  }

  return (
    <div>
      <div>Pick a Model</div>
      <div>
        {models && !modelLoading ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {models
                .filter((model) => model.trainingstatus === "Completed")
                .map((model) => (
                  <Card onClick = {() => {setSelectedModel(model.id)}} key = {model.id} className={`${selectedModel == model.id ? "bg-primary text-primary-foreground border-2 border-blue-700" : "bg-primary-foreground text-primary"}`}>
                    <CardHeader>
                      <CardTitle className="text-center">
                        {model.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>{/* Model Image  */}</CardContent>
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
          <div>No Trained Models</div>
        )}
      </div>
    </div>
  );
};
