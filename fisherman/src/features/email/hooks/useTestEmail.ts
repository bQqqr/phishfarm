import { useToast } from '@chakra-ui/react';
import { emailSettingsAtom } from 'app/global';
import { useAxios } from 'app/hooks';
import { TestEmailRequest } from 'features/email';
import { useRecoilState } from 'recoil';
import { EmailSettings } from '../interfaces';

export const useTestEmail = () => {
  // Hooks
  const { testEmail } = useAxios();
  const toast = useToast();
  const [emailSettings, setEmailSettings] = useRecoilState(emailSettingsAtom);

  // Functions
  const command = async (req: TestEmailRequest) => {
    const resp = await testEmail(req);

    if (resp.status === 204) {
      const settings = {
        isConfigured: emailSettings?.isConfigured,
        isTested: true,
        smtpHost: emailSettings?.smtpHost,
        smtpPort: emailSettings?.smtpPort,
        enabledSsl: emailSettings?.enabledSsl,
        smtpUsername: emailSettings?.smtpUsername,
        smtpPassword: emailSettings?.smtpPassword,
        fromEmail: emailSettings?.fromEmail,
        fromName: emailSettings?.fromName,
        subject: emailSettings?.subject,
      } as EmailSettings;

      setEmailSettings(settings);

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
