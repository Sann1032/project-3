import React, { useState } from 'react';
import { UserPlus, Building2 } from 'lucide-react';
import { SignUpData } from '../../types/auth';
import { PaymentForm } from '../payment/PaymentForm';

interface SignUpFormProps {
  onSubmit: (data: SignUpData) => Promise<void>;
  onSwitchToSignIn: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, onSwitchToSignIn }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    password: '',
    name: '',
    role: 'client',
    firmName: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSuccess = async () => {
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <PaymentForm
            email={formData.email}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
          <button
            onClick={() => setStep(1)}
            className="mt-4 text-sm text-blue-600 hover:text-blue-500"
          >
            ← Back to account details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <UserPlus className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleNextStep}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'client' })}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.role === 'client'
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <UserPlus className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Individual</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'firm' })}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.role === 'firm'
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Building2 className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Accounting Firm</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {formData.role === 'firm' ? 'Contact Name' : 'Full Name'}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {formData.role === 'firm' && (
              <div>
                <label htmlFor="firmName" className="block text-sm font-medium text-gray-700">
                  Firm Name
                </label>
                <input
                  id="firmName"
                  name="firmName"
                  type="text"
                  required
                  value={formData.firmName}
                  onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue to Payment
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};