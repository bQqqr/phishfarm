import { useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { AppCtx } from 'app/context';

export const useRemoveTarget = () => {
  // Hooks
  const app = useContext(AppCtx);
  const toast = useToast();

  // Definitions
  async function removeTarget(id: string) {
    try {
      const response = await fetch(
        `https://${app.host}/api/campaign/targets/${id}`,
        {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${app.jwt}`,
          },
        },
      );

      switch (response.status) {
        // The request was successful.
        case 200:
          toast({
            title: 'Target was removed successfully.',
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
  return { removeTarget };
};
