import { setFirmClaims } from './setCustomClaims';

const setupCongdonFirm = async () => {
  const firmEmail = 'jacob@congdonandcompany';
  const firmId = 'congdon_firm_' + Date.now();
  
  try {
    await setFirmClaims(firmEmail, firmId);
    console.log('Successfully set firm claims for Congdon & Company');
    return firmId;
  } catch (error) {
    console.error('Error setting up Congdon firm:', error);
    throw error;
  }
};

if (require.main === module) {
  setupCongdonFirm().catch(console.error);
}