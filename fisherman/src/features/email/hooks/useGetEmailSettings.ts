import { useCallback } from 'react';
import { useAgent } from 'app/hooks';

export const useGetEmailSettings = () => {
  // Hooks
  const { agent } = useAgent();

  // Functions
  const query = useCallback(async () => {
    return await agent.getEmailSettings();
  }, [agent]);

  // Returns
  return query;
};
