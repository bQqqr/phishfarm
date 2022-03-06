import { useCallback } from 'react';
import { useAgent } from 'app/hooks';

export const useGetCampaignSettings = () => {
  // Hooks
  const { agent } = useAgent();

  // Functions
  const query = useCallback(async () => {
    return await agent.getCampaignSettings();
  }, [agent]);

  // Returns
  return query;
};
