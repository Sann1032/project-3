import { TaxStrategy, UserStrategy } from '../types/strategy';
import { ClientInformation, FinancialInfo, PersonalInfo } from '../types/client';

const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  name: '',
  email: '',
  phone: '',
  filingStatus: 'Single',
  dependents: 0
};

const DEFAULT_FINANCIAL_INFO: FinancialInfo = {
  annualIncome: 0,
  employmentType: 'W2 Employee',
  hasBusinessIncome: false,
  hasInvestmentIncome: false,
  hasRentalIncome: false,
  retirementContributions: 0,
  businessType: '',
  businessRevenue: 0,
  numberOfEmployees: 0,
  yearsInBusiness: 0,
  dividendIncome: 0,
  capitalGains: 0,
  interestIncome: 0,
  portfolioValue: 0,
  numberOfProperties: 0,
  totalRentalIncome: 0,
  propertyExpenses: 0,
  totalPropertyValue: 0
};

export const validateClientInfo = (info: Partial<ClientInformation>): ClientInformation => {
  return {
    personalInfo: {
      ...DEFAULT_PERSONAL_INFO,
      ...(info.personalInfo || {})
    },
    financialInfo: {
      ...DEFAULT_FINANCIAL_INFO,
      ...(info.financialInfo || {})
    },
    goals: info.goals || [],
    documents: info.documents || [],
    lastModified: info.lastModified || new Date()
  };
};

export const sanitizeForFirestore = (data: any): any => {
  if (data === null || data === undefined) {
    return null;
  }

  if (Array.isArray(data)) {
    return data.map(item => sanitizeForFirestore(item));
  }

  if (data instanceof Date) {
    return data;
  }

  if (typeof data === 'object') {
    const sanitized = {};
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        sanitized[key] = sanitizeForFirestore(value);
      }
    });
    return sanitized;
  }

  return data;
};