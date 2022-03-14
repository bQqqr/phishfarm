import { useCallback } from 'react';
import { useAxios } from 'app/hooks';

export const useGetEmailSettings = () => {
  // Hooks
  const { getEmailSettings } = useAxios();

  // Functions
  const query = useCallback(async () => {
    const resp = await getEmailSettings();
    if (resp) return resp.data;
  }, [getEmailSettings]);

  // Returns
  return query;
};
