import { BaseService } from './baseService';
import { validateStrategy } from '../../utils/validation';
import { generateId } from '../../utils/idGenerator';
import { TaxStrategy, UserStrategy } from '../../types/strategy';

export class StrategyService extends BaseService {
  constructor() {
    super('strategies');
  }

  async createStrategy(data: Partial<TaxStrategy>): Promise<string> {
    const strategyId = generateId('strategy');
    const validatedData = validateStrategy(data);
    await this.addDocument(strategyId, validatedData);
    return strategyId;
  }

  async updateStrategy(strategyId: string, data: Partial<TaxStrategy | UserStrategy>) {
    const validatedData = validateStrategy(data);
    await this.updateDocument(strategyId, validatedData);
  }

  async getStrategy(strategyId: string) {
    const strategy = await this.getDocument(strategyId);
    return strategy ? validateStrategy(strategy) : null;
  }

  async deleteStrategy(strategyId: string) {
    await this.deleteDocument(strategyId);
  }
}

export const strategyService = new StrategyService();