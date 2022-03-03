import { useCallback } from 'react';
import { useAgent } from 'app/hooks';

export const useReadEmailConfig = () => {
  // Hooks
  const { agent } = useAgent();

  // Functions
  const fetchConfig = useCallback(async () => {
    return await agent.readEmailConf();
  }, [agent]);

  // Returns
  return { fetchConfig };
};
