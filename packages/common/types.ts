import {z} from 'zod';


export const TrainModel = z.object({
    name: z.string(),
    type: z.enum(["Man", "Woman", "Other"]), 
    age: z.number(), 
    ethinicity: z.enum([
        "Black", 
        "White", 
        "South Asian", 
        "Asian American", 
        "South East Asian", 
        "Hispanic", 
        "Middle Eastern", 
        "Pacific", 
        "East Asian"
    ]), 
    eyeColor: z.enum([
        "Brown", 
        "Blue",
        "Hazel", 
        "Grey"
    ]), 
    bald: z.boolean(),
    images: z.array(z.string())
})

export const GenerateImage = z.object({
    prompt: z.string(), 
    modelId: z.string()
})

export const GenerateImagesFromPack = z.object({
    modelId: z.string(), 
    packId: z.string()
})