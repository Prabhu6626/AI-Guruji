import { debugLog } from './debug';

// Local API connection for auth
// Using local Express backend at http://localhost:5000
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

debugLog('Initializing local API client with URL', API_URL);

// Test connection to local API
export const testAPIConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    
    if (!response.ok) {
      debugLog('API connection test failed', response.status);
      return { success: false, error: 'API not responding' };
    }
    
    debugLog('API connection test succeeded');
    return { success: true };
  } catch (error) {
    debugLog('Unexpected error in API connection test', error);
    return { success: false, error };
  }
};
