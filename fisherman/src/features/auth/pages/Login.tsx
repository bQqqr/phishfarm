import { SubmitHandler, useForm } from 'react-hook-form';
import { Heading, VStack } from '@chakra-ui/react';
import { Form } from 'app/components';
import { useAuthenticate } from '../hooks';

interface IData {
  host: string;
  pw: string;
}

export const Login = () => {
  // Hooks
  const { authenticate } = useAuthenticate();
  const form = useForm<IData>();

  // Definitions
  const onSubmit: SubmitHandler<IData> = async (inputs) => {
    await authenticate(inputs.host, inputs.pw);
  };

  // Returns
  return (
    <VStack justify="center" h="100%" w="100%">
      <Heading>🎣 🐟🐡🐠 Farmer client </Heading>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Field>
          <Form.Field.Label>Host</Form.Field.Label>
          <Form.Field.Input {...form.register('host')} />
          <Form.Field.Desc>
            Enter the DNS or IPv4 address of the Farm that you want to connect to.
          </Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Label>Password</Form.Field.Label>
          <Form.Field.Input type="password" {...form.register('pw')} />
          <Form.Field.Desc>Enter the secret password.</Form.Field.Desc>
        </Form.Field>
        <Form.Button>Login</Form.Button>
      </Form>
    </VStack>
  );
};
