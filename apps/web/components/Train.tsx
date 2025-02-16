"use client"

import { CloudUpload } from "@/components/ui/imageUpload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import {TrainModelInput } from "common/inferred"
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function Train() {

  const {getToken} = useAuth();

  const [zipUrl, setZipUrl] = useState("");
  const [name, setName] = useState("")
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [ethinicity, setEthinicity] = useState("");
  const [eyeColor, setEyeColor] = useState("")
  const [bald, setBald] = useState(false)
  const [userId, setUserId] = useState("111")

  const router = useRouter();

  const trainModel = async () => {

    const input = {
        zipUrl, 
        type, 
        age: parseInt(age ?? "0"), 
        ethinicity, 
        eyeColor, 
        name, 
        bald, 
        userId
    };

    const token = await getToken();

    const response = await axios.post(`${BACKEND_URL}/ai/training`, input, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    router.push("/");
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <Card className="w-[650px]">
          <CardHeader>
            <CardTitle>Create a Model</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <div className="grid grid-cols-2 w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input onChange = {(e) => setName(e.target.value)} id="name" placeholder="Name of your model" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="Age">Age</Label>
                      <Input onChange = {(e) => setAge(e.target.value)} id="Age" placeholder="Age" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="type">Ethinicity</Label>
                  <Select onValueChange={(value) => setEthinicity(value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Black">Black</SelectItem>
                      <SelectItem value="White">White</SelectItem>
                      <SelectItem value="South_Asian">South Asian</SelectItem>
                      <SelectItem value="Asian_American">
                        Asian American
                      </SelectItem>
                      <SelectItem value="South_East_Asian">
                        SouthEast Asian
                      </SelectItem>
                      <SelectItem value="Hispanic">Hispanic</SelectItem>
                      <SelectItem value="Middle_Eastern">
                        Middle Eastern
                      </SelectItem>
                      <SelectItem value="Pacific">Pacific</SelectItem>
                      <SelectItem value="East_Asian">East Asian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <div className="grid grid-cols-2 w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="type">Type</Label>
                      <Select onValueChange={(value) => setType(value)}>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="Man">Man</SelectItem>
                          <SelectItem value="Woman">Woman</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="Eye Color">Eye Color</Label>
                      <Select onValueChange={(value) => setEyeColor(value)}>
                        <SelectTrigger id="Eye Color">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="Blue">Blue</SelectItem>
                          <SelectItem value="Grey">Grey</SelectItem>
                          <SelectItem value="Brown">Brown</SelectItem>
                          <SelectItem value="Hazel">Hazel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="bald">Bald</Label>
                  <Switch onClick={(e) => setBald(!bald)}/>
                </div>

                <div className="">
                  <CloudUpload onUploadDone={(zipUrl) => {
                    setZipUrl(zipUrl)
                  }}/>
                </div>
              </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>Cancel</Button>
            <Button disabled = {!zipUrl || !type || !ethinicity || !age || !eyeColor} onClick = {trainModel}>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
