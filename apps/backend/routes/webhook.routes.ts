import type { AnyLlmInput } from "@fal-ai/client/endpoints";
import { prismaClient } from "db";
import express from "express";
import { Webhook } from "svix";

const router = express.Router();


router.post("/clerk", express.raw({type: 'application/json'}), async (req, res) => {

    const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

    if (!SIGNING_SECRET) {
        throw new Error(
          "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env"
        );
      }
    

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers and body
    const headers = req.headers
    const payload = req.body

    // Get Svix headers for verification
    const svix_id = headers['svix-id']
    const svix_timestamp = headers['svix-timestamp']
    const svix_signature = headers['svix-signature']
    
    if (!svix_id || !svix_timestamp || !svix_signature) {
        res.status(400).json({
          success: false,
          message: 'Error: Missing svix headers',
        })

        return;
      }
    
    let evt: any;

    try {
        evt = wh.verify(JSON.stringify(payload), {
          'svix-id': svix_id as string,
          'svix-timestamp': svix_timestamp as string,
          'svix-signature': svix_signature as string,
        })
      } catch (err) {
        console.log('Error: Could not verify webhook:', (err as Error).message)
        res.status(400).json({
          success: false,
          message: (err as Error).message,
        })
        return;
      }

      const { id } = evt.data;
      const eventType = evt.type;
    

      try{
        switch(eventType){

            case "user.created":
            case "user.updated": {
                await prismaClient.user.upsert({
                    where: {
                        id: id 
                    }, 
                    update: {
                        username:`${evt.data.first_name ?? ""} ${evt.data.last_name ?? ""}`.trim(),
                        email: evt.data.email_addresses[0].email_address, 
                        profilePicture: evt.data.profile_image_url,
                    }, 
                    create: {
                        id: id, 
                        username:`${evt.data.first_name ?? ""} ${evt.data.last_name ?? ""}`.trim(),
                        email: evt.data.email_addresses[0].email_address, 
                        profilePicture: evt.data.profile_image_url,
                    }
                });

                break;
            }
            case "user.deleted": {
                await prismaClient.user.delete({
                    where: { id : id },
                  });
                  break;
            }

            default:
                console.log(`Unhandled event type: ${eventType}`);
                break;
        }
        
      } catch (error) {
        console.error("Error handling webhook:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
      }
      
      res.status(200).json({ success: true, message: "Webhook received" });
      return;

})


export default router;