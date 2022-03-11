import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from 'app/components';
import { TestEmailRequest, useTestEmail } from 'features/email';
import { Divider, Heading } from '@chakra-ui/react';

interface Props {
  isDisabled: boolean;
}

export const TestEmailForm = ({ isDisabled }: Props) => {
  // Hooks
  const form = useForm<TestEmailRequest>();
  const command = useTestEmail();

  // Functions
  const onSubmit: SubmitHandler<TestEmailRequest> = async (inputs) => {
    await command(inputs);
  };

  return (
    <>
      <Heading size="md" mt={2}>
        Send a Test Email
      </Heading>
      <Divider my={5} />
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Field isDisabled={isDisabled}>
          <Form.Field.Label>Recipient's Email Address</Form.Field.Label>
          <Form.Field.Input {...form.register('recipientEmail')} />
          <Form.Field.Desc>
            Enter the email address, that is going to receive the message.
          </Form.Field.Desc>
        </Form.Field>
        <Form.Button
          isDisabled={isDisabled}
          variant="outline"
          size="sm"
          colorScheme="yellow"
        >
          🧪 Send Test Message
        </Form.Button>
      </Form>
    </>
  );
};
