import { NextApiRequest, NextApiResponse } from 'next';

import { stripe } from '../../services/stripe';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, priceId } = req.body;

    const stripeCustomer = await stripe.customers.create({
      email,
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      billing_address_collection: 'required',
      line_items: [
        { price: priceId, quantity: 1 }
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/dashboard',
      cancel_url: 'http://localhost:3000/dashboard'
    });


    return res.status(200).json({ sessionId: checkoutSession.id });

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Methos not allowed!');
  }
};