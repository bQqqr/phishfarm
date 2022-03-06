import { useAgent } from 'app/hooks';
import { useCallback } from 'react';

export const useGetTargets = () => {
  // Hooks
  const { agent } = useAgent();

  // Functions
  const query = useCallback(async () => {
    return await agent.getTargets();
  }, [agent]);

  // Returns
  return query;
};
