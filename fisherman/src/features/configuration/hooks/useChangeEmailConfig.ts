import { useToast } from '@chakra-ui/react';
import { useAgent } from 'app/hooks';
import { IChangeEmailConfigRequest } from 'app/interfaces';

export const useChangeEmailConfig = () => {
  // Hooks
  const { agent } = useAgent();
  const toast = useToast();

  // Functions
  async function changeEmailConfig(req: IChangeEmailConfigRequest) {
    await agent.changeEmailConf(req);

    toast({
      title: 'Email configuration was changed successfully.',
      status: 'success',
      isClosable: true,
      duration: 2000,
    });
  }

  // Returns
  return { changeEmailConfig };
};
