import { useState } from 'react';
import { DatabaseError } from '../utils/validation';
import { databaseService } from '../services/database';

export const useDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDatabaseOperation = async <T>(
    operation: () => Promise<T>,
    errorMessage: string
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await operation();
      return result;
    } catch (err) {
      const message = err instanceof DatabaseError 
        ? `${errorMessage}: ${err.message}`
        : errorMessage;
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addDocument = async (collection: string, docId: string, data: any) => {
    return handleDatabaseOperation(
      () => databaseService.addDocument(collection, docId, data),
      'Error adding document'
    );
  };

  const updateDocument = async (collection: string, docId: string, data: any) => {
    return handleDatabaseOperation(
      () => databaseService.updateDocument(collection, docId, data),
      'Error updating document'
    );
  };

  const batchWrite = async (operations: any[]) => {
    return handleDatabaseOperation(
      () => databaseService.batchWrite(operations),
      'Error performing batch operation'
    );
  };

  const queryDocuments = async (collection: string, conditions: any[]) => {
    return handleDatabaseOperation(
      () => databaseService.queryDocuments(collection, conditions),
      'Error querying documents'
    );
  };

  return {
    addDocument,
    updateDocument,
    batchWrite,
    queryDocuments,
    loading,
    error
  };
};