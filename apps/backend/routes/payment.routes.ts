import { prismaClient } from "db";
import express from "express";
import Stripe from "stripe";


const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia"
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    
    const sig = req.headers["stripe-signature"];
    
    try{
        if(!sig) throw new Error("No Signature");

        const event = await stripe.webhooks.constructEventAsync(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
        
        // // PRICE_ID
        // console.log("Webhook Event Received:", event.type)
        
        if(event.type == "checkout.session.completed"){
            const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
                expand: ['line_items']
            })
            
            const price_id = session.line_items?.data[0]?.price?.id || null
            const customer_email = session.customer_details?.email || null

            if(!customer_email || !price_id){
                // TODO:
                console.log("Session ID")
                console.log(session.id)
                res.json({received: true})
                return
            }
            
            console.log("Customer Email")
            console.log(customer_email)

            const user = await prismaClient.user.updateMany({
                where: {
                    email: customer_email
                },
                data: {
                    credits: {
                        increment: 1000
                    }
                }
            })
            console.log(user)
            console.log("Payment Updated")
        }
        
        res.json({ received: true });
    }catch(e){
        console.log(e)
    }
  }
);

export default router;
