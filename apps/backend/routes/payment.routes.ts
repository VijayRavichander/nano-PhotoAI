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
    console.log(sig)
    try{
        // if(!sig) throw new Error("No Signature");

        // const event = stripe.webhooks.constructEvent(
        //     req.body,
        //     sig,
        //     process.env.STRIPE_WEBHOOK_SECRET!
        //   );

          console.log("All Good")

          res.json({ received: true });
    }catch(e){
        console.log(e)
    }
  }
);

export default router;
