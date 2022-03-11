import { useAxios } from 'app/hooks';
import { useCallback } from 'react';

export const useGetTargets = () => {
  // Hooks
  const { getTargets } = useAxios();

  // Functions
  const query = useCallback(async () => {
    const resp = await getTargets();
    if (resp.data) return resp.data;
  }, [getTargets]);

  // Returns
  return query;
};
