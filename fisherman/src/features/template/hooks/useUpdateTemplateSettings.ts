import { useToast } from '@chakra-ui/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { emailSettingsAtom, templateSettingsAtom } from 'app/global';
import { useAxios } from 'app/hooks';
import {
  TemplateSettings,
  UpdateTemplateSettingsRequest,
} from 'features/template';
import { EmailSettings } from 'features/email';

export const useUpdateTemplateSettings = () => {
  // Hooks
  const toast = useToast();
  const [emailSettings, setEmailSettings] = useRecoilState(emailSettingsAtom);
  const setTemplateSettings = useSetRecoilState(templateSettingsAtom);
  const { updateTemplateSettings } = useAxios();

  // Functions
  const query = async (req: UpdateTemplateSettingsRequest) => {
    const resp = await updateTemplateSettings(req);

    if (resp.status === 204) {
      const tSettings = {
        isConfigured: true,
        html: req.html,
        design: req.design,
      } as TemplateSettings;

      setTemplateSettings(tSettings);

      const eSettings = {
        isConfigured: emailSettings?.isConfigured,
        isTested: false,
        enabledSsl: emailSettings?.enabledSsl,
        smtpHost: emailSettings?.smtpHost,
        smtpPort: emailSettings?.smtpPort,
        smtpUsername: emailSettings?.smtpUsername,
        smtpPassword: emailSettings?.smtpPassword,
        fromEmail: emailSettings?.fromEmail,
        fromName: emailSettings?.fromName,
        subject: emailSettings?.subject,
      } as EmailSettings;

      setEmailSettings(eSettings);

      toast({
        title: 'Template was changed successfully.',
        status: 'success',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  // Returns
  return query;
};
