import {z} from 'zod';


export const TrainModel = z.object({
    name: z.string(),
    type: z.enum(["Man", "Woman", "Other"]), 
    age: z.number(), 
    ethinicity: z.enum([
        "Black", 
        "White", 
        "South_Asian", 
        "Asian_American", 
        "South_East_Asian", 
        "Hispanic", 
        "Middle_Eastern", 
        "Pacific", 
        "East_Asian"
    ]), 
    eyeColor: z.enum([
        "Brown", 
        "Blue",
        "Hazel", 
        "Grey"
    ]), 
    bald: z.boolean(),
    zipUrl: z.string(),
    userId: z.string()
})

export const GenerateImage = z.object({
    prompt: z.string(), 
    modelId: z.string()
})

export const GenerateImagesFromPack = z.object({
    modelId: z.string(), 
    packId: z.string()
})