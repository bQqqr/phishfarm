import { useToast } from '@chakra-ui/react';
import { useAgent } from 'app/hooks';
import { IChangeTemplateConfigRequest } from 'app/interfaces';

export const useChangeTemplate = () => {
  // Hooks
  const toast = useToast();
  const { agent } = useAgent();

  // Functions
  async function changeTemplate(req: IChangeTemplateConfigRequest) {
    await agent.changeTemplate(req);

    toast({
      title: 'Template was changed successfully.',
      status: 'success',
      isClosable: true,
      duration: 2000,
    });
  }

  // Returns
  return { changeTemplate };
};
