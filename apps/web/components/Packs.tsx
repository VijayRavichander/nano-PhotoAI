"use client"

import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { SelectModel } from "./SelectModel"
import { SelectPack } from "./selectPack"
import { useAuth } from "@clerk/nextjs"
import { BACKEND_URL } from "@/config"
import axios from "axios"
import { toast } from "sonner"

export default function Pack() {

    const [selectedModel, setSelectedModel] = useState<string>("");
    const [selectedPack, setselectedPack] = useState<string>("");
    const {getToken} = useAuth();

    const generateImageFromPack = async () => {

        const token = await getToken();
        const res = await axios.post(`${BACKEND_URL}/pack/generate`, {
            modelId: selectedModel,
            packId: selectedPack
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })


        toast("Photos will be generated shortly. Please check your Gallery")
    }

    return <div>
        <div>
            <SelectModel selectedModel = {selectedModel} setSelectedModel={setSelectedModel} />
        </div>
        <div>
            <SelectPack selectedPack = {selectedPack} setselectedPack={setselectedPack}/>
        </div>
        <div className="my-5">
            <Button onClick={generateImageFromPack}
            disabled={!selectedPack || !selectedModel}
            className="px-8">
            <Sparkles className="mr-2 h-4 w-4"/>
            Generate
            </Button>
        </div>
    </div>
}