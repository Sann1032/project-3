import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_live_51IzEkXENCalct00Ug90WHVtJxwIh6p5rgqxCelTwWljPk1DI46UlwoFEJVGcaCGoBKbwiAUPfGizZnoCK16szxbp008jt3Rs9w');
  }
  return stripePromise;
};

export const stripeService = {
  async createSubscription(paymentMethodId: string, email: string) {
    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId,
          email,
          priceId: 'prod_RJeejXxCq7rvY9'
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create subscription');
      }

      const { subscriptionId, clientSecret } = await response.json();
      return { subscriptionId, clientSecret };
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  },

  async confirmPayment(clientSecret: string) {
    const stripe = await getStripe();
    if (!stripe) throw new Error('Stripe not initialized');

    const { error } = await stripe.confirmCardPayment(clientSecret);
    if (error) throw error;
  }
};