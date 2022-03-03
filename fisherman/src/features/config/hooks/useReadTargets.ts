import { useCallback, useContext } from 'react';
import { AppCtx } from 'app/context';

export const useReadTargets = () => {
  // Hooks
  const app = useContext(AppCtx);

  // Definitions
  const fetchTargets = useCallback(async () => {
    try {
      const response = await fetch(`https://${app.host}/api/campaign/targets`, {
        method: 'GET',
        headers: { authorization: `Bearer ${app.jwt}` },
      });

      switch (response.status) {
        case 401:
          app.logout();
          break;
        case 200:
          return await response.json();
        default:
          break;
      }
    } catch (exception) {
      app.logout();
    }
  }, [app]);

  // Returns
  return { fetchTargets };
};
