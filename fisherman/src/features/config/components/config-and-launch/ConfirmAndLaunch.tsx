import { VStack, Text, Container, Input, Button } from '@chakra-ui/react';
import { useSendTestEmail } from 'features/config';
import { useState } from 'react';

export const ConfirmAndLaunch = () => {
  // Hooks
  const [recipient, setRecipient] = useState('');
  const { sendTestEmail } = useSendTestEmail();

  // Definitions
  async function SendTestEmail() {
    await sendTestEmail(recipient);
    setRecipient('');
  }

  // Returns
  return (
    <Container>
      <VStack>
        <Text align="start">
          First, make sure that email settings and message template is properly
          configured by sending a test message.
        </Text>
        <Input
          value={recipient}
          onChange={(e) => setRecipient(e.target?.value)}
          placeholder={`Enter recipient's email address.`}
        />
        <Button onClick={SendTestEmail} colorScheme="yellow">
          Send a test email.
        </Button>
      </VStack>
    </Container>
  );
};
