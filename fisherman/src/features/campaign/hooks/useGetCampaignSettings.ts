import { useCallback } from 'react';
import { useAxios } from 'app/hooks';

export const useGetCampaignSettings = () => {
  // Hooks
  const { getCampaignSettings } = useAxios();

  // Functions
  const query = useCallback(async () => {
    const resp = await getCampaignSettings();

    if (resp) return resp.data;
  }, [getCampaignSettings]);

  // Returns
  return query;
};
