import { useToast } from '@chakra-ui/react';
import { emailSettingsAtom } from 'app/global';
import { useAxios } from 'app/hooks';
import { EmailSettings, UpdateEmailSettingsRequest } from 'features/email';
import { useSetRecoilState } from 'recoil';

export const useUpdateEmailSettings = () => {
  // Hooks
  const { updateEmailSettings } = useAxios();
  const setEmailSettings = useSetRecoilState(emailSettingsAtom);
  const toast = useToast();

  // Functions
  const command = async (req: UpdateEmailSettingsRequest) => {
    const resp = await updateEmailSettings(req);

    if (resp.status === 204) {
      const newConfig = {
        isConfigured: true,
        isTested: false,
        enabledSsl: req.enabledSsl,
        smtpHost: req.smtpHost,
        smtpPort: req.smtpPort,
        smtpUsername: req.smtpUsername,
        smtpPassword: req.smtpPassword,
        fromEmail: req.fromEmail,
        fromName: req.fromName,
        subject: req.subject,
      } as EmailSettings;

      setEmailSettings(newConfig);

      toast({
        title: 'Email configuration was changed successfully.',
        status: 'success',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  // Returns
  return command;
};
