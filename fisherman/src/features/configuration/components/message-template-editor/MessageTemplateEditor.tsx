import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Button, VStack } from '@chakra-ui/react';
import EmailEditor from 'react-email-editor';
import { emailConfigAtom } from 'app/global/app';
import { useChangeTemplate } from 'features/configuration';
import { IEmailConfig } from 'app/interfaces';

export const MessageTemplateEditor = () => {
  // Hooks
  const [config, setConfig] = useRecoilState(emailConfigAtom);
  const { changeTemplate } = useChangeTemplate();
  const ref = useRef<any>(null);

  // Definitions
  const onSubmit = async () => {
    ref?.current?.editor?.exportHtml(async (data: any) => {
      const { design, html } = data;
      await changeTemplate({
        html: JSON.stringify(html)
          .replace(/\\n/g, '')
          .substring(1)
          .slice(0, -1),
        design: JSON.stringify(design),
      });

      setConfig((oldConfig) => {
        return {
          isConfigured: oldConfig!.isConfigured,
          enabledSsl: oldConfig!.enabledSsl,
          smtpHost: oldConfig!.smtpHost,
          smtpPort: oldConfig!.smtpPort,
          smtpUsername: oldConfig!.smtpUsername,
          smtpPassword: oldConfig!.smtpPassword,
          fromEmail: oldConfig!.fromEmail,
          fromName: oldConfig!.fromName,
          subject: oldConfig!.subject,
          template: {
            html: html,
            design: design,
          },
        } as IEmailConfig;
      });
    });
  };

  // Boostrap
  useEffect(() => {
    async function boostrapTemplate() {
      console.log(config);
      if (config?.template.design)
        ref?.current?.editor?.loadDesign(JSON.parse(config.template.design));
    }

    boostrapTemplate();
  }, [config]);

  // Returns
  return (
    <VStack align="start" spacing={5}>
      <Box border="1px solid" h="60%">
        <EmailEditor ref={ref} />
      </Box>
      <Button colorScheme="green" onClick={onSubmit}>
        Save Message Template
      </Button>
    </VStack>
  );
};
