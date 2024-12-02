import { TaxStrategy } from '../types/strategy';

export const sampleStrategies: TaxStrategy[] = [
  {
    id: '1',
    name: 'Retirement Optimization',
    description: 'Maximize retirement account contributions to reduce taxable income',
    estimatedSavings: 5000,
    isActive: false,
    steps: [
      {
        id: '1-1',
        description: 'Max out 401(k) contributions',
        completed: false,
      },
      {
        id: '1-2',
        description: 'Consider IRA contributions',
        completed: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Business Expense Strategy',
    description: 'Optimize business deductions and expenses',
    estimatedSavings: 3500,
    isActive: false,
    steps: [
      {
        id: '2-1',
        description: 'Track all business-related expenses',
        completed: false,
      },
      {
        id: '2-2',
        description: 'Review potential home office deductions',
        completed: false,
      },
    ],
  },
];