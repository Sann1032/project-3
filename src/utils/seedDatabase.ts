import { strategyService } from '../services/firestore/strategyService';
import { UserStrategy } from '../types/strategy';

export const seedDatabase = async (userId: string) => {
  try {
    console.log('Starting database seeding...');
    
    // Get existing strategies
    const existingStrategies = await strategyService.getAllStrategies(userId);
    
    if (existingStrategies.length === 0) {
      console.log('No strategies found. Database seeding may be required.');
    } else {
      console.log(`Found ${existingStrategies.length} existing strategies. No seeding required.`);
    }
    
    console.log('Database check completed successfully!');
  } catch (error) {
    console.error('Error checking database:', error);
    throw error;
  }
};