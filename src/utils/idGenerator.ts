import { customAlphabet } from 'nanoid';

// Create custom ID generators for different collections
const createIdGenerator = (prefix: string, length: number = 12) => {
  // Use a custom alphabet that's URL-safe and unambiguous
  const nanoid = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZ', length);
  return () => `${prefix}_${nanoid()}`;
};

export const idGenerators = {
  strategy: createIdGenerator('strat'),
  client: createIdGenerator('cli'),
  firm: createIdGenerator('firm'),
  user: createIdGenerator('usr'),
  subscription: createIdGenerator('sub'),
  document: createIdGenerator('doc'),
  payment: createIdGenerator('pay'),
};

export const generateId = (type: keyof typeof idGenerators): string => {
  const generator = idGenerators[type];
  if (!generator) {
    throw new Error(`No ID generator found for type: ${type}`);
  }
  return generator();
};