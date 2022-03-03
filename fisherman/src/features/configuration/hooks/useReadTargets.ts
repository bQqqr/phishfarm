import { useAgent } from 'app/hooks';
import { useCallback } from 'react';
export const useReadTargets = () => {
  // Hooks
  const { agent } = useAgent();

  // Functions
  const fetchTargets = useCallback(async () => {
    return await agent.readTargets();
  }, [agent]);

  // Returns
  return { fetchTargets };
};
