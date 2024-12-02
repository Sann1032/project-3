import React, { useState } from 'react';
import { Mail, AlertCircle } from 'lucide-react';
import { authService } from '../../services/auth/authService';

interface EmailVerificationProps {
  email: string;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({ email }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      setError(null);
      await authService.sendVerificationEmail();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Mail className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification email to {email}
          </p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
            Verification email sent successfully!
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            Didn't receive the email? Check your spam folder or click below to resend.
          </p>
          <button
            onClick={handleResendVerification}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? 'Sending...' : 'Resend verification email'}
          </button>
        </div>
      </div>
    </div>
  );
};