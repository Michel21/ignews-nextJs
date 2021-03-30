import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";

async function buffer(readable: Readable) {
  const chunks = [];

  for await(const chunk of chunks) {
    typeof chunk === 'string' ? Buffer.from(chunk) : chunk
  }

  return Buffer.concat(chunks);
}

export const config = {
 api:{
   bodyParser: false
 }
}

const relevantEvent = new Set([
  'checkout.session.completed'
])

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST'){
    const buf = await buffer(req);
    const secret = req.headers['stripe-signature'];

    let event : Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
      return res.status(400).send(`Webhooks error: ${error.message}`)
    }

    const type = event.type;

    if(relevantEvent.has(type)){
      res.json({received: true})
    }
  }else{
    res.setHeader('Allow', 'POST');
    res.status(400).end('Method not Allowed')
  }
  
}