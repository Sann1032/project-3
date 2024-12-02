import { Timestamp } from 'firebase/firestore';

export const convertTimestampToDate = (timestamp: any): Date => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  if (timestamp?.seconds) {
    return new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate();
  }
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return new Date();
};

export const cleanFirestoreData = <T extends Record<string, any>>(data: T): T => {
  const cleaned = { ...data };
  
  Object.keys(cleaned).forEach(key => {
    if (cleaned[key] === undefined) {
      delete cleaned[key];
    } else if (cleaned[key] === null) {
      delete cleaned[key];
    } else if (Array.isArray(cleaned[key])) {
      cleaned[key] = cleaned[key].map(item => 
        typeof item === 'object' ? cleanFirestoreData(item) : item
      );
    } else if (typeof cleaned[key] === 'object') {
      cleaned[key] = cleanFirestoreData(cleaned[key]);
    }
  });

  return cleaned;
};