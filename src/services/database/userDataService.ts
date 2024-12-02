import { databaseService } from './databaseService';
import { User } from '../../types/auth';
import { ClientInformation } from '../../types/client';

export const userDataService = {
  // Save user profile data
  async saveUserProfile(userId: string, userData: Partial<User>) {
    try {
      await databaseService.addDocument('users', userId, {
        ...userData,
        lastLogin: new Date()
      });
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<User>) {
    try {
      await databaseService.updateDocument('users', userId, updates);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Save client information
  async saveClientInfo(userId: string, clientInfo: ClientInformation) {
    try {
      await databaseService.addDocument('clients', userId, clientInfo);
    } catch (error) {
      console.error('Error saving client information:', error);
      throw error;
    }
  },

  // Update client information
  async updateClientInfo(userId: string, updates: Partial<ClientInformation>) {
    try {
      await databaseService.updateDocument('clients', userId, updates);
    } catch (error) {
      console.error('Error updating client information:', error);
      throw error;
    }
  },

  // Update specific client fields
  async updateClientFields(userId: string, fieldUpdates: Record<string, any>) {
    try {
      const operations = Object.entries(fieldUpdates).map(([field, value]) => ({
        type: 'update' as const,
        collection: 'clients',
        docId: userId,
        data: { [field]: value }
      }));

      await databaseService.batchWrite(operations);
    } catch (error) {
      console.error('Error updating client fields:', error);
      throw error;
    }
  },

  // Save subscription data
  async saveSubscriptionData(userId: string, subscriptionData: any) {
    try {
      await databaseService.addDocument('subscriptions', userId, subscriptionData);
    } catch (error) {
      console.error('Error saving subscription data:', error);
      throw error;
    }
  },

  // Update subscription status
  async updateSubscriptionStatus(userId: string, status: string) {
    try {
      await databaseService.updateDocument('subscriptions', userId, { status });
    } catch (error) {
      console.error('Error updating subscription status:', error);
      throw error;
    }
  }
};