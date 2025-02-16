import express from 'express';
import { TrainModel, GenerateImage, GenerateImagesFromPack } from "common/types"
import { prismaClient } from 'db';
import { S3Client} from 'bun';
import { FalAiModel } from './models/FalModel';
import cors from "cors"
import { authMiddleware } from './middleware';

const app = express();
// const USER_ID = "111"

const falAIClient = new FalAiModel();


app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
    
    res.status(200).json({
        message: "All Good"
    })
})

app.get("/presigned-url", async (req, res) => {
    console.log("Hitting Presigned Url")

    const key = `models/${Date.now()}_${Math.random()}.zip`

    const url = S3Client.presign(key, {
        method: "PUT",
        accessKeyId: process.env.S3_ACCESS_KEY, 
        secretAccessKey: process.env.S3_SECRET_KEY, 
        endpoint: process.env.ENDPOINT, 
        bucket: process.env.BUCKET_NAME, 
        expiresIn: 60 * 5, 
        type: "application/zip"
    })

    res.json({
        key,
        url
    })
})

app.post("/ai/training", authMiddleware,  async (req, res) => {

    const parsedData = TrainModel.safeParse(req.body); 

    if(!parsedData.success){
        res.status(400).json({
            message: "Bad Request"
        })
        return;
    }

    const {request_id, response_url } = await falAIClient.trainModel(parsedData.data.zipUrl, parsedData.data.name);

    const data = await prismaClient.model.create({
        data: {
            name: parsedData.data.name, 
            type: parsedData.data.type, 
            age: parsedData.data.age, 
            ethinicity: parsedData.data.ethinicity,
            eyeColor: parsedData.data.eyeColor, 
            bald: parsedData.data.bald, 
            userId: req.userId!, 
            falAiRequestId: request_id, 
            zipUrl: parsedData.data.zipUrl
        }
    })

    res.json({
        modelId: data.id
    })

})

app.post("/ai/generate", authMiddleware, async (req, res) => {
    
    const parsedData = GenerateImage.safeParse(req.body);

    if(!parsedData.success){
        res.status(400).json({
            message: "Bad Request"
        })
        return;
    }   

    const model = await prismaClient.model.findUnique({
        where: {
            id: parsedData.data.modelId
        }
    })

    if(!model || !model.tensorPath){
        res.json({
            message: "Model Not Found"
        })
        return;
    }

    const {request_id, response_url} = await falAIClient.generateImage(parsedData.data.prompt, model.tensorPath)

    const image_data = await prismaClient.outputImages.create({
        data: {
            prompt: req.body.prompt, 
            userId: req.userId!, 
            modelId: req.body.modelId, 
            imageUrl: "", 
            falAiRequestId: request_id
        }
    })


    res.json({imageId: image_data.id})
})

app.post("/pack/generate", authMiddleware, async (req, res) => {
    
    const parsedData = GenerateImagesFromPack.safeParse(req.body);

    if(!parsedData.success){
        res.status(400).json({message: "Bad Request"})
        return;
    }

    const prompts = await prismaClient.packPrompts.findMany({
        where: {
            packId: parsedData.data.packId
        }
})

    // TODO: Need to Check if Model Tensor's are available

    let requestsIds: { request_id: string }[] = await Promise.all(prompts.map((prompt) => 
    falAIClient.generateImage(prompt.prompt, parsedData.data.modelId)))


    const images = await prismaClient.outputImages.createManyAndReturn({
        data: prompts.map((prompt, index) =>(
            {
                prompt: prompt.prompt, 
                userId: req.userId!,
                modelId: parsedData.data.modelId, 
                imageUrl: "", 
                requestsIds: requestsIds[index].request_id
            }
        ))
    })

    res.json({
        images: images.map((image) => image.id)
    })

})

app.get("/pack/bulk", async (req, res) => {
    
    const packs = await prismaClient.pack.findMany({})

    res.json({
        packs
    })
})

app.get("/image/bulk", authMiddleware, async (req, res) => {
    const ids = req.query.images as string[];
    const limit = req.query.limit as string ?? "10";
    const offset = req.query.offset as string ?? "0";

    const imagesData = await prismaClient.outputImages.findMany({
        where: {
            id: { in: ids },
            userId: req.userId! 
        }, 
        skip: parseInt(offset), 
        take: parseInt(limit)
    })

    res.json({
        images: imagesData
    })
})

app.post("/fal-ai/training", async (req, res) => {

    const request_id = req.body.request_id;

    await prismaClient.model.updateMany({
        where: {
            falAiRequestId: request_id
        }, 
        data: {
            trainingstatus: "Completed",
            tensorPath: req.body.model_url
        }
    })

    res.json({
        message: "Webhook Recieved"
    })
})

app.post("/fal-ai/inference", async (req, res) => {

    const request_id = req.body.request_id;

    await prismaClient.outputImages.updateMany({
        where: {
            falAiRequestId: request_id
        }, 
        data: {
            status: "Generated",
            imageUrl: req.body.image_url
        }
    })

    res.json({
        message: "Webhook Recieved"
    })
})



app.listen(3005, () => {
    console.log("Backend App running on port:3005")
})

