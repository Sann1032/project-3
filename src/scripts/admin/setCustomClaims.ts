import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin with your service account
const serviceAccount = {
  "type": "service_account",
  "project_id": "tax-planning-app",
  "private_key_id": "a5b295e78808fab012b2e07126cb44cc528ea96f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCVF3qGBFGg+r6Z\nw0ayeyCAQgz6Q/I0jeA5pgkXwSSCYyYbHUApr85P2Y51I/ALU1PmNOsu1mTDPZ1/\nP+UuFWlpfnYRQbZZSzeeHQtBV6VdSs7exB6ALFg+xexuSv6OR6p+hR5o92snDTQC\nFMNhsNAR+I9jVBk3XBm3agKSnwdkvF2R3zVXxbkpl0Sp4BbU7BvTQgtYDlSkqyQM\n/T6vHIO5t82efQWIouVaZ8yRpIwTqzI+cGhpo4Y0rPbNJFPW0AhW3wf4hWt1GsrQ\nKAjt4dE+Zsu+VzkfLXBuuwQnqb9lQm6j7qUKJLE1gCstq8TODm/OaeCdnTAEfNGo\nO3Y4lpZ3AgMBAAECggEAF538AS2+9oax2a6mzNAXUmnkH2LTA8MzsT4dc59bVrI5\nD5N/Hftk7Z4zZFf4hvrAsBdS5/z7QjhI8ibfeYDXzWfEcTBdH+D74vaL2WJ2ZgRb\nJ8ueX0RnCC6XKNOFZmlw1xDkQ9Fprmp3ghri5l85Xpdms1/XjL7wre7DkJFTfP/h\nqjw81sSi7Mpr2o28L8HbL1M5CLIAYz8HPmXm6fPymo1r4I6XIHFnscz5m+9Ml0pL\nXNGPYQY8pI5t+plXt+tkHldQcQaFkjpXXeo2dHao04YedZ+7KP5fLfw0cuihrW8P\nupvbiOf/Q7TJIY01LnJjMkEACotYalTYWFFpLVjgvQKBgQDSsaAV5WMlhURBy2On\nY+iGUqvHYZxez+oaub5N+cD27Txd4dwO+oZ4w7vlLeGGbqin0RH6vpyAot2MQqX9\njFGXXY0e2DINrAVjlcYJ1e6xot2yW/89SNCbJHRGRAET8ZXCLBZQPOEiedfIrTdC\nF1Jf8DP9rwPgR3+PlG/dNZZPpQKBgQC1Jr/w4K++Ou82L4OhQNp6e84r5bNd7Io7\nQxDYLRHBe7XOgLt0duTApZk24YnfpHhiLjfrCJs+j+wISRbYwbGrgl2K+AiJFLpf\nDBVFvOrRiCeb9hKSwj1puuK5uBWATxMElXJDWVC4rGR3AoyJCPvdQFyebXLn21ah\nl0WpPlRy6wKBgEMn3Ke+Arkd3iC+jFf5T08pIJmfcjECQlMcaxz9g1TxTvF5oSOh\nFKV/de9ZjW3E7br3t6xdfxK9VrJzN+c2B3egmO+A54tWDi2sun++EaPLDrDgA93r\nzJn2p50R5eoOcbZ/SOlwTi4n+fB7zYYiWt47eMbeNvUQtQb1wCYZA30FAoGAQIGI\n7dSEoD/KOMhYng5C/kSh2P3VjkeRvaKXF/OMlBJiXiN3HPTNZlBRq7pKZ0ng2E1O\n+jG5XmDPku+74/mtM76bYsYJ/A5Wg0wBMzEfiPdr61yHppzmU4UKAUos1eDSi9pP\nsu3WEbzJlZthwdZiIZouoPemaCuxwJ7mXmrklXsCgYB6gQ/xAlcTKmOmxhAzunlu\nVDCW6gnJQVgh9HzQ/EX8kVo0XAJy4HNmvsTXaZMMBmV0w09ua5DFH58N3RgflveM\naqT+DU9UTrqO1nLTKNwXw1Kk7Bc7DJw+NWBFkEzKgNGD1O2zOZAQCs5e5EC7i7H9\n6mDQ6SjXO7kZV7Ds1Em8+g==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-pmvc5@tax-planning-app.iam.gserviceaccount.com",
  "client_id": "101166854883626387456",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pmvc5%40tax-planning-app.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export const setFirmClaims = async (email: string, firmId: string) => {
  try {
    const user = await getAuth().getUserByEmail(email);
    await getAuth().setCustomUserClaims(user.uid, {
      role: 'firm',
      firmId
    });
    console.log(`Successfully set firm claims for user: ${email}`);
  } catch (error) {
    console.error('Error setting firm claims:', error);
    throw error;
  }
};

export const setClientClaims = async (email: string, firmId: string) => {
  try {
    const user = await getAuth().getUserByEmail(email);
    await getAuth().setCustomUserClaims(user.uid, {
      role: 'client',
      firmId
    });
    console.log(`Successfully set client claims for user: ${email}`);
  } catch (error) {
    console.error('Error setting client claims:', error);
    throw error;
  }
};

// Example usage:
const setupInitialFirm = async () => {
  const firmEmail = 'firm@example.com';
  const firmId = 'firm_' + Date.now();
  await setFirmClaims(firmEmail, firmId);
};

const setupInitialClient = async () => {
  const clientEmail = 'client@example.com';
  const firmId = 'firm_123'; // Use the actual firm ID
  await setClientClaims(clientEmail, firmId);
};

if (require.main === module) {
  // Run setup when script is executed directly
  setupInitialFirm().catch(console.error);
}