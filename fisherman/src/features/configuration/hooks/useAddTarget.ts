import { useToast } from '@chakra-ui/react';
import { useAgent } from 'app/hooks';
import { IAddTargetRequest } from 'app/interfaces';

export const useAddTarget = () => {
  // Hooks
  const { agent } = useAgent();
  const toast = useToast();

  // Functions
  async function addTarget(req: IAddTargetRequest) {
    const resp = await agent.addTarget(req);

    toast({
      title: 'Target was added successfully.',
      status: 'success',
      isClosable: true,
      duration: 2000,
    });

    return resp?.data;
  }

  // Returns
  return { addTarget };
};
