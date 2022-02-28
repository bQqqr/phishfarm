import { useCallback, useContext } from 'react';
import { AppCtx } from 'app/context';

export const useReadEmailConfig = () => {
  // Hooks
  const app = useContext(AppCtx);

  // Definitions
  const fetchConfig = useCallback(async () => {
    const response = await fetch(`https://${app.host}/api/operator/read-email-config`, {
      method: 'GET',
      headers: { authorization: `Bearer ${app.jwt}` },
    });

    const responseBody = await response.json();

    if (response.status === 401) {
      app.logout();
      return null;
    } else return responseBody;
  }, [app]);

  // Returns
  return { fetchConfig };
};
