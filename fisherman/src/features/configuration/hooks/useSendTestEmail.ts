import { useToast } from '@chakra-ui/react';
import { useAgent } from 'app/hooks';
import { ISendTestEmailRequest } from 'app/interfaces';

export const useSendTestEmail = () => {
  // Hooks
  const { agent } = useAgent();
  const toast = useToast();

  // Definitions
  async function sendTestEmail(req: ISendTestEmailRequest) {
    await agent.testEmail(req);

    toast({
      title: 'Test email was sent successfully.',
      status: 'success',
      isClosable: true,
      duration: 2000,
    });
  }

  // Returns
  return { sendTestEmail };
};
