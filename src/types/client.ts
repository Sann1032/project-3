import { Timestamp } from 'firebase/firestore';

export interface ClientInformation {
  personalInfo: PersonalInfo;
  financialInfo: FinancialInfo;
  goals: TaxGoal[];
  lastModified?: Date;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  filingStatus: FilingStatus;
  dependents: number;
}

export interface FinancialInfo {
  annualIncome: number;
  employmentType: EmploymentType;
  hasBusinessIncome: boolean;
  hasInvestmentIncome: boolean;
  hasRentalIncome: boolean;
  retirementContributions: number;
  
  // Business Income Fields
  businessType?: string;
  businessRevenue?: number;
  numberOfEmployees?: number;
  yearsInBusiness?: number;
  
  // Investment Income Fields
  dividendIncome?: number;
  capitalGains?: number;
  interestIncome?: number;
  portfolioValue?: number;
  
  // Rental Income Fields
  numberOfProperties?: number;
  totalRentalIncome?: number;
  propertyExpenses?: number;
  totalPropertyValue?: number;
}

export interface TaxGoal {
  id: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export type FilingStatus = 'Single' | 'Married Filing Jointly' | 'Married Filing Separately' | 'Head of Household';
export type EmploymentType = 'W2 Employee' | 'Self-Employed' | 'Business Owner' | 'Multiple Sources';