import { useToast } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { templateSettingsAtom } from 'app/global';
import { useAgent } from 'app/hooks';
import {
  TemplateSettings,
  UpdateTemplateSettingsRequest,
} from 'features/template';

export const useUpdateTemplateSettings = () => {
  // Hooks
  const toast = useToast();
  const setTemplateSettings = useSetRecoilState(templateSettingsAtom);
  const { agent } = useAgent();

  // Functions
  const query = async (req: UpdateTemplateSettingsRequest) => {
    const resp = await agent.updateTemplateSettings(req);

    if (resp.status === 204) {
      const settings = {
        isConfigured: true,
        html: req.html,
        design: req.design,
      } as TemplateSettings;

      setTemplateSettings(settings);

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
