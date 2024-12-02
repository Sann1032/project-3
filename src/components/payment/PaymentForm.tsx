import React, { useState } from 'react';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface PaymentFormProps {
  email: string;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ email, onPaymentSuccess, onPaymentError }) => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 19);
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Simulated payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPaymentSuccess(true);
      setTimeout(() => {
        onPaymentSuccess();
      }, 1500);
    } catch (error) {
      onPaymentError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <CardTitle>Payment Information</CardTitle>
        </div>
        <CardDescription>
          Enter your card details to complete the subscription
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-medium">Monthly Subscription</span>
          <span className="text-2xl font-bold text-blue-600">$69.99</span>
        </div>

        {paymentSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Payment Successful!</h3>
            <p className="text-gray-600">Setting up your account...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500 space-x-2">
              <Lock className="w-4 h-4" />
              <span>Your payment is secure and encrypted</span>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};