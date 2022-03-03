import { VStack, Text, Container } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from 'app/components';
import { ISendTestEmailRequest } from 'app/interfaces';
import { useSendTestEmail } from 'features/configuration';

export const ConfirmAndLaunch = () => {
  // Hooks
  const form = useForm<ISendTestEmailRequest>();
  const { sendTestEmail } = useSendTestEmail();

  // Functions
  const onSubmit: SubmitHandler<ISendTestEmailRequest> = async (inputs) => {
    await sendTestEmail(inputs);
  };

  // Returns
  return (
    <Container>
      <VStack>
        <Text align="start">
          First, make sure that email settings and message template is properly
          configured by sending a test message.
        </Text>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Form.Field>
            <Form.Field.Label>Recipient's Email Address</Form.Field.Label>
            <Form.Field.Input {...form.register('recipientEmail')} />
            <Form.Field.Desc>
              Enter where to send the test message.
            </Form.Field.Desc>
            <Form.Button>Test</Form.Button>
          </Form.Field>
        </Form>
      </VStack>
    </Container>
  );
};
