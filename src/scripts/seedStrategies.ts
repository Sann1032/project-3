import { db } from '../config/firebase-admin';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { TaxStrategy } from '../types/strategy';

const strategies: Omit<TaxStrategy, 'id' | 'dateCreated' | 'lastModified'>[] = [
  {
    name: '1031 Exchange Strategy',
    description: 'Defer capital gains taxes by exchanging investment properties',
    estimatedSavings: 50000,
    isActive: false,
    steps: [
      {
        id: '1',
        description: 'Identify replacement property within 45 days',
        completed: false
      },
      {
        id: '2',
        description: 'Complete exchange within 180 days',
        completed: false
      }
    ],
    implementationGuide: 'Follow strict IRS guidelines for property exchange timing and requirements',
    requirements: [
      'Investment or business property',
      'Like-kind property exchange',
      'Qualified intermediary'
    ],
    risks: [
      'Missing exchange deadlines',
      'Property value fluctuations',
      'Non-qualifying property types'
    ],
    timeline: {
      estimatedDuration: '6 months',
      phases: [
        {
          id: '1',
          name: 'Property Identification',
          duration: '45 days',
          description: 'Identify potential replacement properties',
          dependencies: []
        },
        {
          id: '2',
          name: 'Due Diligence',
          duration: '60 days',
          description: 'Evaluate replacement properties',
          dependencies: ['1']
        }
      ]
    },
    trainingResources: {
      videos: [
        {
          id: '1',
          title: '1031 Exchange Basics',
          url: 'https://example.com/1031-basics',
          duration: '15 minutes',
          description: 'Introduction to 1031 exchanges'
        }
      ],
      documents: [
        {
          id: '1',
          title: '1031 Exchange Checklist',
          url: 'https://example.com/1031-checklist',
          type: 'PDF',
          description: 'Step-by-step checklist'
        }
      ],
      articles: [
        {
          id: '1',
          title: 'Understanding 1031 Exchanges',
          url: 'https://example.com/1031-guide',
          author: 'Tax Expert',
          description: 'Comprehensive guide'
        }
      ]
    },
    overview: {
      summary: 'Section 1031 allows tax-deferred exchange of investment properties',
      benefits: [
        'Defer capital gains taxes',
        'Consolidate or diversify investments',
        'Step-up basis at death'
      ],
      applicability: [
        'Investment property owners',
        'Business property owners',
        'Real estate investors'
      ],
      taxImplications: [
        'Deferred capital gains tax',
        'Reduced immediate tax liability',
        'Potential recapture on depreciation'
      ]
    }
  },
  {
    name: 'Cost Segregation Study',
    description: 'Accelerate depreciation deductions for commercial property',
    estimatedSavings: 75000,
    isActive: false,
    steps: [
      {
        id: '1',
        description: 'Engage qualified cost segregation specialist',
        completed: false
      },
      {
        id: '2',
        description: 'Complete property analysis',
        completed: false
      }
    ],
    implementationGuide: 'Conduct engineering-based study to identify accelerated depreciation opportunities',
    requirements: [
      'Commercial property ownership',
      'Property value over $1M recommended',
      'Professional study required'
    ],
    risks: [
      'IRS audit scrutiny',
      'Recapture on property sale',
      'Study cost vs benefit analysis'
    ],
    timeline: {
      estimatedDuration: '2-3 months',
      phases: [
        {
          id: '1',
          name: 'Initial Assessment',
          duration: '2 weeks',
          description: 'Property evaluation and feasibility study',
          dependencies: []
        },
        {
          id: '2',
          name: 'Detailed Analysis',
          duration: '6 weeks',
          description: 'Engineering-based study',
          dependencies: ['1']
        }
      ]
    },
    trainingResources: {
      videos: [
        {
          id: '1',
          title: 'Cost Segregation Fundamentals',
          url: 'https://example.com/cost-seg-basics',
          duration: '20 minutes',
          description: 'Overview of cost segregation benefits'
        }
      ],
      documents: [
        {
          id: '1',
          title: 'Cost Segregation Guide',
          url: 'https://example.com/cost-seg-guide',
          type: 'PDF',
          description: 'Comprehensive implementation guide'
        }
      ],
      articles: [
        {
          id: '1',
          title: 'Maximizing Property Depreciation',
          url: 'https://example.com/depreciation-guide',
          author: 'Property Tax Expert',
          description: 'Advanced strategies'
        }
      ]
    },
    overview: {
      summary: 'Accelerate depreciation deductions through detailed property component analysis',
      benefits: [
        'Increased cash flow',
        'Reduced tax liability',
        'Improved ROI'
      ],
      applicability: [
        'Commercial property owners',
        'Recent property acquisitions',
        'Substantial improvements'
      ],
      taxImplications: [
        'Accelerated depreciation',
        'Reduced current tax liability',
        'Potential recapture considerations'
      ]
    }
  }
];

export const seedStrategies = async () => {
  try {
    console.log('Starting strategy seeding...');
    const strategiesRef = collection(db, 'strategies');

    for (const strategy of strategies) {
      await addDoc(strategiesRef, {
        ...strategy,
        dateCreated: serverTimestamp(),
        lastModified: serverTimestamp()
      });
      console.log(`Added strategy: ${strategy.name}`);
    }

    console.log('Strategy seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding strategies:', error);
    throw error;
  }
};