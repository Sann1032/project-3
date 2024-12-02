import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

interface FirmData {
  name: string;
  email: string;
  clients: string[];
  createdAt: admin.firestore.Timestamp;
}

interface ClientData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    filingStatus: string;
    dependents: number;
  };
  financialInfo: {
    annualIncome: number;
    employmentType: string;
    hasBusinessIncome: boolean;
    hasInvestmentIncome: boolean;
    hasRentalIncome: boolean;
    retirementContributions: number;
  };
  firmId: string;
  createdAt: admin.firestore.Timestamp;
}

export const seedFirmData = async () => {
  try {
    // Create firm document
    const firmData: FirmData = {
      name: 'Example Accounting Firm',
      email: 'firm@example.com',
      clients: [],
      createdAt: admin.firestore.Timestamp.now()
    };

    const firmRef = db.collection('firms').doc();
    await firmRef.set(firmData);
    console.log('Created firm document:', firmRef.id);

    // Create sample client
    const clientData: ClientData = {
      personalInfo: {
        name: 'John Doe',
        email: 'client@example.com',
        phone: '555-123-4567',
        filingStatus: 'Single',
        dependents: 0
      },
      financialInfo: {
        annualIncome: 75000,
        employmentType: 'W2 Employee',
        hasBusinessIncome: false,
        hasInvestmentIncome: false,
        hasRentalIncome: false,
        retirementContributions: 5000
      },
      firmId: firmRef.id,
      createdAt: admin.firestore.Timestamp.now()
    };

    const clientRef = db.collection('clients').doc();
    await clientRef.set(clientData);
    console.log('Created client document:', clientRef.id);

    // Update firm with client reference
    await firmRef.update({
      clients: admin.firestore.FieldValue.arrayUnion(clientRef.id)
    });

    console.log('Successfully seeded firm and client data');
  } catch (error) {
    console.error('Error seeding firm data:', error);
    throw error;
  }
};

if (require.main === module) {
  // Run seeding when script is executed directly
  seedFirmData().catch(console.error);
}