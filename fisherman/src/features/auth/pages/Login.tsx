import { useSetRecoilState } from 'recoil';
import { Heading, useDisclosure, VStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, Modal } from 'app/components';
import { apiAtom } from 'app/global';
import { useAuthenticate, GetTokenRequest } from 'features/auth';

export const Login = () => {
  // Hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authenticate } = useAuthenticate();
  const authForm = useForm<GetTokenRequest>();
  const apiForm = useForm<{ api: string }>();
  const setApi = useSetRecoilState(apiAtom);

  // Functions
  const onApiSubmit: SubmitHandler<{ api: string }> = (inputs) => {
    localStorage.setItem('farm.api', inputs.api);
    setApi(inputs.api);
    onOpen();
  };

  const onPwSubmit: SubmitHandler<GetTokenRequest> = async (inputs) => {
    await authenticate(inputs.password);
    onClose();
  };

  // Returns
  return (
    <VStack justify="center" h="100%" w="100%">
      <Heading>🎣 Fisherman</Heading>
      <Form onSubmit={apiForm.handleSubmit(onApiSubmit)}>
        <Form.Field>
          <Form.Field.Label>Host</Form.Field.Label>
          <Form.Field.Input {...apiForm.register('api')} />
          <Form.Field.Desc>
            Enter the Farm's Domain or IP Address.
          </Form.Field.Desc>
        </Form.Field>
        <Form.Button colorScheme="green">Connect</Form.Button>
      </Form>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <Modal.Header>🔒 Password Prompt</Modal.Header>
        <Modal.Body>
          <Form onSubmit={authForm.handleSubmit(onPwSubmit)}>
            <Form.Field>
              <Form.Field.Label>Password</Form.Field.Label>
              <Form.Field.Input
                type="password"
                {...authForm.register('password')}
              />
              <Form.Field.Desc>
                Enter the Farm's Secret Password to Continue.
              </Form.Field.Desc>
            </Form.Field>
            <Form.Button colorScheme="blue">Login</Form.Button>
          </Form>
        </Modal.Body>
      </Modal>
    </VStack>
  );
};
