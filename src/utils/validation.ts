import { TaxStrategy, UserStrategy } from '../types/strategy';
import { ClientInformation } from '../types/client';

// Default values for nested objects
export const DEFAULT_VALUES = {
  strategy: {
    steps: [],
    overview: {
      summary: '',
      benefits: [],
      applicability: [],
      taxImplications: []
    },
    timeline: {
      estimatedDuration: '',
      phases: []
    },
    trainingResources: {
      videos: [],
      documents: [],
      articles: []
    },
    requirements: [],
    risks: [],
    customNotes: '',
    targetSavings: 0,
    implementationDate: null,
    status: 'Not Started' as const
  },
  client: {
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      filingStatus: 'Single' as const,
      dependents: 0
    },
    financialInfo: {
      annualIncome: 0,
      employmentType: 'W2 Employee' as const,
      hasBusinessIncome: false,
      hasInvestmentIncome: false,
      hasRentalIncome: false,
      retirementContributions: 0
    },
    goals: []
  }
};

// Validation functions
export const validateStrategy = (data: Partial<TaxStrategy | UserStrategy>): TaxStrategy | UserStrategy => {
  return {
    ...DEFAULT_VALUES.strategy,
    ...data,
    overview: {
      ...DEFAULT_VALUES.strategy.overview,
      ...(data.overview || {})
    },
    timeline: {
      ...DEFAULT_VALUES.strategy.timeline,
      ...(data.timeline || {})
    },
    trainingResources: {
      ...DEFAULT_VALUES.strategy.trainingResources,
      ...(data.trainingResources || {})
    }
  };
};

export const validateClient = (data: Partial<ClientInformation>): ClientInformation => {
  return {
    ...DEFAULT_VALUES.client,
    ...data,
    personalInfo: {
      ...DEFAULT_VALUES.client.personalInfo,
      ...(data.personalInfo || {})
    },
    financialInfo: {
      ...DEFAULT_VALUES.client.financialInfo,
      ...(data.financialInfo || {})
    }
  };
};

// Error handling utilities
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code: string,
    public operation: string,
    public collection: string,
    public docId?: string
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export const handleDatabaseError = (error: any, operation: string, collection: string, docId?: string): never => {
  if (error instanceof DatabaseError) {
    throw error;
  }

  const code = error.code || 'unknown';
  const message = error.message || 'An unknown database error occurred';

  throw new DatabaseError(message, code, operation, collection, docId);
};