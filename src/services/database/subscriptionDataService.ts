import { databaseService } from './databaseService';
import { arrayUnion } from 'firebase/firestore';

export interface SubscriptionData {
  status: 'active' | 'inactive' | 'cancelled' | 'trial';
  planId: string;
  priceId: string;
  customerId: string;
  subscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface UserRole {
  type: 'admin' | 'firm' | 'client';
  permissions: string[];
  firmId?: string;
}

export const subscriptionDataService = {
  // Save new subscription
  async createSubscription(userId: string, subscriptionData: SubscriptionData) {
    try {
      await databaseService.addDocument('subscriptions', userId, {
        ...subscriptionData,
        status: 'active',
        createdAt: new Date()
      });

      // Update user's subscription status
      await databaseService.updateDocument('users', userId, {
        hasActiveSubscription: true,
        subscriptionStatus: 'active'
      });
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  },

  // Update subscription status
  async updateSubscriptionStatus(userId: string, status: SubscriptionData['status']) {
    try {
      await databaseService.batchWrite([
        {
          type: 'update',
          collection: 'subscriptions',
          docId: userId,
          data: { status }
        },
        {
          type: 'update',
          collection: 'users',
          docId: userId,
          data: {
            hasActiveSubscription: status === 'active',
            subscriptionStatus: status
          }
        }
      ]);
    } catch (error) {
      console.error('Error updating subscription status:', error);
      throw error;
    }
  },

  // Set user role and permissions
  async setUserRole(userId: string, role: UserRole) {
    try {
      await databaseService.updateDocument('users', userId, {
        role: role.type,
        permissions: role.permissions,
        ...(role.firmId && { firmId: role.firmId })
      });

      // If it's a firm user, add them to the firm's users collection
      if (role.type === 'firm' && role.firmId) {
        await databaseService.updateDocument('firms', role.firmId, {
          users: arrayUnion(userId)
        });
      }
    } catch (error) {
      console.error('Error setting user role:', error);
      throw error;
    }
  },

  // Get user's subscription status
  async getSubscriptionStatus(userId: string): Promise<SubscriptionData | null> {
    try {
      const subscriptions = await databaseService.queryDocuments('subscriptions', [
        { field: 'userId', operator: '==', value: userId }
      ]);
      return subscriptions[0] as SubscriptionData || null;
    } catch (error) {
      console.error('Error getting subscription status:', error);
      throw error;
    }
  },

  // Handle subscription cancellation
  async cancelSubscription(userId: string) {
    try {
      await databaseService.batchWrite([
        {
          type: 'update',
          collection: 'subscriptions',
          docId: userId,
          data: {
            status: 'cancelled',
            cancelAtPeriodEnd: true,
            cancelledAt: new Date()
          }
        },
        {
          type: 'update',
          collection: 'users',
          docId: userId,
          data: {
            hasActiveSubscription: false,
            subscriptionStatus: 'cancelled'
          }
        }
      ]);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  },

  // Handle subscription renewal
  async renewSubscription(userId: string, newPeriodEnd: Date) {
    try {
      await databaseService.updateDocument('subscriptions', userId, {
        status: 'active',
        currentPeriodEnd: newPeriodEnd,
        cancelAtPeriodEnd: false
      });
    } catch (error) {
      console.error('Error renewing subscription:', error);
      throw error;
    }
  },

  // Get all subscribed firm users
  async getSubscribedFirmUsers(firmId: string) {
    try {
      const users = await databaseService.queryDocuments('users', [
        { field: 'firmId', operator: '==', value: firmId },
        { field: 'hasActiveSubscription', operator: '==', value: true }
      ]);
      return users;
    } catch (error) {
      console.error('Error getting subscribed firm users:', error);
      throw error;
    }
  },

  // Check if user has active subscription
  async checkSubscriptionAccess(userId: string): Promise<boolean> {
    try {
      const subscriptionData = await this.getSubscriptionStatus(userId);
      return subscriptionData?.status === 'active';
    } catch (error) {
      console.error('Error checking subscription access:', error);
      return false;
    }
  }
};