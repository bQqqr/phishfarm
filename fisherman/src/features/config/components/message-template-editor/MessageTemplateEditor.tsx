import { useEffect, useRef } from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';
import EmailEditor from 'react-email-editor';
import { useChangeTemplate, useReadTemplate } from 'features/config';

export const MessageTemplateEditor = () => {
  // Hooks
  const ref = useRef<any>(null);
  const { changeTemplate } = useChangeTemplate();
  const { fetchTemplate } = useReadTemplate();

  // Definitions
  const exportHtml = async () => {
    ref?.current?.editor?.exportHtml(async (data: any) => {
      const { design, html } = data;
      await changeTemplate({
        html: JSON.stringify(html)
          .replace(/\\n/g, '')
          .substring(1)
          .slice(0, -1),
        design: JSON.stringify(design),
      });
    });
  };

  // Boostrap
  useEffect(() => {
    async function boostrapTemplate() {
      const temp = await fetchTemplate();
      if (temp?.design !== '' && temp?.html !== '')
        ref?.current?.editor?.loadDesign(JSON.parse(temp?.design));
    }

    boostrapTemplate();
  }, [fetchTemplate]);

  // Returns
  return (
    <VStack align="start" spacing={5}>
      <Box border="1px solid" h="60%">
        <EmailEditor ref={ref} />
      </Box>
      <Button colorScheme="green" onClick={exportHtml}>
        Save Message Template
      </Button>
    </VStack>
  );
};
