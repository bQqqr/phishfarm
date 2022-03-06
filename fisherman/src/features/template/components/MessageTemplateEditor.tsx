import { useEffect, useRef } from 'react';
import { Box, Button, Divider, Heading } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import EmailEditor from 'react-email-editor';
import { templateSettingsAtom } from 'app/global';
import { useUpdateTemplateSettings } from 'features/template';

export const MessageTemplateEditor = () => {
  // Hooks
  const ref = useRef<any>(null);
  const update = useUpdateTemplateSettings();
  const settings = useRecoilValue(templateSettingsAtom);

  // Definitions
  const onSubmit = async () => {
    ref?.current?.editor?.exportHtml(async (data: any) => {
      const { design, html } = data;
      console.log(html);
      await update({
        html: html,
        design: JSON.stringify(design),
      });
    });
  };

  // Boostrap
  useEffect(() => {
    async function boostrapTemplate() {
      if (settings && settings.isConfigured)
        ref?.current?.editor?.loadDesign(JSON.parse(settings.design));
    }

    setTimeout(() => boostrapTemplate(), 3000);
  }, [settings]);

  // Returns
  return (
    <Box>
      <Heading size="md" mt={2}>
        Draw the Email Message Template
      </Heading>
      <Divider my={5} />
      <EmailEditor ref={ref} />
      <Button
        mt={5}
        size="sm"
        variant="outline"
        colorScheme="green"
        onClick={onSubmit}
      >
        ✅ Save Message Template
      </Button>
    </Box>
  );
};
