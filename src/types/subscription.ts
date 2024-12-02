export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}

export interface SubscriptionStatus {
  isActive: boolean;
  plan: SubscriptionPlan;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  brand: string;
}

export interface SubscriptionInvoice {
  id: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'void';
  date: Date;
  pdfUrl?: string;
}