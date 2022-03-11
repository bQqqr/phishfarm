import { useCallback } from 'react';
import { useAxios } from 'app/hooks';

export const useGetTemplateSettings = () => {
  // Hooks
  const { getTemplateSettings } = useAxios();

  // Functions
  const query = useCallback(async () => {
    const resp = await getTemplateSettings();
    if (resp.data) return resp.data;
  }, [getTemplateSettings]);

  // Returns
  return query;
};
