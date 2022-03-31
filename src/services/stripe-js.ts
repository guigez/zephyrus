import { loadStripe } from '@stripe/stripe-js'

export async function getStripeJs() {
  const stripeJs = await loadStripe('pk_test_51Kj9boITh6eCVzDvc4wA5LdantzrULOPxq3rZApJrsSKKVHoXUyElKqc9BwG6QGsz0zs3DA9jJuSgBU1xf1D0oPe00sUC9thU5');
  return stripeJs;
}