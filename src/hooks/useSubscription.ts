import { useState } from 'react';
import { subscriptionDataService } from '../services/database';
import { SubscriptionData } from '../types/subscription';

export const useSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubscription = async (userId: string, subscriptionData: SubscriptionData) => {
    setLoading(true);
    setError(null);
    try {
      await subscriptionDataService.createSubscription(userId, subscriptionData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating subscription');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriptionStatus = async (userId: string, status: SubscriptionData['status']) => {
    setLoading(true);
    setError(null);
    try {
      await subscriptionDataService.updateSubscriptionStatus(userId, status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating subscription');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkSubscriptionAccess = async (userId: string) => {
    try {
      return await subscriptionDataService.checkSubscriptionAccess(userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error checking subscription');
      return false;
    }
  };

  return {
    createSubscription,
    updateSubscriptionStatus,
    checkSubscriptionAccess,
    loading,
    error
  };
};