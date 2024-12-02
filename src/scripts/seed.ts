import { seedStrategies } from './seedStrategies';

const runSeed = async () => {
  try {
    await seedStrategies();
    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

runSeed();