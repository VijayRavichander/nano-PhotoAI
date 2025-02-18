"use client"

import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { SelectModel } from "./SelectModel"
import { BACKEND_URL } from "@/config"
import axios from "axios"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function Generate() {

    const [prompt, setPrompt] = useState<string>("");
    const [selectedModel, setSelectedModel] = useState<string>("");
    const {getToken} = useAuth();


    const generateImage = async () => {
        console.log(prompt)
        console.log(selectedModel)
        console.log("HEYYYL")
        const token = await getToken();
        
        console.log(token);

        const res = await axios.post(`${BACKEND_URL}/ai/generate`, {prompt, modelId: selectedModel}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
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