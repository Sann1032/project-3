import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

const seedCongdonData = async () => {
  try {
    // Create Congdon & Company firm document
    const firmData = {
      name: 'Congdon & Company',
      email: 'jacob@congdonandcompany',
      clients: [],
      createdAt: admin.firestore.Timestamp.now()
    };

    const firmRef = db.collection('firms').doc('congdon_firm');
    await firmRef.set(firmData);
    console.log('Created Congdon & Company firm document');

    // Create sample client data
    const sampleClientData = {
      personalInfo: {
        name: 'Sample Client',
        email: 'sample@client.com',
        phone: '555-0123',
        filingStatus: 'Single',
        dependents: 0
      },
      financialInfo: {
        annualIncome: 100000,
        employmentType: 'W2 Employee',
        hasBusinessIncome: false,
        hasInvestmentIncome: true,
        hasRentalIncome: false,
        retirementContributions: 6000
      },
      firmId: 'congdon_firm',
      createdAt: admin.firestore.Timestamp.now()
    };

    const clientRef = db.collection('clients').doc();
    await clientRef.set(sampleClientData);
    console.log('Created sample client document');

    // Update firm with client reference
    await firmRef.update({
      clients: admin.firestore.FieldValue.arrayUnion(clientRef.id)
    });

    console.log('Successfully seeded Congdon & Company data');
  } catch (error) {
    console.error('Error seeding Congdon data:', error);
    throw error;
  }
};

if (require.main === module) {
  seedCongdonData().catch(console.error);
}