import { useRecoilState } from 'recoil';
import { Heading, useDisclosure, VStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, Modal } from 'app/components';
import { apiAtom } from 'app/global';
import { IAuthenticateRequest } from 'app/interfaces';
import { useAuthenticate } from 'features/authentication';

export const Login = () => {
  // Hooks
  const pwForm = useForm<IAuthenticateRequest>();
  const apiForm = useForm<{ api: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, setApi] = useRecoilState(apiAtom);
  const { authenticate } = useAuthenticate();

  // Functions
  const onApiSubmit: SubmitHandler<{ api: string }> = (inputs) => {
    localStorage.setItem('farm.api', inputs.api);
    setApi(inputs.api);
    onOpen();
  };

  const onPwSubmit: SubmitHandler<IAuthenticateRequest> = async (inputs) => {
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
          <Form onSubmit={pwForm.handleSubmit(onPwSubmit)}>
            <Form.Field>
              <Form.Field.Label>Password</Form.Field.Label>
              <Form.Field.Input
                type="password"
                {...pwForm.register('password')}
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
