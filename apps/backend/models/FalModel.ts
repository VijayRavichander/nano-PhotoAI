import { fal } from "@fal-ai/client";
import { BaseModel } from "./BaseModel";

export class FalAiModel extends BaseModel{
    constructor(){
        super();
    }

    public async generateImage(prompt: string, tensor_path: string){

        const {request_id, response_url} = await fal.queue.submit("fal-ai/flux-lora", {
            input: {
              prompt: prompt, 
              loras: [{path: tensor_path, scale: 1, }]
            },
            webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/inference`
          });

        return {request_id, response_url}
    }

    public async trainModel(zipUrl: string, triggerWord: string){

        // const {request_id, response_url} = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
        //     input: {
        //         images_data_url: zipUrl, 
        //         trigger_word: triggerWord
        //     }, 
        //     webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/training`
        // })


        return {request_id:"", response_url:" "}

    }
}