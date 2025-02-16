"use client"

import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { SelectModel } from "./SelectModel"
export default function Generate() {

    const [prompt, setPrompt] = useState<string>("");
    const [selectedModel, setSelectedModel] = useState<string>("");


    const generateImage = async () => {
        return;
    }


    return <div>
        <div>
            <SelectModel selectedModel = {selectedModel} setSelectedModel={setSelectedModel} />
        </div>
        <div className="my-5">
        <Textarea placeholder="Enter your prompt here..."
        value = {prompt}
        onChange = {(e) => {setPrompt(e.target.value)}}
        className="min-h-[120px] text-lg resize-none"/>
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