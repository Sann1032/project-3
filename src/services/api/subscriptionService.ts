import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51IzEkXENCalct00UpwyFk3LSZIKDAKIZiYQaMhKcXJSkBtllY2LkDlH6x8flLivYjf8WTMFa5bzdQ5miACnYHl4y00VxQs3Ovz');

export const subscriptionService = {
  async createSubscription(paymentMethodId: string, email: string) {
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

    return response.json();
  },

  async confirmPayment(clientSecret: string) {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe not initialized');

    const { error } = await stripe.confirmCardPayment(clientSecret);
    if (error) throw error;
  }
};