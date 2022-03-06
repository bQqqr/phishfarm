import { useCallback } from 'react';
import { useAgent } from 'app/hooks';

export const useGetTemplateSettings = () => {
  // Hooks
  const { agent } = useAgent();

  // Functions
  const query = useCallback(async () => {
    return await agent.getTemplateSettings();
  }, [agent]);

  // Returns
  return query;
};
