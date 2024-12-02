import React, { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { useAuth } from '../../hooks/useAuth';

type AuthView = 'signIn' | 'signUp' | 'forgotPassword';

export const AuthPage: React.FC = () => {
  const [view, setView] = useState<AuthView>('signIn');
  const { signIn, signUp } = useAuth();

  const renderView = () => {
    switch (view) {
      case 'signIn':
        return (
          <SignInForm
            onSubmit={signIn}
            onSwitchToSignUp={() => setView('signUp')}
            onForgotPassword={() => setView('forgotPassword')}
          />
        );
      case 'signUp':
        return (
          <SignUpForm
            onSubmit={signUp}
            onSwitchToSignIn={() => setView('signIn')}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordForm
            onBack={() => setView('signIn')}
          />
        );
    }
  };

  return renderView();
};