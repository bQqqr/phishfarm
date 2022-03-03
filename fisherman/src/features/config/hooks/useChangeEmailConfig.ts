import { useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { AppCtx } from 'app/context';
import { IConfigureEmailRequest } from 'features/config';

export const useChangeEmailConfig = () => {
  // Hooks
  const app = useContext(AppCtx);
  const toast = useToast();

  // Definitions
  async function changeEmailConfig(req: IConfigureEmailRequest) {
    try {
      const response = await fetch(`https://${app.host}/api/email-config`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${app.jwt}`,
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(req),
      });

      switch (response.status) {
        // The request was successful.
        case 200:
          toast({
            title: 'Email configuration was changed successfully.',
            status: 'success',
            isClosable: true,
            duration: 2000,
          });
          break;
        // The request had validation errors.
        case 400:
          const responseBody = await response.json();
          toast({
            title: responseBody.message,
            description: JSON.stringify(responseBody.errors),
            status: 'error',
            isClosable: true,
            duration: 2000,
          });
          break;
        // The request included an expired token.
        case 401:
          app.logout();
          break;
        default:
          break;
      }
    } catch (exception) {
      console.log(exception);
      /* The request did not reach a Farm. */
      toast({
        title: 'There was a network error.',
        status: 'error',
        isClosable: true,
        duration: 2000,
      });
    }
  }

  // Returns
  return { changeEmailConfig };
};
