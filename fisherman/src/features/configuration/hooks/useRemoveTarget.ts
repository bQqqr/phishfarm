import { useToast } from '@chakra-ui/react';
import { IRemoveTargetRequest } from 'app/interfaces';
import { useAgent } from 'app/hooks';

export const useRemoveTarget = () => {
  // Hooks
  const { agent } = useAgent();
  const toast = useToast();

  // Definitions
  async function removeTarget(req: IRemoveTargetRequest) {
    await agent.delTarget(req);

    toast({
      title: 'Target was removed successfully.',
      status: 'success',
      isClosable: true,
      duration: 2000,
    });
  }

  // Returns
  return { removeTarget };
};
