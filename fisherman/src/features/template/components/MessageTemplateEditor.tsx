import { useEffect, useRef } from 'react';
import { Box, Button, Divider, Heading, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import EmailEditor from 'react-email-editor';
import { templateSettingsAtom } from 'app/global';
import { useUpdateTemplateSettings } from 'features/template';

interface Props {
  isDisabled: boolean;
}

export const MessageTemplateEditor = ({ isDisabled }: Props) => {
  // Hooks
  const ref = useRef<any>(null);
  const update = useUpdateTemplateSettings();
  const settings = useRecoilValue(templateSettingsAtom);

  // Definitions
  const onSubmit = async () => {
    ref?.current?.editor?.exportHtml(async (data: any) => {
      const { design, html } = data;
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
      <Text>
        You can use the following placeholders: %email%, %first%, %last%,
        %maldoc%
      </Text>
      <Divider my={5} />
      <EmailEditor
        style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
        ref={ref}
      />
      <Button
        isDisabled={isDisabled}
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
