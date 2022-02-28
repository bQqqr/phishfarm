import { useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { AppCtx } from 'app/context';

export const useAuthenticate = () => {
  // Hooks
  const auth = useContext(AppCtx);
  const toast = useToast();

  // Definitions
  async function authenticate(host: string, pw: string) {
    try {
      const response = await fetch(`https://${host}/api/operator/authenticate`, {
        method: 'POST',
        headers: { 'content-type': 'application/json;charset=UTF-8' },
        body: JSON.stringify({ Password: pw }),
      });

      const responseBody = await response.json();

      switch (response.status) {
        /* The authenticate request succeeded. */
        case 200:
          auth.changeHost(host);
          auth.changeJwt(responseBody.token);
          auth.changeAuthenticated(true);
          break;
        /* The authenticate request failed. */
        case 401:
          toast({
            title: 'The password that you have entered is wrong.',
            status: 'error',
            isClosable: true,
            duration: 2000,
          });
          break;
        default:
          break;
      }
    } catch (exception) {
      /* The request did not reach any Farm api. */
      toast({
        title: 'The host that you entered does not exist.',
        status: 'error',
        isClosable: true,
        duration: 2000,
      });
    }
  }

  // Returns
  return { authenticate };
};
