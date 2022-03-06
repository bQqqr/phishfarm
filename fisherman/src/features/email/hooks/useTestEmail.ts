import { useToast } from '@chakra-ui/react';
import { emailSettingsAtom } from 'app/global';
import { useAgent } from 'app/hooks';
import { TestEmailRequest } from 'features/email';
import { useSetRecoilState } from 'recoil';
import { EmailSettings } from '../interfaces';

export const useTestEmail = () => {
  // Hooks
  const { agent } = useAgent();
  const toast = useToast();
  const setEmailSettings = useSetRecoilState(emailSettingsAtom);

  // Functions
  const command = async (req: TestEmailRequest) => {
    const resp = await agent.testEmail(req);

    if (resp.status === 204) {
      setEmailSettings((old) => {
        return {
          isConfigured: old?.isConfigured,
          isTested: true,
          smtpHost: old?.smtpHost,
          smtpPort: old?.smtpPort,
          enabledSsl: old?.enabledSsl,
          smtpUsername: old?.smtpUsername,
          smtpPassword: old?.smtpPassword,
          fromEmail: old?.fromEmail,
          fromName: old?.fromName,
          subject: old?.subject,
        } as EmailSettings;
      });
      toast({
        title: 'Test email was send successfully.',
        status: 'success',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  // Returns
  return command;
};
