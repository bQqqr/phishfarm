import { useRecoilValue } from 'recoil';
import {
  Button,
  Divider,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Drawer, Form, Table } from 'app/components';
import { targetsAtom } from 'app/global';
import { useCreateTarget, useDeleteTarget } from 'features/target';

interface Props {
  isDisabled: boolean;
}

export interface FormFields {
  firstName: string;
  lastName: string;
  emailAddress: string;
  maldoc: File[];
}

export const TargetsTable = ({ isDisabled }: Props) => {
  // Hooks
  const form = useForm<FormFields>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const targets = useRecoilValue(targetsAtom);
  const createCommand = useCreateTarget();
  const deleteCommand = useDeleteTarget();

  // Definitions
  const toBase64 = async (blob: File) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    }) as Promise<string>;
  };

  const onSubmit: SubmitHandler<FormFields> = async (inputs) => {
    const content = await toBase64(inputs.maldoc[0]);

    await createCommand({
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      emailAddress: inputs.emailAddress,
      maldocFilename: inputs.maldoc[0].name,
      maldocContent: content,
    });

    onClose();
  };

  const onDelete = async (id: string) => {
    await deleteCommand({ targetId: id });
  };

  return (
    <>
      <Heading mt={2} size="md">
        Add Some Fish Targets
      </Heading>
      <Divider my={5} />
      <Button
        isDisabled={isDisabled}
        variant="outline"
        size="sm"
        onClick={onOpen}
        colorScheme="green"
      >
        🐟 Create a Target
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <Drawer.Header>Create a Target</Drawer.Header>
        <Drawer.Body>
          <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Form.Field isDisabled={isDisabled}>
              <Form.Field.Label>First Name</Form.Field.Label>
              <Form.Field.Input {...form.register('firstName')} type="text" />
              <Form.Field.Desc>Enter the target's first name.</Form.Field.Desc>
            </Form.Field>
            <Form.Field isDisabled={isDisabled}>
              <Form.Field.Label>Last Name</Form.Field.Label>
              <Form.Field.Input {...form.register('lastName')} type="text" />
              <Form.Field.Desc>Enter the target's last name.</Form.Field.Desc>
            </Form.Field>
            <Form.Field isDisabled={isDisabled}>
              <Form.Field.Label>Email</Form.Field.Label>
              <Form.Field.Input
                {...form.register('emailAddress')}
                type="email"
              />
              <Form.Field.Desc>
                Enter the target's email address.
              </Form.Field.Desc>
            </Form.Field>
            <Form.Field isDisabled={isDisabled}>
              <Form.Field.Label>Maldoc</Form.Field.Label>
              <Form.Field.Input {...form.register('maldoc')} type="file" />
              <Form.Field.Desc>
                Enter the target's served maldoc.
              </Form.Field.Desc>
            </Form.Field>
            <Form.Button
              isDisabled={isDisabled}
              size="sm"
              variant="outline"
              colorScheme="green"
            >
              ✅ Create
            </Form.Button>
          </Form>
        </Drawer.Body>
      </Drawer>
      {targets!.length > 0 ? (
        <Table size="sm" variant="striped" mt={5}>
          <Table.Head>
            <Table.Row>
              <Table.Column>GUID</Table.Column>
              <Table.Column>First Name</Table.Column>
              <Table.Column>Last Name</Table.Column>
              <Table.Column>Email Address</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {targets?.map((v, i) => (
              <Table.Row key={i}>
                <Table.Cell>{v.id}</Table.Cell>
                <Table.Cell>{v.firstName}</Table.Cell>
                <Table.Cell>{v.lastName}</Table.Cell>
                <Table.Cell>{v.emailAddress}</Table.Cell>
                <Table.Cell>
                  <Button
                    isDisabled={isDisabled}
                    size="sm"
                    onClick={() => onDelete(v.id)}
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Text mt={5}>No targets were found.</Text>
      )}
    </>
  );
};
