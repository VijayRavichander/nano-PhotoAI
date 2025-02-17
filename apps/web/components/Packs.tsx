"use client"

import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { SelectModel } from "./SelectModel"
import { SelectPack } from "./selectPack"
export default function Pack() {

    const [selectedModel, setSelectedModel] = useState<string>("");
    const [selectedPack, setselectedPack] = useState<string>("");


    const generateImage = async () => {
        return;
    }

    return <div>
        <div>
            <SelectModel selectedModel = {selectedModel} setSelectedModel={setSelectedModel} />
        </div>
        <div>
            <SelectPack selectedPack = {selectedPack} setselectedPack={setselectedPack}/>
        </div>
        <div className="my-5">
            <Button onClick={generateImage}
            disabled = {!prompt}
            className="px-8">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate
            </Button>
        </div>
    </div>
}